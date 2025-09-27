"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiInfo, setApiInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chatTest, setChatTest] = useState<any>(null)
  const [chatLoading, setChatLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [debugLoading, setDebugLoading] = useState(false)
  const [openaiInfo, setOpenaiInfo] = useState<any>(null)
  const [openaiLoading, setOpenaiLoading] = useState(false)

  const safelyParseJson = (text: string) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse JSON:", e)
      console.log("Text that failed to parse:", text)
      return null
    }
  }

  const testApi = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test")
      const responseText = await response.text()
      console.log("API test response:", responseText)

      try {
        const data = safelyParseJson(responseText)
        if (data) {
          setApiInfo(data)
        } else {
          setApiInfo({
            error: "Failed to parse JSON",
            text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
          })
        }
      } catch (e) {
        setApiInfo({
          error: "Failed to parse JSON",
          text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
        })
      }
    } catch (error) {
      console.error("Error testing API:", error)
      setApiInfo({ error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const testDebug = async () => {
    setDebugLoading(true)
    try {
      const response = await fetch("/api/debug")
      const responseText = await response.text()
      console.log("Debug API response:", responseText)

      try {
        const data = safelyParseJson(responseText)
        if (data) {
          setDebugInfo(data)
        } else {
          setDebugInfo({
            error: "Failed to parse JSON",
            text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
          })
        }
      } catch (e) {
        setDebugInfo({
          error: "Failed to parse JSON",
          text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
        })
      }
    } catch (error) {
      console.error("Error testing debug API:", error)
      setDebugInfo({ error: error.message })
    } finally {
      setDebugLoading(false)
    }
  }

  const testOpenAI = async () => {
    setOpenaiLoading(true)
    try {
      const response = await fetch("/api/openai-test")
      const responseText = await response.text()
      console.log("OpenAI test API response:", responseText)

      try {
        const data = safelyParseJson(responseText)
        if (data) {
          setOpenaiInfo(data)
        } else {
          setOpenaiInfo({
            error: "Failed to parse JSON",
            text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
          })
        }
      } catch (e) {
        setOpenaiInfo({
          error: "Failed to parse JSON",
          text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
        })
      }
    } catch (error) {
      console.error("Error testing OpenAI API:", error)
      setOpenaiInfo({ error: error.message })
    } finally {
      setOpenaiLoading(false)
    }
  }

  const testChat = async () => {
    setChatLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello, this is a test message." }],
          intention: "think",
        }),
      })

      const responseText = await response.text()
      console.log("Chat API response:", responseText)
      console.log("Chat API status:", response.status)

      setChatTest({
        status: response.status,
        ok: response.ok,
        text: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
        data: safelyParseJson(responseText),
      })
    } catch (error) {
      console.error("Error testing chat:", error)
      setChatTest({ error: error.message })
    } finally {
      setChatLoading(false)
    }
  }

  const clearErrorState = () => {
    // Try to clear any error state in localStorage
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("yap-error-")) {
          localStorage.removeItem(key)
        }
      })
      alert("Error state cleared. Try refreshing the page.")
    } catch (e) {
      console.error("Error clearing localStorage:", e)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="outline" className="bg-white" onClick={() => setIsOpen(true)}>
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex justify-between">
            <span>Debug Panel</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={testApi} disabled={isLoading}>
                Test API
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={testDebug} disabled={debugLoading}>
                Test Debug
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={testOpenAI} disabled={openaiLoading}>
                Test OpenAI
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={testChat} disabled={chatLoading}>
                Test Chat
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => console.clear()}>
                Clear Console
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={clearErrorState}>
                Clear Errors
              </Button>
            </div>

            {apiInfo && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                <strong>API Test:</strong>
                <pre>{typeof apiInfo === "object" ? JSON.stringify(apiInfo, null, 2) : apiInfo}</pre>
              </div>
            )}

            {debugInfo && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                <strong>Debug Test:</strong>
                <pre>{typeof debugInfo === "object" ? JSON.stringify(debugInfo, null, 2) : debugInfo}</pre>
              </div>
            )}

            {openaiInfo && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                <strong>OpenAI Test:</strong>
                <pre>{typeof openaiInfo === "object" ? JSON.stringify(openaiInfo, null, 2) : openaiInfo}</pre>
              </div>
            )}

            {chatTest && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                <strong>Chat Test:</strong>
                <pre>{typeof chatTest === "object" ? JSON.stringify(chatTest, null, 2) : chatTest}</pre>
              </div>
            )}

            <div className="mt-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 w-full"
                onClick={() => (window.location.href = "/")}
              >
                Go to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
