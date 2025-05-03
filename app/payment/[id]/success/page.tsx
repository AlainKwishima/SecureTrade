"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  
  // Simulate progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock order details
  const orderDetails = {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    product: "Premium Coffee Beans",
    quantity: 2,
    total: 59.97,
    estimatedDelivery: "May 10-12, 2023",
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="border-green-100">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
          <CardDescription>
            Your order has been placed and payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">\
