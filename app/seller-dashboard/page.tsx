"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUpDown,
  Bell,
  DollarSign,
  Edit,
  Eye,
  Filter,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  TrendingUp,
  User,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for seller
  const seller = {
    name: "John's Digital Shop",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    sales: 124,
    balance: 1234.56,
    pendingOrders: 3,
    completedOrders: 120,
  }

  // Mock data for products
  const products = [
    {
      id: "prod-1",
      title: "Premium Gaming Account - Level 100",
      price: 199.99,
      category: "Gaming",
      status: "active",
      views: 156,
      sales: 12,
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-10-15",
    },
    {
      id: "prod-2",
      title: "Instagram Account - 50K Followers",
      price: 299.99,
      category: "Social Media",
      status: "active",
      views: 243,
      sales: 8,
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-11-02",
    },
    {
      id: "prod-3",
      title: "Digital Marketing Course Bundle",
      price: 89.99,
      category: "Digital Products",
      status: "pending",
      views: 78,
      sales: 0,
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-12-01",
    },
    {
      id: "prod-4",
      title: "Streaming Account - Premium",
      price: 149.99,
      category: "Streaming",
      status: "active",
      views: 112,
      sales: 5,
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-11-20",
    },
  ]

  // Mock data for orders
  const orders = [
    {
      id: "ord-1",
      product: "Premium Gaming Account - Level 100",
      buyer: "Alex Johnson",
      price: 199.99,
      status: "completed",
      date: "2023-12-01",
    },
    {
      id: "ord-2",
      product: "Instagram Account - 50K Followers",
      buyer: "Sarah Williams",
      price: 299.99,
      status: "in progress",
      date: "2023-12-05",
    },
    {
      id: "ord-3",
      product: "Streaming Account - Premium",
      buyer: "Michael Chen",
      price: 149.99,
      status: "in escrow",
      date: "2023-12-07",
    },
    {
      id: "ord-4",
      product: "Premium Gaming Account - Level 100",
      buyer: "Emma Davis",
      price: 199.99,
      status: "in progress",
      date: "2023-12-08",
    },
  ]

  // Handle logout
  const handleLogout = () => {
    setIsLoading(true)

    // Simulate logout process
    setTimeout(() => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
    }, 1000)
  }

  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    })
  }

  // Handle product creation
  const handleCreateProduct = (data: any) => {
    toast({
      title: "Product created",
      description: "Your new product has been created successfully.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Link href="/seller-dashboard" className="font-semibold text-primary">
              Seller Dashboard
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
              <span className="absolute right-1 top-1 flex h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
                    <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                    <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/seller-dashboard/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/seller-dashboard/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="container grid flex-1 gap-12 px-4 py-6 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] lg:gap-16">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <nav className="grid items-start gap-2">
            {[
              { icon: LayoutDashboard, label: "Overview", value: "overview" },
              { icon: Package, label: "Products", value: "products" },
              { icon: ShoppingBag, label: "Orders", value: "orders" },
              { icon: MessageSquare, label: "Messages", value: "messages", badge: 3 },
              { icon: DollarSign, label: "Earnings", value: "earnings" },
              { icon: Star, label: "Reviews", value: "reviews" },
              { icon: User, label: "Profile", value: "profile" },
              { icon: Settings, label: "Settings", value: "settings" },
            ].map((item) => (
              <Link
                key={item.value}
                href="#"
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
                  activeTab === item.value
                    ? "bg-blue-800/10 font-medium text-blue-700"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(item.value)
                }}
              >
                <item.icon
                  className={`h-4 w-4 transition-transform duration-300 ${activeTab === item.value ? "text-blue-700" : "group-hover:scale-110"}`}
                />
                {item.label}
                {item.badge && (
                  <Badge className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-xs text-white">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Overview Tab */}
            <TabsContent
              value="overview"
              className="space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <Card className="flex-1 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${seller.balance.toFixed(2)}</div>
                    <p className="flex items-center text-xs text-green-500 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +$249.20 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex-1 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</div>
                    <p className="flex items-center text-xs text-green-500 dark:text-green-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +3 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex-1 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Seller Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{seller.rating}/5</div>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                      Based on {seller.sales} sales
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    You have {seller.pendingOrders} pending orders that require your attention.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="group flex items-center gap-4 rounded-lg p-2 transition-colors duration-200 hover:bg-muted/50"
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : order.status === "in escrow"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {order.status === "completed" ? (
                            <Check className="h-4 w-4" />
                          ) : order.status === "in escrow" ? (
                            <DollarSign className="h-4 w-4" />
                          ) : (
                            <Package className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{order.product}</p>
                          <p className="text-sm text-muted-foreground">Buyer: {order.buyer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${order.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              {/* Product Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>See how your products are performing in the marketplace.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="group flex items-center gap-4 rounded-lg p-2 transition-colors duration-200 hover:bg-muted/50"
                      >
                        <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{product.title}</p>
                          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-sm">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{product.views}</span>
                          </div>
                          <div className="flex items-center justify-end gap-1 text-sm">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            <span>{product.sales}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View All Products
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent
              value="products"
              className="space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold">My Products</h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-8 bg-blue-800 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to create a new product listing.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Product Title</Label>
                          <Input id="title" placeholder="Enter product title" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe your product in detail" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" type="number" placeholder="0.00" min="0.01" step="0.01" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gaming">Gaming</SelectItem>
                                <SelectItem value="social">Social Media</SelectItem>
                                <SelectItem value="digital">Digital Products</SelectItem>
                                <SelectItem value="streaming">Streaming</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="image">Product Image</Label>
                          <Input id="image" type="file" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="bg-blue-800 hover:bg-blue-700"
                          onClick={() => handleCreateProduct({})}
                        >
                          Create Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="group flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-muted/50"
                      >
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{product.title}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{product.category}</Badge>
                            <span>•</span>
                            <span>Created: {product.createdAt}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-700">${product.price.toFixed(2)}</p>
                          <Badge
                            className={
                              product.status === "active"
                                ? "bg-green-500 dark:bg-green-700"
                                : "bg-amber-500 dark:bg-amber-700"
                            }
                          >
                            {product.status === "active" ? "Active" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent
              value="orders"
              className="space-y-6 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold">Orders</h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="in-escrow">In Escrow</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="group flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-muted/50"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : order.status === "in escrow"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {order.status === "completed" ? (
                            <Check className="h-5 w-5" />
                          ) : order.status === "in escrow" ? (
                            <DollarSign className="h-5 w-5" />
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{order.product}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Buyer: {order.buyer}</span>
                            <span>•</span>
                            <span>Order ID: {order.id}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-700">${order.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div>
                          <Badge
                            className={
                              order.status === "completed"
                                ? "bg-green-500 dark:bg-green-700"
                                : order.status === "in escrow"
                                  ? "bg-blue-500 dark:bg-blue-700"
                                  : "bg-amber-500 dark:bg-amber-700"
                            }
                          >
                            {order.status === "completed"
                              ? "Completed"
                              : order.status === "in escrow"
                                ? "In Escrow"
                                : "In Progress"}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
