'use client'

import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)

  const { cart, cartIsEmpty, cartTotal, clearCart } = useCart()

  const handleSubmitOrder = async () => {
    if (cartIsEmpty) return

    setIsLoading(true)
    setError(null)

    try {
      console.log('Cart items:', cart?.items)
      const orderData = {
        total: cartTotal.amount,
        currency: 'INR', // Default currency
        items: cart?.items?.reduce((acc, item) => {
          if (!item?.product) return acc;
          
          // Create the order item with the correct relationship format
          type OrderItem = {
            product: {
              relationTo: 'products';
              value: string;
            };
            quantity: number;
            variant?: string;
          };

          if (!item.product) {
            console.error('Missing product in cart item:', item);
            return acc;
          }

          // Create order item with just the product ID
          const orderItem = {
            product: typeof item.product === 'object' ? item.product.id : item.product,
            quantity: item.quantity || 1,
            ...(item.variant ? { variant: item.variant } : {})
          };

          console.log('Created order item:', orderItem);

          acc.push(orderItem);
          return acc;
        }, [] as { product: number; quantity: number; variant?: string }[]) || [],
        email: user?.email || email, // Use user's email if logged in, otherwise use guest email
      }

      console.log('Order data:', orderData)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || 'Error creating order')
      }

      clearCart()
      router.push(`/orders/${json.doc.id}`)
    } catch (err) {
      setError(err.message || 'Error processing order')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        {!user && (
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <span>or</span>
              <Button asChild variant="outline">
                <Link href="/create-account">Create Account</Link>
              </Button>
            </div>
          </div>
        )}

        {user ? (
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <p className="text-lg">Checking out as {user.email}</p>
            <p className="text-sm mt-2">
              Not you? <Link href="/logout" className="text-blue-500 hover:text-blue-600">Log out</Link>
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Guest Checkout</h3>
            <div className="max-w-md">
              <Label htmlFor="email">Email Address</Label>
              <Input
                disabled={!emailEditable}
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="mt-1"
              />
              {emailEditable && email && (
                <Button
                  onClick={() => setEmailEditable(false)}
                  className="mt-4"
                  variant="default"
                >
                  Continue as guest
                </Button>
              )}
            </div>
          </div>
        )}

        {cartIsEmpty ? (
          <div className="text-center py-8">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Button asChild variant="default">
              <Link href="/search">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object' && item.product) {
                  return (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <Price amount={(item.product.price || 0) * (item.quantity || 1)} currencyCode="INR" />
                    </div>
                  )
                }
                return null
              })}
              <div className="pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <Price amount={cartTotal.amount} currencyCode="INR" />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6">
                <Message error={error} />
              </div>
            )}

            <Button
              onClick={handleSubmitOrder}
              disabled={isLoading || (!user && !email)}
              className="w-full mt-6"
              variant="default"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
