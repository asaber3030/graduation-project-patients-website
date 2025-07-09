"use client"

import { Patient } from "@prisma/client"
import { createContext } from "react"

export const UserContext = createContext<Patient | null>(null)

type AuthProviderProps = {
  value: Patient | null
  children: React.ReactNode
}

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
