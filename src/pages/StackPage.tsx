import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Section metadata ──────────────────────────────────────────────────

const SECTIONS = [
  { id: 'hero', label: 'The Protogen Stack' },
  { id: 'origin', label: 'Where We Started' },
  { id: 'patterns', label: 'Patterns Observed' },
  { id: 'model', label: 'Three-Level Model' },
  { id: 'governance', label: 'Governance' },
  { id: 'strengthens', label: 'Why It Strengthens' },
  { id: 'arc', label: 'Engine to OS' },
] as const;

// ── Decision Rights data ──────────────────────────────────────────────

type Authority = 'owns' | 'informs' | 'none';

interface DecisionRight {
  decision: string;
  a: Authority;
  b: Authority;
  c: Authority;
}

const decisionRights: DecisionRight[] = [
  { decision: 'Investment & go/no-go', a: 'owns', b: 'informs', c: 'none' },
  { decision: 'Problem definition', a: 'owns', b: 'informs', c: 'none' },
  { decision: 'User & market validation', a: 'owns', b: 'informs', c: 'none' },
  { decision: 'Delivery methodology', a: 'informs', b: 'owns', c: 'none' },
  { decision: 'Tech stack & tooling', a: 'none', b: 'owns', c: 'informs' },
  { decision: 'Sprint scope & priorities', a: 'none', b: 'owns', c: 'informs' },
  { decision: 'Design-system fidelity', a: 'none', b: 'informs', c: 'owns' },
  { decision: 'Component-level QA', a: 'none', b: 'none', c: 'owns' },
];

// ── Anti-pattern data ─────────────────────────────────────────────────

interface AntiPatternEntry {
  direction: string;
  example: string;
  result: string;
}

const antiPatterns: AntiPatternEntry[] = [
  {
    direction: 'Strategic leaders dictating sprint mechanics',
    example: '"The sponsor starts dictating sprint scope or choosing AI models."',
    result: 'delivery team loses ownership, velocity drops.',
  },
  {
    direction: 'Delivery teams redefining business questions mid-cycle',
    example: '"The delivery lead redefines the business question mid-sprint because the prototype suggests a different direction."',
    result: 'strategic drift, stakeholder whiplash.',
  },
  {
    direction: 'Engineers overriding design-system standards',
    example: '"An engineer overrides the Figma token palette because \'it looks better in code.\'"',
    result: 'design-system fragmentation, inconsistent user experience.',
  },
  {
    direction: 'Fidelity modules over-optimizing throwaway prototypes',
    example: '"The design-to-code module insists on pixel-perfect fidelity for a throwaway prototype."',
    result: 'velocity collapse, over-engineering.',
  },
];

// ── Active-section tracking hook ──────────────────────────────────────

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

// ── Motion helpers ────────────────────────────────────────────────────

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.7, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Styled sub-components ─────────────────────────────────────────────

function SectionNumber({ children }: { children: string }) {
  return (
    <span className="block font-mono text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/40 mb-4">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-foreground">
      {children}
    </h2>
  );
}

function SubsectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-lg sm:text-xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h3>
  );
}

function Paragraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[17px] sm:text-lg leading-[1.8] text-foreground/75', className)}>
      {children}
    </p>
  );
}

function SectionDivider() {
  return <div className="w-12 h-px bg-border mx-auto" />;
}

function AuthorityCell({ value }: { value: Authority }) {
  if (value === 'owns') {
    return <span className="font-semibold text-foreground">Owns</span>;
  }
  if (value === 'informs') {
    return <span className="text-muted-foreground">Informs</span>;
  }
  return <span className="text-muted-foreground/30">&mdash;</span>;
}

// ── Side Navigation ───────────────────────────────────────────────────

