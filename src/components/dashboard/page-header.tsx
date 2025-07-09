import { ClassValue } from "class-variance-authority/types"
import { NavigationMenu } from "./notifications-menu"
import { SearchBar } from "./search-bar"
import { UserMenu } from "./user-menu"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "../common/language-switcher"

type Props = {
  title: string
  description?: string
  hasSearch?: boolean
  actions?: React.ReactNode
  className?: ClassValue
}

export const PageHeader = ({ title, description, actions, hasSearch = true, className }: Props) => {
  return (
    <div className={cn("mb-10 flex flex-col gap-4", className)}>
      <div className='flex xl:flex-row flex-col gap-4 xl:items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium'>{title}</h1>
          <p className='text-lg text-gray-500'>{description}</p>
        </div>
        <div className='flex items-center gap-2'>
          <UserMenu />
          <LanguageSwitcher />
          <NavigationMenu />
          {actions}
        </div>
      </div>
      <SearchBar />
    </div>
  )
}
