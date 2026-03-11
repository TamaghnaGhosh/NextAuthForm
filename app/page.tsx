import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default async function HomePage() {
  const session = await auth()

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-2xl p-12 shadow-2xl border-slate-700">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Welcome to Auth App</h1>
            <p className="text-xl text-slate-400">
              A modern authentication system built with Next.js 16, NextAuth, and TypeScript
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8">
            <div className="space-y-3 text-left border-l-2 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Secure</h3>
              <p className="text-slate-400 text-sm">
                JWT-based sessions with bcryptjs password hashing and middleware protection
              </p>
            </div>
            <div className="space-y-3 text-left border-l-2 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Modern</h3>
              <p className="text-slate-400 text-sm">
                Built with Next.js 16, React 19, and the latest NextAuth best practices
              </p>
            </div>
            <div className="space-y-3 text-left border-l-2 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Type-Safe</h3>
              <p className="text-slate-400 text-sm">
                Full TypeScript support with strict type checking throughout the app
              </p>
            </div>
            <div className="space-y-3 text-left border-l-2 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Validated</h3>
              <p className="text-slate-400 text-sm">
                Input validation with Zod and comprehensive error handling
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-base">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-lg transition-colors text-base">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="border-t border-slate-700 pt-8 space-y-3">
            <p className="text-sm font-medium text-slate-400">Want to see it in action?</p>
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-slate-300">
                <span className="font-semibold text-white">Demo Email:</span>{' '}
                <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">demo@example.com</code>
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-white">Demo Password:</span>{' '}
                <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">demo123</code>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </main>
  )
}
