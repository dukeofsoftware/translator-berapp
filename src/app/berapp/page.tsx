
import { HomePage } from "@/components/pages"
import { getSession } from "@/lib/prisma/user"

const page =async () => {

  const session = await getSession()
  return <HomePage session={session}/>
}

export default page
