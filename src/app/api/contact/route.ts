import { NextResponse } from "next/server"

import { createContact } from "@/lib/prisma/contact"

export async function POST(request: Request) {
  try {
    const { name, email, subject, phoneNumber, message } = await request.json()

    if (!name || !email || !subject || !phoneNumber || !message) {
      throw new Error("Lütfen tüm alanları doldurunuz.")
    }

    const contactMail = await createContact(
      name,
      email,
      phoneNumber,
      subject,
      message
    )

    if (!contactMail) {
      throw new Error("Email cannot be sent.")
    }
    return NextResponse.json({ contactMail })
  } catch (error: any) {
    throw new Error(error)
  }
}
