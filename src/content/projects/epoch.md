---
title: Epoch
slug: epoch
summary: Temporal Forking Infrastructure for Deterministic Batch & Expiry Testing.
status: Experimental / validated reference path
repository: https://github.com/shanurwan/epoch
year: 2026
areas:
  - Firecracker
  - KVM
  - Linux
  - Temporal testing
featured: true
order: 2
problem: Software that depends on wall-clock time is difficult to test reproducibly when moving the host clock would disrupt the machine, its services, and time synchronization.
context: Epoch is a general temporal testing system for expiry, scheduling, batch, lease, credential, and retention behaviour. Agent authority expiry is one reference workload, not the boundary of the platform.
constraints:
  - The host clock and its normal time synchronization must never be changed.
  - Hardware execution requires bare-metal x86_64 Linux with KVM and Firecracker; ordinary tests do not boot KVM.
  - Current runs are fresh cold boots from private disk copies, not Firecracker memory-snapshot forks or identical RAM/device-state continuations.
  - Guest kernels, root filesystems, and private raw run logs are intentionally kept outside the repository.
  - The validated reference path is not a claim of hostile-tenant isolation, arbitrary Linux determinism, or production readiness.
architecture: A Go control plane validates declarative scenarios, prepares owned per-run resources, cold-boots a Firecracker microVM, communicates with an authenticated guest agent over vsock, changes time only inside the guest, executes declared unprivileged workload actions, evaluates typed JSON observations, and preserves evidence plus independent execution, assertion, and cleanup outcomes.
decisions:
  - title: Move time inside the guest
    rationale: Temporal manipulation is isolated to a disposable microVM, preserving the host clock as an invariant and keeping host services outside the experiment.
  - title: Separate core from workloads
    rationale: Epoch core understands scenario declarations, time control, observations, assertions, evidence, and cleanup. Domain-specific behaviour lives in replaceable guest workloads.
  - title: Make ownership explicit
    rationale: Runtime resources and cleanup are tied to verified run ownership so interrupted experiments can be inspected and recovered without broad deletion.
  - title: Record evidence as a first-class output
    rationale: Execution, assertion, and cleanup outcomes remain distinct so a failed assertion or cleanup does not erase what actually happened.
failureModes:
  - A run must stop before boot if scenario or local image hashes do not match the declaration.
  - A guest-time change must not imply or require a host-time change.
  - Cleanup failure is recorded independently rather than being collapsed into the workload result.
  - Recovery inspects by default and only removes resources that can be tied to an owned run.
evidence:
  - title: Rocky Linux reference-host evidence
    detail: The recorded reference path covers guest boot, authenticated vsock communication, guest-only time changes, workload execution, typed assertions, evidence persistence, and owned cleanup on Rocky Linux 9.8 with Firecracker 1.16.1.
    url: https://github.com/shanurwan/epoch/blob/main/evidence/rocky-linux-x86_64/2026-09-20/summary.md
  - title: Scoped repeatability result
    detail: The repository reports one normalized semantic result for each of three authority scenarios across 20 fresh executions, explicitly limiting the claim to those declarations and observed fields.
    url: https://github.com/shanurwan/epoch/blob/main/README.md
  - title: Architecture and readiness boundaries
    detail: Architecture documentation records lifecycle ownership, trust boundaries, decisions, and the difference between implemented behaviour and roadmap language.
    url: https://github.com/shanurwan/epoch/blob/main/docs/architecture.md
lessons: Time is infrastructure state. Isolating it safely requires more than setting a clock; image identity, run ownership, guest communication, observations, cleanup, and evidence all need explicit boundaries.
currentStatus: A reference path has been exercised on a documented bare-metal host. The system remains experimental, with its repeatability and isolation claims deliberately scoped to the recorded configuration and scenarios.
---
