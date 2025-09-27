export async function GET() {
  try {
    // Basic environment information
    const envInfo = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
    }

    // Return a simple JSON response
    return new Response(
      JSON.stringify({
        message: "Debug API route",
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
    // Even on error, return valid JSON
    return new Response(
      JSON.stringify({
        error: "Debug route error",
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
