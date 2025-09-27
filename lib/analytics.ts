import { track } from "@vercel/analytics"

// Track writing started
export function trackWritingStarted() {
  track("writing_started")
}

// Track writing completed with character count
export function trackWritingCompleted(characterCount: number) {
  track("writing_completed", {
    characterCount,
  })
}

// Track reflection started
export function trackReflectionStarted(method: "chatgpt") {
  track("reflection_started", {
    method,
  })
}

// Track theme changed
export function trackThemeChanged(theme: string) {
  track("theme_changed", {
    theme,
  })
}

// Track timer started
export function trackTimerStarted(minutes: number) {
  track("timer_started", {
    minutes,
  })
}

// Track timer completed
export function trackTimerCompleted() {
  track("timer_completed")
}

// Track font changed
export function trackFontChanged(font: string, size: number) {
  track("font_changed", {
    font,
    size,
  })
}

// Track export - keeping the original function name for compatibility
export function trackExport() {
  track("export")
}

// Track new session
export function trackNewSession() {
  track("new_session")
}
