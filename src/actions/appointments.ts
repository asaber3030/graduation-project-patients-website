"use server";

import db from "@/lib/prisma";
import { getCurrentPatient } from "./auth";
import z from "zod";
import { AppointmentSchema } from "@/schema";
import { actionResponse } from "@/lib/api";

export async function getAppointments() {
  const user = await getCurrentPatient();
  const appointments = await db.appointment.findMany({
    where: {
      patientId: user?.id,
    },
    include: {
      doctor: true,
      hospital: true,
    },
    orderBy: { date: "desc" },
  });
  return appointments;
}

// Check if doctor is available at the given date and time
async function checkDoctorAvailability(doctorId: number, date: Date, time: string, excludeAppointmentId?: number) {
  const existingAppointment = await db.appointment.findFirst({
    where: {
      doctorId: doctorId,
      date: date,
      time: time,
      id: {
        not: excludeAppointmentId,
      },
    },
  });

  return !existingAppointment; // Return true if no conflict found
}

// Create appointment
export async function createAppointment(data: z.infer<typeof AppointmentSchema.create>) {
  try {
    const user = await getCurrentPatient();

    // Check if doctor is available
    const isAvailable = await checkDoctorAvailability(data.doctorId, new Date(data.date), data.time);

    if (!isAvailable) {
      throw new Error("Doctor is not available at the selected date and time");
    }

    const newAppointment = await db.appointment.create({
      data: {
        ...data,
        patientId: user?.id,
        date: new Date(data.date),
        status: "pending", // Set default status
      },
    });
    return actionResponse(200, "Appointment created successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create appointment");
  }
}

// Update appointment
export async function updateAppointment(id: number, data: any) {
  try {
    const user = await getCurrentPatient();
    await db.appointment.update({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only update their own appointments
      },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
        time: data.time || undefined,
      },
    });
    return actionResponse(200, "Appointment updated successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update appointment");
  }
}

// Delete appointment
export async function deleteAppointment(id: number) {
  try {
    const user = await getCurrentPatient();
    await db.appointment.delete({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only delete their own appointments
      },
    });
    return actionResponse(200, "Appointment deleted successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete appointment");
  }
}

// Cancel appointment
export async function cancelAppointment(id: number) {
  try {
    const user = await getCurrentPatient();

    // Get the appointment to check its status
    const appointment = await db.appointment.findFirst({
      where: {
        id: id,
        patientId: user?.id,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status === "confirmed") {
      throw new Error("Cannot cancel a confirmed appointment");
    }

    await db.appointment.delete({
      where: {
        id: id,
        patientId: user?.id,
      },
    });
    return actionResponse(200, "Appointment cancelled successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to cancel appointment");
  }
}
