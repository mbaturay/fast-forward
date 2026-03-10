import type { LevelId } from "@/content/model";
import { cn } from "@/lib/utils";

const levels: { id: LevelId; letter: string; name: string; color: string; activeBg: string; activeBorder: string; activeText: string }[] = [
  {
    id: "a",
    letter: "A",
    name: "Enterprise",
    color: "indigo",
    activeBg: "bg-indigo-50",
    activeBorder: "border-indigo-500",
    activeText: "text-indigo-700",
  },
  {
    id: "b",
    letter: "B",
    name: "SDLC",
    color: "emerald",
    activeBg: "bg-emerald-50",
    activeBorder: "border-emerald-500",
    activeText: "text-emerald-700",
  },
  {
    id: "c",
    letter: "C",
    name: "Module",
    color: "amber",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-500",
    activeText: "text-amber-700",
  },
];

const dotColor: Record<LevelId, string> = {
  a: "bg-indigo-500",
  b: "bg-emerald-500",
  c: "bg-amber-500",
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
            {/* Connector: vertical line down from previous card + arrow into this card */}
            {index > 0 && (
              <svg
                className="absolute text-gray-400"
                style={{ left: -6, top: -10 }}
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                {/* Vertical line */}
                <line x1="1" y1="0" x2="1" y2="14" stroke="currentColor" strokeWidth="1.5" />
                {/* Curve into card */}
                <path d="M1 14 Q1 20 8 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                {/* Arrow head */}
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
                  : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50"
              )}
              style={{ width: CARD_W, marginBottom: index < levels.length - 1 ? 10 : 0 }}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                  isActive ? dotColor[level.id] : "bg-gray-300"
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
