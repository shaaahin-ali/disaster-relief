"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  mode: "signin" | "signup" | null
  onClose: () => void
  onSuccess: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function AuthModal({ mode, onClose, onSuccess }: AuthModalProps) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    role: "user",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = mode === "signin" ? "/login" : "/signup"

      if (mode === "signin") {
        const formDataForLogin = new FormData()
        formDataForLogin.append("username", formData.email)
        formDataForLogin.append("password", formData.password)

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          body: formDataForLogin,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || "Sign in failed")
        }

        const data = await response.json()

        // Fetch user profile to get complete user data
        const profileResponse = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
          },
        })

        if (profileResponse.ok) {
          const userData = await profileResponse.json()
          login(data.access_token, userData)
        } else {
          throw new Error("Failed to fetch user profile")
        }

        onSuccess()
      } else {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || "Sign up failed")
        }

        const data = await response.json()
        localStorage.setItem("userId", data.id)
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const router = useRouter()

  return (
    <Dialog open={mode !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border flex flex-col items-center">
        <DialogHeader className="w-full text-center mb-2">
          <DialogTitle className="text-3xl font-display font-black text-text-primary tracking-hero">
            {mode === "signin" ? "Welcome Back" : "Join Sahay"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {error && (
            <div className="p-4 rounded-lg bg-accent-red/10 border border-accent-red/20 text-sm text-accent-red">{error}</div>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="email" className="text-text-primary font-semibold text-sm tracking-label uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
              required
            />
          </div>

          {mode === "signup" && (
            <>
              <div className="space-y-2 w-full">
                <Label htmlFor="username" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="phone" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="role" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  I am a
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-bg-elevated border border-glass-border-strong text-text-primary focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-all"
                  required
                >
                  <option value="user">Person Needing Help</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="password" className="text-text-primary font-semibold text-sm tracking-label uppercase">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
              required
              minLength={6}
            />
            {mode === "signup" && <p className="text-xs text-text-muted mt-1">At least 6 characters</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-bg-void hover:shadow-glow-teal py-6 rounded-full font-bold transition-all text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={onClose}
            className="text-text-primary font-semibold hover:text-accent-teal transition-colors"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}
