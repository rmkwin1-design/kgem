import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

/**
 * Activates a 24-hour premium pass for the given user.
 * @param userId Firebase User ID
 */
export const activatePremiumPass = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId);

    // Add 24 hours (86,400,000 ms) to current time or extend existing premium
    const now = Date.now();
    const extension = 24 * 60 * 60 * 1000;

    // We'll use a transaction or a simple update for now
    // In a real production app, this would be done via a secure backend/webhook
    await updateDoc(userDocRef, {
        premiumUntil: now + extension,
        totalPurchases: increment(1),
        lastPurchaseAt: now
    });
};
