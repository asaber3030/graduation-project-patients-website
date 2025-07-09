import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("messages.invalidEmail"),
  password: z.string().min(8, "messages.invalidPassword")
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  password: z.string().min(1, { message: "Password is Required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  email: z.string().email({ message: "Invalid email" }),
  nationalId: z.string().min(14, { message: "National ID is Required" }).max(14)
})
