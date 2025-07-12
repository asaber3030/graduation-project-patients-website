"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/auth/use-user";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (user === null) {
      // User is not authenticated, redirect to login
      const loginUrl = redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : "/auth/login";
      router.push(loginUrl);
    }
  }, [user, router, redirect]);

  // Show loading while checking authentication
  if (user === undefined) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )
    );
  }

  // If user is not authenticated, don't render children
  if (user === null) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
