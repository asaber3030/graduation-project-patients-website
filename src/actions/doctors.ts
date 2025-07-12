"use server";

import db from "@/lib/prisma";

export async function getDoctors(search?: string) {
  try {
    // If no search query, return empty array to avoid loading all doctors
    if (!search || search.trim().length === 0) {
      return [];
    }

    const trimmedSearch = search.trim();

    // Search in multiple fields
    const doctors = await db.doctor.findMany({
      where: {
        OR: [{ name: { contains: trimmedSearch } }, { jobTitle: { contains: trimmedSearch } }, { email: { contains: trimmedSearch } }],
      },
      select: {
        id: true,
        name: true,
        jobTitle: true,
        email: true,
        phoneNumber: true,
        hospital: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 10,
      orderBy: { name: "asc" },
    });

    console.log(`Search for "${trimmedSearch}" returned ${doctors.length} doctor results`);
    return doctors;
  } catch (error) {
    console.error("Error in getDoctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}
