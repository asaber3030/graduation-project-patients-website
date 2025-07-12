import { NextRequest, NextResponse } from "next/server"
import { AuthSchema } from "@/schema"

import { response, responseCodes } from "@/lib/api"
import { extractErrors } from "@/lib/utils"
import { findPatient } from "@/actions/auth"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const revalidate = 0

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const parsedData = AuthSchema.login.safeParse(body)

  if (!parsedData.success)
    return response(responseCodes.serverError, "Validation errors", {
      errors: extractErrors(parsedData.error)
    })

  const patient = await findPatient({
    email: parsedData.data.email
  })
  if (!patient) return response(responseCodes.notFound, "Admin doesn't exist.")

  const comparePassword = await bcrypt.compare(parsedData.data.password, patient.password)
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.")

  const { password, ...rest } = patient

  const token = jwt.sign(rest, process.env.AUTH_SECRET!, {
    expiresIn: "30d"
  })

  return response(responseCodes.ok, "Loggedin Successfully", { token })
}
