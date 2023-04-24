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
          content: "Helpful assistant translates languages.",
        },
        {
          role: "user",
          content: `Language ${language} prompt: ${prompt}}`,
        },
      ],
    })
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({  error },{
      status:400
    })
  }
}
