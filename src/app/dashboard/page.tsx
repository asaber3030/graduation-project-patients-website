"use client";

import { useState } from "react";
import { Calendar, Pill, Shield, ShoppingBag, Plus, Edit, Trash2, User, LogOut, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedRoute } from "@/components/auth/protected-route";

import { MedicationsList } from "./_components/medications/list";
import { VaccinationsList } from "./_components/vaccinations/list";
import { AppointmentsList } from "./_components/appointments/list";
import { OrdersList } from "./_components/orders/list";
import { DashboardStats } from "./_components/stats";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your health records, appointments, and medications</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/profile">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">Profile Settings</h3>
                        <p className="text-sm text-gray-600">Update your personal information</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/products">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="font-semibold">Shop Products</h3>
                        <p className="text-sm text-gray-600">Browse medical supplies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/auth/reset-password">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">Security</h3>
                        <p className="text-sm text-gray-600">Change your password</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <Tabs
            defaultValue="medications"
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent
              value="medications"
              className="space-y-6"
            >
              <MedicationsList />
            </TabsContent>

            <TabsContent
              value="vaccinations"
              className="space-y-6"
            >
              <VaccinationsList />
            </TabsContent>

            <TabsContent
              value="appointments"
              className="space-y-6"
            >
              <AppointmentsList />
            </TabsContent>

            <TabsContent
              value="orders"
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Your Orders</h2>
                <Link href="/products">
                  <Button>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shop Products
                  </Button>
                </Link>
              </div>
              <OrdersList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
