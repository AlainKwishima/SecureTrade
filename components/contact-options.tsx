"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Seller {
  id: string
  name: string
  phone: string
  email: string
}

interface ContactOptionsProps {
  seller: Seller
  productId: string
}

export default function ContactOptions({ seller, productId }: ContactOptionsProps) {
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState(`Question about product #${productId}`)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate sending a message
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setMessage("")

      // Reset the success message after a few seconds
      setTimeout(() => {
        setIsSent(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Contact Seller</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Button variant="outline" className="flex h-auto flex-col items-center justify-center gap-2 p-4">
          <Phone className="h-6 w-6 text-blue-800" />
          <span className="font-medium">Call Seller</span>
          <span className="text-sm text-gray-500">{seller.phone}</span>
        </Button>

        <Button variant="outline" className="flex h-auto flex-col items-center justify-center gap-2 p-4">
          <Mail className="h-6 w-6 text-blue-800" />
          <span className="font-medium">Email Seller</span>
          <span className="text-sm text-gray-500">{seller.email}</span>
        </Button>

        <Button variant="outline" className="flex h-auto flex-col items-center justify-center gap-2 p-4">
          <MessageSquare className="h-6 w-6 text-blue-800" />
          <span className="font-medium">Chat</span>
          <span className="text-sm text-gray-500">Start a conversation</span>
        </Button>
      </div>

      <Tabs defaultValue="message" className="mt-6">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="message">Send Message</TabsTrigger>
          <TabsTrigger value="email">Send Email</TabsTrigger>
        </TabsList>

        <TabsContent value="message" className="mt-4">
          <form onSubmit={handleSendMessage}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder={`Hi ${seller.name}, I'm interested in this product...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>

              {isSent ? (
                <div className="rounded-md bg-green-50 p-4 text-green-800">
                  Message sent successfully! The seller will respond shortly.
                </div>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-700"
                  disabled={isSending || message.trim() === ""}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <form onSubmit={handleSendMessage}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email-message">Message</Label>
                <Textarea
                  id="email-message"
                  placeholder={`Hi ${seller.name}, I'm interested in this product...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>

              {isSent ? (
                <div className="rounded-md bg-green-50 p-4 text-green-800">
                  Email sent successfully! The seller will respond shortly.
                </div>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-700"
                  disabled={isSending || message.trim() === "" || subject.trim() === ""}
                >
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              )}
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
