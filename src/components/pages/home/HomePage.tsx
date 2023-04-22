"use client"
import dynamic from "next/dynamic"
const FeaturesSection = dynamic(() => import("./FeaturesSection"))

import {HeroSection} from "./HeroSection"
const HomePage = () => {
  return (
    <div>
        <HeroSection/>
        <FeaturesSection/>
    </div>
  )
}

export default HomePage