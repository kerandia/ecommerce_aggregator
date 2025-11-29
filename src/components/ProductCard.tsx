'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { ExternalLink, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative card p-0 overflow-hidden flex flex-col h-full border-0 bg-[var(--card-bg)] ${
                featured
                    ? 'shadow-xl ring-1 ring-black/5'
                    : 'shadow-sm hover:shadow-lg'
            }`}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--secondary)]">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Skeleton loader */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-[var(--secondary)] animate-pulse" />
                )}

                {/* Source Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[var(--foreground)] text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold shadow-sm">
                    {product.source}
                </div>

                {/* Featured Badge */}
                {featured && (
                    <div className="absolute top-3 left-3 bg-[var(--foreground)] text-[var(--background)] text-[10px] px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[var(--background)] rounded-full animate-pulse" />
                        AI Pick
                    </div>
                )}

                {/* Like Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsLiked(!isLiked);
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg translate-y-2 group-hover:translate-y-0"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${
                            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900'
                        }`}
                    />
                </motion.button>
            </div>

            {/* Content */}
            <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col flex-1 p-5 transition-colors"
            >
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-base leading-snug line-clamp-2 group-hover:text-[var(--muted-foreground)] transition-colors">
                        {product.title}
                    </h3>
                </div>

                {/* Description hint */}
                {product.description && (
                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--card-border)]">
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg tracking-tight">
                            {product.currency === 'USD' ? '$' : product.currency}
                            {product.price.toFixed(2)}
                        </span>
                        {product.rating && (
                            <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5 font-medium">
                                <span className="text-yellow-500">★</span>
                                {product.rating.toFixed(1)}
                                {product.reviewsCount && (
                                    <span className="text-[var(--muted)]">
                                        ({product.reviewsCount})
                                    </span>
                                )}
                            </span>
                        )}
                    </div>

                    <motion.div
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1 text-[var(--foreground)] text-sm font-medium group/link"
                    >
                        <span className="hidden sm:inline group-hover/link:underline decoration-1 underline-offset-4">View</span>
                        <ExternalLink className="w-4 h-4" />
                    </motion.div>
                </div>
            </a>
        </motion.div>
    );
}
