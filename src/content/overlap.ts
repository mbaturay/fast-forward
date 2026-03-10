// ── Healthy Overlap + Boundaries of Authority Content ────────────────
// Derived from healthy-overlap.md and boundaries-of-authority.md.

import type { GovernanceCard, DecisionRight, FutureModule } from './model';

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
      'Problem framing',
      'Hypothesis definition',
      'Investment intent',
      'Success criteria + validation thresholds',
      'Go / No-Go / Pivot decisions',
      'Path-to-scale selection',
      'Portfolio-level learning capture',
    ],
    doesNotGovern: [
      'Code structure',
      'Dev environment setup',
      'Design system implementation',
      'Component patterns',
      'Frontend handoff mechanics',
      'Technical architecture specifics',
    ],
    accountableFor: [
      'Ensuring we are solving the right problem',
      'Ensuring evidence exists before scaling',
      'Ensuring organizational alignment',
      'Ensuring budget + executive sponsorship clarity',
    ],
    produces: [
      'Problem hypothesis',
      'Defined learning objectives',
      'Experiment scope',
      'Decision artifacts',
      'Scale path selection (Production Build / Enablement / Flywheel / Transformation)',
    ],
    authorityBoundary: 'Fast Forward governs whether and why we build — not how we implement.',
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
      'Context engineering framework',
      'Delivery loop structure (Discovery \u2192 Visioning \u2192 Setup \u2192 Build \u2192 Release)',
      'Tooling selection within approved guardrails',
      'Shared development workflow',
      'Iteration cadence',
      'Demo readiness standards',
      'Evidence capture for A',
    ],
    doesNotGovern: [
      'Strategic investment decisions',
      'Portfolio prioritization',
      'Long-term funding allocation',
      'Enterprise transformation strategy',
      'Executive-level go/no-go',
    ],
    accountableFor: [
      'Converting signals into working software',
      'Maintaining build velocity without chaos',
      'Guardrail enforcement (human review, security boundaries)',
      'Producing demo-ready, testable artifacts',
      'Feeding structured learning back to A',
    ],
    produces: [
      'Synthesized discovery insights',
      'MVP definition + north star',
      'AI workspace configuration',
      'Demo-ready product',
      'Repeatable delivery playbook',
    ],
    authorityBoundary: 'Protogen governs how delivery runs, but not whether the initiative continues or scales.',
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
      'Design-to-code workflow',
      'Figma \u2192 token \u2192 UI translation process',
      'State and edge-case coverage standards',
      'Starter code baseline quality',
      'Frontend handoff package structure',
      'UI consistency enforcement',
    ],
    doesNotGovern: [
      'MVP scope definition',
      'Product vision',
      'Full SDLC governance',
      'Backend architecture',
      'Infrastructure decisions',
      'Investment decisions',
    ],
    accountableFor: [
      'Rapid UI prototyping fidelity',
      'Design system alignment',
      'Edge-case completeness',
      'Reducing frontend rework',
      'Clean developer handoff',
    ],
    produces: [
      'Interactive prototype',
      'Token-aligned UI components',
      'State-complete UI coverage',
      'Starter code baseline',
      'Handoff documentation',
    ],
    authorityBoundary: 'Design-to-Code governs UI acceleration inside delivery, not the SDLC or strategic direction.',
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

/** Decision Rights Matrix — who owns, informs, or has no authority */
export const decisionRightsMatrix: readonly DecisionRight[] = [
  { decision: 'Is this problem worth solving?', a: 'owns', b: 'none', c: 'none' },
  { decision: 'What is the MVP scope?', a: 'owns', b: 'informs', c: 'none' },
  { decision: 'How do we structure the SDLC?', a: 'none', b: 'owns', c: 'none' },
  { decision: 'Which AI tools within policy?', a: 'none', b: 'owns', c: 'informs' },
  { decision: 'How do we translate Figma to UI?', a: 'none', b: 'none', c: 'owns' },
  { decision: 'Edge-case state coverage standards', a: 'none', b: 'informs', c: 'owns' },
  { decision: 'Go / No-Go to scale', a: 'owns', b: 'informs', c: 'none' },
  { decision: 'Frontend handoff structure', a: 'none', b: 'informs', c: 'owns' },
] as const;

/** Escalation model — 3-step decision tree when confusion arises */
export const escalationModel = [
  { question: 'Is this about investment or direction?', answeredBy: 'a' as const },
  { question: 'Is this about delivery mechanics or AI workflow structure?', answeredBy: 'b' as const },
  { question: 'Is this about UI fidelity, tokens, states, or frontend baseline?', answeredBy: 'c' as const },
] as const;

/** The golden rule of the governance model */
export const goldenRule = 'No layer may redefine the authority of the layer above it.' as const;

/** Future modules that could plug into B alongside C */
export const futureModules: readonly FutureModule[] = [
  { name: 'AI-Assisted Research Synthesis', description: 'Scaled qualitative and quantitative research analysis' },
  { name: 'Data Simulation Module', description: 'Synthetic data generation for prototype realism' },
  { name: 'Agent Orchestration Module', description: 'Multi-agent workflows for complex build tasks' },
  { name: 'Test Automation Module', description: 'AI-driven test scaffolding and coverage analysis' },
] as const;
