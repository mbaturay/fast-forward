// ── Content Checksum: sha256:ff-protogen-os-v1-2026-03-10 ───────────
// All structured content for the Fast Forward / Protogen Operating System.
// Source of truth: Fast Forward Operating Model paper (2026).

import type { Level, LevelA, LevelB, LevelC, Guardrail } from './model';

// ── Shared Guardrails ────────────────────────────────────────────────

const sharedGuardrails: Guardrail[] = [
  {
    id: 'g-human-review',
    title: 'Human Review Required',
    description:
      'All AI output is treated as draft. A qualified human must review and approve before it moves forward.',
    appliesTo: ['a', 'b', 'c'],
  },
  {
    id: 'g-no-pii',
    title: 'No Secrets or PII in Prototypes',
    description:
      'Define data boundaries early. No production secrets, PII, or sensitive data enters the prototype environment.',
    appliesTo: ['b', 'c'],
  },
  {
    id: 'g-evidence-decisions',
    title: 'Evidence-Based Decisions Only',
    description:
      'Every proceed/pivot/stop decision must be grounded in observed evidence, not opinions or assumptions.',
    appliesTo: ['a', 'b'],
  },
  {
    id: 'g-design-parity',
    title: 'Design Parity Check',
    description:
      'Built UI is compared against Figma source of truth to ensure token and component fidelity.',
    appliesTo: ['c'],
  },
  {
    id: 'g-accessibility',
    title: 'Accessibility Baseline',
    description:
      'All prototypes meet a minimum accessibility standard (keyboard nav, contrast, semantic markup).',
    appliesTo: ['c'],
  },
  {
    id: 'g-security-boundary',
    title: 'Security Boundary Compliance',
    description:
      'Prototype code respects defined security boundaries; no live auth tokens or production endpoints.',
    appliesTo: ['b', 'c'],
  },
  {
    id: 'g-code-style',
    title: 'Engineering Alignment',
    description:
      'Code style, structure, and conventions are reviewed for alignment with the target engineering org.',
    appliesTo: ['c'],
  },
];

// ── Level A: Fast Forward Operating Model ────────────────────────────

