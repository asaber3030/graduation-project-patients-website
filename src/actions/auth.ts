"use server";

import { APIResponse, ApiError, ApiResponse, LoginData, LoginResponse, RegisterData } from "@/types/default";
import { API_URL, AUTH_COOKIE, TOKEN_EXPIRATION_DATE } from "@/lib/constants";

import { getRequest, postRequest } from "@/lib/axios";
import { cookies } from "next/headers";
import { Patient, Prisma } from "@prisma/client";

import db from "@/lib/prisma";
import z from "zod";
import { AuthSchema } from "@/schema";
import { redirect } from "next/navigation";
import { getHeaders } from "@/lib/api";
import bcrypt from "bcrypt";
import { actionResponse } from "@/lib/api";
import jwt from "jsonwebtoken";

export async function getToken(): Promise<string | undefined> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  return token;
}

export async function loginAction(data: z.infer<typeof AuthSchema.login>, rememberMe: boolean = false) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ ...data, rememberMe }),
    });

    const response: ApiResponse<{ token: string }> = await res.json();

    if (response.data?.token) {
      const store = await cookies();
      store.set(AUTH_COOKIE, response?.data.token, {
        expires: TOKEN_EXPIRATION_DATE,
      });
    }

    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Login failed");
  }
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
  return redirect("/auth/login");
}

export async function registerAction(creds: z.infer<typeof AuthSchema.register>) {
  try {
    // Check if patient already exists
    const existingPatient = await db.patient.findFirst({
      where: {
        OR: [{ email: creds.email }, { phoneNumber: creds.phoneNumber }, { nationalId: creds.nationalId }],
      },
    });

    if (existingPatient) {
      throw new Error("Patient with this email, phone number, or national ID already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(creds.password, 10);

    // Create patient
    const patient = await db.patient.create({
      data: {
        name: creds.name,
        email: creds.email,
        password: hashedPassword,
        phoneNumber: creds.phoneNumber,
        nationalId: creds.nationalId,
        emergencyContactName: creds.emergencyContactName,
        emergencyContactPhone: creds.emergencyContactPhone,
        allergies: creds.allergies,
        gender: creds.gender,
        age: creds.age || 0, // Provide default value for optional age
        birthDate: creds.birthDate,
        maritalStatus: creds.maritalStatus,
      },
    });

    return actionResponse(201, "Account created successfully", { patient: { id: patient.id, name: patient.name, email: patient.email } });
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new Error(error?.message || "Registration failed");
  }
}

export async function updateProfileAction(data: z.infer<typeof AuthSchema.updatePatient>) {
  try {
    const user = await getCurrentPatient();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Update patient
    const updatedPatient = await db.patient.update({
      where: { id: user.id },
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        allergies: data.allergies,
        gender: data.gender,
        age: data.age,
        birthDate: data.birthDate,
        maritalStatus: data.maritalStatus,
      },
    });

    return actionResponse(200, "Profile updated successfully", { patient: updatedPatient });
  } catch (error: any) {
    console.error("Profile update error:", error);
    throw new Error(error?.message || "Profile update failed");
  }
}

export async function resetPasswordAction(data: z.infer<typeof AuthSchema.resetPassword>) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("User not authenticated");
    }

    // Decode token to get user ID
    const decodedToken = jwt.decode(token) as { id: string } | null;
    const userId = decodedToken?.id;

    if (!userId) {
      throw new Error("Invalid token or user ID not found");
    }

    // Get user from database using user ID
    const user = await db.patient.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

    // Update password
    await db.patient.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return actionResponse(200, "Password updated successfully", null);
  } catch (error: any) {
    console.error("Password reset error:", error);
    throw new Error(error?.message || "Password reset failed");
  }
}

export async function findPatient(record: Prisma.PatientWhereUniqueInput) {
  return await db.patient.findUnique({
    where: record,
  });
}

type GetPatientResponseType = {
  patient: Patient;
};

export async function getCurrentPatient() {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  const res = await fetch(`${API_URL}/current-user`, getHeaders(token));
  const data: APIResponse<GetPatientResponseType, any> = await res.json();
  return data.data?.patient as Patient;
}
