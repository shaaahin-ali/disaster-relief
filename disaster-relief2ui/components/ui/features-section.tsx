"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Bell,
  Users,
  MapPin,
  Package,
  Heart,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

const features: Feature[] = [
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Emergency Beacon",
    description: "One tap to send authenticated SOS signals with precise GPS location to the nearest volunteer cluster.",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Volunteer Network",
    description: "Connect with verified volunteers across 14 districts. Real-time coordination and response tracking.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Live Triage Feed",
    description: "Real-time command feed sorted by urgency. Priority-based dispatch ensures critical cases get immediate attention.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "Resource Grid",
    description: "Track food, shelter, and medical supplies across all districts. Centralized inventory management system.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Community Care",
    description: "Build resilient communities through mutual aid. Connect donors, NGOs, and affected citizens seamlessly.",
    gradient: "from-rose-500/20 to-amber-500/20",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Verified Help",
    description: "Every volunteer and NGO is verified. Transparent operations with full accountability and tracking.",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Response",
    description: "Average response time under 15 minutes. Automated matching connects the right help to the right people.",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Kerala Coverage",
    description: "Complete coverage across all 14 districts. Local knowledge meets global coordination standards.",
    gradient: "from-teal-500/20 to-blue-500/20",
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300",
          "hover:scale-[1.02] hover:-translate-y-1",
          "border border-white/5"
        )}
      >
        {/* Gradient background on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            feature.gradient
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            "relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
            "bg-gradient-to-br text-white shadow-lg",
            feature.gradient
          )}
        >
          {feature.icon}
        </div>

        {/* Content */}
        <h3 className="relative mb-2 font-display text-lg font-semibold text-white">
          {feature.title}
        </h3>
        <p className="relative text-sm leading-relaxed text-text-secondary">
          {feature.description}
        </p>

        {/* Hover glow effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100">
          <div className={cn("h-full w-full bg-gradient-to-br", feature.gradient)} />
        </div>
      </div>
    </motion.div>
  )
}

interface FeaturesSectionProps {
  className?: string
  title?: string
  subtitle?: string
  showAllFeatures?: boolean
}

export function FeaturesSection({
  className = "",
  title = "Everything you need",
  subtitle = "Powerful features to coordinate disaster relief",
  showAllFeatures = true,
}: FeaturesSectionProps) {
  const displayFeatures = showAllFeatures ? features : features.slice(0, 4)

  return (
    <section className={cn("relative py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-text-accent"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-text-secondary"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: "2,405", label: "Active Beacons" },
            { value: "8,921", label: "Volunteers Ready" },
            { value: "14", label: "Districts Covered" },
            { value: "50K+", label: "Lives Impacted" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