export const levelA: LevelA = {
  id: 'a',
  title: 'Fast Forward Operating Model',
  subtitle: 'Enterprise / Program Level',
  shortName: 'Fast Forward',
  description:
    'Fast Forward is the program-level operating model: frame the right problem, concept quickly, build a functional prototype fast, validate, and decide what to scale.',
  purpose:
    'Govern accelerated innovation at the enterprise/program level. Intentionally lightweight but structured: prevent building the wrong thing quickly, force validation, and end with a clear strategic decision.',
  audience: 'Executive sponsors, program leaders, portfolio stakeholders',
  whyItExists:
    'A is the "leadership view." It answers: Are we solving the right problem? What did we learn (evidence)? What are we doing next (decision + path)?',
  view: 'Leadership view',
  answersQuestions: [
    'Are we solving the right problem?',
    'What did we learn (evidence)?',
    'What are we doing next (decision + path)?',
  ],
  phases: [
    {
      id: 'a1',
      number: 1,
      title: 'Pre-Work',
      subtitle: 'Framing the Right Problem',
      goal: 'Quickly clarify the target user, business outcome, constraints, and learning goals without weeks of discovery.',
      activities: [
        'Light intake (not weeks of discovery)',
        'Clarify target user and business outcome',
        'Define constraints and learning goals',
        'Scope a 24-48 hour prototype target',
      ],
      outputs: [
        'Problem hypothesis',
        'Success signal',
        '24-48 hour prototype scope',
      ],
    },
    {
      id: 'a2',
      number: 2,
      title: 'Experience Definition',
      subtitle: 'Rapid Concepting',
      goal: 'Cross-functional collaboration to define the core journey and value moments, with experience design leading over technology.',
      activities: [
        'Cross-functional collaboration',
        'Focus on core journey and value moments',
        'Experience design leads, not technology',
        'Build shared understanding across the team',
      ],
      outputs: [
        'Clear experience flow',
        'Rough UX/UI artifacts',
        'Shared understanding',
      ],
    },
    {
      id: 'a3',
      number: 3,
      title: 'The "Fast" Part',
      subtitle: 'AI-Accelerated Prototyping',
      goal: 'Turn intent into working software using AI acceleration.',
      activities: [
        'Scaffold code with AI acceleration',
        'Speed up frontend/backend setup',
        'Create mocks and integrations',
        'Engineering focus on architecture, feasibility, and risk',
      ],
      outputs: [
        'Cloud-hosted functional prototype',
        'Clickable and testable experience',
      ],
      drillDownTarget: 'b',
    },
    {
      id: 'a4',
      number: 4,
      title: 'Learn Before Committing',
      subtitle: 'Validation & Learning',
      goal: 'Test the prototype with users, stakeholders, and technical realities to generate evidence-based decision signals.',
      activities: [
        'Test with real users',
        'Review with stakeholders',
        'Validate against technical realities',
        'Assess scalability and production feasibility',
      ],
      outputs: [
        'Evidence-based decision signals: proceed / pivot / stop',
      ],
      keyQuestions: [
        'Does it solve the problem?',
        'Where does it break?',
        'What would it take to scale?',
      ],
    },
    {
      id: 'a5',
      number: 5,
      title: 'Convert Learning into Action',
      subtitle: 'Decision & Path Forward',
      goal: 'Choose a path forward grounded in evidence and commit to the investment.',
      activities: [
        'Evaluate evidence against decision criteria',
        'Select path: Production Build, Co-Build Enablement, Innovation Flywheel, or Design Transformation',
        'Define investment level and timeline',
        'Produce evidence-grounded roadmap',
      ],
      outputs: [
        'Clear investment decision',
        'Evidence-grounded roadmap',
        'Selected path: A) Production Build, B) Co-Build Enablement, C) Innovation Flywheel, or D) Design Transformation',
      ],
    },
  ],
  guardrails: sharedGuardrails.filter((g) => g.appliesTo.includes('a')),
  commonPitfalls: [
    'Skipping Pre-Work and jumping straight to building',
    'Letting technology choices lead instead of experience design',
    'Treating the prototype as production-ready',
    'Ignoring validation evidence because of sunk-cost bias',
    'Failing to commit to a clear decision path at the end',
  ],
  tipsForSuccess: [
    'Keep Pre-Work to hours, not weeks—just enough to frame the right problem',
    'Ensure cross-functional representation from day one',
    'Treat Phase 3 as learning, not delivery',
    'Write down your success signals before you build',
    'Make the Phase 5 decision explicit and documented',
  ],
  connectsToNext:
    'Phase 3 ("The Fast Part") is powered by the Protogen delivery engine (Level B). When you drill into how the prototype actually gets built, you enter Protogen.',
};

// ── Level B: Protogen SDLC ───────────────────────────────────────────

