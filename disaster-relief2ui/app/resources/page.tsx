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
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-amber/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center border border-accent-teal/20 shadow-glow-teal/30">
                <Package className="w-6 h-6 text-accent-teal" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Logistics <span className="text-accent-teal">Hub</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Coordinate critical supplies. Declare operational needs or allocate available resources to the network.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-accent-teal" />
                <span>Supply Chain</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Crowdsourced</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-accent-teal/30 bg-accent-teal/10' : 'border-accent-red/30 bg-accent-red/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-accent-teal" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-accent-red" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-accent-teal font-mono text-sm' : 'text-accent-red font-mono text-sm'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Add Resource Button */}
          <div className="flex justify-center">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="btn-primary h-14 px-10 text-lg">
                  <Plus className="w-5 h-5 mr-3" />
                  LOG LOGISTICS DATA
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-bg-base border-glass-border shadow-glow-teal/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                    <Package className="text-accent-teal w-6 h-6" />
                    Initialize Resource Profile
                  </DialogTitle>
                  <DialogDescription className="text-text-secondary font-body">
                    Declare supply availability or register a critical deficit.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource_type" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Profile Type
                    </Label>
                    <Select value={newResource.resource_type} onValueChange={(value: "needed" | "available") => setNewResource({ ...newResource, resource_type: value })}>
                      <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 font-mono uppercase text-sm text-text-primary">
                        <SelectValue placeholder="Specify Intention" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        <SelectItem value="needed" className="focus:bg-glass-01 focus:text-accent-amber">🔴 REQUISITION (Need)</SelectItem>
                        <SelectItem value="available" className="focus:bg-glass-01 focus:text-accent-teal">🟢 SURPLUS (Available)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Classification
                    </Label>
                    <Select value={newResource.type} onValueChange={(value) => setNewResource({ ...newResource, type: value })}>
                      <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 text-text-primary">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        {resourceCategories.map(category => (
                          <SelectItem key={category} value={category} className="focus:bg-glass-01">{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Designation
                    </Label>
                    <Input
                      id="name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                      placeholder="e.g., MREs, Antibiotics, Tarps"
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      Detailed Telemetry
                    </Label>
                    <Textarea
                      id="description"
                      value={newResource.description}
                      onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      placeholder="Provide specifications, condition, expiration dates..."
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary resize-none h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                        Unit Count
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
                        placeholder="1"
                        className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                        Priority Level
                      </Label>
                      <Select value={newResource.urgency_level} onValueChange={(value) => setNewResource({ ...newResource, urgency_level: value })}>
                        <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 text-text-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Grid Coordinate
                    </Label>
                    <Input
                      id="location"
                      value={newResource.location}
                      onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                      placeholder="Sector or exact address"
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12"
                    />
                  </div>
                </div>
                <DialogFooter className="pt-6 border-t border-glass-border mt-4">
                  <Button variant="ghost" onClick={() => setShowAddDialog(false)} className="text-text-muted hover:text-text-primary hover:bg-glass-01 font-mono uppercase tracking-widest text-xs">
                    ABORT
                  </Button>
                  <Button onClick={handleAddResource} className="bg-accent-teal hover:bg-accent-teal/90 text-bg-void shadow-glow-teal font-display font-black tracking-wide">
                    COMMIT DATA
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
                    <Input
                      placeholder="QUERY DATABASE: Search designations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-bg-void border-glass-border focus:border-accent-teal h-14 text-base font-body text-text-primary placeholder:text-text-muted placeholder:font-mono placeholder:tracking-wide w-full"
                    />
                  </div>
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-56 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <Package className="w-4 h-4 mr-3 text-accent-teal" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">All Classes</SelectItem>
                    {resourceCategories.map(category => (
                      <SelectItem key={category} value={category} className="focus:bg-glass-01">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">All Profiles</SelectItem>
                    <SelectItem value="needed" className="focus:bg-glass-01">Requisitions</SelectItem>
                    <SelectItem value="available" className="focus:bg-glass-01">Surplus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Querying Database...</p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Package className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {resources.length === 0 ? 'Database Empty' : 'Zero Results Found'}
                  </h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8 font-body">
                    {resources.length === 0
                      ? 'No logistics data has been committed to the server.'
                      : 'Try broadening your search parameters.'
                    }
                  </p>
                </div>
                {resources.length === 0 && (
                  <Button onClick={() => setShowAddDialog(true)} className="btn-primary h-12 px-8">
                    <Plus className="w-5 h-5 mr-3" />
                    Initialize First Entry
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-glass-border pb-2">
                <p className="text-text-muted font-mono text-sm uppercase tracking-widest">
                  Showing <span className="font-bold text-accent-teal">{filteredResources.length}</span> of <span className="font-bold text-text-primary">{resources.length}</span> Entries
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                    <CardContent className="p-6 flex flex-col h-full space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`uppercase tracking-label font-mono bg-transparent border text-xs ${resource.resource_type === 'available'
                                ? 'border-accent-teal text-accent-teal shadow-[0_0_10px_rgba(45,212,191,0.2)]'
                                : 'border-accent-amber text-accent-amber shadow-[0_0_10px_rgba(251,191,36,0.2)]'
                              }`}>
                              {resource.resource_type === 'available' ? 'SURPLUS' : 'REQUISITION'}
                            </Badge>
                            <Badge className={`uppercase tracking-label font-mono bg-transparent border text-xs ${resource.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                                resource.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                                  'border-accent-teal text-accent-teal'
                              }`}>
                              {resource.urgency_level}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-display font-bold text-text-primary line-clamp-2 mb-1 group-hover:text-accent-teal transition-colors">
                            {resource.name}
                          </h3>
                          <p className="text-xs font-mono uppercase tracking-widest text-accent-teal border-b border-glass-border pb-2 mb-3">{resource.type}</p>
                          <p className="text-text-secondary leading-relaxed line-clamp-2 text-sm mb-4 font-body">
                            {resource.description}
                          </p>

                          <div className="space-y-2 bg-glass-01 border border-glass-border rounded-lg p-3 text-xs font-mono text-text-secondary">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span className="truncate">{resource.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Package className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span>QUANTITY: <span className="text-text-primary font-bold">{resource.quantity}</span></span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-auto border-t border-glass-border">
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-accent-teal" />
                          <span className="truncate">{resource.contact_info || 'CONTACT POSTER DIRECTLY'}</span>
                        </p>
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


