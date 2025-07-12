"use client";

import type React from "react";
import Link from "next/link";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/auth/use-user";
import { useForm } from "react-hook-form";

import { showResponse } from "@/lib/utils";
import { loginAction } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingButton } from "@/components/common/loading-button";
import { AuthSchema } from "@/schema";
import { InputField } from "@/components/common/form/input-field";
import { LoginData } from "@/types/default";
import { Form } from "@/components/ui/form";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(AuthSchema.login),
  });

  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const mutation = useMutation({
    mutationFn: (data: LoginData) => loginAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 200) {
          toast.success("Login successful!");
          router.push(redirectTo);
        }
      }),
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

  if (user) return redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-blue-600"
          >
            Techmed
          </Link>
          <p className="text-gray-600 mt-2">Welcome back to your health dashboard</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-4">
                <InputField
                  label="E-mail Address"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  control={form.control}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Strong Password"
                  control={form.control}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <LoadingButton
                  loading={mutation.isPending}
                  type="submit"
                  className="w-full"
                >
                  Sign In
                </LoadingButton>
                <div className="text-center text-sm">
                  {"Don't have an account? "}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
