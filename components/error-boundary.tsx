"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-4 md:p-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl text-rose-800">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p className="mb-4">
                  We're sorry, but an error occurred while trying to display this page. Please try refreshing the page
                  or starting a new session.
                </p>
                {this.state.error && (
                  <div className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                    <p className="font-semibold">Error:</p>
                    <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    this.setState({ hasError: false, error: null, errorInfo: null })
                    window.location.href = "/"
                  }}
                  className="bg-rose-600 hover:bg-rose-700"
                >
                  Go to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    this.setState({ hasError: false, error: null, errorInfo: null })
                    window.location.reload()
                  }}
                >
                  Refresh Page
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
