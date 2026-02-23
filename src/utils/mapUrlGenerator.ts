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

export type MapMode = 'search' | 'directions';

export const getMapScheme = (dest: Destination, type: MapType, isAndroid: boolean, language: string, mode: MapMode = 'search'): string => {
    const { lat, lng, name, enName } = dest;

    // Naver Map requires hybrid for accuracy in web, but for App query, Korean is most reliable
    let hybridName = language === 'ko' ? name : (enName || name);
    // For Web links, include Korean in brackets
    let naverWebName = language === 'ko' ? name : `${enName || name} (${name})`;
    // For Native App deep links, use ONLY Korean to ensure the POI is found (Image 3 Fix)
    let naverAppQuery = name;

    const encodedName = encodeURIComponent(hybridName);
    const encodedNaverWebName = encodeURIComponent(naverWebName);
    const encodedNaverAppQuery = encodeURIComponent(naverAppQuery);
    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    switch (type) {
        case 'naver':
            const naverSearchWeb = `https://map.naver.com/v5/search/${encodedNaverWebName}/?lang=${naverLang}`;
            const naverRouteWeb = `https://map.naver.com/p/directions/-/${lng},${lat},${encodedNaverWebName},,-/transit?lang=${naverLang}`;

            if (isAndroid) {
                // Use the pure Korean name for App queries to avoid "No Results" (Image 3 fix)
                return mode === 'search'
                    ? `nmap://search?query=${encodedNaverAppQuery}&appname=com.kgem.app`
                    : `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverAppQuery}&appname=com.kgem.app`;
            }
            return mode === 'search'
                ? `nmap://search?query=${encodedNaverWebName}&appname=com.kgem.app&lang=${naverLang}`
                : `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverWebName}&appname=com.kgem.app&lang=${naverLang}`;

        case 'kakao':
            if (isAndroid) {
                // Use pure Korean names or coordinates for Kakao app to ensure accuracy
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
            const googleQuery = language === 'ko' ? name : (enName || name);
            const langParam = language === 'ja' ? 'ja' : 'en';
            const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

            let webUrl = "";
            if (mode === 'directions') {
                webUrl = `https://maps.google.${tld}/maps/dir/?api=1&destination=${encodeURIComponent(googleQuery)}&travelmode=transit&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
            } else {
                webUrl = `https://www.google.${tld}/maps/search/?api=1&query=${encodeURIComponent(googleQuery)}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
            }

            if (isAndroid && language !== 'ko') {
                // 🔥 NotebookLM Solution: Force Chrome browser to bypass Native App's Korean locale hijacking
                // Added action and category back to be more explicit and minimize "Open with" popups (Image 1 fix).
                return `intent://${webUrl.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
            }
            return webUrl;
    }
};

export const getWebFallbackUrl = (dest: Destination, type: MapType, language: string, mode: MapMode = 'search'): string => {
    const { lat, lng, name, enName } = dest;

    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    // Google/Kakao should use localized only, Naver needs Korean for pinpointing
    const hybridName = language === 'ko' ? name : (enName || name);
    const naverName = language === 'ko' ? name : `${enName || name} (${name})`;

    const encodedName = encodeURIComponent(hybridName);
    const encodedNaverName = encodeURIComponent(naverName);

    if (type === 'naver') {
        return mode === 'search'
            ? `https://map.naver.com/v5/search/${encodedNaverName}/?lang=${naverLang}`
            : `https://map.naver.com/p/directions/-/${lng},${lat},${encodedNaverName},,-/transit?lang=${naverLang}`;
    }

    if (type === 'kakao') {
        return mode === 'search'
            ? `https://map.kakao.com/search?q=${encodedName}`
            : `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
    }

    const googleTlds: { [key: string]: string } = { en: 'com', ja: 'co.jp', ko: 'ko.kr' };
    const tld = googleTlds[language] || 'com';
    const googleQuery = language === 'ko' ? name : (enName || name);
    const langParam = language === 'ja' ? 'ja' : 'en';
    const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

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
