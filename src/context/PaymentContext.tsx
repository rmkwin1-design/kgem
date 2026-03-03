'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { kgemPayment } from '@/utils/payment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaymentContextType {
    isProcessing: boolean;
    hasBillingKey: boolean;
    subscriptionStatus: 'free' | '24h_pass' | 'monthly';
    registerCard: () => Promise<void>;
    processPayment: (amount: number, orderName: string, type?: '24h_pass' | 'monthly') => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasBillingKey, setHasBillingKey] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<'free' | '24h_pass' | 'monthly'>('free');

    // Load Payment Scripts
    useEffect(() => {
        // Toss Payments
        const tossScript = document.createElement('script');
        tossScript.src = 'https://js.tosspayments.com/v1/payment';
        tossScript.async = true;
        document.body.appendChild(tossScript);

        // Stripe
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        stripeScript.async = true;
        document.body.appendChild(stripeScript);

        return () => {
            document.body.removeChild(tossScript);
            document.body.removeChild(stripeScript);
        };
    }, []);

    // Check subscription status on user load
    useEffect(() => {
        const checkStatus = async () => {
            if (user) {
                // In a real app, we'd fetch from Firestore
                // For now, we'll check local state or a mock
                console.log("Checking subscription for:", user.uid);
            }
        };
        checkStatus();
    }, [user]);

    const registerCard = async () => {
        if (!user) return;
        setIsProcessing(true);
        try {
            // @ts-ignore
            const tossPayments = window.TossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D4a3mOwvbyq60M9NxP63V5E1el7X');
            await tossPayments.requestBillingAuth('CARD', {
                customerKey: user.uid,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            });
        } catch (error) {
            console.error('Card registration failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const processPayment = async (amount: number, orderName: string, type?: '24h_pass' | 'monthly') => {
        if (!user) return false;
        setIsProcessing(true);
        try {
            const result = await kgemPayment.payWithBillingKey(user.uid, amount, orderName);
            if (result.status === 'paid') {
                if (type === '24h_pass') setSubscriptionStatus('24h_pass');
                if (type === 'monthly') setSubscriptionStatus('monthly');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Payment failed:', error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PaymentContext.Provider value={{ isProcessing, hasBillingKey, subscriptionStatus, registerCard, processPayment }}>
                {children}
            </PaymentContext.Provider>
        </PayPalScriptProvider>
    );
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};
