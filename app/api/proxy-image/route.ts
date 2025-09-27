import { logger } from "@/lib/logger"

export async function GET(req: Request) {
  try {
    // Get the URL from the query parameter
    const url = new URL(req.url)
    const imageUrl = url.searchParams.get("url")

    if (!imageUrl) {
      return new Response("Image URL is required", { status: 400 })
    }

    logger.log("Proxying image from:", imageUrl)

    // Fetch the image from the original URL
    const response = await fetch(imageUrl, {
      headers: {
        // Add a user agent to avoid being blocked
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      logger.error("Failed to fetch image:", response.status)
      return new Response("Failed to fetch image", { status: 500 })
    }

    // Get the image data
    const imageData = await response.arrayBuffer()

    // Return the image data
    return new Response(imageData, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    logger.error("Error proxying image:", error)
    return new Response("Failed to proxy image", { status: 500 })
  }
}
