// ── Glossary ─────────────────────────────────────────────────────────
// Canonical definitions for key terms in the Fast Forward / Protogen OS.

import type { GlossaryEntry } from './model';

export const glossary: readonly GlossaryEntry[] = [
  {
    term: 'Fast Forward',
    definition:
      'The program-level operating model that governs accelerated innovation. Five phases: Pre-Work, Experience Definition, The Fast Part, Learn Before Committing, and Convert Learning into Action. Designed to prevent building the wrong thing quickly and to end with evidence-based decisions.',
    relatedTerms: ['Protogen', 'The Fast Part', 'Evidence-Based Decision'],
    level: 'a',
  },
  {
    term: 'Protogen',
    definition:
      'The delivery engine inside Fast Forward Phase 3 ("The Fast Part"). A context-engineered SDLC with five stages—Discovery, Visioning, Setup, Build, Release—that produces a demo-ready product quickly with guardrails and human review.',
    relatedTerms: ['Fast Forward', 'Context Engineering', 'Delivery Pod'],
    level: 'b',
  },
  {
    term: 'Design-to-Code Acceleration',
    definition:
      'A capability module inside Protogen that turns Figma components, screens, and tokens plus requirements into interactive UI prototypes and engineering-ready starter code. Runs primarily during the Build stage with a four-step workflow: Intake & Constraints, Prototype Build, State & Edge-Case Coverage, and Engineering Handoff.',
    relatedTerms: ['Token-Driven', 'Engineering Handoff', 'State Coverage'],
    level: 'c',
  },
  {
    term: 'Context Engineering',
    definition:
      'The practice of deliberately evolving shared context from found data through requirements through instructions to implementation detail. Context is the through-line of Protogen—it prevents hallucinations, aligns the team, and keeps AI output on track.',
    relatedTerms: ['Protogen', 'Found Data', 'Guardrails'],
    level: 'b',
  },
  {
    term: 'North Star',
    definition:
      'The target vision defined during Protogen Visioning (B2). Includes value definition, target selection, requirements, scope, and MVP shape. Produces the initial context that keeps the model on track throughout the build.',
    relatedTerms: ['MVP Shape', 'Protogen', 'Context Engineering'],
    level: 'b',
  },
  {
    term: 'Found Data',
    definition:
      'Pre-existing data, research, analytics, interviews, and current-state signals gathered during Discovery (B1). Contrasted with net-new primary research; found data is synthesized at scale using AI to surface opportunity themes and problem framing.',
    relatedTerms: ['Context Engineering', 'Protogen'],
    level: 'b',
  },
  {
    term: 'The Fast Part',
    definition:
      'Fast Forward Phase 3—AI-accelerated prototyping that turns intent into working software. Powered by Protogen (Setup + Build stages). Outputs a cloud-hosted functional prototype that is clickable and testable.',
    relatedTerms: ['Fast Forward', 'Protogen', 'Design-to-Code Acceleration'],
    level: 'a',
  },
  {
    term: 'Build Constraints Checklist',
    definition:
      'The output of Design-to-Code Step 1 (Intake & Constraints). Confirms Figma library and tokens as authority, target tech constraints, standards, and data boundaries (no secrets or PII). Establishes governance before any code is generated.',
    relatedTerms: ['Design-to-Code Acceleration', 'Guardrails', 'Token-Driven'],
    level: 'c',
  },
  {
    term: 'Token-Driven',
    definition:
      'An approach to UI prototyping where design tokens (colors, spacing, typography, etc.) from the Figma source of truth are used from the very first component. Tokens are never retrofitted; they are the foundation of design-system fidelity.',
    relatedTerms: ['Design-to-Code Acceleration', 'Build Constraints Checklist'],
    level: 'c',
  },
  {
    term: 'State Coverage',
    definition:
      'The practice of implementing all meaningful UI states—loading, empty, error, permission, and validation—during prototyping (C3). This is where value compounds: a state-complete prototype generates the evidence needed for honest validation.',
    relatedTerms: ['Design-to-Code Acceleration', 'Quality Gates'],
    level: 'c',
  },
  {
    term: 'Engineering Handoff',
    definition:
      'Design-to-Code Step 4: producing structured component code aligned to engineering conventions, with consistently wired tokens and documented patterns, assumptions, and known gaps. The output is a starter code baseline plus handoff package—not a throwaway demo.',
    relatedTerms: ['Productionization-Ready Baseline', 'Design-to-Code Acceleration'],
    level: 'c',
  },
  {
    term: 'Guardrails',
    definition:
      'Constraints and controls that prevent AI-accelerated work from going off the rails. Include human review requirements, data boundaries (no PII/secrets), design parity checks, accessibility baselines, security boundary compliance, and engineering alignment reviews. Set during Setup (B3), not invented during Build.',
    relatedTerms: ['Quality Gates', 'Context Engineering', 'Build Constraints Checklist'],
    level: 'all',
  },
  {
    term: 'Quality Gates',
    definition:
      'Checkpoints where AI output is treated as draft and a qualified human reviews and approves before work moves forward. Applied at every stage of Protogen and every step of Design-to-Code. Non-negotiable regardless of time pressure.',
    relatedTerms: ['Guardrails', 'Protogen'],
    level: 'all',
  },
  {
    term: 'Evidence-Based Decision',
    definition:
      'A decision grounded in observed evidence from prototype testing, stakeholder reviews, and technical validation—not opinions or assumptions. Fast Forward Phase 4 produces evidence-based decision signals (proceed, pivot, or stop) that feed Phase 5.',
    relatedTerms: ['Fast Forward', 'State Coverage'],
    level: 'a',
  },
  {
    term: 'Delivery Pod',
    definition:
      'The cross-functional team that runs the Protogen SDLC. Typically includes designers, engineers, product leads, and a delivery lead. The pod owns the day-to-day execution of Discovery through Release, with AI augmenting every stage.',
    relatedTerms: ['Protogen', 'Fast Forward'],
    level: 'b',
  },
  {
    term: 'MVP Shape',
    definition:
      'The defined scope, requirements, and target selection for the minimum viable prototype. Articulated during Visioning (B2) as part of the north star context. Determines what gets built in the 24-to-48-hour prototype window.',
    relatedTerms: ['North Star', 'Protogen'],
    level: 'b',
  },
  {
    term: 'Productionization-Ready Baseline',
    definition:
      'The starter code baseline and handoff package produced by Design-to-Code Step 4. Structured component code aligned to conventions, consistently wired tokens, and documented patterns. Not production code, but a clean foundation that engineering teams can build on without starting from scratch.',
    relatedTerms: ['Engineering Handoff', 'Design-to-Code Acceleration', 'Token-Driven'],
    level: 'c',
  },
  {
    term: 'Healthy Overlap',
    definition:
      'The intentional and governed overlap between levels A, B, and C. All three touch learning, but at different altitudes: A at 30,000 ft (direction + investment), B at 10,000 ft (execution system), and C at 3,000 ft (UI implementation). Overlap becomes a problem only when layers compete for the same decision rights, own the same artifacts, or try to be the main process.',
    relatedTerms: ['Fast Forward', 'Protogen', 'Design-to-Code Acceleration', 'Guardrails'],
    level: 'all',
  },
] as const satisfies readonly GlossaryEntry[];
