import { Product, UserProfile, AIRecommendation } from './types';
import { getProducts } from './productService';

export interface AIProvider {
    getRecommendations(user: UserProfile, context: string): Promise<AIRecommendation[]>;
    generatePersonalizedMessage(user: UserProfile): Promise<string>;
}

class MockAIProvider implements AIProvider {
    async getRecommendations(user: UserProfile, context: string): Promise<AIRecommendation[]> {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simple logic to mimic "AI" based on preferences
        const allProducts = await getProducts();
        const recommendations: AIRecommendation[] = [];

        if (user.preferences.includes('minimalist')) {
            const product = allProducts.find(p => p.title.includes('Wallet'));
            if (product) {
                recommendations.push({
                    productId: product.id,
                    reason: "Matches your 'minimalist' style preference."
                });
            }
        }

        if (user.preferences.includes('tech')) {
            const product = allProducts.find(p => p.category === 'Electronics');
            if (product) {
                recommendations.push({
                    productId: product.id,
                    reason: "Based on your interest in technology."
                });
            }
        }

        // Fallback
        if (recommendations.length === 0) {
            recommendations.push({
                productId: '6',
                reason: "Trending item you might like."
            });
        }

        return recommendations;
    }

    async generatePersonalizedMessage(user: UserProfile): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 600));
        return `Welcome back, ${user.name}. We've curated some minimalist finds just for you.`;
    }
}

// Placeholder for real Gemini/OpenAI implementation
class GeminiAIProvider implements AIProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getRecommendations(user: UserProfile, context: string): Promise<AIRecommendation[]> {
        // TODO: Implement actual API call to Gemini
        console.log('Calling Gemini with key:', this.apiKey);
        return new MockAIProvider().getRecommendations(user, context);
    }

    async generatePersonalizedMessage(user: UserProfile): Promise<string> {
        // TODO: Implement actual API call to Gemini
        return new MockAIProvider().generatePersonalizedMessage(user);
    }
}

export function getAIProvider(user: UserProfile): AIProvider {
    if (user.aiProvider === 'gemini' && user.aiApiKey) {
        return new GeminiAIProvider(user.aiApiKey);
    }
    return new MockAIProvider();
}
