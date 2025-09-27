import { logger } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json()

    if (!imageUrl || typeof imageUrl !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid request: imageUrl is required and must be a string",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    // Fetch the image from the OpenAI URL
    const response = await fetch(imageUrl)

    if (!response.ok) {
      logger.error("Failed to fetch image from OpenAI:", response.status)
      return new Response(
        JSON.stringify({
          error: `Failed to fetch image: ${response.status}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    // Get the image data
    const imageData = await response.arrayBuffer()

    // Return the image data
    return new Response(imageData, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    logger.error("Error downloading image:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to download image",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
