"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Clock, User, Search, Filter } from "lucide-react"

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

export default function AllRequests() {
  const { token, user } = useAuth()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [applyingTo, setApplyingTo] = useState<number | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (token) {
      fetchRequests()
    }
  }, [token])

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
              All Help Requests
            </h1>
            <p className="text-black/60 text-lg">
              Browse and search through all community help requests
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="border-black/10 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40 w-4 h-4" />
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-black/20 focus:border-black"
                    />
                  </div>
                </div>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-full md:w-48 border-black/20 focus:border-black">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency Levels</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-black/60">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <Card className="border-black/10">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-black/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  {requests.length === 0 ? 'No requests yet' : 'No requests match your filters'}
                </h3>
                <p className="text-black/60">
                  {requests.length === 0
                    ? 'Be the first to create a help request!'
                    : 'Try adjusting your search or filters'
                  }
                </p>
                {requests.length === 0 && user?.role === 'user' && (
                  <Button
                    className="mt-4 bg-black text-white hover:bg-black/90"
                    onClick={() => window.location.href = '/request-help'}
                  >
                    Create First Request
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 text-black/60">
                Showing {filteredRequests.length} of {requests.length} requests
              </div>

              <div className="grid gap-4">
                {filteredRequests.map((request) => (
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
                          <div className="flex items-center gap-4 text-sm text-black/60 mb-4">
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

                          {user?.role === 'volunteer' && user.id !== request.user_id && (
                            <Button
                              onClick={() => applyToRequest(request.id)}
                              disabled={applyingTo === request.id}
                              size="sm"
                              className="bg-black text-white hover:bg-black/90"
                            >
                              {applyingTo === request.id ? (
                                <>
                                  <Heart className="w-4 h-4 mr-2 animate-spin" />
                                  Applying...
                                </>
                              ) : (
                                <>
                                  <Heart className="w-4 h-4" />
                                  Offer Help
                                </>
                              )}
                            </Button>
                          )}
                        </div>

                        {request.photo && (
                          <div className="ml-4">
                            <img
                              src={`${API_BASE_URL}/uploads/${request.photo}`}
                              alt="Request"
                              className="w-24 h-24 object-cover rounded-lg border border-black/10"
                            />
                          </div>
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
