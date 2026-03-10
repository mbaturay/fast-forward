"use client";

import { useState, useMemo } from "react";
import type { GlossaryEntry, LevelId } from "@/content/model";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────

const levelBadgeVariant: Record<string, "levelA" | "levelB" | "levelC" | "secondary"> = {
  a: "levelA",
  b: "levelB",
  c: "levelC",
  all: "secondary",
};

const levelLabel: Record<string, string> = {
  a: "A",
  b: "B",
  c: "C",
  all: "All",
};

// ── Props ────────────────────────────────────────────────────────────

interface GlossaryPanelProps {
  glossary: GlossaryEntry[];
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────

export function GlossaryPanel({ glossary, className }: GlossaryPanelProps) {
  const [query, setQuery] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...glossary].sort((a, b) => a.term.localeCompare(b.term)),
    [glossary],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      (entry) =>
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q),
    );
  }, [sorted, query]);

  const handleRelatedClick = (term: string) => {
    setQuery(term);
    setExpandedTerm(term);
  };

  const toggle = (term: string) =>
    setExpandedTerm((prev) => (prev === term ? null : term));

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search glossary..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Term list */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No terms match your search.
        </p>
      ) : (
        <div className="grid gap-2 md:grid-cols-2">
          {filtered.map((entry) => {
            const expanded = expandedTerm === entry.term;

            return (
              <div
                key={entry.term}
                className={cn(
                  "rounded-lg border border-gray-200 bg-white transition-shadow",
                  expanded && "shadow-sm ring-1 ring-gray-200",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.term)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {entry.term}
                  </span>
                  <Badge variant={levelBadgeVariant[entry.level] ?? "secondary"}>
                    {levelLabel[entry.level] ?? entry.level}
                  </Badge>
                </button>

                {expanded && (
                  <div className="border-t border-gray-100 px-4 py-3 space-y-3">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {entry.definition}
                    </p>

                    {entry.relatedTerms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-gray-400">Related:</span>
                        {entry.relatedTerms.map((rt) => (
                          <button
                            key={rt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRelatedClick(rt);
                            }}
                            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                          >
                            {rt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
