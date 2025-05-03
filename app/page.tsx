import Link from "next/link"
import { ArrowRight, ShieldCheck, Repeat, Zap, ChevronRight, Star, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container relative mx-auto px-4 py-20 text-center md:py-32">
          <Badge className="mb-4 animate-bounce-subtle bg-white/10 text-white backdrop-blur-sm">
            Secure Trading Platform
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            The Future of Secure <span className="text-gradient">Digital Trading</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl">
            Buy, sell, and trade digital accounts and products with confidence on our innovative and secure platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="button-glow group bg-white text-blue-700 hover:bg-white/90">
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn How It Works
            </Button>
          </div>

          {/* Floating cards */}
          <div className="relative mt-16 hidden md:block">
            <div className="absolute left-[10%] top-0 animate-float" style={{ animationDelay: "0.5s" }}>
              <Card className="w-48 rotate-[-5deg] overflow-hidden border-none shadow-xl">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-1"></div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100">
                      <img src="/placeholder.svg?height=32&width=32" alt="" className="h-full w-full rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Gaming Account</p>
                      <p className="text-xs text-muted-foreground">$199</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute right-[15%] top-10 animate-float" style={{ animationDelay: "1s" }}>
              <Card className="w-48 rotate-[5deg] overflow-hidden border-none shadow-xl">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-1"></div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-100">
                      <img src="/placeholder.svg?height=32&width=32" alt="" className="h-full w-full rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Social Media</p>
                      <p className="text-xs text-muted-foreground">$149</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-[-25%] left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-background">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Why Choose Us</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Why Choose Our Platform</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We provide the most secure and efficient way to trade digital products online.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-700 transition-all duration-300 group-hover:scale-110 dark:bg-blue-900/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Our escrow system ensures that both buyers and sellers are protected throughout the entire transaction
                process.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-emerald-100 p-3 text-emerald-600 transition-all duration-300 group-hover:scale-110 dark:bg-emerald-900/30">
                <Repeat className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Easy Trading</h3>
              <p className="text-muted-foreground">
                Seamlessly trade accounts and digital products with our intuitive platform designed for smooth
                exchanges.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-emerald-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-100 dark:hover:shadow-amber-900/20">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-1 transition-all duration-300 group-hover:p-1.5"></div>
            <CardContent className="p-6 pt-8">
              <div className="mb-4 rounded-full bg-amber-100 p-3 text-amber-600 transition-all duration-300 group-hover:scale-110 dark:bg-amber-900/30">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Our platform is optimized for speed, ensuring that listings, searches, and transactions happen
                instantly.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-amber-400">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="bg-muted/30 py-20 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Featured</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Featured Listings</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore our top-rated digital products and accounts from verified sellers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Link href="#" key={item} className="group">
                <Card className="hover-card-effect overflow-hidden border-none">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-blue-600/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt="Product"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                      Verified
                    </div>
                    {item === 1 && (
                      <div className="absolute right-2 top-2 rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">
                        Hot Deal
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge variant="outline" className="rounded-sm px-2 py-0 text-xs font-normal">
                        {item % 2 === 0 ? "Gaming" : "Social Media"}
                      </Badge>
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                        <span>{4.5 + (item % 2) * 0.3}</span>
                      </div>
                    </div>
                    <h3 className="mb-1 font-semibold group-hover:text-primary">Premium Gaming Account</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-700">${120 - item * 5}.00</span>
                      <span className="text-xs text-muted-foreground">{120 - item * 10} sold</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="button-glow bg-primary text-white hover:bg-primary/90">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <Badge className="mb-2">Process</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our simple 4-step process makes trading digital products safe and easy.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
         
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {[
              {
                title: "Create Your Account",
                description: "Sign up and verify your identity to start using our platform.",
                icon: "👤",
              },
              {
                title: "List or Browse",
                description: "List your digital products or browse existing listings.",
                icon: "🔍",
              },
              {
                title: "Secure Transaction",
                description: "Use our escrow system for safe and secure transactions.",
                icon: "🔒",
              },
              {
                title: "Complete Exchange",
                description: "Finalize the transaction and leave feedback for the other party.",
                icon: "✅",
              },
            ].map((step, index) => (
              <div key={index} className="relative flex items-start md:justify-between">
                <div className="order-last ml-6 w-full md:order-first md:ml-0 md:mr-6 md:w-5/12 md:text-right">
                  {index % 2 === 0 ? (
                    <div className="group">
                      <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  ) : (
                    <div className="hidden md:block"></div>
                  )}
                </div>

                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-glow transition-transform duration-300 hover:scale-110 md:mx-auto">
                  <span className="text-sm">{index + 1}</span>
                </div>

                <div className="order-first mr-6 w-full md:order-last md:ml-6 md:mr-0 md:w-5/12 md:text-left">
                  {index % 2 === 1 ? (
                    <div className="group">
                      <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  ) : (
                    <div className="hidden md:block"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-20 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Testimonials</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Hear from our satisfied users about their experience with SecureTrade.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Gamer & Seller",
                content:
                  "SecureTrade has completely changed how I sell my gaming accounts. The escrow system gives both me and my buyers peace of mind.",
                rating: 5,
              },
              {
                name: "Sarah Williams",
                role: "Digital Asset Collector",
                content:
                  "I've been buying digital assets for years, and SecureTrade is by far the most secure platform I've used. The verification process ensures I'm always getting what I pay for.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Content Creator",
                content:
                  "As someone who regularly buys and sells social media accounts, I appreciate the transparency and security that SecureTrade provides. It's become my go-to platform.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover-card-effect overflow-hidden border-none">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { label: "Active Users", value: "10,000+", icon: "👥" },
            { label: "Transactions", value: "$2M+", icon: "💰" },
            { label: "Success Rate", value: "99.8%", icon: "📈" },
            { label: "Verified Sellers", value: "2,500+", icon: "✅" },
          ].map((stat, index) => (
            <Card key={index} className="hover-card-effect overflow-hidden border-none text-center">
              <CardContent className="p-6">
                <div className="mb-4 text-4xl">{stat.icon}</div>
                <h3 className="mb-1 text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 text-white dark:from-blue-950 dark:via-blue-900 dark:to-blue-800">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/10 text-white backdrop-blur-sm">Get Started Today</Badge>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            Join thousands of users who are already buying, selling, and trading on our secure platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="button-glow group bg-white text-blue-700 hover:bg-white/90">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">Secure transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">Money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
