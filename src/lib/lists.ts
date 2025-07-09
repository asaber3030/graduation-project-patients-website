import { BarChart2, Car, FileText, MapPin, MessageSquare, CreditCard, School } from "lucide-react"
import routes from "./routes"

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const Languages = [
  { code: "en", name: "english", image: "/defaults/languages/english.svg" },
  { code: "ar", name: "arabic", image: "/defaults/languages/arabic.svg" }
]
export const LanguagesList = ["en", "ar"]

export const SettingsTabs = [
  { name: "accountSettings", href: routes.settings("account") },
  { name: "adminRoles", href: routes.settings("roles") }
]

export const SidebarLinks = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: BarChart2
  },
  {
    name: "trips",
    href: "/dashboard/trips",
    icon: Car
  },
  {
    name: "requests",
    href: "/dashboard/requests",
    icon: FileText
  },
  {
    name: "liveTracking",
    href: "/dashboard/live-tracking",
    icon: MapPin
  },
  {
    name: "chats",
    href: "/dashboard/chats",
    icon: MessageSquare
  },
  {
    name: "payments",
    href: "/dashboard/payments",
    icon: CreditCard
  },
  {
    name: "schools",
    href: "/dashboard/schools",
    icon: School
  }
]
