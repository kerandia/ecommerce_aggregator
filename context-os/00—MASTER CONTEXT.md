# 00—MASTER CONTEXT (keep to ~1 page)

## What we’re building (1 sentence)
`ecommerce_aggregator` is an AI-assisted commerce discovery experience that **aggregates products from multiple sources** (e.g., Shopify stores, Amazon-like marketplaces, Google results/feeds) and generates **personalized product feeds + recommendations**.

## Positioning (how it relates to Lemrock)
- Lemrock looks like **B2B agentic commerce infrastructure** for brands/retailers.
- This repo is better framed as a **product/feed aggregator + personalization layer** (could be B2C, or a prototype of a B2B component).
- We can still use Lemrock as a *benchmark/competitor reference*, not as the exact spec.

## ICP (who pays)
Pick one (we can refine):
- **Option A (B2C):** shoppers who want better discovery across stores/marketplaces.
- **Option B (B2B):** brands/retailers who want an embeddable personalized feed / recommendation widget.

## Users (who uses)
- End users browsing a personalized feed
- Operators configuring sources and preferences (in `settings/`)

## Offer (what they buy / what we ship)
- Unified feed UI across sources
- Search + filtering across aggregated products
- AI personalization (preferences → recommended items + messaging)
- Source adapters (Shopify/Amazon/Google/etc.) + normalized product model

## Why now
Discovery is fragmenting (marketplaces, DTC stores, AI search). Users want fewer tabs and more intent-based recommendations.

## Current stage
- [x] Prototype / demo (currently uses mock products + mock AI provider)
- [ ] Real connectors
- [ ] Production hardening

## What “good” looks like this week (metrics)
- Context OS describes the intended scope (B2C vs B2B) clearly
- We define 1 real source connector to build first
- We specify the canonical product schema used across sources

## Constraints / assumptions
- Source data varies wildly (attributes, variants, pricing, availability)
- Must avoid scraping-by-default if it creates policy/compliance risk; prefer official feeds/APIs
- Personalization should be explainable ("why recommended")

## Reference links
- Lemrock (benchmark): https://www.lemrock.com
