"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, MapPin, Clock, User, CheckCircle, AlertCircle, Sparkles, Users, HandHeart } from "lucide-react"

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
      router.push('/')
      return
    }

    if (!isLoading && user && user.role !== 'volunteer') {
      router.push('/dashboard')
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
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else {
        setMessage("Failed to load help requests")
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
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
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setAppliedRequests(prev => new Set(prev).add(requestId))
        setMessage("Application submitted successfully! The help seeker will be notified.")
        // Remove the request from the list after a short delay
        setTimeout(() => {
          setRequests(requests.filter(req => req.id !== requestId))
        }, 2000)
      } else {
        const error = await response.json()
        setMessage(`Failed to apply: ${error.detail}`)
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setApplyingTo(null)
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300'
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300'
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300'
    }
  }

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertCircle className="w-4 h-4" />
      case 'medium': return <Clock className="w-4 h-4" />
      case 'low': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="w-32 h-4 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-6 pt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center border border-accent-teal/20 shadow-glow-teal/30">
                <HandHeart className="w-6 h-6 text-accent-teal" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Active <span className="text-accent-teal">Beacons</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Review local emergency signals. Deploy capabilities where they are most urgently needed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Responder Mesh</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Live Feed</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-accent-teal/30 bg-accent-teal/10' : 'border-accent-red/30 bg-accent-red/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-accent-teal" />
              ) : (
                <AlertCircle className="h-4 w-4 text-accent-red" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-accent-teal font-mono text-sm' : 'text-accent-red font-mono text-sm'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Intercepting Signals...</p>
              </div>
            </div>
          ) : requests.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Sparkles className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">No Active Beacons</h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                    The network is currently stable. Maintain standby mode and monitor the feed for incoming requests.
                  </p>
                </div>
                <Button onClick={() => window.location.href = '/dashboard'} className="btn-secondary px-8">
                  Return to Command Center
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <Card key={request.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                  <CardContent className="p-6 space-y-4 flex flex-col h-full">
                    {/* Header with Priority Badge */}
                    <div className="flex items-start justify-between min-h-[4rem]">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-xl font-display font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-accent-teal transition-colors">
                          {request.title}
                        </h3>
                        <Badge className={`uppercase tracking-label font-mono bg-transparent border flex flex-row items-center justify-center gap-1 w-fit ${request.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                            request.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                              'border-accent-teal text-accent-teal'
                          }`}>
                          {getUrgencyIcon(request.urgency_level)}
                          {request.urgency_level}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary font-body leading-relaxed line-clamp-3 my-2 flex-grow">
                      {request.description}
                    </p>

                    {/* Request Details */}
                    <div className="space-y-3 pt-3 mt-auto mb-4 border-t border-glass-border">
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <MapPin className="w-4 h-4 text-accent-teal shrink-0" />
                        <span className="truncate">{request.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <Clock className="w-4 h-4 text-accent-teal shrink-0" />
                        <span>{new Date(request.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <User className="w-4 h-4 text-accent-teal shrink-0" />
                        <span>Beacon #{request.id}</span>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {request.photo && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-glass-border bg-glass-01 mb-4 shrink-0">
                        <img
                          src={`${API_BASE_URL}/uploads/${request.photo}`}
                          alt="Beacon Visual Data"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto shrink-0 pt-2">
                      <Button
                        onClick={() => applyToRequest(request.id)}
                        disabled={applyingTo === request.id || appliedRequests.has(request.id) || request.has_applied}
                        className={`w-full h-12 font-display font-bold transition-all duration-300 ${appliedRequests.has(request.id) || request.has_applied
                            ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30 cursor-not-allowed'
                            : 'btn-primary'
                          }`}
                      >
                        {appliedRequests.has(request.id) || request.has_applied ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            RESPONSE TRANSMITTED
                          </span>
                        ) : applyingTo === request.id ? (
                          <span className="flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase text-bg-void">
                            <div className="w-5 h-5 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                            Connecting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Heart className="w-5 h-5" />
                            DEPLOY SUPPORT
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
