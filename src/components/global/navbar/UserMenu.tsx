"use client"

import { Avatar, Button, Menu, Text } from "@mantine/core"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { AiFillHeart, AiOutlineLogin } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import { FaHistory } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

interface UserMenuProps {
  session: Session | null
}
interface MenuItem {
  icon: JSX.Element
  label: string
  href?: string
  action?: () => void
}
const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  const menuItems = [
    {
      icon: <IoMdSettings />,
      label: "Settings",
      href: "/berapp/settings",
    },
    {
      icon: <AiFillHeart />,
      label: "Favorites",
      href: "/berapp/favorites",
    },

    {
      icon: <FaHistory />,
      label: "History",
      href: "/berapp/history",
    },
    {
      icon: <AiOutlineLogin />,
      label: "Logout",
      action: () => signOut(),
    },
  ]
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
        {menuItems.map((item: MenuItem, index) => (
          <>
            {item.action ? (
              <Menu.Item
                key={`${item.label}-${index}`}
                icon={item.icon}
                onClick={item.action}
              >
                {item.label}
              </Menu.Item>
            ) : (
              <Menu.Item key={`${item.label}-${index}`} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )}
          </>
        ))}

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" icon={<BsFillTrash3Fill size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMenu
