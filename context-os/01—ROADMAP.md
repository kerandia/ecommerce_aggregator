# 01—ROADMAP (now / next / later)

## NOW
- Align what this repo (`ecommerce_aggregator`) is responsible for vs the broader Lemrock platform
- Define supported inputs (catalog sources) + normalized internal schema
- Define outputs needed by downstream LLM channels (retrieval, ranking features, availability/price)

## NEXT
- Implement first production-ish pipeline: ingest → normalize → validate → store
- Add enrichment: taxonomy/category normalization, attributes, embeddings, brand voice metadata
- Add basic analytics hooks: query intent → matched products → conversion event

## LATER
- Multi-channel connectors (ChatGPT, Perplexity, etc.) as modular adapters
- Real-time inventory/price sync (webhooks + polling fallbacks)
- Governance: audit logs, approval flows for generated content, policy engine
