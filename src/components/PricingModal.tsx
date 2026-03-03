'use client';

import React from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { usePayment } from '@/context/PaymentContext';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { t } = useTranslation();
    const { processPayment, isProcessing } = usePayment();

    if (!isOpen) return null;

    const plans = [
        {
            id: 'free',
            name: 'Basic Explorer',
            price: '$0',
            description: 'Standard access to maps and basic spots.',
            features: ['AI Verification (Basic)', 'Standard Map Links', 'Public Spot Lists'],
            buttonText: 'Current Plan',
            premium: false
        },
        {
            id: '24h_pass',
            name: '24-Hour Secret Pass',
            price: '$4.99',
            description: 'Ultimate convenience for a focused day trip.',
            features: ['0.1% Secret Tips Unlocked', 'Advanced Map Deep-Links', 'AI Concierge Access', 'Ad-Free Experience'],
            buttonText: 'Unlock 24h',
            premium: true,
            highlight: true
        },
        {
            id: 'monthly',
            name: 'Monthly VIP',
            price: '$9.99',
            description: 'Total freedom for long-stay travelers.',
            features: ['All Premium Features', 'Offline Map Support', 'Priority Reservation Agent', 'Exclusive Local Network'],
            buttonText: 'Go VIP',
            premium: true
        }
    ];

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-4xl glass-card overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-4 right-4 z-10">
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-white">close</span>
                    </button>
                </div>

                <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <div className="text-center mb-10">
                        <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                            Unlock the secret list
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black premium-gradient mb-4">Choose Your Strategy</h2>
                        <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto leading-relaxed">
                            Stop traveling like a tourist. Get access to the 0.1% hidden spots verified by local experts and our AI Engine.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative group p-6 rounded-[var(--radius-premium)] border transition-all duration-500 flex flex-col ${plan.highlight
                                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] shadow-2xl shadow-[var(--primary)]/10'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--primary)] text-[var(--bg-dark)] text-[9px] font-black uppercase tracking-widest rounded-full">
                                        Best Value
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black premium-gradient">{plan.price}</span>
                                        {plan.id === 'monthly' && <span className="text-[10px] text-[var(--text-muted)] font-bold">/mo</span>}
                                    </div>
                                    <p className="text-[10px] text-[var(--text-muted)] font-bold mt-2 leading-tight uppercase tracking-widest">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs text-[var(--text-main)]/80">
                                            <span className="material-symbols-outlined text-[var(--primary)] text-sm">check_circle</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {plan.id === 'free' ? (
                                    <button className="w-full py-4 rounded-xl bg-white/5 text-[var(--text-muted)] font-black text-xs cursor-default">
                                        {plan.buttonText}
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <button
                                            disabled={isProcessing}
                                            onClick={() => processPayment(parseFloat(plan.price.replace('$', '')), plan.name, plan.id as any)}
                                            className="w-full py-4 rounded-xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] font-black text-xs transition-all shadow-xl shadow-[var(--primary)]/20 active:scale-95 disabled:opacity-50"
                                        >
                                            {isProcessing ? 'Processing...' : `CREDIT CARD`}
                                        </button>

                                        <PayPalButtons
                                            style={{ layout: "horizontal", height: 48, shape: "pill", label: "pay" }}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    intent: "CAPTURE",
                                                    purchase_units: [{
                                                        amount: { currency_code: "USD", value: plan.price.replace('$', '') },
                                                        description: `K-Gem ${plan.name}`
                                                    }]
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                if (actions.order) {
                                                    await actions.order.capture();
                                                    onSuccess();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest">Stripe Certified</div>
                        <div className="text-[10px] font-black uppercase tracking-widest">PayPal Verified</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
