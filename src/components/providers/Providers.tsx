"use client"

import { Analytics } from "@vercel/analytics/react"
import { ToastContainer } from "react-toastify"

import Mantine from "./Mantine"
import QueryProvider from "./QueryProvider"
interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Mantine>
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
      </Mantine>
      <Analytics />
    </>
  )
}

export default Providers
