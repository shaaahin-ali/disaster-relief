"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Package, MapPin, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react"

interface Resource {
  id: number
  type: string
  name: string
  description: string
  quantity: number
  location: string
  urgency_level: string
  contact_info: string
  created_at: string
  user_id: number
  resource_type: 'needed' | 'available'
}

const resourceCategories = [
  "Food & Water",
  "Medicine",
  "Clothing",
  "Shelter Materials",
  "Tools & Equipment",
  "Transportation",
  "Medical Supplies",
  "Baby Care",
  "Elderly Care",
  "Other"
]

export default function Resources() {
  const { token, user, isLoading } = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [message, setMessage] = useState("")

  const [newResource, setNewResource] = useState({
    type: "",
    name: "",
    description: "",
    quantity: "",
    location: "",
    urgency_level: "medium",
    resource_type: "needed" as "needed" | "available"
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/'
      return
    }

    if (token) {
      fetchResources()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading])

  useEffect(() => {
    filterResources()
  }, [resources, searchTerm, categoryFilter, typeFilter])

  const fetchResources = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterResources = () => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(resource => resource.type === categoryFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(resource => resource.resource_type === typeFilter)
    }

    setFilteredResources(filtered)
  }

  const handleAddResource = async () => {
    if (!newResource.type || !newResource.name || !newResource.location) {
      setMessage("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newResource,
          quantity: parseInt(newResource.quantity) || 1
        })
      })

      if (response.ok) {
        setMessage("Resource posted successfully!")
        setShowAddDialog(false)
        setNewResource({
          type: "",
          name: "",
          description: "",
          quantity: "",
          location: "",
          urgency_level: "medium",
          resource_type: "needed"
        })
        fetchResources()
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to post resource")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
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
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Resource Center
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Share resources or request what you need. Together we can support our Kerala community during crises.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Resource Sharing</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Community Support</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-green-200 bg-green-50' : 'border-destructive bg-destructive/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-green-800' : 'text-destructive'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Add Resource Button */}
          <div className="flex justify-center">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8">
                  <Plus className="w-5 h-5 mr-2" />
                  Post Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Post Resource</DialogTitle>
                  <DialogDescription>
                    Share what you need or what you can offer to help the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resource_type">Type</Label>
                    <Select value={newResource.resource_type} onValueChange={(value: "needed" | "available") => setNewResource({...newResource, resource_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="What type of post is this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needed">I Need This Resource</SelectItem>
                        <SelectItem value="available">I Can Provide This Resource</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Category</Label>
                    <Select value={newResource.type} onValueChange={(value) => setNewResource({...newResource, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {resourceCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">Resource Name</Label>
                    <Input
                      id="name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      placeholder="e.g., Rice, Medicine, Blankets"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                      placeholder="Describe the resource and your needs..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({...newResource, quantity: e.target.value})}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="urgency">Urgency</Label>
                      <Select value={newResource.urgency_level} onValueChange={(value) => setNewResource({...newResource, urgency_level: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newResource.location}
                      onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                      placeholder="Your district or specific location"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddResource} className="bg-primary hover:bg-primary/90">
                    Post Resource
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-background border-input focus:border-primary h-12 text-base"
                    />
                  </div>
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-background border-input focus:border-primary h-12">
                    <Package className="w-4 h-4 mr-3 text-primary" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {resourceCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-background border-input focus:border-primary h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="needed">Needed</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading resources...</p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {resources.length === 0 ? 'No Resources Yet' : 'No Resources Match Your Filters'}
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    {resources.length === 0
                      ? 'Be the first to share resources or request what you need.'
                      : 'Try adjusting your search terms or filters.'
                    }
                  </p>
                </div>
                {resources.length === 0 && (
                  <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8">
                    <Plus className="w-5 h-5 mr-2" />
                    Add First Resource
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={resource.resource_type === 'available' ? 'default' : 'secondary'} className="text-xs">
                            {resource.resource_type === 'available' ? 'Available' : 'Needed'}
                          </Badge>
                          <Badge className={`border text-xs ${getUrgencyColor(resource.urgency_level)}`}>
                            {resource.urgency_level}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-1">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{resource.type}</p>
                        <p className="text-muted-foreground leading-relaxed line-clamp-2 text-sm mb-3">
                          {resource.description}
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{resource.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span>Quantity: {resource.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Contact: {resource.contact_info || 'Contact poster for details'}
                      </p>
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
