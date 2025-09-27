export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex space-x-4 justify-center items-center">
        <div className="h-3 w-3 bg-primary/30 rounded-full animate-bounce"></div>
        <div className="h-3 w-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="h-3 w-3 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  )
}
