"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Truck, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "buyer",
      title: "Buyer",
      description: "I want to purchase digital products and accounts",
      icon: ShoppingBag,
      features: [
        "Browse and purchase digital products",
        "Secure payment through escrow",
        "Rate and review sellers",
        "Track order history",
      ],
    },
    {
      id: "seller",
      title: "Seller",
      description: "I want to sell digital products and accounts",
      icon: User,
      features: [
        "List and manage digital products",
        "Secure payment through escrow",
        "Track sales and analytics",
        "Build seller reputation",
      ],
    },
    {
      id: "transporter",
      title: "Transporter",
      description: "I want to deliver physical products",
      icon: Truck,
      features: [
        "Manage transport requests",
        "Set your delivery zones",
        "Track deliveries and earnings",
        "Build transporter reputation",
      ],
    },
  ]

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/auth/register?role=${selectedRole}`)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <Link href="/auth/login" className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Role</h1>
          <p className="text-muted-foreground">
            Select how you want to use SecureTrade. You can always change or add roles later.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedRole === role.id
                  ? "border-blue-700 ring-2 ring-blue-700/20 dark:border-blue-500 dark:ring-blue-500/20"
                  : ""
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="relative pb-2">
                {selectedRole === role.id && (
                  <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-white">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-blue-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedRole === role.id ? "default" : "outline"}
                  className={`w-full ${selectedRole === role.id ? "bg-blue-800 hover:bg-blue-700" : ""}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  Select {role.title}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="bg-blue-800 hover:bg-blue-700" onClick={handleContinue} disabled={!selectedRole}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
