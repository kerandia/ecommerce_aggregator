import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aggregator - AI Powered Shopping",
  description: "Minimalist e-commerce aggregator powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="py-8 border-t border-[var(--card-border)] mt-auto">
          <div className="container text-center text-sm text-[var(--muted-foreground)]">
            © 2024 Aggregator. AI-Powered Shopping.
          </div>
        </footer>
      </body>
    </html>
  );
}
