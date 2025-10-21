import { NextResponse } from "next/server"

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.error("OPENAI_API_KEY not found in environment variables")
    return NextResponse.json(
      { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file" },
      { status: 500 }
    )
  }

  try {
    // Use the correct OpenAI Realtime API endpoint
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "shimmer",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenAI API error:", response.status, errorText)

      let errorMessage = "Failed to create session"
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error?.message || errorMessage
      } catch {
        errorMessage = errorText || errorMessage
      }

      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Session created successfully")
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating realtime session:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
