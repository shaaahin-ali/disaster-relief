"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Phone,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  has_applied?: boolean;
}

export default function AllRequests() {
  const { token, user, isLoading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [applyingTo, setApplyingTo] = useState<number | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    if (token) {
      fetchRequests();
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [token, user, isLoading, router]);

  useEffect(() => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (urgencyFilter !== "all") {
      filtered = filtered.filter(
        (request) => request.urgency_level === urgencyFilter,
      );
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, urgencyFilter]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyToRequest = async (requestId: number) => {
    if (!user || user.role !== "volunteer") {
      return;
    }

    setApplyingTo(requestId);

    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((request) => request.id !== requestId));
        alert("Application submitted successfully.");
      } else {
        const error = await response.json();
        alert(`Failed to apply: ${error.detail}`);
      }
    } catch (error) {
      console.error("Failed to apply to request:", error);
      alert("Network error. Please try again.");
    } finally {
      setApplyingTo(null);
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

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section pt-28 pb-12">
        <div className="space-y-8">
          <section className="space-y-4">
            <p className="eyebrow">All requests</p>
            <h1 className="section-heading text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.96]">
              Community requests
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">
              Browse help requests, filter by urgency, and respond if you are
              signed in as a volunteer.
            </p>
          </section>

          <Card className="glass-card">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <Input
                    placeholder="Search by title, description, or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 rounded-2xl border-black/10 bg-white pl-10"
                  />
                </div>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white md:w-56">
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All urgency levels</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="glass-card p-12 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />
              <p className="mt-4 text-sm text-text-muted">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <Card className="glass-card border-dashed border-black/15">
              <CardContent className="p-12 text-center">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {requests.length === 0 ? "No requests found" : "No matches"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {requests.length === 0
                    ? "There are no active requests right now."
                    : "Try changing the search or urgency filter."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="glass-card-elevated overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-foreground">
                            {request.title}
                          </h2>
                          <p className="mt-1 text-sm text-text-secondary">
                            {request.description}
                          </p>
                        </div>
                        <Badge
                          className={
                            request.urgency_level === "high"
                              ? "rounded-full bg-black text-white"
                              : request.urgency_level === "medium"
                                ? "rounded-full border-black/10 bg-black/[0.06] text-foreground"
                                : "rounded-full border-black/10 bg-white text-text-secondary"
                          }
                        >
                          {request.urgency_level}
                        </Badge>
                      </div>

                      <div className="space-y-2 rounded-[20px] border border-black/10 bg-white p-4 text-sm text-text-secondary">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {request.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Request #{request.id}
                        </p>
                      </div>

                      {user?.role === "volunteer" && request.user && (
                        <div className="rounded-[20px] border border-black/10 bg-black/[0.03] p-4 text-sm text-text-secondary">
                          <p className="mb-2 font-medium text-foreground">
                            Contact
                          </p>
                          <p>{request.user.username}</p>
                          {request.user.phone_number && (
                            <p className="mt-1 flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {request.user.phone_number}
                            </p>
                          )}
                          <p className="mt-1">{request.user.email}</p>
                        </div>
                      )}

                      {request.photo && (
                        <div className="overflow-hidden rounded-[20px] border border-black/10">
                          <img
                            src={`${API_BASE_URL}/uploads/${request.photo}`}
                            alt="Request evidence"
                            className="h-44 w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="mt-auto flex gap-3 pt-2">
                        {user?.role === "volunteer" && user.id !== request.user_id && (
                          <Button
                            className="flex-1"
                            disabled={applyingTo === request.id || request.has_applied}
                            onClick={() => applyToRequest(request.id)}
                          >
                            {request.has_applied ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Applied
                              </>
                            ) : applyingTo === request.id ? (
                              "Applying..."
                            ) : (
                              <>
                                <Heart className="mr-2 h-4 w-4" />
                                Volunteer
                              </>
                            )}
                          </Button>
                        )}

                        {user?.id === request.user_id && (
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => deleteRequest(request.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
