"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Phone, Shield, Save, LogOut, Trash2, Edit3, Camera, AlertTriangle, CheckCircle, Settings } from "lucide-react"

export default function Profile() {
  const { user, token, logout, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone_number: "",
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [stats, setStats] = useState({
    daysActive: 0,
    requestsMade: 0,
    helpsOffered: 0
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  const fetchUserStats = async () => {
    if (!user || !token) return

    try {
      // Calculate days since registration (assuming created_at is available)
      const daysActive = Math.max(1, Math.floor((Date.now() - new Date(user.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24)))

      // Fetch user requests
      const requestsResponse = await fetch(`${API_BASE_URL}/request/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      let requestsMade = 0
      let helpsOffered = 0

      if (requestsResponse.ok) {
        const allRequests = await requestsResponse.json()

        if (user.role === 'user') {
          // Count user's own requests
          requestsMade = allRequests.filter((req: any) => req.user_id === user.id).length
        } else if (user.role === 'volunteer') {
          // Count helps offered by volunteer
          helpsOffered = allRequests.reduce((count: number, req: any) => {
            if (req.volunteers) {
              return count + req.volunteers.filter((vol: any) => vol.id === user.id).length
            }
            return count
          }, 0)
        }
      }

      setStats({
        daysActive,
        requestsMade,
        helpsOffered
      })
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    }
  }

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        phone_number: user.phone_number || "",
      })
      fetchUserStats()
    }
  }, [user, isLoading, router])

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // TODO: Implement actual profile update endpoint in backend
      // For now, we'll simulate the update
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      setMessage("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return

    setLoading(true)
    try {
      // TODO: Implement account deletion endpoint
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        logout()
        // Redirect to home page
        window.location.href = '/'
      } else {
        setMessage("Failed to delete account")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
      setShowDeleteDialog(false)
    }
  }

  const handleSignOut = () => {
    logout()
    window.location.href = '/'
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-primary hover:bg-primary/90"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{user.username}</h1>
              <p className="text-muted-foreground text-lg">{user.email}</p>
            </div>
            <Badge variant="secondary" className="px-4 py-1">
              {user.role === 'volunteer' ? 'Volunteer' : 'Person Needing Help'}
            </Badge>
          </div>

          {/* Success/Error Messages */}
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

          {/* Profile Information Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Settings className="w-6 h-6 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    value={profileData.phone_number}
                    onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account Role
                  </Label>
                  <div className="flex items-center h-10">
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {user.role === 'volunteer' ? 'Community Volunteer' : 'Help Seeker'}
                    </Badge>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-border hover:bg-accent transition-colors"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-3 text-primary" />
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-border hover:bg-accent transition-colors"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="shadow-lg border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full h-12 bg-destructive hover:bg-destructive/90"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-destructive flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Delete Account
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="confirmation" className="text-sm font-medium">
                          Type "DELETE" to confirm:
                        </Label>
                        <Input
                          id="confirmation"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="DELETE"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2">
                      <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmation !== "DELETE" || loading}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-destructive-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Account Statistics */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground">Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{stats.daysActive}</div>
                  <div className="text-sm text-muted-foreground">Days Active</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {user.role === 'volunteer' ? 'Helper' : 'Seeker'}
                  </div>
                  <div className="text-sm text-muted-foreground">Your Role</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{stats.requestsMade}</div>
                  <div className="text-sm text-muted-foreground">Requests Made</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{stats.helpsOffered}</div>
                  <div className="text-sm text-muted-foreground">Helps Given</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
