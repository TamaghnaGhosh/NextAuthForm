"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PreventBack() {
  const router = useRouter()

  useEffect(() => {
    // Push a history entry so that the browser Back button stays on this page
    try {
      window.history.pushState(null, "", window.location.href)
    } catch {}

    const onPop = (e: PopStateEvent) => {
      // If user tries to navigate back while authenticated, keep them on dashboard
      // Force a replace to current route to cancel back navigation
      router.replace(window.location.pathname)
      try {
        window.history.pushState(null, "", window.location.href)
      } catch {}
    }

    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [router])

  return null
}
