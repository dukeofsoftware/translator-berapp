"use client"

import dynamic from "next/dynamic"

import { HeroSection } from "./HeroSection"
import { Session } from "next-auth"

const FeaturesSection = dynamic(() => import("./FeaturesSection"))
const AskedQuestions = dynamic(() => import("./AskedQuestions"))
interface HomePageProps {
  session?:Session  | null
}


const HomePage:React.FC<HomePageProps>= ({session}) => {
  return (
    <div>
      <HeroSection session={session} />
      <FeaturesSection />
      <AskedQuestions />
    </div>
  )
}

export default HomePage
