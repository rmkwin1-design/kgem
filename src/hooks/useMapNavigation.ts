'use client';

import { useCallback } from 'react';
import { usePreference } from '@/context/PreferenceContext';
import { useTranslation } from '@/context/LanguageContext';
import { getMapScheme, getStoreUrl, getWebFallbackUrl } from '@/utils/mapUrlGenerator';

/**
 * KGEM 2026: Platform-Aware Navigation Hook
 * Implements iOS timeout fallback and Android Intent handling.
 */
export const useMapNavigation = () => {
    const { preferredMap } = usePreference();
    const { language } = useTranslation();

    const openMap = useCallback((spot: any) => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iphone|ipad|ipod/i.test(userAgent);

        const dest = {
            lat: spot.lat,
            lng: spot.lng,
            name: spot.title.ko,
            enName: language === 'ja' ? spot.title.ja : spot.title.en
        };

        // Google Maps: Universal handled by browser/OS
        const mapToUse = spot.forceMap || preferredMap;

        // Google Maps: Universal handled by browser/OS
        if (mapToUse === 'google') {
            window.open(getMapScheme(dest, 'google', isAndroid, language), '_blank');
            return;
        }

        const scheme = getMapScheme(dest, mapToUse, isAndroid, language);
        const webUrl = getWebFallbackUrl(dest, mapToUse, language);
        const storeUrl = getStoreUrl(mapToUse, isIOS);

        if (isAndroid) {
            // Intent handles app/market automatically
            window.location.href = scheme;
        } else if (isIOS) {
            // iOS: Timer-based fallback (Visibility Check)
            const start = Date.now();
            window.location.href = scheme;

            setTimeout(() => {
                // If browser is still visible and less than 2s passed, assume app is not installed
                if (document.visibilityState === 'visible' || Date.now() - start < 2000) {
                    const mapName = preferredMap === 'naver' ? 'Naver Map' : 'Kakao Map';
                    if (confirm(`${mapName} is not installed. Go to App Store?`)) {
                        window.location.href = storeUrl;
                    } else {
                        window.location.href = webUrl;
                    }
                }
            }, 1500);
        } else {
            // PC: Force Multi-language Web Map
            window.open(webUrl, '_blank');
        }
    }, [preferredMap, language]);

    return { openMap };
};
