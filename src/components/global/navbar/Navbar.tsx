"use client"

import Link from "next/link"
import { Button, Container } from "@mantine/core"
import { Session } from "next-auth"

import UserMenu from "./UserMenu"
import { ThemeToggle } from "./theme-toggle"

interface NavbarProps {
  session: Session | null
}
const Navbar: React.FC<NavbarProps> = ({ session }) => {
  return (
    <Container>
      <header className="flex justify-between items-center">
        <div className="text-lg font-extrabold dark:text-neutral-100 text-neutral-800">
          Translator
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <UserMenu session={session} />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline" color="gray">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="light">Sign Up</Button>
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </header>
    </Container>
  )
}

export default Navbar
