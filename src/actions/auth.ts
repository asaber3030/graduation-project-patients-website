"use server"

import { ApiError, ApiResponse, LoginData, LoginResponse, RegisterData } from "@/types/default"
import { AUTH_COOKIE } from "@/lib/constants"

import { getRequest, postRequest } from "@/lib/axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Patient } from "@prisma/client"

export async function getToken(): Promise<string | undefined> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE)?.value
  return token
}

export async function loginAction(creds: LoginData) {
  try {
    const res = await postRequest<LoginResponse>("/auth/login", creds)
    const data = res.data
    const store = await cookies()
    store.set(AUTH_COOKIE, data.token)
    return data
  } catch (error) {
    console.error("Login error:", error)
    const err = error as ApiError<any>
    throw new Error(err?.message || "Login failed")
  }
}

export async function registerAction(creds: RegisterData) {
  try {
    const res = await postRequest<ApiResponse<null>>("/auth/register", creds)
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error("Registration error:", err)
    throw new Error(err?.message || "Registration failed")
  }
}

export async function getPatient() {
  try {
    const res = await getRequest<Patient>("/auth/patient")
    return res.data
  } catch (error) {
    return null
  }
}
