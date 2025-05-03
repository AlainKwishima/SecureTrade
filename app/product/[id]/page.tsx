"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import ProductChat from "@/components/product-chat"
import OrderQuantityInput from "@/components/order-quantity-input"
import DeliveryDeadlinePicker from "@/components/delivery-deadline-picker"
import TransportMethodSelector from "@/components/transport-method-selector"
import ContactOptions from "@/components/contact-options"
import SellerInfoCard from "@/components/seller-info-card"

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: "prod-123",
  name: "Premium Organic Coffee Beans",
  description:
    "Freshly roasted premium organic coffee beans from the highlands of Ethiopia. These beans are carefully selected and roasted to perfection to give you the best coffee experience.",
  longDescription:
    "Our Premium Organic Coffee Beans are sourced directly from small-scale farmers in the highlands of Ethiopia. The beans are grown at high altitudes, which results in a slower maturation process and denser beans with more complex flavors. The farmers use traditional organic farming methods without any chemical pesticides or fertilizers.\n\nAfter harvesting, the beans are carefully processed using the wet method, which helps preserve their intrinsic flavors. They are then sun-dried on raised beds before being shipped to our roastery.\n\nOur master roasters use a medium roast profile to highlight the beans' natural sweetness and complex flavor notes. You'll experience hints of blueberry, dark chocolate, and a subtle floral aroma with every cup.\n\nEach batch is roasted to order to ensure maximum freshness. The beans are packed in valve-sealed bags that allow carbon dioxide to escape while preventing oxygen from entering, thus maintaining the beans' freshness for longer.",
  price: 24.99,
  currency: "USD",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
  ],
  stock: 50,
  seller: {
    id: "seller-456",
    name: "Organic Coffee Co.",
    rating: 4.8,
    reviewCount: 124,
    location: "Addis Ababa, Ethiopia",
    phone: "+251 91 234 5678",
    email: "contact@organiccoffee.co",
    joinedDate: "January 2020",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  transportMethods: [
    { id: "tm-1", name: "Standard Shipping", price: 5.99, estimatedDays: "3-5" },
    { id: "tm-2", name: "Express Shipping", price: 12.99, estimatedDays: "1-2" },
    { id: "tm-3", name: "Local Pickup", price: 0, estimatedDays: "Same day" },
  ],
  specifications: [
    { name: "Origin", value: "Ethiopia" },
    { name: "Roast Level", value: "Medium" },
    { name: "Bean Type", value: "Arabica" },
    { name: "Processing", value: "Wet Process" },
    { name: "Flavor Notes", value: "Blueberry, Dark Chocolate, Floral" },
    { name: "Packaging", value: "Valve-sealed bag, 12oz (340g)" },
  ],
  reviews: [
    {
      id: "rev-1",
      user: "Coffee Lover",
      rating: 5,
      date: "2023-05-15",
      comment: "Absolutely amazing coffee! The flavor profile is complex and delightful.",
    },
    {
      id: "rev-2",
      user: "Morning Brewer",
      rating: 4,
      date: "2023-04-22",
      comment: "Great coffee, but a bit pricey. Still worth it for the quality.",
    },
  ],
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedTransport, setSelectedTransport] = useState(mockProduct.transportMethods[0].id)
  const [deadline, setDeadline] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 1 week from now
  )
  const [extendDeadline, setExtendDeadline] = useState(false)

  // In a real app, you would fetch the product data based on the ID
  const productId = params.id as string
  const product = mockProduct // This would be fetched from an API

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleTransportChange = (transportId: string) => {
    setSelectedTransport(transportId)
  }

  const handleDeadlineChange = (date: Date | undefined) => {
    setDeadline(date)
  }

  const handleOrder = () => {
    // In a real app, you would validate and process the order
    router.push(`/payment/${productId}`)
  }

  const selectedTransportMethod = product.transportMethods.find((method) => method.id === selectedTransport)

  const subtotal = product.price * quantity
  const shippingCost = selectedTransportMethod?.price || 0
  const total = subtotal + shippingCost

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-500 hover:text-gray-700"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                  selectedImage === index ? "border-blue-800 ring-2 ring-blue-800" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <p className="text-2xl font-semibold text-blue-800">
                {product.currency} {product.price.toFixed(2)}
              </p>
              <Badge variant="outline" className="ml-4">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <Separator />

          {/* Seller Information */}
          <SellerInfoCard seller={product.seller} />

          <Separator />

          {/* Order Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Order Options</h3>

            <OrderQuantityInput max={product.stock} value={quantity} onChange={handleQuantityChange} />

            <TransportMethodSelector
              methods={product.transportMethods}
              selectedId={selectedTransport}
              onChange={handleTransportChange}
            />

            <DeliveryDeadlinePicker
              value={deadline}
              onChange={handleDeadlineChange}
              allowExtension={true}
              onExtensionChange={setExtendDeadline}
              extensionValue={extendDeadline}
            />

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  {product.currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {product.currency} {shippingCost.toFixed(2)}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1 font-semibold">
                <span>Total</span>
                <span>
                  {product.currency} {total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-blue-800 hover:bg-blue-900"
              size="lg"
              onClick={handleOrder}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Place Order
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact Seller</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="py-4">
            <div className="prose max-w-none text-gray-700">
              <p>{product.longDescription}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                  <span className="font-medium text-gray-900">{spec.name}</span>
                  <span className="text-gray-700">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-4">
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="mt-1 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="py-4">
            <ContactOptions seller={product.seller} productId={product.id} />
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Chat with Seller</h3>
              <ProductChat sellerId={product.seller.id} productId={product.id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
