import { TObject } from "@/types/default"

export const responseCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  serverError: 500
}

export function loadDefaultHeaders(token?: string, rest?: TObject): any {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    ...rest
  }
}
