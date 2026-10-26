---
title: AegisSRE
slug: aegissre
summary: A three-agent reliability system for Kubernetes with bounded, signed authority.
status: Pre-release
repository: https://github.com/shanurwan/AegisSRE
year: 2026
areas:
  - Kubernetes
  - A2A / MCP
  - Delegated authority
  - Observability
featured: true
order: 2
problem: An agent that can investigate a Kubernetes incident usually holds enough credentials to change the cluster. Diagnosis then quietly becomes permission, and permission becomes execution.
context: AegisSRE splits reliability work across Monitor, Investigator and Operator agents that coordinate over the Agent2Agent (A2A) Protocol v1.0. Tools are exposed over the Model Context Protocol using stateless Streamable HTTP, with read and write tools on separate servers.
constraints:
  - Monitor and Investigator never receive Kubernetes write credentials.
  - The tool surface has no raw shell, exec, arbitrary query, generic patch or secret read.
  - Dry-run is the default; live writes require several independent gates, and missing configuration stays non-mutating.
  - Model output, log text and free-form A2A messages are untrusted and cannot change policy.
architecture: Monitor detects and verifies incidents across metrics, logs and traces, then asks Investigator for a diagnosis. Investigator gathers bounded evidence through the read-only MCP server and returns an exact action proposal. Monitor issues a short-lived Ed25519 grant bound to one incident, diagnosis digest, policy digest, action and target. Operator and the action MCP server each verify the grant before one allowlisted operation runs, and Monitor collects fresh evidence before declaring recovery.
decisions:
  - title: Separate read and write trust zones
    rationale: Observe and action MCP servers use different endpoints, identities, ServiceAccounts and NetworkPolicies, so compromising the investigator does not grant writes.
  - title: Make delegation exact and short-lived
    rationale: A grant names one incident, action, target and parameter set. The default lifetime is two minutes, and configuration rejects anything over five.
  - title: Verify at every boundary
    rationale: Operator and the action server validate the grant and local policy independently, over TLS 1.3 mutual authentication.
  - title: An API receipt is not recovery
    rationale: Recovery is declared only after Monitor observes fresh evidence that the intended state was reached.
failureModes:
  - A grant is replayed; both consumers record it in separate durable scopes, so a completed receipt is returned instead of a second mutation.
  - An outcome is ambiguous; it becomes uncertain rather than being blindly retried.
  - Logs carry prompt-injection text; raw log payloads never enter the external model prompt, only provenance metadata.
  - The model provider fails or returns invalid output; Investigator falls back to its deterministic reasoner.
evidence:
  - title: Security model and threat model
    detail: Trust zones, credential placement, ten safety properties and the attacks the design does and does not defend against.
    url: https://github.com/shanurwan/AegisSRE/blob/main/docs/security-model.md
  - title: End-to-end and integration tests
    detail: Deterministic E2E tests cross real MCP, A2A and notification HTTP boundaries. PostgreSQL tests in CI cover competing owners, replay recovery, leases and outbox transitions.
    url: https://github.com/shanurwan/AegisSRE
  - title: Architecture
    detail: Component responsibilities, protocol contracts, telemetry and the production controls added beyond fixture mode.
    url: https://github.com/shanurwan/AegisSRE/blob/main/docs/architecture.md
lessons: Least privilege for agents is mostly about where credentials live. A model can propose anything; what matters is which process can sign, which can execute, and whether each one checks the other.
currentStatus: Pre-release. The control plane, mTLS, policy binding, OTLP trace export and PostgreSQL-backed state are implemented and tested in repository scope; the live laboratory acceptance run has not yet been executed.
---
