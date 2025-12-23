"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, User, CheckCircle } from "lucide-react"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
}

export default function VolunteerRequests() {
  const { token } = useAuth()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [applyingTo, setApplyingTo] = useState<number | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (token) {
      fetchRequests()
    }
  }, [token])

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
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyToRequest = async (requestId: number) => {
    setApplyingTo(requestId)
    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Remove the request from the list or mark it as applied
        setRequests(requests.filter(req => req.id !== requestId))
        alert('Application submitted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to apply: ${error.detail}`)
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setApplyingTo(null)
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
              Help Requests
            </h1>
            <p className="text-black/60 text-lg">
              Browse requests and offer your help to those in need
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-black/60">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <Card className="border-black/10">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-black/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">No requests available</h3>
                <p className="text-black/60">Check back later for new help requests</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {requests.map((request) => (
                <Card key={request.id} className="border-black/10 hover:border-black/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-black">{request.title}</h3>
                          <Badge className={`border ${getUrgencyColor(request.urgency_level)}`}>
                            {request.urgency_level} priority
                          </Badge>
                        </div>

                        <p className="text-black/70 mb-4 leading-relaxed">{request.description}</p>

                        <div className="flex items-center gap-6 text-sm text-black/60 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {request.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(request.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Request #{request.id}
                          </div>
                        </div>

                        <Button
                          onClick={() => applyToRequest(request.id)}
                          disabled={applyingTo === request.id}
                          className="bg-black text-white hover:bg-black/90"
                        >
                          {applyingTo === request.id ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                              Applying...
                            </>
                          ) : (
                            <>
                              <Heart className="w-4 h-4 mr-2" />
                              Offer Help
                            </>
                          )}
                        </Button>
                      </div>

                      {request.photo && (
                        <div className="ml-6">
                          <img
                            src={`${API_BASE_URL}/uploads/${request.photo}`}
                            alt="Request"
                            className="w-32 h-32 object-cover rounded-lg border border-black/10"
                          />
                        </div>
                      )}
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
