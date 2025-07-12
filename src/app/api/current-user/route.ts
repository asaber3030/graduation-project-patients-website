import { NextRequest } from "next/server"
import { Admin, Patient } from "@prisma/client"

import { extractToken } from "@/lib/utils"
import { findPatient } from "@/actions/auth"
import { response } from "@/lib/api"

import jwt from "jsonwebtoken"

export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization")
    if (!authorization) return response(401, "Unauthorized")

    const token = extractToken(authorization) ?? ""
    if (!token) return response(401, "Unauthorized")

    const secret = process.env.AUTH_SECRET!
    const decodedResult = jwt.verify(token, secret) as Patient

    const patientWithPassword = await findPatient({ id: decodedResult.id })
    if (!patientWithPassword) return response(401, "Unauthorized")

    const { password, ...patient } = patientWithPassword
    return response(200, "Authorized", { patient })
  } catch (error) {
    return response(401, "Unauthorized")
  }
}
