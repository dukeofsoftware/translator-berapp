import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/lib/prisma/db"
import { isSamePass } from "./crpyt"
import { getUserByEmail } from "./prisma/user"

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET")
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await getUserByEmail(email)
        if (!user) {
          throw new Error("User not found")
        }

        const isValid = await isSamePass(password, user.password)
        if (!isValid) {
          throw new Error("Invalid password")
        }
        if (user) {
          return user as any
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