export const levelB: LevelB = {
  id: 'b',
  title: 'Protogen SDLC',
  subtitle: '"The Fast Part" Delivery Engine — Product Build Level',
  shortName: 'Protogen',
  description:
    'Protogen is the delivery engine inside the "fast part," using context engineering and shared tooling to create a demo-ready product quickly.',
  purpose:
    'Power Fast Forward Phase 3 with a context-engineered SDLC that produces a demo-ready product quickly, with guardrails and human review.',
  audience: 'Delivery leads, product managers, engineering leads, designers',
  whyItExists:
    'B is the "delivery view." It answers: What steps does the team run to go from signals to demo? How do we avoid hallucinations/chaos (context + guardrails)? How do we repeat this reliably (playbook)?',
  view: 'Delivery view',
  answersQuestions: [
    'What steps does the team run to go from signals to demo?',
    'How do we avoid hallucinations and chaos?',
    'How do we repeat this reliably?',
  ],
  phases: [
    {
      id: 'b1',
      number: 1,
      title: 'Discovery',
      subtitle: 'Discover & Synthesize',
      goal: 'Gather found data, interviews, and current-state signals; perform desk-side research and scaled synthesis.',
      activities: [
        'Gather found data and interviews',
        'Assess current-state signals',
        'Desk-side research',
        'Scaled synthesis using AI',
      ],
      outputs: [
        'Opportunity themes',
        'Problem framing',
      ],
    },
    {
      id: 'b2',
      number: 2,
      title: 'Visioning',
      subtitle: 'Define the North Star',
      goal: 'Define the value proposition, target selection, requirements, scope, and MVP shape to produce initial context that keeps the model on track.',
      activities: [
        'Value definition and target selection',
        'Requirements gathering',
        'Scope definition',
        'MVP shape articulation',
      ],
      outputs: [
        'Initial context that keeps the model on track',
        'Requirements and scope document',
        'MVP shape',
      ],
    },
    {
      id: 'b3',
      number: 3,
      title: 'Setup',
      subtitle: 'Set Up the AI Workspace',
      goal: 'Prepare tooling, models, guardrails, and a shared development environment so the team is ready to build.',
      activities: [
        'Configure tooling and models',
        'Define guardrails and working rules',
        'Set up shared development environment',
        'Establish context engineering foundations',
      ],
      outputs: [
        'Ready-to-build stack',
        'Working rules',
      ],
    },
    {
      id: 'b4',
      number: 4,
      title: 'Build',
      subtitle: 'Create & Iterate',
      goal: 'Use instructions and context to design, code, test, refine, and adjust until a demo-ready experience emerges.',
      activities: [
        'Instructions and context setting',
        'Design, code, test, refine cycles',
        'Adjust context as understanding deepens',
        'Run design-to-code acceleration (Level C) when UI fidelity matters',
      ],
      outputs: [
        'Demo-ready experience',
        'Clearer decisions',
      ],
      drillDownTarget: 'c',
    },
    {
      id: 'b5',
      number: 5,
      title: 'Release',
      subtitle: 'Demo, Deploy & Scale',
      goal: 'Run, test, deploy the product; review with stakeholders; capture learnings for the playbook.',
      activities: [
        'Run and test the product end-to-end',
        'Deploy to accessible environment',
        'Review with stakeholders',
        'Capture learnings and update playbook',
      ],
      outputs: [
        'Accessible product',
        'Repeatable playbook',
      ],
    },
  ],
  principles: [
    {
      title: 'Context Engineering Throughout',
      description:
        'Shared context evolves from found data to requirements to instructions to implementation detail. Context is the through-line.',
    },
    {
      title: 'Shared Tooling + Human Review',
      description:
        'AI accelerates; people own validation, quality, and decisions. The tools are shared, but accountability is human.',
    },
    {
      title: 'AI All the Things',
      description:
        'Apply AI to research, synthesis, requirements, design, code, testing, insights, and storytelling. Every stage benefits.',
    },
  ],
  guardrails: sharedGuardrails.filter((g) => g.appliesTo.includes('b')),
  commonPitfalls: [
    'Skipping Discovery and feeding AI bad context',
    'Not defining the MVP shape clearly in Visioning',
    'Treating AI output as final without human review',
    'Ignoring context drift during the Build phase',
    'Failing to capture learnings in Release',
  ],
  tipsForSuccess: [
    'Invest in Visioning—clear context prevents hallucinations later',
    'Set up guardrails in Setup, not retroactively during Build',
    'Treat context like code: version it, review it, refine it',
    'Run stakeholder reviews early and often during Build',
    'Document the playbook as you go, not at the end',
  ],
  connectsToNext:
    'During Build (Stage 4), when UI and design system fidelity matter, the team runs the Design-to-Code Acceleration module (Level C) to produce token-driven prototypes and clean engineering handoffs.',
};

// ── Level C: Design-to-Code Acceleration ─────────────────────────────

