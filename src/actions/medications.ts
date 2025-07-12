"use server";

import db from "@/lib/prisma";
import z from "zod";

import { Medicine, PatientMedication } from "@prisma/client";
import { MedicationSchema } from "@/schema";

import { getCurrentPatient } from "./auth";
import { actionResponse } from "@/lib/api";

type FullMedication = PatientMedication & {
  medicine: Medicine;
};

export async function getMedications() {
  const user = await getCurrentPatient();
  const medications = await db.patientMedication.findMany({
    where: {
      patientId: user?.id,
    },
    include: {
      medicine: true,
    },
  });
  return medications;
}

// Create medication
export async function createMedication(data: z.infer<typeof MedicationSchema.create>) {
  try {
    const user = await getCurrentPatient();
    const newMedication = await db.patientMedication.create({
      data: { ...data, patientId: user?.id },
    });
    return actionResponse(200, "Medication created successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create medication");
  }
}

// Update medication
export async function updateMedication(id: number, data: z.infer<typeof MedicationSchema.update>) {
  try {
    const user = await getCurrentPatient();
    await db.patientMedication.update({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only update their own medications
      },
      data: data,
    });
    return actionResponse(200, "Medication updated successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update medication");
  }
}

// Delete medication
export async function deleteMedication(id: number) {
  try {
    const user = await getCurrentPatient();
    await db.patientMedication.delete({
      where: {
        id: id,
        patientId: user?.id, // Ensure user can only delete their own medications
      },
    });
    return actionResponse(200, "Medication deleted successfully");
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete medication");
  }
}
