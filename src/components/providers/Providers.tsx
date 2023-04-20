"use client"

import { ToastContainer } from "react-toastify"

import Mantine from "./Mantine"
import QueryProvider from "./QueryProvider"
import { Analytics } from '@vercel/analytics/react'
  ;
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
