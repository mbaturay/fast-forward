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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search glossary..."
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Term list */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
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
                  "rounded-lg border border-border bg-card transition-all",
                  expanded && "shadow-sm ring-1 ring-border",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.term)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-foreground">
                    {entry.term}
                  </span>
                  <Badge variant={levelBadgeVariant[entry.level] ?? "secondary"}>
                    {levelLabel[entry.level] ?? entry.level}
                  </Badge>
                </button>

                {expanded && (
                  <div className="border-t border-border px-4 py-3 space-y-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {entry.definition}
                    </p>

                    {entry.relatedTerms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">Related:</span>
                        {entry.relatedTerms.map((rt) => (
                          <button
                            key={rt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRelatedClick(rt);
                            }}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
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
