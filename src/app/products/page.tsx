"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Grid3X3, User, LogOut, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: 1,
    name: "Medical Devices",
    description: "Blood pressure monitors, thermometers, and diagnostic tools",
    productCount: 45,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Medications",
    description: "Over-the-counter and prescription medications",
    productCount: 120,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Supplements",
    description: "Vitamins, minerals, and nutritional supplements",
    productCount: 80,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "First Aid",
    description: "Bandages, antiseptics, and emergency supplies",
    productCount: 35,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-red-500"
  },
  {
    id: 5,
    name: "Personal Care",
    description: "Hygiene products and personal health items",
    productCount: 60,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-pink-500"
  },
  {
    id: 6,
    name: "Mobility Aids",
    description: "Wheelchairs, walkers, and mobility assistance",
    productCount: 25,
    image: "/placeholder.jpg?height=200&width=300",
    color: "bg-orange-500"
  }
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.description.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Product Categories</h1>
          <p className='text-gray-600'>Browse our comprehensive selection of medical products and supplies</p>
        </div>

        {/* Search and Filter */}
        <div className='mb-8 flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input placeholder='Search categories...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='pl-10' />
          </div>
          <Button variant='outline' className='flex items-center gap-2 bg-transparent'>
            <Filter className='h-4 w-4' />
            Filter
          </Button>
          <Button variant='outline' className='flex items-center gap-2 bg-transparent'>
            <Grid3X3 className='h-4 w-4' />
            View All Products
          </Button>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCategories.map((category) => (
            <Link key={category.id} href={`/products/category/${category.id}`}>
              <Card className='h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group pt-0'>
                <CardHeader className='p-0'>
                  <div className='relative h-48 bg-gray-200 rounded-t-lg overflow-hidden'>
                    <img src={category.image || "/placeholder.jpg"} alt={category.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                    <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${category.color}`}></div>
                  </div>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='flex justify-between items-start mb-2'>
                    <CardTitle className='text-xl group-hover:text-blue-600 transition-colors'>{category.name}</CardTitle>
                    <Badge variant='secondary' className='ml-2'>
                      {category.productCount}
                    </Badge>
                  </div>
                  <CardDescription className='text-gray-600 mb-4'>{category.description}</CardDescription>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>{category.productCount} products</span>
                    <Button variant='ghost' size='sm' className='text-blue-600 hover:text-blue-700 p-0'>
                      Browse →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Grid3X3 className='h-12 w-12 mx-auto' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No categories found</h3>
            <p className='text-gray-600'>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
