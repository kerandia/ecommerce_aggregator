'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product, UserProfile } from '@/lib/types';
import { getProductById } from '@/lib/productService';
import { getAIProvider } from '@/lib/aiService';
import { ProductCard } from './ProductCard';
import { Sparkles, Bot } from 'lucide-react';

export function PersonalizedFeed() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [aiReasoning, setAiReasoning] = useState<string>('');

    useEffect(() => {
        async function fetchRecommendations() {
            // Get preferences from localStorage
            const savedPreferences = localStorage.getItem('user_preferences');
            const preferences = savedPreferences ? JSON.parse(savedPreferences) : {};

            // Mock user profile - in a real app this would come from context/auth
            const user: UserProfile = {
                id: 'user_123',
                name: 'Alex',
                preferences: [
                    ...(preferences.style || []),
                    ...(preferences.interests || []),
                    ...(preferences.budget || [])
                ].map(p => p.toLowerCase()),
                viewedCategories: [],
                aiProvider: 'mock'
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
            <section className="py-12">
                <div className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-2xl p-8 border border-[var(--primary)]/10">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Bot className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="h-6 bg-[var(--secondary)] rounded w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-[var(--secondary)] rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-[var(--secondary)] rounded w-2/3 animate-pulse"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-[3/4] bg-[var(--secondary)] rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (recommendations.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12"
        >
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-2xl p-6 md:p-8 border border-[var(--primary)]/10">
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-[var(--primary)] h-5 w-5" />
                            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                                Picked Just for You
                            </h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[var(--muted-foreground)] leading-relaxed"
                        >
                            {aiReasoning || "Based on your preferences, here are some products you might love."}
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {recommendations.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <ProductCard product={product} featured />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 text-center"
                >
                    <button className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Refresh recommendations
                    </button>
                </motion.div>
            </div>
        </motion.section>
    );
}
