'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { kgemPayment } from '@/utils/payment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaymentContextType {
    isProcessing: boolean;
    hasBillingKey: boolean;
    registerCard: () => Promise<void>;
    processPayment: (amount: number, orderName: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasBillingKey, setHasBillingKey] = useState(false);

    // Load Payment Scripts
    useEffect(() => {
        // Toss Payments
        const tossScript = document.createElement('script');
        tossScript.src = 'https://js.tosspayments.com/v1/payment';
        tossScript.async = true;
        document.body.appendChild(tossScript);

        return () => {
            document.body.removeChild(tossScript);
        };
    }, []);

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

    const processPayment = async (amount: number, orderName: string) => {
        if (!user) return false;
        setIsProcessing(true);
        try {
            const result = await kgemPayment.payWithBillingKey(user.uid, amount, orderName);
            return result.status === 'paid';
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
            <PaymentContext.Provider value={{ isProcessing, hasBillingKey, registerCard, processPayment }}>
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
