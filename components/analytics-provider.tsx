"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { track } from "@vercel/analytics"

export function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      track("page_view", {
        page: pathname,
      })
    }
  }, [pathname])

  return null
}
