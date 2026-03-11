import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

interface User {
  id: string
  email: string
  name?: string
}

// In a real app, this would come from a database
export const users: Record<string, { id: string; email: string; name: string; password: string }> = {
  "demo@example.com": {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    password: "$2a$10$K4pxZKr3HlWJ2YdGwbGEFOFCXrm9lHqJ6m3tKV.Zm8vZ0C3T8kUj.", // hashed "demo123"
  },
}
const authOptions = {
  // NextAuth expects a top-level `secret` in production
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = users[credentials.email]

        if (!user) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

// helper for server components to get the current session
export async function auth() {
  const { getServerSession } = await import("next-auth/next")
  return getServerSession(authOptions)
}

export { authOptions }
export { handler as GET, handler as POST }
