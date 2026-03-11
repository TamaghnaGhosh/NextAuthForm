import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { z } from "zod"
import { users } from '@/app/api/auth/[...nextauth]/route'

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
})

// In a real app, this would be stored in a database
const registeredUsers: Record<string, { id: string; email: string; name: string; password: string }> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = signupSchema.parse(body)

    // Check if user already exists
    if (registeredUsers[validatedData.email]) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 10)

    // Create user
    const newUser = {
      id: Date.now().toString(),
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
    }

    registeredUsers[validatedData.email] = newUser

    // Also add to the main users object for the credentials provider
    // In a real app, you'd have a single database
    users[validatedData.email] = newUser
    
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
