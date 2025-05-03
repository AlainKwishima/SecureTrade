import { MapPin, Phone, Mail, Star, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Seller {
  id: string
  name: string
  rating: number
  reviewCount: number
  location: string
  phone: string
  email: string
  joinedDate: string
  avatar: string
}

interface SellerInfoCardProps {
  seller: Seller
}

export default function SellerInfoCard({ seller }: SellerInfoCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
            <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{seller.name}</h3>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {seller.rating} ({seller.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Joined {seller.joinedDate}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Phone className="mr-1 h-3 w-3" />
                <span>{seller.phone}</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Mail className="mr-1 h-3 w-3" />
                <span>{seller.email}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
