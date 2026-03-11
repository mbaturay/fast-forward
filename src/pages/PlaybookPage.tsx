import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  ArrowDownToLine,
  Layers,
  Shield,
  Users,
  FileText,
} from 'lucide-react';
import { levels, levelsById } from '@/content/content';
import type { LevelId } from '@/content/model';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GuardrailsPanel } from '@/components/shared/GuardrailsPanel';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// ── Static playbook data ─────────────────────────────────────────────

const entryCriteria = [
  'Problem hypothesis is defined and written down',
  'Executive sponsor is identified and available',
  'Target user (or user segment) is known',
  '24-48 hour prototype scope is agreed upon',
  'Cross-functional team is assembled (design, product, engineering)',
  'Success signals are documented before build begins',
];

const requiredInputs: { level: LevelId; label: string; inputs: string[] }[] = [
  {
    level: 'a',
    label: 'Level A — Fast Forward',
    inputs: [
      'Business context and strategic questions',
      'User signal (who is the target, what pain exists)',
      'Constraints (time, technology, compliance)',
      'Learning goals (what we need to prove or disprove)',
    ],
  },
  {
    level: 'b',
    label: 'Level B — Protogen',
    inputs: [
      'Discovery data (found data, interviews, analytics)',
      'Requirements and scope from Experience Definition',
      'Technology stack preferences and constraints',
      'Guardrail definitions and working rules',
    ],
  },
  {
    level: 'c',
    label: 'Level C — Design-to-Code',
    inputs: [
      'Figma source of truth (components, screens, tokens)',
      'Target tech stack constraints and standards',
      'Acceptance criteria and journey definitions',
      'Non-negotiables (accessibility, security, performance)',
    ],
  },
];

const roles = [
  {
    role: 'Program Sponsor',
    responsibility: 'Owns the business question, approves the path forward decision, removes blockers.',
    when: 'Pre-Work (A1), Validation (A4), Decision (A5)',
  },
  {
    role: 'Product Lead',
    responsibility: 'Defines the problem hypothesis, success signals, MVP scope, and validates against user needs.',
    when: 'Pre-Work through Validation (A1-A4), Visioning (B2)',
  },
  {
    role: 'Design Lead',
    responsibility: 'Leads experience definition, owns Figma source of truth, governs design-system fidelity.',
    when: 'Experience Definition (A2), all of Level C',
  },
  {
    role: 'Engineering Lead',
    responsibility: 'Owns architecture decisions, AI workspace setup, code quality, and production feasibility assessment.',
    when: 'Setup (B3), Build (B4), Release (B5), Engineering Handoff (C4)',
  },
  {
    role: 'Delivery Pod',
    responsibility: 'Executes the Protogen SDLC day-to-day. Owns discovery, build cycles, state coverage, and documentation.',
    when: 'All of Level B, all of Level C when activated',
  },
];

const artifactTemplates: { name: string; sections: string[] }[] = [
  {
    name: 'Problem Brief',
    sections: [
      'Problem Hypothesis',
      'Target User / Segment',
      'Business Outcome (if solved)',
      'Constraints & Boundaries',
      'Success Signals',
      '24-48hr Prototype Scope',
    ],
  },
  {
    name: 'Experience Flow',
    sections: [
      'Core User Journey (steps)',
      'Value Moments (where delight happens)',
      'Decision Points',
      'Rough UX/UI Sketches',
      'Shared Understanding Notes',
    ],
  },
  {
    name: 'Prototype Scope',
    sections: [
      'Build Constraints Checklist',
      'Figma Token Authority',
      'Target Tech Stack',
      'Data Boundaries (no PII/secrets)',
      'Core Screens List',
      'State Coverage Targets',
    ],
  },
  {
    name: 'Validation Report',
    sections: [
      'Test Participants / Stakeholders',
      'Key Findings (per question)',
      'Does it solve the problem?',
      'Where does it break?',
      'What would it take to scale?',
      'Evidence Summary',
      'Recommended Path',
    ],
  },
  {
    name: 'Decision Memo',
    sections: [
      'Problem Recap',
      'What We Built',
      'What We Learned (evidence)',
      'Decision: Proceed / Pivot / Stop',
      'Selected Path: Production Build / Co-Build / Innovation Flywheel / Design Transformation',
      'Investment & Timeline',
      'Next Steps & Owners',
    ],
  },
];

const levelBadgeVariant: Record<LevelId, 'levelA' | 'levelB' | 'levelC'> = {
  a: 'levelA',
  b: 'levelB',
  c: 'levelC',
};

