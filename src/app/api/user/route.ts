import { NextResponse } from "next/server"

import { createUser, getAllUsers, getCurrentUser } from "@/lib/prisma/user"

export async function GET(request: Request) {
  const users = await getAllUsers()
  return NextResponse.json(users)
}
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      return Response.redirect(new URL("/dashboard", request.url))
    }

    const { username, email, password, name } = await request.json()
    if (!username || !email || !password || !name) {
      throw new Error("Lütfen tüm alanları doldurunuz.")
    }

    const user = await createUser(username, name, email, password)

    if (!user) {
      throw new Error("Kullanıcı oluşturulamadı.")
    }
    return NextResponse.json({ user })
  } catch (error: any) {
    throw new Error(error.message)
  }
}
