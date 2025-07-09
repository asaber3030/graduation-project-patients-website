export const LANGUAGE_COOKIE = "language"
export const AUTH_COOKIE = "token"
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
