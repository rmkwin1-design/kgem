import { TravelSpot } from "../types/spot";
import { seoulSpots } from "./spots/seoul";
import { busanSpots } from "./spots/busan";
import { jejuSpots } from "./spots/jeju";
import { otherSpots } from "./spots/others";

// --- 통합 데이터 (Backward Compatibility) ---
export const sampleSpots: TravelSpot[] = [
    ...seoulSpots,
    ...busanSpots,
    ...jejuSpots,
    ...otherSpots
];
