import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  GitBranch,
  Mic,
  BookOpen,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { levels } from '@/content/content';
import type { LevelId } from '@/content/model';
import { config } from '@/lib/config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ── Level color maps ────────────────────────────────────────────────
const levelColors: Record<LevelId, {
  accent: string;
  badgeVariant: 'levelA' | 'levelB' | 'levelC';
  dot: string;
  softBadge: 'indigo' | 'emerald' | 'amber';
  text: string;
}> = {
  a: { accent: 'bg-level-a', badgeVariant: 'levelA', dot: 'bg-level-a', softBadge: 'indigo', text: 'text-level-a-dark' },
  b: { accent: 'bg-level-b', badgeVariant: 'levelB', dot: 'bg-level-b', softBadge: 'emerald', text: 'text-level-b-dark' },
  c: { accent: 'bg-level-c', badgeVariant: 'levelC', dot: 'bg-level-c', softBadge: 'amber', text: 'text-level-c-dark' },
};

const modeCards = [
  {
    icon: Compass,
    title: 'Guided Journey',
    description: 'Walk through the nested model level-by-level with drill-down connections.',
    href: '/guided',
  },
  {
    icon: GitBranch,
    title: 'Mapping View',
    description: 'See how A, B, and C phases align in a cross-level matrix.',
    href: '/mapping',
  },
  {
    icon: Mic,
    title: 'Talk Tracks',
    description: 'Ready-made narratives for executives, leads, and pods at 30s, 2min, or 5min.',
    href: '/talk-tracks',
  },
  {
    icon: BookOpen,
    title: 'Playbook',
    description: 'Practical guide: entry criteria, roles, artifacts, and quality gates.',
    href: '/playbook',
  },
] as const;

// ── Stagger animation helpers ───────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {config.appName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          A nested operating model with three levels: frame the right problem at the enterprise level,
          run a context-engineered delivery engine, and accelerate design-to-code with governance built in.
        </motion.p>
      </section>

      {/* ── Level cards ──────────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Operating model levels"
      >
        {levels.map((level) => {
          const colors = levelColors[level.id];

          return (
            <motion.div key={level.id} variants={item} className="flex">
              <Card
                className="group relative flex flex-1 flex-col cursor-pointer overflow-hidden transition-all hover:shadow-md"
                onClick={() => navigate(`/level/${level.id}`)}
              >
                {/* Top accent stripe */}
                <div className={`h-1 w-full ${colors.accent}`} />

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${colors.dot}`}
                    >
                      {level.id.toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="text-sm">{level.shortName}</CardTitle>
                      <CardDescription className="text-xs line-clamp-1">{level.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{level.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <Badge variant={colors.softBadge}>
                      {level.phases.length} phases
                    </Badge>
                    <span className={`flex items-center gap-1 text-xs font-medium ${colors.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* ── Nesting visual ───────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-16"
        aria-label="How levels nest"
      >
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">How They Nest</h2>
          </div>

          {/* Nested boxes visual */}
          <div className="rounded-xl border border-level-a/20 bg-level-a-light/50 p-5">
            <p className="mb-3 text-[11px] font-semibold text-level-a-dark uppercase tracking-widest">
              A &mdash; Enterprise / Program
            </p>
            <div className="rounded-lg border border-level-b/20 bg-level-b-light/50 p-5 ml-3">
              <p className="mb-3 text-[11px] font-semibold text-level-b-dark uppercase tracking-widest">
                B &mdash; SDLC / Delivery Engine
              </p>
              <div className="rounded-md border border-level-c/20 bg-level-c-light/50 p-4 ml-3">
                <p className="text-[11px] font-semibold text-level-c-dark uppercase tracking-widest">
                  C &mdash; Design-to-Code Module
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            A governs the journey. B runs the delivery engine. C is one module inside the engine.
          </p>
        </div>
      </motion.section>

      {/* ── Mode cards ───────────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        aria-label="Explore the model"
      >
        <h2 className="mb-6 text-center text-sm font-semibold text-foreground uppercase tracking-wider">
          Explore the Model
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modeCards.map((mode) => {
            const Icon = mode.icon;
            return (
              <motion.div key={mode.title} variants={item}>
                <Card
                  className="group cursor-pointer transition-all hover:shadow-md h-full"
                  onClick={() => navigate(mode.href)}
                >
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-secondary/80">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{mode.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{mode.description}</p>
                    <Button variant="ghost" size="sm" className="mt-auto text-muted-foreground group-hover:text-foreground">
                      Open <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.main>
  );
}
