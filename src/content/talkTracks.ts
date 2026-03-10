// ── Talk Tracks ──────────────────────────────────────────────────────
// Pre-written narratives for 3 durations x 3 audiences.

import type { TalkTrack } from './model';

export const talkTracks: readonly TalkTrack[] = [
  // ── 30-second (elevator pitch) ─────────────────────────────────────

  {
    id: 'tt-30s-exec',
    duration: '30s',
    audience: 'exec',
    title: 'Elevator Pitch for Executives',
    text: 'Fast Forward is how we turn strategic questions into tested answers in days, not quarters. We frame the right problem, build a working prototype with AI acceleration, validate it with real users, and give you an evidence-based decision: scale it, pivot it, or stop. Protogen is the engine underneath—it keeps the build fast, governed, and repeatable. You get a clear investment decision grounded in what we actually learned, not what we assumed.',
  },
  {
    id: 'tt-30s-leads',
    duration: '30s',
    audience: 'leads',
    title: 'Elevator Pitch for Delivery Leads',
    text: 'Fast Forward gives us a structured way to go from problem framing to validated prototype in days. Protogen is our delivery engine inside it—a five-stage SDLC powered by context engineering that takes us from discovery through a demo-ready product. When UI fidelity matters, we plug in the Design-to-Code module to turn Figma and tokens into runnable components with a clean handoff. Every stage has guardrails and human review baked in.',
  },
  {
    id: 'tt-30s-pod',
    duration: '30s',
    audience: 'pod',
    title: 'Elevator Pitch for the Delivery Pod',
    text: 'Here is how we work: Fast Forward sets the problem and success criteria. Protogen is our build loop—discover, vision, set up, build, release. During Build, when we need pixel-level UI work, we run the Design-to-Code workflow: confirm Figma tokens, prototype fast, cover edge cases, and produce a handoff package. AI does the heavy lifting; we own the review, the quality, and the decisions.',
  },

  // ── 2-minute (structured overview) ─────────────────────────────────

  {
    id: 'tt-2min-exec',
    duration: '2min',
    audience: 'exec',
    title: 'Structured Overview for Executives',
    text: `Fast Forward is our operating model for accelerated innovation. It has five phases that protect us from the biggest risk in innovation: building the wrong thing quickly.

First, we frame the right problem—light intake, clear success signals, a 24-to-48-hour prototype scope. Second, we define the experience—cross-functional concepting where experience design leads, not technology. Third is "the fast part": we use AI-accelerated prototyping to produce a cloud-hosted, testable prototype. Fourth, we validate—does it solve the problem, where does it break, what would it take to scale? Fifth, we decide: production build, co-build enablement, innovation flywheel, or design transformation.

The engine that powers phase three is called Protogen. It is a context-engineered delivery loop—shared context evolves from raw data through requirements into working code, with human review at every gate. Inside Protogen, when design-system fidelity matters, we run a Design-to-Code module that turns Figma tokens into interactive prototypes and engineering-ready starter code.

The result: you get a tested prototype, evidence-based decision signals, and a clear path forward—in days, not months.`,
  },
  {
    id: 'tt-2min-leads',
    duration: '2min',
    audience: 'leads',
    title: 'Structured Overview for Delivery Leads',
    text: `The operating model has three nested layers. Understanding the nesting is the key to running it well.

Level A is Fast Forward—the program-level frame. It ensures we start with a real problem (Pre-Work), define the experience before choosing technology (Experience Definition), build fast with AI (The Fast Part), validate honestly (Learn Before Committing), and commit to a path (Decision). Your job as a lead is to keep the team honest at phases one, four, and five.

Level B is Protogen—the delivery engine inside "the fast part." Five stages: Discovery, Visioning, Setup, Build, Release. Three governing principles: context engineering throughout, shared tooling with human review, and AI applied to every stage. Context is the through-line—it evolves from found data in Discovery to implementation detail in Build. If context drifts, the prototype drifts. Guard it.

Level C is Design-to-Code Acceleration—a capability module that plugs into Build when UI and design-system fidelity matter. Four steps: Intake and Constraints (governance first), Prototype Build (fast, token-driven), State and Edge-Case Coverage (where value compounds), and Engineering Handoff (productionization-ready baseline). It consumes Figma as source of truth and produces runnable, token-aligned components plus a handoff package.

The mappings are direct: A1 feeds B1, A2 feeds B2, A3 spans B3 and B4, C runs inside B4, and A4-A5 consume outputs from B4, B5, and C3-C4.`,
  },
  {
    id: 'tt-2min-pod',
    duration: '2min',
    audience: 'pod',
    title: 'Structured Overview for the Delivery Pod',
    text: `Here is how the three layers of our operating model work together day to day.

Fast Forward (Level A) sets the guardrails: what problem are we solving, what does success look like, and how will we decide what to do next. You will mostly feel this in the framing at the start and the validation at the end.

Protogen (Level B) is our daily workflow. Discovery: we gather data and synthesize signals. Visioning: we define the north star, requirements, and MVP shape—this becomes the context that keeps AI on track. Setup: we configure tooling, models, and guardrails—your shared dev environment. Build: this is the core loop—instructions, context, design, code, test, refine. Release: demo it, deploy it, capture what we learned.

Design-to-Code (Level C) is the workflow we use inside Build when we need UI that matches the design system. Step one: confirm Figma tokens are the authority and define data boundaries. Step two: generate the UI skeleton aligned to tokens, build screens, implement interactions. Step three: add loading, empty, error, permission, and validation states—this is where the prototype goes from demo to real. Step four: produce the handoff package with structured code, wired tokens, and documented assumptions.

Key rule: AI output is always a draft. We review everything. We own the quality.`,
  },

  // ── 5-minute (detailed walkthrough) ────────────────────────────────

  {
    id: 'tt-5min-exec',
    duration: '5min',
    audience: 'exec',
    title: 'Detailed Walkthrough for Executives',
    text: `Let me walk you through how we approach accelerated innovation and why this model protects your investment.

The challenge most organizations face is not building fast enough—it is building the wrong thing fast. Fast Forward is designed to prevent that. It is our program-level operating model with five phases.

Phase one, Pre-Work, takes hours, not weeks. We clarify the target user, the business outcome, constraints, and learning goals. We define a problem hypothesis and a success signal. We scope what can be prototyped in 24 to 48 hours. This constraint is intentional—it forces focus.

Phase two, Experience Definition, is cross-functional rapid concepting. Designers, product leads, and engineers collaborate to define the core journey and value moments. A critical principle here: experience design leads, not technology. We produce a clear experience flow and rough UX artifacts.

Phase three is "the fast part"—AI-accelerated prototyping. This is where Protogen, our delivery engine, takes over. Protogen is a five-stage SDLC: Discovery synthesizes signals into opportunity themes. Visioning defines the north star and MVP shape. Setup prepares the AI workspace with tooling, models, and guardrails. Build is the core creation loop—design, code, test, refine—powered by context engineering. Release demos, deploys, and captures learnings.

Inside Protogen's Build stage, when we need design-system-quality UI, we run a specialized module called Design-to-Code Acceleration. It takes Figma components and tokens as its source of truth and produces interactive prototypes plus engineering-ready starter code. It has its own governance: intake constraints, token-driven prototyping, comprehensive state coverage—loading, empty, error, permission, validation—and a structured engineering handoff.

Three governing principles run through Protogen. First, context engineering throughout: shared context evolves from raw data to requirements to instructions to implementation. Second, shared tooling with human review: AI accelerates but people own validation, quality, and decisions. Third, AI all the things: we apply AI to research, synthesis, requirements, design, code, testing, and storytelling.

Phase four, Learn Before Committing, is where we test the prototype against reality. Three questions matter: Does it solve the problem? Where does it break? What would it take to scale? The answers produce evidence-based decision signals.

Phase five, Convert Learning into Action, is the commitment. Based on evidence, you choose a path: production build, co-build enablement, innovation flywheel, or design transformation. The output is a clear investment decision and an evidence-grounded roadmap.

What makes this different from a typical innovation sprint is the nesting. Fast Forward provides strategic governance. Protogen provides delivery discipline. Design-to-Code provides craft-level precision. Each layer has its own guardrails, and every layer produces artifacts that feed the next. The result is not just a prototype—it is an evidence base for your next strategic decision.`,
  },
  {
    id: 'tt-5min-leads',
    duration: '5min',
    audience: 'leads',
    title: 'Detailed Walkthrough for Delivery Leads',
    text: `I want to walk through the full operating model so you can see how to run it and where the critical handoff points are.

Start with Level A, Fast Forward. This is the program-level frame your sponsors and stakeholders care about. Five phases.

A1, Pre-Work: light intake to frame the right problem. Your outputs are a problem hypothesis, success signal, and 24-to-48-hour prototype scope. Pitfall: some teams want to run weeks of discovery here. Resist that—just enough framing to know we are pointing at the right problem.

A2, Experience Definition: cross-functional rapid concepting. Designers, product, and engineering define the core journey and value moments together. The principle is "experience design leads, not technology." Outputs: experience flow, rough UX/UI artifacts, shared understanding. This maps directly to B2 Visioning, which translates those experience artifacts into requirements, scope, and MVP shape.

A3, The Fast Part: this is where you shift into Protogen. Two Protogen stages map here—Setup (B3) and Build (B4). Setup is often underestimated. This is where you configure your AI workspace, define guardrails, and establish working rules. If you skip it, Build becomes chaotic. Build is the core loop: instructions, context, design, code, test, refine.

Inside Build, when your team needs design-system-quality UI, you activate Level C, Design-to-Code Acceleration. Four steps:

C1, Intake and Constraints: confirm Figma tokens as authority, confirm tech constraints, define data boundaries. This is governance first—do not skip it. Output: build constraints checklist and scope.

C2, Prototype Build: generate UI skeleton aligned to tokens, implement interactions and responsiveness, build core screens. Output: interactive prototype baseline. The key here is token-driven from the start—do not plan to retrofit tokens later.

C3, State and Edge-Case Coverage: add loading, empty, error, permission, and validation states. Validate flow logic with stakeholders. This is where the prototype becomes trustworthy. Output: state-complete prototype. This also feeds A4 validation directly—the richer the states, the better the evidence.

C4, Engineering Handoff: produce structured component code, wire tokens consistently, document patterns and assumptions. Output: starter code baseline plus handoff package. Include the receiving engineers in C3 reviews so C4 is not a surprise.

Back to Level A: A4, Learn Before Committing, consumes outputs from B4, B5, and C3. You are testing with users and stakeholders against three questions: does it solve the problem, where does it break, what would it take to scale? Your job as a lead is to ensure these questions are answered honestly, not optimistically.

A5, Convert Learning into Action, consumes Release outputs. Four paths: production build, co-build enablement, innovation flywheel, design transformation. Make the decision explicit and documented.

Key operational points: context engineering is the through-line—treat context like code, version it and review it. Human review is non-negotiable at every gate. AI output is always a draft. And capture your playbook learnings during Release, not after.`,
  },
  {
    id: 'tt-5min-pod',
    duration: '5min',
    audience: 'pod',
    title: 'Detailed Walkthrough for the Delivery Pod',
    text: `Let me walk through exactly how we work together across all three layers, so everyone knows their role and the rhythm.

The big picture: Fast Forward (Level A) is the strategic wrapper that leadership cares about. Protogen (Level B) is our delivery loop—this is where we spend most of our time. Design-to-Code (Level C) is a specialized workflow we run inside Protogen when UI fidelity matters.

Starting with what you will feel most: Protogen.

B1, Discovery: we gather found data—existing research, analytics, interviews, current-state signals. AI helps us synthesize at scale. Output: opportunity themes and problem framing. This is informed by the Pre-Work that leadership ran in A1.

B2, Visioning: we define the north star. This is critical—it produces the initial context that keeps AI on track for the entire build. We define value, select targets, write requirements, scope the MVP shape. If this is vague, everything downstream hallucinates. Take the time here.

B3, Setup: we configure the AI workspace. Tooling, models, guardrails, shared dev environment. Working rules get defined here. This is where we set up context engineering foundations—the shared context that will evolve from requirements to instructions to implementation detail.

B4, Build: the core loop. We set instructions and context, then cycle through design, code, test, refine. We adjust context as our understanding deepens. AI does the heavy lifting on generation; we own the review.

When we need design-system-quality UI during Build, we switch into the Design-to-Code workflow:

C1, Intake and Constraints: we confirm Figma tokens are the authority—no improvising components. We confirm the target tech stack, constraints, and standards. We define data boundaries—no real secrets or PII in prototypes. Output: a build constraints checklist.

C2, Prototype Build: we generate the UI skeleton and components aligned to design tokens. We implement interactions, responsiveness, core screens, and navigation. The key discipline is token-driven from minute one. If you are hardcoding a color value instead of using a token, stop and fix it. Output: interactive prototype baseline.

C3, State and Edge-Case Coverage: this is where the prototype goes from "happy path demo" to something you can actually validate. We add loading states, empty states, error states, permission states, and validation states. We validate flow logic and content behavior. We iterate with stakeholders—show them the error state, not just the success state. Output: state-complete prototype. Pro tip: invite the engineers who will receive the handoff to these reviews.

C4, Engineering Handoff: we produce structured component code aligned to the team's conventions. We wire tokens consistently across every component. We document patterns and assumptions. We note known gaps. Output: starter code baseline plus handoff package. Optional add-ons include Storybook stories, test scaffolds, and state diagrams.

Back to Protogen: B5, Release. We run end-to-end tests, deploy to an accessible environment, review with stakeholders, and capture learnings. The playbook gets updated. This feeds the evidence that leadership uses in A4 (Learn Before Committing) and A5 (Decision).

Rules that apply everywhere: AI output is a draft—we review everything. Context is our most important asset—treat it like code. Guardrails are set in Setup, not invented during Build. Document as you go, not at the end. And the five states—loading, empty, error, permission, validation—are not nice-to-haves; they are how we produce trustworthy prototypes.`,
  },
] as const satisfies readonly TalkTrack[];
