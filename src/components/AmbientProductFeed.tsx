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
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-10 h-10 text-[var(--foreground)] mx-auto opacity-50" />
          </motion.div>
          <p className="text-[var(--muted-foreground)] text-sm font-medium tracking-wide uppercase">Curating your feed...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const EventIcon = currentEvent?.icon || Clock;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col pt-20">
      {/* Minimal Top Bar */}
      <div className="px-8 py-6 flex items-center justify-between max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)] bg-[var(--secondary)] px-4 py-2 rounded-full">
          <EventIcon className="w-4 h-4" />
          <span className="font-medium">{currentEvent?.time}</span>
        </div>
        <div className="text-xs text-[var(--muted-foreground)] font-medium tracking-widest uppercase">
          {currentIndex + 1} / {allProducts.length}
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-12 pb-12 overflow-hidden">
        <div className="w-full max-w-[1400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => handleSwipe(info)}
              className="grid md:grid-cols-[1.1fr,0.9fr] gap-12 md:gap-24 items-center"
            >
              {/* Product Image */}
              <motion.div
                className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-[var(--secondary)] shadow-2xl"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.4 }}
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
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[var(--foreground)] text-xs font-bold uppercase tracking-wider shadow-sm">
                  {currentProduct.source}
                </div>

                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-7 h-7 transition-all ${
                      liked ? 'fill-red-500 text-red-500' : 'text-gray-900'
                    }`}
                  />
                </motion.button>
              </motion.div>

              {/* Product Details */}
              <div className="space-y-8 md:space-y-10">
                {/* AI Context */}
                {currentEvent && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--secondary)]/50 border border-[var(--card-border)] backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Sparkles className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--foreground)] mb-1 uppercase tracking-wide">
                        {currentEvent.name}
                      </p>
                      <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
                        {aiMessage || `Perfect for your ${currentEvent.name.toLowerCase()}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--foreground)]">
                    {currentProduct.title}
                  </h1>

                  {currentProduct.description && (
                    <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed font-light">
                      {currentProduct.description}
                    </p>
                  )}

                  {/* Rating */}
                  {currentProduct.rating && (
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < Math.floor(currentProduct.rating!)
                                ? 'text-yellow-500'
                                : 'text-gray-200'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-[var(--muted-foreground)]">
                        {currentProduct.rating.toFixed(1)}
                        {currentProduct.reviewsCount && ` (${currentProduct.reviewsCount} reviews)`}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-5xl md:text-7xl font-bold text-[var(--foreground)] pt-4 tracking-tighter">
                    {currentProduct.currency === 'USD' ? '$' : currentProduct.currency}
                    {currentProduct.price.toFixed(2)}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <motion.a
                    href={currentProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[var(--foreground)] text-[var(--background)] px-10 py-6 rounded-full font-semibold text-xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl transition-all"
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
      <div className="px-8 py-8 flex items-center justify-center gap-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-16 h-16 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:border-[var(--foreground)]"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>

        <div className="flex gap-3">
          {allProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setCurrentProduct(allProducts[idx]);
                setLiked(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-12 bg-[var(--foreground)]'
                  : 'w-2 bg-[var(--muted)]/30 hover:bg-[var(--muted)]'
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          disabled={currentIndex === allProducts.length - 1}
          className="w-16 h-16 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:border-[var(--foreground)]"
        >
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
