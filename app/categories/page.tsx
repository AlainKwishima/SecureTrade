import Link from "next/link"
import { ChevronRight, Search, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoriesPage() {
  // Category data
  const featuredCategories = [
    {
      id: 1,
      name: "Gaming Accounts",
      description: "Premium gaming accounts for popular titles",
      icon: "🎮",
      items: 1243,
      trending: true,
    },
    {
      id: 2,
      name: "Social Media",
      description: "Established social media accounts with followers",
      icon: "📱",
      items: 876,
      trending: true,
    },
    {
      id: 3,
      name: "Digital Assets",
      description: "Digital products, templates, and resources",
      icon: "💾",
      items: 1567,
      trending: false,
    },
    {
      id: 4,
      name: "Streaming Services",
      description: "Premium streaming accounts and subscriptions",
      icon: "📺",
      items: 654,
      trending: true,
    },
  ]

  const allCategories = [
    {
      id: 1,
      name: "Gaming",
      subcategories: ["FPS Games", "MMORPG", "Battle Royale", "Strategy Games", "Sports Games"],
      icon: "🎮",
      items: 1243,
    },
    {
      id: 2,
      name: "Social Media",
      subcategories: ["Instagram", "TikTok", "Twitter", "Facebook", "YouTube"],
      icon: "📱",
      items: 876,
    },
    {
      id: 3,
      name: "Digital Assets",
      subcategories: ["Templates", "Graphics", "Audio", "3D Models", "Code Snippets"],
      icon: "💾",
      items: 1567,
    },
    {
      id: 4,
      name: "Streaming",
      subcategories: ["Movies & TV", "Music", "Live Streaming", "Sports", "Educational"],
      icon: "📺",
      items: 654,
    },
    {
      id: 5,
      name: "E-Commerce",
      subcategories: ["Shopify", "Amazon", "eBay", "Etsy", "WooCommerce"],
      icon: "🛒",
      items: 432,
    },
    {
      id: 6,
      name: "Domains & Hosting",
      subcategories: ["Premium Domains", "Web Hosting", "Email Hosting", "VPS", "Dedicated Servers"],
      icon: "🌐",
      items: 321,
    },
    {
      id: 7,
      name: "Financial",
      subcategories: ["Crypto Wallets", "Trading Accounts", "Banking", "Investment", "Payment Processors"],
      icon: "💰",
      items: 289,
    },
    {
      id: 8,
      name: "Educational",
      subcategories: ["Courses", "Certifications", "Tutoring", "Research", "Academic Accounts"],
      icon: "📚",
      items: 543,
    },
  ]

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">Categories</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search categories..." className="h-12 bg-white pl-10 text-base shadow-lg" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <h2 className="text-2xl font-bold">All Categories</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allCategories.map((category) => (
                <Link href={`/marketplace?category=${category.name.toLowerCase()}`} key={category.id}>
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-900/10 to-blue-800/5 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{category.icon}</span>
                        <Badge variant="outline">{category.items} items</Badge>
                      </div>
                      <CardTitle className="mt-2">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <li key={idx} className="flex items-center">
                            <ChevronRight className="mr-1 h-3 w-3" />
                            {sub}
                          </li>
                        ))}
                        {category.subcategories.length > 3 && (
                          <li className="text-blue-700 dark:text-blue-400">
                            +{category.subcategories.length - 3} more
                          </li>
                        )}
                      </ul>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/20 pt-3">
                      <Button variant="ghost" className="w-full justify-between text-blue-700 dark:text-blue-400">
                        Browse Category
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-8">
            <h2 className="text-2xl font-bold">Featured Categories</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredCategories.map((category) => (
                <Link href={`/marketplace?category=${category.name.toLowerCase()}`} key={category.id}>
                  <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 p-6 text-6xl text-white md:w-1/3">
                        {category.icon}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          {category.trending && (
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                              <TrendingUp className="mr-1 h-3 w-3" /> Trending
                            </Badge>
                          )}
                        </div>
                        <p className="mb-4 text-muted-foreground">{category.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <Badge variant="outline">{category.items} items</Badge>
                          <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                            Explore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-8">
            <h2 className="text-2xl font-bold">Trending Categories</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredCategories
                .filter((cat) => cat.trending)
                .map((category) => (
                  <Link href={`/marketplace?category=${category.name.toLowerCase()}`} key={category.id}>
                    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 p-6 text-6xl text-white md:w-1/3">
                          {category.icon}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-xl font-bold">{category.name}</h3>
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                              <TrendingUp className="mr-1 h-3 w-3" /> Trending
                            </Badge>
                          </div>
                          <p className="mb-4 text-muted-foreground">{category.description}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <Badge variant="outline">{category.items} items</Badge>
                            <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                              Explore
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-8">
            <h2 className="text-2xl font-bold">New Categories</h2>
            <div className="rounded-lg border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">No New Categories Yet</h3>
              <p className="mb-6 text-muted-foreground">
                We're constantly expanding our marketplace. Check back soon for new categories!
              </p>
              <Button className="bg-blue-800 hover:bg-blue-700">Suggest a Category</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Category Highlights */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Popular in Gaming</h2>
            <Link href="/marketplace?category=gaming" className="text-sm font-medium text-blue-700 dark:text-blue-400">
              View all
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link href="#" key={index}>
                <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt="Gaming Account"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {index === 0 && (
                      <Badge className="absolute left-2 top-2 bg-emerald-500 hover:bg-emerald-600">Top Seller</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="rounded-sm px-2 py-0 text-xs font-normal">
                        FPS Games
                      </Badge>
                      <div className="flex items-center text-sm text-yellow-500">
                        {4 + (index % 2)} <span className="ml-1">★</span>
                      </div>
                    </div>
                    <h3 className="mb-1 font-semibold">Premium Gaming Account Lv.{90 + index}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-700">${50 + index * 15}.00</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Highlights */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Popular in Social Media</h2>
            <Link href="/marketplace?category=social" className="text-sm font-medium text-blue-700 dark:text-blue-400">
              View all
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link href="#" key={index}>
                <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt="Social Media Account"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {index === 1 && (
                      <Badge className="absolute left-2 top-2 bg-amber-500 hover:bg-amber-600">Hot Deal</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="rounded-sm px-2 py-0 text-xs font-normal">
                        {index % 2 === 0 ? "Instagram" : "TikTok"}
                      </Badge>
                      <div className="flex items-center text-sm text-yellow-500">
                        {4 + (index % 2)} <span className="ml-1">★</span>
                      </div>
                    </div>
                    <h3 className="mb-1 font-semibold">
                      {index % 2 === 0 ? "Instagram 50K Followers" : "TikTok 100K Account"}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-700">${120 + index * 30}.00</span>
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
