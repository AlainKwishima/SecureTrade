"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Truck,
  Package,
  MapPin,
  DollarSign,
  CheckCircle,
  User,
  Star,
  BarChart,
  Map,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransporterDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for transporter
  const transporter = {
    name: "David's Delivery",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    deliveries: 87,
    balance: 945.75,
    pendingDeliveries: 2,
    completedDeliveries: 85,
    vehicle: "Motorcycle",
    licensePlate: "UBX 123C",
    zones: ["Kampala", "Entebbe"],
  }

  // Mock data for delivery requests
  const deliveryRequests = [
    {
      id: "del-1",
      product: "Premium Gaming Account - Level 100",
      seller: "GameMaster",
      buyer: "Alex Johnson",
      pickup: "Kampala Central",
      dropoff: "Nakawa",
      distance: "5.2 km",
      fee: 12.5,
      status: "pending",
      date: "2023-12-10",
    },
    {
      id: "del-2",
      product: "Smartphone - New",
      seller: "TechStore",
      buyer: "Sarah Williams",
      pickup: "Kampala Central",
      dropoff: "Entebbe",
      distance: "35 km",
      fee: 45.0,
      status: "pending",
      date: "2023-12-10",
    },
  ]

  // Mock data for active deliveries
  const activeDeliveriesData = [
    {
      id: "del-3",
      product: "Laptop - Refurbished",
      seller: "ComputerHub",
      buyer: "Michael Chen",
      pickup: "Kampala Central",
      dropoff: "Ntinda",
      distance: "7.8 km",
      fee: 18.0,
      status: "in-transit",
      date: "2023-12-09",
      progress: 65,
    },
  ]

  // Mock data for completed deliveries
  const completedDeliveries = [
    {
      id: "del-4",
      product: "Wireless Headphones",
      seller: "AudioWorld",
      buyer: "Emily Davis",
      pickup: "Kampala Central",
      dropoff: "Bugolobi",
      distance: "6.5 km",
      fee: 15.0,
      status: "completed",
      date: "2023-12-08",
      rating: 5,
    },
    {
      id: "del-5",
      product: "Fitness Tracker",
      seller: "GadgetZone",
      buyer: "Robert Kim",
      pickup: "Kampala Central",
      dropoff: "Kololo",
      distance: "4.2 km",
      fee: 10.0,
      status: "completed",
      date: "2023-12-07",
      rating: 4,
    },
  ]

  const handleAcceptDelivery = (deliveryId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Delivery Accepted",
        description: `You have accepted delivery #${deliveryId}`,
      })

      // In a real app, you would update the state or refetch data
    }, 1000)
  }

  const handleDeclineDelivery = (deliveryId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Delivery Declined",
        description: `You have declined delivery #${deliveryId}`,
      })

      // In a real app, you would update the state or refetch data
    }, 1000)
  }

  const handleCompleteDelivery = (deliveryId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Delivery Completed",
        description: `You have marked delivery #${deliveryId} as completed`,
      })

      // In a real app, you would update the state or refetch data
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transporter Dashboard</h1>
          <p className="text-gray-500">Manage your deliveries and routes</p>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="available">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-blue-800 hover:bg-blue-900">
            <MapPin className="mr-2 h-4 w-4" />
            Update Location
          </Button>
        </div>
      </div>

      {/* Transporter Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-blue-100 p-3">
              <DollarSign className="h-6 w-6 text-blue-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Available Balance</p>
              <h3 className="text-2xl font-bold">${transporter.balance.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Deliveries</p>
              <h3 className="text-2xl font-bold">{transporter.completedDeliveries}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-amber-100 p-3">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Deliveries</p>
              <h3 className="text-2xl font-bold">{transporter.pendingDeliveries}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-purple-100 p-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rating</p>
              <h3 className="text-2xl font-bold">
                {transporter.rating} <span className="text-sm text-gray-500">/ 5</span>
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Delivery Requests</TabsTrigger>
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Transporter Profile</CardTitle>
                  <CardDescription>Your profile information and performance</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={transporter.avatar || "/placeholder.svg"} alt={transporter.name} />
                      <AvatarFallback>DD</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-bold">{transporter.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {transporter.rating} · {transporter.deliveries} deliveries
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium">Vehicle Information</h4>
                      <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vehicle Type</span>
                          <span>{transporter.vehicle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">License Plate</span>
                          <span>{transporter.licensePlate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Service Areas</h4>
                      <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                        <div className="flex flex-wrap gap-2">
                          {transporter.zones.map((zone) => (
                            <Badge key={zone} variant="outline" className="bg-white">
                              {zone}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm">On-time Delivery</span>
                          <span className="text-sm font-medium">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm">Customer Satisfaction</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm">Response Rate</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-between"
                    onClick={() => router.push("/transporter-dashboard/routes")}
                  >
                    <div className="flex items-center">
                      <Map className="mr-2 h-5 w-5" />
                      Manage Routes
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  <Button
                    className="w-full justify-between"
                    onClick={() => router.push("/transporter-dashboard/deliveries")}
                  >
                    <div className="flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      View All Deliveries
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5" />
                      Earnings Report
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Update Profile
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {completedDeliveries.slice(0, 2).map((delivery) => (
                  <div key={delivery.id} className="flex items-start gap-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">Completed delivery #{delivery.id}</p>
                      <p className="text-sm text-gray-500">
                        {delivery.product} from {delivery.pickup} to {delivery.dropoff}
                      </p>
                      <p className="text-xs text-gray-400">{delivery.date}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-green-600">+${delivery.fee.toFixed(2)}</p>
                      <div className="flex items-center justify-end">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{delivery.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {deliveryRequests.slice(0, 1).map((delivery) => (
                  <div key={delivery.id} className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">New delivery request #{delivery.id}</p>
                      <p className="text-sm text-gray-500">
                        {delivery.product} from {delivery.pickup} to {delivery.dropoff}
                      </p>
                      <p className="text-xs text-gray-400">{delivery.date}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-blue-600">${delivery.fee.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{delivery.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Pending Delivery Requests</h2>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="nearest">Nearest First</SelectItem>
                  <SelectItem value="highest">Highest Fee</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {deliveryRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Pending Requests</h3>
                <p className="text-center text-gray-500">You don't have any pending delivery requests at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {deliveryRequests.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{delivery.product}</h3>
                            <p className="text-sm text-gray-500">
                              Request #{delivery.id} · {delivery.date}
                            </p>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Pickup Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.pickup}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Dropoff Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.dropoff}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Seller</p>
                            <p className="text-sm">{delivery.seller}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Buyer</p>
                            <p className="text-sm">{delivery.buyer}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-sm">{delivery.distance}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between border-t pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                        <div>
                          <p className="text-sm font-medium">Delivery Fee</p>
                          <p className="text-2xl font-bold text-blue-800">${delivery.fee.toFixed(2)}</p>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button
                            className="flex-1 bg-blue-800 hover:bg-blue-900"
                            onClick={() => handleAcceptDelivery(delivery.id)}
                            disabled={isLoading}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDeclineDelivery(delivery.id)}
                            disabled={isLoading}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Active Deliveries Tab */}
        <TabsContent value="active" className="space-y-4">
          <h2 className="text-xl font-bold">Active Deliveries</h2>

          {activeDeliveriesData.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <Truck className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Active Deliveries</h3>
                <p className="text-center text-gray-500">You don't have any active deliveries at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeDeliveriesData.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{delivery.product}</h3>
                            <p className="text-sm text-gray-500">
                              Delivery #{delivery.id} · {delivery.date}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                        </div>

                        <div className="mb-4">
                          <p className="mb-1 text-sm font-medium">Delivery Progress</p>
                          <Progress value={delivery.progress} className="h-2" />
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Picked up</span>
                            <span>In transit</span>
                            <span>Delivered</span>
                          </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Pickup Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.pickup}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Dropoff Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.dropoff}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Seller</p>
                            <p className="text-sm">{delivery.seller}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Buyer</p>
                            <p className="text-sm">{delivery.buyer}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-sm">{delivery.distance}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between border-t pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                        <div>
                          <p className="text-sm font-medium">Delivery Fee</p>
                          <p className="text-2xl font-bold text-blue-800">${delivery.fee.toFixed(2)}</p>
                        </div>

                        <div className="mt-4">
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => handleCompleteDelivery(delivery.id)}
                            disabled={isLoading}
                          >
                            Mark as Delivered
                          </Button>

                          <Button variant="outline" className="mt-2 w-full">
                            Contact Buyer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Completed Deliveries Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Completed Deliveries</h2>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <Select defaultValue="recent">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Fee</SelectItem>
                  <SelectItem value="lowest">Lowest Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {completedDeliveries.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Completed Deliveries</h3>
                <p className="text-center text-gray-500">You haven't completed any deliveries yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{delivery.product}</h3>
                            <p className="text-sm text-gray-500">
                              Delivery #{delivery.id} · {delivery.date}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Pickup Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.pickup}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Dropoff Location</p>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm">{delivery.dropoff}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Seller</p>
                            <p className="text-sm">{delivery.seller}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Buyer</p>
                            <p className="text-sm">{delivery.buyer}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-sm">{delivery.distance}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between border-t pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                        <div>
                          <p className="text-sm font-medium">Delivery Fee</p>
                          <p className="text-2xl font-bold text-green-600">${delivery.fee.toFixed(2)}</p>

                          <div className="mt-2">
                            <p className="text-sm font-medium">Rating Received</p>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < delivery.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="mt-4">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
