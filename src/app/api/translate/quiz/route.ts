import { NextResponse } from "next/server"
import a1EnglishQuiz from "@/data/english/englishA1.json"
import a2EnglishQuiz from "@/data/english/englishA2.json"
import b1EnglishQuiz from "@/data/english/englishB1.json"
import b2EnglishQuiz from "@/data/english/englishB2.json"
import c1EnglishQuiz from "@/data/english/englishC1.json"
import a1GermanQuiz from "@/data/german/germanA1.json"
import a2GermanQuiz from "@/data/german/germanA2.json"
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get("level")
  const language = searchParams.get("language")
  if(language?.toLocaleLowerCase() === "english") {
    switch 
    (level?.toUpperCase()) {
      case "A1" :
        return NextResponse.json(a1EnglishQuiz)
      case "A2":
        return NextResponse.json(a2EnglishQuiz)
      case "B1":
        return NextResponse.json(b1EnglishQuiz)
      case "B2":
        return NextResponse.json(b2EnglishQuiz)
      case "C1":
        return NextResponse.json(c1EnglishQuiz)
      default:
        return NextResponse.json("No level selected")
  
    }
  }
  if(language?.toLocaleLowerCase()==="german"){
    switch 
    (level?.toUpperCase()) {
      case "A1" :
        return NextResponse.json(a1GermanQuiz)
      case "A2":
        return NextResponse.json(a2GermanQuiz)
      default:
        return NextResponse.json("No level selected")
  
    }
  }
}
