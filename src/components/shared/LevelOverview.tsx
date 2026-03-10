import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Level, LevelId } from "@/content/model";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const levelAccent: Record<LevelId, { border: string; bg: string; badge: "indigo" | "emerald" | "amber" }> = {
  a: { border: "border-l-indigo-500", bg: "bg-indigo-50", badge: "indigo" },
  b: { border: "border-l-emerald-500", bg: "bg-emerald-50", badge: "emerald" },
  c: { border: "border-l-amber-500", bg: "bg-amber-50", badge: "amber" },
};

interface LevelOverviewProps {
  level: Level;
  className?: string;
}

export function LevelOverview({ level, className }: LevelOverviewProps) {
  const navigate = useNavigate();
  const accent = levelAccent[level.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      <Card className={cn("border-l-4 overflow-hidden", accent.border)}>
        <CardHeader className="space-y-3">
          {/* Title block */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {level.title}
            </h2>
            <p className="mt-1 text-base text-gray-500">{level.subtitle}</p>
          </div>

          {/* Purpose */}
          <p className="text-sm leading-relaxed text-gray-700">
            {level.purpose}
          </p>

          {/* Audience badges */}
          <div className="flex flex-wrap gap-2">
            {level.audience.split(",").map((a) => (
              <Badge key={a.trim()} variant={accent.badge}>
                {a.trim()}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* View callout */}
          <div className={cn("rounded-lg px-4 py-3", accent.bg)}>
            <p className="text-sm font-medium text-gray-800">
              This is the <span className="font-semibold">{level.view}</span>
            </p>
          </div>

          {/* Key questions */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Key Questions It Answers
            </h3>
            <ul className="space-y-1.5">
              {level.answersQuestions.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={() => navigate("/guided")} size="sm">
              Start Guided Journey
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={() => navigate("/mapping")}
              variant="outline"
              size="sm"
            >
              View Mapping
            </Button>
            <Button
              onClick={() => navigate("/talk-tracks")}
              variant="outline"
              size="sm"
            >
              Talk Tracks
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
