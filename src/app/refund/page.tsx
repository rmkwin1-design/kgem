'use client';

import React from 'react';
import Link from 'next/link';

export default function RefundPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] p-8 sm:p-20 font-sans">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--glass)] p-8 sm:p-12 rounded-[var(--radius-premium)]">
                <Link href="/" className="text-[var(--primary)] text-sm mb-8 inline-block hover:underline">← Back to K-Gem</Link>

                <h1 className="text-3xl font-black mb-8 premium-gradient">Refund Policy</h1>

                <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">1. Digital Content Nature</h2>
                        <p>Due to the nature of our "24h Premium Pass" which provides immediate access to digital travel secrets, refunds are generally not provided once the payment is completed and the pass is activated.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">2. Technical Errors</h2>
                        <p>In the event of a technical failure occurring during the payment process (e.g., duplicate charges or payment deduction without pass activation), a full refund will be processed upon verification.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">3. Contact for Support</h2>
                        <p>For refund inquiries related to technical issues, please contact our support team with your PayPal transaction ID.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--glass)] text-xs">
                    Last updated: February 2026
                </div>
            </div>
        </main>
    );
}
