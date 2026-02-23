declare global {
    interface Window {
        naver: any;
    }
}

export interface LocalizedString {
    ko: string;
    en: string;
    ja: string;
    [key: string]: string;
}

export interface VipContent {
    secretMenu: LocalizedString;
    ownerTip: LocalizedString;
    status?: LocalizedString;
}

export interface GeoSchema {
    bluf: LocalizedString; // Bottom Line Up Front for AI Agents
    faq?: { question: LocalizedString; answer: LocalizedString }[];
}

export interface TravelSpot {
    id: number | string;
    title: LocalizedString;
    category: string;
    image: string;
    rating: number | string;
    description: LocalizedString;
    query: LocalizedString;
    isTrending?: boolean;
    isFallback?: boolean;
    links?: {
        naver?: string;
        google?: string;
    };
    vipContent?: VipContent;
    transport?: LocalizedString;
    price?: number;
    lat?: number;
    lng?: number;
    geoSchema?: GeoSchema; // GEO (Generative Engine Optimization) layer
}

