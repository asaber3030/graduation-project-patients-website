"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { useTranslations } from "next-intl"

export function NavigationMenu() {
  const t = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-2 px-2 rounded-full'>
          <Bell className='h-4 w-4 text-orange-500' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t("account")}</DropdownMenuItem>
        <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
        <DropdownMenuItem>{t("roles")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
