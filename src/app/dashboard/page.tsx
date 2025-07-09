"use client"

import { useState } from "react"
import { Calendar, Pill, Shield, ShoppingBag, Plus, Edit, Trash2, User, LogOut, Loader } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicationModal } from "@/components/medication-modal"
import { VaccinationModal } from "@/components/vaccination-modal"
import { AppointmentModal } from "@/components/appointment-modal"
import { useQuery } from "@tanstack/react-query"
import { getMedications } from "@/actions/medications"
import { NoDataLabel } from "@/components/common/no-data-label"
import { diffForHumans } from "@/lib/utils"

// Mock data
const medications = [
  { id: 1, name: "Aspirin", dosage: "100mg", frequency: "Daily", nextDose: "2024-01-15 08:00" },
  { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", nextDose: "2024-01-15 12:00" }
]

const vaccinations = [
  { id: 1, name: "COVID-19 Booster", date: "2023-12-01", nextDue: "2024-06-01", status: "Completed" },
  { id: 2, name: "Flu Shot", date: "2023-10-15", nextDue: "2024-10-15", status: "Completed" }
]

const appointments = [
  { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", date: "2024-01-20", time: "10:00 AM", status: "Scheduled" },
  { id: 2, doctor: "Dr. Johnson", specialty: "General", date: "2024-01-25", time: "2:00 PM", status: "Scheduled" }
]

const orders = [
  { id: 1, items: "Blood Pressure Monitor, Thermometer", total: "$89.99", status: "Delivered", date: "2024-01-10" },
  { id: 2, items: "Vitamin D, Omega-3", total: "$45.50", status: "Processing", date: "2024-01-12" }
]

export default function Dashboard() {
  const [medicationModalOpen, setMedicationModalOpen] = useState(false)
  const [vaccinationModalOpen, setVaccinationModalOpen] = useState(false)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const medications = useQuery({
    queryKey: ["medications"],
    queryFn: async () => getMedications()
  })

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600 mt-2'>Manage your health information and track your progress</p>
        </div>

        <Tabs defaultValue='medications' className='space-y-6'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='medications' className='flex items-center gap-2'>
              <Pill className='h-4 w-4' />
              Medications
            </TabsTrigger>
            <TabsTrigger value='vaccinations' className='flex items-center gap-2'>
              <Shield className='h-4 w-4' />
              Vaccinations
            </TabsTrigger>
            <TabsTrigger value='appointments' className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              Appointments
            </TabsTrigger>
            <TabsTrigger value='orders' className='flex items-center gap-2'>
              <ShoppingBag className='h-4 w-4' />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value='medications' className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Your Medications</h2>
              <Button onClick={() => setMedicationModalOpen(true)}>
                <Plus className='h-4 w-4 mr-2' />
                Add Medication
              </Button>
            </div>
            {medications.isPending ? (
              <Loader className='animate-spin size-4' />
            ) : (
              <div>
                {medications?.data?.length == 0 ? (
                  <NoDataLabel />
                ) : (
                  <div className='grid gap-4'>
                    {medications?.data?.map((med) => (
                      <Card key={med.id}>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-lg'>{med.medicine?.enName}</CardTitle>
                          <div className='flex space-x-2'>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => {
                                setEditingItem(med)
                                setMedicationModalOpen(true)
                              }}
                            >
                              <Edit className='h-4 w-4' />
                            </Button>
                            <Button variant='ghost' size='icon'>
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                            <div>
                              <p className='font-medium'>Notes</p>
                              <p className='text-gray-600'>{med.notes || "N/A"}</p>
                            </div>
                            <div>
                              <p className='font-medium'>Start Date</p>
                              <p className='text-gray-600'>{diffForHumans(med.startDate)}</p>
                            </div>
                            <div>
                              <p className='font-medium'>Start Date</p>
                              <p className='text-gray-600'>{diffForHumans(med.endDate)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value='vaccinations' className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Your Vaccinations</h2>
              <Button onClick={() => setVaccinationModalOpen(true)}>
                <Plus className='h-4 w-4 mr-2' />
                Add Vaccination
              </Button>
            </div>
            <div className='grid gap-4'>
              {vaccinations.map((vac) => (
                <Card key={vac.id}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-lg'>{vac.name}</CardTitle>
                    <div className='flex space-x-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setEditingItem(vac)
                          setVaccinationModalOpen(true)
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <p className='font-medium'>Date Received</p>
                        <p className='text-gray-600'>{vac.date}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Next Due</p>
                        <p className='text-gray-600'>{vac.nextDue}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Status</p>
                        <Badge variant='secondary'>{vac.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='appointments' className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Your Appointments</h2>
              <Button onClick={() => setAppointmentModalOpen(true)}>
                <Plus className='h-4 w-4 mr-2' />
                Schedule Appointment
              </Button>
            </div>
            <div className='grid gap-4'>
              {appointments.map((apt) => (
                <Card key={apt.id}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-lg'>{apt.doctor}</CardTitle>
                    <div className='flex space-x-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setEditingItem(apt)
                          setAppointmentModalOpen(true)
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <p className='font-medium'>Specialty</p>
                        <p className='text-gray-600'>{apt.specialty}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Date</p>
                        <p className='text-gray-600'>{apt.date}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Time</p>
                        <p className='text-gray-600'>{apt.time}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Status</p>
                        <Badge variant='default'>{apt.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='orders' className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold'>Your Orders</h2>
              <Link href='/products'>
                <Button>
                  <ShoppingBag className='h-4 w-4 mr-2' />
                  Shop Products
                </Button>
              </Link>
            </div>
            <div className='grid gap-4'>
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-lg'>Order #{order.id}</CardTitle>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant='outline' size='sm'>
                        View Details
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <p className='font-medium'>Items</p>
                        <p className='text-gray-600'>{order.items}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Total</p>
                        <p className='text-gray-600'>{order.total}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Date</p>
                        <p className='text-gray-600'>{order.date}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Status</p>
                        <Badge variant={order.status === "Delivered" ? "secondary" : "default"}>{order.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <MedicationModal open={medicationModalOpen} onOpenChange={setMedicationModalOpen} editingItem={editingItem} onClose={() => setEditingItem(null)} />
      <VaccinationModal open={vaccinationModalOpen} onOpenChange={setVaccinationModalOpen} editingItem={editingItem} onClose={() => setEditingItem(null)} />
      <AppointmentModal open={appointmentModalOpen} onOpenChange={setAppointmentModalOpen} editingItem={editingItem} onClose={() => setEditingItem(null)} />
    </div>
  )
}
