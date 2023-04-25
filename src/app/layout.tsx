import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"
import { Inter } from "next/font/google"

import { getSession } from "@/lib/prisma/user"
import { Footer } from "@/components/global/footer"
import { HeaderMegaMenu } from "@/components/global/navbar/HeaderMegaMenu"
import { Providers } from "@/components/providers/"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "AI Translation Assistant",
    template: "%s | AI Translation Assistant",
  },
  description:
    "AI Translation Assistant is an application that enables users to easily translate and learn languages. With its AI-powered translation engine, it provides users with quick and accurate translations. Additionally, it automatically detects and corrects grammar errors.",
  keywords: [
    "Translator",
    "AI Translation Assistant",
    " AI Translation",
    "Translation",
    "AI",
    "English",
    "Spanish",
    "German",
    "French",
    "Italian",
    "Russian",
    "Turkish",
    "Chinese",
    "Japanese",
    "Korean",
    "education",
  ],
}
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
          } min-h-screen h-full w-full 
          antialiased
          ` + inter.className
        }
      >
        <Providers>
          <HeaderMegaMenu session={session} />
          <div className="min-h-screen h-full w-full ">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
