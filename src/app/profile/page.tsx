"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, LogOut, Camera, Save, Edit, Shield, Mail, Phone, Calendar, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/auth/use-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/schema";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/form/input-field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileAction } from "@/actions/auth";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { Gender, MaritalStatus } from "@prisma/client";
import { z } from "zod";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(AuthSchema.updatePatient),
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      emergencyContactName: user?.emergencyContactName || "",
      emergencyContactPhone: user?.emergencyContactPhone || "",
      allergies: user?.allergies || "",
      gender: user?.gender || Gender.Male,
      age: user?.age || 0,
      birthDate: user?.birthDate ? new Date(user.birthDate) : undefined,
      maritalStatus: user?.maritalStatus || MaritalStatus.Single,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AuthSchema.updatePatient>) => updateProfileAction(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback className="text-2xl">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{user?.name}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{user?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Age: {user?.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span>Gender: {user?.gender}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="w-full"
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}

                    <Link href="/auth/reset-password">
                      <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-700"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and medical information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            control={form.control}
                            name="name"
                            label="Full Name"
                            placeholder="John Doe"
                            disabled={!isEditing}
                          />
                          <InputField
                            control={form.control}
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="+1234567890"
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            control={form.control}
                            name="age"
                            label="Age"
                            type="number"
                            placeholder="25"
                            disabled={!isEditing}
                            valueAsNumber
                          />
                          <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select
                              onValueChange={(value) => form.setValue("gender", value as Gender)}
                              disabled={!isEditing}
                              value={form.watch("gender")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={Gender.Male}>Male</SelectItem>
                                <SelectItem value={Gender.Female}>Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            control={form.control}
                            name="birthDate"
                            label="Birth Date"
                            type="date"
                            disabled={!isEditing}
                          />
                          <div className="space-y-2">
                            <Label>Marital Status</Label>
                            <Select
                              onValueChange={(value) => form.setValue("maritalStatus", value as MaritalStatus)}
                              disabled={!isEditing}
                              value={form.watch("maritalStatus")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select marital status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={MaritalStatus.Single}>Single</SelectItem>
                                <SelectItem value={MaritalStatus.Married}>Married</SelectItem>
                                <SelectItem value={MaritalStatus.Divorced}>Divorced</SelectItem>
                                <SelectItem value={MaritalStatus.Widowed}>Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Emergency Contact
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency Contact Name"
                            placeholder="Jane Doe"
                            disabled={!isEditing}
                          />
                          <InputField
                            control={form.control}
                            name="emergencyContactPhone"
                            label="Emergency Contact Phone"
                            placeholder="+1234567890"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      {/* Medical Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Heart className="h-5 w-5" />
                          Medical Information
                        </h3>

                        <InputField
                          control={form.control}
                          name="allergies"
                          label="Allergies"
                          placeholder="List any allergies..."
                          isTextarea={true}
                          disabled={!isEditing}
                        />
                      </div>

                      {/* Action Buttons */}
                      {isEditing && (
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={mutation.isPending}
                          >
                            Cancel
                          </Button>
                          <LoadingButton
                            type="submit"
                            loading={mutation.isPending}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </LoadingButton>
                        </div>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
