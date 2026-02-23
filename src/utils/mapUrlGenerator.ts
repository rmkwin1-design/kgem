/**
 * KGEM 2026: Universal Map Link Factory
 * Based on Gemini & Perplexity "Integration Guardian" Strategy.
 */

export type MapType = 'naver' | 'kakao' | 'google';

interface Destination {
    lat: number;
    lng: number;
    name: string;
    enName?: string;
}

export const getMapScheme = (dest: Destination, type: MapType, isAndroid: boolean, language: string): string => {
    const { lat, lng, name, enName } = dest;

    // Naver Map requires hybrid for accuracy, but Google/Kakao should use localized only for international users
    let hybridName = language === 'ko' ? name : (enName || name);

    // For Naver (Mobile Intent/Web), include Korean in brackets
    let naverName = language === 'ko' ? name : `${enName || name} (${name})`;

    const encodedName = encodeURIComponent(hybridName);
    const encodedNaverName = encodeURIComponent(naverName);
    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    switch (type) {
        case 'naver':
            if (isAndroid) {
                return `intent://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverName}&appname=com.kgem.app#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;S.browser_fallback_url=https://map.naver.com/v5/search/${encodedNaverName}/?lang=${naverLang};end`;
            }
            return `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverName}&appname=com.kgem.app&lang=${naverLang}`;

        case 'kakao':
            if (isAndroid) {
                return `intent://route?ep=${lat},${lng}&by=PUBLICTRANSIT#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
            }
            return `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`;

        case 'google':
        default:
            const googleTlds: { [key: string]: string } = { en: 'com', ja: 'co.jp', ko: 'co.kr' };
            const tld = googleTlds[language] || 'com';
            const googleQuery = language === 'ko' ? name : (enName || name);
            // Ultra-Force Strategy: TLD-based domain forcing works where hl parameters fail in Android Intents
            return `https://maps.google.${tld}/maps/dir/?api=1&destination=${encodeURIComponent(googleQuery)}&travelmode=transit&hl=${language}`;
    }
};

export const getWebFallbackUrl = (dest: Destination, type: MapType, language: string): string => {
    const { lat, lng, name, enName } = dest;

    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    // Google/Kakao should use localized only, Naver needs Korean for pinpointing
    const hybridName = language === 'ko' ? name : (enName || name);
    const naverName = language === 'ko' ? name : `${enName || name} (${name})`;

    const encodedName = encodeURIComponent(hybridName);
    const encodedNaverName = encodeURIComponent(naverName);

    if (type === 'naver') {
        const naverWebUrl = `https://map.naver.com/p/directions/-/${lng},${lat},${encodedNaverName},,-/transit?lang=${naverLang}`;
        return naverWebUrl;
    }

    if (type === 'kakao') {
        return `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
    }

    const googleTlds: { [key: string]: string } = { en: 'com', ja: 'co.jp', ko: 'co.kr' };
    const tld = googleTlds[language] || 'com';
    const googleQuery = language === 'ko' ? name : (enName || name);
    return `https://maps.google.${tld}/maps/dir/?api=1&destination=${encodeURIComponent(googleQuery)}&travelmode=transit&hl=${language}`;
};

export const getStoreUrl = (type: MapType, isIOS: boolean): string => {
    if (type === 'naver') {
        return isIOS ? 'https://apps.apple.com/kr/app/id311867728' : 'market://details?id=com.nhn.android.nmap';
    }
    if (type === 'kakao') {
        return isIOS ? 'https://apps.apple.com/kr/app/id304608425' : 'market://details?id=net.daum.android.map';
    }
    return '';
};
