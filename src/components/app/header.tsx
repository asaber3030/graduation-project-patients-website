"use client"

import { Calendar, Pill, Shield, ShoppingBag, User, ShoppingCart, CheckCircle, Star, Users, Clock, Award, Heart, Phone, Mail, MapPin, ArrowRight, Play, Smartphone, Lock, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/hooks/auth/use-user"

export const AppNavbar = () => {
  const user = useUser()

  return (
    <header className='bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Heart className='h-5 w-5 text-white' />
              </div>
              <h1 className='text-2xl font-bold text-gray-900'>Techmed</h1>
            </div>
          </div>
          <nav className='hidden md:flex items-center space-x-8'>
            <Link href='#features' className='text-gray-600 hover:text-blue-600 transition-colors'>
              Features
            </Link>
            <Link href='#how-it-works' className='text-gray-600 hover:text-blue-600 transition-colors'>
              How it Works
            </Link>
            <Link href='#testimonials' className='text-gray-600 hover:text-blue-600 transition-colors'>
              Reviews
            </Link>
            <Link href='#contact' className='text-gray-600 hover:text-blue-600 transition-colors'>
              Contact
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <Link href='/cart'>
              <Button variant='ghost' size='icon'>
                <ShoppingCart className='h-5 w-5' />
              </Button>
            </Link>
            {!user ? (
              <>
                <Link href='/auth/login'>
                  <Button variant='ghost' className='text-gray-600 hover:text-blue-600'>
                    Login
                  </Button>
                </Link>
                <Link href='/auth/register'>
                  <Button className='bg-blue-600 hover:bg-blue-700'>Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/dashboard'>
                  <Button variant='ghost' size='icon'>
                    <User className='h-5 w-5' />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
