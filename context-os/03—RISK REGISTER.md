# 03—RISK REGISTER

## Product risks
- **Unclear buyer:** if we don’t pick B2C vs B2B, we’ll build a nice demo that nobody pays for.
- **Thin differentiation:** "another shopping feed" unless we have a strong personalization/data wedge.

## Data/connector risks
- **Policy/compliance:** scraping marketplaces can violate ToS; prefer official APIs/feeds.
- **Coverage vs quality:** many sources with poor normalization creates a bad UX.

## Technical risks
- **Catalog complexity:** variants, attributes, taxonomy mismatches.
- **Freshness:** stale price/inventory breaks trust.
- **Attribution:** conversions happen off-site (affiliate), making measurement hard.

## Mitigations
- Pick 1 source first (Shopify/merchant feed) and make it excellent.
- Build a strict canonical schema + validator.
- Add explainable personalization and collect explicit preferences.
