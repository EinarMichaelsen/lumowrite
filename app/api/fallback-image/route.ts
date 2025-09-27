import { createCanvas } from "canvas"
import { logger } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    const { quote } = await req.json()

    if (!quote || typeof quote !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid request: quote is required and must be a string",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    logger.log("Generating fallback image for quote:", quote)

    // Create canvas
    const width = 1024
    const height = 1024
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")

    // Fill background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Set font styles
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw LUMOWRITE header
    ctx.fillStyle = "#000000"
    ctx.font = "bold 24px Arial"
    ctx.fillText("LUMOWRITE", width / 2, 80)

    // Draw subtitle
    ctx.fillStyle = "#666666"
    ctx.font = "18px Arial"
    ctx.fillText("write for clarity", width / 2, 110)

    // Draw the quote
    ctx.fillStyle = "#000000"
    ctx.font = "bold 36px Arial"

    // Word wrap the quote
    const words = quote.split(" ")
    const lines = []
    let currentLine = ""

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)

      if (metrics.width > width * 0.8 && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    // Draw each line of the quote
    const lineHeight = 48
    const totalTextHeight = lines.length * lineHeight
    let y = (height - totalTextHeight) / 2

    for (const line of lines) {
      ctx.fillText(line, width / 2, y)
      y += lineHeight
    }

    // Draw footer
    ctx.fillStyle = "#999999"
    ctx.font = "16px Arial"
    ctx.fillText("TRY NOW ON", width / 2, height - 80)
    ctx.fillStyle = "#666666"
    ctx.font = "bold 18px Arial"
    ctx.fillText("WWW.LUMOWRITE.COM", width / 2, height - 50)

    // Convert canvas to buffer
    const buffer = canvas.toBuffer("image/png")

    // Return the image
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    logger.error("Error generating fallback image:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate fallback image",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
