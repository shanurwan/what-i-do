---
title: PageRelic
slug: pagerelic
summary: A PostgreSQL recovery and forensics research project examining pages, tuples, WAL, checksums, corruption, and reconstruction.
status: Research / in development
year: 2026
areas:
  - PostgreSQL
  - WAL
  - Data recovery
  - Forensics
featured: false
order: 4
problem: Database recovery becomes materially different when logical access fails and the remaining evidence lives in physical pages, tuple metadata, WAL records, and checksums.
context: PageRelic is a focused systems investigation into PostgreSQL storage and recovery below the SQL interface, with an emphasis on understanding what can be established from physical evidence.
constraints:
  - Experiments must use disposable datasets with a known ground truth.
  - Reconstruction claims need to distinguish observed bytes from inferred database state.
  - PostgreSQL version and storage-format assumptions must remain explicit.
  - The project is in development; no implemented recovery capability is claimed yet.
architecture: The planned work separates fixture generation, controlled corruption, page and WAL inspection, reconstruction experiments, and comparison with the original dataset. Details will change as the research is implemented.
failureModes:
  - A structurally plausible tuple or page may still be semantically wrong.
  - WAL availability and checkpoint state constrain what can be reconstructed.
  - Version-specific storage assumptions can invalidate an otherwise repeatable experiment.
currentStatus: Research and scoping are in progress. Implementation, evidence, and a repository link will be added only when there is reviewable work to support them.
---
