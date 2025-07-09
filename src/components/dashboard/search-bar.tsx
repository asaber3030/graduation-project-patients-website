"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ClassValue } from "class-variance-authority/types"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type Props = {
  parentClassName?: ClassValue
  inputClassName?: ClassValue
  iconClassName?: ClassValue
}

export function SearchBar({ parentClassName, inputClassName, iconClassName }: Props) {
  const t = useTranslations()

  return (
    <div className={cn("relative xl:w-1/2 w-full", parentClassName)}>
      <Search className={cn("absolute left-2.5 top-2.5 h-4 w-4 text-gray-500", iconClassName)} />
      <Input type='search' placeholder={t("search") + "...."} className={cn("w-full pl-9 pr-4 py-2 rounded-md border", inputClassName)} />
    </div>
  )
}
