// ── Healthy Overlap Content ──────────────────────────────────────────
// Derived from healthy-overlap.md — proves A/B/C separation is clean.

import type { GovernanceCard, FutureModule } from './model';

/** The 4-point test for when layers compete for authority */
export const authorityTest = [
  'Define the same decision rights',
  'Own the same artifacts',
  'Control the same phase',
  'Try to be "the main process"',
] as const;

/** Governance cards for each level */
export const governanceCards: readonly GovernanceCard[] = [
  {
    level: 'a',
    governs: [
      'Why we\'re doing this',
      'Whether we should scale',
      'What the investment decision is',
      'What path forward we choose',
    ],
    doesNotGovern: [
      'How code is written',
      'How design tokens are wired',
      'UI state coverage',
      'Dev environment setup',
    ],
    identity: 'Organizational direction and investment clarity',
    useCases: [
      'Starting a new initiative',
      'Need executive buy-in',
      'Need structured experimentation',
      'Need to decide: build / pivot / scale / stop',
    ],
    altitude: '30,000 ft',
    owner: 'Exec / Sponsor',
    focus: 'Direction + investment',
  },
  {
    level: 'b',
    governs: [
      'How the team moves from signals to demo-ready product',
      'Context engineering',
      'Tooling + guardrails',
      'Iterative build loop',
    ],
    doesNotGovern: [
      'Investment decisions',
      'Program-level strategy',
      'Component-level design rules',
      'Whether to proceed or stop',
    ],
    identity: 'Controlled acceleration',
    useCases: [
      'A decision has been made to prototype/build',
      'A team is actively executing',
      'Need a repeatable AI-accelerated SDLC',
      'Want delivery discipline with speed',
    ],
    altitude: '10,000 ft',
    owner: 'Delivery Lead',
    focus: 'Execution system',
  },
  {
    level: 'c',
    governs: [
      'How UI prototypes are created',
      'How design systems are respected',
      'How starter code is handed off cleanly',
      'State and edge-case coverage',
    ],
    doesNotGovern: [
      'MVP scope',
      'Tooling for the entire team',
      'Program decisions',
      'Replacing the SDLC',
    ],
    identity: 'UI acceleration + consistency',
    useCases: [
      'You are in B.Build',
      'Need high-fidelity UI quickly',
      'Want to reduce frontend rework',
      'Need clean FE handoff',
    ],
    altitude: '3,000 ft',
    owner: 'Design + FE Pod',
    focus: 'UI implementation',
  },
] as const;

/** Anti-patterns: when overlap becomes a problem */
export const antiPatterns = [
  { bad: 'C starts defining MVP strategy', rule: 'C accelerates UI — it doesn\'t set product direction' },
  { bad: 'B starts redefining investment decision logic', rule: 'B executes delivery — A owns the go/no-go' },
  { bad: 'A starts prescribing component-level dev rules', rule: 'A sets direction — C and B own the how' },
] as const;

/** The clean rule */
export const cleanRules = {
  a: 'Should we?',
  b: 'How do we run delivery?',
  c: 'How do we accelerate UI inside delivery?',
} as const;

/** Decision flowchart entries */
export const decisionGuide = [
  { scenario: 'Starting a new initiative?', action: 'Use A', level: 'a' as const },
  { scenario: 'Prototyping inside that initiative?', action: 'Run B', level: 'b' as const },
  { scenario: 'Building UI quickly with token alignment?', action: 'Use C inside B', level: 'c' as const },
  { scenario: 'Deciding whether to productionize?', action: 'Back to A (using evidence from B)', level: 'a' as const },
  { scenario: 'Scaling into production?', action: 'A chooses the path, B adapts to full production SDLC', level: 'a' as const },
] as const;

/** Future modules that could plug into B alongside C */
export const futureModules: readonly FutureModule[] = [
  { name: 'AI-Assisted Research Synthesis', description: 'Scaled qualitative and quantitative research analysis' },
  { name: 'Data Simulation Module', description: 'Synthetic data generation for prototype realism' },
  { name: 'Agent Orchestration Module', description: 'Multi-agent workflows for complex build tasks' },
  { name: 'Test Automation Module', description: 'AI-driven test scaffolding and coverage analysis' },
] as const;
