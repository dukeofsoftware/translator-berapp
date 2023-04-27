
import { HomePage } from "@/components/pages"
import { getSession } from "next-auth/react"


const page =async () => {

  const session = await getSession()
  return <HomePage session={session}/>
}

export default page
