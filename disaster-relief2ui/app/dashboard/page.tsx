"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Heart, MapPin, Clock, AlertCircle, User, Users, Trash2, Phone, Mail, Package } from "lucide-react"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
  user?: {
    id: number
    username: string
    email: string
    phone_number?: string
  }
  volunteers?: Array<{
    id: number
    username: string
    email: string
    phone_number?: string
    applied_at?: string
  }>
}

export default function Dashboard() {
  const { user, token, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (token && user) {
      fetchUserRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

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

  const deleteRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to delete this request? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setRequests(requests.filter(req => req.id !== requestId))
      } else {
        alert('Failed to delete request')
      }
    } catch (error) {
      alert('Network error. Please try again.')
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome back, {user.username}
            </h1>
            <p className="text-muted-foreground text-xl">
              Manage your help requests and connect with our amazing community of volunteers
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/request-help'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Request Help</h3>
                    <p className="text-muted-foreground">Create a new help request</p>
                  </div>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  Create Request
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/all-requests'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Browse Help</h3>
                    <p className="text-muted-foreground">See all help requests</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                  View Community
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/resources'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Package className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Resources</h3>
                    <p className="text-muted-foreground">Share or request resources</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">My Profile</h3>
                    <p className="text-muted-foreground">Manage your account</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User's Help Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">My Help Requests</h2>
                <p className="text-muted-foreground">Track and manage your active requests</p>
              </div>
              <Button
                onClick={() => window.location.href = '/request-help'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground">Loading your requests...</p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">No Requests Yet</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                      You haven't created any help requests yet. Start by creating your first request to connect with our community of volunteers.
                    </p>
                    <Button
                      onClick={() => window.location.href = '/request-help'}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {requests.map((request) => (
                  <Card key={request.id} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-foreground line-clamp-1">{request.title}</h3>
                                <Badge className={`border ${getUrgencyColor(request.urgency_level)}`}>
                                  {request.urgency_level} priority
                                </Badge>
                              </div>
                              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">{request.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 text-primary" />
                                  <span>{new Date(request.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4 text-primary" />
                                  <span>Request #{request.id}</span>
                                </div>
                              </div>
                            </div>
                            {request.photo && (
                              <div className="flex-shrink-0">
                                <img
                                  src={`${API_BASE_URL}/uploads/${request.photo}`}
                                  alt="Request"
                                  className="w-24 h-24 object-cover rounded-lg border border-border shadow-sm"
                                />
                              </div>
                            )}
                          </div>

                          {/* Contact Information for Owner */}
                          {request.user && (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
                              <p className="text-sm font-medium text-primary">Your Contact Information</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <p className="text-foreground">
                                  <Mail className="w-3 h-3 inline mr-1" />
                                  {request.user.email}
                                </p>
                                {request.user.phone_number && (
                                  <p className="text-foreground">
                                    <Phone className="w-3 h-3 inline mr-1" />
                                    {request.user.phone_number}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Volunteer Applications */}
                          {request.volunteers && request.volunteers.length > 0 && (
                            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 space-y-3">
                              <p className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                Volunteers Who Offered Help ({request.volunteers.length})
                              </p>
                              <div className="space-y-2">
                                {request.volunteers.map((volunteer) => (
                                  <div key={volunteer.id} className="bg-white dark:bg-gray-800 rounded-md p-3 border border-green-100 dark:border-green-800">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="font-medium text-foreground text-sm">{volunteer.username}</p>
                                        <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground mt-1">
                                          <p>
                                            <Mail className="w-3 h-3 inline mr-1" />
                                            {volunteer.email}
                                          </p>
                                          {volunteer.phone_number && (
                                            <p>
                                              <Phone className="w-3 h-3 inline mr-1" />
                                              {volunteer.phone_number}
                                            </p>
                                          )}
                                        </div>
                                        {volunteer.applied_at && (
                                          <p className="text-xs text-muted-foreground mt-1">
                                            Applied: {new Date(volunteer.applied_at).toLocaleString()}
                                          </p>
                                        )}
                                      </div>
                                      <div className="ml-2">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                          <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                Status: <span className="text-primary font-medium">Active</span>
                              </span>
                              {request.volunteers && request.volunteers.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {request.volunteers.length} volunteer{request.volunteers.length > 1 ? 's' : ''} applied
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                              >
                                View Details
                              </Button>
                              <Button
                                onClick={() => deleteRequest(request.id)}
                                variant="destructive"
                                size="sm"
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
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
