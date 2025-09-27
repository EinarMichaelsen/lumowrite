import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET() {
  try {
    console.log("OpenAI test route called")

    // Detailed environment information without exposing sensitive data
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      timestamp: new Date().toISOString(),
    }

    console.log("Environment information:", envInfo)

    // Try to use the AI SDK
    let openaiStatus = "not_initialized"
    let openaiError = null
    let openaiTest = null

    try {
      if (process.env.OPENAI_API_KEY) {
        console.log("Testing OpenAI API via AI SDK")

        const result = await generateText({
          model: openai("gpt-4.1-mini"),
          prompt: "Hello, this is a test. Please respond with a short greeting.",
        })

        console.log("OpenAI API test successful")
        openaiStatus = "working"
        openaiTest = {
          text: result.text,
        }
      } else {
        console.log("No OpenAI API key found")
        openaiStatus = "no_api_key"
      }
    } catch (error) {
      console.error("Error testing OpenAI:", error)
      openaiStatus = "error"
      openaiError = error.message || "Unknown error"
    }

    // Return detailed information
    return new Response(
      JSON.stringify({
        message: "OpenAI test route",
        environment: envInfo,
        openai: {
          status: openaiStatus,
          error: openaiError,
          test: openaiTest,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error in OpenAI test route:", error)

    // Even on error, return valid JSON
    return new Response(
      JSON.stringify({
        error: "OpenAI test route error",
        message: error.message || "Unknown error",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
