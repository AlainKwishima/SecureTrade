import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SecureTrade - Buy, Sell, and Trade Digital Products Securely",
  description: "The most secure platform for buying, selling, and trading digital accounts and products.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                  <div className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-xl font-bold text-primary transition-colors hover:text-primary/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 animate-pulse-subtle"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="M8 11h8" />
                        <path d="M12 15V7" />
                      </svg>
                      SecureTrade
                    </Link>
                    <nav className="hidden md:flex md:gap-6">
                      <Link
                        href="/marketplace"
                        className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Marketplace
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                      <Link
                        href="/categories"
                        className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Categories
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                      <Link
                        href="/how-it-works"
                        className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        How It Works
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                      <Link
                        href="/support"
                        className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Support
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </nav>
                  </div>
                  <div className="hidden md:flex md:items-center md:gap-4">
                    
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                      <span className="absolute right-1 top-1 flex h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
                    </Button>
                    <Button variant="ghost" size="icon" className="transition-transform duration-300 hover:rotate-12">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Mobile Menu */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                      <div className="flex flex-col gap-6 py-4">
                        <div className="flex items-center justify-between">
                          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                              <path d="M8 11h8" />
                              <path d="M12 15V7" />
                            </svg>
                            SecureTrade
                          </Link>
                          <ThemeToggle />
                        </div>

                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="search" placeholder="Search..." className="w-full bg-background pl-8" />
                        </div>

                        <nav className="flex flex-col gap-2">
                          <Link
                            href="/marketplace"
                            className="flex items-center rounded-md p-2 text-sm font-medium hover:bg-muted"
                          >
                            Marketplace
                          </Link>
                          <Link
                            href="#"
                            className="flex items-center rounded-md p-2 text-sm font-medium hover:bg-muted"
                          >
                            Categories
                          </Link>
                          <Link
                            href="#"
                            className="flex items-center rounded-md p-2 text-sm font-medium hover:bg-muted"
                          >
                            How It Works
                          </Link>
                          <Link
                            href="#"
                            className="flex items-center rounded-md p-2 text-sm font-medium hover:bg-muted"
                          >
                            Support
                          </Link>
                        </nav>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Cart
                          </Button>
                        </div>

                        <Link href="/auth/login">
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            <User className="mr-2 h-4 w-4" />
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </header>
              <main className="flex-1">
                <Suspense>{children}</Suspense>
              </main>
              <footer className="border-t bg-muted/30 py-8 dark:bg-muted/10">
                <div className="container mx-auto px-4">
                  <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="M8 11h8" />
                        <path d="M12 15V7" />
                      </svg>
                      SecureTrade
                    </Link>
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="grid gap-8 md:grid-cols-4">
                    <div>
                      <h3 className="mb-4 text-lg font-bold">Company</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Press
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-lg font-bold">Support</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Help Center
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Safety Center
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Community Guidelines
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-lg font-bold">Legal</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Terms of Service
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            Cookie Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Subscribe to our newsletter for the latest updates and offers.
                      </p>
                      <div className="flex gap-2">
                        <Input placeholder="Your email" className="bg-background" />
                        <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 SecureTrade. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
