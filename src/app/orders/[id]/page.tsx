"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock order data
const orderData = {
  id: "ORD-2024-001",
  status: "Processing",
  orderDate: "2024-01-12",
  estimatedDelivery: "2024-01-18",
  total: 165.97,
  subtotal: 149.97,
  shipping: 9.99,
  tax: 6.01,
  items: [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      description: "Automatic upper arm blood pressure monitor with large display",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.jpg?height=100&width=100"
    },
    {
      id: 2,
      name: "Infrared Thermometer",
      description: "Non-contact forehead thermometer with fever alarm",
      price: 45.99,
      quantity: 1,
      image: "/placeholder.jpg?height=100&width=100"
    },
    {
      id: 3,
      name: "First Aid Kit",
      description: "Complete first aid kit for home and travel",
      price: 13.99,
      quantity: 1,
      image: "/placeholder.jpg?height=100&width=100"
    }
  ],
  shippingAddress: {
    name: "John Doe",
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    phone: "+1 (555) 123-4567"
  },
  paymentMethod: {
    type: "Credit Card",
    last4: "4242",
    brand: "Visa"
  }
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [order, setOrder] = useState(orderData)

  const handleCancelOrder = () => {
    setOrder((prev) => ({ ...prev, status: "Cancelled" }))
    setCancelDialogOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className='h-5 w-5 text-blue-500' />
      case "Shipped":
        return <Truck className='h-5 w-5 text-orange-500' />
      case "Delivered":
        return <CheckCircle className='h-5 w-5 text-green-500' />
      case "Cancelled":
        return <XCircle className='h-5 w-5 text-red-500' />
      default:
        return <Package className='h-5 w-5 text-gray-500' />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-orange-100 text-orange-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canCancelOrder = order.status === "Processing"

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

        {/* Order Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Order {order.id}</h1>
              <p className='text-gray-600 mt-1'>Placed on {order.orderDate}</p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                {getStatusIcon(order.status)}
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
              {canCancelOrder && (
                <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant='destructive'>Cancel Order</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Order</DialogTitle>
                      <DialogDescription>Are you sure you want to cancel this order? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant='outline' onClick={() => setCancelDialogOpen(false)}>
                        Keep Order
                      </Button>
                      <Button variant='destructive' onClick={handleCancelOrder}>
                        Cancel Order
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Order Items */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className='flex gap-4'>
                      <img src={item.image || "/placeholder.jpg"} alt={item.name} className='w-16 h-16 object-cover rounded-lg bg-gray-100' />
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{item.name}</h3>
                        <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-sm text-gray-500'>Qty: {item.quantity}</span>
                          <span className='font-medium'>${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className='mt-4' />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Details */}
          <div className='space-y-6'>
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className='flex justify-between font-semibold text-lg'>
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <p className='font-medium'>Estimated Delivery</p>
                  <p className='text-gray-600'>{order.estimatedDelivery}</p>
                </div>
                <Separator />
                <div>
                  <p className='font-medium'>Shipping Address</p>
                  <div className='text-gray-600 mt-1'>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{order.paymentMethod.brand}</span>
                  <span className='text-gray-600'>ending in {order.paymentMethod.last4}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Actions */}
        <div className='mt-8 flex flex-col sm:flex-row gap-4'>
          <Button variant='outline' className='flex-1 bg-transparent'>
            Track Package
          </Button>
          <Button variant='outline' className='flex-1 bg-transparent'>
            Contact Support
          </Button>
          <Button variant='outline' className='flex-1 bg-transparent'>
            Reorder Items
          </Button>
        </div>
      </div>
    </div>
  )
}
