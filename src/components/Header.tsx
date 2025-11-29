'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Settings } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?q=${encodeURIComponent(query)}`);
        } else {
            router.push('/');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
                    <span className="text-[var(--primary)]">Aggr</span>egator.
                </Link>

                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="input pl-10 bg-[var(--secondary)] border-transparent focus:bg-[var(--background)]"
                        />
                    </form>
                </div>

                <nav className="flex items-center gap-4">
                    <Link href="/cart" className="p-2 hover:bg-[var(--secondary)] rounded-full transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                    </Link>
                    <Link href="/settings" className="p-2 hover:bg-[var(--secondary)] rounded-full transition-colors">
                        <Settings className="h-5 w-5" />
                    </Link>
                    <Link href="/profile" className="p-2 hover:bg-[var(--secondary)] rounded-full transition-colors">
                        <User className="h-5 w-5" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}
