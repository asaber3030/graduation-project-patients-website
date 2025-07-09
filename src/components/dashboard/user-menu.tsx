"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IMAGES } from "@/lib/constants"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

export function UserMenu() {
  const user = {
    name: "Abdulrahman Saber",
    avatar: IMAGES.user,
    email: "a@a.com",
    role: "admin"
  }
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const t = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-2 px-2'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.avatar || "/placeholder.jpg"} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start text-sm'>
            <span className='font-medium'>{t("welcomeBack")}</span>
            <span className='text-xs text-gray-500'>{user.name}</span>
          </div>
          <ChevronDown className='h-4 w-4 text-gray-500' />
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
