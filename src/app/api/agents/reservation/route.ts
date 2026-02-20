import { NextResponse } from "next/server";
import { reservationAgentWorker } from "@/lib/agents/reservation_agent_worker";

/**
 * API route to trigger the AI Reservation Agent.
 * This can be called from the Master Dashboard.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { requestId, spotTitle, details } = body;

        if (!requestId || !spotTitle || !details) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Trigger the agent worker (Non-blocking or handle response)
        // In a production environment, this would be a background job (BullMQ, Celery, Vercel Background)
        const result = await reservationAgentWorker.runCatchTableBooking(requestId, spotTitle, details);

        return NextResponse.json(result);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
