# 05—PLAYBOOKS

## Playbook: Define the repo scope (1 hour)
Answer explicitly:
- B2C vs B2B: who pays and why?
- Inputs: what sources do we ingest (Shopify, Merchant Center, affiliate APIs)?
- Normalization: what canonical schema do we produce?
- Outputs: feed UI, search API, recommendation API, exports.
- Non-functional: caching, retries, idempotency, compliance.

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
