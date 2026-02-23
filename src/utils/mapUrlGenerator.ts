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

    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    // Premium Strategy: Hybrid Formatting based on current language
    let hybridName = name;
    if (language !== 'ko' && enName) {
        hybridName = `${enName} (${name})`;
    }

    const encodedName = encodeURIComponent(hybridName);

    switch (type) {
        case 'naver':
            if (isAndroid) {
                return `intent://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=com.kgem.app#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;S.browser_fallback_url=https://map.naver.com/v5/search/${encodedName}/?lang=${naverLang};end`;
            }
            return `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=com.kgem.app&lang=${naverLang}`;

        case 'kakao':
            if (isAndroid) {
                return `intent://route?ep=${lat},${lng}&by=PUBLICTRANSIT#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
            }
            return `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`;

        case 'google':
        default:
            return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit&hl=${language}`;
    }
};

export const getWebFallbackUrl = (dest: Destination, type: MapType, language: string): string => {
    const { lat, lng, name, enName } = dest;

    let hybridName = name;
    if (language !== 'ko' && enName) {
        hybridName = `${enName} (${name})`;
    }

    const encodedName = encodeURIComponent(hybridName);
    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    if (type === 'naver') {
        return `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName},,-/transit?lang=${naverLang}`;
    }

    if (type === 'kakao') {
        return `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
    }

    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit&hl=${language}`;
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
