"use client"

import { Avatar, Menu, Text } from "@mantine/core"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { AiOutlineLogin } from "react-icons/ai"

interface UserMenuProps {
  session: Session | null
}

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  return (
    <Menu
      shadow="md"
      width={200}
      trigger="hover"
      openDelay={100}
      closeDelay={250}
    >
      <Menu.Target>
        <button className="inline-flex items-center gap-2 px-2  dark:hover:bg-neutral-900/90 py-1 rounded-md hover:bg-neutral-200">
          <Avatar alt="Your avatar" src={session?.user.image} radius={"xl"} />
          <Text>{session?.user.name}</Text>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<AiOutlineLogin />} onClick={() => signOut()}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMenu
