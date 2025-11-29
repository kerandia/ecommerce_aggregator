'use client';

import { useEffect, useState } from 'react';
import { Product, UserProfile, AIRecommendation } from '@/lib/types';
import { getProducts, getProductById } from '@/lib/productService';
import { getAIProvider } from '@/lib/aiService';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

export function PersonalizedFeed() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [aiReasoning, setAiReasoning] = useState<string>('');

    useEffect(() => {
        async function fetchRecommendations() {
            // Mock user profile - in a real app this would come from context/auth
            const user: UserProfile = {
                id: 'user_123',
                name: 'Alex',
                preferences: ['minimalist', 'tech'],
                viewedCategories: [],
                aiProvider: 'mock' // Default to mock
            };

            const aiProvider = getAIProvider(user);

            try {
                const message = await aiProvider.generatePersonalizedMessage(user);
                setAiReasoning(message);

                const aiRecs = await aiProvider.getRecommendations(user, 'home_page');

                // Fetch full product details for recommendations
                const productPromises = aiRecs.map(rec => getProductById(rec.productId));
                const products = (await Promise.all(productPromises)).filter((p): p is Product => !!p);

                setRecommendations(products);
            } catch (error) {
                console.error("Failed to fetch recommendations", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-8 w-64 bg-[var(--secondary)] rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square bg-[var(--secondary)] rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) return null;

    return (
        <section className="py-12">
            <div className="flex items-center gap-2 mb-8">
                <Sparkles className="text-[var(--primary)] h-6 w-6" />
                <h2 className="text-2xl font-semibold tracking-tight">
                    {aiReasoning || "Recommended for You"}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
