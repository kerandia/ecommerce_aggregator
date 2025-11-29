'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Product, UserProfile } from '@/lib/types';
import { getProducts, getProductById } from '@/lib/productService';
import { getAIProvider } from '@/lib/aiService';
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  ShoppingBag,
  Sparkles,
  Clock,
  MapPin,
  Sun,
  Moon,
  Coffee,
  Briefcase
} from 'lucide-react';
import Image from 'next/image';

interface Event {
  name: string;
  icon: any;
  time: string;
}

export function AmbientProductFeed() {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [aiMessage, setAiMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState(false);

  // Detect current event/context
  useEffect(() => {
    const detectEvent = () => {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 9) {
        return { name: 'Morning Routine', icon: Coffee, time: 'Good morning' };
      } else if (hour >= 9 && hour < 12) {
        return { name: 'Work Mode', icon: Briefcase, time: 'Focus time' };
      } else if (hour >= 12 && hour < 14) {
        return { name: 'Lunch Break', icon: Sun, time: 'Midday' };
      } else if (hour >= 14 && hour < 18) {
        return { name: 'Afternoon', icon: Briefcase, time: 'Productive hours' };
      } else if (hour >= 18 && hour < 22) {
        return { name: 'Evening Wind Down', icon: Moon, time: 'Relax time' };
      } else {
        return { name: 'Late Night', icon: Moon, time: 'Night owl' };
      }
    };

    setCurrentEvent(detectEvent());

    // Update event every minute
    const interval = setInterval(() => {
      setCurrentEvent(detectEvent());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Load products with AI personalization
  useEffect(() => {
    async function loadProducts() {
      try {
        const savedPreferences = localStorage.getItem('user_preferences');
        const preferences = savedPreferences ? JSON.parse(savedPreferences) : {};

        const user: UserProfile = {
          id: 'user_123',
          name: 'You',
          preferences: [
            ...(preferences.style || []),
            ...(preferences.interests || []),
            ...(preferences.budget || [])
          ].map(p => p.toLowerCase()),
          viewedCategories: [],
          aiProvider: 'mock'
        };

        const aiProvider = getAIProvider(user);
        const message = await aiProvider.generatePersonalizedMessage(user);
        setAiMessage(message);

        const products = await getProducts();
        setAllProducts(products);
        setCurrentProduct(products[0]);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleNext = () => {
    if (currentIndex < allProducts.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      setCurrentProduct(allProducts[currentIndex + 1]);
      setLiked(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setCurrentProduct(allProducts[currentIndex - 1]);
      setLiked(false);
    }
  };

  const handleSwipe = (info: PanInfo) => {
    if (info.offset.x > 100) {
      handlePrevious();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // In real app, save to favorites
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-12 h-12 text-[var(--primary)] mx-auto" />
          </motion.div>
          <p className="text-[var(--muted-foreground)]">Finding your perfect match...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const EventIcon = currentEvent?.icon || Clock;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col pt-16">
      {/* Minimal Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <EventIcon className="w-4 h-4" />
          <span className="font-medium">{currentEvent?.time}</span>
        </div>
        <div className="text-xs text-[var(--muted-foreground)] font-medium">
          {currentIndex + 1} / {allProducts.length}
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-8 overflow-hidden">
        <div className="w-full max-w-6xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => handleSwipe(info)}
              className="grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-16 items-center"
            >
              {/* Product Image */}
              <motion.div
                className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--secondary)] shadow-xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Floating Source Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wide">
                  {currentProduct.source}
                </div>

                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center"
                >
                  <Heart
                    className={`w-6 h-6 transition-all ${
                      liked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </motion.button>
              </motion.div>

              {/* Product Details */}
              <div className="space-y-6 md:space-y-8">
                {/* AI Context */}
                {currentEvent && (
                  <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--primary)] mb-1.5">
                        {currentEvent.name}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
                        {aiMessage || `Perfect for your ${currentEvent.name.toLowerCase()}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                    {currentProduct.title}
                  </h1>

                  {currentProduct.description && (
                    <p className="text-base md:text-lg text-[var(--foreground)]/60 leading-relaxed">
                      {currentProduct.description}
                    </p>
                  )}

                  {/* Rating */}
                  {currentProduct.rating && (
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < Math.floor(currentProduct.rating!)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-[var(--foreground)]/60">
                        {currentProduct.rating.toFixed(1)}
                        {currentProduct.reviewsCount && ` (${currentProduct.reviewsCount})`}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-5xl md:text-6xl font-bold text-[var(--primary)] pt-2">
                    {currentProduct.currency === 'USD' ? '$' : currentProduct.currency}
                    {currentProduct.price.toFixed(2)}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <motion.a
                    href={currentProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[var(--primary)] text-white px-8 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    View Product
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="px-6 py-6 flex items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-14 h-14 rounded-full bg-[var(--card-bg)] border-2 border-[var(--card-border)] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm hover:border-[var(--primary)] hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex gap-2.5">
          {allProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setCurrentProduct(allProducts[idx]);
                setLiked(false);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-10 bg-[var(--primary)]'
                  : 'w-2 bg-[var(--muted)]/40 hover:bg-[var(--muted)]'
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={currentIndex === allProducts.length - 1}
          className="w-14 h-14 rounded-full bg-[var(--card-bg)] border-2 border-[var(--card-border)] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm hover:border-[var(--primary)] hover:shadow-md"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
