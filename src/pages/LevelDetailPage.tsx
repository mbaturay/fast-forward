import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Lightbulb,
  Link2,
  Sparkles,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle,
  FileOutput,
} from 'lucide-react';
import type { LevelId, Phase, LevelB, LevelC } from '@/content/model';
import { levelsById } from '@/content/content';
import { mappings } from '@/content/mappings';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { LevelOverview } from '@/components/shared/LevelOverview';
import { PhaseTimeline } from '@/components/shared/PhaseTimeline';
import { PhaseDetailDrawer } from '@/components/shared/PhaseDetailDrawer';
import { GuardrailsPanel } from '@/components/shared/GuardrailsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ── Color map ────────────────────────────────────────────────────────

const levelColors: Record<LevelId, {
  badgeVariant: 'levelA' | 'levelB' | 'levelC';
  bg: string;
  text: string;
  dot: string;
  accent: string;
}> = {
  a: { badgeVariant: 'levelA', bg: 'bg-level-a-light', text: 'text-level-a-dark', dot: 'bg-level-a', accent: 'text-level-a' },
  b: { badgeVariant: 'levelB', bg: 'bg-level-b-light', text: 'text-level-b-dark', dot: 'bg-level-b', accent: 'text-level-b' },
  c: { badgeVariant: 'levelC', bg: 'bg-level-c-light', text: 'text-level-c-dark', dot: 'bg-level-c', accent: 'text-level-c' },
};

const levelName: Record<LevelId, string> = {
  a: 'Level A — Fast Forward',
  b: 'Level B — Protogen',
  c: 'Level C — Design-to-Code',
};

// ── Page ─────────────────────────────────────────────────────────────

export default function LevelDetailPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const validLevelId = (levelId === 'a' || levelId === 'b' || levelId === 'c') ? levelId : 'a';
  const level = levelsById[validLevelId];
  const colors = levelColors[validLevelId];

  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      setTimeout(() => navigate(`/level/${targetLevel}`), 200);
    },
    [navigate],
  );

  // Connections to other levels via mappings
  const relatedMappings = useMemo(
    () =>
      mappings.filter(
        (m) =>
          m.aPhase.startsWith(validLevelId) ||
          m.bPhase.startsWith(validLevelId) ||
          (m.cPhase && m.cPhase.startsWith(validLevelId)),
      ),
    [validLevelId],
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: levelName[validLevelId] },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="space-y-10">
        {/* ── Level overview ────────────────────────────────────────── */}
        <LevelOverview level={level} />

        {/* ── Phase timeline ───────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Phases</h2>
          <PhaseTimeline
            phases={level.phases}
            levelId={validLevelId}
            onPhaseClick={handlePhaseClick}
          />
        </section>

        {/* ── Guardrails ───────────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Guardrails</h2>
          <GuardrailsPanel guardrails={level.guardrails} levelId={validLevelId} />
        </section>

        {/* ── Principles (Level B only) ────────────────────────────── */}
        {validLevelId === 'b' && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Governing Principles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {(level as LevelB).principles.map((principle) => (
                <Card key={principle.title}>
                  <CardContent className="flex flex-col gap-2 p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-level-b" />
                      <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Inputs / Outcomes (Level C only) ─────────────────────── */}
        {validLevelId === 'c' && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Inputs &amp; Outcomes</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ArrowDownToLine className="h-4 w-4 text-level-c" />
                    Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).inputOutcome.inputs.map((input) => (
                      <li key={input} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-level-c/40" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ArrowUpFromLine className="h-4 w-4 text-level-c" />
                    Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).inputOutcome.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-level-c/40" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ── Quality Controls / Deliverables (Level C only) ───────── */}
        {validLevelId === 'c' && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Quality Controls &amp; Deliverables</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-level-c" />
                    Quality Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).qualityControls.controls.map((control) => (
                      <li key={control} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-level-c/40" />
                        {control}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <FileOutput className="h-4 w-4 text-level-c" />
                    Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).qualityControls.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-level-c/40" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ── Common Pitfalls ──────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Common Pitfalls</h2>
          <Card className="border-destructive/20">
            <CardContent className="p-5">
              <ul className="space-y-2">
                {level.commonPitfalls.map((pitfall) => (
                  <li key={pitfall} className="flex items-start gap-2 text-sm text-foreground/80">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                    {pitfall}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── Tips for Success ─────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Tips for Success</h2>
          <Card className="border-level-b/20">
            <CardContent className="p-5">
              <ul className="space-y-2">
                {level.tipsForSuccess.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-level-b" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── How It Connects ──────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">How It Connects</h2>
          <Card className={colors.bg}>
            <CardContent className="flex items-start gap-3 p-5">
              <Link2 className={`mt-0.5 h-5 w-5 shrink-0 ${colors.accent}`} />
              <div>
                <p className="text-sm text-foreground/80">{level.connectsToNext}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {validLevelId !== 'a' && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/level/a')}>
                      Level A
                    </Button>
                  )}
                  {validLevelId !== 'b' && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/level/b')}>
                      Level B
                    </Button>
                  )}
                  {validLevelId !== 'c' && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/level/c')}>
                      Level C
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => navigate('/mapping')}>
                    View Full Mapping
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* ── Phase detail drawer ───────────────────────────────────── */}
      <PhaseDetailDrawer
        phase={selectedPhase}
        levelId={validLevelId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        guardrails={level.guardrails}
        onDrillDown={handleDrillDown}
      />
    </motion.main>
  );
}
