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

    // Naver Map requires hybrid for accuracy, but Google/Kakao should use localized only for international users
    let hybridName = language === 'ko' ? name : (enName || name);

    // For Naver (Mobile Intent/Web), include Korean in brackets
    let naverName = language === 'ko' ? name : `${enName || name} (${name})`;

    const encodedName = encodeURIComponent(hybridName);
    const encodedNaverName = encodeURIComponent(naverName);
    const naverLang = language === 'ja' ? 'ja' : language === 'ko' ? 'ko' : 'en';

    switch (type) {
        case 'naver':
            const naverSearchWeb = `https://map.naver.com/v5/search/${encodedNaverName}/?lang=${naverLang}`;
            const naverRouteWeb = `https://map.naver.com/p/directions/-/${lng},${lat},${encodedNaverName},,-/transit?lang=${naverLang}`;
            const finalNaverWeb = mode === 'search' ? naverSearchWeb : naverRouteWeb;

            if (isAndroid) {
                if (language !== 'ko') {
                    // 🔥 Force Chrome for Naver Web to maintain localization
                    return `intent://${finalNaverWeb.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(finalNaverWeb)};end`;
                }
                // Standard Native App Intent
                if (mode === 'search') {
                    return `intent://search?query=${encodedNaverName}&appname=com.kgem.app#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;S.browser_fallback_url=${encodeURIComponent(naverSearchWeb)};end`;
                }
                return `intent://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverName}&appname=com.kgem.app#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;S.browser_fallback_url=${encodeURIComponent(naverRouteWeb)};end`;
            }
            return mode === 'search'
                ? `nmap://search?query=${encodedNaverName}&appname=com.kgem.app&lang=${naverLang}`
                : `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedNaverName}&appname=com.kgem.app&lang=${naverLang}`;

        case 'kakao':
            const kakaoSearchWeb = `https://map.kakao.com/link/search/${encodedName}`;
            const kakaoRouteWeb = `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
            const finalKakaoWeb = mode === 'search' ? kakaoSearchWeb : kakaoRouteWeb;

            if (isAndroid) {
                if (language !== 'ko') {
                    // 🔥 Force Chrome for Kakao Web to maintain localization
                    return `intent://${finalKakaoWeb.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(finalKakaoWeb)};end`;
                }
                // Standard Native App Intent
                if (mode === 'search') {
                    return `intent://look?p=${lat},${lng}#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
                }
                return `intent://route?ep=${lat},${lng}&by=PUBLICTRANSIT#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
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
                // Search mode (Pin view)
                webUrl = `https://www.google.${tld}/maps/search/?api=1&query=${encodeURIComponent(googleQuery)}&hl=${langParam}&lr=${lrParam}&set_language=${langParam}`;
            }

            if (isAndroid && language !== 'ko') {
                // 🔥 NotebookLM Solution: Force Chrome browser to bypass Native App's Korean locale hijacking
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
