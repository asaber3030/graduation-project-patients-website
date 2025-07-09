"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface FilterChip {
  id: string
  label: string
}

interface FilterBarProps {
  filters: FilterChip[]
}

export function FilterBar({ filters }: FilterBarProps) {
  const t = useTranslations()

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      {filters.map((filter) => (
        <div key={filter.id} className='flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm'>
          {filter.label}
          <button className='text-gray-500 hover:text-gray-700'>
            <X className='h-3 w-3' />
          </button>
        </div>
      ))}

      <Button variant='ghost' size='sm' className='text-xs h-7 px-2'>
        {t("filters")}
      </Button>
    </div>
  )
}
