"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, LogOut, Camera, Save, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin, Shellfish",
    medicalConditions: "Hypertension",
    currentMedications: "Lisinopril 10mg daily",
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceId: "BC123456789",
    primaryDoctor: "Dr. Sarah Johnson",
    notes: "Prefers morning appointments"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", formData)
    setIsEditing(false)
    // Handle profile update
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-6'>
          <Link href='/dashboard' className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
            <ArrowLeft className='h-4 w-4' />
            Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Patient Profile</h1>
            <p className='text-gray-600 mt-2'>Manage your personal and medical information</p>
          </div>
          <div className='flex gap-2'>
            {isEditing ? (
              <>
                <Button variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className='h-4 w-4 mr-2' />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className='h-4 w-4 mr-2' />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue='personal' className='space-y-6'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='personal'>Personal Info</TabsTrigger>
              <TabsTrigger value='medical'>Medical Info</TabsTrigger>
              <TabsTrigger value='insurance'>Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value='personal' className='space-y-6'>
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile photo</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center gap-6'>
                  <Avatar className='h-24 w-24'>
                    <AvatarImage src='/placeholder.jpg?height=96&width=96' />
                    <AvatarFallback className='text-2xl'>
                      {formData.firstName[0]}
                      {formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant='outline' className='flex items-center gap-2 bg-transparent'>
                      <Camera className='h-4 w-4' />
                      Change Photo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic personal details</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input id='firstName' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} disabled={!isEditing} required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input id='lastName' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} disabled={!isEditing} required />
                    </div>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!isEditing} required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input id='phone' type='tel' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} />
                    </div>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                      <Input id='dateOfBirth' type='date' value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} disabled={!isEditing} required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='gender'>Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                          <SelectItem value='prefer-not-to-say'>Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Your residential address</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='address'>Street Address</Label>
                    <Input id='address' value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className='grid gap-4 md:grid-cols-3'>
                    <div className='space-y-2'>
                      <Label htmlFor='city'>City</Label>
                      <Input id='city' value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} disabled={!isEditing} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='state'>State</Label>
                      <Input id='state' value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} disabled={!isEditing} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='zipCode'>ZIP Code</Label>
                      <Input id='zipCode' value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Person to contact in case of emergency</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='emergencyContact'>Contact Name</Label>
                      <Input id='emergencyContact' value={formData.emergencyContact} onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} disabled={!isEditing} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='emergencyPhone'>Contact Phone</Label>
                      <Input id='emergencyPhone' type='tel' value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='medical' className='space-y-6'>
              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                  <CardDescription>Your medical history and current health status</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='bloodType'>Blood Type</Label>
                    <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select blood type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='A+'>A+</SelectItem>
                        <SelectItem value='A-'>A-</SelectItem>
                        <SelectItem value='B+'>B+</SelectItem>
                        <SelectItem value='B-'>B-</SelectItem>
                        <SelectItem value='AB+'>AB+</SelectItem>
                        <SelectItem value='AB-'>AB-</SelectItem>
                        <SelectItem value='O+'>O+</SelectItem>
                        <SelectItem value='O-'>O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='allergies'>Allergies</Label>
                    <Textarea id='allergies' value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} disabled={!isEditing} placeholder='List any known allergies' className='min-h-[80px]' />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='medicalConditions'>Medical Conditions</Label>
                    <Textarea id='medicalConditions' value={formData.medicalConditions} onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })} disabled={!isEditing} placeholder='List any chronic conditions or ongoing health issues' className='min-h-[80px]' />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='currentMedications'>Current Medications</Label>
                    <Textarea id='currentMedications' value={formData.currentMedications} onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })} disabled={!isEditing} placeholder='List all current medications with dosages' className='min-h-[80px]' />
                  </div>
                </CardContent>
              </Card>

              {/* Techmedvider */}
              <Card>
                <CardHeader>
                  <CardTitle>Techmedvider</CardTitle>
                  <CardDescription>Your primary healthcare information</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='primaryDoctor'>Primary Doctor</Label>
                    <Input id='primaryDoctor' value={formData.primaryDoctor} onChange={(e) => setFormData({ ...formData, primaryDoctor: e.target.value })} disabled={!isEditing} placeholder='Dr. Name' />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='insurance' className='space-y-6'>
              {/* Insurance Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                  <CardDescription>Your health insurance details</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='insuranceProvider'>Insurance Provider</Label>
                      <Input id='insuranceProvider' value={formData.insuranceProvider} onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })} disabled={!isEditing} placeholder='Insurance company name' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='insuranceId'>Insurance ID</Label>
                      <Input id='insuranceId' value={formData.insuranceId} onChange={(e) => setFormData({ ...formData, insuranceId: e.target.value })} disabled={!isEditing} placeholder='Policy or member ID' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>Any additional information for Techmedviders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <Label htmlFor='notes'>Notes</Label>
                    <Textarea id='notes' value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} disabled={!isEditing} placeholder='Any special instructions or preferences' className='min-h-[100px]' />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}
