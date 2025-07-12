import z from "zod";
import { Gender, MaritalStatus } from "@prisma/client";
import { phoneNumberRegEx } from "@/lib/regex";

export const AuthSchema = {
  login: z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is Required" }),
  }),
  register: z.object({
    name: z.string().min(1, { message: "Name is Required" }),
    password: z.string().min(1, { message: "Password is Required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
    email: z.string().email({ message: "Invalid email" }),
    nationalId: z.string().min(14, { message: "National ID is Required" }).max(14),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    allergies: z.string().optional(),
    gender: z.enum([Gender.Male, Gender.Female]).optional(),
    age: z.number().int().min(1, { message: "Age is Required" }).optional(),
    birthDate: z.coerce.date().optional(),
    maritalStatus: z
      .enum([MaritalStatus.Single, MaritalStatus.Married, MaritalStatus.Divorced, MaritalStatus.Widowed], {
        message: "Invalid Marital Status choose one of these Single, Married, Divorced, Widowed ",
      })
      .optional(),
  }),
  updatePatient: z.object({
    name: z.string().min(1, { message: "Name is Required" }).optional(),
    phoneNumber: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }).optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    allergies: z.string().optional(),
    gender: z.enum([Gender.Male, Gender.Female]).optional(),
    age: z.number().int().min(1, { message: "Age is Required" }).optional(),
    birthDate: z.coerce.date().optional(),
    maritalStatus: z
      .enum([MaritalStatus.Single, MaritalStatus.Married, MaritalStatus.Divorced, MaritalStatus.Widowed], {
        message: "Invalid Marital Status choose one of these Single, Married, Divorced, Widowed ",
      })
      .optional(),
  }),
  resetPassword: z
    .object({
      currentPassword: z.string().min(1, { message: "Current Password is Required" }),
      newPassword: z.string().min(1, { message: "New Password is Required" }),
      newPasswordConfirmation: z.string().min(1, { message: "New Password Confirmation is Required" }),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: "Passwords do not match",
      path: ["newPasswordConfirmation"], // Attach error to newPasswordConfirmation
    }),
};

export const VaccinationSchema = {
  create: z.object({
    vaccineName: z.string().min(1, { message: "Vaccine Name is Required" }),
    vaccineDate: z.coerce.date(),
    vaccineNotes: z.string().min(1, { message: "Vaccine Notes is Required" }),
  }),
  update: z.object({
    vaccineName: z.string().min(1, { message: "Vaccine Name is Required" }).optional(),
    vaccineDate: z.coerce.date().optional(),
    vaccineNotes: z.string().min(1, { message: "Vaccine Notes is Required" }).optional(),
  }),
};

export const MedicationSchema = {
  create: z.object({
    dosage: z.string().min(1, { message: "Dosage is Required" }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    notes: z.string().min(1, { message: "Notes is Required" }),
    medicineId: z.number().int().min(1, { message: "Medicine ID is Required" }),
  }),
  update: z.object({
    dosage: z.string().min(1, { message: "Dosage is Required" }).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    notes: z.string().min(1, { message: "Notes is Required" }).optional(),
    medicineId: z.number().int().min(1, { message: "Medicine ID is Required" }).optional(),
  }),
};

export const AppointmentSchema = {
  create: z.object({
    date: z.string(),
    time: z.string(),
    doctorId: z.number().int().min(1, { message: "Doctor ID is Required" }),
    hospitalId: z.number().int().min(1, { message: "Hospital ID is Required" }),
  }),
  update: z.object({
    date: z.coerce.date(),
    time: z.coerce.date(),
    doctorId: z.number().int().min(1, { message: "Doctor ID is Required" }),
    hospitalId: z.number().int().min(1, { message: "Hospital ID is Required" }),
  }),
};

export const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number({
          required_error: "Product ID is required",
          invalid_type_error: "Product ID must be a number",
        }),
        quantity: z.number().int().positive({
          message: "Quantity must be a positive integer",
        }),
      })
    )
    .min(1, { message: "At least one order item is required" }),
});
