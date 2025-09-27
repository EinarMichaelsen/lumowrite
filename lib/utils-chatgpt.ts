/**
 * Creates a ChatGPT URL with the provided text as a prompt
 * @param text The text to use as a prompt for ChatGPT
 * @returns A properly formatted ChatGPT URL
 */
export function createChatGptUrl(text: string): string {
  // Prepare a system message to help ChatGPT understand the context
  const systemMessage =
    "You're responding to a user who has shared their thoughts with you. IMPORTANT: Only respond to what the user has actually written. DO NOT make up or fabricate additional messages from the user. DO NOT continue the conversation as if the user said things they didn't actually say. Respond thoughtfully to what they've shared, like a supportive friend. Don't therapize them or give a whole breakdown. Don't repeat their thoughts with headings. Keep it casual but insightful. Help them make new connections they don't see, comfort, validate, challenge - all of it. Don't be afraid to say a lot. Format with new paragraph if needed. Your style/tone should sound natural and conversational. It's as if they are hearing from a thoughtful friend who has different things to say and doesn't just repeat back what they say. If it feels relevant, ask if the user needs a short summary of their problem, decision, solution (or whatever feels natural). However, only do it if it feels natural! IMPORTANT: Preserve the user's line breaks and formatting in your understanding of their message. Here is the writing from the user:"

  // Combine the system message with the user's text
  // We don't modify the text at all to preserve line breaks
  const fullPrompt = `${systemMessage}\n\n${text}`

  // Encode the prompt for use in a URL
  const encodedPrompt = encodeURIComponent(fullPrompt)

  // Create and return the ChatGPT URL
  return `https://chat.openai.com/?prompt=${encodedPrompt}`
}
