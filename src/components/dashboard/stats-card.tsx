import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface StatsCardProps {
  value: string
  percentChange: number
  label?: string
}

export function StatsCard({ value, percentChange, label }: StatsCardProps) {
  const isPositive = percentChange >= 0

  return (
    <Card className='border shadow-sm'>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start'>
          <div>
            <p className='text-3xl font-bold'>{value}</p>
            {label && <p className='text-sm text-gray-500 mt-1'>{label}</p>}
          </div>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
            <ArrowUpRight className='h-4 w-4' />
            <span>
              {isPositive ? "+" : ""}
              {percentChange}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
