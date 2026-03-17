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
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Global <span className="text-accent-teal">Feed</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Discover requests from your community and offer your capabilities where they are most needed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Civilian Network</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Live Intel</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
                    <Input
                      placeholder="SCAN NETWORK: Search by title, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-bg-void border-glass-border focus:border-accent-teal h-14 text-base font-body text-text-primary placeholder:text-text-muted placeholder:font-mono placeholder:tracking-wide w-full"
                    />
                  </div>
                </div>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-full md:w-64 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <Filter className="w-4 h-4 mr-3 text-accent-teal" />
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">🎯 All Threat Levels</SelectItem>
                    <SelectItem value="high" className="focus:bg-glass-01 focus:text-accent-red font-bold">🔴 Critical Priority</SelectItem>
                    <SelectItem value="medium" className="focus:bg-glass-01 focus:text-accent-amber">🟡 Medium Priority</SelectItem>
                    <SelectItem value="low" className="focus:bg-glass-01 focus:text-accent-teal">🟢 Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Scanning Feed...</p>
              </div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {requests.length === 0 ? 'No Active Beacons' : 'No Intel Found'}
                  </h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8 font-body">
                    {requests.length === 0
                      ? 'The network is currently clear. Initialize a beacon if assistance is required.'
                      : 'Adjust search parameters to widen the scan radius.'
                    }
                  </p>
                </div>
                {requests.length === 0 && user?.role === 'user' && (
                  <Button
                    onClick={() => window.location.href = '/request-help'}
                    className="btn-primary h-12 px-8"
                  >
                    <AlertCircle className="w-5 h-5 mr-3" />
                    Initialize First Beacon
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-glass-border pb-2">
                <p className="text-text-muted font-mono text-sm uppercase tracking-widest">
                  Showing <span className="font-bold text-accent-teal">{filteredRequests.length}</span> of <span className="font-bold text-text-primary">{requests.length}</span> Results
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                    <CardContent className="p-6 flex flex-col h-full space-y-4">
                      {/* Header with Title and Urgency */}
                      <div className="flex items-start justify-between min-h-[4rem]">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-xl font-display font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-accent-teal transition-colors">
                            {request.title}
                          </h3>
                          <Badge className={`uppercase tracking-label font-mono bg-transparent border flex flex-row items-center justify-center gap-1 w-fit ${request.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                              request.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                                'border-accent-teal text-accent-teal'
                            }`}>
                            {request.urgency_level}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary font-body leading-relaxed line-clamp-3 mb-2 flex-grow">
                        {request.description}
                      </p>

                      {/* Location and Date */}
                      <div className="space-y-3 pt-3 mt-auto mb-2 border-t border-glass-border">
                        <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                          <MapPin className="w-4 h-4 text-accent-teal shrink-0" />
                          <span className="truncate">{request.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                          <Clock className="w-4 h-4 text-accent-teal shrink-0" />
                          <span>{new Date(request.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* User Contact Info for Volunteers */}
                      {user?.role === 'volunteer' && request.user && (
                        <div className="bg-glass-01 border border-glass-border rounded-lg p-4 space-y-2 mt-2">
                          <p className="text-xs uppercase tracking-label font-bold text-accent-teal">Origin Contact Data</p>
                          <div className="space-y-1.5 text-xs font-mono text-text-secondary">
                            <p className="flex items-center gap-2">
                              <User className="w-3 h-3 text-text-muted" />
                              {request.user.username}
                            </p>
                            {request.user.phone_number && (
                              <p className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-text-muted" />
                                {request.user.phone_number}
                              </p>
                            )}
                            <p className="flex items-center gap-2 truncate">
                              <span className="w-3 h-3 text-text-muted flex items-center justify-center">@</span>
                              {request.user.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Image Preview */}
                      {request.photo && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-glass-border bg-glass-01 mt-3 shrink-0">
                          <img
                            src={`${API_BASE_URL}/uploads/${request.photo}`}
                            alt="Beacon Evidence"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 mt-auto">
                        {user?.role === 'volunteer' && user.id !== request.user_id && (
                          <Button
                            onClick={() => applyToRequest(request.id)}
                            disabled={applyingTo === request.id || request.has_applied}
                            className={`flex-1 h-12 font-display font-bold transition-all duration-300 ${request.has_applied
                                ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30 cursor-not-allowed'
                                : 'btn-primary'
                              }`}
                          >
                            {applyingTo === request.id ? (
                              <span className="flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase text-bg-void">
                                <div className="w-4 h-4 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                                Transmitting...
                              </span>
                            ) : request.has_applied ? (
                              <span className="flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                OVERSEEN
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <Heart className="w-4 h-4" />
                                DEPLOY
                              </span>
                            )}
                          </Button>
                        )}

                        {user?.id === request.user_id && (
                          <Button
                            onClick={() => deleteRequest(request.id)}
                            variant="ghost"
                            size="sm"
                            className="w-full bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white border border-accent-red/20 h-10 font-mono tracking-widest uppercase text-xs"
                          >
                            <Trash2 className="w-4 h-4 mr-2 border" />
                            Deactivate
                          </Button>
                        )}
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
