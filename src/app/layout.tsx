import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"
import { Inter } from "next/font/google"

import { getSession } from "@/lib/prisma/user"
import { HeaderMegaMenu } from "@/components/global/navbar/HeaderMegaMenu"
import Navbar from "@/components/global/navbar/Navbar"
import { Providers } from "@/components/providers/"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <html lang="tr">
      <body
        className={
          `${
            process.env.DEVELOPMENT === "true" && "debug-screens"
          } min-h-screen w-full 
      
          ` + inter.className
        }
      >
        <Providers>
          <HeaderMegaMenu session={session} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
