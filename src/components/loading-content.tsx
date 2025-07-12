import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import React from "react"

export default function LoadingContent({ className }: any) {
  return (
    <div className={cn("h-32 w-full py-10", className)}>
      <Loader className='animate-spin h-8 w-8 text-gray-500 mx-auto' />
    </div>
  )
}