export const levelC: LevelC = {
  id: 'c',
  title: 'AI-Augmented Prototyping & Design-to-Code Acceleration',
  subtitle: 'Capability Module',
  shortName: 'Design-to-Code',
  description:
    'Design-to-code acceleration is a module inside Protogen that turns Figma + requirements into runnable UI and a clean engineering handoff baseline—with governance and review built in.',
  purpose:
    'Create interactive UI prototypes and engineering-ready starter code faster and more consistently using AI within a controlled workflow.',
  audience: 'Designers, frontend engineers, design-system leads',
  whyItExists:
    'C is a specialized engine run inside Protogen (Level B), primarily during Build/Iterate. It exists because UI and design system fidelity require a dedicated, repeatable workflow that generic build steps cannot guarantee.',
  view: 'Maker view',
  answersQuestions: [
    'How do we go from Figma to runnable UI quickly and consistently?',
    'How do we maintain design system fidelity during AI-accelerated builds?',
    'What does a clean engineering handoff look like?',
  ],
  phases: [
    {
      id: 'c1',
      number: 1,
      title: 'Intake & Constraints',
      subtitle: 'Governance First',
      goal: 'Confirm authorities, constraints, and data boundaries before any code is generated.',
      activities: [
        'Confirm Figma library + tokens as authority',
        'Confirm target tech constraints and standards',
        'Define data boundaries (no secrets/PII)',
        'Create build constraints checklist',
      ],
      outputs: [
        'Build constraints checklist',
        'Scope definition',
      ],
    },
    {
      id: 'c2',
      number: 2,
      title: 'Prototype Build',
      subtitle: 'Fast, Token-Driven',
      goal: 'Generate a UI skeleton and components aligned to design tokens, with interactions and responsiveness.',
      activities: [
        'Generate UI skeleton and components aligned to tokens',
        'Implement interactions and responsiveness',
        'Build core screens and navigation',
        'Validate token adherence continuously',
      ],
      outputs: [
        'Interactive prototype baseline',
      ],
    },
    {
      id: 'c3',
      number: 3,
      title: 'State & Edge-Case Coverage',
      subtitle: 'Where Value Compounds',
      goal: 'Cover all meaningful states—loading, empty, error, permission, validation—and validate flow logic with stakeholders.',
      activities: [
        'Add loading, empty, error, permission, and validation states',
        'Validate flow logic and content behavior',
        'Iterate rapidly with stakeholders',
        'Document edge-case decisions',
      ],
      outputs: [
        'State-complete prototype',
        'Updated notes',
      ],
    },
    {
      id: 'c4',
      number: 4,
      title: 'Engineering Handoff',
      subtitle: 'Productionization-Ready Baseline',
      goal: 'Produce structured component code, wire tokens consistently, and provide comprehensive handoff documentation.',
      activities: [
        'Produce structured component code aligned to conventions',
        'Wire tokens consistently across all components',
        'Document patterns and assumptions',
        'Provide handoff notes (assumptions, known gaps)',
      ],
      outputs: [
        'Starter code baseline',
        'Handoff package',
        'Token-aligned component code',
        'Documented patterns and assumptions',
      ],
    },
  ],
  inputOutcome: {
    inputs: [
      'Figma source of truth (components, screens, tokens)',
      'Requirements (journeys, acceptance criteria, constraints)',
      'Target stack standards',
      'Non-negotiables (accessibility, security, performance)',
    ],
    outcomes: [
      'Faster alignment via runnable prototypes',
      'Reduced rework via early flow/state/edge-case validation',
      'Higher consistency via token and design system adherence',
      'Cleaner engineering handoff via structured components and documented assumptions',
    ],
  },
  qualityControls: {
    controls: [
      'AI output treated as draft + human review',
      'Design parity check against Figma source of truth',
      'Accessibility baseline validation',
      'Security boundary compliance',
      'Engineering alignment via code style and structure review',
    ],
    deliverables: [
      'Interactive prototype',
      'Token-aligned starter code baseline',
      'Handoff notes',
      'Optional add-ons: Storybook, test scaffolds, state diagrams',
    ],
  },
  guardrails: sharedGuardrails.filter((g) => g.appliesTo.includes('c')),
  commonPitfalls: [
    'Starting to build before confirming Figma tokens as authority',
    'Ignoring edge cases until late in the process',
    'Treating AI-generated code as production-ready without review',
    'Skipping the handoff package and relying on verbal knowledge transfer',
    'Not validating accessibility until after handoff',
  ],
  tipsForSuccess: [
    'Run Intake & Constraints as a team—don\'t shortcut governance',
    'Use tokens from the very first component; don\'t retrofit later',
    'Cover the five key states early: loading, empty, error, permission, validation',
    'Write handoff notes as you build, not as a final step',
    'Include the receiving engineers in Step 3 reviews',
  ],
  connectsToNext:
    'The outputs of Design-to-Code (starter code baseline, handoff package) feed directly back into Protogen Build and Release stages, and ultimately inform the evidence used in Fast Forward Phase 4 (Learn Before Committing).',
};

// ── All Levels ───────────────────────────────────────────────────────

export const levels: readonly Level[] = [levelA, levelB, levelC] as const;

export const levelsById: Record<Level['id'], Level> = {
  a: levelA,
  b: levelB,
  c: levelC,
};
