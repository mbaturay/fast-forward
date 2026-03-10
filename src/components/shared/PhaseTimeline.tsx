import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Phase, LevelId } from "@/content/model";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const levelStyles: Record<
  LevelId,
  { ring: string; bg: string; text: string; badge: "indigo" | "emerald" | "amber" }
> = {
  a: { ring: "ring-indigo-500", bg: "bg-indigo-500", text: "text-indigo-700", badge: "indigo" },
  b: { ring: "ring-emerald-500", bg: "bg-emerald-500", text: "text-emerald-700", badge: "emerald" },
  c: { ring: "ring-amber-500", bg: "bg-amber-500", text: "text-amber-700", badge: "amber" },
};

interface PhaseTimelineProps {
  phases: Phase[];
  levelId: LevelId;
  onPhaseClick: (phaseId: string) => void;
  className?: string;
}

export function PhaseTimeline({
  phases,
  levelId,
  onPhaseClick,
  className,
}: PhaseTimelineProps) {
  const style = levelStyles[levelId];

  return (
    <div
      className={cn(
        // Mobile: horizontal scroll; Desktop: grid
        "flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-x-visible md:pb-0",
        className
      )}
    >
      {phases.map((phase, index) => (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          className="relative flex min-w-[240px] shrink-0 md:min-w-0"
        >
          {/* Connecting arrow (hidden on first card) */}
          {index > 0 && (
            <div className="absolute -left-3 top-1/2 hidden -translate-y-1/2 text-gray-300 md:block">
              <ArrowRight className="h-4 w-4" />
            </div>
          )}

          <Card
            className="flex w-full cursor-pointer flex-col transition-shadow hover:shadow-md"
            onClick={() => onPhaseClick(phase.id)}
          >
            <CardContent className="flex flex-1 flex-col gap-3 p-4">
              {/* Step number */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white",
                    style.bg
                  )}
                >
                  {phase.number}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                  {phase.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-gray-500">{phase.subtitle}</p>

              {/* Goal (truncated) */}
              <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">
                {phase.goal}
              </p>

              {/* Outputs as badges */}
              <div className="mt-auto flex flex-wrap gap-1 pt-2">
                {phase.outputs.slice(0, 3).map((output) => (
                  <Badge
                    key={output}
                    variant={style.badge}
                    className="text-[10px] leading-tight"
                  >
                    {output.length > 30 ? `${output.slice(0, 28)}...` : output}
                  </Badge>
                ))}
                {phase.outputs.length > 3 && (
                  <Badge variant="secondary" className="text-[10px]">
                    +{phase.outputs.length - 3}
                  </Badge>
                )}
              </div>

              {/* Drill-down affordance */}
              {phase.drillDownTarget && (
                <div
                  className={cn(
                    "flex items-center gap-1 pt-1 text-xs font-medium",
                    style.text
                  )}
                >
                  Drill in
                  <ChevronRight className="h-3 w-3" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
