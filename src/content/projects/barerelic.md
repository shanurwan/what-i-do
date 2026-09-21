---
title: BareRelic
slug: barerelic
summary: A research project for bare-metal recovery and forensic experiments below normal infrastructure abstractions.
status: Research / in development
year: 2026
areas:
  - Block devices
  - Data recovery
  - Linux
  - Forensics
featured: false
order: 3
problem: When orchestration, filesystems, and familiar recovery tooling are unavailable, useful evidence may survive only in lower-level storage structures that normal infrastructure workflows abstract away.
context: BareRelic is intended as a controlled environment for learning how block devices, storage layout, failure, and recovery interact after higher-level abstractions are no longer dependable.
constraints:
  - Destructive experiments must be reproducible and isolated from real data.
  - Evidence must be preserved before recovery attempts alter the medium under examination.
  - The project is in development; no recovery capability or result is claimed yet.
architecture: The working direction separates disposable experiment media, deterministic fault or damage preparation, read-only evidence capture, recovery attempts, and comparison against known source state. The architecture will be documented as implementation work progresses.
failureModes:
  - Recovery tooling can modify the evidence it is meant to inspect.
  - Device identity mistakes can turn a controlled experiment into unintended data loss.
  - Results without a known initial state or reproducible damage process are difficult to validate.
currentStatus: Research and experiment design are in progress. Repository and implementation evidence will be linked when they are ready for public review.
---
