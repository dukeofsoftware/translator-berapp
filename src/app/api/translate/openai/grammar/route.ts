import { NextResponse } from "next/server"

import { openai } from "@/lib/openai"

export async function POST(request: Request) {
  const { prompt, language } = await request.json()
  if (!prompt || !language) throw new Error("Lütfen tüm alanları doldurunuz.")
  if (prompt < 3 || prompt > 100)
    throw new Error("Lütfen 3 ile 100 karakter arasında bir metin giriniz.")
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that correct gramatical errors in ${language}.`,
        },
        {
          role: "user",
          content: `Correct grammar  the following text to ${language}: ${prompt}}`,
        },
      ],
    })
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
