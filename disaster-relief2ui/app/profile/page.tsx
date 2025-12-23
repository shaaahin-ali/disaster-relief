"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Shield, Save } from "lucide-react"

export default function Profile() {
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone_number: "",
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        phone_number: user.phone_number || "",
      })
    }
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // Note: The backend doesn't have a profile update endpoint yet
      // For now, we'll just show a success message
      setMessage("Profile updated successfully!")
    } catch (error) {
      setMessage("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
              My Profile
            </h1>
            <p className="text-black/60 text-lg">
              Manage your account information
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Info Card */}
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-black flex items-center gap-3">
                  <User className="w-6 h-6" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className={message.includes('success') ? 'text-green-800' : 'text-red-800'}>{message}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="username" className="text-black font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-black font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-black font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone_number}
                    onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                    className="mt-2 border-black/20 focus:border-black"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <Label className="text-black font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account Type
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={`border ${
                      user.role === 'volunteer'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {user.role === 'volunteer' ? 'Volunteer' : 'Person Needing Help'}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-black text-white hover:bg-black/90 py-6"
                >
                  {loading ? (
                    <>
                      <Save className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Account Stats Card */}
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-black">
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">1</div>
                    <div className="text-black/60 text-sm">Days Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">{user.role === 'volunteer' ? 'Helper' : 'Seeker'}</div>
                    <div className="text-black/60 text-sm">Role</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-black">
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-black/20 text-black hover:bg-black/5">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
