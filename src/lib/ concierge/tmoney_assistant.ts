/**
 * KGEM T-money Assistant
 * Helping travelers navigate the 'Cash Trap' for transport cards.
 */

export const tmoneyAssistant = {
    /**
     * Finds the nearest T-money charging stations (subway/convenience stores).
     * Addresses Pain Point #2.
     */
    async findChargingStations(lat: number, lng: number) {
        console.log(`TMoney Assistant: Finding charging stations near ${lat}, ${lng}`);
        // Mocking nearby cash-charging points
        return [
            { id: 'c1', name: 'GS25 (Near Exit 4)', type: 'convenience_store', distance: '150m' },
            { id: 'c2', name: 'Information Center (Subway)', type: 'station', distance: '300m' }
        ];
    },

    /**
     * Provides a bridge guide for virtual charging (if available via Namane or similar).
     */
    getBridgeGuide() {
        return {
            title: "T-money Cash Trap Solution",
            steps: [
                "1. Visit the nearest GS25 or CU convenience store.",
                "2. Show this screen: 'T-money 충전해 주세요' (T-money charge, please).",
                "3. Pay with CASH (Required). Nearest ATM: [Link]"
            ]
        };
    }
};
