"use client"

import { useTheme } from "@/components/theme-context"
import { themes } from "@/lib/themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Paintbrush } from "lucide-react"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={theme.name === t.name ? "bg-accent" : ""}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full ${t.name === "white" ? "border border-gray-300" : ""}`}
                style={{
                  backgroundColor: t.name === "white" ? "#ffffff" : `hsl(${t.colors.primary})`,
                  border: t.name === "black" ? "1px solid hsl(0 0% 20%)" : "",
                }}
              />
              {t.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
