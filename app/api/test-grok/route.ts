import { logger } from "@/lib/logger"

export async function GET() {
  try {
    // Check if we have a Grok API key
    const hasGrokKey = !!process.env.XAI_API_KEY

    logger.log("Testing Grok API key availability")

    // If we have a key, try to make a simple API call
    let apiTest = null
    if (hasGrokKey) {
      try {
        logger.log("Testing Grok API with a simple request")

        const response = await fetch("https://api.x.ai/v1/models", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          apiTest = {
            status: "success",
            models: data.data ? data.data.length : 0,
          }
          logger.log("Grok API test successful:", apiTest)
        } else {
          const errorText = await response.text()
          apiTest = {
            status: "error",
            statusCode: response.status,
            error: errorText,
          }
          logger.error("Grok API test failed:", apiTest)
        }
      } catch (error) {
        apiTest = {
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        }
        logger.error("Error testing Grok API:", error)
      }
    }

    // Return the result
    return new Response(
      JSON.stringify({
        hasGrokKey,
        message: hasGrokKey ? "Grok API key is available" : "Grok API key is not available",
        apiTest,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    logger.error("Error testing Grok API key:", error)

    return new Response(
      JSON.stringify({
        error: "Failed to test Grok API key",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
