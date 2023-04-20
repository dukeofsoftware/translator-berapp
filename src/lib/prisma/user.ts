import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { hashPass } from "../crpyt"
import { db } from "./db"

export const createUser = async (
  username: string,
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashPass(password)
  const data = {
    username,
    name,
    email,
    password: hashedPassword,
  }
  if (
    name.length <= 2 ||
    email.length <= 2 ||
    password.length < 6 ||
    !email ||
    !name ||
    !password
  ) {
    throw new Error("İsim, şifre ve email zorunludur! ")
  }
  try {
    const user = await db.user.create({
      data,
    })
    if (!user) {
      throw new Error("Kullanıcı yok...")
    }
    return { user }
  } catch (error) {
    return error
  }
}

export const getUserById = async (id: string) => {
  if (!id) {
    throw new Error("id yok...")
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      throw new Error("Kullanıcı yok...")
    }
    return user
  } catch (error) {
    return error
  }
}

export const getUserByEmail = async (email: string) => {
  if (!email) {
    throw new Error("email yok...")
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error("Kullanıcı yok...")
    }
    return user as any
  } catch (error) {
    return error
  }
}

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    }
  } catch (error: any) {
    return null
  }
}
export async function getAllUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        username: true,

        createdAt: true,
        updatedAt: true,
      },
    })

    if (!users) {
      throw new Error("Kullanıcı yok...")
    }

    return users
  } catch (error) {
    return error
  }
}
