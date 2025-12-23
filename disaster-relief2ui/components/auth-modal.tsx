"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

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
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={mode !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-black/10 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-black">
            {mode === "signin" ? "Welcome Back" : "Join Sahay"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-6">
          {error && (
            <div className="p-4 rounded-lg bg-black/5 border border-black/10 text-sm text-black/70">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black font-semibold text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white border border-black/10 text-black placeholder:text-black/40 focus:border-black focus:ring-1 focus:ring-black rounded-lg"
              required
            />
          </div>

          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-black font-semibold text-sm">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-white border border-black/10 text-black placeholder:text-black/40 focus:border-black focus:ring-1 focus:ring-black rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black font-semibold text-sm">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="bg-white border border-black/10 text-black placeholder:text-black/40 focus:border-black focus:ring-1 focus:ring-black rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-black font-semibold text-sm">
                  I am a
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-black/10 text-black focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                  required
                >
                  <option value="user">Person Needing Help</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black font-semibold text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white border border-black/10 text-black placeholder:text-black/40 focus:border-black focus:ring-1 focus:ring-black rounded-lg"
              required
              minLength={6}
            />
            {mode === "signup" && <p className="text-xs text-black/50 mt-1">At least 6 characters</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-black/90 py-6 rounded-lg font-semibold transition-all"
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

        <p className="text-center text-sm text-black/60">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={onClose}
            className="text-black font-semibold hover:text-black/70 transition-colors"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}
