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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-primary" />
              </div>
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Help Requests
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Browse available requests and offer your help to those in need. Your kindness can make a real difference.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Community Impact</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Make a Difference</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' : 'border-destructive bg-destructive/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-green-800 dark:text-green-300' : 'text-destructive'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading help requests...</p>
              </div>
            </div>
          ) : requests.length === 0 ? (
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No Active Requests</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    There are currently no help requests available. Check back later or help spread the word about our platform!
                  </p>
                </div>
                <Button onClick={() => window.location.href = '/'} variant="outline" className="px-8">
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <Card key={request.id} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    {/* Header with Priority Badge */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {request.title}
                        </h3>
                        <Badge className={`border flex items-center gap-1 w-fit ${getUrgencyColor(request.urgency_level)}`}>
                          {getUrgencyIcon(request.urgency_level)}
                          {request.urgency_level} priority
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {request.description}
                    </p>

                    {/* Request Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 text-primary" />
                        <span>Request #{request.id}</span>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {request.photo && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted/50">
                        <img
                          src={`${API_BASE_URL}/uploads/${request.photo}`}
                          alt="Request"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => applyToRequest(request.id)}
                      disabled={applyingTo === request.id || appliedRequests.has(request.id) || request.has_applied}
                      className={`w-full h-12 group-hover:shadow-lg transition-all duration-300 ${
                        appliedRequests.has(request.id) || request.has_applied
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                    >
                      {appliedRequests.has(request.id) || request.has_applied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Offered
                        </>
                      ) : applyingTo === request.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Applying...
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Offer Help
                        </>
                      )}
                    </Button>
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
