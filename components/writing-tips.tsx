"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function WritingTips() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-xs bg-background border border-border p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">Freewriting Tips</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsVisible(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ul className="text-xs space-y-2 text-foreground/80">
        <li>• Write continuously without stopping</li>
        <li>• Don't worry about grammar or spelling</li>
        <li>• Let your thoughts flow naturally</li>
        <li>• Don't judge or edit as you write</li>
        <li>• UI elements will hide as you write</li>
      </ul>
    </div>
  )
}
