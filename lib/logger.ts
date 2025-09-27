/**
 * Safe logger that only logs in development environment
 * Prevents sensitive information from being logged in production
 */
export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(...args)
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(...args)
    } else {
      // In production, log errors without sensitive details
      console.error("An error occurred. Check server logs for details.")
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(...args)
    }
  },
  info: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.info(...args)
    }
  },
}
