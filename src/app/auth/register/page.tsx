"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "react-toastify"
import { LoadingButton } from "@/components/common/loading-button"
import { useMutation } from "@tanstack/react-query"
import { RegisterData } from "@/types/default"
import { registerAction } from "@/actions/auth"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/common/form/input-field"
import { useForm } from "react-hook-form"
import { RegisterSchema } from "@/schema/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(RegisterSchema)
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: RegisterData) => registerAction(data),
    onSuccess: () => {
      toast.success("Account created successfully!")
      router.push("/auth/login")
    },
    onError: (error: any) => {
      toast.error(error?.message || "An error occurred while creating the account.")
    }
  })

  const handleSubmit = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <Link href='/' className='text-3xl font-bold text-blue-600'>
            Techmed
          </Link>
          <p className='text-gray-600 mt-2'>Create your health management account</p>
        </div>

        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center'>Create Account</CardTitle>
            <CardDescription className='text-center'>Fill in your information to get started</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <InputField control={form.control} name='name' label='Full Name' placeholder='John Doe' />
                  <InputField control={form.control} name='nationalId' label='National ID' placeholder='53513452345634' />
                </div>
                <InputField control={form.control} name='email' label='Email Address' placeholder='Email Address' />
                <InputField control={form.control} name='phoneNumber' label='Phone Number' placeholder='Phone Number' />
                <InputField control={form.control} name='password' label='Password' placeholder='Password' type='password' />
              </CardContent>
              <CardFooter className='flex flex-col space-y-4 mt-4'>
                <LoadingButton loading={mutation.isPending} type='submit' className='w-full'>
                  Create Account
                </LoadingButton>
                <div className='text-center text-sm'>
                  Already have an account?{" "}
                  <Link href='/auth/login' className='text-blue-600 hover:underline'>
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
