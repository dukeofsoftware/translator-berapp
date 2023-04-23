import { db } from "./db"

export const createContact = async (
  name: string,
  email: string,
  phoneNumber: string,
  subject: string,
  message: string
) => {
  const data = {
    name,
    email,
    phoneNumber,
    subject,
    message,
  }
  if (
    name.length <= 2 ||
    email.length <= 2 ||
    message.length < 6 ||
    !email ||
    !name ||
    !message ||
    !phoneNumber ||
    !subject
  ) {
    throw new Error(
      "Name, email, phone number, subject and message are required!"
    )
  }
  try {
    const email = await db.contact.create({
      data,
    })
    if (!email) {
      throw new Error("Something went wrong...")
    }
    return { email }
  } catch (error) {
    return error
  }
}

export const getAllContacts = async () => {
  try {
    const contacts = await db.contact.findMany()
    if (!contacts) {
      throw new Error("Something went wrong...")
    }
    return { contacts }
  } catch (error) {
    return error
  }
}
