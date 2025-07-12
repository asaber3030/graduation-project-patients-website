"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/actions/orders";
import { diffForHumans } from "@/lib/utils";

import { Loader, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoDataLabel } from "@/components/common/no-data-label";
import { Button } from "@/components/ui/button";
import { OrderDetailsModal } from "./details";

export function OrdersList() {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <NoDataLabel label="No orders found" />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              <OrderDetailsModal order={order} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Items</p>
                <p className="text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="font-medium">Total</p>
                <p className="text-gray-600">${order.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{diffForHumans(new Date(order.createdAt))}</p>
              </div>
              <div>
                <p className="font-medium">Order Number</p>
                <p className="text-gray-600">{order.orderNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
