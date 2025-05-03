"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddListingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  })
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    images: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])

      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: "" }))
      }
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
      valid = false
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
      valid = false
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
      valid = false
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
      valid = false
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
      valid = false
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
      valid = false
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to create a new listing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Listing created",
        description: "Your listing has been created successfully.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Failed to create listing",
        description: "There was an error creating your listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="mb-4 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold md:text-3xl">Create New Listing</h1>
        <p className="text-muted-foreground">Fill in the details to create a new listing</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title"
                    className={errors.title ? "border-red-500" : ""}
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange} disabled={isLoading}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gaming">Gaming Accounts</SelectItem>
                      <SelectItem value="social">Social Media Accounts</SelectItem>
                      <SelectItem value="digital">Digital Products</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    className={errors.price ? "border-red-500" : ""}
                    value={formData.price}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of what you're selling"
                    rows={6}
                    className={errors.description ? "border-red-500" : ""}
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/500 characters (minimum 50)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Listing image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted hover:bg-muted/80">
                      <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm font-medium">Add Image</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG or WEBP</span>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isLoading}
                        multiple
                      />
                    </label>
                  </div>
                  {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-blue-800 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Listing"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push("/dashboard")}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Listing Guidelines</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-green-500"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Provide accurate and detailed information about what you're selling</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-green-500"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Upload clear, high-quality images</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-green-500"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Set a fair and competitive price</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-green-500"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Be responsive to buyer inquiries</span>
                </li>
              </ul>

              <div className="mt-6 rounded-lg bg-amber-50 p-4 text-amber-800">
                <h3 className="mb-2 font-medium">Important Notice</h3>
                <p className="text-sm">
                  All listings are reviewed by our team before being published. Listings that violate our terms of
                  service will be rejected.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Fees & Payments</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Transaction Fee</span>
                  <span className="font-medium">4.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Processing</span>
                  <span className="font-medium">2.9% + $0.30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payout Time</span>
                  <span className="font-medium">2-3 business days</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                Fees are deducted from the final sale price. You'll receive the remaining amount in your account
                balance.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
