"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"

interface EtherealShadowProps {
  className?: string
  color1?: string
  color2?: string
  color3?: string
  speed?: number
}

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return position
}

export function EtherealShadow({
  className = "",
  color1 = "rgba(139, 92, 246, 0.15)", // Purple
  color2 = "rgba(59, 130, 246, 0.1)",   // Blue
  color3 = "rgba(16, 185, 129, 0.08)",  // Green
  speed = 1,
}: EtherealShadowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const x1 = useTransform(x, [0, 1], ["-10%", "10%"])
  const y1 = useTransform(y, [0, 1], ["-10%", "10%"])
  const x2 = useTransform(x, [0, 1], ["10%", "-10%"])
  const y2 = useTransform(y, [0, 1], ["-15%", "15%"])

  useAnimationFrame((_, delta) => {
    const time = Date.now() * 0.001 * speed
    const offsetX = Math.sin(time * 0.5) * 0.1
    const offsetY = Math.cos(time * 0.3) * 0.1

    x.set(mouse.x + offsetX)
    y.set(mouse.y + offsetY)
  })

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {/* Gradient blob 1 - Top right */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          x: x1,
          y: y1,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Gradient blob 2 - Bottom left */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          x: x2,
          y: y2,
          bottom: "-10%",
          left: "-5%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />

      {/* Gradient blob 3 - Center */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${color3} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`,
        }}
      />
    </div>
  )
}

export default EtherealShadow
