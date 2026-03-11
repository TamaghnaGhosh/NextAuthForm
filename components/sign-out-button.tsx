'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: `${window.location.origin}/login` })
  }

  return (
    <Button
      onClick={handleSignOut}
      className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
    >
      Sign Out
    </Button>
  )
}
