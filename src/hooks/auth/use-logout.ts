import routes from "@/lib/routes"

import { logoutAction } from "@/actions/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      router.push(routes.login)
    }
  })

  return {
    loading: mutation.isPending,
    mutate: mutation.mutate
  }
}
