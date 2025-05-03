"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface DeliveryDeadlinePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  allowExtension?: boolean
  extensionValue?: boolean
  onExtensionChange?: (value: boolean) => void
  disabled?: boolean
}

export default function DeliveryDeadlinePicker({
  value,
  onChange,
  allowExtension = false,
  extensionValue = false,
  onExtensionChange,
  disabled = false,
}: DeliveryDeadlinePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value)
  const [isExtended, setIsExtended] = useState<boolean>(extensionValue)

  useEffect(() => {
    setDate(value)
  }, [value])

  useEffect(() => {
    setIsExtended(extensionValue)
  }, [extensionValue])

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    onChange(newDate)
  }

  const handleExtensionChange = (checked: boolean) => {
    setIsExtended(checked)
    if (onExtensionChange) {
      onExtensionChange(checked)
    }
  }

  // Calculate the minimum selectable date (tomorrow)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Delivery Deadline
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              disabled={(date) => date < tomorrow}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-gray-500">Select the date by which you need the product delivered</p>
      </div>

      {allowExtension && (
        <div className="flex items-start space-x-2">
          <Checkbox id="extension" checked={isExtended} onCheckedChange={handleExtensionChange} disabled={disabled} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="extension" className="text-sm font-medium">
              Allow deadline extension
            </Label>
            <p className="text-xs text-gray-500">
              The seller may request a deadline extension if needed (subject to your approval)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
