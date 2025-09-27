import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { logger } from "@/lib/logger"
import { z } from "zod" // We'll need to add zod to your dependencies

// Input validation schema
const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(10000), // Limit message size
})

const requestSchema = z.object({
  messages: z.array(messageSchema).max(100), // Limit number of messages
  intention: z.enum(["vent", "reflect", "solve", "decide", "think"]),
})

// Rate limiting
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_MINUTE = 10
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export async function POST(req: Request) {
  logger.log("API route called")

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          content: "You've made too many requests. Please try again later.",
          error: "Rate limit exceeded",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Parse the request body
    const body = await req.json()

    // Validate input
    try {
      requestSchema.parse(body)
    } catch (validationError) {
      logger.error("Input validation error:", validationError)
      return new Response(
        JSON.stringify({
          content: "Invalid request format.",
          error: "Validation error",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const { messages, intention } = body
    logger.log("Messages count:", messages?.length || 0)
    logger.log("Intention:", intention)

    // Get the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

    // Check if we have an API key
    if (!process.env.OPENAI_API_KEY) {
      logger.log("No OpenAI API key found")
      return new Response(
        JSON.stringify({
          content: "I'm unable to process your message right now. Please check your API configuration.",
          error: "OpenAI API key not available",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    try {
      logger.log("Attempting to use AI SDK with OpenAI")

      // Get the system prompt based on intention
      const systemPrompt = getSystemPrompt(intention, messages.length > 2)

      // Format the prompt for the AI SDK - preserving line breaks
      const prompt = formatPrompt(messages, systemPrompt)

      logger.log("Calling OpenAI API via AI SDK")

      // Use the AI SDK to generate text
      const result = await generateText({
        model: openai("gpt-4.1-mini"), // Upgraded to gpt-4.1-mini for speed, cost and intelligence
        prompt: prompt,
      })

      logger.log("OpenAI API call completed successfully")

      // Return the OpenAI response
      return new Response(
        JSON.stringify({
          content: result.text,
          source: "openai",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    } catch (openaiError) {
      logger.error("OpenAI API error:", openaiError)

      // Get error details
      const errorMessage = openaiError.message || "Unknown OpenAI error"
      logger.log("Error details:", errorMessage)

      return new Response(
        JSON.stringify({
          content: "I'm having trouble processing your message right now. Please try again later.",
          error: `OpenAI API error: ${errorMessage}`,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }
  } catch (error) {
    logger.error("General API route error:", error)

    // Always return a valid JSON response, even on error
    return new Response(
      JSON.stringify({
        content: "I'm having trouble processing your message right now. Could you try again?",
        error: "Internal server error",
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

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_DURATION }

  // Reset count if the time has expired
  if (now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_DURATION })
    return true
  }

  // Increment count
  record.count += 1
  requestCounts.set(ip, record)

  // Check if over limit
  return record.count <= MAX_REQUESTS_PER_MINUTE
}

// Format the prompt for the AI SDK - modified to preserve line breaks
function formatPrompt(messages: any[], systemPrompt: string): string {
  let prompt = `${systemPrompt}\n\n`

  // Add conversation history, preserving line breaks
  for (const message of messages) {
    const role = message.role === "user" ? "User" : "Assistant"
    // Use the content directly without modifying it to preserve line breaks
    prompt += `${role}: ${message.content}\n\n`
  }

  // Add final prompt for assistant to respond
  prompt += "Assistant:"

  return prompt
}

function getSystemPrompt(intention: string, isFollowUp: boolean): string {
  const basePrompt = `You're responding to a user who has shared their thoughts with you. 
  
IMPORTANT: Only respond to what the user has actually written. DO NOT make up or fabricate additional messages from the user. DO NOT continue the conversation as if the user said things they didn't actually say.

Respond thoughtfully to what they've shared, like a supportive friend. Don't therapize them or give a whole breakdown. Don't repeat their thoughts with headings. Keep it casual but insightful.

Help them make new connections they don't see, comfort, validate, challenge - all of it. Don't be afraid to say a lot. Format with new paragraph if needed.

Your style/tone should sound natural and conversational. It's as if they are hearing from a thoughtful friend who has different things to say and doesn't just repeat back what they say. If it feels relevant, ask if the user needs a short summary of their problem, decision, solution (or whatever feels natural). However, only do it if it feels natural!

IMPORTANT: Preserve the user's line breaks and formatting in your understanding of their message. If they've organized their thoughts with line breaks, respect that structure.

${isFollowUp ? "For follow-up messages, continue the conversation naturally without any standard greeting. Adapt your tone to match the user's tone and energy level." : ""}`

  const intentionSpecificPrompts: Record<string, string> = {
    vent: `${basePrompt}

For venting, be especially empathetic. Let them get it all out. Validate their feelings without judgment. Don't rush to solutions unless they specifically ask. Sometimes people just need to be heard.`,

    reflect: `${basePrompt}

For reflection, help them see patterns or themes they might have missed. Gently point out contradictions or blind spots if you notice any. Ask thoughtful questions that might lead to deeper insights.`,

    solve: `${basePrompt}

For problem-solving, help them break down the issue without being too clinical. Suggest approaches they might not have considered. Be practical but encouraging. Remind them of their strengths that could help solve this.`,

    decide: `${basePrompt}

For decision-making, help them weigh options in a balanced way. Don't make the decision for them, but help them clarify what matters most to them. Point out factors they might be overlooking.`,

    think: `${basePrompt}

For thinking aloud, follow their train of thought and help them develop it further. Make connections between different ideas they've shared. Be curious and open to wherever their thoughts lead.`,
  }

  return intentionSpecificPrompts[intention] || basePrompt
}
