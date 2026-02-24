'use client';

import { useCallback } from 'react';
import { usePreference } from '@/context/PreferenceContext';
import { useTranslation } from '@/context/LanguageContext';
import { getMapScheme, getStoreUrl, getWebFallbackUrl, MapMode } from '@/utils/mapUrlGenerator';

/**
 * KGEM 2026: Platform-Aware Navigation Hook
 * Implements iOS timeout fallback and Android Intent handling.
 */
export const useMapNavigation = () => {
    const { preferredMap } = usePreference();
    const { language } = useTranslation();

    const openMap = useCallback((spot: any, mode: MapMode = 'search') => {
        const userAgent = navigator.userAgent.toLowerCase();
        // 🔥 Robust Platform Detection: Include common mobile/browser markers to prevent fallback to PC logic
        const isAndroid = /android|samsungbrowser|chrome.*mobile/i.test(userAgent);
        const isIOS = /iphone|ipad|ipod/i.test(userAgent);

        const dest = {
            lat: spot.lat,
            lng: spot.lng,
            name: spot.title.ko,
            enName: language === 'ja'
                ? (spot.query.ja || spot.title.ja)
                : (spot.query.en || spot.title.en)
        };

        // Google Maps: Universal handled by browser/OS
        const mapToUse = spot.forceMap || preferredMap;

        // Google Maps: Universal handled by browser/OS
        if (mapToUse === 'google') {
            const scheme = getMapScheme(dest, 'google', isAndroid, language, mode);
            window.open(scheme, '_blank');
            return;
        }

        const scheme = getMapScheme(dest, mapToUse, isAndroid, language, mode);
        const webUrl = getWebFallbackUrl(dest, mapToUse, language, mode);
        const storeUrl = getStoreUrl(mapToUse, isIOS);

        if (isAndroid) {
            // Intent handles app/market automatically. Use location.href for reliability.
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
            // PC: Force pure language experience
            // If English or Japanese, force Google Maps as Naver/Kakao PC search often mixes Korean
            if (language !== 'ko') {
                const googleScheme = getMapScheme(dest, 'google', false, language, mode);
                window.open(googleScheme, '_blank');
            } else {
                window.open(webUrl, '_blank');
            }
        }
    }, [preferredMap, language]);

    return { openMap };
};
