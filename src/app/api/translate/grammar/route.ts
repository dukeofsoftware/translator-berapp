import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  const options = {
    method: "GET",
    url: "https://dnaber-languagetool.p.rapidapi.com/v2/languages",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "dnaber-languagetool.p.rapidapi.com",
    },
  }
  try {
    const response = await axios
      .request(options)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json({ error: error })
  }
}

export async function POST(request: Request) {
  const { lang, text } = await request.json()
  const encodedParams = new URLSearchParams()
  encodedParams.set("language", lang)
  encodedParams.set("text", text)

  const options = {
    method: "POST",
    url: "https://dnaber-languagetool.p.rapidapi.com/v2/check",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "dnaber-languagetool.p.rapidapi.com",
    },
    data: encodedParams,
  }

  try {
    const response = await axios
      .request(options)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
        return NextResponse.json(err, {
          status: 400,
        })
      })
    return NextResponse.json(response, {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    })
  }
}
