"use server";

import db from "@/lib/prisma";

export async function getCategories(search?: string) {
  try {
    const where: any = {};

    if (search && search.trim()) {
      where.OR = [{ name: { contains: search.trim() } }, { description: { contains: search.trim() } }];
    }

    const categories = await db.category.findMany({
      where,
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return categories;
  } catch (error) {
    console.error("Error in getCategories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategory(categoryId: number) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: categoryId,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error("Error in getCategory:", error);
    throw new Error("Failed to fetch category");
  }
}

export async function getCategoryProducts(categoryId: number) {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
      orderBy: { name: "asc" },
    });

    return products;
  } catch (error) {
    console.error("Error in getCategoryProducts:", error);
    throw new Error("Failed to fetch products of category");
  }
}
