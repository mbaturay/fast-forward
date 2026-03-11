import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, ArrowRight, Lightbulb, Puzzle, CheckCircle2, AlertCircle, MinusCircle, Scale } from 'lucide-react';
import { mappings } from '@/content/mappings';
import { levelsById } from '@/content/content';
import {
  authorityTest,
  governanceCards,
  antiPatterns,
  cleanRules,
  decisionGuide,
  decisionRightsMatrix,
  escalationModel,
  goldenRule,
  futureModules,
} from '@/content/overlap';
import type { LevelId, Mapping } from '@/content/model';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// ── Helpers ──────────────────────────────────────────────────────────

function phaseLabel(phaseId: string, levelId: LevelId): string {
  const level = levelsById[levelId];
  const phase = level.phases.find((p) => p.id === phaseId);
  return phase ? `${phase.id.toUpperCase()} ${phase.title}` : phaseId.toUpperCase();
}

const levelBadge: Record<LevelId, 'levelA' | 'levelB' | 'levelC'> = {
  a: 'levelA',
  b: 'levelB',
  c: 'levelC',
};

const levelDot: Record<LevelId, string> = {
  a: 'bg-level-a',
  b: 'bg-level-b',
  c: 'bg-level-c',
};

// ── Mapping Row (desktop) ────────────────────────────────────────────

