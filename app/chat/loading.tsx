import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="flex space-x-4 justify-center items-center">
            <div className="h-3 w-3 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="h-3 w-3 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-3 w-3 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="mt-4 text-gray-600">Preparing your reflection...</p>
        </CardContent>
      </Card>
    </div>
  )
}
