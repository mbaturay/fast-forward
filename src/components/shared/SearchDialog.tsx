import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSearch, type SearchResult } from "@/hooks/useSearch";
import { levels } from "@/content/content";
import { glossary } from "@/content/glossary";
import { talkTracks } from "@/content/talkTracks";
import { cn } from "@/lib/utils";

const typeLabels: Record<SearchResult["type"], string> = {
  level: "Levels",
  phase: "Phases",
  guardrail: "Guardrails",
  talkTrack: "Talk Tracks",
  playbook: "Playbook",
  glossary: "Glossary",
};

const typeRoute: Record<SearchResult["type"], (id: string) => string> = {
  level: (id) => `/?level=${id}`,
  phase: (id) => `/guided?phase=${id}`,
  guardrail: () => "/guided",
  talkTrack: () => "/talk-tracks",
  playbook: () => "/playbook",
  glossary: () => "/guided?tab=glossary",
};

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useSearch(query, {
    levels: [...levels],
    glossary: [...glossary],
    talkTracks: [...talkTracks],
  });

  // Group results by type
  const grouped = results.reduce<Record<string, SearchResult[]>>(
    (acc, result) => {
      const key = result.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(result);
      return acc;
    },
    {}
  );

  const handleSelect = useCallback(
    (result: SearchResult) => {
      const route = typeRoute[result.type](result.id);
      navigate(route);
      setQuery("");
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="top-[20%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search</DialogTitle>

        {/* Search input */}
        <div className="flex items-center border-b border-border px-4">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search levels, phases, glossary..."
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          <kbd className="hidden shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto px-2 py-2">
          {query.length >= 2 && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}

          {Object.entries(grouped).map(([type, items]) => (
            <div key={type} className="mb-2">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {typeLabels[type as SearchResult["type"]]}
              </p>
              {items.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
                  )}
                >
                  <span className="text-sm font-medium text-foreground">
                    {result.title}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {result.snippet}
                  </span>
                </button>
              ))}
            </div>
          ))}

          {query.length < 2 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground/60">
              Type at least 2 characters to search
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
