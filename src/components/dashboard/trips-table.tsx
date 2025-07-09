import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslations } from "next-intl"

interface Trip {
  id: string
  school: string
  students: number
  driver: string
  date: string
  time: string
  location: string
}

interface TripsTableProps {
  trips: Trip[]
}

export function TripsTable({ trips }: TripsTableProps) {
  const t = useTranslations()
  return (
    <div className='border rounded-md'>
      <div className='bg-gray-50 px-4 py-3 border-b'>
        <h3 className='font-medium'>{t("upcomingTrips")}</h3>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("schoolLabel")}</TableHead>
              <TableHead className='text-center'>{t("studentsLabel")}</TableHead>
              <TableHead>{t("driverLabel")}</TableHead>
              <TableHead>{t("dateTimeLabel")}</TableHead>
              <TableHead>{t("locationLabel")}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className='font-medium'>{trip.school}</TableCell>
                <TableCell className='text-center'>{trip.students}</TableCell>
                <TableCell>{trip.driver}</TableCell>
                <TableCell>
                  {trip.date} · {trip.time}
                </TableCell>
                <TableCell>{trip.location}</TableCell>
                <TableCell>
                  <Button variant='ghost' size='sm' className='text-blue-600 hover:text-blue-800 hover:bg-blue-50'>
                    {t("viewLocationButton")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
