"use client"

import React, { useRef, useCallback } from "react"
import type { Engine } from "@tsparticles/engine"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

interface SparklesProps {
  className?: string
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export function Sparkles({
  className = "",
  id = "tsparticles",
  background = "transparent",
  minSize = 0.5,
  maxSize = 2,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 50,
}: SparklesProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div ref={canvasRef} className={`absolute inset-0 ${className}`}>
      <Particles
        id={id}
        init={particlesInit}
        options={{
          background: {
            color: {
              value: background,
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 0,
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 1,
                },
              },
            },
          },
          particles: {
            color: {
              value: particleColor,
            },
            links: {
              color: particleColor,
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: {
                min: 0.1,
                max: speed,
              },
              straight: false,
            },
            number: {
              density: {
                enable: true,
                width: 500,
                height: 500,
              },
              value: particleDensity,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
              value: {
                min: 0.1,
                max: 0.5,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: {
                min: minSize,
                max: maxSize,
              },
            },
            twinkle: {
              lines: {
                enable: true,
                frequency: 0.05,
                opacity: 0.3,
              },
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 0.3,
              },
            },
          },
          detectRetina: true,
        }}
        className="h-full w-full"
      />
    </div>
  )
}

export default Sparkles
