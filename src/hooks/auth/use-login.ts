import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { LoginData, TAccountType } from "@/types/default"

import { toast } from "react-toastify"
import { loginAction } from "@/actions/auth"

import routes from "@/lib/routes"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data, accountType = "user" }: { data: LoginData; accountType?: TAccountType }) => loginAction(data, accountType),
    onSuccess: (data) => {
      toast.success("Login successful")
      router.push(routes.myAccount)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}
