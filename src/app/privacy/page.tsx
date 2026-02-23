'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] p-8 sm:p-20 font-sans">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--glass)] p-8 sm:p-12 rounded-[var(--radius-premium)]">
                <Link href="/" className="text-[var(--primary)] text-sm mb-8 inline-block hover:underline">← Back to K-Gem</Link>

                <h1 className="text-3xl font-black mb-8 premium-gradient">Privacy Policy</h1>

                <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">1. Data Collection</h2>
                        <p>We collect minimal data necessary for service operation:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Email and profile info from Google/Firebase (for authentication).</li>
                            <li>Transaction reference from PayPal (to verify premium status).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">2. Payment Security</h2>
                        <p>K-Gem does NOT store or process your credit card numbers. All financial transactions are handled securely by PayPal. We only receive a confirmation of payment success.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">3. Data Storage</h2>
                        <p>Your data is stored securely using Firebase's encrypted cloud storage. We do not sell your personal information to third parties.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--glass)] text-xs">
                    Last updated: February 2026
                </div>
            </div>
        </main>
    );
}
