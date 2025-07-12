"use server";

import db from "@/lib/prisma";

export async function getMedicine(search?: string) {
  try {
    // If no search query, return empty array to avoid loading all medicines
    if (!search || search.trim().length === 0) {
      return [];
    }

    const trimmedSearch = search.trim();

    // Search in multiple fields
    const medicine = await db.medicine.findMany({
      where: {
        OR: [{ enName: { contains: trimmedSearch } }, { arName: { contains: trimmedSearch } }, { enDescription: { contains: trimmedSearch } }],
      },
      take: 10,
      orderBy: { enName: "asc" },
      select: {
        id: true,
        enName: true,
        arName: true,
        enDescription: true,
      },
    });

    console.log(`Search for "${trimmedSearch}" returned ${medicine.length} results`);
    return medicine;
  } catch (error) {
    console.error("Error in getMedicine:", error);
    throw new Error("Failed to fetch medicines");
  }
}

// Test function to get all medicines
export async function getAllMedicines() {
  try {
    const medicines = await db.medicine.findMany({
      take: 5,
      select: {
        id: true,
        enName: true,
        arName: true,
      },
    });
    console.log(`Total medicines in DB: ${medicines.length}`);
    return medicines;
  } catch (error) {
    console.error("Error in getAllMedicines:", error);
    throw new Error("Failed to fetch all medicines");
  }
}