function SideNav({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      className="hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 flex-col gap-5 z-30"
      aria-label="Document sections"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onNavigate(section.id)}
          className={cn(
            'group flex items-center gap-3 text-left transition-all duration-300',
            activeSection === section.id ? 'opacity-100' : 'opacity-30 hover:opacity-60',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all duration-300',
              activeSection === section.id
                ? 'bg-foreground scale-[1.6]'
                : 'bg-foreground/60',
            )}
          />
          <span className="text-[11px] font-medium tracking-wide text-foreground/80 whitespace-nowrap">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ── Nested Model Visualization ────────────────────────────────────────

function NestedModelViz() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' as const }}
      className="my-12 sm:my-16"
    >
      {/* Level A */}
      <div className="rounded-2xl border border-level-a/20 bg-level-a/[0.04] p-6 sm:p-8 md:p-10">
        <div className="flex items-baseline justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-level-a">
              Level A
            </p>
            <p className="text-sm sm:text-base font-semibold text-foreground/90 mt-1">
              Fast Forward
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Program Governance</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-mono text-[11px] tracking-wider text-muted-foreground/40">30,000 ft</p>
            <p className="text-xs text-foreground/50 mt-0.5 italic">
              Governs direction
            </p>
          </div>
        </div>

        {/* Level B */}
        <div className="rounded-xl border border-level-b/20 bg-level-b/[0.04] p-5 sm:p-7 md:p-8 ml-2 sm:ml-4">
          <div className="flex items-baseline justify-between mb-5 sm:mb-7">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-level-b">
                Level B
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground/90 mt-1">
                Protogen
              </p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">Delivery Engine</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-mono text-[11px] tracking-wider text-muted-foreground/40">10,000 ft</p>
              <p className="text-xs text-foreground/50 mt-0.5 italic">
                Governs execution
              </p>
            </div>
          </div>

          {/* Level C */}
          <div className="rounded-lg border border-level-c/20 bg-level-c/[0.04] p-4 sm:p-6 ml-2 sm:ml-4">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-level-c">
                  Level C
                </p>
                <p className="text-sm sm:text-base font-semibold text-foreground/90 mt-1">
                  Design-to-Code
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Capability Module</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground/40">3,000 ft</p>
                <p className="text-xs text-foreground/50 mt-0.5 italic">
                  Governs fidelity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Phase List Item ───────────────────────────────────────────────────

function PhaseItem({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 sm:gap-5">
      <span className="font-mono text-sm font-bold text-muted-foreground/50 shrink-0 mt-0.5 w-7 text-right">
        {id}
      </span>
      <p className="text-[17px] sm:text-lg leading-[1.8] text-foreground/75">
        <span className="font-semibold text-foreground/90">{title}</span>
        {' \u2014 '}
        {desc}
      </p>
    </div>
  );
}

// ── Anti-Pattern Callout ──────────────────────────────────────────────

function AntiPatternCard({ entry }: { entry: AntiPatternEntry }) {
  return (
    <div className="border-l-2 border-foreground/10 pl-5 sm:pl-6 py-1">
      <p className="text-sm font-semibold text-foreground/70 tracking-wide mb-1.5">
        {entry.direction}
      </p>
      <p className="text-[17px] sm:text-lg leading-[1.8] text-foreground/60 italic">
        {entry.example}
      </p>
      <p className="text-sm text-muted-foreground/60 mt-1">
        Result: {entry.result}
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ██  MAIN PAGE
// ══════════════════════════════════════════════════════════════════════

export default function StackPage() {
  const reduced = useReducedMotion();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Active section tracking
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Scroll Progress Bar ───────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-foreground/70 z-[60]"
        style={{ scaleX }}
      />

      {/* ── Side Navigation ───────────────────────────────────────── */}
      <SideNav activeSection={activeSection} onNavigate={scrollToSection} />

      {/* ── Reading Column ────────────────────────────────────────── */}
      <article className="mx-auto max-w-[680px]">

        {/* ────────────────────────────────────────────────────────── */}
        {/* HERO                                                       */}
        {/* ────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-20 sm:pb-28 md:pb-36 scroll-mt-24"
        >
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' as const }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              The Protogen Stack
            </h1>
          </motion.div>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
            className="mt-6 sm:mt-8 max-w-lg text-lg sm:text-xl leading-relaxed text-muted-foreground"
          >
            Why We Expanded the Framework, What We Formalized, and Why It Strengthens the Model
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
            className="mt-16 sm:mt-20"
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground/25" />
            </motion.div>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 1. WHERE WE STARTED                                        */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="origin" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>01</SectionNumber>
            <SectionTitle>Where We Started</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10 space-y-6">
            <Paragraph>
              Protogen began with a powerful and correct insight: artificial intelligence fundamentally changes the speed of software delivery. When code generation, test creation, infrastructure scaffolding, and iterative refinement collapse from weeks to hours, the constraint in software development shifts from execution to direction-setting.
            </Paragraph>

            <Paragraph>
              The original Protogen model articulated this shift clearly. As presented in <em>The Story of Protogen</em>, it defined an eight-step AI-accelerated delivery engine:
            </Paragraph>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-8 sm:mt-10">
            <ol className="space-y-2.5 pl-1">
              {[
                'Value Definition',
                'Target Selection',
                'Tooling',
                'Models',
                'Instructions',
                'Context Setting',
                'Iteration Loop',
                'Demo',
              ].map((step, i) => (
                <li key={step} className="flex gap-4 text-[17px] sm:text-lg text-foreground/75">
                  <span className="font-mono text-sm text-muted-foreground/40 mt-0.5 w-5 text-right shrink-0">
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-8 sm:mt-10 space-y-6">
            <Paragraph>
              This was intentionally focused. It assumed the problem was already defined and concentrated on collapsing the time required to move from concept to working software. It demonstrated that with strong context engineering and disciplined iteration, teams could produce meaningful proof-of-concepts in hours rather than months.
            </Paragraph>

            <Paragraph className="text-foreground/90 font-medium">
              It worked.
            </Paragraph>

            <Paragraph>
              Across engagements, teams consistently delivered functional prototypes at unprecedented speed. The delivery engine was real, and the thesis held: AI shifted the bottleneck from execution to direction.
            </Paragraph>

            <Paragraph>
              As adoption expanded, however, patterns began to emerge &mdash; not about execution speed, but about what surrounds execution.
            </Paragraph>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. PATTERNS OBSERVED IN PRACTICE                           */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="patterns" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>02</SectionNumber>
            <SectionTitle>Patterns Observed in Practice</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10 space-y-6">
            <Paragraph>
              The opportunity for evolution was not within the delivery engine itself. It was within the surrounding structure that determines whether fast execution produces durable outcomes.
            </Paragraph>
            <Paragraph>
              Three recurring patterns surfaced.
            </Paragraph>
          </FadeIn>

          {/* Pattern 1 */}
          <FadeIn className="mt-12 sm:mt-16">
            <SubsectionTitle>
              Pattern 1: Direction Drift Under Speed
            </SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Teams could build quickly &mdash; sometimes within 48 hours &mdash; but occasionally discovered that the original problem framing lacked sufficient rigor.
              </Paragraph>
              <Paragraph>
                The faster the engine ran, the more important disciplined hypothesis definition became. Without structured validation before entering the build cycle, teams risked optimizing execution around an incomplete question.
              </Paragraph>
              <Paragraph>
                The insight here was not that Protogen was flawed &mdash; but that speed amplifies the importance of clarity.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Pattern 2 */}
          <FadeIn className="mt-12 sm:mt-16">
            <SubsectionTitle>
              Pattern 2: Prototype-to-Decision Gap
            </SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Prototypes frequently generated enthusiasm but lacked a structured pathway toward executive decision-making.
              </Paragraph>
              <Paragraph className="text-foreground/90 font-medium">
                A demo is not the same as an investment decision.
              </Paragraph>
              <Paragraph>
                While the original SDLC ended at &ldquo;Demo,&rdquo; engagements did not. Teams needed a formal mechanism to convert prototype learnings into clear next steps: proceed, pivot, scale, or stop.
              </Paragraph>
              <Paragraph>
                Without that conversion layer, even successful prototypes could stall.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Pattern 3 */}
          <FadeIn className="mt-12 sm:mt-16">
            <SubsectionTitle>
              Pattern 3: Design Fidelity Friction
            </SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                As prototype quality increased, the translation from design intent to implementation detail became increasingly important.
              </Paragraph>
              <Paragraph>
                Small deviations in token mapping, component structure, state coverage, or accessibility could introduce inconsistency. What was &ldquo;close enough&rdquo; early in prototyping became unacceptable as visibility increased.
              </Paragraph>
              <Paragraph>
                This was not a limitation of AI tooling. It was a signal that design-to-code translation required explicit governance.
              </Paragraph>
            </div>
          </FadeIn>

          <FadeIn className="mt-12 sm:mt-16">
            <div className="space-y-2">
              <Paragraph className="text-foreground/90 font-medium">
                Collectively, these patterns suggested an opportunity:
              </Paragraph>
              <Paragraph>
                Preserve Protogen&rsquo;s speed. Formalize the surrounding operating model. Ensure speed translates into outcomes.
              </Paragraph>
            </div>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. THE THREE-LEVEL NESTED MODEL                            */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="model" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>03</SectionNumber>
            <SectionTitle>The Three-Level Nested Model</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10 space-y-6">
            <Paragraph>
              The evolved framework introduces a nested operating model operating at three distinct altitudes. Each level owns a different category of decisions and nests within the level above it.
            </Paragraph>
            <Paragraph className="text-foreground/90 font-medium">
              These are not separate processes.{' '}
              They are one operating model at three different zoom levels.
            </Paragraph>
          </FadeIn>

          {/* Visual */}
          <NestedModelViz />

          {/* Level A */}
          <FadeIn className="mt-16 sm:mt-20">
            <SubsectionTitle className="text-level-a">Level A &mdash; Fast Forward (Program Governance)</SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Fast Forward provides the strategic wrapper that ensures the right problem is defined, validated, and converted into action.
              </Paragraph>
              <Paragraph>
                It introduces five phases:
              </Paragraph>
            </div>
            <div className="mt-6 space-y-5">
              <PhaseItem id="A1" title="Pre-Work" desc="Define the problem hypothesis, identify the executive sponsor, establish success signals before anyone writes a line of code." />
              <PhaseItem id="A2" title="Experience Definition" desc="Map the core user journey, identify value moments, establish shared understanding across disciplines." />
              <PhaseItem id="A3" title="The Fast Part" desc="This is where Level B (Protogen) gets activated. The entire delivery engine runs inside this single phase of Level A." />
              <PhaseItem id="A4" title="Validation" desc="Test the prototype against the original hypothesis. Does it solve the problem? Where does it break? What would it take to scale?" />
              <PhaseItem id="A5" title="Path Forward" desc="Present findings, make a decision (proceed, pivot, or stop), define the investment path." />
            </div>
            <div className="mt-8 space-y-6">
              <Paragraph>
                Level A governs problem framing, executive alignment, validation rigor, and investment direction.
              </Paragraph>
              <Paragraph>
                It ensures the delivery engine activates in service of the right question &mdash; and that outcomes convert into clear decisions.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Level B */}
          <FadeIn className="mt-16 sm:mt-20">
            <SubsectionTitle className="text-level-b">Level B &mdash; Protogen (Delivery Engine)</SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Level B preserves the AI-accelerated SDLC and restructures it into five formal stages:
              </Paragraph>
            </div>
            <div className="mt-6 space-y-5">
              <PhaseItem id="B1" title="Discovery" desc="Found data analysis, user signal gathering, landscape assessment." />
              <PhaseItem id="B2" title="Visioning" desc="Experience definition, storyboarding, MVP scope crystallization." />
              <PhaseItem id="B3" title="Setup" desc="AI workspace configuration, context engineering, tooling selection." />
              <PhaseItem id="B4" title="Build" desc="Iteration loops, state coverage, progressive fidelity." />
              <PhaseItem id="B5" title="Release" desc="Documentation, handoff, demo preparation." />
            </div>
            <div className="mt-8 space-y-6">
              <Paragraph className="text-foreground/90 font-medium">
                This remains the rapid execution core.
              </Paragraph>
              <Paragraph>
                The foundational insight &mdash; that AI shifts the bottleneck from execution to direction &mdash; is preserved. What changes is that the engine now operates within a larger structure that ensures direction is disciplined before activation and actionable after completion.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Level C */}
          <FadeIn className="mt-16 sm:mt-20">
            <SubsectionTitle className="text-level-c">Level C &mdash; Design-to-Code (Capability Module)</SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Design-to-Code formalizes fidelity within the build cycle as a distinct capability module.
              </Paragraph>
              <Paragraph>
                It introduces four structured stages:
              </Paragraph>
            </div>
            <div className="mt-6 space-y-5">
              <PhaseItem id="C1" title="Design Audit" desc="Inspect Figma source of truth, identify token gaps, flag accessibility issues before code generation begins." />
              <PhaseItem id="C2" title="Token Translation" desc="Map design tokens (colors, spacing, typography, radii) to code variables with 1:1 fidelity." />
              <PhaseItem id="C3" title="Component Build" desc="Generate components from design specs, maintaining structure, variants, and responsive behavior." />
              <PhaseItem id="C4" title="Engineering Handoff" desc="Validate state coverage, edge cases, and production readiness." />
            </div>
            <div className="mt-8 space-y-6">
              <Paragraph>
                Level C governs design-system alignment, state coverage, and production-ready quality standards.
              </Paragraph>
              <Paragraph>
                It ensures that rapid execution does not compromise consistency or professional rigor.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Summary */}
          <FadeIn className="mt-14 sm:mt-18">
            <div className="rounded-xl border border-border/50 bg-card/30 px-8 sm:px-10 py-8 sm:py-10">
              <ul className="space-y-2 text-[17px] sm:text-lg leading-[1.8]">
                <li className="text-foreground/80"><span className="font-semibold text-level-a">Level A</span> governs direction.</li>
                <li className="text-foreground/80"><span className="font-semibold text-level-b">Level B</span> governs execution.</li>
                <li className="text-foreground/80"><span className="font-semibold text-level-c">Level C</span> governs fidelity.</li>
              </ul>
            </div>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. GOVERNANCE MECHANISMS INTRODUCED                        */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="governance" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>04</SectionNumber>
            <SectionTitle>Governance Mechanisms Introduced</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10">
            <Paragraph>
              Beyond structural nesting, the expanded framework formalizes governance mechanisms that clarify ownership and prevent friction as adoption scales.
            </Paragraph>
          </FadeIn>

          {/* Boundaries of Authority */}
          <FadeIn className="mt-14 sm:mt-18">
            <SubsectionTitle>Boundaries of Authority</SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                Each level explicitly defines:
              </Paragraph>
              <ul className="space-y-3 pl-1">
                {[
                  ['owns', 'decision authority'],
                  ['is accountable for', 'outcomes'],
                  ['produces', 'artifacts'],
                  ['does not own', 'explicit limits'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex gap-4 text-[17px] sm:text-lg leading-[1.8] text-foreground/75">
                    <span className="text-muted-foreground/30 mt-1 shrink-0">&bull;</span>
                    <span>
                      What it <span className="font-semibold text-foreground/90">{label}</span> ({desc})
                    </span>
                  </li>
                ))}
              </ul>
              <Paragraph>
                This prevents authority confusion as teams scale and visibility increases.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Decision Rights Matrix */}
          <FadeIn className="mt-14 sm:mt-18">
            <SubsectionTitle>Decision Rights Matrix</SubsectionTitle>
            <div className="mt-5 sm:mt-6 space-y-6">
              <Paragraph>
                A cross-cutting matrix defines ownership across strategic decisions, delivery mechanics, and design standards.
              </Paragraph>
              <Paragraph>
                When disagreement occurs, authority is predefined rather than improvised.
              </Paragraph>
            </div>

            {/* Desktop table */}
            <div className="mt-8 hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-6 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Decision
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-level-a w-20">
                      A
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-level-b w-20">
                      B
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-level-c w-20">
                      C
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {decisionRights.map((row, i) => (
                    <tr
                      key={row.decision}
                      className={cn(
                        'border-b border-border/50',
                        i % 2 === 0 ? 'bg-secondary/20' : '',
                      )}
                    >
                      <td className="py-3 pr-6 text-sm text-foreground/80">{row.decision}</td>
                      <td className="py-3 px-4 text-center text-sm"><AuthorityCell value={row.a} /></td>
                      <td className="py-3 px-4 text-center text-sm"><AuthorityCell value={row.b} /></td>
                      <td className="py-3 px-4 text-center text-sm"><AuthorityCell value={row.c} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-8 space-y-3 sm:hidden">
              {decisionRights.map((row) => (
                <div key={row.decision} className="rounded-lg border border-border/50 bg-card/50 p-4">
                  <p className="text-sm font-medium text-foreground/90 mb-2">{row.decision}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-level-a">A: <AuthorityCell value={row.a} /></span>
                    <span className="text-level-b">B: <AuthorityCell value={row.b} /></span>
                    <span className="text-level-c">C: <AuthorityCell value={row.c} /></span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Escalation Model */}
          <FadeIn className="mt-14 sm:mt-18">
            <SubsectionTitle>Escalation Model</SubsectionTitle>
            <div className="mt-5 sm:mt-6">
              <Paragraph>
                Three guiding questions resolve ambiguity:
              </Paragraph>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { q: 'Is this about strategic direction?', a: 'Level A decides.' },
                { q: 'Is this about delivery mechanics?', a: 'Level B decides.' },
                { q: 'Is this about fidelity and component quality?', a: 'Level C decides.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-5">
                  <span className="font-mono text-sm font-bold text-muted-foreground/40 shrink-0 mt-0.5 w-5 text-right">
                    {i + 1}.
                  </span>
                  <p className="text-[17px] sm:text-lg leading-[1.8] text-foreground/75">
                    {item.q} <span className="font-semibold text-foreground/90">&rarr; {item.a}</span>
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Golden Rule */}
          <FadeIn className="mt-14 sm:mt-18">
            <SubsectionTitle>Golden Rule</SubsectionTitle>
            <div className="mt-8 sm:mt-10 rounded-xl border border-border/50 bg-card/30 px-8 sm:px-10 py-10 sm:py-12 text-center">
              <p className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground tracking-tight">
                No layer may redefine the authority of the layer above it.
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <Paragraph>
                Level C cannot override delivery methodology.{' '}
                Level B cannot redefine the strategic problem.
              </Paragraph>
              <Paragraph className="text-foreground/90 font-medium">
                Each level is sovereign within its domain.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Anti-Pattern Identification */}
          <FadeIn className="mt-14 sm:mt-18">
            <SubsectionTitle>Anti-Pattern Identification</SubsectionTitle>
            <div className="mt-5 sm:mt-6">
              <Paragraph>
                The framework names boundary violations explicitly to create a shared vocabulary:
              </Paragraph>
            </div>
            <div className="mt-8 space-y-6">
              {antiPatterns.map((ap) => (
                <AntiPatternCard key={ap.direction} entry={ap} />
              ))}
            </div>
            <div className="mt-8">
              <Paragraph>
                Naming these patterns reduces friction and accelerates correction.
              </Paragraph>
            </div>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 5. WHY THIS STRENGTHENS THE MODEL                         */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="strengthens" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>05</SectionNumber>
            <SectionTitle>Why This Strengthens the Model</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10">
            <Paragraph>
              The expanded framework strengthens Protogen in five ways:
            </Paragraph>
          </FadeIn>

          {/* Reason 1 */}
          <FadeIn className="mt-12 sm:mt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-muted-foreground/30 shrink-0">01</span>
              <SubsectionTitle>It addresses the full innovation lifecycle.</SubsectionTitle>
            </div>
            <div className="mt-5 sm:mt-6 pl-10 sm:pl-12">
              <Paragraph>
                The original model accelerated build speed. The expanded model ensures that speed leads to business outcomes.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Reason 2 */}
          <FadeIn className="mt-12 sm:mt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-muted-foreground/30 shrink-0">02</span>
              <SubsectionTitle>It makes the implicit explicit.</SubsectionTitle>
            </div>
            <div className="mt-5 sm:mt-6 pl-10 sm:pl-12">
              <Paragraph>
                High-performing teams were already performing structured framing and decision conversion. The model formalizes those behaviors for repeatability.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Reason 3 */}
          <FadeIn className="mt-12 sm:mt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-muted-foreground/30 shrink-0">03</span>
              <SubsectionTitle>It preserves velocity while reducing waste.</SubsectionTitle>
            </div>
            <div className="mt-5 sm:mt-6 pl-10 sm:pl-12">
              <Paragraph>
                Lightweight pre-work and validation phases prevent the most expensive failure mode: building the wrong thing quickly.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Reason 4 */}
          <FadeIn className="mt-12 sm:mt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-muted-foreground/30 shrink-0">04</span>
              <SubsectionTitle>It clarifies accountability.</SubsectionTitle>
            </div>
            <div className="mt-5 sm:mt-6 pl-10 sm:pl-12 space-y-2">
              <Paragraph>
                Level A owns the problem. Level B owns the build. Level C owns fidelity.
              </Paragraph>
              <Paragraph className="text-foreground/90 font-medium">
                Ownership is unambiguous.
              </Paragraph>
            </div>
          </FadeIn>

          {/* Reason 5 */}
          <FadeIn className="mt-12 sm:mt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-muted-foreground/30 shrink-0">05</span>
              <SubsectionTitle>It is extensible.</SubsectionTitle>
            </div>
            <div className="mt-5 sm:mt-6 pl-10 sm:pl-12">
              <Paragraph>
                Level C establishes the pattern for future capability modules (data pipelines, compliance, infrastructure, security) that can plug into the delivery engine without restructuring the system.
              </Paragraph>
            </div>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ────────────────────────────────────────────────────────── */}
        {/* 6. FROM ENGINE TO OPERATING SYSTEM                         */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="arc" className="py-20 sm:py-28 md:py-36 scroll-mt-24">
          <FadeIn>
            <SectionNumber>06</SectionNumber>
            <SectionTitle>From Engine to Operating System</SectionTitle>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 sm:mt-10">
            <Paragraph>
              The evolution follows a natural maturation path:
            </Paragraph>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-10 sm:mt-12 space-y-8">
            {[
              {
                stage: 'Stage 1 \u2014 Insight',
                text: 'AI accelerates delivery.',
              },
              {
                stage: 'Stage 2 \u2014 Practice',
                text: 'Speed requires disciplined direction.',
              },
              {
                stage: 'Stage 3 \u2014 Structure',
                text: 'Wrap the engine in a program model.',
              },
              {
                stage: 'Stage 4 \u2014 Governance',
                text: 'Define authority, decision rights, and escalation.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 sm:gap-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-card/50 font-mono text-xs font-bold text-muted-foreground/60 shrink-0">
                    {i + 1}
                  </span>
                  {i < 3 && <div className="w-px flex-1 bg-border/30 mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
                    {item.stage}
                  </p>
                  <p className="text-[17px] sm:text-lg leading-[1.8] text-foreground/90 font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </FadeIn>

          <FadeIn className="mt-14 sm:mt-18 space-y-6">
            <Paragraph className="text-foreground/90 font-medium">
              The original Protogen was the engine.
            </Paragraph>
          </FadeIn>

          <FadeIn className="mt-4">
            <p className="text-xl sm:text-2xl font-medium leading-relaxed tracking-tight text-foreground">
              The expanded framework is the operating system that allows that engine to scale with clarity, accountability, and durability.
            </p>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ── Colophon ────────────────────────────────────────────── */}
        <FadeIn className="py-16 sm:py-20">
          <Paragraph>
            This document describes the rationale for formalizing Protogen into a three-level nested operating model that preserves its original strengths while strengthening its ability to scale.
          </Paragraph>
        </FadeIn>

      </article>
    </>
  );
}
