"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User, Heart, Users, Plus, Home } from "lucide-react"

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-bg-base/60 backdrop-blur-md border-b border-glass-border py-3" : "bg-transparent py-4"
        }`}
    >
      <nav className="px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-display font-black tracking-hero text-text-primary">Sahay</span>

          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>

            {user?.role === 'user' && (
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
                onClick={() => window.location.href = '/request-help'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Help
              </Button>
            )}

            {user?.role === 'volunteer' && (
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
                onClick={() => window.location.href = '/volunteer/requests'}
              >
                <Heart className="w-4 h-4 mr-2" />
                Help Requests
              </Button>
            )}

            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/resources'}
            >
              <Heart className="w-4 h-4 mr-2" />
              Resources
            </Button>

            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/profile'}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-text-muted hidden sm:block uppercase tracking-label">
            {user?.username}
          </span>
          <Button
            onClick={logout}
            variant="outline"
            className="rounded-full border-glass-border-strong text-text-primary hover:bg-glass-02 hover:border-white/25 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4 mr-2 text-accent-red" />
            Sign Out
          </Button>
        </div>
      </nav>
    </header>
  )
}
