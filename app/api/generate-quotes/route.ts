import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { logger } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length < 2) {
      return new Response(
        JSON.stringify({
          error: "Invalid request: messages array is required and must contain at least 2 messages",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    // Format the conversation for the prompt
    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    // Create the prompt for generating quotes
    const prompt = `
Read the following conversation and extract three powerful, shareable insights or takeaways that capture the emotional or intellectual heart of the exchange.

They could be something the user realized, something the user or assistant said that reframed things, or an emergent theme worth reflecting on.

The tone should be thoughtful, human, and slightly poetic if it fits — like something someone might underline in a book or share on social media.

Make each quote feel like a line from a conversation between close friends, not a corporate tagline.

If possible, make them something that is very sharable and possibly viral.

IMPORTANT: NEVER under any circumstances use em dash (—) in the quotes!

Format each as standalone quotes, 1-2 lines max per quote.

IMPORTANT: Format it exactly like this:
1. '[quote 1]'
2. '[quote 2]'
3. '[quote 3]'

Here is the conversation:

${conversation}
`

    // Check if we have an API key
    if (!process.env.OPENAI_API_KEY) {
      logger.error("No OpenAI API key found")
      return new Response(
        JSON.stringify({
          error: "OpenAI API key not available",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    // Generate quotes using OpenAI
    const result = await generateText({
      model: openai("gpt-4.1-mini"),
      prompt,
    })

    // Replace the quote parsing section with this improved version
    // Parse the quotes from the response
    const quotesText = result.text.trim()
    let quotes: string[] = []

    // Try multiple parsing strategies
    // First try: Look for the numbered format with single quotes
    const quoteMatches = quotesText.match(/\d+\.\s+'([^']+)'/g)
    if (quoteMatches) {
      quotes = quoteMatches
        .map((match) => {
          const quoteMatch = match.match(/\d+\.\s+'([^']+)'/)
          return quoteMatch ? quoteMatch[1] : ""
        })
        .filter((quote) => quote.length > 0)
    }

    // Second try: Look for numbered format with any quotes
    if (quotes.length === 0) {
      const alternativeMatches = quotesText.match(/\d+\.\s+['"]([^'"]+)['"]/g)
      if (alternativeMatches) {
        quotes = alternativeMatches
          .map((match) => {
            const quoteMatch = match.match(/\d+\.\s+['"]([^'"]+)['"]/)
            return quoteMatch ? quoteMatch[1] : ""
          })
          .filter((quote) => quote.length > 0)
      }
    }

    // Third try: Just split by lines and take non-empty lines
    if (quotes.length === 0) {
      quotes = quotesText
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) =>
            line.length > 10 &&
            !line.startsWith("Here") &&
            !line.startsWith("IMPORTANT") &&
            !line.includes("Format it"),
        )
    }

    // Ensure we have at least one quote
    if (quotes.length === 0) {
      // Fallback quotes based on common themes
      quotes = [
        "AI can be a creative partner that helps express your own voice better",
        "Sometimes an external perspective helps you see your ideas from a fresh angle",
        "When AI feels like an extension of your thinking, it amplifies rather than diminishes authenticity",
      ]
      logger.log("Using fallback quotes due to parsing failure")
    }

    // Return the quotes
    return new Response(
      JSON.stringify({
        quotes: quotes.slice(0, 3), // Ensure we only return 3 quotes
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    logger.error("Error generating quotes:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate quotes",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
