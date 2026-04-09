# 05—PLAYBOOKS

## Playbook: Define the repo scope (1 hour)
Answer explicitly:
- Inputs: what sources do we ingest (Shopify, Merchant Center, custom CSV/PIM, APIs)?
- Normalization: what canonical schema do we produce?
- Outputs: what do downstream systems need (search/retrieval index, API, feeds)?
- Non-functional: multi-tenant, rate limits, audit logs, retries, idempotency.

## Playbook: MVP pipeline
MVP deliverables:
- Sample input feed(s) under `samples/`
- Normalizer that produces canonical JSON
- Validator (schema + required fields)
- Storage stub (file/db) + API stub

## Playbook: Opportunity scorecard (for signals)
Use when deciding if a signal/opportunity is worth building for:
- Clear buyer + urgent job-to-be-done
- Distribution wedge (where do we acquire users?)
- Data advantage (what improves with usage?)
- Integration difficulty (catalog complexity)
- Compliance burden

## Builder handoff checklist (PRD-light)
- Problem + ICP
- Proposed solution + MVP scope (must/should/could)
- Success metrics
- 2–3 experiments
- Acceptance criteria
