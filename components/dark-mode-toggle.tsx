"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-context"

export function DarkModeToggle() {
  const { toggleDarkMode, isDark } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-foreground/70 hover:text-foreground"
      onClick={toggleDarkMode}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  )
}
