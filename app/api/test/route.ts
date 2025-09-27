export async function GET() {
  try {
    // Collect basic environment information without exposing sensitive data
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      timestamp: new Date().toISOString(),
    }

    console.log("Environment information:", envInfo)

    // Always return valid JSON
    return new Response(
      JSON.stringify({
        message: "API test route",
        environment: envInfo,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error in test route:", error)

    // Even on error, return valid JSON
    return new Response(
      JSON.stringify({
        error: "Test route error",
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
