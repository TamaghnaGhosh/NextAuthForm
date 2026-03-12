import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

/**
 * Extend NextAuth Session type
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    email: string
    name?: string
  }
}

/**
 * Extend JWT type
 */
declare module "next-auth/jwt" {
  interface typeJWT extends DefaultJWT {
    id: string
    email: string
    name?: string
  }
}