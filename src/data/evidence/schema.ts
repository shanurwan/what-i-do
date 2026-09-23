import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  kind: z.enum(['source', 'test', 'adr', 'scenario', 'raw', 'repository']),
  url: z.string(),
});

const traceEventSchema = z.object({
  eventId: z.string().optional(),
  at: z.number().optional(),
  observer: z.string().optional(),
  kind: z.string(),
  operation: z.string().optional(),
  detail: z.record(z.string(), z.unknown()),
});

const evidenceCaseSchema = z.object({
  id: z.string(),
  label: z.string(),
  input: z.record(z.string(), z.unknown()).optional(),
  outcome: z.string(),
  reason: z.string().optional(),
  explanation: z.string(),
  trace: z.array(traceEventSchema).default([]),
});

const experimentSchema = z.object({
  id: z.string(),
  number: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  invariant: z.string(),
  presentation: z.enum(['cases', 'comparison', 'evidence-card']),
  cases: z.array(evidenceCaseSchema).min(1),
  links: z.array(linkSchema).default([]),
});

const evidenceFileSchema = z.object({
  label: z.string(),
  path: z.string(),
  sha256: z.string(),
});

export const evidenceBundleSchema = z.object({
  schemaVersion: z.literal(1),
  repository: z.object({
    name: z.string(),
    url: z.url(),
    commit: z.string(),
    commitUrl: z.url(),
  }),
  provenance: z.object({
    scenario: z.string(),
    scenarioUrl: z.url(),
    seed: z.number().int(),
    runId: z.string(),
    generatedAt: z.string(),
    command: z.string(),
    bundleFingerprint: z.string(),
    files: z.array(evidenceFileSchema),
    runtime: z.object({
      nandatownVersion: z.string(),
      nandatownRepository: z.url(),
      nandatownCommit: z.string(),
      pythonVersion: z.string(),
    }),
    verification: z.array(z.string()),
    note: z.string(),
  }),
  experiments: z.array(experimentSchema).length(6),
});

export type EvidenceBundle = z.infer<typeof evidenceBundleSchema>;
export type EvidenceExperiment = EvidenceBundle['experiments'][number];
export type EvidenceCase = EvidenceExperiment['cases'][number];
export type TraceEvent = EvidenceCase['trace'][number];
