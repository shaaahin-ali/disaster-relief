"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Package, Search, TriangleAlert, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  resource_type: "needed" | "available"
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
  "Other",
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
    resource_type: "needed" as "needed" | "available",
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/"
      return
    }

    if (token) {
      fetchResources()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading])

  useEffect(() => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter((resource) =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((resource) => resource.type === categoryFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((resource) => resource.resource_type === typeFilter)
    }

    setFilteredResources(filtered)
  }, [resources, searchTerm, categoryFilter, typeFilter])

  const fetchResources = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddResource = async () => {
    if (!newResource.type || !newResource.name || !newResource.location) {
      setMessage("Please fill in all required fields.")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newResource,
          quantity: Number.parseInt(newResource.quantity, 10) || 1,
        }),
      })

      if (response.ok) {
        setMessage("Resource posted successfully.")
        setShowAddDialog(false)
        setNewResource({
          type: "",
          name: "",
          description: "",
          quantity: "",
          location: "",
          urgency_level: "medium",
          resource_type: "needed",
        })
        fetchResources()
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to post resource.")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    }
  }

  if (!user) {
    return <div className="page-shell" />
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section pt-28 pb-12">
        <div className="space-y-8">
          <section className="space-y-4">
            <p className="eyebrow">Resources</p>
            <h1 className="section-heading text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.96]">
              Share what is available.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">
              Post supplies that are available or note what is urgently needed,
              then search and filter the list by category or type.
            </p>
          </section>

          {message && (
            <Alert className="border-black/10 bg-white text-foreground">
              {message.includes("successfully") ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <TriangleAlert className="h-4 w-4" />
              )}
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-start">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Package className="mr-2 h-4 w-4" />
                  Add resource
                </Button>
              </DialogTrigger>
              <DialogContent className="border-black/10 bg-white">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-semibold">
                    Add a resource
                  </DialogTitle>
                  <DialogDescription>
                    Share a supply that is available or describe a supply that is needed.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={newResource.resource_type}
                      onValueChange={(value: "needed" | "available") =>
                        setNewResource({ ...newResource, resource_type: value })
                      }
                    >
                      <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needed">Needed</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value) =>
                        setNewResource({ ...newResource, type: value })
                      }
                    >
                      <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {resourceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={newResource.name}
                      onChange={(e) =>
                        setNewResource({ ...newResource, name: e.target.value })
                      }
                      className="h-11 rounded-2xl border-black/10 bg-white"
                      placeholder="e.g. bottled water, blankets, antibiotics"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newResource.description}
                      onChange={(e) =>
                        setNewResource({ ...newResource, description: e.target.value })
                      }
                      className="min-h-28 rounded-[24px] border-black/10 bg-white resize-none"
                      placeholder="Add details, condition, quantity notes, or packaging information."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={newResource.quantity}
                        onChange={(e) =>
                          setNewResource({ ...newResource, quantity: e.target.value })
                        }
                        className="h-11 rounded-2xl border-black/10 bg-white"
                        placeholder="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Urgency</Label>
                      <Select
                        value={newResource.urgency_level}
                        onValueChange={(value) =>
                          setNewResource({ ...newResource, urgency_level: value })
                        }
                      >
                        <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white">
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

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={newResource.location}
                      onChange={(e) =>
                        setNewResource({ ...newResource, location: e.target.value })
                      }
                      className="h-11 rounded-2xl border-black/10 bg-white"
                      placeholder="District, area, or address"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddResource}>Save resource</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="glass-card">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <Input
                    placeholder="Search resources"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 rounded-2xl border-black/10 bg-white pl-10"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white md:w-56">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {resourceCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white md:w-44">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="needed">Needed</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="glass-card p-12 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />
              <p className="mt-4 text-sm text-text-muted">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="glass-card border-dashed border-black/15">
              <CardContent className="p-12 text-center">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {resources.length === 0 ? "No resources yet" : "No matches"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {resources.length === 0
                    ? "The shared resource list is empty right now."
                    : "Try changing the search term or filters."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="glass-card-elevated">
                  <CardContent className="p-6">
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="rounded-full border-black/10 bg-white text-text-secondary">
                              {resource.resource_type}
                            </Badge>
                            <Badge
                              className={
                                resource.urgency_level === "high"
                                  ? "rounded-full bg-black text-white"
                                  : resource.urgency_level === "medium"
                                    ? "rounded-full border-black/10 bg-black/[0.06] text-foreground"
                                    : "rounded-full border-black/10 bg-white text-text-secondary"
                              }
                            >
                              {resource.urgency_level}
                            </Badge>
                          </div>
                          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">
                            {resource.name}
                          </h2>
                          <p className="mt-1 text-sm text-text-secondary">
                            {resource.type}
                          </p>
                        </div>
                        <Package className="h-5 w-5 text-text-muted" />
                      </div>

                      <p className="text-sm leading-7 text-text-secondary">
                        {resource.description || "No additional description provided."}
                      </p>

                      <div className="rounded-[20px] border border-black/10 bg-white p-4 text-sm text-text-secondary">
                        <p>Quantity: {resource.quantity}</p>
                        <p className="mt-1">Location: {resource.location}</p>
                        <p className="mt-1">
                          Added: {new Date(resource.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-2 text-sm text-text-secondary">
                        <Users className="h-4 w-4" />
                        <span>{resource.contact_info || "Contact the poster directly"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
