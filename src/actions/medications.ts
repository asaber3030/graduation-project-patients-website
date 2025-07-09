"use server"

import { getRequest } from "@/lib/axios"
import { ApiError } from "@/types/default"
import { Medicine, PatientMedication } from "@prisma/client"

type FullMedication = PatientMedication & {
  medicine: Medicine
}

export async function getMedications() {
  try {
    const res = await getRequest<FullMedication[]>("/medications")
    return res.data
  } catch (error) {
    console.error("Error fetching medications:", error)
    const err = error as ApiError<any>
    throw new Error(err?.message || "Failed to fetch medications")
  }
}
