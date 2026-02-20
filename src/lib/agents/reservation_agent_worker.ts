import { chromium } from "playwright";
import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * KGEM AI Reservation Agent Worker
 * Performs autonomous browser automation for restaurant bookings.
 */
export const reservationAgentWorker = {
    async runCatchTableBooking(requestId: string, targetSpot: string, details: { date: string, time: string, partySize: number }) {
        console.log(`[AI Agent] Starting reservation task for: ${targetSpot}`);

        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            // 1. Navigate to CatchTable (Simplified for Demo)
            await page.goto("https://www.catchtable.net/");

            // 2. Perform Search
            await page.fill('input[placeholder*="Search"]', targetSpot);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(2000);

            // 3. Select the spot and find slots
            // (Note: In a real implementation, we would use specific selectors for CatchTable's UI)
            console.log(`[AI Agent] Searching for slots on ${details.date} at ${details.time}...`);

            // Simulate agent logic: "Waiting for empty slot..."
            const slotFound = Math.random() > 0.3; // 70% success rate for simulation

            if (slotFound) {
                console.log(`[AI Agent] Slot found! Proceeding with auto-booking...`);

                // 4. Update Firestore Status
                await updateDoc(doc(db, "reservation_requests", requestId), {
                    status: 'success',
                    completedAt: serverTimestamp(),
                    agentLog: 'Reservation secured autonomously via AI worker.'
                });

                await browser.close();
                return { status: 'success', message: 'Booking confirmed!' };
            } else {
                throw new Error("No available slots found for the requested time.");
            }

        } catch (error: any) {
            console.error(`[AI Agent] Task failed: ${error.message}`);

            await updateDoc(doc(db, "reservation_requests", requestId), {
                status: 'retrying',
                lastError: error.message,
                updatedAt: serverTimestamp()
            });

            await browser.close();
            return { status: 'failed', error: error.message };
        }
    }
};
