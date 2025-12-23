"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface LandingPageProps {
  onAuthClick: (mode: "signin" | "signup") => void
}

export function LandingPage({ onAuthClick }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.0002

      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(0, 0, 0, 0.02)"
      ctx.lineWidth = 1

      const spacing = 60
      const offset = (time * 15) % spacing

      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative bg-white">
      {/* Canvas Background - Full Screen */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10">
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent py-6"
          }`}
        >
          <nav className="px-8 flex items-center justify-between">
            <span className="text-lg font-black tracking-tight text-black">Sahay</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onAuthClick("signin")}
                className="text-sm text-black/60 hover:text-black font-medium transition-colors"
              >
                Sign In
              </button>
              <Button
                onClick={() => onAuthClick("signup")}
                className="bg-black text-white hover:bg-black/90 rounded-full font-semibold text-sm px-6 py-2"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="flex flex-col items-center justify-center text-center w-full">
            {/* Massive Sahay heading */}
            <h1 className="text-[200px] sm:text-[240px] md:text-[280px] lg:text-[320px] font-black leading-none tracking-tighter text-black slide-up mb-8">
              Sahay
            </h1>

            {/* Subheadline */}
            <p
              className="text-sm md:text-base text-black/60 mb-12 max-w-xl leading-relaxed font-light slide-up"
              style={{ animationDelay: "100ms" }}
            >
              Connect those in need with compassionate volunteers. Build meaningful community through direct support and
              real impact.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                onClick={() => onAuthClick("signup")}
                size="lg"
                className="px-8 py-6 text-base rounded-full bg-black text-white hover:bg-black/90 group font-semibold"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => onAuthClick("signin")}
                size="lg"
                className="px-8 py-6 text-base rounded-full border-2 border-black text-black hover:bg-black/5 font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-6 py-24 border-t border-black/10">
          <div className="max-w-6xl w-full">
            <h2 className="text-6xl md:text-7xl font-black mb-8 text-center text-black leading-tight">Why Sahay?</h2>
            <p className="text-center text-black/50 mb-20 max-w-2xl mx-auto font-light text-lg">
              Designed for simplicity, built for impact
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Direct Connection",
                  description: "Connect directly with volunteers in your community",
                },
                {
                  title: "Community Driven",
                  description: "Built by volunteers, for those who need support",
                },
                {
                  title: "Instant Response",
                  description: "Get help when you need it most, 24/7",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-black/10 hover:border-black/20 hover:bg-black/2 transition-all"
                >
                  <h3 className="text-2xl font-black mb-3 text-black">{feature.title}</h3>
                  <p className="text-black/60 font-light text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[60vh] flex items-center justify-center px-6 py-20 border-t border-black/10">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-12 text-black leading-tight">
              Ready to make a difference?
            </h2>
            <Button
              onClick={() => onAuthClick("signup")}
              size="lg"
              className="px-10 py-7 text-lg rounded-full bg-black text-white hover:bg-black/90 font-semibold"
            >
              Start Now
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 py-10 text-center text-black/40 text-sm font-light">
          <p>&copy; 2025 Sahay. Helping hands, connected hearts.</p>
        </footer>
      </div>
    </div>
  )
}
