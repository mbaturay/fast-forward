import { useMemo } from "react";
import type {
  Level,
  GlossaryEntry,
  Phase,
  Guardrail,
  TalkTrack,
  PlaybookSection,
} from "@/content/model";

// ── Result type ─────────────────────────────────────────────────────

export interface SearchResult {
  type: "phase" | "guardrail" | "talkTrack" | "playbook" | "glossary" | "level";
  id: string;
  title: string;
  snippet: string;
}

// ── Helpers ─────────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function matches(haystack: string, needle: string): boolean {
  return normalize(haystack).includes(needle);
}

function excerpt(text: string, query: string, radius = 60): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

// ── Core search logic ───────────────────────────────────────────────

function searchLevels(levels: Level[], q: string): SearchResult[] {
  const results: SearchResult[] = [];

  for (const level of levels) {
    // Match on the level itself
    if (
      matches(level.title, q) ||
      matches(level.description, q) ||
      matches(level.purpose, q)
    ) {
      results.push({
        type: "level",
        id: level.id,
        title: `${level.shortName}: ${level.title}`,
        snippet: excerpt(level.description, q),
      });
    }

    // Phases
    for (const phase of level.phases) {
      if (
        matches(phase.title, q) ||
        matches(phase.subtitle, q) ||
        matches(phase.goal, q) ||
        phase.activities.some((a) => matches(a, q)) ||
        phase.outputs.some((o) => matches(o, q))
      ) {
        results.push({
          type: "phase",
          id: phase.id,
          title: `${level.shortName} Phase ${phase.number}: ${phase.title}`,
          snippet: excerpt(
            [phase.subtitle, phase.goal, ...phase.activities].join(" "),
            q,
          ),
        });
      }
    }

    // Guardrails
    for (const gr of level.guardrails) {
      if (matches(gr.title, q) || matches(gr.description, q)) {
        results.push({
          type: "guardrail",
          id: gr.id,
          title: gr.title,
          snippet: excerpt(gr.description, q),
        });
      }
    }
  }

  return results;
}

function searchGlossary(
  entries: GlossaryEntry[],
  q: string,
): SearchResult[] {
  return entries
    .filter(
      (e) =>
        matches(e.term, q) ||
        matches(e.definition, q) ||
        e.relatedTerms.some((rt) => matches(rt, q)),
    )
    .map((e) => ({
      type: "glossary" as const,
      id: e.term,
      title: e.term,
      snippet: excerpt(e.definition, q),
    }));
}

function searchTalkTracks(
  tracks: TalkTrack[],
  q: string,
): SearchResult[] {
  return tracks
    .filter((t) => matches(t.title, q) || matches(t.text, q))
    .map((t) => ({
      type: "talkTrack" as const,
      id: t.id,
      title: t.title,
      snippet: excerpt(t.text, q),
    }));
}

function searchPlaybook(
  sections: PlaybookSection[],
  q: string,
): SearchResult[] {
  return sections
    .filter((s) => matches(s.title, q) || matches(s.body, q))
    .map((s) => ({
      type: "playbook" as const,
      id: s.id,
      title: s.title,
      snippet: excerpt(s.body, q),
    }));
}

// ── Hook ────────────────────────────────────────────────────────────

export interface ContentData {
  levels: Level[];
  glossary: GlossaryEntry[];
  talkTracks?: TalkTrack[];
  playbook?: PlaybookSection[];
}

export function useSearch(query: string, content: ContentData): SearchResult[] {
  return useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return [];

    return [
      ...searchLevels(content.levels, q),
      ...searchGlossary(content.glossary, q),
      ...(content.talkTracks ? searchTalkTracks(content.talkTracks, q) : []),
      ...(content.playbook ? searchPlaybook(content.playbook, q) : []),
    ];
  }, [query, content]);
}
