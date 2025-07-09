"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, LogOut, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Practice", available: true },
  { id: 2, name: "Dr. Michael Chen", specialty: "Cardiology", available: true },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatology", available: false },
  { id: 4, name: "Dr. David Kim", specialty: "Orthopedics", available: true }
]

const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"]

export default function CreateAppointmentPage() {
  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    appointmentType: "",
    reason: "",
    symptoms: "",
    urgency: "",
    preferredContact: "",
    notes: "",
    insurance: "",
    referral: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appointment data:", formData)
    // Handle appointment creation
  }

  const selectedDoctor = doctors.find((doc) => doc.id.toString() === formData.doctor)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <Link href='/' className='text-2xl font-bold text-blue-600'>
              Techmed
            </Link>
            <div className='flex items-center space-x-4'>
              <Link href='/dashboard'>
                <Button variant='ghost' size='icon'>
                  <User className='h-5 w-5' />
                </Button>
              </Link>
              <Button variant='ghost' size='icon'>
                <LogOut className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-6'>
          <Link href='/dashboard' className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
            <ArrowLeft className='h-4 w-4' />
            Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Schedule New Appointment</h1>
          <p className='text-gray-600'>Book your medical appointment with our Techmedfessionals</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Doctor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Select Techmedvider
              </CardTitle>
              <CardDescription>Choose your preferred doctor and specialty</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='specialty'>Medical Specialty</Label>
                  <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select specialty' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='general'>General Practice</SelectItem>
                      <SelectItem value='cardiology'>Cardiology</SelectItem>
                      <SelectItem value='dermatology'>Dermatology</SelectItem>
                      <SelectItem value='endocrinology'>Endocrinology</SelectItem>
                      <SelectItem value='neurology'>Neurology</SelectItem>
                      <SelectItem value='orthopedics'>Orthopedics</SelectItem>
                      <SelectItem value='psychiatry'>Psychiatry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='doctor'>Doctor</Label>
                  <Select value={formData.doctor} onValueChange={(value) => setFormData({ ...formData, doctor: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select doctor' />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()} disabled={!doctor.available}>
                          {doctor.name} - {doctor.specialty}
                          {!doctor.available && " (Unavailable)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-5 w-5' />
                Date & Time
              </CardTitle>
              <CardDescription>Select your preferred appointment date and time</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Preferred Date</Label>
                  <Input id='date' type='date' value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} min={new Date().toISOString().split("T")[0]} required />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='time'>Preferred Time</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select time slot' />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Provide information about your visit</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Appointment Type</Label>
                <RadioGroup value={formData.appointmentType} onValueChange={(value) => setFormData({ ...formData, appointmentType: value })} className='flex flex-wrap gap-4'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='consultation' id='consultation' />
                    <Label htmlFor='consultation'>Consultation</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='follow-up' id='follow-up' />
                    <Label htmlFor='follow-up'>Follow-up</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='checkup' id='checkup' />
                    <Label htmlFor='checkup'>Regular Checkup</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='urgent' id='urgent' />
                    <Label htmlFor='urgent'>Urgent Care</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='reason'>Reason for Visit</Label>
                <Input id='reason' value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} placeholder='Brief description of your concern' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='symptoms'>Current Symptoms</Label>
                <Textarea id='symptoms' value={formData.symptoms} onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })} placeholder="Describe any symptoms you're experiencing" className='min-h-[100px]' />
              </div>

              <div className='space-y-2'>
                <Label>Urgency Level</Label>
                <RadioGroup value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })} className='flex gap-4'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='low' id='low' />
                    <Label htmlFor='low'>Low</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='medium' id='medium' />
                    <Label htmlFor='medium'>Medium</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='high' id='high' />
                    <Label htmlFor='high'>High</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Phone className='h-5 w-5' />
                Contact & Insurance Information
              </CardTitle>
              <CardDescription>How we should contact you and insurance details</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Preferred Contact Method</Label>
                <RadioGroup value={formData.preferredContact} onValueChange={(value) => setFormData({ ...formData, preferredContact: value })} className='flex gap-4'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='phone' id='phone' />
                    <Label htmlFor='phone'>Phone</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='email' id='email' />
                    <Label htmlFor='email'>Email</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='sms' id='sms' />
                    <Label htmlFor='sms'>SMS</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='insurance'>Insurance Provider</Label>
                  <Input id='insurance' value={formData.insurance} onChange={(e) => setFormData({ ...formData, insurance: e.target.value })} placeholder='Your insurance company' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='referral'>Referral Code (if any)</Label>
                  <Input id='referral' value={formData.referral} onChange={(e) => setFormData({ ...formData, referral: e.target.value })} placeholder='Referral or authorization code' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Any other details you'd like to share</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Label htmlFor='notes'>Additional Notes</Label>
                <Textarea id='notes' value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder='Any additional information, special requirements, or questions' className='min-h-[100px]' />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button type='submit' className='flex-1'>
              Schedule Appointment
            </Button>
            <Button type='button' variant='outline' className='flex-1 bg-transparent'>
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
