"use client";

import { useState, useCallback } from "react";
import type { TalkTrack, TalkTrackDuration, TalkTrackAudience } from "@/content/model";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Option definitions ───────────────────────────────────────────────

const DURATIONS: { value: TalkTrackDuration; label: string }[] = [
  { value: "30s", label: "30 Seconds" },
  { value: "2min", label: "2 Minutes" },
  { value: "5min", label: "5 Minutes" },
];

const AUDIENCES: { value: TalkTrackAudience; label: string }[] = [
  { value: "exec", label: "Exec / Sponsor" },
  { value: "leads", label: "Product & Engineering Leads" },
  { value: "pod", label: "Delivery Pod" },
];

// ── Props ────────────────────────────────────────────────────────────

interface TalkTrackPanelProps {
  talkTracks: TalkTrack[];
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────

export function TalkTrackPanel({ talkTracks, className }: TalkTrackPanelProps) {
  const [selectedDuration, setSelectedDuration] = useState<TalkTrackDuration>("30s");
  const [selectedAudience, setSelectedAudience] = useState<TalkTrackAudience>("exec");
  const [copied, setCopied] = useState(false);

  const activeTrack = talkTracks.find(
    (t) => t.duration === selectedDuration && t.audience === selectedAudience,
  );

  const handleCopy = useCallback(async () => {
    if (!activeTrack) return;
    try {
      await navigator.clipboard.writeText(activeTrack.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available; silently fail
    }
  }, [activeTrack]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Duration selector */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Duration
        </p>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          {DURATIONS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setSelectedDuration(d.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                selectedDuration === d.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audience selector */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Audience
        </p>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => setSelectedAudience(a.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                selectedAudience === a.value
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content card */}
      <AnimatePresence mode="wait">
        {activeTrack ? (
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="relative">
                <CardTitle className="pr-10 text-base">
                  {activeTrack.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="absolute right-4 top-4"
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-gray-700">
                {activeTrack.text.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-gray-400">
                  No talk track available for this combination.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
