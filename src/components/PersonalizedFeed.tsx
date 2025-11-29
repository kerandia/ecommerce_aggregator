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
            <section className="py-16">
                <div className="bg-[var(--secondary)]/30 rounded-3xl p-10 border border-[var(--card-border)]">
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-[var(--secondary)] flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Bot className="w-6 h-6 text-[var(--muted)]" />
                        </div>
                        <div className="flex-1 space-y-5">
                            <div className="h-8 bg-[var(--secondary)] rounded-lg w-1/3 animate-pulse"></div>
                            <div className="h-5 bg-[var(--secondary)] rounded-lg w-2/3 animate-pulse"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-[3/4] bg-[var(--secondary)] rounded-2xl animate-pulse"></div>
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="py-16"
        >
            <div className="bg-[var(--secondary)]/30 rounded-3xl p-8 md:p-12 border border-[var(--card-border)] backdrop-blur-sm">
                <div className="flex items-start gap-6 mb-12">
                    <div className="w-12 h-12 rounded-full bg-[var(--background)] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-6 h-6 text-[var(--foreground)]" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Sparkles className="text-[var(--foreground)] h-5 w-5" />
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Picked Just for You
                            </h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl"
                        >
                            {aiReasoning || "Based on your preferences, here are some products you might love."}
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                    className="mt-10 text-center"
                >
                    <button className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[var(--secondary)]">
                        <Sparkles className="w-4 h-4" />
                        Refresh recommendations
                    </button>
                </motion.div>
            </div>
        </motion.section>
    );
}
