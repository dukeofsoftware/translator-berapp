"use client"

import dynamic from "next/dynamic"

import { HeroSection } from "./HeroSection"

const FeaturesSection = dynamic(() => import("./FeaturesSection"))
const AskedQuestions = dynamic(() => import("./AskedQuestions"))

const HomePage = () => {
  return (
    <div>
      <AskedQuestions />
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default HomePage
