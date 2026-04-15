"use client";

import type { ReactNode } from "react";
import { CheckCircle, Globe, TrendingUp, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

const itemsSample: BentoItem[] = [
  {
    title: "Live coordination",
    meta: "24/7",
    description:
      "Track requests, responders, and supply movement from one structured interface.",
    icon: <TrendingUp className="h-4 w-4 text-foreground" />,
    status: "Active",
    tags: ["Requests", "Updates", "Routing"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Volunteer network",
    meta: "Ready",
    description: "See who is available and connect help with the nearest response team.",
    icon: <CheckCircle className="h-4 w-4 text-foreground" />,
    status: "Verified",
    tags: ["People", "Support"],
  },
  {
    title: "Resource board",
    meta: "Shared",
    description: "Post supply needs and available inventory without leaving the platform.",
    icon: <Video className="h-4 w-4 text-foreground" />,
    tags: ["Supplies", "Relief"],
    colSpan: 2,
  },
  {
    title: "Regional coverage",
    meta: "Kerala",
    description: "Organize response across districts with clear visibility into local activity.",
    icon: <Globe className="h-4 w-4 text-foreground" />,
    status: "Regional",
    tags: ["Districts", "Coverage"],
  },
];

interface BentoGridProps {
  items?: BentoItem[];
}

function BentoGrid({ items = itemsSample }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]",
            item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
            item.hasPersistentHover && "shadow-[0_16px_40px_rgba(17,17,17,0.06)]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,17,17,0.04),transparent_50%)] opacity-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "group-hover:opacity-100",
            )}
          />

          <div className="relative flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03]">
                {item.icon}
              </div>
              <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary">
                {item.status || "Open"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {item.title}
                {item.meta ? (
                  <span className="ml-2 text-sm font-medium text-text-muted">
                    {item.meta}
                  </span>
                ) : null}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-text-secondary">
                {item.description}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                {item.cta || "Explore"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
