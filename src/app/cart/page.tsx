"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, User, LogOut, CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Mock cart data - in real app this would come from state management
const mockCartItems = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    description: "Automatic upper arm blood pressure monitor with large display",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.jpg?height=100&width=100",
    quantity: 1,
    inStock: true
  },
  {
    id: 2,
    name: "Infrared Thermometer",
    description: "Non-contact forehead thermometer with fever alarm",
    price: 45.99,
    originalPrice: null,
    image: "/placeholder.jpg?height=100&width=100",
    quantity: 2,
    inStock: true
  },
  {
    id: 4,
    name: "Digital Scale",
    description: "Precision digital bathroom scale with BMI calculation",
    price: 34.99,
    originalPrice: null,
    image: "/placeholder.jpg?height=100&width=100",
    quantity: 1,
    inStock: true
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderData, setOrderData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Payment Information
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Order Options
    shippingMethod: "standard",
    specialInstructions: "",
    saveAddress: false,
    subscribeNewsletter: false
  })

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)
  const shipping = subtotal > 75 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order placed:", { orderData, cartItems, total })
    // Handle order placement
    alert("Order placed successfully!")
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <div className='mb-8'>
            <ShoppingCart className='h-24 w-24 mx-auto text-gray-300 mb-4' />
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Your Cart is Empty</h1>
            <p className='text-gray-600 mb-8'>Add some medical products to get started with your order.</p>
            <Link href='/products'>
              <Button size='lg'>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-6'>
          <Link href='/products' className='flex items-center gap-2 text-blue-600 hover:text-blue-700'>
            <ArrowLeft className='h-4 w-4' />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Shopping Cart</h1>
          <p className='text-gray-600'>Review your items and proceed to checkout</p>
        </div>

        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShoppingCart className='h-5 w-5' />
                  Cart Items ({cartItems.length})
                </CardTitle>
                <CardDescription>{subtotal > 75 ? "🎉 You qualify for free shipping!" : `Add $${(75 - subtotal).toFixed(2)} more for free shipping`}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className='flex gap-4'>
                      <img src={item.image || "/placeholder.jpg"} alt={item.name} className='w-20 h-20 object-cover rounded-lg bg-gray-100' />
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{item.name}</h3>
                        <p className='text-sm text-gray-600 mt-1'>{item.description}</p>

                        <div className='flex items-center gap-2 mt-2'>
                          <span className='font-semibold text-green-600'>${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <>
                              <span className='text-sm text-gray-500 line-through'>${item.originalPrice.toFixed(2)}</span>
                              <Badge variant='secondary' className='text-xs'>
                                Save ${(item.originalPrice - item.price).toFixed(2)}
                              </Badge>
                            </>
                          )}
                        </div>

                        <div className='flex items-center justify-between mt-3'>
                          <div className='flex items-center gap-2'>
                            <Button variant='outline' size='icon' className='h-8 w-8 bg-transparent' onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className='h-4 w-4' />
                            </Button>
                            <span className='font-medium min-w-[2rem] text-center'>{item.quantity}</span>
                            <Button variant='outline' size='icon' className='h-8 w-8 bg-transparent' onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className='h-4 w-4' />
                            </Button>
                          </div>

                          <div className='flex items-center gap-2'>
                            <span className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</span>
                            <Button variant='ghost' size='icon' className='h-8 w-8 text-red-500 hover:text-red-700' onClick={() => removeItem(item.id)}>
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className='mt-4' />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className='sticky top-4'>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className='flex justify-between text-green-600'>
                      <span>Savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className='flex justify-between font-semibold text-lg'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className='w-full' size='lg' onClick={() => setShowCheckout(true)}>
                  Proceed to Checkout
                </Button>

                <div className='text-center text-sm text-gray-600'>
                  <p>🔒 Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Checkout Form Modal/Section */}
        {showCheckout && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold'>Checkout</h2>
                  <Button variant='ghost' onClick={() => setShowCheckout(false)}>
                    ✕
                  </Button>
                </div>

                <form onSubmit={handleCheckout} className='space-y-6'>
                  <div className='grid gap-6 lg:grid-cols-2'>
                    {/* Shipping Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                          <Truck className='h-5 w-5' />
                          Shipping Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-4'>
                        <div className='grid gap-4 md:grid-cols-2'>
                          <div className='space-y-2'>
                            <Label htmlFor='firstName'>First Name</Label>
                            <Input id='firstName' value={orderData.firstName} onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })} required />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='lastName'>Last Name</Label>
                            <Input id='lastName' value={orderData.lastName} onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })} required />
                          </div>
                        </div>

                        <div className='grid gap-4 md:grid-cols-2'>
                          <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' type='email' value={orderData.email} onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} required />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='phone'>Phone</Label>
                            <Input id='phone' type='tel' value={orderData.phone} onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })} />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='address'>Address</Label>
                          <Input id='address' value={orderData.address} onChange={(e) => setOrderData({ ...orderData, address: e.target.value })} required />
                        </div>

                        <div className='grid gap-4 md:grid-cols-3'>
                          <div className='space-y-2'>
                            <Label htmlFor='city'>City</Label>
                            <Input id='city' value={orderData.city} onChange={(e) => setOrderData({ ...orderData, city: e.target.value })} required />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='state'>State</Label>
                            <Input id='state' value={orderData.state} onChange={(e) => setOrderData({ ...orderData, state: e.target.value })} required />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='zipCode'>ZIP Code</Label>
                            <Input id='zipCode' value={orderData.zipCode} onChange={(e) => setOrderData({ ...orderData, zipCode: e.target.value })} required />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label>Shipping Method</Label>
                          <RadioGroup value={orderData.shippingMethod} onValueChange={(value) => setOrderData({ ...orderData, shippingMethod: value })}>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='standard' id='standard' />
                              <Label htmlFor='standard'>Standard Shipping (5-7 days) - {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='express' id='express' />
                              <Label htmlFor='express'>Express Shipping (2-3 days) - $19.99</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='overnight' id='overnight' />
                              <Label htmlFor='overnight'>Overnight Shipping - $39.99</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                          <CreditCard className='h-5 w-5' />
                          Payment Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Payment Method</Label>
                          <RadioGroup value={orderData.paymentMethod} onValueChange={(value) => setOrderData({ ...orderData, paymentMethod: value })}>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='credit-card' id='credit-card' />
                              <Label htmlFor='credit-card'>Credit/Debit Card</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='paypal' id='paypal' />
                              <Label htmlFor='paypal'>PayPal</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {orderData.paymentMethod === "credit-card" && (
                          <>
                            <div className='space-y-2'>
                              <Label htmlFor='cardName'>Name on Card</Label>
                              <Input id='cardName' value={orderData.cardName} onChange={(e) => setOrderData({ ...orderData, cardName: e.target.value })} required />
                            </div>

                            <div className='space-y-2'>
                              <Label htmlFor='cardNumber'>Card Number</Label>
                              <Input id='cardNumber' placeholder='1234 5678 9012 3456' value={orderData.cardNumber} onChange={(e) => setOrderData({ ...orderData, cardNumber: e.target.value })} required />
                            </div>

                            <div className='grid gap-4 md:grid-cols-2'>
                              <div className='space-y-2'>
                                <Label htmlFor='expiryDate'>Expiry Date</Label>
                                <Input id='expiryDate' placeholder='MM/YY' value={orderData.expiryDate} onChange={(e) => setOrderData({ ...orderData, expiryDate: e.target.value })} required />
                              </div>
                              <div className='space-y-2'>
                                <Label htmlFor='cvv'>CVV</Label>
                                <Input id='cvv' placeholder='123' value={orderData.cvv} onChange={(e) => setOrderData({ ...orderData, cvv: e.target.value })} required />
                              </div>
                            </div>
                          </>
                        )}

                        <div className='space-y-2'>
                          <Label htmlFor='specialInstructions'>Special Instructions</Label>
                          <Textarea id='specialInstructions' placeholder='Any special delivery instructions...' value={orderData.specialInstructions} onChange={(e) => setOrderData({ ...orderData, specialInstructions: e.target.value })} />
                        </div>

                        <div className='space-y-3'>
                          <div className='flex items-center space-x-2'>
                            <Checkbox id='saveAddress' checked={orderData.saveAddress} onCheckedChange={(checked) => setOrderData({ ...orderData, saveAddress: checked as boolean })} />
                            <Label htmlFor='saveAddress' className='text-sm'>
                              Save this address for future orders
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Checkbox id='subscribeNewsletter' checked={orderData.subscribeNewsletter} onCheckedChange={(checked) => setOrderData({ ...orderData, subscribeNewsletter: checked as boolean })} />
                            <Label htmlFor='subscribeNewsletter' className='text-sm'>
                              Subscribe to health tips and product updates
                            </Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Summary in Checkout */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Final Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {savings > 0 && (
                          <div className='flex justify-between text-green-600'>
                            <span>Total Savings</span>
                            <span>-${savings.toFixed(2)}</span>
                          </div>
                        )}
                        <div className='flex justify-between'>
                          <span>Shipping</span>
                          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className='flex justify-between font-bold text-lg'>
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Buttons */}
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button type='button' variant='outline' onClick={() => setShowCheckout(false)} className='flex-1 bg-transparent'>
                      Back to Cart
                    </Button>
                    <Button type='submit' className='flex-1' size='lg'>
                      Place Order - ${total.toFixed(2)}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
