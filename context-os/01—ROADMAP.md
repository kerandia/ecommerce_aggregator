# 01—ROADMAP (now / next / later)

## NOW
- Decide positioning: **B2C discovery app** vs **B2B embeddable feed/reco**
- Define canonical `Product` schema (variants, price, availability, source, url)
- Pick first real source integration (Shopify feed/API is the most straightforward)

## NEXT
- Implement 1 connector: ingest → normalize → validate → store
- Replace mock products with real data behind feature flag
- Replace mock AI provider with real (Gemini/OpenAI) calls + “why recommended” explanations

## LATER
- Additional connectors (Merchant Center feeds, marketplaces, affiliate APIs)
- Real-time freshness (inventory/price) + caching strategy
- Analytics: query intent → clicks → conversions; attribution model
