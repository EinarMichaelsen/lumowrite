"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-8 text-foreground/70">We're sorry, but an error occurred while trying to display this page.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Link href="https://justwritestuff.vercel.app/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
