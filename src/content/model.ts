// ── Content Model Types ──────────────────────────────────────────────
// Defines all structured types for the Fast Forward / Protogen OS app.

/** Discriminated level identifiers */
export type LevelId = 'a' | 'b' | 'c';

/** Duration buckets for talk tracks */
export type TalkTrackDuration = '30s' | '2min' | '5min';

/** Target audience for talk tracks */
export type TalkTrackAudience = 'exec' | 'leads' | 'pod';

// ── Phase ────────────────────────────────────────────────────────────

export interface Phase {
  /** Unique id within a level, e.g. "a1", "b3", "c2" */
  id: string;
  /** 1-based ordinal */
  number: number;
  title: string;
  subtitle: string;
  goal: string;
  activities: string[];
  outputs: string[];
  /** If clicking this phase should drill into another level */
  drillDownTarget?: LevelId;
  /** Guiding questions surfaced at this phase (e.g. A4 validation) */
  keyQuestions?: string[];
}

// ── Guardrail ────────────────────────────────────────────────────────

export interface Guardrail {
  id: string;
  title: string;
  description: string;
  appliesTo: LevelId[];
}

// ── Principle ────────────────────────────────────────────────────────

export interface Principle {
  title: string;
  description: string;
}

// ── Input / Outcome (C-level detail) ─────────────────────────────────

export interface InputOutcome {
  inputs: string[];
  outcomes: string[];
}

// ── Quality Control (C-level detail) ─────────────────────────────────

export interface QualityControl {
  controls: string[];
  deliverables: string[];
}

// ── Level (A | B | C) ────────────────────────────────────────────────

interface LevelBase {
  id: LevelId;
  title: string;
  subtitle: string;
  shortName: string;
  description: string;
  purpose: string;
  audience: string;
  whyItExists: string;
  view: string;
  answersQuestions: string[];
  phases: Phase[];
  guardrails: Guardrail[];
  commonPitfalls: string[];
  tipsForSuccess: string[];
  connectsToNext: string;
}

export interface LevelA extends LevelBase {
  id: 'a';
}

export interface LevelB extends LevelBase {
  id: 'b';
  principles: Principle[];
}

export interface LevelC extends LevelBase {
  id: 'c';
  inputOutcome: InputOutcome;
  qualityControls: QualityControl;
}

/** Discriminated union of all levels */
export type Level = LevelA | LevelB | LevelC;

// ── Mapping ──────────────────────────────────────────────────────────

export interface Mapping {
  id: string;
  aPhase: string;
  bPhase: string;
  cPhase?: string;
  relationship: string;
  whyItMatters: string;
}

// ── Talk Track ───────────────────────────────────────────────────────

export interface TalkTrack {
  id: string;
  duration: TalkTrackDuration;
  audience: TalkTrackAudience;
  title: string;
  text: string;
}

// ── Glossary Entry ───────────────────────────────────────────────────

export interface GlossaryEntry {
  term: string;
  definition: string;
  relatedTerms: string[];
  level: LevelId | 'all';
}

// ── Governance / Overlap ─────────────────────────────────────────────

export interface GovernanceCard {
  level: LevelId;
  governs: string[];
  doesNotGovern: string[];
  accountableFor: string[];
  produces: string[];
  authorityBoundary: string;
  identity: string;
  useCases: string[];
  altitude: string;
  owner: string;
  focus: string;
}

export interface DecisionRight {
  decision: string;
  a: 'owns' | 'informs' | 'none';
  b: 'owns' | 'informs' | 'none';
  c: 'owns' | 'informs' | 'none';
}

export interface FutureModule {
  name: string;
  description: string;
}

// ── Playbook Section ─────────────────────────────────────────────────

export interface PlaybookSection {
  id: string;
  title: string;
  body: string;
  level: LevelId;
  phaseId?: string;
}
