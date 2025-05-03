import Link from "next/link"
import { CheckCircle, Download, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage({ params }: { params: { id: string } }) {
  const productId = params.id

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold md:text-3xl">Payment Successful!</h1>
        <p className="mb-6 text-muted-foreground">
          Your purchase has been completed successfully. The seller has been notified and will process your order
          shortly.
        </p>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Details</h2>

            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="font-medium">ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4">
          <Button className="w-full bg-blue-800 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>

          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Seller
          </Button>

          <div className="pt-2">
            <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
