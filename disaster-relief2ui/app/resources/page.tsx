"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Package,
  Search,
  TriangleAlert,
  Users,
  Plus,
  Filter,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Beams from "@/components/ui/beams";

interface Resource {
  id: number;
  type: string;
  name: string;
  description: string;
  quantity: number;
  location: string;
  urgency_level: string;
  contact_info: string;
  created_at: string;
  user_id: number;
  resource_type: "needed" | "available";
}

const resourceCategories = [
  "Food & Water",
  "Medicine",
  "Clothing",
  "Shelter Materials",
  "Tools & Equipment",
  "Transportation",
  "Medical Supplies",
  "Baby Care",
  "Elderly Care",
  "Other",
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
      ease: "easeOut",
    },
  },
};

export default function Resources() {
  const { token, user, isLoading } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [message, setMessage] = useState("");

  const [newResource, setNewResource] = useState({
    type: "",
    name: "",
    description: "",
    quantity: "",
    location: "",
    urgency_level: "medium",
    resource_type: "needed" as "needed" | "available",
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
      return;
    }

    if (token) {
      fetchResources();
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [token, user, isLoading]);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resource.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (resource) => resource.type === categoryFilter,
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (resource) => resource.resource_type === typeFilter,
      );
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, categoryFilter, typeFilter]);

  const fetchResources = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = async () => {
    if (!newResource.type || !newResource.name || !newResource.location) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newResource,
          quantity: Number.parseInt(newResource.quantity, 10) || 1,
        }),
      });

      if (response.ok) {
        setMessage("Resource posted successfully.");
        setShowAddDialog(false);
        setNewResource({
          type: "",
          name: "",
          description: "",
          quantity: "",
          location: "",
          urgency_level: "medium",
          resource_type: "needed",
        });
        fetchResources();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to post resource.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
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

  const neededCount = resources.filter(
    (r) => r.resource_type === "needed",
  ).length;
  const availableCount = resources.filter(
    (r) => r.resource_type === "available",
  ).length;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Beams Background */}
      <div className="fixed inset-0 z-0">
        <Beams
          beamWidth={2}
          beamHeight={18}
          beamNumber={12}
          lightColor="#10b981"
          speed={1.8}
          noiseIntensity={1.6}
          scale={0.18}
          rotation={0}
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      </div>

      <Navigation />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.section variants={itemVariants} className="mb-10">
            <div className="glass-card rounded-3xl p-8 md:p-10 overflow-hidden relative">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-mono text-sm uppercase tracking-widest text-emerald-400 mb-2"
                    >
                      Resources
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                    >
                      Share what you have.
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-3 text-text-secondary max-w-xl"
                    >
                      Post supplies that are available or request what is
                      urgently needed. Connect with others to coordinate relief
                      resources.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-3"
                  >
                    <Dialog
                      open={showAddDialog}
                      onOpenChange={setShowAddDialog}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Resource
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-white/10 bg-black/95 backdrop-blur-xl text-white rounded-3xl max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="font-display text-2xl font-semibold text-white">
                            Add a resource
                          </DialogTitle>
                          <DialogDescription className="text-text-secondary">
                            Share a supply that is available or describe a
                            supply that is needed.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label className="text-white/80">Type</Label>
                            <Select
                              value={newResource.resource_type}
                              onValueChange={(value: "needed" | "available") =>
                                setNewResource({
                                  ...newResource,
                                  resource_type: value,
                                })
                              }
                            >
                              <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/95 border-white/10">
                                <SelectItem value="needed">Needed</SelectItem>
                                <SelectItem value="available">
                                  Available
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white/80">Category</Label>
                            <Select
                              value={newResource.type}
                              onValueChange={(value) =>
                                setNewResource({ ...newResource, type: value })
                              }
                            >
                              <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/95 border-white/10 max-h-60">
                                {resourceCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white/80">Name</Label>
                            <Input
                              value={newResource.name}
                              onChange={(e) =>
                                setNewResource({
                                  ...newResource,
                                  name: e.target.value,
                                })
                              }
                              className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30"
                              placeholder="e.g. bottled water, blankets, antibiotics"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white/80">Description</Label>
                            <Textarea
                              value={newResource.description}
                              onChange={(e) =>
                                setNewResource({
                                  ...newResource,
                                  description: e.target.value,
                                })
                              }
                              className="min-h-24 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 resize-none"
                              placeholder="Add details, condition, quantity notes, or packaging information."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white/80">Quantity</Label>
                              <Input
                                type="number"
                                value={newResource.quantity}
                                onChange={(e) =>
                                  setNewResource({
                                    ...newResource,
                                    quantity: e.target.value,
                                  })
                                }
                                className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30"
                                placeholder="1"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-white/80">Urgency</Label>
                              <Select
                                value={newResource.urgency_level}
                                onValueChange={(value) =>
                                  setNewResource({
                                    ...newResource,
                                    urgency_level: value,
                                  })
                                }
                              >
                                <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10">
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white/80">Location</Label>
                            <Input
                              value={newResource.location}
                              onChange={(e) =>
                                setNewResource({
                                  ...newResource,
                                  location: e.target.value,
                                })
                              }
                              className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30"
                              placeholder="District, area, or address"
                            />
                          </div>
                        </div>

                        <DialogFooter className="gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddDialog(false)}
                            className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddResource}
                            className="bg-white text-black hover:bg-white/90 rounded-xl"
                          >
                            Save resource
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                    {
                      label: "Total Resources",
                      value: resources.length,
                      color: "emerald",
                    },
                    { label: "Needed", value: neededCount, color: "rose" },
                    {
                      label: "Available",
                      value: availableCount,
                      color: "blue",
                    },
                    {
                      label: "Categories",
                      value: resourceCategories.length,
                      color: "amber",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-card rounded-2xl p-4 text-center"
                    >
                      <p className="font-display text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Message Alert */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Alert
                  className={`border-white/10 ${message.includes("successfully") ? "bg-emerald-500/10" : "bg-red-500/10"} text-white rounded-2xl`}
                >
                  {message.includes("successfully") ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TriangleAlert className="h-4 w-4 text-red-400" />
                  )}
                  <AlertDescription className="text-white/90">
                    {message}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/5 rounded-3xl overflow-hidden mb-8">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="flex gap-3 flex-wrap md:flex-nowrap">
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white md:w-48">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10">
                        <SelectItem value="all">All categories</SelectItem>
                        {resourceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="h-12 w-full rounded-xl border-white/10 bg-white/5 text-white md:w-44">
                        <Package className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10">
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="needed">Needed</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resources Grid */}
          {loading ? (
            <div className="glass-card rounded-3xl p-12 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
              <p className="mt-4 text-text-secondary">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="glass-card border-white/5 rounded-3xl border-dashed">
              <CardContent className="p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-6">
                  <Package className="h-8 w-8 text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white mb-2">
                  {resources.length === 0
                    ? "No resources yet"
                    : "No matches found"}
                </h2>
                <p className="mx-auto max-w-md text-sm text-text-secondary mb-6">
                  {resources.length === 0
                    ? "The shared resource list is empty. Be the first to add a resource!"
                    : "Try adjusting your search or filters to find what you're looking for."}
                </p>
                {resources.length === 0 && (
                  <Button
                    onClick={() => setShowAddDialog(true)}
                    className="bg-white text-black hover:bg-white/90 rounded-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add first resource
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-card-elevated border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    resource.resource_type === "needed"
                                      ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                  }`}
                                >
                                  {resource.resource_type}
                                </Badge>
                                <Badge
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    resource.urgency_level === "high"
                                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                                      : resource.urgency_level === "medium"
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  }`}
                                >
                                  {resource.urgency_level}
                                </Badge>
                              </div>
                              <h3 className="font-display text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                {resource.name}
                              </h3>
                              <p className="mt-1 text-sm text-text-secondary">
                                {resource.type}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed text-text-secondary mb-4 line-clamp-3">
                            {resource.description ||
                              "No additional description provided."}
                          </p>

                          <div className="rounded-2xl bg-white/5 border border-white/5 p-4 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-text-secondary mb-2">
                              <Package className="h-4 w-4" />
                              <span>
                                Quantity:{" "}
                                <span className="text-white">
                                  {resource.quantity}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary mb-2">
                              <MapPin className="h-4 w-4" />
                              <span className="line-clamp-1">
                                {resource.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(
                                  resource.created_at,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-text-secondary">
                            <Users className="h-4 w-4" />
                            <span className="line-clamp-1">
                              {resource.contact_info ||
                                "Contact the poster directly"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
}
