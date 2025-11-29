import { PersonalizedFeed } from "@/components/PersonalizedFeed";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, searchProducts } from "@/lib/productService";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q;
  const allProducts = query ? await searchProducts(query) : await getProducts();

  return (
    <div className="container py-8 space-y-16">
      {/* Hero Section - Only show if no search */}
      {!query && (
        <section className="py-20 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)]">
            Curated by AI.
            <br />
            Designed for You.
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Experience a clutter-free shopping journey. We aggregate the best products from Amazon, Shopify, and more.
          </p>
        </section>
      )}

      {/* AI Personalization Section - Only show if no search */}
      {!query && <PersonalizedFeed />}

      {/* All Products Grid */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          {query ? `Search Results for "${query}"` : "Trending Now"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
