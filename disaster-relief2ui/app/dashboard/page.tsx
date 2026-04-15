"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  Mail,
  MapPin,
  Plus,
  Trash2,
  User,
  Users,
  Phone,
  ArrowRight,
  Heart,
  Bell,
  Shield,
  Zap,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

interface HelpRequest {
  id: number;
  title: string;
  description: string;
  location: string;
  urgency_level: string;
  photo?: string;
  created_at: string;
  user_id: number;
  user?: {
    id: number;
    username: string;
    email: string;
    phone_number?: string;
  };
  volunteers?: Array<{
    id: number;
    username: string;
    email: string;
    phone_number?: string;
    applied_at?: string;
  }>;
}

const ACTIONS = [
  {
    title: "Request help",
    description: "Create a new request when you need support.",
    href: "/request-help",
    icon: <Heart className="h-5 w-5" />,
    gradient: "from-rose-500/20 to-orange-500/20",
    color: "text-rose-400",
  },
  {
    title: "Browse requests",
    description: "Review requests across the community.",
    href: "/all-requests",
    icon: <Bell className="h-5 w-5" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "text-blue-400",
  },
  {
    title: "Resources",
    description: "Share or browse available supplies.",
    href: "/resources",
    icon: <Shield className="h-5 w-5" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "text-emerald-400",
  },
  {
    title: "Profile",
    description: "Update your account details.",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
    gradient: "from-violet-500/20 to-purple-500/20",
    color: "text-violet-400",
  },
];

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
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Dashboard() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    if (token && user) {
      fetchUserRequests();
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [token, user, isLoading, router]);

  const fetchUserRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const allRequests = await response.json();
        const userRequests = allRequests.filter(
          (request: HelpRequest) => request.user_id === user?.id,
        );
        setRequests(userRequests);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (requestId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this request? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/${requestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((request) => request.id !== requestId));
      } else {
        alert("Failed to delete request");
      }
    } catch (error) {
      console.error("Failed to delete request:", error);
      alert("Network error. Please try again.");
    }
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
    <div className="relative min-h-screen bg-black text-white">
      {/* Ethereal background */}
      <EtherealShadow
        color1="rgba(139, 92, 246, 0.12)"
        color2="rgba(59, 130, 246, 0.08)"
        color3="rgba(16, 185, 129, 0.06)"
        speed={0.8}
      />

      <Navigation />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-mono text-sm uppercase tracking-widest text-text-accent mb-2"
                    >
                      Dashboard
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                    >
                      Welcome back, {user.username}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-3 text-text-secondary max-w-lg"
                    >
                      Manage your requests, track volunteer responses, and coordinate relief efforts in real-time.
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={() => router.push("/request-help")}
                      className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full font-medium"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </motion.div>
                </div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Your Requests", value: requests.length, icon: <Bell className="h-4 w-4" /> },
                    { label: "Volunteers", value: requests.reduce((acc, r) => acc + (r.volunteers?.length || 0), 0), icon: <Users className="h-4 w-4" /> },
                    { label: "High Priority", value: requests.filter(r => r.urgency_level === "high").length, icon: <Zap className="h-4 w-4" /> },
                    { label: "Resolved", value: 0, icon: <Heart className="h-4 w-4" /> },
                  ].map((stat, index) => (
                    <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2 text-text-secondary">
                        {stat.icon}
                        <span className="text-xs uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Action Cards */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
              Quick Actions
              <ArrowRight className="h-5 w-5 text-text-secondary" />
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ACTIONS.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(action.href)}
                  className="group relative overflow-hidden rounded-2xl glass-card p-6 text-left transition-all"
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`mb-4 inline-flex p-3 rounded-xl bg-white/5 ${action.color}`}>
                      {action.icon}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Get started
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* My Requests Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white mb-1">
                  Your Requests
                </h2>
                <p className="text-text-secondary text-sm">
                  {requests.length === 0 ? "No active requests" : `${requests.length} active request${requests.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/request-help")}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-white" />
                <p className="mt-4 text-sm text-text-secondary">Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 mb-6">
                    <AlertCircle className="h-8 w-8 text-violet-400" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">
                    No requests yet
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-text-secondary mb-6">
                    When you submit a help request, it will appear here along with volunteer activity and contact information.
                  </p>
                  <Button
                    onClick={() => router.push("/request-help")}
                    className="bg-white text-black hover:bg-white/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <Card className="glass-card-elevated border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <h3 className="font-display text-xl font-semibold text-white">
                                {request.title}
                              </h3>
                              <Badge
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                  request.urgency_level === "high"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : request.urgency_level === "medium"
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                }`}
                              >
                                {request.urgency_level} priority
                              </Badge>
                            </div>

                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                              {request.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-text-secondary">
                                <MapPin className="h-3 w-3" />
                                {request.location}
                              </div>
                              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-text-secondary">
                                <Clock className="h-3 w-3" />
                                {new Date(request.created_at).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-text-secondary">
                                <User className="h-3 w-3" />
                                ID #{request.id}
                              </div>
                            </div>

                            {request.user && (
                              <div className="rounded-xl bg-white/5 p-4 mb-4">
                                <p className="text-xs uppercase tracking-wider text-text-secondary mb-2">
                                  Contact Details
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                                  <span className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {request.user.email}
                                  </span>
                                  {request.user.phone_number && (
                                    <span className="flex items-center gap-2">
                                      <Phone className="h-4 w-4" />
                                      {request.user.phone_number}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {request.volunteers && request.volunteers.length > 0 && (
                              <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 p-4">
                                <p className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                                  <Users className="h-4 w-4 text-violet-400" />
                                  {request.volunteers.length} volunteer{request.volunteers.length !== 1 ? 's' : ''} responding
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {request.volunteers.slice(0, 3).map((volunteer) => (
                                    <div
                                      key={volunteer.id}
                                      className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                                    >
                                      <User className="h-3 w-3" />
                                      {volunteer.username}
                                    </div>
                                  ))}
                                  {request.volunteers.length > 3 && (
                                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">
                                      +{request.volunteers.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                            <Button
                              variant="outline"
                              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"
                              onClick={() => router.push(`/request-help?id=${request.id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 rounded-xl"
                              onClick={() => deleteRequest(request.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        {request.photo && (
                          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                            <img
                              src={`${API_BASE_URL}/uploads/${request.photo}`}
                              alt="Request evidence"
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
}
