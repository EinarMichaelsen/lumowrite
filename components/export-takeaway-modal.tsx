"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Download, RefreshCw, Share2, ImageIcon } from "lucide-react"
import Image from "next/image"

type Message = {
  role: "user" | "assistant"
  content: string
}

interface ExportTakeawayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  messages: Message[]
}

export function ExportTakeawayModal({ open, onOpenChange, messages }: ExportTakeawayModalProps) {
  const [quotes, setQuotes] = useState<string[]>([])
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPlaceholder, setIsPlaceholder] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStatus, setGenerationStatus] = useState("")
  const generationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (open && messages.length >= 2) {
      generateQuotes()
    }

    // Clear any existing timeout when the modal opens or closes
    return () => {
      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current)
      }
    }
  }, [open, messages])

  // Simulate progress during image generation
  useEffect(() => {
    if (isGeneratingImage) {
      setGenerationProgress(0)
      setGenerationStatus("Preparing your quote...")

      // Simulate progress steps
      const steps = [
        { progress: 15, status: "Creating design layout...", delay: 1000 },
        { progress: 30, status: "Generating typography...", delay: 2000 },
        { progress: 50, status: "Crafting visual elements...", delay: 3000 },
        { progress: 70, status: "Applying finishing touches...", delay: 4000 },
        { progress: 85, status: "Almost there...", delay: 5000 },
        { progress: 95, status: "Finalizing your image...", delay: 7000 },
      ]

      // Set up the progress simulation
      steps.forEach((step, index) => {
        setTimeout(() => {
          if (isGeneratingImage) {
            // Only update if still generating
            setGenerationProgress(step.progress)
            setGenerationStatus(step.status)
          }
        }, step.delay)
      })

      // Set a timeout for when generation takes too long
      generationTimeoutRef.current = setTimeout(() => {
        if (isGeneratingImage) {
          setGenerationStatus("This is taking longer than expected. Please wait a moment...")
        }
      }, 15000) // 15 seconds
    }

    return () => {
      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current)
      }
    }
  }, [isGeneratingImage])

  // Generate quotes when the modal opens
  const generateQuotes = async () => {
    if (messages.length < 2) return

    setIsLoadingQuotes(true)
    setError(null)
    setSelectedQuote(null)
    setImageUrl(null)
    setIsPlaceholder(false)

    try {
      const response = await fetch("/api/generate-quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate quotes: ${response.status}`)
      }

      const data = await response.json()
      if (data.quotes && Array.isArray(data.quotes) && data.quotes.length > 0) {
        setQuotes(data.quotes)
      } else {
        throw new Error("No quotes returned from the API")
      }
    } catch (err) {
      console.error("Error generating quotes:", err)
      setError(err instanceof Error ? err.message : "Failed to generate quotes")
      // Provide fallback quotes in case of API failure
      setQuotes([
        "AI can be a creative partner that helps express your own voice better",
        "Sometimes an external perspective helps you see your ideas from a fresh angle",
        "When AI feels like an extension of your thinking, it amplifies rather than diminishes authenticity",
      ])
    } finally {
      setIsLoadingQuotes(false)
    }
  }

  // Generate image from selected quote
  const generateImage = async (quote: string) => {
    setIsGeneratingImage(true)
    setError(null)
    setSelectedQuote(quote)
    setImageUrl(null)
    setIsPlaceholder(false)
    setGenerationProgress(0)
    setGenerationStatus("Preparing your quote...")

    try {
      console.log("Generating image for quote:", quote)
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quote }),
      })

      console.log("Image generation response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response text:", errorText)

        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch (e) {
          errorData = { rawText: errorText }
        }

        console.error("Error data:", errorData)
        throw new Error(
          `Failed to generate image: ${response.status}${errorData?.error ? ` - ${errorData.error}` : ""}`,
        )
      }

      const data = await response.json()
      console.log("Image generation response data:", data)

      if (data.imageUrl) {
        // Set progress to 100% before showing the image
        setGenerationProgress(100)
        setGenerationStatus("Image generated successfully!")

        // Short delay before showing the image for a smooth transition
        setTimeout(() => {
          // If the URL is from Grok, proxy it through our API
          if (data.imageUrl.startsWith("http") && !data.imageUrl.startsWith("/")) {
            setImageUrl(`/api/proxy-image?url=${encodeURIComponent(data.imageUrl)}`)
          } else {
            setImageUrl(data.imageUrl)
          }
          setIsPlaceholder(!!data.isPlaceholder)
          setIsGeneratingImage(false)
        }, 500)
      } else {
        throw new Error("No image URL returned from the API")
      }
    } catch (err) {
      console.error("Error generating image:", err)
      setError(err instanceof Error ? err.message : "Failed to generate image")

      // Set a placeholder image as fallback
      setImageUrl(`/placeholder.svg?height=1024&width=1024&query=${encodeURIComponent(quote)}`)
      setIsPlaceholder(true)
      setIsGeneratingImage(false)
    }
  }

  // Download the generated image
  const downloadImage = async () => {
    if (!imageUrl) return

    try {
      if (isPlaceholder || imageUrl.startsWith("/placeholder.svg")) {
        // For placeholder images, open in a new tab for saving
        window.open(imageUrl, "_blank")
        return
      }

      // For data URLs, create a download link
      if (imageUrl.startsWith("data:")) {
        const a = document.createElement("a")
        a.href = imageUrl
        a.download = `lumowrite-takeaway-${new Date().toISOString().split("T")[0]}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        return
      }

      // For proxied images, fetch them first
      if (imageUrl.startsWith("/api/proxy-image")) {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `lumowrite-takeaway-${new Date().toISOString().split("T")[0]}.png`
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(a)
        return
      }

      // For regular URLs, try to download directly
      const a = document.createElement("a")
      a.href = imageUrl
      a.download = `lumowrite-takeaway-${new Date().toISOString().split("T")[0]}.png`
      a.target = "_blank"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error("Error downloading image:", err)
      setError("Failed to download image. Try right-clicking the image and selecting 'Save Image As...'")
    }
  }

  // Share the image if supported
  const shareImage = async () => {
    if (!imageUrl || !navigator.share) return

    try {
      // Fetch the image regardless of source
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Share the image
      await navigator.share({
        title: "Lumowrite Takeaway",
        text: selectedQuote || "My key takeaway from Lumowrite",
        files: [new File([blob], "lumowrite-takeaway.png", { type: "image/png" })],
      })
    } catch (err) {
      console.error("Error sharing image:", err)
      setError("Failed to share image. Try downloading and sharing manually.")
    }
  }

  // Reset the state when the modal opens
  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Export Key Takeaway</DialogTitle>
          <DialogDescription>
            Extract a meaningful insight from your conversation and create a shareable image.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {isLoadingQuotes ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            <p className="mt-2 text-sm text-foreground/70">Extracting key insights...</p>
          </div>
        ) : (
          <>
            {quotes.length > 0 && !imageUrl && !isGeneratingImage && (
              <div className="space-y-4">
                <p className="text-sm text-foreground/70">
                  Select one of these key takeaways to create a shareable image:
                </p>
                <div className="space-y-3">
                  {quotes.map((quote, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedQuote === quote
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30 hover:bg-primary/5"
                      }`}
                      onClick={() => generateImage(quote)}
                    >
                      <p className="text-sm font-medium">
                        {index + 1}. '{quote}'
                      </p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={generateQuotes} disabled={isLoadingQuotes}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}

            {isGeneratingImage && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-primary/50" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle
                        className="text-primary/10"
                        strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="6"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                        style={{
                          strokeDasharray: 276.5,
                          strokeDashoffset: 276.5 - (generationProgress / 100) * 276.5,
                          transition: "stroke-dashoffset 0.5s ease-in-out",
                        }}
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-lg font-medium text-primary">{generationStatus}</p>
                <p className="mt-2 text-sm text-foreground/70">This may take up to 30 seconds. Please wait...</p>
                <div className="mt-4 w-full max-w-xs bg-primary/10 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-foreground/50">{generationProgress}% complete</p>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated takeaway image"
                    width={512}
                    height={512}
                    className="w-full h-auto"
                    unoptimized={true}
                  />
                </div>
                <div className="text-sm text-foreground/70">
                  <p>
                    {isPlaceholder
                      ? "We've created a simple placeholder image. You can download it or try again."
                      : "Your shareable image is ready! Click the button below to download it."}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {imageUrl && (
            <div className="flex gap-2">
              {navigator.share && (
                <Button onClick={shareImage} variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
              <Button onClick={downloadImage}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
