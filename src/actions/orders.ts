"use server";

import db from "@/lib/prisma";
import { getCurrentPatient } from "./auth";
import { actionResponse } from "@/lib/api";

export async function getOrders() {
  const user = await getCurrentPatient();
  const orders = await db.order.findMany({
    where: {
      patientId: user?.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      patient: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return orders;
}

export async function getOrder(orderId: number) {
  const user = await getCurrentPatient();
  const order = await db.order.findFirst({
    where: {
      id: orderId,
      patientId: user?.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      patient: true,
    },
  });
  return order;
}

export async function createOrder(
  cartItems: Array<{
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: number;
    quantity: number;
  }>
) {
  try {
    const user = await getCurrentPatient();

    if (!user) {
      throw new Error("User not authenticated");
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Check for existing orders in statuses other than "delivered" or "cancelled"
    const existingOrders = await db.order.findMany({
      where: {
        patientId: user.id,
        status: {
          notIn: ["delivered", "cancelled"],
        },
      },
    });

    if (existingOrders.length > 0) {
      throw new Error("You have pending orders. Please wait for your current orders to be processed before placing a new one.");
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items
    const order = await db.order.create({
      data: {
        orderNumber,
        totalAmount,
        patientId: user.id,
        status: "pending",
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
            price: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        patient: true,
      },
    });

    return actionResponse(200, "Order created successfully", order);
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(error?.message || "Failed to create order");
  }
}
