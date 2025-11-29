export type ProductSource = 'Amazon' | 'Shopify' | 'Google' | 'Other';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  source: ProductSource;
  rating?: number;
  reviewsCount?: number;
  url: string;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  preferences: string[];
  viewedCategories: string[];
  aiApiKey?: string; // Stored locally/in-memory for demo
  aiProvider: 'openai' | 'gemini' | 'mock';
}

export interface AIRecommendation {
  productId: string;
  reason: string;
}
