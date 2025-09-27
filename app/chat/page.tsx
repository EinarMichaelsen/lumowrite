"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Send, RefreshCw, Download, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { trackExport, trackNewSession } from "@/lib/analytics"
import { logger } from "@/lib/logger"
import { ExportTakeawayModal } from "@/components/export-takeaway-modal"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function Chat() {
  const router = useRouter()
  const [intention, setIntention] = useState<string>("think")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [userText, setUserText] = useState<string>("")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  // Load intention and user text from localStorage
  useEffect(() => {
    // Get the current intention from localStorage
    const currentIntention = localStorage.getItem("yap-current-intention") || "think"
    setIntention(currentIntention)

    logger.log("Loading user text for intention:", currentIntention)
    const text = localStorage.getItem(`yap-${currentIntention}`)
    logger.log("User text exists:", !!text)
    logger.log("User text length:", text?.length || 0)

    if (!text || text.trim().length === 0) {
      logger.log("No user text found, redirecting to home")
      router.push("/")
      return
    }

    // Save the user text for potential ChatGPT use
    setUserText(text)

    // Initialize chat with the user's text
    setMessages([{ role: "user", content: text }])
    logger.log("Initial message set, calling handleInitialResponse")

    // Generate initial AI response
    handleInitialResponse(text, currentIntention)
  }, [router])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use a small timeout to ensure DOM has updated
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [messages])

  const safelyParseJson = (text: string) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      logger.error("Failed to parse JSON:", e)
      logger.log("Text that failed to parse:", text)
      return null
    }
  }

  const handleInitialResponse = async (userText: string, currentIntention: string) => {
    logger.log("handleInitialResponse called with text length:", userText.length)
    setIsLoading(true)
    setError(null)

    try {
      logger.log("Attempting to call API route")
      logger.log("Request payload:", {
        messages: [{ role: "user", content: userText }],
        intention: currentIntention,
      })

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: userText }],
            intention: currentIntention,
          }),
        })

        logger.log("API response status:", response.status)
        logger.log("API response ok:", response.ok)

        if (!response.ok) {
          logger.error("API returned error status:", response.status)
          throw new Error(`API returned status ${response.status}`)
        }

        // Get the response text first
        const responseText = await response.text()
        logger.log("API response text:", responseText)

        // Try to parse as JSON
        const data = safelyParseJson(responseText)

        if (data && data.content) {
          logger.log("API response parsed as JSON:", data)
          setMessages((prev) => [...prev, { role: "assistant", content: data.content }])

          if (data.error) {
            logger.error("API returned error:", data.error)
            setError(data.error)
          }

          logger.log("Message added from API response")
        } else {
          throw new Error("Invalid or missing content in API response")
        }
      } catch (apiError) {
        logger.error("API call failed:", apiError)
        setError("Error getting AI response: " + apiError.message)
      }
    } catch (error) {
      logger.error("Error generating initial response:", error)
      setError(`Failed to get a response: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return

    logger.log("handleSendMessage called with input:", input)
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      logger.log("Preparing API call with all messages")
      // Only include actual messages that have been exchanged
      const apiMessages = [...messages, userMessage]
      logger.log("Messages being sent to API:", apiMessages)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: apiMessages,
            intention,
          }),
        })

        logger.log("API response status:", response.status)
        logger.log("API response ok:", response.ok)

        if (!response.ok) {
          logger.error("API returned error status:", response.status)
          throw new Error(`API returned status ${response.status}`)
        }

        // Get the response text first
        const responseText = await response.text()
        logger.log("API response text:", responseText)

        // Try to parse as JSON
        const data = safelyParseJson(responseText)

        if (data && data.content) {
          logger.log("API response parsed as JSON:", data)
          setMessages((prev) => [...prev, { role: "assistant", content: data.content }])

          if (data.error) {
            logger.error("API returned error:", data.error)
            setError(data.error)
          }

          logger.log("Message added from API response")
        } else {
          throw new Error("Invalid or missing content in API response")
        }
      } catch (apiError) {
        logger.error("API call failed:", apiError)
        setError("Error getting AI response: " + apiError.message)
      }
    } catch (error) {
      logger.error("Error generating response:", error)
      setError(`Failed to get a response: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewSession = () => {
    logger.log("Starting new session, clearing localStorage for intention:", intention)
    localStorage.removeItem(`yap-${intention}`)
    trackNewSession()
    router.push("/")
  }

  const handleExportChat = () => {
    logger.log("Exporting chat")
    // Format the chat for export
    const chatContent = messages.map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`).join("\n\n")

    // Create a blob and download link
    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `yap-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackExport()
    logger.log("Chat exported successfully")
  }

  // Function to format message content with preserved line breaks
  const formatMessageContent = (content: string) => {
    // Split the content by line breaks and map each line to a paragraph
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col w-full h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" className="p-2">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <DarkModeToggle />
            {/* ChatGPT button hidden as requested */}
            {/* <Button
              variant="outline"
              onClick={handleChatGpt}
              className="hidden sm:flex"
              title="Continue this reflection in ChatGPT"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              ChatGPT
            </Button> */}

            {/* Key Takeaway button hidden as requested */}
            {/* <Button
              variant="outline"
              onClick={() => setIsExportModalOpen(true)}
              disabled={messages.length < 2}
              className="hidden sm:flex"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Key Takeaway
            </Button> */}

            <Button
              variant="outline"
              onClick={handleExportChat}
              disabled={messages.length < 2}
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleNewSession}>
              <RefreshCw className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-background border border-primary/20 rounded-md text-foreground text-sm flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error getting AI response</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        <Card className="flex-1 flex flex-col border-none shadow-none overflow-hidden">
          <CardContent
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto pb-0 pt-4 h-full"
            style={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="space-y-4 min-h-full flex-1">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-4",
                      message.role === "user"
                        ? "bg-primary/5 text-foreground"
                        : "bg-card border border-border/10 text-foreground",
                      // Add white-space property to preserve line breaks
                      "whitespace-pre-line",
                    )}
                  >
                    {formatMessageContent(message.content)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-card border border-border/10">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-primary/10 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-primary/10 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-primary/10 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-primary/10 focus:border-primary/20 focus:ring-0"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ""}
                className="bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {/* Mobile Key Takeaway button hidden as requested */}
            {/* <div className="flex sm:hidden mt-4 w-full">
              <Button
                variant="outline"
                onClick={() => setIsExportModalOpen(true)}
                disabled={messages.length < 2}
                className="text-xs w-full"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Export Key Takeaway
              </Button>
            </div> */}
          </CardFooter>
        </Card>
      </div>
      {/* Export Takeaway Modal - keep this for future use */}
      <ExportTakeawayModal open={isExportModalOpen} onOpenChange={setIsExportModalOpen} messages={messages} />
    </main>
  )
}
