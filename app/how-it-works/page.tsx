import { Check, Shield, Star, Truck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HowItWorksPage() {
  // Process steps
  const buyerSteps = [
    {
      title: "Browse & Find",
      description: "Search through our vast marketplace to find the perfect digital product or account.",
      icon: "🔍",
    },
    {
      title: "Secure Payment",
      description: "Make a payment through our secure escrow system. Your money is held safely until you're satisfied.",
      icon: "💳",
    },
    {
      title: "Verification",
      description: "We verify the product or account to ensure it matches the seller's description.",
      icon: "✅",
    },
    {
      title: "Receive & Confirm",
      description: "Receive your purchase and confirm everything is as expected before the seller gets paid.",
      icon: "📦",
    },
  ]

  const sellerSteps = [
    {
      title: "List Your Item",
      description: "Create a detailed listing with accurate information about your digital product or account.",
      icon: "📝",
    },
    {
      title: "Secure Storage",
      description: "Securely store your digital assets in our vault until a buyer purchases them.",
      icon: "🔒",
    },
    {
      title: "Verification",
      description: "We verify your product or account to ensure it matches your description.",
      icon: "✅",
    },
    {
      title: "Get Paid",
      description: "Once the buyer confirms receipt and satisfaction, you receive your payment instantly.",
      icon: "💰",
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How does the escrow system work?",
      answer:
        "Our escrow system holds the buyer's payment securely until the transaction is complete. Once the buyer confirms they've received the digital product or account and everything is as described, the payment is released to the seller. This protects both parties from fraud.",
    },
    {
      question: "What happens if the product isn't as described?",
      answer:
        "If you receive a product that doesn't match the seller's description, you can open a dispute within 24 hours. Our team will investigate and if your claim is valid, you'll receive a full refund. We take misrepresentation very seriously.",
    },
    {
      question: "How do you verify digital products and accounts?",
      answer:
        "We use a combination of automated systems and manual review to verify digital products and accounts. This includes checking account age, activity, and other relevant metrics to ensure they match the seller's description.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security measures to protect your payment information. We never store your full credit card details on our servers and all transactions are processed through secure payment gateways.",
    },
    {
      question: "Can I sell any type of digital product or account?",
      answer:
        "We have guidelines about what can be sold on our platform. Generally, we don't allow the sale of accounts or products that violate terms of service, contain illegal content, or infringe on intellectual property rights. Please review our seller guidelines for more information.",
    },
    {
      question: "What fees do you charge?",
      answer:
        "We charge a 5% fee on successful transactions. This fee helps us maintain the platform, provide customer support, and ensure secure transactions. There are no listing fees or monthly charges.",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">How SecureTrade Works</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            The safest way to buy and sell digital products and accounts online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              Start Buying
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              Start Selling
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Process Section */}
        <div className="mb-20 text-center">
          <h2 className="mb-2 text-3xl font-bold">Our Process</h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
            SecureTrade makes buying and selling digital products safe, secure, and simple.
          </p>

          <Tabs defaultValue="buyer" className="mx-auto max-w-4xl">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="buyer">I Want to Buy</TabsTrigger>
              <TabsTrigger value="seller">I Want to Sell</TabsTrigger>
            </TabsList>

            <TabsContent value="buyer">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {buyerSteps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-900/10 to-blue-800/5 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-800 text-white">
                          {index + 1}
                        </span>
                        <span className="text-3xl">{step.icon}</span>
                      </div>
                      <CardTitle className="mt-2">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardDescription>{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-blue-800 hover:bg-blue-700">Start Browsing</Button>
              </div>
            </TabsContent>

            <TabsContent value="seller">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {sellerSteps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-900/10 to-blue-800/5 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-800 text-white">
                          {index + 1}
                        </span>
                        <span className="text-3xl">{step.icon}</span>
                      </div>
                      <CardTitle className="mt-2">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardDescription>{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-blue-800 hover:bg-blue-700">Start Selling</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">Why Choose SecureTrade</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We've built the most secure platform for digital transactions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-blue-700" />
                <CardTitle>Secure Escrow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our escrow system protects both buyers and sellers, ensuring safe transactions every time.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Money held securely</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Verification before release</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Dispute resolution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Truck className="mb-2 h-10 w-10 text-blue-700" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get your digital products instantly after payment verification.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Instant delivery system</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Secure transfer methods</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Delivery confirmation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-blue-700" />
                <CardTitle>Verified Sellers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All sellers on our platform are verified to ensure quality and reliability.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Identity verification</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Product quality checks</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Rating system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20 rounded-xl bg-gradient-to-r from-blue-900/10 to-blue-800/5 p-8">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Don't just take our word for it. Here's what our community has to say.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    {index === 0
                      ? "I've been buying and selling digital accounts for years, and SecureTrade is by far the safest platform I've used. The escrow system gives me peace of mind."
                      : index === 1
                        ? "As a seller, I appreciate how SecureTrade verifies buyers before releasing my products. It's eliminated scams completely and helped me build a reliable business."
                        : "The instant delivery system is amazing! I purchased a gaming account and was playing within minutes. The verification process ensures you get exactly what you pay for."}
                  </p>
                  <div className="flex items-center">
                    <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img
                        src={`/placeholder.svg?height=40&width=40`}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {index === 0 ? "Alex Thompson" : index === 1 ? "Sarah Miller" : "David Chen"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? "Buyer" : index === 1 ? "Seller" : "Buyer & Seller"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our
              support team.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Join thousands of users who buy and sell digital products securely on SecureTrade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              Create an Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
