import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/sign-out-button'
import { Card } from '@/components/ui/card'
import PreventBack from '@/components/prevent-back'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <PreventBack />
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <SignOutButton />
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <Card className="p-8 border-slate-700 bg-slate-800/50 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
            <p className="text-slate-400 mb-6">
              You have successfully authenticated with NextAuth.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-400">Name</p>
                <p className="text-white font-semibold">{session.user?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Email</p>
                <p className="text-white font-semibold">{session.user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">User ID</p>
                <p className="text-white font-mono text-sm">{session.user?.id || 'N/A'}</p>
              </div>
            </div>
          </Card>

          {/* Session Info Card */}
          <Card className="p-8 border-slate-700 bg-slate-800/50 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-2">Session Info</h2>
            <p className="text-slate-400 mb-6">
              This is the authenticated session data from NextAuth.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-slate-300 text-xs overflow-auto max-h-48">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </Card>

          {/* Features Card */}
          <Card className="p-8 border-slate-700 bg-slate-800/50 backdrop-blur md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Features Implemented</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>NextAuth v5 with Credentials Provider for email/password authentication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>JWT-based session management with secure token handling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>Protected routes using Next.js middleware and authorization callbacks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>User signup with bcryptjs password hashing and Zod validation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>TypeScript support throughout the entire authentication flow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>Automatic session provider setup in the root layout</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
  )
}
