"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Heart, MapPin, Clock, AlertCircle } from "lucide-react"

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

export default function Dashboard() {
  const { user, token } = useAuth()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (token && user) {
      fetchUserRequests()
    }
  }, [token, user])

  const fetchUserRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const allRequests = await response.json()
        // Filter requests by current user
        const userRequests = allRequests.filter((req: HelpRequest) => req.user_id === user?.id)
        setRequests(userRequests)
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
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

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
              Welcome back, {user.username}
            </h1>
            <p className="text-black/60 text-lg">
              Manage your help requests and connect with volunteers
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-black/10 hover:border-black/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Request Help</h3>
                    <p className="text-black/60 text-sm">Create a new help request</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-black text-white hover:bg-black/90"
                  onClick={() => window.location.href = '/request-help'}
                >
                  Create Request
                </Button>
              </CardContent>
            </Card>

            <Card className="border-black/10 hover:border-black/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Browse Help</h3>
                    <p className="text-black/60 text-sm">See all help requests</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-black/20 text-black hover:bg-black/5"
                  onClick={() => window.location.href = '/all-requests'}
                >
                  View All
                </Button>
              </CardContent>
            </Card>

            <Card className="border-black/10 hover:border-black/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Community</h3>
                    <p className="text-black/60 text-sm">Connect with volunteers</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-black/20 text-black hover:bg-black/5"
                  onClick={() => window.location.href = '/profile'}
                >
                  My Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User's Help Requests */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-black">My Help Requests</h2>
              <Button
                onClick={() => window.location.href = '/request-help'}
                className="bg-black text-white hover:bg-black/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-black/60">Loading your requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <Card className="border-black/10">
                <CardContent className="p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-black/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">No requests yet</h3>
                  <p className="text-black/60 mb-6">Create your first help request to get started</p>
                  <Button
                    onClick={() => window.location.href = '/request-help'}
                    className="bg-black text-white hover:bg-black/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <Card key={request.id} className="border-black/10 hover:border-black/20 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-black">{request.title}</h3>
                            <Badge className={`border ${getUrgencyColor(request.urgency_level)}`}>
                              {request.urgency_level}
                            </Badge>
                          </div>
                          <p className="text-black/70 mb-3">{request.description}</p>
                          <div className="flex items-center gap-4 text-sm text-black/60">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {request.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(request.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {request.photo && (
                          <div className="ml-4">
                            <img
                              src={`${API_BASE_URL}/uploads/${request.photo}`}
                              alt="Request"
                              className="w-20 h-20 object-cover rounded-lg border border-black/10"
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
    </div>
  )
}
