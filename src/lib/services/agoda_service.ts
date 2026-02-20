/**
 * Agoda Global Service
 * Handles hotel search and deep-link generation for monetization.
 */

export interface AgodaProperty {
    id: string;
    name: string;
    rating: number;
    priceUsd: number;
    address: string;
}

export const agodaService = {
    /**
     * Fetches properties based on location and rating constraints.
     */
    async searchProperties(location: string, minRating: number = 8.5): Promise<AgodaProperty[]> {
        console.log(`Agoda Service: Searching for hotels in ${location} with rating > ${minRating}`);

        // Mocking Agoda API Search Result
        return [
            { id: '12345', name: 'Premium Seongsu Hotel', rating: 9.1, priceUsd: 150, address: 'Seongsu-dong 2-ga' },
            { id: '67890', name: 'L' + "'" + 'Escape Hotel Seoul', rating: 8.9, priceUsd: 180, address: 'Hoehyeon-dong' }
        ];
    },

    /**
     * Generates an affiliate deep-link for conversion.
     */
    generateDeepLink(propertyId: string, checkIn: string, checkOut: string): string {
        const baseUrl = "https://www.agoda.com/partners/partnersearch.aspx";
        const cid = "1234567"; // KGEM Affiliate ID
        return `${baseUrl}?cid=${cid}&pcs=1&hl=en&hid=${propertyId}&checkin=${checkIn}&checkout=${checkOut}`;
    }
};
