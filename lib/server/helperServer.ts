import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import db from "./prismadb";
import { verifyToken } from "../utils/jwt";
import type { Admin } from '@prisma/client'

// function exclude<Admin, Key extends keyof Admin>(
//   user: Admin,
//   keys: Key[]
// ): Omit<Admin, Key> {
//   for (let key of keys) {
//     delete user[key]
//   }
//   return user
// }

function exclude(user: any, ...keys: any) {
  if (user == null) return null

  for (let key of keys) {
    delete user[key]
  }
  return user
}

export type UserAdminType = Omit<Admin, 'password'> | null

export const useCurrentUserAdmin = async (request?: NextRequest) => {
  let cookie = null

  if (request) {
    cookie = request.headers.get('authorization')?.split(' ')[1] || request.cookies.get('token-admin')?.value
  }
  else {
    cookie = cookies().get('token-admin')?.value
  }

  let adminId = null

  if (cookie) {
    let temp = await verifyToken(cookie)
    if (temp?.payload.sub) {
      adminId = temp.payload.sub
    }
  }

  if (!adminId) {
    return null
  }

  const user = await db.admin.findUnique({
    where: {
      id: +adminId
    }
  })

  const userWithoutPassword: UserAdminType = exclude(user, ['password'])

  return userWithoutPassword
}

// export