import { compare, hash } from "bcrypt"

export async function hashPass(unHashPass: string) {
  return await hash(unHashPass, 10).then(function (hash: string) {
    return hash
  })
}
export async function isSamePass(unHashPass: string, hashPass: string) {
  return await compare(unHashPass, hashPass).then(function (result: boolean) {
    return result
  })
}
