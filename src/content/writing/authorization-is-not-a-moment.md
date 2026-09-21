---
title: Authorization Is Not a Moment in Time
slug: authorization-is-not-a-moment
description: A draft note on why approval and execution must be treated as separate authorization boundaries.
published: 2026-09-22
tags:
  - Authorization
  - Agent infrastructure
  - TOCTOU
draft: true
---

This is an intentionally incomplete example article. It exists to demonstrate the writing structure and will not be
included in production routes, listings, the RSS feed, or the sitemap while `draft` is `true`.

## Working premise

An authorization decision describes a particular request against a particular view of policy, authority, identity,
and time. If execution happens later, that view may no longer be valid.

## Questions to develop

- What state can change between approval and execution?
- Which semantics must an approval bind to?
- What must be revalidated immediately before a side effect?
- What evidence distinguishes a denied replay from a second execution?

Set `draft: false` only after replacing this example text with a reviewed article.
