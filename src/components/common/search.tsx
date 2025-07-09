"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export function AppSearch({ queryParamName = "search" }: { queryParamName?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState(sp.get(queryParamName) || "")

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?${queryParamName}=${search}`)
  }

  return (
    <form className='relative max-w-4xl mx-auto px-4' onSubmit={handleSearch}>
      <SearchIcon className='absolute xl:left-8 left-6 top-1/2 -translate-y-1/2 text-gray-500' size={17} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("search")} className='rounded-2xl xl:pl-10 pl-8 py-4' />
    </form>
  )
}
