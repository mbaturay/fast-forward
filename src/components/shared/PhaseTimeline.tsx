import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Phase, LevelId } from "@/content/model";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const levelStyles: Record<
  LevelId,
  { bg: string; text: string; badge: "indigo" | "emerald" | "amber" }
> = {
  a: { bg: "bg-level-a", text: "text-level-a-dark", badge: "indigo" },
  b: { bg: "bg-level-b", text: "text-level-b-dark", badge: "emerald" },
  c: { bg: "bg-level-c", text: "text-level-c-dark", badge: "amber" },
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
        "flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-x-visible md:pb-0",
        className
      )}
    >
      {phases.map((phase, index) => (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          className="relative flex min-w-[240px] shrink-0 md:min-w-0"
        >
          {/* Connecting arrow */}
          {index > 0 && (
            <div className="absolute -left-3 top-1/2 hidden -translate-y-1/2 text-border md:block">
              <ArrowRight className="h-4 w-4" />
            </div>
          )}

          <Card
            className="flex w-full cursor-pointer flex-col transition-all hover:shadow-md"
            onClick={() => onPhaseClick(phase.id)}
          >
            <CardContent className="flex flex-1 flex-col gap-3 p-4">
              {/* Step number */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white",
                    style.bg
                  )}
                >
                  {phase.number}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {phase.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-muted-foreground">{phase.subtitle}</p>

              {/* Goal (truncated) */}
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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

            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
