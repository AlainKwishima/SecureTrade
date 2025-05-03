"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Share2,
  ShieldCheck,
  Star,
  Truck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const productId = params.id

  // State for chat
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "seller",
      message: "Hello! I'm available to answer any questions about this product.",
      time: "10:30 AM",
    },
  ])
  const [messageInput, setMessageInput] = useState("")

  // State for quantity and delivery
  const [quantity, setQuantity] = useState(1)
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Default: 3 days from now
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Mock product data - in a real app, this would be fetched from an API
  const product = {
    id: productId,
    title: "Premium Gaming Account - Max Level",
    price: 199.99,
    description:
      "This is a premium gaming account with all characters at max level. The account includes rare skins, weapons, and achievements that are no longer available to new players. Perfect for serious gamers who want to skip the grinding phase.",
    features: [
      "All characters unlocked and at max level",
      "Rare limited-edition skins and items",
      "All achievements completed",
      "Account in good standing with no bans or warnings",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Gaming Account",
    rating: 5.0,
    reviews: 48,
    seller: {
      id: "seller-123",
      name: "GameMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Kampala, Uganda",
      phone: "+256 701 234 567",
      email: "gamemaster@example.com",
      rating: 4.9,
      verified: true,
      responseTime: "< 1 hour",
      memberSince: "2022",
    },
    transport: {
      method: "Digital Transfer",
      estimatedTime: "Within 24 hours",
      options: ["Instant Transfer", "Escrow Transfer (24h)", "Scheduled Transfer"],
    },
  }

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (messageInput.trim() === "") return

    // Add user message
    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: "user",
        message: messageInput,
        time: format(new Date(), "h:mm a"),
      },
    ])

    // Clear input
    setMessageInput("")

    // Simulate response after a short delay
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "seller",
          message: "Thanks for your interest! I'll be happy to answer any questions you have about this account.",
          time: format(new Date(), "h:mm a"),
        },
      ])
    }, 1000)
  }

  // Handle quantity change
  const handleQuantityChange = (value: string) => {
    const newQuantity = Number.parseInt(value)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  // Handle order button click
  const handleOrderClick = () => {
    toast({
      title: "Order initiated",
      description: "Redirecting to payment page...",
    })

    // Redirect to payment page
    setTimeout(() => {
      router.push(`/payment/${productId}?quantity=${quantity}&delivery=${deliveryDate?.toISOString()}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/marketplace" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white">
              <img src={product.images[0] || "/placeholder.svg"} alt="Product" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((img, index) => (
                <div key={index} className="cursor-pointer overflow-hidden rounded-md border bg-white">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Badge className="bg-emerald-500 hover:bg-emerald-600">Verified</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                <span className="ml-2 text-sm font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">120 sold</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">$249.99</span>
              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">20% OFF</span>
            </div>

            <Separator className="my-6" />

            <div className="mb-6 space-y-4">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <ul className="grid gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller Information */}
            <div className="mb-6 rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{product.seller.name}</p>
                      {product.seller.verified && (
                        <Badge className="ml-2 bg-blue-700" variant="secondary">
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.seller.rating} • Member since {product.seller.memberSince}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </div>

              <div className="grid gap-2 text-sm md:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.seller.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{product.seller.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Response time: {product.seller.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>{product.transport.method}</span>
                </div>
              </div>
            </div>

            {/* Order Options */}
            <div className="mb-6 space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold">Order Options</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </label>
                  <div className="flex">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="rounded-none text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Deadline</label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={deliveryDate}
                        onSelect={(date) => {
                          setDeliveryDate(date)
                          setIsCalendarOpen(false)
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Transport Method</label>
                <Select defaultValue={product.transport.options[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport method" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.transport.options.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Estimated delivery time: {product.transport.estimatedTime}
                </p>
              </div>

              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Deadline Extension
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Deadline Extension</DialogTitle>
                      <DialogDescription>
                        If you need more time, you can request an extension from the seller.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Requested New Deadline</label>
                        <CalendarComponent
                          mode="single"
                          selected={deliveryDate}
                          onSelect={setDeliveryDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Reason for Extension</label>
                        <Textarea placeholder="Please explain why you need an extension..." />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Send Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-blue-800 hover:bg-blue-700" onClick={handleOrderClick}>
                Order Now
              </Button>
              <Button variant="outline" className="flex-1">
                Make Offer
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <p className="text-sm font-medium">Secure Transaction</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                This transaction is protected by our escrow system. Payment is only released to the seller after you
                confirm receipt and satisfaction with the product.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Tabs defaultValue="chat">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="chat">Chat with Seller</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (48)</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-6">
              <Card>
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                      <AvatarFallback>{product.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{product.seller.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                        Online • Usually responds in {product.seller.responseTime}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] overflow-y-auto p-4">
                  <div className="flex flex-col space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.sender !== "user" && (
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                            <AvatarFallback>{product.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === "user" ? "bg-blue-800 text-white" : "bg-muted"
                          }`}
                        >
                          <p>{msg.message}</p>
                          <p
                            className={`mt-1 text-right text-xs ${
                              msg.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" className="bg-blue-800 hover:bg-blue-700" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <MessageCircle className="mr-1 inline-block h-3 w-3" />
                    All messages are saved and can be referenced if there's a dispute.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Product Details</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium">Account Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Game</span>
                          <span>Epic Adventure RPG</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Account Level</span>
                          <span>100 (Max)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Characters</span>
                          <span>All Unlocked (25)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Rare Items</span>
                          <span>45+</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Account Age</span>
                          <span>3 years</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Transfer Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Transfer Method</span>
                          <span>Full Account Access</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Time</span>
                          <span>Within 24 hours</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Support After Sale</span>
                          <span>30 days</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Returns</span>
                          <span>Not Accepted</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Customer Reviews</h3>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">5.0</div>
                      <div className="flex items-center justify-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">48 reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="mb-1 flex items-center gap-2">
                          <div className="text-sm">{rating} stars</div>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: rating === 5 ? "100%" : rating === 4 ? "0%" : "0%" }}
                            ></div>
                          </div>
                          <div className="text-sm">{rating === 5 ? "48" : "0"}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review}>
                        <div className="mb-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Reviewer" />
                            <AvatarFallback>U{review}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">User{review}</p>
                            <div className="flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              <span className="ml-2 text-xs text-muted-foreground">1 month ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Excellent account! Everything was as described and the transfer process was smooth. The seller
                          was very helpful and responsive. Highly recommended!
                        </p>
                        {review !== 3 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Shipping & Delivery Information</h3>

                  <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <h4 className="mb-2 font-medium">Digital Transfer</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a digital product that will be transferred electronically. No physical shipping is
                      required.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Transfer Methods</h4>
                      <ul className="space-y-2 text-sm">
                        {product.transport.options.map((option, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-5 w-5 text-emerald-500" />
                            <div>
                              <span className="font-medium">{option}</span>
                              <p className="text-muted-foreground">
                                {index === 0
                                  ? "Account details are transferred immediately after payment confirmation."
                                  : index === 1
                                    ? "Account details are held in escrow for 24 hours to ensure everything is working properly."
                                    : "Transfer occurs at a scheduled time agreed upon by both parties."}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Delivery Timeline</h4>
                      <ul className="space-y-4 text-sm">
                        <li className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50">
                            1
                          </div>
                          <div>
                            <span className="font-medium">Payment Confirmation</span>
                            <p className="text-muted-foreground">Your payment is securely held in escrow.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50">
                            2
                          </div>
                          <div>
                            <span className="font-medium">Account Verification</span>
                            <p className="text-muted-foreground">
                              The seller prepares and verifies the account details.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50">
                            3
                          </div>
                          <div>
                            <span className="font-medium">Transfer Process</span>
                            <p className="text-muted-foreground">
                              Account credentials are securely transferred to you.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50">
                            4
                          </div>
                          <div>
                            <span className="font-medium">Confirmation</span>
                            <p className="text-muted-foreground">
                              You confirm receipt and satisfaction with the account.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50">
                            5
                          </div>
                          <div>
                            <span className="font-medium">Payment Release</span>
                            <p className="text-muted-foreground">Funds are released to the seller from escrow.</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Support After Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        The seller provides 30 days of support after the transfer to help with any issues or questions
                        you may have about the account.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Similar Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Link href="#" key={item}>
                <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt="Product"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-semibold">Gaming Account - Level 80</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-700">${120 + item * 10}.00</span>
                      <div className="flex items-center text-sm text-yellow-500">
                        4.8 <span className="ml-1">★</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
