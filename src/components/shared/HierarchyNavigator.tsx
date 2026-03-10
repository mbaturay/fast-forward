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

export function HierarchyNavigator({
  currentLevel,
  onSelect,
  className,
}: HierarchyNavigatorProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {levels.map((level, index) => {
        const isActive = currentLevel === level.id;
        const indent = index * 20;

        return (
          <div key={level.id} className="relative">
            {/* Connecting line */}
            {index > 0 && (
              <div
                className="absolute top-0 h-4 w-px bg-gray-300"
                style={{ left: `${indent + 10}px`, transform: "translateY(-100%)" }}
              />
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
              style={{ marginLeft: `${indent}px` }}
            >
              {/* Level dot */}
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                  isActive ? dotColor[level.id] : "bg-gray-300"
                )}
              >
                {level.letter}
              </span>

              {/* Label */}
              <span className="text-sm font-medium">{level.name}</span>
            </button>

            {/* Connecting line to next */}
            {index < levels.length - 1 && (
              <div
                className="h-4 w-px bg-gray-300"
                style={{ marginLeft: `${(index + 1) * 20 + 10}px` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
