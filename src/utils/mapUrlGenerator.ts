/**
 * KGEM 2026: Universal Map Link Factory
 * 🔥 FIX: Coordinate-based navigation for auto-generated spots.
 * Uses lat/lng directly when available, with name as fallback label only.
 */

export type MapType = 'naver' | 'kakao' | 'google';

interface Destination {
    lat?: number;
    lng?: number;
    name: string;      // Korean name (for Naver/Kakao)
    enName?: string;    // English/Japanese name (for Google)
}

export type MapMode = 'search' | 'directions';

/**
 * Determines if a spot name is a "real" searchable POI name or an auto-generated placeholder.
 * Auto-generated names follow patterns like "강남 필승 전략 - 서울 1" or "Seoul Secret Tea Tour 42"
 */
const isRealPOI = (name: string): boolean => {
    // Auto-generated spots have patterns like "- 서울 1", "- Seoul 42", "Tour 3", "Strategy 10"
    if (/[-–]\s*(서울|부산|제주|Seoul|Busan|Jeju|대구|대전|광주|인천|기타)\s*\d+/i.test(name)) return false;
    if (/\b(Strategy|Tour|BBQ)\s+\d+$/i.test(name)) return false;
    if (/\b(전략|투어|삼겹살)\s*[-–]\s*\w+\s*\d+$/i.test(name)) return false;
    if (/비밀 메뉴 \d+|Secret Menu \d+|裏メニュー \d+/i.test(name)) return false;
    return true;
};

export const getMapScheme = (dest: Destination, type: MapType, isAndroid: boolean, language: string, mode: MapMode = 'search'): string => {
    const { lat, lng, name, enName } = dest;
    const hasCoords = lat !== undefined && lng !== undefined && lat !== 0 && lng !== 0;

    // Determine the display name for labels
    let hybridName = language === 'ko' ? name : (enName || name);
    const encodedName = encodeURIComponent(hybridName);
    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    // Determine if we should use coordinates or text search
    const useCoords = hasCoords && !isRealPOI(name);

    switch (type) {
        case 'naver':
            if (isAndroid) {
                if (useCoords) {
                    return mode === 'search'
                        ? `nmap://place?lat=${lat}&lng=${lng}&name=${encodedName}&appname=com.kgem.app`
                        : `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=com.kgem.app`;
                }
                return mode === 'search'
                    ? `nmap://place?lat=${lat}&lng=${lng}&name=${encodedName}&appname=com.kgem.app`
                    : `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=com.kgem.app`;
            }
            // PC/iOS Web
            if (useCoords) {
                return mode === 'search'
                    ? `https://map.naver.com/v5/search/${encodedName}?c=${lng},${lat},15,0,0,0,dh&lang=${naverLang}`
                    : `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName},,-/transit?lang=${naverLang}`;
            }
            return mode === 'search'
                ? `https://map.naver.com/v5/search/${encodedName}/?lang=${naverLang}`
                : `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName},,-/transit?lang=${naverLang}`;

        case 'kakao':
            // Kakao always works well with coordinates
            if (isAndroid) {
                return mode === 'search'
                    ? `kakaomap://look?p=${lat},${lng}`
                    : `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`;
            }
            return mode === 'search'
                ? `kakaomap://look?p=${lat},${lng}`
                : `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`;

        case 'google':
        default:
            const googleTlds: { [key: string]: string } = { en: 'com', ja: 'co.jp', ko: 'ko.kr' };
            const tld = googleTlds[language] || 'com';
            const langParam = language === 'ja' ? 'ja' : 'en';
            const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

            let webUrl = "";

            if (useCoords && hasCoords) {
                // 🔥 Core Fix: Use coordinates for Google Maps when the name is auto-generated
                if (mode === 'directions') {
                    webUrl = `https://maps.google.${tld}/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
                } else {
                    webUrl = `https://www.google.${tld}/maps/search/?api=1&query=${lat},${lng}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
                }
            } else {
                const googleQuery = language === 'ko' ? name : (enName || name);
                if (mode === 'directions') {
                    webUrl = `https://maps.google.${tld}/maps/dir/?api=1&destination=${encodeURIComponent(googleQuery)}&travelmode=transit&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
                } else {
                    webUrl = `https://www.google.${tld}/maps/search/?api=1&query=${encodeURIComponent(googleQuery)}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
                }
            }

            if (isAndroid && language !== 'ko') {
                return `intent://${webUrl.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
            }
            return webUrl;
    }
};

export const getWebFallbackUrl = (dest: Destination, type: MapType, language: string, mode: MapMode = 'search'): string => {
    const { lat, lng, name, enName } = dest;
    const hasCoords = lat !== undefined && lng !== undefined && lat !== 0 && lng !== 0;
    const useCoords = hasCoords && !isRealPOI(name);

    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';
    const displayName = language === 'ko' ? name : (enName || name);
    const encodedName = encodeURIComponent(displayName);

    if (type === 'naver') {
        if (useCoords) {
            return mode === 'search'
                ? `https://map.naver.com/v5/search/${encodedName}?c=${lng},${lat},15,0,0,0,dh&lang=${naverLang}`
                : `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName},,-/transit?lang=${naverLang}`;
        }
        return mode === 'search'
            ? `https://map.naver.com/v5/search/${encodedName}/?lang=${naverLang}`
            : `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName},,-/transit?lang=${naverLang}`;
    }

    if (type === 'kakao') {
        if (useCoords && hasCoords) {
            return mode === 'search'
                ? `https://map.kakao.com/link/map/${encodedName},${lat},${lng}`
                : `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
        }
        return mode === 'search'
            ? `https://map.kakao.com/search?q=${encodedName}`
            : `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
    }

    // Google
    const googleTlds: { [key: string]: string } = { en: 'com', ja: 'co.jp', ko: 'ko.kr' };
    const tld = googleTlds[language] || 'com';
    const langParam = language === 'ja' ? 'ja' : 'en';
    const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

    if (useCoords && hasCoords) {
        if (mode === 'directions') {
            return `https://maps.google.${tld}/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
        }
        return `https://www.google.${tld}/maps/search/?api=1&query=${lat},${lng}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
    }

    const googleQuery = language === 'ko' ? name : (enName || name);
    if (mode === 'directions') {
        return `https://maps.google.${tld}/maps/dir/?api=1&destination=${encodeURIComponent(googleQuery)}&travelmode=transit&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
    }
    return `https://www.google.${tld}/maps/search/?api=1&query=${encodeURIComponent(googleQuery)}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
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
