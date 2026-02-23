'use client';

import React from 'react';
import { useTranslation } from "@/context/LanguageContext";
import Link from 'next/link';

export default function TermsPage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] p-8 sm:p-20 font-sans">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--glass)] p-8 sm:p-12 rounded-[var(--radius-premium)]">
                <Link href="/" className="text-[var(--primary)] text-sm mb-8 inline-block hover:underline">← Back to K-Gem</Link>

                <h1 className="text-3xl font-black mb-8 premium-gradient">Terms of Service</h1>

                <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">1. Service Description</h2>
                        <p>K-Gem (Korea Travel Curator) provides premium travel curation and AI concierge services. By using our service, you agree to these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">2. Premium Pass</h2>
                        <p>The "24h Premium Pass" provides temporary access to restricted "0.1% Secret" content and VIP concierge features for exactly 24 hours from the moment of activation.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">3. Usage Restrictions</h2>
                        <p>Content provided by K-Gem is for personal use only. Unauthorized reproduction or commercial distribution of our "Secret" tips is strictly prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">4. Liability</h2>
                        <p>K-Gem provides information based on AI synthesis and local research. While we strive for 100% accuracy, travel safety and actual conditions are the responsibility of the user.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--glass)] text-xs">
                    Last updated: February 2026
                </div>
            </div>
        </main>
    );
}
