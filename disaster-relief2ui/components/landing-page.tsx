'use client'

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { ChevronRight, ArrowDown } from "lucide-react"

interface LandingPageProps {
  onAuthClick: (mode: "signin" | "signup") => void
}

const STATS = [
  { label: "Active Beacons", value: "2,405" },
  { label: "Volunteers Ready", value: "8,921" },
  { label: "Districts Covered", value: "14" },
  { label: "Lives Impacted", value: "50K+" },
]

const FEATURES = [
  {
    number: "01",
    title: "Beacon System",
    desc: "One tap to send an authenticated SOS signal with GPS pinpoint to the nearest volunteer cluster.",
  },
  {
    number: "02",
    title: "Live Triage Feed",
    desc: "A real-time command feed sorted by urgency level so the right help reaches the right person first.",
  },
  {
    number: "03",
    title: "Resource Grid",
    desc: "Track food, shelter, and medical supplies across all 14 Kerala districts from a single dashboard.",
  },
]

export function LandingPage({ onAuthClick }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative bg-black text-white font-body overflow-x-hidden">

      {/* ── STICKY NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
            Sahay / Kerala
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onAuthClick("signin")}
              className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick("signup")}
              className="text-xs font-mono uppercase tracking-widest px-5 py-2.5 border border-white/20 hover:border-white/60 hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO SECTION (Spline 3D) ── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center"
      >
        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Layout: text left, Spline right */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6">

          {/* Left: Big heading */}
          <div className="flex-1 flex flex-col justify-center pt-24 md:pt-0">

            <AnimatePresence>
              {heroVisible && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 mb-6"
                  >
                    Disaster Relief Coordination
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[clamp(4.5rem,11vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
                  >
                    Sahay
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="mt-8 max-w-sm text-white/50 text-base leading-relaxed"
                  >
                    One tap. Real relief. Right now. Kerala's disaster coordination network — connecting civilians with volunteers in real time.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.75 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={() => onAuthClick("signup")}
                      className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-mono uppercase tracking-widest font-bold hover:bg-white/90 transition-all"
                    >
                      Deploy Beacon
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onAuthClick("signin")}
                      className="inline-flex items-center gap-3 border border-white/20 text-white/70 hover:text-white hover:border-white/60 px-8 py-4 text-sm font-mono uppercase tracking-widest transition-all"
                    >
                      Volunteer Access
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Spline 3D Scene */}
          <div className="flex-1 w-full h-full min-h-[400px] md:min-h-full relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-t border-b border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-display font-black text-white leading-none">{s.value}</span>
              <span className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/40">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30 mb-4">System Capabilities</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-[0.9] tracking-tight text-white">
              Built for<br />the field.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-black p-10 group hover:bg-white/[0.03] transition-colors cursor-default"
              >
                <span className="font-mono text-xs text-white/20 group-hover:text-white/40 transition-colors">{f.number}</span>
                <h3 className="mt-6 text-2xl font-display font-bold text-white">{f.title}</h3>
                <p className="mt-4 text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white text-black py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Join the Network</p>
            <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-black leading-[0.88] tracking-tight">
              Ready to<br />make an<br />impact?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-6"
          >
            <p className="text-black/50 max-w-xs text-sm leading-relaxed text-left md:text-right">
              Your actions directly impact the survival and recovery of communities across Kerala.
            </p>
            <button
              onClick={() => onAuthClick("signup")}
              className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-all"
            >
              Create Account
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            © 2026 Sahay Kerala. All rights reserved.
          </span>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-white/30">
            <button onClick={() => onAuthClick("signin")} className="hover:text-white/70 transition-colors">Sign In</button>
            <button onClick={() => onAuthClick("signup")} className="hover:text-white/70 transition-colors">Register</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
