"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RequestHelp() {
  const { token } = useAuth()
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
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 text-black/60 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
              Request Help
            </h1>
            <p className="text-black/60 text-lg">
              Describe your situation and connect with volunteers who can help
            </p>
          </div>

          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-black">
                Help Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ Request created successfully!</p>
                  <p className="text-green-700 text-sm mt-1">Redirecting to dashboard...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-black font-semibold">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Brief title for your request"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-black font-semibold">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your situation in detail"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-black font-semibold">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Your city or specific location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="urgency" className="text-black font-semibold">
                    Urgency Level
                  </Label>
                  <Select
                    value={formData.urgency_level}
                    onValueChange={(value) => setFormData({ ...formData, urgency_level: value })}
                  >
                    <SelectTrigger className="mt-2 border-black/20 focus:border-black">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait</SelectItem>
                      <SelectItem value="medium">Medium - Soon</SelectItem>
                      <SelectItem value="high">High - Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="photo" className="text-black font-semibold">
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
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-black/20 rounded-lg cursor-pointer hover:border-black/40 transition-colors"
                    >
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-black/40 mx-auto mb-2" />
                          <p className="text-black/60">Click to upload photo</p>
                          <p className="text-black/40 text-sm">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-black text-white hover:bg-black/90 py-6 text-lg font-semibold"
                >
                  {loading ? "Creating Request..." : success ? "Request Created!" : "Create Help Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
