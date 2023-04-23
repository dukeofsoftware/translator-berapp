
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  const { text, language } = await request.json()
  try {
    
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
