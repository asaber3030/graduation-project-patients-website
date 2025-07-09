import moment from "moment"

import { ApiResponse, TLanguage } from "@/types/default"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

import { LanguagesList } from "./lists"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showResponse<T>(data: ApiResponse<T>, execute?: () => void) {
  if (data?.status >= 200 && data?.status <= 299) {
    toast.success(data?.message)
    if (execute) execute()
    return
  }
  toast.error(data?.message)
  if (execute) execute()
  return
}

export function diffForHumans(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "YYYY-MM-DD") {
  return moment(date).format(format)
}

export function formatToEGP(amount: number): string {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2
  }).format(amount)
}

export function capitalize(str: string): string {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function checkLanguage(locale: string): TLanguage {
  return (LanguagesList.includes(locale) ? locale : "en") as TLanguage
}

export function extractInfoFromDate(txt: string) {
  const arr = txt.split("-")
  return {
    day: arr[2],
    year: arr[0],
    month: arr[1]
  }
}
