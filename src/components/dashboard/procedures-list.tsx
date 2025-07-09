import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Procedure {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  message: string
  status: "pending" | "approved"
}

interface ProceduresListProps {
  procedures: Procedure[]
}

export function ProceduresList({ procedures }: ProceduresListProps) {
  return (
    <div className='border rounded-md'>
      <div className='bg-gray-50 px-4 py-3 border-b flex justify-between items-center'>
        <h3 className='font-medium'>Procedures</h3>
        <Button variant='ghost' size='sm' className='text-blue-600 hover:text-blue-800 hover:bg-blue-50'>
          View All
        </Button>
      </div>
      <div className='divide-y'>
        {procedures.map((procedure) => (
          <div key={procedure.id} className='p-4 flex items-start gap-3'>
            <Avatar>
              <AvatarImage src={procedure.user.avatar || "/placeholder.jpg"} alt={procedure.user.name} />
              <AvatarFallback>{procedure.user.initials}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex justify-between'>
                <p className='font-medium'>{procedure.user.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${procedure.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>{procedure.status === "pending" ? "Pending" : "Approved"}</span>
              </div>
              <p className='text-sm text-gray-600 mt-1'>{procedure.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
