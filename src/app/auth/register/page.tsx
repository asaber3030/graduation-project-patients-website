"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "@/actions/auth";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/form/input-field";
import { useForm } from "react-hook-form";
import { AuthSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(AuthSchema.register),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/auth/login";

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AuthSchema.register>) => registerAction(data),
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push(redirectTo);
    },
    onError: (error: any) => {
      toast.error(error?.message || "An error occurred while creating the account.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

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
          <p className="text-gray-600 mt-2">Create your health management account</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Fill in your information to get started</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-4">
                <InputField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                />

                <InputField
                  control={form.control}
                  name="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  type="email"
                />

                <InputField
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+1234567890"
                />

                <InputField
                  control={form.control}
                  name="nationalId"
                  label="National ID"
                  placeholder="53513452345634"
                />

                <InputField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Create a strong password"
                  type="password"
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <LoadingButton
                  loading={mutation.isPending}
                  type="submit"
                  className="w-full"
                >
                  Create Account
                </LoadingButton>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
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
