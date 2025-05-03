"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Shield, AlertCircle, CreditCard, Phone, Mail, Calendar, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PaymentMethodCard from "@/components/payment-method-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock order data - in a real app, this would come from an API
const mockOrder = {
  id: "order-789",
  productId: "prod-123",
  productName: "Premium Organic Coffee Beans",
  quantity: 2,
  price: 24.99,
  currency: "USD",
  shippingCost: 5.99,
  total: 55.97, // (24.99 * 2) + 5.99
  seller: {
    name: "Organic Coffee Co.",
    id: "seller-456",
  },
  shippingMethod: "Standard Shipping (3-5 days)",
  deliveryDeadline: "May 15, 2023",
}

// Payment method options
const paymentMethods = [
  {
    id: "momo",
    name: "MoMoPay",
    icon: "💰",
    description: "Pay using your mobile money account",
  },
  {
    id: "airtel",
    name: "Airtel Money",
    icon: "📱",
    description: "Pay using your Airtel Money account",
  },
  {
    id: "visa",
    name: "Visa / Mastercard",
    icon: "💳",
    description: "Pay using your credit or debit card",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "🌐",
    description: "Pay using your PayPal account",
  },
]

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  // Form state for different payment methods
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // In a real app, you would fetch the order data based on the ID
  const orderId = params.id as string
  const order = mockOrder // This would be fetched from an API

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId)
    setPaymentError(null)
  }

  const validatePaymentDetails = () => {
    if (!selectedPayment) {
      setPaymentError("Please select a payment method")
      return false
    }

    switch (selectedPayment) {
      case "momo":
      case "airtel":
        if (!phoneNumber || phoneNumber.length < 10) {
          setPaymentError("Please enter a valid phone number")
          return false
        }
        break
      case "visa":
        if (!cardNumber || cardNumber.length < 16) {
          setPaymentError("Please enter a valid card number")
          return false
        }
        if (!cardExpiry || !cardExpiry.includes("/")) {
          setPaymentError("Please enter a valid expiration date (MM/YY)")
          return false
        }
        if (!cardCvc || cardCvc.length < 3) {
          setPaymentError("Please enter a valid security code")
          return false
        }
        if (!cardholderName) {
          setPaymentError("Please enter the cardholder name")
          return false
        }
        break
      case "paypal":
        if (!email || !email.includes("@")) {
          setPaymentError("Please enter a valid email address")
          return false
        }
        if (!password || password.length < 6) {
          setPaymentError("Please enter your password")
          return false
        }
        break
    }

    return true
  }

  const handlePaymentSubmit = () => {
    if (!validatePaymentDetails()) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Simulate successful payment
      router.push(`/payment/${orderId}/success`)

      // For demonstration, you could also simulate a failed payment
      // setPaymentError("Payment failed. Please try again.");
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    let formatted = ""
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += digits[i]
    }

    return formatted.substring(0, 19) // Limit to 16 digits + 3 spaces
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
    }

    return digits
  }

  const renderPaymentForm = () => {
    if (!selectedPayment) return null

    switch (selectedPayment) {
      case "momo":
      case "airtel":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500">
                You will receive a confirmation code on this number to complete the payment.
              </p>
            </div>
          </div>
        )

      case "visa":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Cardholder Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="cardholder-name"
                  placeholder="Name on card"
                  className="pl-10"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="pl-10"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    className="pl-10"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                    maxLength={5}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvc">Security Code</Label>
                <Input
                  id="cvc"
                  placeholder="CVC"
                  type="password"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 3))}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )

      case "paypal":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your PayPal email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your PayPal password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500">
                In a real application, you would be redirected to PayPal's secure login page.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-500 hover:text-gray-700"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Product
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Secure Payment</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 text-blue-800">
                <Shield className="h-5 w-5" />
                <AlertTitle>Secure Transaction</AlertTitle>
                <AlertDescription>
                  Your payment will be securely held (frozen) until the transaction is marked complete to ensure buyer
                  and seller protection.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="online">Online</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 pt-4">
                    {paymentMethods.map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        method={method}
                        isSelected={selectedPayment === method.id}
                        onSelect={() => handlePaymentSelect(method.id)}
                      />
                    ))}
                  </TabsContent>

                  <TabsContent value="mobile" className="space-y-4 pt-4">
                    {paymentMethods
                      .filter((method) => ["momo", "airtel"].includes(method.id))
                      .map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          method={method}
                          isSelected={selectedPayment === method.id}
                          onSelect={() => handlePaymentSelect(method.id)}
                        />
                      ))}
                  </TabsContent>

                  <TabsContent value="card" className="space-y-4 pt-4">
                    {paymentMethods
                      .filter((method) => method.id === "visa")
                      .map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          method={method}
                          isSelected={selectedPayment === method.id}
                          onSelect={() => handlePaymentSelect(method.id)}
                        />
                      ))}
                  </TabsContent>

                  <TabsContent value="online" className="space-y-4 pt-4">
                    {paymentMethods
                      .filter((method) => method.id === "paypal")
                      .map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          method={method}
                          isSelected={selectedPayment === method.id}
                          onSelect={() => handlePaymentSelect(method.id)}
                        />
                      ))}
                  </TabsContent>
                </Tabs>

                {renderPaymentForm()}

                {paymentError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{paymentError}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-blue-800 hover:bg-blue-900"
                size="lg"
                onClick={handlePaymentSubmit}
                disabled={isProcessing || !selectedPayment}
              >
                {isProcessing ? <>Processing Payment...</> : <>Complete Payment</>}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{order.productName}</h4>
                <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-500">Seller: {order.seller.name}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    {order.currency} {(order.price * order.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {order.currency} {order.shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Method</span>
                  <span className="text-right text-sm">{order.shippingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery By</span>
                  <span className="text-right text-sm">{order.deliveryDeadline}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    {order.currency} {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <Alert>
              <AlertDescription className="text-sm">
                By proceeding with payment, you agree to our Terms of Service and Payment Protection Policy.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
