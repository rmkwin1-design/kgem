'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isPremium: boolean;
    premiumUntil: number | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [premiumUntil, setPremiumUntil] = useState<number | null>(null);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        let unsubscribeDoc: (() => void) | undefined;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Subscribe to user document for real-time premium updates
                const userDocRef = doc(db, 'users', firebaseUser.uid);

                // Ensure document exists
                const docSnap = await getDoc(userDocRef);
                if (!docSnap.exists()) {
                    await setDoc(userDocRef, {
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        createdAt: Date.now(),
                        premiumUntil: 0
                    }, { merge: true });
                }

                unsubscribeDoc = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        const pUntil = data.premiumUntil || 0;
                        setPremiumUntil(pUntil);
                        setIsPremium(pUntil > Date.now());
                    }
                });
            } else {
                setPremiumUntil(null);
                setIsPremium(false);
            }

            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
        };
    }, []);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isPremium, premiumUntil, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
