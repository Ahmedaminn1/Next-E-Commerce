// eslint-disable-next-line
import NextAuth from "next-auth"
// eslint-disable-next-line
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string,
    user: UserDataI,
    token: string
  }

  interface UserDataI {
    name: string,
    email: string,
    role: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: UserDataI
    idToken?: string
    id?: string
  }
}