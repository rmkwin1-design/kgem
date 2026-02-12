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

export interface TravelSpot {
    id: number | string;
    title: LocalizedString;
    category: string;
    image: string;
    rating: number | string;
    description: LocalizedString;
    query: string;
    isTrending?: boolean;
    isFallback?: boolean;
    links?: {
        naver?: string;
        google?: string;
    };
    vipContent?: VipContent;
    transport?: LocalizedString;
    price?: number;
}
