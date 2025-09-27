"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type Theme, themes, getTheme } from "@/lib/themes"
import { trackThemeChanged } from "@/lib/analytics"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: Theme
  setTheme: (name: string) => void
  toggleDarkMode: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>("light")
  const [theme, setThemeObj] = useState<Theme>(themes[0])
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("yap-theme")
    if (savedTheme) {
      setThemeName(savedTheme)
      setThemeObj(getTheme(savedTheme))
    }
  }, [])

  // Apply theme CSS variables
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // Apply theme colors to CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Apply border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })

    // Save theme preference to localStorage
    localStorage.setItem("yap-theme", theme.name)
  }, [theme, mounted])

  // Set theme by name
  const setTheme = (name: string) => {
    const newTheme = getTheme(name)
    setThemeName(name)
    setThemeObj(newTheme)

    // Track theme change
    if (mounted) {
      trackThemeChanged(name)
    }
  }

  // Toggle between light and dark
  const toggleDarkMode = () => {
    const newTheme = themeName === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  // Determine if dark mode is active
  const isDark = themeName === "dark"

  return <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDark }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
