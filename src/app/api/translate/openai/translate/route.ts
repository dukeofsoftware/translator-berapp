import { NextResponse } from "next/server"

import { openai } from "@/lib/openai"

export async function POST(request: Request) {
  const { prompt, language } = await request.json()
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that translates languages.",
        },
        {
          role: "user",
          content: `Translate the following text to ${language}: ${prompt}}`,
        },
      ],
    })
    console.log(response)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json({ error: error })
  }
}
