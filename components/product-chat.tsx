"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: "user" | "seller"
  text: string
  timestamp: Date
}

interface ProductChatProps {
  sellerId: string
  productId: string
}

export default function ProductChat({ sellerId, productId }: ProductChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "seller",
      text: "Hello! I'm the seller. How can I help you with this product?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate seller response after a short delay
    setTimeout(
      () => {
        const sellerResponses = [
          "Thank you for your interest! Do you have any specific questions about the product?",
          "Yes, this product is currently in stock and ready to ship.",
          "I can offer a small discount if you're ordering multiple items.",
          "The shipping usually takes 3-5 business days depending on your location.",
          "Feel free to ask if you need any additional information!",
        ]

        const randomResponse = sellerResponses[Math.floor(Math.random() * sellerResponses.length)]

        const sellerMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "seller",
          text: randomResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, sellerMessage])
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex h-[400px] flex-col rounded-lg border">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {message.sender === "seller" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Seller" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <div
                    className={`mt-1 text-xs text-gray-500 ${message.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.sender === "user" && (
                  <Avatar className="ml-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="flex border-t p-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit" size="icon" className="ml-2 bg-blue-800 hover:bg-blue-700">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