// ── Page ─────────────────────────────────────────────────────────────

export default function PlaybookPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Playbook' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Company Playbook
      </h1>
      <p className="mt-2 mb-8 max-w-2xl text-sm text-muted-foreground">
        Practical guide for running the Fast Forward / Protogen operating model. Entry criteria, inputs, roles, quality gates, and artifact templates.
      </p>

      <Accordion type="multiple" defaultValue={['entry']} className="space-y-3">
        {/* ── Entry Criteria ──────────────────────────────────────── */}
        <AccordionItem value="entry" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Entry Criteria</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            <p className="mb-3 text-sm text-muted-foreground">
              Before starting a Fast Forward engagement, ensure these criteria are met:
            </p>
            <ul className="space-y-2">
              {entryCriteria.map((criterion) => (
                <li key={criterion} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  {criterion}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* ── Required Inputs ─────────────────────────────────────── */}
        <AccordionItem value="inputs" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <ArrowDownToLine className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Required Inputs per Level</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            <div className="space-y-5">
              {requiredInputs.map((item) => (
                <div key={item.level}>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Badge variant={levelBadgeVariant[item.level]}>{item.level.toUpperCase()}</Badge>
                    {item.label}
                  </h4>
                  <ul className="ml-4 space-y-1.5">
                    {item.inputs.map((input) => (
                      <li key={input} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Outputs per Phase ────────────────────────────────────── */}
        <AccordionItem value="outputs" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Outputs per Phase</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            <div className="space-y-6">
              {levels.map((level) => (
                <div key={level.id}>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Badge variant={levelBadgeVariant[level.id]}>{level.id.toUpperCase()}</Badge>
                    {level.shortName}
                  </h4>
                  <div className="space-y-2 ml-4">
                    {level.phases.map((phase) => (
                      <div key={phase.id} className="flex items-start gap-3 text-sm">
                        <span className="shrink-0 font-mono text-xs font-bold text-muted-foreground mt-0.5 w-6">
                          {phase.id.toUpperCase()}
                        </span>
                        <div>
                          <span className="font-medium text-foreground">{phase.title}:</span>{' '}
                          <span className="text-muted-foreground">{phase.outputs.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Quality Gates & Guardrails ──────────────────────────── */}
        <AccordionItem value="quality" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Quality Gates &amp; Guardrails</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            <div className="space-y-8">
              {levels.map((level) => (
                <div key={level.id}>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Badge variant={levelBadgeVariant[level.id]}>{level.id.toUpperCase()}</Badge>
                    {level.shortName} Guardrails
                  </h4>
                  <GuardrailsPanel guardrails={level.guardrails} levelId={level.id} />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Roles & Responsibilities ────────────────────────────── */}
        <AccordionItem value="roles" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Roles &amp; Responsibilities</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 text-left font-semibold text-foreground">Role</th>
                    <th className="py-2 pr-4 text-left font-semibold text-foreground">Responsibility</th>
                    <th className="py-2 text-left font-semibold text-foreground">When</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r, i) => (
                    <tr
                      key={r.role}
                      className={i % 2 === 0 ? 'bg-secondary/30' : ''}
                    >
                      <td className="py-2.5 pr-4 font-medium text-foreground align-top whitespace-nowrap">
                        {r.role}
                      </td>
                      <td className="py-2.5 pr-4 text-muted-foreground align-top">{r.responsibility}</td>
                      <td className="py-2.5 text-muted-foreground align-top text-xs">{r.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 sm:hidden">
              {roles.map((r) => (
                <Card key={r.role}>
                  <CardContent className="p-4 space-y-2">
                    <CardTitle className="text-sm">{r.role}</CardTitle>
                    <p className="text-sm text-muted-foreground">{r.responsibility}</p>
                    <p className="text-xs text-muted-foreground/60">{r.when}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ── Artifact Templates ──────────────────────────────────── */}
        <AccordionItem value="artifacts" className="rounded-xl border border-border shadow-sm shadow-black/[0.03]">
          <AccordionTrigger className="px-5">
            <span className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold">Suggested Artifact Templates</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5">
            <div className="space-y-5">
              {artifactTemplates.map((template) => (
                <div key={template.name}>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    {template.name}
                  </h4>
                  <div className="rounded-lg border border-border bg-secondary/50 p-4 font-mono text-xs leading-relaxed text-foreground/70">
                    {template.sections.map((section, i) => (
                      <div key={section}>
                        <span className="text-muted-foreground">{i + 1}.</span>{' '}
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.main>
  );
}
