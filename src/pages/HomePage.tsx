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
  border: string;
  bg: string;
  badgeVariant: 'levelA' | 'levelB' | 'levelC';
  dot: string;
  ring: string;
  text: string;
}> = {
  a: { border: 'border-l-indigo-500', bg: 'bg-indigo-50', badgeVariant: 'levelA', dot: 'bg-indigo-500', ring: 'ring-indigo-200', text: 'text-indigo-700' },
  b: { border: 'border-l-emerald-500', bg: 'bg-emerald-50', badgeVariant: 'levelB', dot: 'bg-emerald-500', ring: 'ring-emerald-200', text: 'text-emerald-700' },
  c: { border: 'border-l-amber-500', bg: 'bg-amber-50', badgeVariant: 'levelC', dot: 'bg-amber-500', ring: 'ring-amber-200', text: 'text-amber-700' },
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
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          {config.appName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg"
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
        className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Operating model levels"
      >
        {levels.map((level) => {
          const colors = levelColors[level.id];

          return (
            <motion.div key={level.id} variants={item}>
              <Card
                className={`cursor-pointer border-l-4 transition-shadow hover:shadow-lg ${colors.border}`}
                onClick={() => navigate(`/level/${level.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${colors.dot}`}
                    >
                      {level.id.toUpperCase()}
                    </span>
                    <div>
                      <CardTitle className="text-base">{level.shortName}</CardTitle>
                      <CardDescription className="text-xs">{level.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-2 text-sm text-gray-600">{level.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={colors.badgeVariant}>
                      {level.phases.length} phases
                    </Badge>
                    <span className={`flex items-center gap-1 text-xs font-medium ${colors.text}`}>
                      Learn more <ArrowRight className="h-3 w-3" />
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-14"
        aria-label="How levels nest"
      >
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">How They Nest</h2>
          </div>

          {/* Nested boxes visual */}
          <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50/50 p-4">
            <p className="mb-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              A &mdash; Enterprise / Program
            </p>
            <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/50 p-4 ml-4">
              <p className="mb-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                B &mdash; SDLC / Delivery Engine
              </p>
              <div className="rounded-md border-2 border-amber-300 bg-amber-50/50 p-3 ml-4">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  C &mdash; Design-to-Code Module
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
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
        <h2 className="mb-6 text-center text-lg font-semibold text-gray-900">
          Explore the Model
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modeCards.map((mode) => {
            const Icon = mode.icon;
            return (
              <motion.div key={mode.title} variants={item}>
                <Card
                  className="cursor-pointer transition-shadow hover:shadow-lg h-full"
                  onClick={() => navigate(mode.href)}
                >
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{mode.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-500">{mode.description}</p>
                    <Button variant="ghost" size="sm" className="mt-auto">
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
