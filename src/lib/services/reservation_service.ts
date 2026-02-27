import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, where } from "firebase/firestore";

/**
 * KGEM Reservation Proxy Service
 * Handles user requests for CatchTable/Tabling reservations.
 */
export const reservationService = {
    /**
     * Submits a reservation request from a user.
     */
    async requestProxy(userId: string, spot: any, details: { date: string; time: string; partySize: number }) {
        const reservationsRef = collection(db, "reservation_requests");

        await addDoc(reservationsRef, {
            userId,
            spotId: spot.id,
            spotTitle: spot.title.ko || spot.title['ko'],
            requestType: 'catchtable_proxy',
            details,
            status: 'pending',
            createdAt: serverTimestamp(),
            fee: 9.99, // Standard proxy fee
            currency: 'USD'
        });

        return { status: 'success', message: 'Reservation request submitted.' };
    },

    /**
     * Fetches all pending reservations for the Admin (Oppa).
     */
    async getPendingReservations() {
        const reservationsRef = collection(db, "reservation_requests");
        const q = query(
            reservationsRef,
            where("status", "==", "pending"),
            orderBy("createdAt", "desc"),
            limit(50)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    /**
     * Generates an Agoda Affiliate deep link for accommodation.
     */
    getAgodaDeepLink(spot: any, language: string = 'en') {
        const partnerId = process.env.NEXT_PUBLIC_AGODA_CID || "1882852"; // Mock CID
        const propertyId = spot.agodaPropertyId || "571217"; // Fallback to a popular SEO guest house if missing

        // Default dates: tomorrow to day after tomorrow if none provided
        const checkin = new Date();
        checkin.setDate(checkin.getDate() + 1);
        const checkout = new Date();
        checkout.setDate(checkout.getDate() + 3);

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        return `https://www.agoda.com/partners/partnerlanding.aspx?pcs=1&cid=${partnerId}&hl=${language}&propertyId=${propertyId}&checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}`;
    }
};
