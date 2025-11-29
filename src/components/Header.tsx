'use client';

import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass transition-all duration-300">
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-10 h-10 rounded-full bg-[var(--foreground)] flex items-center justify-center"
                    >
                        <Sparkles className="w-5 h-5 text-[var(--background)]" />
                    </motion.div>
                    <span className="font-semibold text-lg tracking-tight hidden sm:block">ShopVerse</span>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full hover:bg-[var(--secondary)] flex items-center justify-center transition-colors"
                    aria-label="Menu"
                >
                    <Menu className="w-5 h-5" />
                </motion.button>
            </header>

            {/* Minimal Side Menu */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: menuOpen ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-[var(--background)] border-l border-[var(--card-border)] z-50 p-8 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-xl font-semibold tracking-tight">Menu</h2>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/"
                        className="block px-4 py-3 rounded-xl text-lg font-medium hover:bg-[var(--secondary)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Discover
                    </Link>
                    <Link
                        href="/favorites"
                        className="block px-4 py-3 rounded-xl text-lg font-medium hover:bg-[var(--secondary)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/settings"
                        className="block px-4 py-3 rounded-xl text-lg font-medium hover:bg-[var(--secondary)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Preferences
                    </Link>
                </nav>
            </motion.div>

            {/* Backdrop */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                />
            )}
        </>
    );
}
