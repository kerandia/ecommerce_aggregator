'use client';

import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[var(--background)]/80 backdrop-blur-md">
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-600 flex items-center justify-center"
                    >
                        <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center"
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
                className="fixed top-0 right-0 bottom-0 w-72 bg-[var(--card-bg)] border-l border-[var(--card-border)] z-50 p-6 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                        ✕
                    </button>
                </div>

                <nav className="space-y-1">
                    <Link
                        href="/"
                        className="block px-4 py-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Discover
                    </Link>
                    <Link
                        href="/favorites"
                        className="block px-4 py-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/settings"
                        className="block px-4 py-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
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
