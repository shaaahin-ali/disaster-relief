"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, MapPin, Upload } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequestHelp() {
  const { token, user, isLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    urgency_level: "medium",
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      setPhotoPreview(readerEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("location", formData.location);
      payload.append("urgency_level", formData.urgency_level);

      if (photoFile) {
        payload.append("photo", photoFile);
      }

      const response = await fetch(`${API_BASE_URL}/request/request-help`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1800);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to create request");
      }
    } catch (submitError) {
      console.error("Failed to create request:", submitError);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="page-shell" />;
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="page-section pt-28 pb-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="px-0 text-text-secondary hover:bg-transparent hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <section className="space-y-4">
            <p className="eyebrow">Request help</p>
            <h1 className="section-heading text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.96]">
              Share what you need.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">
              Add a title, describe the situation, include the location, and set
              the urgency so volunteers can respond appropriately.
            </p>
          </section>

          <Card className="glass-card">
            <CardHeader className="border-b border-black/10 pb-5">
              <CardTitle className="font-display text-2xl font-semibold text-foreground">
                Request details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-foreground">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-2xl border border-black/10 bg-black text-sm text-white px-4 py-3">
                  Request submitted successfully. Redirecting to your dashboard...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Brief summary of the situation"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="h-11 rounded-2xl border-black/10 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the situation and what kind of help is needed."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-[160px] rounded-[24px] border-black/10 bg-white resize-none"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, district, or address"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="h-11 rounded-2xl border-black/10 bg-white pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select
                      value={formData.urgency_level}
                      onValueChange={(value) =>
                        setFormData({ ...formData, urgency_level: value })
                      }
                    >
                      <SelectTrigger className="h-11 w-full rounded-2xl border-black/10 bg-white">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (optional)</Label>
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
                      className="flex min-h-40 cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-black/15 bg-white p-4 transition-colors hover:border-black/30"
                    >
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-48 w-full rounded-[18px] object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black/[0.03]">
                            <Upload className="h-5 w-5 text-text-muted" />
                          </div>
                          <p className="mt-4 font-medium text-foreground">
                            Upload an image
                          </p>
                          <p className="mt-1 text-sm text-text-muted">
                            PNG or JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={loading || success} className="h-11 w-full">
                    {loading
                      ? "Submitting..."
                      : success
                        ? "Submitted"
                        : "Submit request"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
