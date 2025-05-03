"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  HelpCircle,
  MessageCircle,
  Phone,
  Search,
  Send,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SupportPage() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "system",
      message: "Welcome to SecureTrade Support! How can we help you today?",
      time: "Just now",
    },
  ])
  const [messageInput, setMessageInput] = useState("")

  // Support categories
  const supportCategories = [
    {
      title: "Account Issues",
      icon: "👤",
      description: "Help with login, registration, and account settings",
      articles: 12,
    },
    {
      title: "Payments & Billing",
      icon: "💳",
      description: "Questions about payments, refunds, and billing",
      articles: 18,
    },
    {
      title: "Buying Guide",
      icon: "🛒",
      description: "How to buy products safely on our platform",
      articles: 15,
    },
    {
      title: "Selling Guide",
      icon: "📦",
      description: "Tips and instructions for sellers",
      articles: 14,
    },
    {
      title: "Disputes & Refunds",
      icon: "⚖️",
      description: "How to handle disputes and request refunds",
      articles: 9,
    },
    {
      title: "Security & Privacy",
      icon: "🔒",
      description: "Information about our security measures",
      articles: 7,
    },
  ]

  // Popular articles
  const popularArticles = [
    {
      title: "How to reset your password",
      category: "Account Issues",
      views: 12543,
    },
    {
      title: "Understanding the escrow system",
      category: "Payments & Billing",
      views: 9876,
    },
    {
      title: "What to do if a product isn't as described",
      category: "Disputes & Refunds",
      views: 8765,
    },
    {
      title: "How to create a compelling listing",
      category: "Selling Guide",
      views: 7654,
    },
    {
      title: "Verifying a seller's reputation",
      category: "Buying Guide",
      views: 6543,
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team through the live chat feature on this page, by submitting a ticket, or by calling our support hotline at +1-800-SECURE-TRADE. Our team is available 24/7 to assist you.",
    },
    {
      question: "What should I do if I haven't received my purchase?",
      answer:
        "If you haven't received your purchase within the expected timeframe, first check your email for any delivery notifications. If you still can't locate your purchase, contact the seller through the order messaging system. If the seller doesn't respond within 24 hours, you can open a dispute in your order history.",
    },
    {
      question: "How long do refunds take to process?",
      answer:
        "Refunds are typically processed within 3-5 business days after approval. However, it may take an additional 5-10 business days for the funds to appear in your account, depending on your payment method and financial institution.",
    },
    {
      question: "Can I sell accounts from any platform?",
      answer:
        "We allow the sale of accounts from most platforms, but there are some restrictions. Accounts must be owned by you, and selling must not violate the terms of service of the original platform. Please review our seller guidelines for a complete list of restricted accounts.",
    },
    {
      question: "How does the verification process work?",
      answer:
        "Our verification process involves checking the authenticity and quality of digital products and accounts before they're listed. For accounts, we verify ownership and key details. For digital products, we check for quality and completeness. This helps ensure buyers receive what they expect.",
    },
  ]

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
        time: "Just now",
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
          sender: "system",
          message:
            "Thanks for your message! A support agent will respond shortly. In the meantime, you might find an answer in our FAQ section.",
          time: "Just now",
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">Support Center</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for help articles..." className="h-12 bg-white pl-10 text-base shadow-lg" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="help-center" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="help-center">Help Center</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="help-center" className="space-y-8">
            {/* Categories */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {supportCategories.map((category, index) => (
                  <Link href="#" key={index}>
                    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{category.icon}</span>
                          <Badge variant="outline">{category.articles} articles</Badge>
                        </div>
                        <CardTitle className="mt-2">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{category.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" className="w-full justify-between text-blue-700 dark:text-blue-400">
                          View Articles
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Popular Articles</h2>
              <div className="grid gap-4">
                {popularArticles.map((article, index) => (
                  <Link href="#" key={index}>
                    <Card className="transition-all duration-300 hover:shadow-md">
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{article.title}</h3>
                          <p className="text-sm text-muted-foreground">{article.category}</p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <HelpCircle className="mr-1 h-4 w-4" />
                          {article.views.toLocaleString()} views
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="text-blue-700 dark:text-blue-400">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Submit a Support Ticket</CardTitle>
                  <CardDescription>
                    Fill out the form below and our support team will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is your ticket about?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a category</option>
                        <option value="account">Account Issues</option>
                        <option value="payment">Payments & Billing</option>
                        <option value="buying">Buying Issues</option>
                        <option value="selling">Selling Issues</option>
                        <option value="dispute">Disputes & Refunds</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Describe your issue in detail" rows={5} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="attachment" className="text-sm font-medium">
                        Attachments (Optional)
                      </label>
                      <Input id="attachment" type="file" />
                      <p className="text-xs text-muted-foreground">
                        Max file size: 10MB. Supported formats: JPG, PNG, PDF.
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-800 hover:bg-blue-700">Submit Ticket</Button>
                </CardFooter>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MessageCircle className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-muted-foreground">support@securetrade.com</p>
                        <p className="text-xs text-muted-foreground">Response time: 24-48 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Phone Support</h3>
                        <p className="text-sm text-muted-foreground">+1-800-SECURE-TRADE</p>
                        <p className="text-xs text-muted-foreground">Available 24/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Customer Support</h3>
                        <p className="text-sm text-muted-foreground">24 hours a day, 7 days a week</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Technical Support</h3>
                        <p className="text-sm text-muted-foreground">Monday - Friday: 9AM - 8PM EST</p>
                        <p className="text-sm text-muted-foreground">Saturday - Sunday: 10AM - 6PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Check the status of your existing support tickets.
                    </p>
                    <Button variant="outline" className="w-full">
                      View My Tickets
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live-chat" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Live Chat */}
              <Card className="lg:col-span-2">
                <CardHeader className="border-b bg-muted/30 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">SecureTrade Support</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                          Online
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      Live Chat
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] overflow-y-auto p-0">
                  <div className="flex flex-col space-y-4 p-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
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
                <CardFooter className="border-t p-3">
                  <div className="flex w-full items-center space-x-2">
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
                </CardFooter>
              </Card>

              {/* Chat Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chat Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <User className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Support Agent</h3>
                        <p className="text-sm text-muted-foreground">
                          You'll be connected with the next available agent.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Estimated Wait Time</h3>
                        <p className="text-sm text-muted-foreground">Less than 2 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-700" />
                      <div>
                        <h3 className="font-medium">Chat Transcript</h3>
                        <p className="text-sm text-muted-foreground">A copy of this chat will be sent to your email.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="flex items-center text-sm text-blue-700 dark:text-blue-400">
                          <ChevronRight className="mr-1 h-4 w-4" />
                          How to reset your password
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-sm text-blue-700 dark:text-blue-400">
                          <ChevronRight className="mr-1 h-4 w-4" />
                          Understanding the escrow system
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-sm text-blue-700 dark:text-blue-400">
                          <ChevronRight className="mr-1 h-4 w-4" />
                          What to do if a product isn't as described
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-sm text-blue-700 dark:text-blue-400">
                          <ChevronRight className="mr-1 h-4 w-4" />
                          How to create a compelling listing
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">Still Need Help?</h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Our support team is always ready to assist you with any questions or issues you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              View FAQs
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
