"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const router = useRouter()
  const { toast } = useToast()
  const productId = params.id

  // Mock product data - in a real app, this would be fetched from an API
  const product = {
    id: productId,
    title: "Premium Gaming Account",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19)
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      formattedValue = value.replace(/\//g, "")
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Validate card number (16 digits)
    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required"
      valid = false
    } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number format"
      valid = false
    }

    // Validate card name
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
      valid = false
    }

    // Validate expiry date (MM/YY format)
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
      valid = false
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)"
      valid = false
    } else {
      const [month, year] = formData.expiryDate.split("/").map(Number)
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (month < 1 || month > 12) {
        newErrors.expiryDate = "Invalid month"
        valid = false
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = "Card has expired"
        valid = false
      }
    }

    // Validate CVV (3 or 4 digits)
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required"
      valid = false
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate payment processing
    try {
      // In a real app, this would be an API call to your payment processor
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful",
        description: "Your purchase has been completed successfully.",
      })

      // Redirect to success page
      router.push(`/checkout/${productId}/success`)
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/product/${productId}`}
        className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Product
      </Link>

      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        <div>
          <h1 className="mb-6 text-2xl font-bold md:text-3xl">Secure Checkout</h1>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=24&width=36" alt="Visa" className="h-6" />
                      <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" className="h-6" />
                      <img src="/placeholder.svg?height=24&width=36" alt="Amex" className="h-6" />
                    </div>
                  </div>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className={`pl-10 ${errors.cardNumber ? "border-red-500" : ""}`}
                      value={formData.cardNumber}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={19}
                    />
                  </div>
                  {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    className={errors.cardName ? "border-red-500" : ""}
                    value={formData.cardName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.cardName && <p className="text-xs text-red-500">{errors.cardName}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className={errors.expiryDate ? "border-red-500" : ""}
                      value={formData.expiryDate}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={5}
                    />
                    {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      className={errors.cvv ? "border-red-500" : ""}
                      value={formData.cvv}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={4}
                      type="password"
                    />
                    {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Secure Payment</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="mb-4 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">Digital Product</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Fee</span>
                  <span>${(product.price * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Secure Transaction Fee</span>
                  <span>${(product.price * 0.02).toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${(product.price * 1.07).toFixed(2)}</span>
              </div>

              <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-emerald-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-medium">Secure Transaction</h3>
                </div>
                <p className="mt-1 text-sm">
                  Your payment is protected by our escrow system. Funds will only be released to the seller after you
                  confirm receipt.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
