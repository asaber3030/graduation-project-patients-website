"use client"

import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  label?: string
  className?: ClassValue
}

export const NoDataLabel = ({ label = "No Data Available", className }: Props) => {
  return <div className={cn("text-gray-500 text-sm font-medium", className)}>{label}</div>
}
