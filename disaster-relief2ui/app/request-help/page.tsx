"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload, ArrowLeft, MapPin } from "lucide-react"

export default function RequestHelp() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    urgency_level: "medium",
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }
  }, [user, isLoading, router])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("urgency_level", formData.urgency_level)

      if (photoFile) {
        formDataToSend.append("photo", photoFile)
      }

      const response = await fetch(`${API_BASE_URL}/request/request-help`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to create request")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="absolute left-6 top-24 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Request Help
            </h1>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Share your situation and connect with compassionate volunteers ready to help
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Community Support</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>24/7 Assistance</span>
              </div>
            </div>
          </div>

          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                Help Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ Request created successfully!</p>
                  <p className="text-green-700 text-sm mt-1">Redirecting to dashboard...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Brief title for your request"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-background border-input focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your situation in detail. Include what kind of help you need and any specific requirements."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background border-input focus:border-primary transition-colors min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                      placeholder="Your city or specific address"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="bg-background border-input focus:border-primary transition-colors"
                    required
                  />
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                    Urgency Level
                  </Label>
                  <Select
                    value={formData.urgency_level}
                    onValueChange={(value) => setFormData({ ...formData, urgency_level: value })}
                  >
                      <SelectTrigger className="bg-background border-input focus:border-primary transition-colors">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">🟢 Low - Can wait</SelectItem>
                        <SelectItem value="medium">🟡 Medium - Soon</SelectItem>
                        <SelectItem value="high">🔴 High - Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary" />
                    Photo (Optional)
                  </Label>
                  <div className="mt-2">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-full">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium">Click to upload photo</p>
                            <p className="text-muted-foreground text-sm">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-lg font-semibold rounded-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-3" />
                      Creating Request...
                    </>
                  ) : success ? (
                    <>
                      <AlertCircle className="w-5 h-5 mr-3" />
                      Request Created!
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 mr-3" />
                      Create Help Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
