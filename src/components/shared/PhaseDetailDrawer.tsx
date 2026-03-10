import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowDownRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { Phase, LevelId, Guardrail } from "@/content/model";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const levelAccent: Record<
  LevelId,
  { border: string; bg: string; text: string; badge: "indigo" | "emerald" | "amber"; label: string }
> = {
  a: { border: "border-l-indigo-500", bg: "bg-indigo-50", text: "text-indigo-700", badge: "indigo", label: "Level A" },
  b: { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", badge: "emerald", label: "Level B" },
  c: { border: "border-l-amber-500", bg: "bg-amber-50", text: "text-amber-700", badge: "amber", label: "Level C" },
};

const drillDownLabels: Record<LevelId, string> = {
  a: "Fast Forward (Enterprise)",
  b: "Protogen (SDLC)",
  c: "Design-to-Code (Module)",
};

interface PhaseDetailDrawerProps {
  phase: Phase | null;
  levelId: LevelId;
  open: boolean;
  onClose: () => void;
  guardrails?: Guardrail[];
  onDrillDown?: (targetLevel: LevelId) => void;
}

export function PhaseDetailDrawer({
  phase,
  levelId,
  open,
  onClose,
  guardrails = [],
  onDrillDown,
}: PhaseDetailDrawerProps) {
  const accent = levelAccent[levelId];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && phase && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40"
              />
            </DialogPrimitive.Overlay>

            {/* Drawer panel (right side) */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className={cn(
                  "fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l-4 bg-white shadow-2xl focus:outline-none sm:w-[480px]",
                  accent.border
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white",
                        levelId === "a" ? "bg-indigo-500" : levelId === "b" ? "bg-emerald-500" : "bg-amber-500"
                      )}
                    >
                      {phase.number}
                    </span>
                    <div>
                      <DialogPrimitive.Title className="text-lg font-semibold text-gray-900">
                        {phase.title}
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="text-sm text-gray-500">
                        {phase.subtitle}
                      </DialogPrimitive.Description>
                    </div>
                  </div>
                  <DialogPrimitive.Close className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <div className="space-y-6">
                    {/* Goal */}
                    <section>
                      <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Goal
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {phase.goal}
                      </p>
                    </section>

                    {/* Activities */}
                    <section>
                      <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Activities
                      </h3>
                      <ul className="space-y-1.5">
                        {phase.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Outputs */}
                    <section>
                      <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Outputs
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {phase.outputs.map((output) => (
                          <Badge key={output} variant={accent.badge}>
                            {output}
                          </Badge>
                        ))}
                      </div>
                    </section>

                    {/* Key questions */}
                    {phase.keyQuestions && phase.keyQuestions.length > 0 && (
                      <section>
                        <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Key Questions
                        </h3>
                        <ul className="space-y-1.5">
                          {phase.keyQuestions.map((q) => (
                            <li
                              key={q}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                              {q}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Guardrails */}
                    {guardrails.length > 0 && (
                      <section>
                        <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Guardrails
                        </h3>
                        <div className="space-y-2">
                          {guardrails.map((gr) => (
                            <div
                              key={gr.id}
                              className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                            >
                              <p className="text-sm font-medium text-gray-800">
                                {gr.title}
                              </p>
                              <p className="mt-0.5 text-xs text-gray-500">
                                {gr.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Drill-down CTA */}
                    {phase.drillDownTarget && (
                      <div className={cn("rounded-lg p-4", accent.bg)}>
                        <p className="mb-2 text-sm font-medium text-gray-700">
                          This phase connects to a deeper level:
                        </p>
                        <Button
                          size="sm"
                          onClick={() =>
                            onDrillDown?.(phase.drillDownTarget as LevelId)
                          }
                        >
                          <ArrowDownRight className="mr-1.5 h-4 w-4" />
                          Go deeper: {drillDownLabels[phase.drillDownTarget]}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