function MappingRow({ mapping, showC }: { mapping: Mapping; showC: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <div
        className="grid items-center gap-4 px-4 py-3 text-sm hover:bg-secondary/50 transition-colors cursor-pointer"
        style={{ gridTemplateColumns: showC ? '1fr 1fr 1fr 2fr auto' : '1fr 1fr 2fr auto' }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* A phase */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${levelDot.a}`} />
          <span className="font-medium text-foreground">{phaseLabel(mapping.aPhase, 'a')}</span>
        </div>

        {/* B phase */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${levelDot.b}`} />
          <span className="font-medium text-foreground">{phaseLabel(mapping.bPhase, 'b')}</span>
        </div>

        {/* C phase (conditional) */}
        {showC && (
          <div className="flex items-center gap-2">
            {mapping.cPhase ? (
              <>
                <span className={`h-2 w-2 rounded-full ${levelDot.c}`} />
                <span className="font-medium text-foreground">{phaseLabel(mapping.cPhase, 'c')}</span>
              </>
            ) : (
              <span className="text-muted-foreground/30">&mdash;</span>
            )}
          </div>
        )}

        {/* Relationship */}
        <p className="text-muted-foreground leading-snug">{mapping.relationship}</p>

        {/* Expand toggle */}
        <button
          type="button"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="text-muted-foreground hover:text-foreground"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Expanded: why it matters */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-secondary/50 px-4 py-3 text-sm">
              <p className="font-medium text-foreground/80 mb-1">Why it matters</p>
              <p className="text-muted-foreground">{mapping.whyItMatters}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Mobile Mapping Accordion ─────────────────────────────────────────

function MobileMappingList({ filteredMappings, showC }: { filteredMappings: Mapping[]; showC: boolean }) {
  return (
    <Accordion type="single" collapsible className="md:hidden">
      {filteredMappings.map((mapping) => (
        <AccordionItem key={mapping.id} value={mapping.id}>
          <AccordionTrigger className="text-left">
            <div className="flex flex-wrap items-center gap-2 pr-2">
              <Badge variant={levelBadge.a}>{phaseLabel(mapping.aPhase, 'a')}</Badge>
              <span className="text-muted-foreground">&rarr;</span>
              <Badge variant={levelBadge.b}>{phaseLabel(mapping.bPhase, 'b')}</Badge>
              {showC && mapping.cPhase && (
                <>
                  <span className="text-muted-foreground">&rarr;</span>
                  <Badge variant={levelBadge.c}>{phaseLabel(mapping.cPhase, 'c')}</Badge>
                </>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Relationship</p>
                <p className="text-sm text-foreground/80">{mapping.relationship}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Why it matters</p>
                <p className="text-sm text-muted-foreground">{mapping.whyItMatters}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// ── Main Page ────────────────────────────────────────────────────────

export default function MappingPage() {
  const abMappings = useMemo(
    () => mappings.filter((m) => !m.cPhase),
    [],
  );
  const bcMappings = useMemo(
    () => mappings.filter((m) => !!m.cPhase),
    [],
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Mapping View' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Cross-Level Mapping
      </h1>
      <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
        See how phases across the three levels align. Each mapping shows the relationship and why it matters.
      </p>

      {/* Key insight callout */}
      <Card className="mb-8 border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Key Insight</p>
            <p className="mt-0.5 text-sm text-foreground/70">
              The nesting is intentional: A governs the strategic journey, B runs the delivery engine
              inside A&apos;s &ldquo;Fast Part,&rdquo; and C is a specialized module inside B&apos;s Build stage.
              Each layer&apos;s outputs feed the next layer&apos;s inputs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="ab">
        <TabsList className="mb-6">
          <TabsTrigger value="ab">A &harr; B</TabsTrigger>
          <TabsTrigger value="bc">B &harr; C</TabsTrigger>
          <TabsTrigger value="full">Full A &harr; B &harr; C</TabsTrigger>
          <TabsTrigger value="overlap">Why This Works</TabsTrigger>
        </TabsList>

        {/* A ↔ B tab */}
        <TabsContent value="ab">
          {/* Desktop table */}
          <Card className="hidden md:block overflow-hidden">
            {/* Header */}
            <div
              className="grid gap-4 border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ gridTemplateColumns: '1fr 1fr 2fr auto' }}
            >
              <span>Level A</span>
              <span>Level B</span>
              <span>Relationship</span>
              <span className="w-4" />
            </div>
            <CardContent className="p-0">
              {abMappings.map((m) => (
                <MappingRow key={m.id} mapping={m} showC={false} />
              ))}
            </CardContent>
          </Card>
          <MobileMappingList filteredMappings={abMappings} showC={false} />
        </TabsContent>

        {/* B ↔ C tab */}
        <TabsContent value="bc">
          <Card className="hidden md:block overflow-hidden">
            <div
              className="grid gap-4 border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ gridTemplateColumns: '1fr 1fr 2fr auto' }}
            >
              <span>Level B</span>
              <span>Level C</span>
              <span>Relationship</span>
              <span className="w-4" />
            </div>
            <CardContent className="p-0">
              {bcMappings.map((m) => (
                <MappingRow key={m.id} mapping={m} showC={false} />
              ))}
            </CardContent>
          </Card>
          <MobileMappingList filteredMappings={bcMappings} showC={false} />
        </TabsContent>

        {/* Full A ↔ B ↔ C tab */}
        <TabsContent value="full">
          <Card className="hidden md:block overflow-hidden">
            <div
              className="grid gap-4 border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ gridTemplateColumns: '1fr 1fr 1fr 2fr auto' }}
            >
              <span>Level A</span>
              <span>Level B</span>
              <span>Level C</span>
              <span>Relationship</span>
              <span className="w-4" />
            </div>
            <CardContent className="p-0">
              {[...mappings].map((m) => (
                <MappingRow key={m.id} mapping={m} showC />
              ))}
            </CardContent>
          </Card>
          <MobileMappingList filteredMappings={[...mappings]} showC />
        </TabsContent>

        {/* Why This Works tab */}
        <TabsContent value="overlap" className="space-y-8">
          {/* ── 1. Authority Test ────────────────────────────────────── */}
          <Card className="border-level-c/20 bg-level-c-light/30">
            <CardContent className="flex items-start gap-3 p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-level-c-dark" />
              <div>
                <p className="text-sm font-semibold text-level-c-dark">The Authority Test</p>
                <p className="mt-1 text-sm text-level-c-dark/80">
                  Layers compete when they:
                </p>
                <ul className="mt-2 space-y-1">
                  {authorityTest.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-level-c-dark/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-level-c" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium text-level-c-dark">
                  A / B / C does not do that — the boundaries are clean.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ── 2. What Each Level Governs ───────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">What Each Level Governs</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {governanceCards.map((card) => {
                const colors = {
                  a: { accent: 'bg-level-a', bg: 'bg-level-a-light', text: 'text-level-a-dark', dot: 'bg-level-a', badge: 'levelA' as const },
                  b: { accent: 'bg-level-b', bg: 'bg-level-b-light', text: 'text-level-b-dark', dot: 'bg-level-b', badge: 'levelB' as const },
                  c: { accent: 'bg-level-c', bg: 'bg-level-c-light', text: 'text-level-c-dark', dot: 'bg-level-c', badge: 'levelC' as const },
                }[card.level];

                return (
                  <Card key={card.level} className="overflow-hidden">
                    <div className={`h-1 w-full ${colors.accent}`} />
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Badge variant={colors.badge}>{card.level.toUpperCase()}</Badge>
                        {levelsById[card.level].shortName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      {/* Governs */}
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Governs</p>
                        <ul className="space-y-1">
                          {card.governs.map((g) => (
                            <li key={g} className="flex items-start gap-2 text-foreground/80">
                              <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', colors.dot)} />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Does NOT govern */}
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Does not govern</p>
                        <ul className="space-y-1">
                          {card.doesNotGovern.map((g) => (
                            <li key={g} className="flex items-start gap-2 text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable: Accountable For + Produces */}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="accountable" className="border-b-0">
                          <AccordionTrigger className="py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground [&>svg]:h-3 [&>svg]:w-3">
                            Accountable For
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1">
                              {card.accountableFor.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                  <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', colors.dot, 'opacity-50')} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="produces" className="border-b-0">
                          <AccordionTrigger className="py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground [&>svg]:h-3 [&>svg]:w-3">
                            Produces
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1">
                              {card.produces.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                  <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', colors.dot, 'opacity-50')} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Authority boundary */}
                      <div className={cn('rounded-lg px-3 py-2', colors.bg)}>
                        <p className={cn('text-xs font-semibold', colors.text)}>{card.identity}</p>
                        <p className={cn('mt-1 text-xs italic', colors.text, 'opacity-80')}>{card.authorityBoundary}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── 3. Altitude Table ────────────────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Zoom Levels, Not Redundancy</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              A, B, and C all touch learning — but at different altitudes. They are zoom levels of the same system.
            </p>
            <Card className="overflow-hidden">
              {/* Desktop table */}
              <div className="hidden sm:block">
                <div className="grid grid-cols-4 gap-4 border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Layer</span>
                  <span>Altitude</span>
                  <span>Owner</span>
                  <span>Focus</span>
                </div>
                <CardContent className="p-0">
                  {governanceCards.map((card, i) => {
                    const dotColor = levelDot[card.level];
                    return (
                      <div
                        key={card.level}
                        className={cn(
                          'grid grid-cols-4 gap-4 px-4 py-3 text-sm',
                          i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'
                        )}
                      >
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <span className={cn('h-2 w-2 rounded-full', dotColor)} />
                          {levelsById[card.level].shortName}
                        </div>
                        <span className="text-foreground/80 font-mono text-xs flex items-center">{card.altitude}</span>
                        <span className="text-foreground/80">{card.owner}</span>
                        <span className="text-muted-foreground">{card.focus}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </div>
              {/* Mobile cards */}
              <div className="space-y-3 p-4 sm:hidden">
                {governanceCards.map((card) => {
                  const badge = { a: 'levelA' as const, b: 'levelB' as const, c: 'levelC' as const }[card.level];
                  return (
                    <div key={card.level} className="rounded-lg border border-border p-3 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge variant={badge}>{card.level.toUpperCase()}</Badge>
                        <span className="text-sm font-medium text-foreground">{levelsById[card.level].shortName}</span>
                        <span className="ml-auto font-mono text-xs text-muted-foreground">{card.altitude}</span>
                      </div>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Owner:</span> {card.owner}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Focus:</span> {card.focus}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          {/* ── 3b. Decision Rights Matrix ─────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Decision Rights Matrix</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Who owns, informs, or has no authority over each decision type.
            </p>
            <Card className="overflow-hidden">
              {/* Desktop table */}
              <div className="hidden sm:block">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Decision</span>
                  <span className="text-center">A</span>
                  <span className="text-center">B</span>
                  <span className="text-center">C</span>
                </div>
                <CardContent className="p-0">
                  {decisionRightsMatrix.map((row, i) => (
                    <div
                      key={row.decision}
                      className={cn(
                        'grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 text-sm',
                        i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'
                      )}
                    >
                      <span className="text-foreground">{row.decision}</span>
                      {(['a', 'b', 'c'] as const).map((level) => {
                        const val = row[level];
                        return (
                          <span key={level} className="flex items-center justify-center">
                            {val === 'owns' && <CheckCircle2 className="h-4 w-4 text-level-b" />}
                            {val === 'informs' && <AlertCircle className="h-4 w-4 text-level-c" />}
                            {val === 'none' && <MinusCircle className="h-4 w-4 text-muted-foreground/30" />}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </CardContent>
                {/* Legend */}
                <div className="flex items-center gap-5 border-t border-border bg-secondary/50 px-4 py-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-level-b" /> Owns</span>
                  <span className="flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5 text-level-c" /> Informs</span>
                  <span className="flex items-center gap-1"><MinusCircle className="h-3.5 w-3.5 text-muted-foreground/30" /> No authority</span>
                </div>
              </div>
              {/* Mobile cards */}
              <div className="space-y-3 p-4 sm:hidden">
                {decisionRightsMatrix.map((row) => (
                  <div key={row.decision} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium text-foreground mb-2">{row.decision}</p>
                    <div className="flex gap-3">
                      {(['a', 'b', 'c'] as const).map((level) => {
                        const val = row[level];
                        return (
                          <div key={level} className="flex items-center gap-1.5">
                            <Badge variant={levelBadge[level]}>{level.toUpperCase()}</Badge>
                            {val === 'owns' && <CheckCircle2 className="h-3.5 w-3.5 text-level-b" />}
                            {val === 'informs' && <AlertCircle className="h-3.5 w-3.5 text-level-c" />}
                            {val === 'none' && <MinusCircle className="h-3.5 w-3.5 text-muted-foreground/30" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ── 4. Anti-Patterns ─────────────────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Where Overlap Becomes a Problem</h2>
            <div className="space-y-3">
              {antiPatterns.map((ap) => (
                <Card key={ap.bad} className="border-destructive/20">
                  <CardContent className="flex items-start gap-3 p-4">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{ap.bad}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{ap.rule}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-4 border-level-b/20 bg-level-b-light/30">
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-semibold text-level-b-dark">The clean rule:</p>
                <div className="flex flex-wrap gap-3">
                  {(Object.entries(cleanRules) as [LevelId, string][]).map(([level, question]) => (
                    <div key={level} className="flex items-center gap-2">
                      <Badge variant={levelBadge[level]}>{level.toUpperCase()}</Badge>
                      <span className="text-sm text-level-b-dark/80">&ldquo;{question}&rdquo;</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ── 5. Decision Guide ────────────────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">When to Use What</h2>
            <div className="space-y-2">
              {decisionGuide.map((item, i) => (
                <div key={item.scenario} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{item.scenario}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <Badge variant={levelBadge[item.level]}>{item.level.toUpperCase()}</Badge>
                    <span className="text-sm text-foreground/80">{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Escalation Model + Golden Rule ─────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">When Confusion Arises</h2>
            <div className="space-y-2">
              {escalationModel.map((item, i) => (
                <div key={item.question} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <p className="min-w-0 flex-1 text-sm text-foreground">{item.question}</p>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <Badge variant={levelBadge[item.answeredBy]}>{item.answeredBy.toUpperCase()} decides</Badge>
                </div>
              ))}
            </div>
            <Card className="mt-4 border-foreground/20 bg-foreground text-background">
              <CardContent className="flex items-center gap-3 p-4">
                <Scale className="h-5 w-5 shrink-0 text-level-c" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-background/50">The Golden Rule</p>
                  <p className="mt-0.5 text-sm font-medium">{goldenRule}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ── 7. Future Vision ──────────────────────────────────────── */}
          <section>
            <Card className="border-primary/20 bg-primary/[0.03]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Puzzle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h2 className="text-base font-semibold text-foreground">The Real Opportunity</h2>
                    <p className="mt-1 text-sm text-foreground/70">
                      C is one module inside B. Future modules could turn B into a fully modular delivery engine
                      and A into a portfolio strategy layer — a scalable architecture, not just slides.
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {futureModules.map((mod) => (
                        <div key={mod.name} className="flex items-start gap-2 rounded-lg border border-primary/10 bg-card px-3 py-2">
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                          <div>
                            <p className="text-xs font-semibold text-foreground">{mod.name}</p>
                            <p className="text-xs text-muted-foreground">{mod.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </motion.main>
  );
}
