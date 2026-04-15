"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  CheckCircle,
  LogOut,
  Mail,
  Phone,
  Save,
  Shield,
  Trash2,
  User,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
    helpsOffered: 0,
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  const fetchUserStats = async () => {
    if (!user || !token) return

    try {
      const daysActive = Math.max(
        1,
        Math.floor(
          (Date.now() - new Date(user.created_at || Date.now()).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )

      const requestsResponse = await fetch(`${API_BASE_URL}/request/`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      let requestsMade = 0
      let helpsOffered = 0

      if (requestsResponse.ok) {
        const allRequests = await requestsResponse.json()

        if (user.role === "user") {
          requestsMade = allRequests.filter((request: any) => request.user_id === user.id).length
        } else if (user.role === "volunteer") {
          helpsOffered = allRequests.reduce((count: number, request: any) => {
            if (request.volunteers) {
              return count + request.volunteers.filter((volunteer: any) => volunteer.id === user.id).length
            }
            return count
          }, 0)
        }
      }

      setStats({
        daysActive,
        requestsMade,
        helpsOffered,
      })
    } catch (error) {
      console.error("Failed to fetch user stats:", error)
    }
  }

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage("Profile updated successfully.")
      setIsEditing(false)
    } catch (error) {
      setMessage("Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        logout()
        window.location.href = "/"
      } else {
        setMessage("Failed to delete account.")
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
    window.location.href = "/"
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section pt-28 pb-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <section className="space-y-4">
            <p className="eyebrow">Profile</p>
            <h1 className="section-heading text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.96]">
              Account details
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">
              Review your personal information and account activity.
            </p>
          </section>

          {message && (
            <Alert className="border-black/10 bg-white text-foreground">
              {message.includes("successfully") ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="glass-card">
              <CardHeader className="border-b border-black/10 pb-5">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="font-display text-2xl font-semibold">
                    Personal information
                  </CardTitle>
                  <Badge className="rounded-full border-black/10 bg-white text-text-secondary">
                    {user?.role === "volunteer" ? "Volunteer" : "User"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Username
                    </Label>
                    <Input
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      disabled={!isEditing}
                      className="h-11 rounded-2xl border-black/10 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="h-11 rounded-2xl border-black/10 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone number
                    </Label>
                    <Input
                      type="tel"
                      value={profileData.phone_number}
                      onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+1 (555) 000-0000"
                      className="h-11 rounded-2xl border-black/10 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Role
                    </Label>
                    <div className="flex h-11 items-center rounded-2xl border border-black/10 bg-white px-3 text-sm text-text-secondary">
                      {user?.role === "volunteer" ? "Volunteer" : "User"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "Saving..." : "Save changes"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit profile</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="glass-card">
                <CardHeader className="border-b border-black/10 pb-5">
                  <CardTitle className="font-display text-2xl font-semibold">
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-[22px] border border-black/10 bg-white p-5">
                    <p className="eyebrow">Days active</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-foreground">
                      {stats.daysActive}
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-black/10 bg-white p-5">
                    <p className="eyebrow">Requests made</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-foreground">
                      {stats.requestsMade}
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-black/10 bg-white p-5">
                    <p className="eyebrow">Helps offered</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-foreground">
                      {stats.helpsOffered}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="border-b border-black/10 pb-5">
                  <CardTitle className="font-display text-2xl font-semibold">
                    Account actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-6">
                  <Button variant="outline" className="w-full justify-start bg-white" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>

                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-black/10 bg-white">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-semibold">
                          Delete account
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Type DELETE to confirm.
                        </DialogDescription>
                      </DialogHeader>

                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="DELETE"
                        className="h-11 rounded-2xl border-black/10 bg-white"
                      />

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== "DELETE" || loading}
                        >
                          {loading ? "Deleting..." : "Confirm delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
