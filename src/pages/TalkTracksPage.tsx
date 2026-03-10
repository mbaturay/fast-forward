import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import type { TalkTrackDuration, TalkTrackAudience } from '@/content/model';
import { talkTracks } from '@/content/talkTracks';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ── Constants ────────────────────────────────────────────────────────

const DURATIONS: { value: TalkTrackDuration; label: string }[] = [
  { value: '30s', label: '30 seconds' },
  { value: '2min', label: '2 minutes' },
  { value: '5min', label: '5 minutes' },
];

const AUDIENCES: { value: TalkTrackAudience; label: string }[] = [
  { value: 'exec', label: 'Exec' },
  { value: 'leads', label: 'Leads' },
  { value: 'pod', label: 'Pod' },
];

const audienceColor: Record<TalkTrackAudience, string> = {
  exec: 'bg-indigo-500',
  leads: 'bg-emerald-500',
  pod: 'bg-amber-500',
};

// ── Page ─────────────────────────────────────────────────────────────

export default function TalkTracksPage() {
  const [duration, setDuration] = useState<TalkTrackDuration>('30s');
  const [audience, setAudience] = useState<TalkTrackAudience>('exec');
  const [copied, setCopied] = useState(false);

  const track = useMemo(
    () => talkTracks.find((t) => t.duration === duration && t.audience === audience) ?? null,
    [duration, audience],
  );

  const handleCopy = useCallback(async () => {
    if (!track) return;
    try {
      await navigator.clipboard.writeText(track.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: ignore if clipboard API not available
    }
  }, [track]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Talk Tracks' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Talk Tracks
      </h1>
      <p className="mt-2 mb-8 text-sm text-gray-600">
        Ready-made narratives for different audiences and timeframes. Select a duration and audience to see the talk track.
      </p>

      {/* ── Duration tabs ─────────────────────────────────────────── */}
      <section className="mb-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Duration
        </h2>
        <Tabs
          value={duration}
          onValueChange={(v) => setDuration(v as TalkTrackDuration)}
        >
          <TabsList>
            {DURATIONS.map((d) => (
              <TabsTrigger key={d.value} value={d.value}>
                {d.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* ── Audience toggle ───────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Audience
        </h2>
        <div className="flex gap-2">
          {AUDIENCES.map((a) => (
            <Button
              key={a.value}
              variant={audience === a.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAudience(a.value)}
              className="min-w-[72px]"
            >
              <span
                className={`mr-1.5 h-2 w-2 rounded-full ${
                  audience === a.value ? 'bg-white' : audienceColor[a.value]
                }`}
              />
              {a.label}
            </Button>
          ))}
        </div>
      </section>

      {/* ── Talk track card ───────────────────────────────────────── */}
      {track && (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{duration}</Badge>
                    <Badge variant="secondary">{audience}</Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="mr-1 h-3.5 w-3.5 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-gray-700">
                {track.text.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── Grid showing all 9 combinations ──────────────────────── */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">All Combinations</h2>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2">
          {/* Header row */}
          <div />
          {AUDIENCES.map((a) => (
            <div
              key={a.value}
              className="pb-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-400"
            >
              {a.label}
            </div>
          ))}

          {/* Data rows */}
          {DURATIONS.map((d) => (
            <div key={d.value} className="contents">
              <div className="flex items-center pr-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                {d.label}
              </div>
              {AUDIENCES.map((a) => {
                const isActive = duration === d.value && audience === a.value;
                return (
                  <button
                    key={`${d.value}-${a.value}`}
                    type="button"
                    onClick={() => {
                      setDuration(d.value);
                      setAudience(a.value);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-all ${
                      isActive
                        ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
