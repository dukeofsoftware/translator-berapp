import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  const options = {
    method: "GET",
    url: "https://text-translator2.p.rapidapi.com/getLanguages",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  }

  const axiosResponse = await axios
    .request(options)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
    })
  return NextResponse.json(axiosResponse.data)
}

export async function POST(request: Request) {
  const { text, languageFrom, languageTo } = await request.json()

  const encodedParams = new URLSearchParams()
  encodedParams.append("source_language", languageFrom)
  encodedParams.append("target_language", languageTo)
  encodedParams.append("text", text)

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key":process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  }

  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
    })
  return NextResponse.json(response)
}
