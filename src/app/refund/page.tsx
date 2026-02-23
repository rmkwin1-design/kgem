'use client';

import React from 'react';
import { useTranslation } from "@/context/LanguageContext";
import Link from 'next/link';

export default function RefundPage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] p-8 sm:p-20 font-sans">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--glass)] p-8 sm:p-12 rounded-[var(--radius-premium)]">
                <Link href="/" className="text-[var(--primary)] text-sm mb-8 inline-block hover:underline">{t.legal.back}</Link>

                <h1 className="text-3xl font-black mb-8 premium-gradient">{t.legal.refund.title}</h1>

                <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">{t.legal.refund.s1Title}</h2>
                        <p>{t.legal.refund.s1Desc}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">{t.legal.refund.s2Title}</h2>
                        <p>{t.legal.refund.s2Desc}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">{t.legal.refund.s3Title}</h2>
                        <p>{t.legal.refund.s3Desc}</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--glass)] text-xs">
                    {t.legal.lastUpdated}
                </div>
            </div>
        </main>
    );
}
