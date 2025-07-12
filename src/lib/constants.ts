export const LANGUAGE_COOKIE = "language"
export const AUTH_COOKIE = "tokentechmed"
export const LOGO_PATH = "/logo/main.svg"
export const DEFAULT_USER_IMAGE = "/defaults/user.jpeg"
export const DEFAULT_PLACEHOLDER = "/defaults/placeholder.jpg"
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30
export const IMAGES = {
  user: "/defaults/images/user.png",
  placeholder: "/defaults/images/placeholder.jpg",
  auth: "/defaults/auth/login.png"
}
export const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6Illhc3NlciBNb2hhbWVkIiwicGhvbmVOdW1iZXIiOiIwMTI4MjEwMDI0MSIsImVtYWlsIjoiYXNhYmVyQGEuY29tIiwibmF0aW9uYWxJZCI6IjMwOTA1MTMzMDEyNDUzIiwiZW1lcmdlbmN5Q29udGFjdE5hbWUiOiIiLCJlbWVyZ2VuY3lDb250YWN0UGhvbmUiOiIiLCJhbGxlcmdpZXMiOiIiLCJhZ2UiOjAsImdlbmRlciI6Ik1hbGUiLCJiaXJ0aERhdGUiOm51bGwsIm1hcml0YWxTdGF0dXMiOiJTaW5nbGUiLCJpbWFnZSI6bnVsbCwibmF0aW9uYWxJZEltYWdlIjpudWxsLCJiaXJ0aENlcnRpZmljYXRlSW1hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjUtMDctMTFUMDI6MzY6MzIuOTUyWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDctMTFUMDI6MzY6MzIuOTUyWiIsImlhdCI6MTc1MjIwMTQwMH0.5vYC-mXQx0AzvWQlvJ1CbonB2EJnQ4qxKbxZKg_vfZo"
