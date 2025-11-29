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
            transition={{ duration: 0.3 }}
            className={`group relative card p-0 overflow-hidden flex flex-col h-full border-0 bg-[var(--card-bg)] ${
                featured
                    ? 'shadow-lg hover:shadow-xl ring-1 ring-[var(--primary)]/20'
                    : 'shadow-sm hover:shadow-md'
            }`}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--secondary)]">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Skeleton loader */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)] to-[var(--muted)]/20 animate-pulse" />
                )}

                {/* Source Badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
                    {product.source}
                </div>

                {/* Featured Badge */}
                {featured && (
                    <div className="absolute top-2 left-2 bg-[var(--primary)] text-white text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
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
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${
                            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
                        }`}
                    />
                </motion.button>
            </div>

            {/* Content */}
            <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col flex-1 p-4 hover:bg-[var(--secondary)]/30 transition-colors"
            >
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                        {product.title}
                    </h3>
                </div>

                {/* Description hint */}
                {product.description && (
                    <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--card-border)]">
                    <div className="flex flex-col">
                        <span className="font-bold text-base">
                            {product.currency === 'USD' ? '$' : product.currency}
                            {product.price.toFixed(2)}
                        </span>
                        {product.rating && (
                            <span className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
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
                        whileHover={{ x: 2 }}
                        className="flex items-center gap-1 text-[var(--primary)] text-xs font-medium"
                    >
                        <span className="hidden sm:inline">View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </motion.div>
                </div>
            </a>
        </motion.div>
    );
}
