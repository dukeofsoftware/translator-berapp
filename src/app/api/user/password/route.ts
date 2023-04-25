import { NextResponse } from "next/server"

import { hashPass, isSamePass } from "@/lib/crpyt"
import { db } from "@/lib/prisma/db"
import { getCurrentUser } from "@/lib/prisma/user"

export async function PATCH(request: Request) {
  console.log("istek geldi")
  const { currentPassword, newPassword } = await request.json()
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      {
        error: {
          message: "Lütfen giriş yapınız.",
        },
      },
      { status: 400 }
    )
  }
  if (!currentPassword || !newPassword) {
    NextResponse.json(
      {
        error: {
          message: "Lütfen tüm alanları doldurunuz.",
        },
      },
      { status: 400 }
    )
  }
  const getPassword = await db.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      password: true,
    },
  })
  if (currentPassword === newPassword) {
    return NextResponse.json(
      { error: "Passwords are matches." },
      { status: 400 }
    )
  }
  if (!getPassword) {
    return NextResponse.json(
      {
        error: {
          message: "Password is not correct.",
        },
      },
      { status: 400 }
    )
  }
  const isSame = await isSamePass(currentPassword, getPassword.password!)

  if (!isSame) {
    return NextResponse.json(
      {
        error: {
          message: "Password is not correct.",
        },
      },
      { status: 400 }
    )
  }

  try {
    const newHashedPassword = await hashPass(newPassword)
    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: newHashedPassword,
      },
    })
    if (!user) {
      return NextResponse.json(
        {
          error: {
            message: "Password is not updated.",
          },
        },
        { status: 400 }
      )
    }
    console.log("user", user)
    return NextResponse.json(
      {
        message: {
          message: "Password is updated.",
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
