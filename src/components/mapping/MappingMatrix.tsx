"use client";

import { useState } from "react";
import type { Mapping } from "@/content/model";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

type View = "ab" | "bc" | "abc";

interface MappingMatrixProps {
  mappings: Mapping[];
  view: View;
  className?: string;
}

// ── helpers ──────────────────────────────────────────────────────────

const phaseColor = {
  a: "bg-indigo-100 text-indigo-800 border-indigo-200",
  b: "bg-emerald-100 text-emerald-800 border-emerald-200",
  c: "bg-amber-100 text-amber-800 border-amber-200",
} as const;

function PhasePill({ label, level }: { label: string; level: "a" | "b" | "c" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        phaseColor[level],
      )}
    >
      {label}
    </span>
  );
}

// ── Desktop table ────────────────────────────────────────────────────

function DesktopTable({
  mappings,
  view,
  expandedId,
  toggle,
}: {
  mappings: Mapping[];
  view: View;
  expandedId: string | null;
  toggle: (id: string) => void;
}) {
  const showA = view === "ab" || view === "abc";
  const showB = true; // B is always visible
  const showC = view === "bc" || view === "abc";

  return (
    <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/80">
            {showA && (
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                A Phase
              </th>
            )}
            {showB && (
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                B Phase
              </th>
            )}
            {showC && (
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                C Phase
              </th>
            )}
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Relationship
            </th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {mappings.map((m) => {
            const expanded = expandedId === m.id;

            return (
              <tr
                key={m.id}
                className="group border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60"
              >
                {showA && (
                  <td className="px-4 py-3">
                    <PhasePill label={m.aPhase} level="a" />
                  </td>
                )}
                {showB && (
                  <td className="px-4 py-3">
                    <PhasePill label={m.bPhase} level="b" />
                  </td>
                )}
                {showC && (
                  <td className="px-4 py-3">
                    {m.cPhase ? (
                      <PhasePill label={m.cPhase} level="c" />
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                )}
                <td className="px-4 py-3">
                  <div>
                    <p className="text-gray-700">{m.relationship}</p>
                    {expanded && (
                      <p className="mt-2 text-xs leading-relaxed text-gray-500">
                        {m.whyItMatters}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    onClick={() => toggle(m.id)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    aria-label={expanded ? "Collapse details" : "Expand details"}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Mobile accordion cards ───────────────────────────────────────────

function MobileCards({
  mappings,
  view,
  expandedId,
  toggle,
}: {
  mappings: Mapping[];
  view: View;
  expandedId: string | null;
  toggle: (id: string) => void;
}) {
  const showA = view === "ab" || view === "abc";
  const showC = view === "bc" || view === "abc";

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {mappings.map((m) => {
        const expanded = expandedId === m.id;

        return (
          <button
            key={m.id}
            type="button"
            onClick={() => toggle(m.id)}
            className={cn(
              "w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md",
              expanded && "ring-1 ring-gray-300",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {showA && <PhasePill label={m.aPhase} level="a" />}
                <PhasePill label={m.bPhase} level="b" />
                {showC && m.cPhase && <PhasePill label={m.cPhase} level="c" />}
              </div>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
                  expanded && "rotate-180",
                )}
              />
            </div>

            {expanded && (
              <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-700">{m.relationship}</p>
                <p className="text-xs leading-relaxed text-gray-500">
                  {m.whyItMatters}
                </p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────

export function MappingMatrix({ mappings, view, className }: MappingMatrixProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  if (mappings.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        No mappings available for this view.
      </p>
    );
  }

  return (
    <div className={cn(className)}>
      <DesktopTable
        mappings={mappings}
        view={view}
        expandedId={expandedId}
        toggle={toggle}
      />
      <MobileCards
        mappings={mappings}
        view={view}
        expandedId={expandedId}
        toggle={toggle}
      />
    </div>
  );
}
