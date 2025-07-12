"use server";

import db from "@/lib/prisma";

export async function getProducts(search?: string, categoryId?: number) {
  try {
    const where: any = {};

    if (search && search.trim()) {
      where.OR = [{ name: { contains: search.trim() } }, { description: { contains: search.trim() } }];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const products = await db.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { name: "asc" },
    });

    return products;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProduct(productId: number) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error) {
    console.error("Error in getProduct:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function searchProducts(query: string) {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const trimmedQuery = query.trim();

    const products = await db.product.findMany({
      where: {
        OR: [{ name: { contains: trimmedQuery } }, { description: { contains: trimmedQuery } }],
      },
      include: {
        category: true,
      },
      take: 10,
      orderBy: { name: "asc" },
    });

    return products;
  } catch (error) {
    console.error("Error in searchProducts:", error);
    throw new Error("Failed to search products");
  }
}
