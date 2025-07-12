"use server";

import db from "@/lib/prisma";

export async function getHospitals() {
  try {
    const hospitals = await db.hospital.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
      },
      orderBy: { name: "asc" },
    });

    console.log(`Fetched ${hospitals.length} hospitals`);
    return hospitals;
  } catch (error) {
    console.error("Error in getHospitals:", error);
    throw new Error("Failed to fetch hospitals");
  }
}
