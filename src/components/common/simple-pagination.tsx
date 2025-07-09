"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "../ui/button"

import { cn } from "@/lib/utils"

type Props = {
  className?: ClassValue
  hasNextPage?: boolean
  hasPrevPage?: boolean
}

export const SimplePagination = ({ className, hasNextPage, hasPrevPage }: Props) => {
  const sp = useSearchParams()
  const locale = useLocale()
  const router = useRouter()

  const page = sp.get("page") || "1"
  const currentPage = parseInt(page)

  const onNext = () => {
    const nextPage = currentPage + 1
    router.push(`?page=${nextPage}`)
  }

  const onPrev = () => {
    if (currentPage <= 1) return
    const prevPage = currentPage - 1
    router.push(`?page=${prevPage}`)
  }

  return (
    <div className={cn("flex gap-2 items-center justify-center", className)}>
      <Button disabled={currentPage == 1} variant='outline' size='icon' icon={locale == "en" ? ArrowLeft : ArrowRight} onClick={onPrev} />
      <Button disabled={!hasNextPage} variant='outline' size='icon' icon={locale == "en" ? ArrowRight : ArrowLeft} onClick={onNext} />
    </div>
  )
}
