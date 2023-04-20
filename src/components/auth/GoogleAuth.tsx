import { Text } from "@mantine/core"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

interface GoogleAuthProps {
  isLoading?: boolean
  children: React.ReactNode
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ isLoading, children }) => {
  return (
    <button
      className="inline-flex w-full items-center justify-center  rounded-md border border-neutral-500 p-3 ring-offset-2 hover:ring-1   disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-500 disabled:text-neutral-100   "
      onClick={() => signIn("google")}
      disabled={isLoading}
    >
      <div>asdbuıbadb</div>
      <FcGoogle className="h-8 w-8" />
      <Text fz="md" fw={700}>
        {children}
      </Text>
    </button>
  )
}

export default GoogleAuth
