# 03—RISK REGISTER

## Product risks
- **Misaligned expectations:** brands may expect guaranteed placement/conversion inside LLM platforms.
- **Attribution:** difficult to compare ROAS fairly vs traditional channels without consistent tracking.

## Technical risks
- **Catalog complexity:** inconsistent attributes, variants, localization, taxonomy.
- **Freshness:** inventory/price updates must be correct; stale info breaks trust.
- **Multi-tenancy:** strict isolation, least-privilege access, auditability.

## Platform risks
- **LLM platform changes:** APIs, ranking behavior, schemas, policies can change quickly.
- **Compliance:** privacy, data handling, merchant policies.

## Mitigations
- Start with 1–2 catalog formats and a narrow vertical; expand after stable normalization.
- Make tracking explicit: log every match + click + cart + purchase event.
- Build adapters and contracts so connectors are swappable.
