"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, ShoppingCart, Plus, Minus, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock products data
const products = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    description: "Automatic upper arm blood pressure monitor with large display",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.jpg?height=200&width=200",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    category: "Medical Devices"
  },
  {
    id: 2,
    name: "Infrared Thermometer",
    description: "Non-contact forehead thermometer with fever alarm",
    price: 45.99,
    originalPrice: null,
    image: "/placeholder.jpg?height=200&width=200",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    category: "Medical Devices"
  },
  {
    id: 3,
    name: "Pulse Oximeter",
    description: "Fingertip pulse oximeter with LED display",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.jpg?height=200&width=200",
    rating: 4.7,
    reviews: 256,
    inStock: false,
    category: "Medical Devices"
  },
  {
    id: 4,
    name: "Digital Scale",
    description: "Precision digital bathroom scale with BMI calculation",
    price: 34.99,
    originalPrice: null,
    image: "/placeholder.jpg?height=200&width=200",
    rating: 4.2,
    reviews: 67,
    inStock: true,
    category: "Medical Devices"
  }
]

export default function CategoryProductsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }))
  }

  const getCartQuantity = (productId: number) => cart[productId] || 0

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-6'>
          <Link href='/products' className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
            <ArrowLeft className='h-4 w-4' />
            Back to Categories
          </Link>
        </div>

        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Medical Devices</h1>
          <p className='text-gray-600'>Professional medical equipment and diagnostic tools</p>
        </div>

        {/* Search and Filter */}
        <div className='mb-8 flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input placeholder='Search products...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='pl-10' />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Name A-Z</SelectItem>
              <SelectItem value='price-low'>Price: Low to High</SelectItem>
              <SelectItem value='price-high'>Price: High to Low</SelectItem>
              <SelectItem value='rating'>Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' className='flex items-center gap-2 bg-transparent'>
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {sortedProducts.map((product) => (
            <Card key={product.id} className='h-full hover:shadow-lg transition-shadow duration-300 pt-0'>
              <CardHeader className='p-0'>
                <div className='relative h-48 bg-gray-200 rounded-t-lg overflow-hidden'>
                  <img src={product.image || "/placeholder.jpg"} alt={product.name} className='w-full h-full object-cover' />
                  {product.originalPrice && <Badge className='absolute top-2 left-2 bg-red-500'>Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>}
                  {!product.inStock && (
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                      <Badge variant='secondary'>Out of Stock</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className='p-4 flex flex-col h-full'>
                <CardTitle className='text-lg mb-2 line-clamp-2'>{product.name}</CardTitle>
                <CardDescription className='text-sm text-gray-600 mb-4 flex-1'>{product.description}</CardDescription>

                <div className='flex items-center gap-1 mb-3'>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className='text-sm text-gray-600'>
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl font-bold text-green-600'>${product.price}</span>
                    {product.originalPrice && <span className='text-sm text-gray-500 line-through'>${product.originalPrice}</span>}
                  </div>
                </div>

                {product.inStock ? (
                  <div className='flex flex-col items-center gap-2'>
                    {getCartQuantity(product.id) > 0 ? (
                      <div className='flex items-center gap-2 flex-1'>
                        <Button variant='outline' size='icon' onClick={() => removeFromCart(product.id)} className='h-8 w-8'>
                          <Minus className='h-4 w-4' />
                        </Button>
                        <span className='font-medium min-w-[2rem] text-center'>{getCartQuantity(product.id)}</span>
                        <Button variant='outline' size='icon' onClick={() => addToCart(product.id)} className='h-8 w-8'>
                          <Plus className='h-4 w-4' />
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => addToCart(product.id)} className='flex-1' size='sm'>
                        <ShoppingCart className='h-4 w-4 mr-2' />
                        Add to Cart
                      </Button>
                    )}
                    {getCartQuantity(product.id) > 0 && (
                      <Link href='/cart' className='mt-2'>
                        <Button variant='outline' size='sm' className='w-full bg-transparent'>
                          View Cart ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)})
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <Button disabled className='w-full' size='sm'>
                    Out of Stock
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Search className='h-12 w-12 mx-auto' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No products found</h3>
            <p className='text-gray-600'>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
