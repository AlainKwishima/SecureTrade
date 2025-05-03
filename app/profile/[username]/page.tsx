import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, MessageSquare, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const username = params.username

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/marketplace" className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={username} />
                  <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <h1 className="mt-4 text-2xl font-bold">{username}</h1>
                <Badge className="mt-2 bg-emerald-500 hover:bg-emerald-600">Verified Seller</Badge>

                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="ml-2 text-sm font-medium">5.0 (48 reviews)</span>
                </div>

                <div className="mt-6 w-full">
                  <Button className="w-full bg-blue-800 hover:bg-blue-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Seller
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t pt-6">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Member since 2023</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Last active today</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>United States</span>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t pt-6">
                <h3 className="font-medium">About</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced seller specializing in gaming accounts and digital assets. Fast delivery and excellent
                  customer service guaranteed.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-medium">Seller Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Sales</span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="font-medium">{"< 1 hour"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed Orders</span>
                  <span className="font-medium">120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cancellation Rate</span>
                  <span className="font-medium">3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="listings">
            <TabsList className="w-full">
              <TabsTrigger value="listings" className="flex-1">
                Listings
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Link href="#" key={index}>
                    <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={`/placeholder.svg?height=300&width=300`}
                          alt="Product"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {index % 3 === 0 && (
                          <Badge className="absolute left-2 top-2 bg-emerald-500 hover:bg-emerald-600">Featured</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-1 font-semibold">
                          {index % 3 === 0
                            ? "Premium Gaming Account"
                            : index % 3 === 1
                              ? "Social Media Profile"
                              : "Digital Asset Bundle"}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-700">${50 + index * 10}.00</span>
                          <div className="flex items-center text-sm text-yellow-500">
                            5.0 <span className="ml-1">★</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">5.0</div>
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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

                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="mb-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Reviewer" />
                            <AvatarFallback>U{index + 1}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">User{index + 1}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="ml-2 text-xs text-muted-foreground">
                                {index === 0 ? "2 days ago" : index === 1 ? "1 week ago" : `${index + 1} weeks ago`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {index % 2 === 0
                            ? "Excellent seller! The account was exactly as described and the transfer process was smooth and secure. Would definitely buy from again."
                            : "Great experience overall. Fast delivery and excellent communication throughout the process. The product exceeded my expectations."}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
