"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  HelpCircle,
  Home,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

type UserRole = "buyer" | "seller" | "transporter" | "admin"

interface SidebarNavigationProps {
  userRole?: UserRole
  userName?: string
  userImage?: string
}

export function SidebarNavigation({ userRole = "buyer", userName = "User", userImage }: SidebarNavigationProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  const commonLinks = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Marketplace",
      href: "/marketplace",
      icon: ShoppingCart,
    },
    {
      title: "Categories",
      href: "/categories",
      icon: Box,
    },
    {
      title: "How It Works",
      href: "/how-it-works",
      icon: HelpCircle,
    },
    {
      title: "Support",
      href: "/support",
      icon: MessageSquare,
    },
  ]

  const roleSpecificLinks = {
    buyer: [
      {
        title: "My Orders",
        href: "/dashboard",
        icon: Package,
      },
      {
        title: "Profile",
        href: `/profile/${userName}`,
        icon: User,
      },
    ],
    seller: [
      {
        title: "Seller Dashboard",
        href: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Products",
        href: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Profile",
        href: `/profile/${userName}`,
        icon: User,
      },
    ],
    transporter: [
      {
        title: "Transporter Dashboard",
        href: "/transporter-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Deliveries",
        href: "/dashboard/deliveries",
        icon: Truck,
      },
      {
        title: "Routes",
        href: "/dashboard/routes",
        icon: BarChart3,
      },
      {
        title: "Profile",
        href: `/profile/${userName}`,
        icon: User,
      },
    ],
    admin: [
      {
        title: "Admin Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: User,
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  }

  const links = [...commonLinks, ...roleSpecificLinks[userRole]]

  return (
    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
      <Sidebar variant="floating" className="border-r border-border">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Package className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Inovadora</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.title}>
                      <Link href={link.href}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userImage || "/placeholder.svg"} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </header>
      </div>
    </SidebarProvider>
  )
}
