'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group card p-0 overflow-hidden flex flex-col h-full border-0 shadow-sm hover:shadow-md"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--secondary)]">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                    {product.source}
                </div>
            </div>

            <a href={product.url} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1 p-3 hover:bg-[var(--secondary)]/20 transition-colors">
                <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-bold text-sm">
                        {product.currency === 'USD' ? '$' : product.currency}
                        {product.price.toFixed(2)}
                    </span>
                    {product.rating && (
                        <span className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-1">
                            ★ {product.rating}
                        </span>
                    )}
                </div>
            </a>
        </motion.div>
    );
}
