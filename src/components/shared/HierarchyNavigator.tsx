import type { LevelId } from "@/content/model";
import { cn } from "@/lib/utils";

const levels: { id: LevelId; letter: string; name: string; color: string; activeBg: string; activeBorder: string; activeText: string }[] = [
  {
    id: "a",
    letter: "A",
    name: "Enterprise",
    color: "indigo",
    activeBg: "bg-level-a-light",
    activeBorder: "border-level-a",
    activeText: "text-level-a-dark",
  },
  {
    id: "b",
    letter: "B",
    name: "SDLC",
    color: "emerald",
    activeBg: "bg-level-b-light",
    activeBorder: "border-level-b",
    activeText: "text-level-b-dark",
  },
  {
    id: "c",
    letter: "C",
    name: "Module",
    color: "amber",
    activeBg: "bg-level-c-light",
    activeBorder: "border-level-c",
    activeText: "text-level-c-dark",
  },
];

const dotColor: Record<LevelId, string> = {
  a: "bg-level-a",
  b: "bg-level-b",
  c: "bg-level-c",
};

interface HierarchyNavigatorProps {
  currentLevel?: LevelId;
  onSelect: (level: LevelId) => void;
  className?: string;
}

const INDENT = 20;
const CARD_W = 160;

export function HierarchyNavigator({
  currentLevel,
  onSelect,
  className,
}: HierarchyNavigatorProps) {
  const totalWidth = CARD_W + (levels.length - 1) * INDENT;

  return (
    <div className={cn("relative", className)} style={{ width: totalWidth }}>
      {levels.map((level, index) => {
        const isActive = currentLevel === level.id;
        const left = index * INDENT;

        return (
          <div key={level.id} className="relative" style={{ marginLeft: left }}>
            {/* Connector */}
            {index > 0 && (
              <svg
                className="absolute text-border"
                style={{ left: -6, top: -10 }}
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <line x1="1" y1="0" x2="1" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M1 14 Q1 20 8 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M6 17 L9 20 L6 23" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}

            <button
              type="button"
              onClick={() => onSelect(level.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border-2 px-3 py-2 text-left transition-all",
                isActive
                  ? cn(level.activeBg, level.activeBorder, level.activeText)
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary"
              )}
              style={{ width: CARD_W, marginBottom: index < levels.length - 1 ? 10 : 0 }}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white",
                  isActive ? dotColor[level.id] : "bg-muted-foreground/30"
                )}
              >
                {level.letter}
              </span>
              <span className="text-sm font-medium">{level.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
