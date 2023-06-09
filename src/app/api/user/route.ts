import { NextResponse } from "next/server"

import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
} from "@/lib/prisma/user"


export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      return Response.redirect(new URL("/berapp", request.url))
    }

    const {  email, password, name } = await request.json()
    if ( !email || !password || !name) {
      throw new Error("Lütfen tüm alanları doldurunuz.")
    }

    const user = await createUser( name, email, password)

    if (!user) {
      throw new Error("Kullanıcı oluşturulamadı.")
    }
    return NextResponse.json({ user })
  } catch (error: any) {
    throw new Error(error)
  }
}
export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json()
    if (!id) {
      throw new Error("Lütfen tüm alanları doldurunuz.")
    }

    const user = await deleteUser(id, password)

    if (!user) {
      throw new Error("Kullanıcı silinemedi.")
    }
    return NextResponse.json({ user })
  } catch (error: any) {
    throw new Error(error.message)
  }
}
