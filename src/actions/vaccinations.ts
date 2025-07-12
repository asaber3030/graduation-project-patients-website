"use server";

import db from "@/lib/prisma";
import { getCurrentPatient } from "./auth";
import z from "zod";
import { VaccinationSchema } from "@/schema";
import { actionResponse } from "@/lib/api";

export async function getVaccinations() {
  const user = await getCurrentPatient();
  const vaccinations = await db.patientVaccination.findMany({
    where: {
      patientId: user?.id,
    },
    orderBy: { vaccineDate: "desc" },
  });
  return vaccinations;
}

// Create vaccination
export async function createVaccination(data: z.infer<typeof VaccinationSchema.create>) {
  try {
    const user = await getCurrentPatient();
    const newVaccination = await db.patientVaccination.create({
      data: { ...data, patientId: user?.id },
    });
    return actionResponse(200, "Vaccination created successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create vaccination");
  }
}

// Update vaccination
export async function updateVaccination(id: number, data: z.infer<typeof VaccinationSchema.update>) {
  try {
    const user = await getCurrentPatient();
    await db.patientVaccination.update({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only update their own vaccinations
      },
      data: data,
    });
    return actionResponse(200, "Vaccination updated successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update vaccination");
  }
}

// Delete vaccination
export async function deleteVaccination(id: number) {
  try {
    const user = await getCurrentPatient();
    await db.patientVaccination.delete({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only delete their own vaccinations
      },
    });
    return actionResponse(200, "Vaccination deleted successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete vaccination");
  }
}
