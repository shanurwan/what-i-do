export interface ExperienceEntry {
  period: string;
  title: string;
  organisation: string;
  url?: string;
  kind: 'role' | 'project';
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    period: '2025 — Present',
    title: 'Specialist, Infrastructure & Security for AI',
    organisation: 'Scicom',
    kind: 'role',
    summary:
      'Responsible for the infrastructure and security posture behind production AI workloads: the platform they run on, the boundaries that protect them, and the practices that keep them up and correct.',
    highlights: [
      'Own Kubernetes and cloud platform infrastructure for AI services, from provisioning and access control through observability and recovery.',
      'Design and enforce security boundaries for AI systems: identity and authorization, secrets handling, network segmentation, and hardening.',
      'Integrate MLOps pipelines with production infrastructure so model delivery inherits the same reliability and security controls as everything else.',
      'Run threat modelling and security reviews for new AI capabilities, and translate findings into infrastructure changes rather than paperwork.',
    ],
    stack: ['Kubernetes', 'Cloud platforms', 'Linux', 'Observability', 'Databases', 'Security', 'MLOps'],
  },
  {
    period: '2026',
    title: 'Epoch — temporal testing infrastructure',
    organisation: 'Independent systems work',
    url: 'https://github.com/shanurwan/epoch',
    kind: 'project',
    summary:
      'A Go control plane that cold-boots Firecracker microVMs, moves time only inside the guest, and records execution, assertion, and cleanup outcomes as separate evidence.',
    highlights: [
      'Validated reference path on bare-metal Rocky Linux with KVM and Firecracker 1.16.1.',
      'Explicit run ownership so interrupted experiments can be inspected and recovered without broad deletion.',
    ],
    stack: ['Go', 'Firecracker', 'KVM', 'Linux', 'vsock'],
  },
  {
    period: '2026',
    title: 'NEST AuthZ — authorization for autonomous agents',
    organisation: 'Independent systems work',
    url: 'https://github.com/shanurwan/nest-authz',
    kind: 'project',
    summary:
      'A fail-closed authorization core that keeps delegation, policy, approval, execution-time revalidation, and replay control as separate, typed boundaries.',
    highlights: [
      'Security invariants, threat model, and claim-to-test evidence documented alongside the implementation.',
      'Durable execution reservation so a retried permit cannot become a second logical operation.',
    ],
    stack: ['Python', 'SQLite', 'Signed artifacts', 'Threat modelling'],
  },
];

export interface Capability {
  title: string;
  summary: string;
  points: string[];
}

export const capabilities: Capability[] = [
  {
    title: 'Platform infrastructure',
    summary: 'Kubernetes and cloud platforms built to keep critical AI workloads running.',
    points: ['Cluster and cloud provisioning', 'Networking and access control', 'Capacity, quotas, and cost boundaries'],
  },
  {
    title: 'Security for AI systems',
    summary: 'Boundaries that hold when agents, tools, and pipelines act on their own.',
    points: ['Authorization and delegation', 'Secrets and identity', 'Threat modelling and hardening'],
  },
  {
    title: 'Reliability and observability',
    summary: 'Systems that show what they are doing and recover on their own terms.',
    points: ['Service objectives and error budgets', 'Incident response and review', 'Blast-radius and recovery design'],
  },
  {
    title: 'AI and MLOps integration',
    summary: 'Model delivery wired into production infrastructure, not around it.',
    points: ['Pipeline to platform integration', 'Isolation for untrusted execution', 'Evidence and audit trails'],
  },
];

export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: 'Fail closed',
    body: 'Missing, ambiguous, or stale input is a denial, not a default allow. The safe state is the one the system falls into on its own.',
  },
  {
    title: 'Integrity is uptime',
    body: 'A system that stays up while giving wrong answers has already failed. Correctness under load, retries, and partial failure is part of availability.',
  },
  {
    title: 'Evidence over claims',
    body: 'A system is what its recorded behaviour shows. Pinned revisions, reproducible runs, and hashes matter more than a confident README.',
  },
  {
    title: 'Design for recovery',
    body: 'Cleanup, ownership, and rollback are part of the architecture. If a run is interrupted, the next engineer should be able to inspect before deleting.',
  },
];
