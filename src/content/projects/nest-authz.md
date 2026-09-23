---
title: NEST Authz
slug: nest-authz
summary: Authorization infrastructure for autonomous-agent execution.
status: Experimental / research prototype
repository: https://github.com/shanurwan/nest-authz
year: 2026
areas:
  - Authorization
  - Agent infrastructure
  - Security semantics
  - Audit evidence
featured: true
order: 1
problem: Authentication can identify the subject presenting a request, but it does not prove that the subject remains authorized to perform a specific action on a specific resource at execution time.
context: NEST AuthZ explores delegated authority as explicit, typed data. It keeps authority provenance, policy evaluation, approval, revalidation, and execution reservation separate so each boundary can be reasoned about and tested.
constraints:
  - The project is experimental and is not presented as production-ready or as a complete IAM system.
  - Policy and approval may narrow or confirm authority; neither may create, widen, or resurrect it.
  - Caller-supplied trust configuration, logical time, revocation state, and subject/principal bindings remain trusted inputs.
  - The reference execution store prevents duplicate local reservations; it cannot guarantee exactly-once effects in an external system.
architecture: A framework-independent semantic core models immutable domain records, canonical identities, delegation validation, policy evaluation, approval receipts, and fresh execution permits. Signed artifacts and trust checks wrap that core, while SQLite and the optional integration scenario remain adapters at the boundary.
decisions:
  - title: Revalidate at execution time
    rationale: Approval is not treated as a timeless grant. Current delegation validity, revocation, binding, policy, and approval state are recomputed before an execution permit can be produced.
  - title: Bind approvals to exact semantics
    rationale: Typed canonical digests bind decisions and approvals to the precise request, authority, policy, and approval requirements rather than to ambiguous serialized data.
  - title: Require exact principals
    rationale: Approval transitions use explicit Principal allowlists and subject/principal binding. Opaque request context is not accepted as proof of authority.
  - title: Reserve permits durably
    rationale: The SQLite reference adapter atomically reserves an exact execution permit so replay cannot create a second logical local execution.
failureModes:
  - Missing, unmatched, or indeterminate policy input fails closed.
  - Delegation may preserve or narrow scope, never amplify it.
  - Expiry or revocation after approval blocks fresh execution authorization.
  - A request subject that is not explicitly bound to the effective authority grantee cannot proceed.
  - Signature validity alone is insufficient without key trust, purpose, artifact kind, and signer/grantor agreement.
evidence:
  - title: Claim-to-test release evidence
    detail: The repository maps security claims to unit, adversarial, typing, concurrency, packaging, and audit checks, with explicit scope and limitations.
    url: https://github.com/shanurwan/nest-authz/blob/main/docs/release-evidence.md
  - title: Reviewable security invariants
    detail: A dedicated document records the fail-closed invariants that the implementation and tests are intended to preserve.
    url: https://github.com/shanurwan/nest-authz/blob/main/docs/security-invariants.md
  - title: Threat model and failure modes
    detail: The documented protection boundary names trusted inputs and capabilities that the prototype intentionally does not provide.
    url: https://github.com/shanurwan/nest-authz/blob/main/docs/threat-model.md
lessons: Authorization is a changing system state, not a one-time decision. Making time, trust, identity, policy content, and approval provenance explicit exposes TOCTOU gaps that are easy to hide in a conventional allow/deny interface.
currentStatus: The repository describes a proposed v0.1.0 alpha research prototype. It includes a tested semantic core and reference adapters, while production PKI, distributed revocation, consensus, and exactly-once external execution remain outside scope.
---
