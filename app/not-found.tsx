import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="mb-8 text-foreground/70">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="https://justwritestuff.vercel.app/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
