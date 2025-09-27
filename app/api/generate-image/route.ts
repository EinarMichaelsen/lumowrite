import { logger } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    logger.log("Generate image API called")

    // Parse request body
    let quote
    try {
      const body = await req.json()
      quote = body.quote
      logger.log("Request body parsed successfully:", { quote })
    } catch (parseError) {
      logger.error("Failed to parse request body:", parseError)
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    if (!quote || typeof quote !== "string") {
      logger.error("Invalid quote in request:", { quote })
      return new Response(
        JSON.stringify({
          error: "Invalid request: quote is required and must be a string",
          receivedValue: typeof quote,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    // Check if we have a Grok API key
    if (!process.env.XAI_API_KEY) {
      logger.error("No Grok (XAI) API key found")
      return new Response(
        JSON.stringify({
          error: "Grok API key not available",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    logger.log("Grok API key found, preparing to generate image")

    // Create the prompt for image generation
    const prompt = `A clean white background poster with bold black sans-serif text centered in the middle. At the top center, small text reads 'LUMOWRITE' in bold, and underneath it in lighter font: 'write for clarity'. In the center of the image is the main quote in lowercase, bold and large, split over two or three lines depending on length. At the bottom center, small grey text reads 'TRY NOW ON' and below it 'WWW.LUMOWRITE.COM'. The overall style is minimalist, modern, and distraction-free. The main quote is: '${quote}'`

    logger.log("Sending request to Grok API")

    try {
      // Direct API call to Grok - WITHOUT the size parameter
      const response = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "grok-2-image",
          prompt,
          n: 1,
          // Removed the size parameter as it's not supported
        }),
      })

      logger.log("Grok API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        logger.error(`Grok API error (${response.status}):`, errorText)
        throw new Error(`Grok API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      logger.log("Grok API response:", data)

      // Extract the image URL from the response
      if (data.data && data.data.length > 0 && data.data[0].url) {
        const imageUrl = data.data[0].url
        logger.log("Image URL received from Grok:", imageUrl)

        // Return the image URL
        return new Response(
          JSON.stringify({
            imageUrl,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        )
      } else {
        logger.error("Unexpected Grok API response format:", data)
        throw new Error("Unexpected Grok API response format")
      }
    } catch (grokError) {
      logger.error("Error calling Grok API:", grokError)

      // Return a placeholder image URL as fallback
      return new Response(
        JSON.stringify({
          imageUrl: `/placeholder.svg?height=1024&width=1024&query=${encodeURIComponent(quote)}`,
          isPlaceholder: true,
          error: grokError instanceof Error ? grokError.message : "Unknown error",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    }
  } catch (error) {
    logger.error("Unhandled error in generate-image API:", error)
    return new Response(
      JSON.stringify({
        error: "Unhandled server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
