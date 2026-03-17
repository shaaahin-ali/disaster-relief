"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Heart,
  MapPin,
  Clock,
  AlertCircle,
  User,
  Users,
  Trash2,
  Phone,
  Mail,
  Package,
} from "lucide-react";

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
        // Filter requests by current user
        const userRequests = allRequests.filter(
          (req: HelpRequest) => req.user_id === user?.id,
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
        setRequests(requests.filter((req) => req.id !== requestId));
      } else {
        alert("Failed to delete request");
      }
    } catch (error) {
      console.error("Failed to delete request:", error);
      alert("Network error. Please try again.");
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero">
              Welcome back,{" "}
              <span className="text-accent-teal">{user.username}</span>
            </h1>
            <p className="text-text-secondary text-xl font-body max-w-2xl mx-auto">
              Manage your help requests and connect with our amazing community
              of volunteers
            </p>
          </div>

          {/* Quick Actions (Bento Grid) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer"
              onClick={() => (window.location.href = "/request-help")}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-teal/10 rounded-xl flex items-center justify-center group-hover:bg-accent-teal/20 transition-colors">
                    <Plus className="w-7 h-7 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-teal transition-colors">
                      Request Help
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      Create a new request
                    </p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button className="w-full h-12 btn-primary border-none shadow-glow-teal/50 truncate">
                    Create Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer"
              onClick={() => (window.location.href = "/all-requests")}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center group-hover:bg-accent-amber/20 transition-colors">
                    <Heart className="w-7 h-7 text-accent-amber" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-amber transition-colors">
                      Browse Help
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      See active requests
                    </p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full h-12 btn-secondary border-accent-amber/30 text-accent-amber hover:bg-accent-amber/10 hover:text-accent-amber"
                  >
                    View Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer"
              onClick={() => (window.location.href = "/resources")}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-blue/10 rounded-xl flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                    <Package className="w-7 h-7 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                      Resources
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      Share/request items
                    </p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full h-12 btn-secondary border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 hover:text-accent-blue"
                  >
                    Browse Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer"
              onClick={() => (window.location.href = "/profile")}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-teal/10 rounded-xl flex items-center justify-center group-hover:bg-accent-teal/20 transition-colors">
                    <User className="w-7 h-7 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-teal transition-colors">
                      My Profile
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      Manage settings
                    </p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full h-12 btn-secondary border-accent-teal/30 text-accent-teal hover:bg-accent-teal/10 hover:text-accent-teal"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User's Help Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <div>
                <h2 className="text-3xl font-display font-bold text-text-primary mb-2">
                  My Help Requests
                </h2>
                <p className="text-text-secondary font-body">
                  Track and manage your active requests
                </p>
              </div>
              <Button
                onClick={() => (window.location.href = "/request-help")}
                className="btn-primary h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                  <p className="text-text-muted font-mono tracking-widest uppercase">
                    Initializing Secure Link...
                  </p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <Card className="glass-card border-dashed border-2 border-glass-border/50">
                <CardContent className="p-16 text-center space-y-6">
                  <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                    <AlertCircle className="w-10 h-10 text-text-muted" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                      No Active Requests
                    </h3>
                    <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                      You haven't broadcasted any requests on the network. Start
                      by creating a secure beacon for help.
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/request-help")}
                      className="btn-primary h-12 px-8"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Initialize Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {requests.map((request) => (
                  <Card
                    key={request.id}
                    className="glass-card-elevated hover:bg-glass-02 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                        <div className="flex-1 space-y-4 w-full">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-display font-bold text-text-primary line-clamp-1">
                                  {request.title}
                                </h3>
                                <Badge
                                  className={`uppercase tracking-label font-mono bg-transparent border ${
                                    request.urgency_level === "high"
                                      ? "border-accent-red text-accent-red"
                                      : request.urgency_level === "medium"
                                        ? "border-accent-amber text-accent-amber"
                                        : "border-accent-teal text-accent-teal"
                                  }`}
                                >
                                  {request.urgency_level} Priority
                                </Badge>
                              </div>
                              <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">
                                {request.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-muted">
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <MapPin className="w-4 h-4 text-accent-teal" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <Clock className="w-4 h-4 text-accent-teal" />
                                  <span>
                                    {new Date(
                                      request.created_at,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <User className="w-4 h-4 text-accent-teal" />
                                  <span>ID #{request.id}</span>
                                </div>
                              </div>
                            </div>

                            {request.photo && (
                              <div className="flex-shrink-0">
                                <img
                                  src={`${API_BASE_URL}/uploads/${request.photo}`}
                                  alt="Request evidence"
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border border-glass-border shadow-card"
                                />
                              </div>
                            )}
                          </div>

                          {/* Contact Info */}
                          {request.user && (
                            <div className="bg-glass-01 border border-glass-border rounded-xl p-4 mt-4">
                              <p className="text-xs uppercase tracking-label font-bold text-accent-teal mb-3">
                                Origin Contact Data
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono text-text-secondary">
                                <p className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-text-muted" />
                                  {request.user.email}
                                </p>
                                {request.user.phone_number && (
                                  <p className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-text-muted" />
                                    {request.user.phone_number}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Volunteers */}
                          {request.volunteers &&
                            request.volunteers.length > 0 && (
                              <div className="bg-gradient-to-r from-accent-teal/10 to-transparent border-l-4 border-accent-teal rounded-r-xl p-4 mt-4">
                                <p className="text-sm font-bold text-text-primary flex items-center gap-2 mb-3">
                                  <Users className="w-4 h-4 text-accent-teal" />
                                  Active Responders ({request.volunteers.length}
                                  )
                                </p>
                                <div className="space-y-2">
                                  {request.volunteers.map((volunteer) => (
                                    <div
                                      key={volunteer.id}
                                      className="bg-glass-01 border border-glass-border rounded-lg p-3"
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div>
                                          <p className="font-bold text-text-primary text-sm flex items-center gap-2">
                                            {volunteer.username}
                                            <Badge
                                              variant="outline"
                                              className="text-[10px] h-4 bg-accent-teal/10 text-accent-teal border-accent-teal/20"
                                            >
                                              VERIFIED
                                            </Badge>
                                          </p>
                                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-text-muted mt-1.5">
                                            <p className="flex items-center">
                                              <Mail className="w-3 h-3 mr-1.5" />
                                              {volunteer.email}
                                            </p>
                                            {volunteer.phone_number && (
                                              <p className="flex items-center">
                                                <Phone className="w-3 h-3 mr-1.5" />
                                                {volunteer.phone_number}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        {volunteer.applied_at && (
                                          <div className="text-xs font-mono text-text-muted">
                                            Match TS:{" "}
                                            {new Date(
                                              volunteer.applied_at,
                                            ).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Actions Col */}
                        <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-glass-border md:pl-6 justify-between md:justify-start">
                          <div className="text-center md:text-right w-full mb-2 hidden md:block">
                            <Badge className="bg-glass-02 text-text-primary border-glass-border">
                              ACTIVE
                            </Badge>
                          </div>

                          <Button
                            variant="outline"
                            className="bg-transparent border-glass-border-strong text-text-primary hover:bg-glass-02 flex-1 md:flex-none"
                            onClick={() =>
                              (window.location.href = `/request-help?id=${request.id}`)
                            }
                          >
                            Edit Beacon
                          </Button>

                          <Button
                            onClick={() => deleteRequest(request.id)}
                            variant="ghost"
                            className="bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white border border-accent-red/20 flex-1 md:flex-none"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
