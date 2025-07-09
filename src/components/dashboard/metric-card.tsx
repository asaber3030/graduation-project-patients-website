import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
  iconColor?: string
}

export function MetricCard({ title, value, icon, iconColor = "bg-blue-100" }: MetricCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`${iconColor} p-3 rounded-full`}>{icon}</div>
      </CardContent>
    </Card>
  )
}
