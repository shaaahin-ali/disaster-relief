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

  const disasterTypes = [
    "Flood",
    "Earthquake",
    "Landslide",
    "Cyclone/Hurricane",
    "Fire/Wildfire",
    "Tsunami",
    "Drought",
    "Medical Emergency",
    "Food Shortage",
    "Water Crisis",
    "Accident",
    "Other"
  ]


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
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-red/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="absolute left-6 top-24 text-text-muted hover:text-text-primary hover:bg-glass-01 transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK_TO_HQ
            </Button>

            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Initialize <span className="text-accent-red">Beacon</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-xl mx-auto">
                Transmit your situation to the network. Nearby responders will be notified instantly.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Network Active</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Fast Response</span>
              </div>
            </div>
          </div>

          <Card className="glass-card border-t-4 border-t-accent-red">
            <CardHeader className="pb-4 border-b border-glass-border bg-glass-01">
              <CardTitle className="text-2xl font-display font-bold text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-red/10 border border-accent-red/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-accent-red" />
                </div>
                Signal Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {error && (
                <div className="p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                  <p className="text-accent-red font-mono text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-accent-teal/10 border border-accent-teal/30 rounded-lg">
                  <div className="text-accent-teal font-display font-bold flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-accent-teal rounded-full animate-ping" />
                    SIGNAL BROADCASTED SUCCESSFULLY
                  </div>
                  <p className="text-text-muted font-mono text-xs">Rerouting to command center...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <span className="text-accent-red">*</span> Signal Subject
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    list="disaster-suggestions"
                    placeholder="Brief description (e.g., Flood Evacuation Required)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red focus-visible:border-accent-red h-12 font-body"
                    required
                  />
                  <datalist id="disaster-suggestions">
                    {disasterTypes.map((type) => (
                      <option key={type} value={type} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <span className="text-accent-red">*</span> Detailed Telemetry
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide exact details of the situation. Include headcount, specific hazards, and critical needs."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red focus-visible:border-accent-red min-h-[160px] resize-none font-body"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-red">*</span> Exact Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, District, or Coordinates"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red pl-10 h-12 font-body"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      Threat Level
                    </Label>
                    <Select
                      value={formData.urgency_level}
                      onValueChange={(value) => setFormData({ ...formData, urgency_level: value })}
                    >
                      <SelectTrigger className="bg-bg-void border-glass-border text-text-primary focus:ring-accent-red h-12 font-mono uppercase text-sm">
                        <SelectValue placeholder="Select Threat Level" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        <SelectItem value="low" className="focus:bg-glass-01 focus:text-accent-teal">🟢 LOW - Stable condition</SelectItem>
                        <SelectItem value="medium" className="focus:bg-glass-01 focus:text-accent-amber">🟡 MEDIUM - Imminent risk</SelectItem>
                        <SelectItem value="high" className="focus:bg-glass-01 focus:text-accent-red font-bold">🔴 CRITICAL - Immediate life threat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="photo" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    Visual Evidence (Optional)
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
                      className="flex items-center justify-center w-full h-40 border-2 border-dashed border-glass-border-strong rounded-xl cursor-pointer hover:border-accent-teal/50 hover:bg-glass-01 transition-all duration-300 group"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-full p-2">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg border border-glass-border"
                          />
                          <div className="absolute inset-0 bg-bg-void/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm m-2">
                            <Upload className="w-6 h-6 text-white" />
                            <span className="ml-2 text-sm font-mono text-white">REPLACE_IMAGE</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <div className="w-12 h-12 bg-glass-02 rounded-full flex items-center justify-center mx-auto border border-glass-border group-hover:bg-accent-teal/10 group-hover:border-accent-teal/30 transition-colors">
                            <Upload className="w-5 h-5 text-text-muted group-hover:text-accent-teal transition-colors" />
                          </div>
                          <div>
                            <p className="text-text-primary font-display font-medium">Click to attach visual data</p>
                            <p className="text-text-muted text-xs font-mono mt-1 uppercase tracking-widest">PNG, JPG (MAX 5MB)</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-glass-border">
                  <Button
                    type="submit"
                    disabled={loading || success}
                    className={`w-full h-16 text-lg font-display font-black rounded-xl border-none tracking-wide transition-all ${success ? 'bg-accent-teal text-bg-void' :
                      loading ? 'bg-glass-02 text-text-muted cursor-not-allowed border border-glass-border' :
                        'bg-accent-red hover:bg-accent-red/90 text-white shadow-glow-red hover:shadow-glow-red/120'
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-3 font-mono text-sm tracking-widest uppercase">
                        <div className="w-5 h-5 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-bg-void rounded-full animate-pulse" />
                        BROADCAST ACTIVE
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6" />
                        BROADCAST EMERGENCY SIGNAL
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
