import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { mappings } from '@/content/mappings';
import { levelsById } from '@/content/content';
import type { LevelId, Mapping } from '@/content/model';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
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
  a: 'bg-indigo-500',
  b: 'bg-emerald-500',
  c: 'bg-amber-500',
};

// ── Mapping Row (desktop) ────────────────────────────────────────────

function MappingRow({ mapping, showC }: { mapping: Mapping; showC: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div
        className="grid items-center gap-4 px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        style={{ gridTemplateColumns: showC ? '1fr 1fr 1fr 2fr auto' : '1fr 1fr 2fr auto' }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* A phase */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${levelDot.a}`} />
          <span className="font-medium text-gray-900">{phaseLabel(mapping.aPhase, 'a')}</span>
        </div>

        {/* B phase */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${levelDot.b}`} />
          <span className="font-medium text-gray-900">{phaseLabel(mapping.bPhase, 'b')}</span>
        </div>

        {/* C phase (conditional) */}
        {showC && (
          <div className="flex items-center gap-2">
            {mapping.cPhase ? (
              <>
                <span className={`h-2 w-2 rounded-full ${levelDot.c}`} />
                <span className="font-medium text-gray-900">{phaseLabel(mapping.cPhase, 'c')}</span>
              </>
            ) : (
              <span className="text-gray-300">&mdash;</span>
            )}
          </div>
        )}

        {/* Relationship */}
        <p className="text-gray-600 leading-snug">{mapping.relationship}</p>

        {/* Expand toggle */}
        <button
          type="button"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="text-gray-400 hover:text-gray-600"
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
            <div className="bg-gray-50 px-4 py-3 text-sm">
              <p className="font-medium text-gray-700 mb-1">Why it matters</p>
              <p className="text-gray-600">{mapping.whyItMatters}</p>
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
              <span className="text-gray-400">&rarr;</span>
              <Badge variant={levelBadge.b}>{phaseLabel(mapping.bPhase, 'b')}</Badge>
              {showC && mapping.cPhase && (
                <>
                  <span className="text-gray-400">&rarr;</span>
                  <Badge variant={levelBadge.c}>{phaseLabel(mapping.cPhase, 'c')}</Badge>
                </>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Relationship</p>
                <p className="text-sm text-gray-700">{mapping.relationship}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Why it matters</p>
                <p className="text-sm text-gray-600">{mapping.whyItMatters}</p>
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Cross-Level Mapping
      </h1>
      <p className="mt-2 mb-6 max-w-2xl text-sm text-gray-600">
        See how phases across the three levels align. Each mapping shows the relationship and why it matters.
      </p>

      {/* Key insight callout */}
      <Card className="mb-8 border-blue-200 bg-blue-50/60">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-blue-900">Key Insight</p>
            <p className="mt-0.5 text-sm text-blue-800">
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
        </TabsList>

        {/* A ↔ B tab */}
        <TabsContent value="ab">
          {/* Desktop table */}
          <Card className="hidden md:block overflow-hidden">
            {/* Header */}
            <div
              className="grid gap-4 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500"
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
              className="grid gap-4 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500"
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
              className="grid gap-4 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500"
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
      </Tabs>
    </motion.main>
  );
}
