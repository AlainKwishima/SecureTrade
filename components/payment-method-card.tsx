"use client"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
}

interface PaymentMethodCardProps {
  method: PaymentMethod
  isSelected: boolean
  onSelect: () => void
}

export default function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected
          ? "border-2 border-blue-800 bg-blue-50"
          : "border border-gray-200 hover:border-blue-300 hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {method.icon}
          </div>
          <div>
            <h3 className="font-medium">{method.name}</h3>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
        </div>
        {isSelected && <Check className="h-5 w-5 text-blue-800" />}
      </CardContent>
    </Card>
  )
}
