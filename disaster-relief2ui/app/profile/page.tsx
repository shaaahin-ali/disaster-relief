"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Edit3,
  Award,
  Calendar,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Beams from "@/components/ui/beams";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Profile() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    daysActive: 0,
    requestsMade: 0,
    helpsOffered: 0,
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchUserStats = async () => {
    if (!user || !token) return;

    try {
      const daysActive = Math.max(
        1,
        Math.floor(
          (Date.now() - new Date(user.created_at || Date.now()).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      );

      const requestsResponse = await fetch(`${API_BASE_URL}/request/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let requestsMade = 0;
      let helpsOffered = 0;

      if (requestsResponse.ok) {
        const allRequests = await requestsResponse.json();

        if (user.role === "user") {
          requestsMade = allRequests.filter(
            (request: any) => request.user_id === user.id,
          ).length;
        } else if (user.role === "volunteer") {
          helpsOffered = allRequests.reduce((count: number, request: any) => {
            if (request.volunteers) {
              return (
                count +
                request.volunteers.filter(
                  (volunteer: any) => volunteer.id === user.id,
                ).length
              );
            }
            return count;
          }, 0);
        }
      }

      setStats({
        daysActive,
        requestsMade,
        helpsOffered,
      });
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        phone_number: user.phone_number || "",
      });
      fetchUserStats();
    }
  }, [user, isLoading, router]);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        logout();
        window.location.href = "/";
      } else {
        setMessage("Failed to delete account.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSignOut = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Beams Background */}
      <div className="fixed inset-0 z-0">
        <Beams
          beamWidth={2}
          beamHeight={20}
          beamNumber={10}
          lightColor="#8b5cf6"
          speed={1.5}
          noiseIntensity={1.5}
          scale={0.15}
          rotation={0}
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      <Navigation />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <motion.section variants={itemVariants} className="mb-10">
            <div className="glass-card rounded-3xl p-8 md:p-10 overflow-hidden relative">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-mono text-sm uppercase tracking-widest text-text-accent mb-2"
                  >
                    Profile
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-display text-3xl md:text-4xl font-bold text-white"
                  >
                    {user.username}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 text-text-secondary"
                  >
                    {user.email} · Member since{" "}
                    {new Date(
                      user.created_at || Date.now(),
                    ).toLocaleDateString()}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Badge className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 text-white border-white/20">
                    {user?.role === "volunteer" ? (
                      <>
                        <Award className="mr-2 h-4 w-4 text-amber-400" />{" "}
                        Volunteer
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4 text-blue-400" /> User
                      </>
                    )}
                  </Badge>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Message Alert */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert
                className={`border-white/10 ${message.includes("successfully") ? "bg-emerald-500/10" : "bg-red-500/10"} text-white rounded-2xl`}
              >
                {message.includes("successfully") ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                )}
                <AlertDescription className="text-white/90">
                  {message}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Personal Information Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="glass-card border-white/5 rounded-3xl overflow-hidden h-full">
                <CardHeader className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="font-display text-2xl font-semibold text-white flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5">
                        <User className="h-5 w-5 text-violet-400" />
                      </div>
                      Personal Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        isEditing ? setIsEditing(false) : setIsEditing(true)
                      }
                      className={`rounded-full border-white/10 ${isEditing ? "bg-white/10" : "bg-white/5 hover:bg-white/10"} text-white`}
                    >
                      <Edit3 className="mr-2 h-4 w-4" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-text-secondary">
                        <User className="h-4 w-4" />
                        Username
                      </Label>
                      <Input
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            username: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:ring-violet-500/20"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-text-secondary">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:ring-violet-500/20"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-text-secondary">
                        <Phone className="h-4 w-4" />
                        Phone number
                      </Label>
                      <Input
                        type="tel"
                        value={profileData.phone_number}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone_number: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder="+1 (555) 000-0000"
                        className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:ring-violet-500/20"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-text-secondary">
                        <Shield className="h-4 w-4" />
                        Role
                      </Label>
                      <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/70">
                        {user?.role === "volunteer" ? "Volunteer" : "User"}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/10"
                    >
                      <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "Saving..." : "Save changes"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Activity Stats */}
              <Card className="glass-card border-white/5 rounded-3xl overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="font-display text-xl font-semibold text-white flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5">
                      <Activity className="h-5 w-5 text-emerald-400" />
                    </div>
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid gap-3">
                    {[
                      {
                        label: "Days active",
                        value: stats.daysActive,
                        icon: <Calendar className="h-4 w-4" />,
                      },
                      {
                        label: "Requests made",
                        value: stats.requestsMade,
                        icon: <User className="h-4 w-4" />,
                      },
                      {
                        label: "Helps offered",
                        value: stats.helpsOffered,
                        icon: <Award className="h-4 w-4" />,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3 text-text-secondary">
                          <div className="p-1.5 rounded-lg bg-white/5">
                            {stat.icon}
                          </div>
                          {stat.label}
                        </div>
                        <p className="font-display text-2xl font-semibold text-white">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="glass-card border-white/5 rounded-3xl overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-5">
                  <CardTitle className="font-display text-xl font-semibold text-white">
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white h-12"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-3 h-4 w-4 text-text-secondary" />
                    Sign out
                  </Button>

                  <Dialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full justify-start rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 h-12"
                      >
                        <Trash2 className="mr-3 h-4 w-4" />
                        Delete account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-white/10 bg-black/95 backdrop-blur-xl text-white rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-semibold text-white">
                          Delete account
                        </DialogTitle>
                        <DialogDescription className="text-text-secondary">
                          This action cannot be undone. Type DELETE to confirm.
                        </DialogDescription>
                      </DialogHeader>

                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="DELETE"
                        className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />

                      <DialogFooter className="gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowDeleteDialog(false)}
                          className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== "DELETE" || loading}
                          className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
                        >
                          {loading ? "Deleting..." : "Confirm delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
