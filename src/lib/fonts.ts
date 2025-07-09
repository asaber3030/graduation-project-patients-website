import { Inter, Rubik } from "next/font/google"

export const InterFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const RubikFont = Rubik({
  subsets: ["latin"]
})

export function loadPageDirection(language: string | undefined) {
  return language === "ar" ? "rtl" : "ltr"
}
