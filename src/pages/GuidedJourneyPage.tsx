import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import type { LevelId, Phase } from '@/content/model';
import { levelsById } from '@/content/content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { HierarchyNavigator } from '@/components/shared/HierarchyNavigator';
import { LevelOverview } from '@/components/shared/LevelOverview';
import { PhaseTimeline } from '@/components/shared/PhaseTimeline';
import { PhaseDetailDrawer } from '@/components/shared/PhaseDetailDrawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LEVEL_ORDER: LevelId[] = ['a', 'b', 'c'];

const levelLabel: Record<LevelId, string> = {
  a: 'Level A — Fast Forward',
  b: 'Level B — Protogen',
  c: 'Level C — Design-to-Code',
};

const nextHint: Record<LevelId, { text: string; target: LevelId | null }> = {
  a: { text: 'Phase 3 ("The Fast Part") drills into the Protogen delivery engine (Level B).', target: 'b' },
  b: { text: 'During Build (Stage 4), when UI fidelity matters, drill into the Design-to-Code module (Level C).', target: 'c' },
  c: { text: 'Design-to-Code outputs feed back into Protogen Build and Release, and ultimately inform Fast Forward Phase 4.', target: null },
};

export default function GuidedJourneyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLevelId = (searchParams.get('level') as LevelId) || 'a';

  const level = levelsById[currentLevelId];
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigateToLevel = useCallback(
    (id: LevelId) => {
      setSearchParams({ level: id });
      setSelectedPhase(null);
      setDrawerOpen(false);
    },
    [setSearchParams],
  );

  const handlePhaseClick = useCallback(
    (phaseId: string) => {
      const phase = level.phases.find((p) => p.id === phaseId) ?? null;
      setSelectedPhase(phase);
      setDrawerOpen(true);
    },
    [level],
  );

  const handleDrillDown = useCallback(
    (targetLevel: LevelId) => {
      setDrawerOpen(false);
      setTimeout(() => navigateToLevel(targetLevel), 200);
    },
    [navigateToLevel],
  );

  const currentIndex = LEVEL_ORDER.indexOf(currentLevelId);
  const prevLevel: LevelId | null = currentIndex > 0 ? LEVEL_ORDER[currentIndex - 1] : null;
  const hint = nextHint[currentLevelId];

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Guided Journey' },
      { label: levelLabel[currentLevelId] },
    ],
    [currentLevelId],
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ── Sidebar: hierarchy nav (desktop) / top bar (mobile) ──── */}
        <aside className="shrink-0 lg:w-56">
          <div className="sticky top-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              You are here
            </h2>
            <HierarchyNavigator
              currentLevel={currentLevelId}
              onSelect={navigateToLevel}
            />
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLevelId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="space-y-10"
            >
              {/* Level overview */}
              <LevelOverview level={level} />

              {/* Phase timeline */}
              <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Phases</h2>
                <PhaseTimeline
                  phases={level.phases}
                  levelId={currentLevelId}
                  onPhaseClick={handlePhaseClick}
                />
              </section>

              {/* Navigation row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {prevLevel && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToLevel(prevLevel)}
                  >
                    <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                    Back to {levelsById[prevLevel].shortName}
                  </Button>
                )}
                {hint.target && (
                  <Button size="sm" onClick={() => navigateToLevel(hint.target!)}>
                    Continue to {levelsById[hint.target].shortName}
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              {/* "What comes next" */}
              <section aria-label="What comes next">
                <Card className="border-dashed">
                  <CardContent className="flex items-start gap-3 p-5">
                    <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">What Comes Next</h3>
                      <p className="mt-1 text-sm text-gray-600">{hint.text}</p>
                      {hint.target && (
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0"
                          onClick={() => navigateToLevel(hint.target!)}
                        >
                          Go to {levelsById[hint.target].shortName}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Phase detail drawer ───────────────────────────────────── */}
      <PhaseDetailDrawer
        phase={selectedPhase}
        levelId={currentLevelId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        guardrails={level.guardrails}
        onDrillDown={handleDrillDown}
      />
    </motion.main>
  );
}
