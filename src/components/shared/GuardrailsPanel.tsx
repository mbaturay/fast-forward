import { Shield, Eye, Lock, CheckCircle, Code } from "lucide-react";
import type { Guardrail, LevelId } from "@/content/model";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const levelIconColor: Record<LevelId, string> = {
  a: "text-indigo-500",
  b: "text-emerald-500",
  c: "text-amber-500",
};

// Map guardrail ids to appropriate icons; fallback to Shield
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "g-human-review": Eye,
  "g-no-pii": Lock,
  "g-evidence-decisions": CheckCircle,
  "g-design-parity": Eye,
  "g-accessibility": Shield,
  "g-security-boundary": Lock,
  "g-code-style": Code,
};

interface GuardrailsPanelProps {
  guardrails: Guardrail[];
  levelId: LevelId;
  className?: string;
}

export function GuardrailsPanel({
  guardrails,
  levelId,
  className,
}: GuardrailsPanelProps) {
  const iconColor = levelIconColor[levelId];

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {guardrails.map((guardrail) => {
        const Icon = iconMap[guardrail.id] ?? Shield;

        return (
          <Card key={guardrail.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex gap-3 p-4">
              <div className={cn("mt-0.5 shrink-0", iconColor)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">
                  {guardrail.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  {guardrail.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
