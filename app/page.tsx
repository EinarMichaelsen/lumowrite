"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Maximize2, Timer, ExternalLink, Bot, Download, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { HelpDialog } from "@/components/help-dialog"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { createChatGptUrl } from "@/lib/utils-chatgpt"
import {
  trackWritingStarted,
  trackWritingCompleted,
  trackReflectionStarted,
  trackTimerStarted,
  trackTimerCompleted,
  trackFontChanged,
  trackExport,
} from "@/lib/analytics"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Timer intervals in minutes
const TIMER_INTERVALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
const SCROLL_SENSITIVITY = 1 // Higher number = slower scrolling
const HELP_TEXT = "just write something"

export default function Home() {
  const [text, setText] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [intention, setIntention] = useState("think")
  const [showControls, setShowControls] = useState(true)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(15) // Default 15 minutes
  const [timeRemaining, setTimeRemaining] = useState(timerMinutes * 60)
  const [fontSize, setFontSize] = useState(18)
  const [fontFamily, setFontFamily] = useState("font-sans")
  const [isTyping, setIsTyping] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [hasStartedWriting, setHasStartedWriting] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollAccumulatorRef = useRef<number>(0) // Track accumulated scroll
  const router = useRouter()

  // Check if this is the first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("yap-visited")
    if (hasVisitedBefore) {
      setIsFirstVisit(false)
    } else {
      localStorage.setItem("yap-visited", "true")
    }
  }, [])

  // Focus the textarea on load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      // Always show controls on mouse movement
      setShowControls(true)

      // Clear any existing timeout
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
      }

      // Only set a timeout to hide controls if we're not typing and there's text
      if (!isTyping && text.length > 0) {
        hideControlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
      }
    }
  }, [text, isTyping])

  // Handle typing detection
  useEffect(() => {
    const handleKeyDown = () => {
      setIsTyping(true)
      setShowControls(false)

      // Track writing started (only once per session)
      if (!hasStartedWriting && text.length > 0) {
        setHasStartedWriting(true)
        trackWritingStarted()
      }

      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Set a new timeout
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        // Show controls briefly after typing stops
        setShowControls(true)

        // Set timeout to hide controls again
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current)
        }

        if (text.length > 0) {
          hideControlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
          }, 3000)
        }
      }, 1500) // Consider typing stopped after 1.5 seconds of inactivity
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [text, hasStartedWriting])

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsTimerActive(false)
            setShowControls(true) // Show controls when timer ends
            trackTimerCompleted()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeRemaining === 0 && isTimerActive) {
      setIsTimerActive(false)
      setShowControls(true)
    }

    return () => clearInterval(interval)
  }, [isTimerActive, timeRemaining])

  // Handle wheel events for timer scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when hovering over the timer
      if (timerRef.current && timerRef.current.contains(e.target as Node)) {
        e.preventDefault()

        // Determine scroll direction and accumulate scroll amount
        const delta = e.deltaY
        scrollAccumulatorRef.current += Math.abs(delta)

        // Only change timer when accumulated scroll exceeds threshold
        if (scrollAccumulatorRef.current > SCROLL_SENSITIVITY * 100) {
          // Determine direction
          const direction = delta < 0 ? "up" : "down"
          scrollTimerInterval(direction)

          // Reset accumulator
          scrollAccumulatorRef.current = 0
        }
      } else {
        // Reset accumulator when not scrolling on timer
        scrollAccumulatorRef.current = 0
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [timerMinutes])

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // Auto-save to localStorage
    localStorage.setItem(`yap-${intention}`, e.target.value)
  }

  const handleDiscuss = () => {
    if (text.trim().length < 10) return

    // Track writing completed
    trackWritingCompleted(text.length)

    // Track reflection started
    trackReflectionStarted("in_app")

    // Save text to localStorage
    localStorage.setItem(`yap-${intention}`, text)

    // Save current intention to localStorage
    localStorage.setItem("yap-current-intention", intention)

    // Navigate to chat without intention in URL
    router.push(`/chat`)
  }

  const handleChatGpt = () => {
    if (text.trim().length < 10) return

    // Track writing completed
    trackWritingCompleted(text.length)

    // Track reflection started with ChatGPT
    trackReflectionStarted("chatgpt")

    // Save text to localStorage
    localStorage.setItem(`yap-${intention}`, text)

    // Create ChatGPT URL with the text as a prompt
    const chatGptUrl = createChatGptUrl(text)

    // Open ChatGPT in a new tab
    window.open(chatGptUrl, "_blank")
  }

  // Toggle timer start/stop
  const toggleTimer = () => {
    if (isTimerActive) {
      // Stop the timer
      setIsTimerActive(false)
    } else {
      // Start the timer
      setTimeRemaining(timerMinutes * 60)
      setIsTimerActive(true)
      setShowControls(false) // Hide controls when timer starts

      // Track timer started
      trackTimerStarted(timerMinutes)
    }
  }

  // Scroll through timer intervals
  const scrollTimerInterval = (direction: "up" | "down") => {
    const currentIndex = TIMER_INTERVALS.indexOf(timerMinutes)
    let newIndex = currentIndex

    if (direction === "up") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : TIMER_INTERVALS.length - 1
    } else {
      newIndex = currentIndex < TIMER_INTERVALS.length - 1 ? currentIndex + 1 : 0
    }

    setTimerMinutes(TIMER_INTERVALS[newIndex])
    setTimeRemaining(TIMER_INTERVALS[newIndex] * 60)
  }

  // Handle font size change
  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize)
    trackFontChanged(fontFamily, newSize)
  }

  // Handle font family change
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value
    setFontFamily(newFont)
    trackFontChanged(newFont, fontSize)
  }

  // Export functions
  const copyToClipboard = async () => {
    if (!text.trim()) return

    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      trackExport()
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopySuccess(true)
        trackExport()
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const downloadAsText = () => {
    if (!text.trim()) return

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lumowrite-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackExport()
  }

  const downloadAsMarkdown = () => {
    if (!text.trim()) return

    // Add some basic markdown formatting
    const markdownContent = `# My Writing Session - ${new Date().toLocaleDateString()}\n\n${text}`

    const blob = new Blob([markdownContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lumowrite-${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackExport()
  }

  const downloadAsHTML = () => {
    if (!text.trim()) return

    // Convert line breaks to HTML paragraphs
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Writing Session - ${new Date().toLocaleDateString()}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem; 
            line-height: 1.6; 
            color: #333; 
        }
        h1 { color: #2c3e50; margin-bottom: 2rem; }
        .content { white-space: pre-line; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>My Writing Session</h1>
    <div class="content">${text.replace(/\n/g, "\n")}</div>
    <div class="footer">
        <p>Created on ${new Date().toLocaleDateString()} with <a href="https://lumowrite.com">Lumowrite</a></p>
    </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lumowrite-${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackExport()
  }

  const downloadAsRTF = () => {
    if (!text.trim()) return

    // Basic RTF format
    const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 \\b My Writing Session - ${new Date().toLocaleDateString()}\\b0\\par
\\par
${text.replace(/\n/g, "\\par\n")}
\\par
\\par
\\i Created with Lumowrite - lumowrite.com\\i0
}`

    const blob = new Blob([rtfContent], { type: "application/rtf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lumowrite-${new Date().toISOString().split("T")[0]}.rtf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackExport()
  }

  // Load saved text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem(`yap-${intention}`)
    if (savedText) {
      setText(savedText)
    }
  }, [intention])

  // Get font class based on selection
  const getFontClass = () => {
    switch (fontFamily) {
      case "font-sans":
        return "font-sans"
      case "font-serif":
        return "font-serif"
      case "font-mono":
        return "font-mono"
      default:
        return "font-sans"
    }
  }

  // Force show controls when interacting with toolbar
  const handleToolbarInteraction = () => {
    setShowControls(true)

    // Clear any existing timeout
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col">
      {/* Main writing area with text positioned to match inspiration */}
      <div className="flex-1 flex flex-col">
        <div className="writing-container w-full h-full mx-auto">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={HELP_TEXT}
            spellCheck="false"
            className={cn(
              "w-full h-full min-h-screen py-8 bg-transparent border-none outline-none resize-none",
              "transition-all duration-200",
              "placeholder:text-foreground/20",
              getFontClass(),
            )}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.6,
            }}
            autoFocus
          />
        </div>
      </div>

      {/* Bottom toolbar - only visible on mouse movement and not when typing */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 p-2 bg-background border-t border-border/10 flex justify-between items-center transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onMouseEnter={handleToolbarInteraction}
        onMouseMove={handleToolbarInteraction}
        onMouseDown={handleToolbarInteraction}
      >
        <div className="flex items-center gap-4">
          {/* Font size selector */}
          <div className="flex items-center">
            <button
              onClick={() => handleFontSizeChange(Math.max(12, fontSize - 2))}
              className="text-xs px-1 text-foreground/70 hover:text-foreground"
            >
              -
            </button>
            <span className="text-xs px-2 text-foreground/70">{fontSize}px</span>
            <button
              onClick={() => handleFontSizeChange(Math.min(36, fontSize + 2))}
              className="text-xs px-1 text-foreground/70 hover:text-foreground"
            >
              +
            </button>
          </div>

          {/* Font family selector */}
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="text-xs bg-transparent border-none outline-none text-foreground/70 hover:text-foreground"
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Mono</option>
          </select>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Download/Export Dropdown */}
          {text.trim().length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-foreground/70 hover:text-foreground flex items-center"
                  title="Export your writing"
                >
                  <Download className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={copyToClipboard} className="flex items-center">
                  {copySuccess ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copySuccess ? "Copied!" : "Copy to clipboard"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={downloadAsText} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Save as .txt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsMarkdown} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Save as .md
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsHTML} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Save as .html
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsRTF} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Save as .rtf
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Help Dialog */}
          <HelpDialog />
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div
            ref={timerRef}
            className={cn(
              "flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer",
              isTimerActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
            )}
            onClick={toggleTimer}
            title="Click to start/stop timer. Scroll to change duration."
          >
            <Timer className="h-3 w-3" />
            <span>{isTimerActive ? formatTime(timeRemaining) : `${timerMinutes}m`}</span>
          </div>

          {/* Fullscreen toggle */}
          <button onClick={toggleFullscreen} className="text-foreground/70 hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Reflect buttons - only show if there's text */}
          {text.trim().length >= 10 && (
            <div className="flex gap-2">
              {/* In-app reflection */}
              <button
                onClick={handleDiscuss}
                className="text-xs flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Bot className="h-3 w-3" />
                <span>Talk about it with your AI buddy</span>
              </button>

              {/* ChatGPT reflection */}
              <button
                onClick={handleChatGpt}
                className="text-xs flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                title="Reflect using ChatGPT"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Discuss with ChatGPT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
