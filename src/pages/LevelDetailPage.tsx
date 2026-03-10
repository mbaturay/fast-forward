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
}> = {
  a: { badgeVariant: 'levelA', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  b: { badgeVariant: 'levelB', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  c: { badgeVariant: 'levelC', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="space-y-10">
        {/* ── Level overview ────────────────────────────────────────── */}
        <LevelOverview level={level} />

        {/* ── Phase timeline ───────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Phases</h2>
          <PhaseTimeline
            phases={level.phases}
            levelId={validLevelId}
            onPhaseClick={handlePhaseClick}
          />
        </section>

        {/* ── Guardrails ───────────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Guardrails</h2>
          <GuardrailsPanel guardrails={level.guardrails} levelId={validLevelId} />
        </section>

        {/* ── Principles (Level B only) ────────────────────────────── */}
        {validLevelId === 'b' && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Governing Principles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {(level as LevelB).principles.map((principle) => (
                <Card key={principle.title}>
                  <CardContent className="flex flex-col gap-2 p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <h3 className="text-sm font-semibold text-gray-900">{principle.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Inputs / Outcomes (Level C only) ─────────────────────── */}
        {validLevelId === 'c' && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Inputs &amp; Outcomes</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ArrowDownToLine className="h-4 w-4 text-amber-500" />
                    Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).inputOutcome.inputs.map((input) => (
                      <li key={input} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ArrowUpFromLine className="h-4 w-4 text-amber-500" />
                    Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).inputOutcome.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quality Controls &amp; Deliverables</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-amber-500" />
                    Quality Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).qualityControls.controls.map((control) => (
                      <li key={control} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {control}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <FileOutput className="h-4 w-4 text-amber-500" />
                    Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(level as LevelC).qualityControls.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Common Pitfalls</h2>
          <Card className="border-red-100">
            <CardContent className="p-5">
              <ul className="space-y-2">
                {level.commonPitfalls.map((pitfall) => (
                  <li key={pitfall} className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    {pitfall}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── Tips for Success ─────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Tips for Success</h2>
          <Card className="border-green-100">
            <CardContent className="p-5">
              <ul className="space-y-2">
                {level.tipsForSuccess.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── How It Connects ──────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">How It Connects</h2>
          <Card className={colors.bg}>
            <CardContent className="flex items-start gap-3 p-5">
              <Link2 className={`mt-0.5 h-5 w-5 shrink-0 ${colors.text}`} />
              <div>
                <p className="text-sm text-gray-700">{level.connectsToNext}</p>
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
