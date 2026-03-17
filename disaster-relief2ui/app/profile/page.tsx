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
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <div className="w-full h-full bg-glass-02 border-2 border-accent-teal shadow-glow-teal/20 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/20 to-transparent" />
                <User className="w-12 h-12 text-accent-teal relative z-10" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full p-0 bg-accent-teal hover:bg-accent-teal/90 text-bg-void shadow-glow-teal z-20"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-4xl font-display font-black text-text-primary mb-1 tracking-wide">{user.username}</h1>
              <p className="text-text-muted font-mono">{user.email}</p>
            </div>
            <Badge className="px-5 py-1.5 uppercase font-mono tracking-widest bg-transparent border-accent-teal text-accent-teal shadow-[0_0_15px_rgba(45,212,191,0.15)]">
              {user.role === 'volunteer' ? 'RESPONDER_CLASSIFIED' : 'CIVILIAN_NETWORK'}
            </Badge>
          </div>

          {/* Success/Error Messages */}
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

          {/* Profile Information Card */}
          <Card className="glass-card">
            <CardHeader className="pb-4 border-b border-glass-border">
              <CardTitle className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary">
                <Settings className="w-6 h-6 text-accent-teal" />
                Dossier Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-accent-teal" />
                    Codename / Username
                  </Label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    disabled={!isEditing}
                    className="bg-bg-void border-glass-border text-text-primary focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-accent-teal" />
                    Comm Link (Email)
                  </Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-bg-void border-glass-border text-text-primary focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent-teal" />
                    Radio Frequency (Phone)
                  </Label>
                  <Input
                    type="tel"
                    value={profileData.phone_number}
                    onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-accent-teal" />
                    Clearance Level
                  </Label>
                  <div className="flex items-center h-12 px-4 rounded-md border border-glass-border bg-glass-02 text-text-muted font-mono uppercase text-sm tracking-widest">
                    {user.role === 'volunteer' ? 'Level 3: Field Operations' : 'Level 1: Civilian Reporting'}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-6 mt-4 border-t border-glass-border">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 btn-primary h-12 text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                        UPLOADING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        COMMIT MODIFICATIONS
                      </span>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="px-8 font-mono tracking-widest text-text-muted hover:text-text-primary hover:bg-glass-01 text-xs"
                  >
                    ABORT
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="glass-card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/5 via-transparent to-accent-blue/5 pointer-events-none" />
            <CardHeader className="pb-4 border-b border-glass-border bg-glass-01 relative z-10">
              <CardTitle className="text-xl font-display font-bold text-text-primary">Operational Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative z-10 mx-auto w-full">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-glass-border">
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-teal">{stats.daysActive}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Days Active</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-2xl font-display font-bold text-accent-teal flex items-center justify-center h-[40px] uppercase">
                    {user.role === 'volunteer' ? 'Helper' : 'Seeker'}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Primary Ops</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-amber">{stats.requestsMade}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Beacons Sent</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-blue">{stats.helpsOffered}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Assists Rendered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader className="pb-4 border-b border-glass-border">
                <CardTitle className="text-xl font-display font-bold text-text-primary">Control Terminal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 bg-bg-void border-glass-border text-text-primary hover:bg-glass-01 hover:text-accent-teal transition-all font-mono"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-5 h-5 mr-4 text-accent-teal" />
                  {isEditing ? 'Cancel Override' : 'Initialize Override'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-14 bg-bg-void border-glass-border text-text-primary hover:bg-glass-01 hover:text-accent-amber transition-all font-mono"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5 mr-4 text-text-muted group-hover:text-accent-amber transition-colors" />
                  Terminate Session
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="glass-card border-accent-red/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent-red/5 pointer-events-none" />
              <CardHeader className="pb-4 border-b border-accent-red/20 relative z-10">
                <CardTitle className="text-xl font-display font-bold text-accent-red flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  Hazard Sector
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full h-14 bg-accent-red/10 text-accent-red border border-accent-red/30 hover:bg-accent-red hover:text-white transition-all font-mono tracking-widest shadow-glow-red/20"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      PURGE DATA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-bg-base border-accent-red/50 shadow-glow-red/30">
                    <DialogHeader>
                      <DialogTitle className="text-accent-red flex items-center gap-3 font-display font-bold text-xl">
                        <AlertTriangle className="w-6 h-6" />
                        Execute Purge Sequence
                      </DialogTitle>
                      <DialogDescription className="text-text-secondary font-body py-2">
                        This operation is irreversible. All telemetry, history, and network access associated with this dossier will be permanently expunged.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-bg-void border border-glass-border rounded-lg">
                        <Label htmlFor="confirmation" className="text-xs font-mono text-accent-amber mb-3 block">
                          INITIALIZE CONFIRMATION CODE: <span className="font-bold">DELETE</span>
                        </Label>
                        <Input
                          id="confirmation"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Awaiting code..."
                          className="bg-bg-base border-glass-border focus-visible:ring-accent-red focus-visible:border-accent-red text-text-primary font-mono tracking-widest uppercase h-12"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-3 pt-4 border-t border-glass-border mt-4">
                      <Button variant="ghost" onClick={() => setShowDeleteDialog(false)} className="text-text-muted hover:text-text-primary hover:bg-glass-01 font-mono uppercase tracking-widest text-xs">
                        STAND DOWN
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmation !== "DELETE" || loading}
                        className="bg-accent-red hover:bg-accent-red/90 text-white font-display font-black tracking-wide disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            PURGING...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            CONFIRM PURGE
                          </span>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
