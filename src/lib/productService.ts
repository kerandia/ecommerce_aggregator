import { Product } from './types';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Minimalist Leather Wallet',
        description: 'Sleek, genuine leather wallet with RFID protection.',
        price: 45.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60',
        source: 'Shopify',
        category: 'Accessories',
        url: '#'
    },
    {
        id: '2',
        title: 'Wireless Noise Cancelling Headphones',
        description: 'Premium sound quality with active noise cancellation.',
        price: 299.99,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
        source: 'Amazon',
        rating: 4.8,
        reviewsCount: 1250,
        category: 'Electronics',
        url: '#'
    },
    {
        id: '3',
        title: 'Smart Home Assistant Speaker',
        description: 'Control your home with voice commands. Compatible with major platforms.',
        price: 99.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&q=60',
        source: 'Amazon',
        rating: 4.5,
        reviewsCount: 890,
        category: 'Electronics',
        url: '#'
    },
    {
        id: '4',
        title: 'Organic Cotton T-Shirt',
        description: 'Soft, breathable, and eco-friendly basic tee.',
        price: 25.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
        source: 'Shopify',
        category: 'Clothing',
        url: '#'
    },
    {
        id: '5',
        title: 'Ergonomic Office Chair',
        description: 'Designed for comfort and productivity during long work hours.',
        price: 350.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=60',
        source: 'Amazon',
        rating: 4.7,
        reviewsCount: 450,
        category: 'Furniture',
        url: '#'
    },
    {
        id: '6',
        title: 'Ceramic Coffee Mug Set',
        description: 'Handcrafted minimalist mugs for your morning brew.',
        price: 38.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=60',
        source: 'Shopify',
        category: 'Home',
        url: '#'
    },
    {
        id: '7',
        title: 'Minimalist Desk Lamp',
        description: 'Adjustable LED desk lamp with touch control.',
        price: 42.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1534073828943-ef8010912984?auto=format&fit=crop&w=500&q=60',
        source: 'Google',
        category: 'Home',
        url: '#'
    },
    {
        id: '8',
        title: 'Mechanical Keyboard',
        description: 'Compact 60% mechanical keyboard for developers.',
        price: 85.00,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60',
        source: 'Google',
        category: 'Electronics',
        url: '#'
    }
];

export async function getProducts(): Promise<Product[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS.find(p => p.id === id);
}

export async function searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}
