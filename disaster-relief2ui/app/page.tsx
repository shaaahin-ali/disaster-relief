"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null)
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect authenticated users to their dashboard
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'volunteer') {
        router.push('/volunteer/requests')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything for authenticated users (they get redirected)
  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <LandingPage onAuthClick={setAuthModal} />
      <AuthModal
        mode={authModal}
        onClose={() => setAuthModal(null)}
        onSuccess={() => setAuthModal(null)}
      />
    </>
  )
}
