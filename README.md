# Fast Forward / Protogen OS

Interactive company guideline website for the Fast Forward / Protogen nested operating model.

## Architecture

**Vite SPA** (chosen over Next.js because this is a pure client-side app with no SSR/API requirements — simpler deployment, faster dev server, and no server dependencies).

- **React 19 + TypeScript** — strict mode, path aliases via `@/`
- **Tailwind CSS v4** — utility-first styling with `@tailwindcss/vite` plugin
- **shadcn/ui patterns** — Radix primitives with CVA-based styling
- **Framer Motion** — page transitions, drawer animations, staggered lists
- **React Router v7** — client-side routing with deep links

## Quick Start

```bash
cd app
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview  # serves the dist/ folder locally
```

## Routes

| Path | Mode |
|------|------|
| `/` | Home — overview of all 3 levels + 4 modes |
| `/guided` | Guided Journey — drill-down A → B → C |
| `/mapping` | Mapping View — cross-level phase alignment |
| `/talk-tracks` | Talk Tracks — 30s/2min/5min x 3 audiences |
| `/playbook` | Company Playbook — entry criteria, roles, artifacts |
| `/level/:id` | Level Detail — deep view of A, B, or C |

## The Three Levels

| Level | Name | Scope | Color |
|-------|------|-------|-------|
| **A** | Fast Forward | Enterprise / Program | Indigo |
| **B** | Protogen SDLC | Delivery Engine | Emerald |
| **C** | Design-to-Code | Capability Module | Amber |

## Updating Content

All content lives in `src/content/`:

| File | Purpose |
|------|---------|
| `model.ts` | TypeScript types (Level, Phase, Mapping, etc.) |
| `content.ts` | Structured content for levels A, B, C |
| `mappings.ts` | Cross-level phase mappings |
| `talkTracks.ts` | Talk track narratives (3 durations x 3 audiences) |
| `glossary.ts` | Key term definitions |

To update content:
1. Edit the relevant file in `src/content/`
2. All content is data-driven — components render from these files
3. Update the content checksum comment in `content.ts` with the date

## Features

- **Guided Journey** — progressive disclosure from A to B to C with breadcrumbs
- **Mapping Matrix** — desktop table + mobile accordion showing A/B/C phase alignments
- **Talk Tracks** — copy-to-clipboard with duration/audience selection grid
- **Company Playbook** — entry criteria, inputs, outputs, roles, quality gates, artifact templates
- **Search** — Cmd+K command palette searching across all content
- **Glossary** — searchable key terms with related term navigation
- **Print support** — CSS print styles for condensed output
- **Responsive** — mobile-first with horizontal scroll timelines, accordion fallbacks
- **Accessible** — semantic HTML, keyboard navigation, focus states, ARIA labels

## Project Structure

```
src/
  content/          # Data-driven content model
  components/
    ui/             # Primitive components (Button, Card, Badge, etc.)
    layout/         # AppShell, Breadcrumb
    shared/         # HierarchyNavigator, PhaseTimeline, GuardrailsPanel, etc.
    mapping/        # MappingMatrix
    talktrack/      # TalkTrackPanel
  pages/            # Route-level page components
  hooks/            # useSearch
  lib/              # utils, config
```
