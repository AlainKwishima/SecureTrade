"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Grid3X3, List, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for products
const allProducts = Array.from({ length: 48 }).map((_, index) => {
  const categories = [
    "Gaming",
    "Electronics",
    "Fashion",
    "Collectibles",
    "Food",
    "Sports",
    "Digital Products",
    "Services",
  ]
  const category = categories[index % categories.length]

  const names = [
    "Premium Gaming Account",
    "Professional Camera",
    "Vintage Watch Collection",
    "Handcrafted Leather Bag",
    "Smart Home Starter Kit",
    "Rare Coin Collection",
    "Premium Coffee Beans",
    "Fitness Equipment Set",
    "Smartphone with Accessories",
    "Designer Sunglasses",
    "Antique Furniture",
    "Organic Food Basket",
    "Limited Edition Sneakers",
    "Digital Marketing Services",
    "Custom Website Design",
  ]
  const name = names[index % names.length]

  const descriptions = [
    "Max level account with rare items and skins",
    "High-end DSLR with multiple lenses and accessories",
    "Set of 5 restored vintage watches from the 1960s",
    "Genuine leather messenger bag, handmade by artisans",
    "Complete smart home system with hub and 5 devices",
    "Set of 12 rare coins from around the world",
    "Organic, fair-trade coffee beans from Ethiopia",
    "Complete home gym set with weights and accessories",
    "Latest model with premium case and screen protector",
    "Authentic designer sunglasses with UV protection",
    "Beautifully restored antique wooden furniture",
    "Selection of organic, locally-sourced produce",
    "Collector's edition sneakers, never worn",
    "Comprehensive digital marketing package",
    "Custom-designed responsive website",
  ]
  const description = descriptions[index % descriptions.length]

  const basePrice = [19.99, 49.99, 99.99, 199.99, 299.99, 499.99, 999.99]
  const price = basePrice[index % basePrice.length] + index * 2.5

  const rating = 4 + Math.random() * 1
  const reviews = 5 + Math.floor(Math.random() * 195)

  const sellers = ["TechStore", "FashionHub", "CollectiblesCorner", "OrganicMarket", "SportsPro", "DigitalServices"]
  const seller = sellers[index % sellers.length]

  return {
    id: (index + 1).toString(),
    name,
    description,
    price,
    image: `/placeholder.svg?height=300&width=300&text=Product+${index + 1}`,
    rating: Number.parseFloat(rating.toFixed(1)),
    reviews,
    seller,
    category,
  }
})

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter products based on search query and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0 // Featured - no specific sort
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Generate page numbers for pagination
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Marketplace</h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products, categories, sellers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on new search
              }}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="hidden items-center rounded-md border border-input bg-background sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none ${viewMode === "grid" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none ${viewMode === "list" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs
        defaultValue="all"
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value)
          setCurrentPage(1) // Reset to first page on category change
        }}
        className="mb-8"
      >
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="fashion">Fashion</TabsTrigger>
          <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
          <TabsTrigger value="food">Food & Drinks</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="digital products">Digital Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Items per page selector */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length}{" "}
          products
        </div>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number.parseInt(value))
            setCurrentPage(1) // Reset to first page when changing items per page
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12 per page</SelectItem>
            <SelectItem value="24">24 per page</SelectItem>
            <SelectItem value="36">36 per page</SelectItem>
            <SelectItem value="48">48 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid/List */}
      {currentItems.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="mb-2 text-lg font-medium">No products found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((product) => (
            <Link href={`/product-detail/${product.id}`} key={product.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-blue-50 text-blue-800">
                      {product.category}
                    </Badge>
                    <div className="flex items-center text-sm text-yellow-500">
                      {product.rating} <Star className="ml-1 h-3 w-3 fill-yellow-500" />
                    </div>
                  </div>
                  <h3 className="mb-1 line-clamp-1 font-semibold">{product.name}</h3>
                  <p className="mb-3 line-clamp-2 text-sm text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-800">${product.price.toFixed(2)}</span>
                    <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 w-full sm:h-auto sm:w-48">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-50 text-blue-800">
                          {product.category}
                        </Badge>
                        <div className="flex items-center text-sm text-yellow-500">
                          {product.rating} <Star className="ml-1 h-3 w-3 fill-yellow-500" />
                          <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
                        </div>
                      </div>
                      <h3 className="mb-1 font-semibold">{product.name}</h3>
                      <p className="mb-3 text-sm text-gray-500">{product.description}</p>
                      <p className="text-xs text-gray-400">Seller: {product.seller}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-800">${product.price.toFixed(2)}</span>
                      <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) paginate(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pageNumbers.map((number) => {
                // Show first page, last page, current page, and pages around current
                if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
                  return (
                    <PaginationItem key={number}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          paginate(number)
                        }}
                        isActive={currentPage === number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }

                // Show ellipsis for gaps
                if ((number === 2 && currentPage > 3) || (number === totalPages - 1 && currentPage < totalPages - 2)) {
                  return (
                    <PaginationItem key={number}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return null
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) paginate(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
