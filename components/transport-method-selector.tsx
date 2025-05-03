"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

interface TransportMethod {
  id: string
  name: string
  price: number
  estimatedDays: string
}

interface TransportMethodSelectorProps {
  methods: TransportMethod[]
  selectedId: string
  onChange: (id: string) => void
  currency?: string
  disabled?: boolean
}

export default function TransportMethodSelector({
  methods,
  selectedId,
  onChange,
  currency = "USD",
  disabled = false,
}: TransportMethodSelectorProps) {
  const [selected, setSelected] = useState<string>(selectedId)

  useEffect(() => {
    setSelected(selectedId)
  }, [selectedId])

  const handleChange = (value: string) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Transport Method</label>
      <RadioGroup value={selected} onValueChange={handleChange} disabled={disabled}>
        <div className="space-y-2">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors ${
                selected === method.id ? "border-blue-800 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value={method.id} id={`transport-${method.id}`} className="mt-1" disabled={disabled} />
              <div className="ml-3 flex-1">
                <Label htmlFor={`transport-${method.id}`} className="flex justify-between font-medium text-gray-900">
                  <span>{method.name}</span>
                  <span>{method.price === 0 ? "Free" : `${currency} ${method.price.toFixed(2)}`}</span>
                </Label>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Estimated delivery: {method.estimatedDays}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
