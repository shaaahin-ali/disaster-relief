"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Clock, User, Search, Filter, Trash2, Phone, Users, CheckCircle } from "lucide-react"

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
  has_applied?: boolean
}

export default function AllRequests() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [applyingTo, setApplyingTo] = useState<number | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (token) {
      fetchRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, urgencyFilter])

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
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

  const filterRequests = () => {
    let filtered = requests

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by urgency
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(request => request.urgency_level === urgencyFilter)
    }

    setFilteredRequests(filtered)
  }

  const applyToRequest = async (requestId: number) => {
    if (!user || user.role !== 'volunteer') return

    setApplyingTo(requestId)
    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Remove the request from the list
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
        alert('Request deleted successfully!')
      } else {
        alert('Failed to delete request')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Community Requests
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Discover requests from your community and offer your help to those who need it most
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

          {/* Search and Filters */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search by title, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-background border-input focus:border-primary h-12 text-base"
                    />
                  </div>
                </div>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-full md:w-56 bg-background border-input focus:border-primary h-12">
                    <Filter className="w-4 h-4 mr-3 text-primary" />
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">🎯 All Urgency Levels</SelectItem>
                    <SelectItem value="high">🔴 High Priority</SelectItem>
                    <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                    <SelectItem value="low">🟢 Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading community requests...</p>
              </div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {requests.length === 0 ? 'No Requests Yet' : 'No Requests Match Your Filters'}
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    {requests.length === 0
                      ? 'Be the first to create a help request and start helping your community!'
                      : 'Try adjusting your search terms or filters to find more requests'
                    }
                  </p>
                </div>
                {requests.length === 0 && user?.role === 'user' && (
                  <Button
                    onClick={() => window.location.href = '/request-help'}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Create First Request
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredRequests.length}</span> of <span className="font-semibold text-foreground">{requests.length}</span> requests
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 space-y-4">
                      {/* Header with Title and Urgency */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {request.title}
                            </h3>
                            <Badge className={`border mt-2 ${getUrgencyColor(request.urgency_level)}`}>
                              {request.urgency_level} priority
                            </Badge>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {request.description}
                        </p>

                        {/* Location and Date */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{new Date(request.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* User Contact Info for Volunteers */}
                        {user?.role === 'volunteer' && request.user && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
                            <p className="text-sm font-medium text-primary">Contact Information</p>
                            <div className="space-y-1 text-sm">
                              <p className="text-foreground">
                                <span className="font-medium">Name:</span> {request.user.username}
                              </p>
                              {request.user.phone_number && (
                                <p className="text-foreground">
                                  <span className="font-medium">Phone:</span> {request.user.phone_number}
                                </p>
                              )}
                              <p className="text-foreground">
                                <span className="font-medium">Email:</span> {request.user.email}
                              </p>
                            </div>
                          </div>
                        )}

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

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {user?.role === 'volunteer' && user.id !== request.user_id && (
                            <Button
                              onClick={() => applyToRequest(request.id)}
                              disabled={applyingTo === request.id || request.has_applied}
                              className={`flex-1 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                request.has_applied
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              }`}
                            >
                              {applyingTo === request.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                  Applying...
                                </>
                              ) : request.has_applied ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Offered
                                </>
                              ) : (
                                <>
                                  <Heart className="w-4 h-4 mr-2" />
                                  Offer Help
                                </>
                              )}
                            </Button>
                          )}

                          {user?.id === request.user_id && (
                            <Button
                              onClick={() => deleteRequest(request.id)}
                              variant="destructive"
                              size="sm"
                              className="bg-destructive hover:bg-destructive/90 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
