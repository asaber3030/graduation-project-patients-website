import { TSettingsURL } from "@/types/default"

const routes = {
  home: "/dashboard",
  login: "/",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
  trips: "/dashboard/trips",
  requests: "/dashboard/requests",
  tracking: "/dashboard/live-tracking",
  chats: "/dashboard/chats",
  schools: "/dashboard/schools",
  drivers: "/dashboard/drivers",

  payments: (path?: string): string => (path ? `/dashboard/payments/${path}` : "/dashboard/payments"),
  settings: (path: TSettingsURL): string => `/dashboard/settings/${path}`
}

export default routes
