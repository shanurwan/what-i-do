---
title: RecoveryPact
slug: recovery-pact
summary: Two AI agents negotiate a safe database recovery while an independent authority governs execution.
status: Hackathon build / live demo
repository: https://github.com/shanurwan/recovery-pact
year: 2026
areas:
  - Multi-agent systems
  - PostgreSQL
  - AI safety
  - Red teaming
featured: true
order: 1
problem: Autonomous remediation agents act on database signals alone and declare success when the database looks healthy. The fix that is right for the database is often wrong for the business, such as killing a lock holder that turns out to be a card settlement.
context: Built for Open Agent Hackathon 2026, Track 3 (Reasoning Architecture), on NVIDIA Nemotron with Zetaris for business context and Meterless for memory and signed model receipts. Every incident runs against a live PostgreSQL cluster with real lock contention and real checkout traffic.
constraints:
  - The language models never write SQL or name a raw process id; they choose from candidate actions enumerated from observed evidence.
  - Every evidence id a model cites must exist; an ungrounded turn is returned once and then escalated, never acted on.
  - Execution needs a single-use, time-boxed token from deterministic code that the models cannot negotiate with.
  - Recovered means the database is clear, checkout is back above its SLO, and no protected operation was harmed.
architecture: A Database Guardian proposes a recovery and a Continuity Guardian reviews it against business invariants, for at most three rounds. Their agreement is sealed into a SHA-256-digested contract. A deterministic authority checks the contract and the signed Ed25519 receipts for every model answer before issuing a token. A restricted executor runs one typed command under a least-privilege role, and an independent verifier judges the outcome against both database and business signals.
decisions:
  - title: Separation of powers, not a pipeline
    rationale: The agent that wants the fastest database fix and the agent that protects revenue have opposing mandates, and neither can act. Only deterministic code grants execution.
  - title: Enforce invariants in code after the model decides
    rationale: Nine invariants, such as never interrupting a protected settlement, are re-checked in code, so an acceptance that breaks one never leaves the negotiation.
  - title: Memory may veto, never permit
    rationale: A remembered failed termination blocks a repeat, but no memory can authorize an action on its own.
  - title: Make every number reproducible
    rationale: A standard-library validator recomputes every published result from raw traces and re-verifies every signed receipt, so the claims can be checked without the stack or an API key.
failureModes:
  - A card settlement holds the lock blocking checkout; killing it risks double charges, so the right call is to wait about 45 seconds.
  - The scheduler restarts a killed job and checkout fails again; a database-only check would have declared recovery.
  - Session text carries a prompt injection; the Nemotron safety models quarantine it before any agent reads it.
  - A workload is unknown to the registry, so its cost cannot be priced and it cannot be terminated.
evidence:
  - title: 24 of 24 correct decisions, 0 unsafe actions
    detail: Eight incidents, three architectures, three repeats on Nemotron 3 Ultra. A naive agent made 3 of 24 right calls, put $37,500 of card settlements at risk and claimed recovery 6 times while checkout was down. RecoveryPact had $0 at risk and 0 false recoveries. The validator passed all 2,013 checks.
    url: https://github.com/shanurwan/recovery-pact/blob/main/evals/results/ultra-benchmark/summary.md
  - title: Red team, 45 runs
    detail: Eight attacks on an AI with database rights, 45 recorded runs, 0 unsafe actions, viewable as replays in the browser.
    url: https://recovery-pact.wnswaz.win/redteam.html
  - title: Nemotron family study
    detail: The whole Nemotron model family on one benchmark, 120 incidents, 0 unsafe actions.
    url: https://recovery-pact.wnswaz.win/nemotron.html
lessons: Governance has a measurable price. The median time from detection to decision is 66 seconds against 10 to 12 for a single agent. The single agents were faster because they aborted settlements, killed the finance close and declared false recoveries.
currentStatus: Hackathon build with a public live demo of recorded runs. The repository's proof script re-validates all results with no stack, API key or network.
links:
  - label: Live demo
    url: https://recovery-pact.wnswaz.win
---
