"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!email) {
      router.push("/")
    }
  }, [email, router])

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/verify-otp?email=${encodeURIComponent(email!)}&otp=${otp}`,
        { method: "POST" },
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || "Verification failed")
      }

      setSuccess("Email verified successfully. Redirecting...")
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError("")
    setSuccess("")
    setResending(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/resend-otp?email=${encodeURIComponent(email!)}`,
        { method: "POST" },
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || "Failed to resend OTP")
      }

      setSuccess("A new OTP has been sent to your email.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section flex min-h-screen items-center justify-center pt-24 pb-12">
        <Card className="glass-card w-full max-w-md">
          <CardHeader className="border-b border-black/10 pb-5">
            <p className="eyebrow">Verify email</p>
            <CardTitle className="mt-2 font-display text-3xl font-semibold">
              Enter your code
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-text-secondary">
              We sent a 6-digit verification code to {email}.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {error && (
              <div className="rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-foreground">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-2xl border border-black/10 bg-black text-sm text-white px-4 py-3">
                {success}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="h-14 rounded-2xl border-black/10 bg-white text-center text-3xl tracking-[0.45em]"
                  required
                />
              </div>

              <Button type="submit" disabled={loading || otp.length !== 6} className="h-11 w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <button
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground disabled:opacity-50"
            >
              {resending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Resend code
            </button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="page-shell flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-foreground" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
