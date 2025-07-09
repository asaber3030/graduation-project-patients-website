"use client"

import type React from "react"

import { use, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { LoginData } from "@/types/default"
import { getPatient, loginAction } from "@/actions/auth"
import { LoadingButton } from "@/components/common/loading-button"
import { useUser } from "@/hooks/auth/use-user"
import { redirect } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const user = useUser()

  const mutation = useMutation({
    mutationFn: (data: LoginData) => loginAction(data),
    onSuccess: (data) => {
      toast.success("Login successful!")
    },
    onError: (error: Error) => {
      console.error("Login error:", error)
      toast.error(error.message || "Login failed")
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    mutation.mutate(formData)
  }

  if (user) return redirect("/dashboard")

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <Link href='/' className='text-3xl font-bold text-blue-600'>
            Techmed
          </Link>
          <p className='text-gray-600 mt-2'>Welcome back to your health dashboard</p>
        </div>

        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
            <CardDescription className='text-center'>Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='Enter your email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input id='password' type={showPassword ? "text" : "password"} placeholder='Enter your password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                  <Button type='button' variant='ghost' size='icon' className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <input type='checkbox' id='remember' className='rounded' />
                  <Label htmlFor='remember' className='text-sm'>
                    Remember me
                  </Label>
                </div>
                <Link href='#' className='text-sm text-blue-600 hover:underline'>
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col space-y-4 mt-4'>
              <LoadingButton loading={mutation.isPending} type='submit' className='w-full'>
                Sign In
              </LoadingButton>
              <div className='text-center text-sm'>
                {"Don't have an account? "}
                <Link href='/auth/register' className='text-blue-600 hover:underline'>
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
