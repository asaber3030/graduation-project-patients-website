"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Shield, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "@/actions/auth";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/form/input-field";
import { useForm } from "react-hook-form";
import { AuthSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ResetPasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(AuthSchema.resetPassword),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AuthSchema.resetPassword>) => resetPasswordAction(data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update password");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-3xl font-bold text-blue-600"
            >
              Techmed
            </Link>
            <p className="text-gray-600 mt-2">Update your account password</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Reset Password
              </CardTitle>
              <CardDescription className="text-center">Enter your current password and choose a new one</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <span>For security, you must enter your current password to change it.</span>
                    </div>

                    <InputField
                      control={form.control}
                      name="currentPassword"
                      label="Current Password"
                      placeholder="Enter your current password"
                      type={showCurrentPassword ? "text" : "password"}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      New Password
                    </h3>

                    <InputField
                      control={form.control}
                      name="newPassword"
                      label="New Password"
                      placeholder="Enter your new password"
                      type={showNewPassword ? "text" : "password"}
                    />

                    <InputField
                      control={form.control}
                      name="newPasswordConfirmation"
                      label="Confirm New Password"
                      placeholder="Confirm your new password"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm text-blue-900">Password Requirements:</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 mt-4">
                  <LoadingButton
                    loading={mutation.isPending}
                    type="submit"
                    className="w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Update Password
                  </LoadingButton>
                  <div className="text-center text-sm">
                    <Link
                      href="/dashboard"
                      className="text-blue-600 hover:underline"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
