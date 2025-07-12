"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Pill, Shield, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMedications } from "@/actions/medications";
import { getVaccinations } from "@/actions/vaccinations";
import { getAppointments } from "@/actions/appointments";
import { getOrders } from "@/actions/orders";

export function DashboardStats() {
  const { data: medications, isPending: medicationsLoading } = useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });

  const { data: vaccinations, isPending: vaccinationsLoading } = useQuery({
    queryKey: ["vaccinations"],
    queryFn: getVaccinations,
  });

  const { data: appointments, isPending: appointmentsLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const { data: orders, isPending: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  // Calculate active medications (not expired)
  const activeMedications =
    medications?.filter((med) => {
      const endDate = new Date(med.endDate);
      return endDate > new Date();
    }) || [];

  // Get next appointment
  const nextAppointment = appointments?.find((apt) => {
    const aptDate = new Date(apt.date);
    return aptDate > new Date() && apt.status !== "cancelled";
  });

  // Get recent orders (last 7 days)
  const recentOrders =
    orders?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return orderDate > weekAgo;
    }) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
          <Pill className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{medicationsLoading ? "..." : activeMedications.length}</div>
          <p className="text-xs text-muted-foreground">{medicationsLoading ? "Loading..." : `${activeMedications.length} active prescriptions`}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vaccinations</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vaccinationsLoading ? "..." : vaccinations?.length || 0}</div>
          <p className="text-xs text-muted-foreground">{vaccinationsLoading ? "Loading..." : "Total vaccinations"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointmentsLoading ? "..." : appointments?.length || 0}</div>
          <p className="text-xs text-muted-foreground">{appointmentsLoading ? "Loading..." : nextAppointment ? `Next: ${new Date(nextAppointment.date).toLocaleDateString()}` : "No upcoming appointments"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ordersLoading ? "..." : orders?.length || 0}</div>
          <p className="text-xs text-muted-foreground">{ordersLoading ? "Loading..." : recentOrders.length > 0 ? `+${recentOrders.length} from last week` : "No recent orders"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
