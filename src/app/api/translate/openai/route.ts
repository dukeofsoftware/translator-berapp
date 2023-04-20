import { NextResponse } from "next/server"

import { openai } from "@/lib/openai"

export async function POST(request: Request) {
  const { prompt, language } = await request.json()
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate this into ${language}:\n\n${prompt}\n\n1.`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    return NextResponse.json(response.data)
  } catch (error) {
    // @ts-ignore
    return NextResponse.json({ error: error.message })
  }
}
