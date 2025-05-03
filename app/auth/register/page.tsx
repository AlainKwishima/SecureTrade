"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const roleParam = searchParams.get("role") || "buyer"
  const [activeTab, setActiveTab] = useState(roleParam)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Common form data
  const [commonFormData, setCommonFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  // Role-specific form data
  const [sellerFormData, setSellerFormData] = useState({
    businessName: "",
    businessDescription: "",
    businessType: "",
    productCategories: [],
  })

  const [transporterFormData, setTransporterFormData] = useState({
    vehiclePlate: "",
    driversLicense: "",
    vehicleType: "",
    transportZones: [],
    availability: "",
  })

  // Form errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
    // Seller specific
    businessName: "",
    businessDescription: "",
    // Transporter specific
    vehiclePlate: "",
    driversLicense: "",
  })

  // Set active tab based on URL parameter
  useEffect(() => {
    if (roleParam) {
      setActiveTab(roleParam)
    }
  }, [roleParam])

  const handleCommonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCommonFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSellerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSellerFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleTransporterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTransporterFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (activeTab === "seller") {
      setSellerFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    } else if (activeTab === "transporter") {
      setTransporterFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setCommonFormData((prev) => ({ ...prev, agreeTerms: checked }))
    if (errors.agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: "" }))
    }
  }

  const validateCommonForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!commonFormData.name.trim()) {
      newErrors.name = "Full name is required"
      valid = false
    }

    if (!commonFormData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(commonFormData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!commonFormData.phone) {
      newErrors.phone = "Phone number is required"
      valid = false
    } else if (!/^\d{10}$/.test(commonFormData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits"
      valid = false
    }

    if (!commonFormData.nationalId) {
      newErrors.nationalId = "National ID is required"
      valid = false
    }

    if (!commonFormData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (commonFormData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (!commonFormData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (commonFormData.password !== commonFormData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    if (!commonFormData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const validateSellerForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!sellerFormData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
      valid = false
    }

    if (!sellerFormData.businessDescription.trim()) {
      newErrors.businessDescription = "Business description is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const validateTransporterForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!transporterFormData.vehiclePlate.trim()) {
      newErrors.vehiclePlate = "Vehicle plate number is required"
      valid = false
    }

    if (!transporterFormData.driversLicense.trim()) {
      newErrors.driversLicense = "Driver's license number is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate common fields
    if (!validateCommonForm()) return

    // Validate role-specific fields
    if (activeTab === "seller" && !validateSellerForm()) return
    if (activeTab === "transporter" && !validateTransporterForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to your registration endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful registration
      toast({
        title: "Registration successful",
        description: `Your account has been created as a ${activeTab}. Welcome to SecureTrade!`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-[1000px] overflow-hidden rounded-xl border shadow-lg">
        <div className="grid md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8 text-white">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold">Join SecureTrade</h1>
              <p className="text-white/80">Create an account to start buying, selling, and trading securely.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Secure Transactions</h3>
                  <p className="text-sm text-white/70">Protected by our escrow system</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Verified Users</h3>
                  <p className="text-sm text-white/70">Build trust with verified profiles</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-sm text-white/70">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-white underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-white p-8 dark:bg-background">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <p className="text-muted-foreground">Register as a {activeTab}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="buyer">Buyer</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
                <TabsTrigger value="transporter">Transporter</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                          value={commonFormData.name}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                          value={commonFormData.email}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="e.g., 0701234567"
                          className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                          value={commonFormData.phone}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationalId">National ID Number</Label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nationalId"
                          name="nationalId"
                          placeholder="Enter your National ID"
                          className={`pl-10 ${errors.nationalId ? "border-red-500" : ""}`}
                          value={commonFormData.nationalId}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.nationalId && <p className="text-xs text-red-500">{errors.nationalId}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                          value={commonFormData.password}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                          value={commonFormData.confirmPassword}
                          onChange={handleCommonChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                {/* Role-specific fields */}
                <TabsContent value="buyer">{/* No additional fields for buyers */}</TabsContent>

                <TabsContent value="seller">
                  <div className="space-y-4">
                    <h3 className="font-medium">Seller Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Your business name"
                        className={errors.businessName ? "border-red-500" : ""}
                        value={sellerFormData.businessName}
                        onChange={handleSellerChange}
                        disabled={isLoading}
                      />
                      {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        placeholder="Describe your business and what you sell"
                        className={errors.businessDescription ? "border-red-500" : ""}
                        value={sellerFormData.businessDescription}
                        onChange={handleSellerChange}
                        disabled={isLoading}
                      />
                      {errors.businessDescription && (
                        <p className="text-xs text-red-500">{errors.businessDescription}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select
                          value={sellerFormData.businessType}
                          onValueChange={(value) => handleSelectChange("businessType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="company">Registered Company</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Product Categories</Label>
                        <Select
                          value={sellerFormData.productCategories[0]}
                          onValueChange={(value) =>
                            setSellerFormData((prev) => ({
                              ...prev,
                              productCategories: [value],
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select main category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gaming">Gaming Accounts</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="digital">Digital Products</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transporter">
                  <div className="space-y-4">
                    <h3 className="font-medium">Transporter Information</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="vehiclePlate">Vehicle License Plate</Label>
                        <Input
                          id="vehiclePlate"
                          name="vehiclePlate"
                          placeholder="e.g., UAX 123A"
                          className={errors.vehiclePlate ? "border-red-500" : ""}
                          value={transporterFormData.vehiclePlate}
                          onChange={handleTransporterChange}
                          disabled={isLoading}
                        />
                        {errors.vehiclePlate && <p className="text-xs text-red-500">{errors.vehiclePlate}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="driversLicense">Driver's License Number</Label>
                        <Input
                          id="driversLicense"
                          name="driversLicense"
                          placeholder="Enter your driver's license number"
                          className={errors.driversLicense ? "border-red-500" : ""}
                          value={transporterFormData.driversLicense}
                          onChange={handleTransporterChange}
                          disabled={isLoading}
                        />
                        {errors.driversLicense && <p className="text-xs text-red-500">{errors.driversLicense}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select
                          value={transporterFormData.vehicleType}
                          onValueChange={(value) => handleSelectChange("vehicleType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Select
                          value={transporterFormData.availability}
                          onValueChange={(value) => handleSelectChange("availability", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fulltime">Full-time</SelectItem>
                            <SelectItem value="parttime">Part-time</SelectItem>
                            <SelectItem value="weekends">Weekends only</SelectItem>
                            <SelectItem value="evenings">Evenings only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Transport Zones</Label>
                      <Select
                        value={transporterFormData.transportZones[0]}
                        onValueChange={(value) =>
                          setTransporterFormData((prev) => ({
                            ...prev,
                            transportZones: [value],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select main zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kampala">Kampala</SelectItem>
                          <SelectItem value="entebbe">Entebbe</SelectItem>
                          <SelectItem value="jinja">Jinja</SelectItem>
                          <SelectItem value="mbarara">Mbarara</SelectItem>
                          <SelectItem value="gulu">Gulu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="agreeTerms"
                    checked={commonFormData.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="agreeTerms"
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        errors.agreeTerms ? "text-red-500" : ""
                      }`}
                    >
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                    {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Tabs>

            <div className="my-6 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
              <Separator className="flex-1" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" type="button" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
