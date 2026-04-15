"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, Heart, MapPin, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
  has_applied?: boolean
}

export default function VolunteerRequests() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [applyingTo, setApplyingTo] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [appliedRequests, setAppliedRequests] = useState<Set<number>>(new Set())

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
      return
    }

    if (!isLoading && user && user.role !== "volunteer") {
      router.push("/dashboard")
      return
    }

    if (token) {
      fetchRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/view-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else {
        setMessage("Failed to load help requests.")
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error)
      setMessage("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const applyToRequest = async (requestId: number) => {
    setApplyingTo(requestId)
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setAppliedRequests((prev) => new Set(prev).add(requestId))
        setMessage("Application submitted successfully.")
        setTimeout(() => {
          setRequests((prev) => prev.filter((request) => request.id !== requestId))
        }, 1400)
      } else {
        const error = await response.json()
        setMessage(`Failed to apply: ${error.detail}`)
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setApplyingTo(null)
    }
  }

  if (!user) {
    return <div className="page-shell" />
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section pt-28 pb-12">
        <div className="space-y-8">
          <section className="space-y-4">
            <p className="eyebrow">Volunteer requests</p>
            <h1 className="section-heading text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.96]">
              Open requests
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">
              Review active requests and confirm when you can respond.
            </p>
          </section>

          {message && (
            <Alert className="border-black/10 bg-white text-foreground">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="glass-card p-12 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />
              <p className="mt-4 text-sm text-text-muted">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <Card className="glass-card border-dashed border-black/15">
              <CardContent className="p-12 text-center">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  No active requests
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  There are no requests waiting for a volunteer response right now.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Return to dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {requests.map((request) => (
                <Card key={request.id} className="glass-card-elevated">
                  <CardContent className="p-6">
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-foreground">
                            {request.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-text-secondary">
                            {request.description}
                          </p>
                        </div>
                        <Badge
                          className={
                            request.urgency_level === "high"
                              ? "rounded-full bg-black text-white"
                              : request.urgency_level === "medium"
                                ? "rounded-full border-black/10 bg-black/[0.06] text-foreground"
                                : "rounded-full border-black/10 bg-white text-text-secondary"
                          }
                        >
                          {request.urgency_level}
                        </Badge>
                      </div>

                      <div className="rounded-[20px] border border-black/10 bg-white p-4 text-sm text-text-secondary">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {request.location}
                        </p>
                        <p className="mt-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(request.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          · {new Date(request.created_at).toLocaleDateString()}
                        </p>
                        <p className="mt-2 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Request #{request.id}
                        </p>
                      </div>

                      {request.photo && (
                        <div className="overflow-hidden rounded-[20px] border border-black/10">
                          <img
                            src={`${API_BASE_URL}/uploads/${request.photo}`}
                            alt="Request"
                            className="h-44 w-full object-cover"
                          />
                        </div>
                      )}

                      <Button
                        className="mt-auto"
                        disabled={applyingTo === request.id || appliedRequests.has(request.id) || request.has_applied}
                        onClick={() => applyToRequest(request.id)}
                      >
                        {appliedRequests.has(request.id) || request.has_applied ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Applied
                          </>
                        ) : applyingTo === request.id ? (
                          "Applying..."
                        ) : (
                          <>
                            <Heart className="mr-2 h-4 w-4" />
                            Volunteer for this request
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
