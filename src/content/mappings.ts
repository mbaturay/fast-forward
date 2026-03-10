// ── A ↔ B ↔ C Mappings ──────────────────────────────────────────────
// Explicit cross-level mapping data derived from the operating model paper.

import type { Mapping } from './model';

export const mappings: readonly Mapping[] = [
  {
    id: 'map-1',
    aPhase: 'a1',
    bPhase: 'b1',
    relationship:
      'Pre-Work (framing the right problem) maps directly to Discovery (discover & synthesize). Both are about gathering just enough signal to proceed with confidence.',
    whyItMatters:
      'If Pre-Work is skipped or shallow, Discovery inherits bad framing. The quality of the entire prototype depends on this alignment.',
  },
  {
    id: 'map-2',
    aPhase: 'a2',
    bPhase: 'b2',
    relationship:
      'Experience Definition (rapid concepting) maps to Visioning (define the north star). The experience flow and value moments from A2 become the requirements, scope, and MVP shape in B2.',
    whyItMatters:
      'Visioning without Experience Definition produces technically valid but user-irrelevant prototypes. The north star must be anchored in real experience design.',
  },
  {
    id: 'map-3',
    aPhase: 'a3',
    bPhase: 'b3',
    relationship:
      'The "Fast Part" (AI-accelerated prototyping) begins with Setup (set up the AI workspace). B3 prepares the tooling, models, and guardrails that A3 depends on.',
    whyItMatters:
      'Rushing into prototyping without proper workspace setup leads to context drift, hallucinations, and rework. Setup is the foundation of speed.',
  },
  {
    id: 'map-4',
    aPhase: 'a3',
    bPhase: 'b4',
    relationship:
      'The "Fast Part" is primarily executed in Build (create & iterate). This is where working software emerges through design-code-test-refine cycles.',
    whyItMatters:
      'Build is where the promise of "fast" is delivered. Without the preceding Setup, Build becomes chaotic; without the succeeding Release, Build output is inaccessible.',
  },
  {
    id: 'map-5',
    aPhase: 'a3',
    bPhase: 'b4',
    cPhase: 'c1',
    relationship:
      'When UI fidelity matters during Build, the team enters Design-to-Code Acceleration starting with Intake & Constraints. C1 establishes governance before any code generation begins.',
    whyItMatters:
      'Starting design-to-code without confirming Figma authority and data boundaries creates prototypes that cannot be trusted or handed off cleanly.',
  },
  {
    id: 'map-6',
    aPhase: 'a3',
    bPhase: 'b4',
    cPhase: 'c2',
    relationship:
      'Prototype Build (fast, token-driven) runs inside B4 Build. The interactive prototype baseline is the tangible output of AI-accelerated prototyping.',
    whyItMatters:
      'Token-driven prototyping ensures design system fidelity from the start, preventing expensive retrofitting later in the process.',
  },
  {
    id: 'map-7',
    aPhase: 'a3',
    bPhase: 'b4',
    cPhase: 'c3',
    relationship:
      'State & Edge-Case Coverage runs inside B4 Build. This is where the prototype matures from a happy-path demo to a state-complete, stakeholder-validated experience.',
    whyItMatters:
      'Edge-case coverage is where value compounds. A prototype that only shows the happy path cannot generate the validation evidence that A4 requires.',
  },
  {
    id: 'map-8',
    aPhase: 'a4',
    bPhase: 'b4',
    cPhase: 'c3',
    relationship:
      'Learn Before Committing draws directly on the state-complete prototype and stakeholder feedback generated in C3 and B4. The validation evidence originates here.',
    whyItMatters:
      'A4 cannot produce evidence-based decision signals without real artifacts to test. The quality of C3 output directly determines the quality of A4 decisions.',
  },
  {
    id: 'map-9',
    aPhase: 'a4',
    bPhase: 'b5',
    relationship:
      'Learn Before Committing also draws on outputs from Release (demo, deploy & scale). Stakeholder reviews and deployment learnings inform validation.',
    whyItMatters:
      'Release surfaces real-world constraints (deployment, access, performance) that pure prototype testing may miss. These learnings are critical for honest A4 decisions.',
  },
  {
    id: 'map-10',
    aPhase: 'a5',
    bPhase: 'b5',
    relationship:
      'Convert Learning into Action consumes Release outputs and decision paths. The repeatable playbook and accessible product inform the strategic decision.',
    whyItMatters:
      'The decision to proceed, pivot, or stop must account for what the delivery team learned about repeatability and scalability during Release.',
  },
  {
    id: 'map-11',
    aPhase: 'a3',
    bPhase: 'b4',
    cPhase: 'c4',
    relationship:
      'Engineering Handoff (productionization-ready baseline) runs at the end of B4 Build, supported by B3 Setup and feeding into B5 Release. It produces the starter code and handoff package.',
    whyItMatters:
      'A clean handoff is what separates a throwaway demo from a productionization-ready baseline. Without C4, the prototype dies when the sprint ends.',
  },
] as const satisfies readonly Mapping[];
