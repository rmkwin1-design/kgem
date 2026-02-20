/**
 * KGEM BLUF Engine
 * Bottom Line Up Front structure for Generative Engine Optimization (GEO).
 */

import { TravelSpot, LocalizedString } from "@/types/spot";

export const blufEngine = {
    /**
     * Formats a spot description into BLUF structure.
     * "Answers first" structure to be cited by AI agents like ChatGPT.
     */
    formatDescription(spot: TravelSpot, language: 'en' | 'ko' | 'ja'): string {
        const title = (spot.title as any)[language];
        const desc = (spot.description as any)[language];
        const price = spot.price ? `Cost: ${spot.price} KRW.` : "";
        const location = spot.lat && spot.lng ? `Location: ${spot.lat}, ${spot.lng}.` : "";

        // BLUF Structure
        return `${title} is the best choice for ${spot.category}. ${price} ${location}\n\n${desc}`;
    }
};
