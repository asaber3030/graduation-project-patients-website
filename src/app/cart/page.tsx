"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCartStore } from "@/store/cart";
import { createOrder } from "@/actions/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { useUser } from "@/hooks/auth/use-user";

export default function CartPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const queryClient = useQueryClient();
  const user = useUser();

  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setIsCheckingOut(false);
      setShowConfirmation(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to place order");
      setIsCheckingOut(false);
      setShowConfirmation(false);
    },
  });

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Check if user is logged in
    if (!user) {
      setShowAuthAlert(true);
      return;
    }

    setIsCheckingOut(true);
    createOrderMutation.mutate(items);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/products"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Empty Cart */}
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link href="/products">
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/products"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <Package className="h-8 w-8 text-gray-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Dialog
                    open={showConfirmation}
                    onOpenChange={setShowConfirmation}
                  >
                    <DialogTrigger asChild>
                      <LoadingButton
                        onClick={() => {
                          if (!user) {
                            setShowAuthAlert(true);
                          } else {
                            setShowConfirmation(true);
                          }
                        }}
                        loading={isCheckingOut}
                        className="w-full"
                        disabled={items.length === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Proceed to Checkout
                      </LoadingButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          Confirm Your Order
                        </DialogTitle>
                        <DialogDescription>Please review your order details before confirming. This action cannot be undone.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Order Summary in Modal */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <h4 className="font-semibold text-sm">Order Summary:</h4>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between text-sm"
                              >
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total ({getTotalItems()} items)</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setShowConfirmation(false)}
                            className="flex-1"
                            disabled={isCheckingOut}
                          >
                            Cancel
                          </Button>
                          <LoadingButton
                            onClick={handleCheckout}
                            loading={isCheckingOut}
                            className="flex-1"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Confirm Order
                          </LoadingButton>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Authentication Alert Dialog */}
        <Dialog
          open={showAuthAlert}
          onOpenChange={setShowAuthAlert}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Login Required
              </DialogTitle>
              <DialogDescription>You need to be logged in to complete your purchase. Please sign in or create an account to continue.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAuthAlert(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Link
                  href="/auth/login"
                  className="flex-1"
                >
                  <Button className="w-full">Sign In</Button>
                </Link>
              </div>
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
