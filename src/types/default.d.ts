import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { LucideIcon } from "lucide-react";
import { Employee, User } from "@/types/models";

import { Patient } from "@prisma/client";
import { AuthSchema } from "@/schema";

export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type APIResponse<T, D> = {
  message: string;
  status: number;
  data?: T;
  error?: D;
};

export type ApiError<T> = {
  message: string;
  status: number;
  data?: T;
};

export type TLanguage = "ar" | "en";
export type TObject = Record<string, string | string[] | undefined>;
export type TAccountType = "user" | "admin";

export type TSettingsURL = "profile" | "security" | "notifications" | "privacy";

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

// New types based on AuthSchema
export type LoginFormData = z.infer<typeof AuthSchema.login>;
export type RegisterFormData = z.infer<typeof AuthSchema.register>;
export type UpdateProfileData = z.infer<typeof AuthSchema.updatePatient>;
export type ResetPasswordData = z.infer<typeof AuthSchema.resetPassword>;

export type PaginatedData<T> = {
  page: number;
  nextPage: number | null;
  lastPage: number | null;
  itemCount: number;
  totalPages: number;
  totalItems: number;
  data: T[];
};

export type LoginResponse = {
  patient: Patient;
  token: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: SidebarItem[];
};
