"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface OrderQuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

export default function OrderQuantityInput({
  value,
  onChange,
  min = 1,
  max = 100,
  disabled = false,
}: OrderQuantityInputProps) {
  const [quantity, setQuantity] = useState<number>(value)

  useEffect(() => {
    setQuantity(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    if (isNaN(newValue)) {
      setQuantity(min)
      return
    }

    const validValue = Math.max(min, Math.min(max, newValue))
    setQuantity(validValue)
    onChange(validValue)
  }

  const increment = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange(newValue)
    }
  }

  const decrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
        Quantity
      </label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-r-none border-r-0"
          onClick={decrement}
          disabled={disabled || quantity <= min}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="h-10 w-20 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-l-none border-l-0"
          onClick={increment}
          disabled={disabled || quantity >= max}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      {max > 0 && (
        <p className="text-xs text-gray-500">
          {max} {max === 1 ? "item" : "items"} available
        </p>
      )}
    </div>
  )
}
