"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { AuthModal } from "@/components/auth-modal"

export default function Home() {
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null)

  return (
    <>
      <LandingPage onAuthClick={setAuthModal} />
      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSuccess={() => setAuthModal(null)} />
    </>
  )
}
