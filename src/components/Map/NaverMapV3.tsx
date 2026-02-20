'use client';

import React, { useEffect, useRef } from 'react';

interface NaverMapV3Props {
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: any[];
    language?: 'en' | 'ko' | 'ja' | 'zh';
}

export const NaverMapV3: React.FC<NaverMapV3Props> = ({
    center = { lat: 37.5665, lng: 126.9780 },
    zoom = 15,
    markers = [],
    language = 'en'
}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 2026 Strategy: Hybrid Map Strategy (Naver Enterprise v3 + Custom UI)
        // Loading Naver Dynamic Map script with language support
        const scriptId = 'naver-map-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder&language=${language}`;
            script.async = true;
            document.head.appendChild(script);
        }

        // Initialize map once script is ready
        const initMap = () => {
            if (window.naver && mapRef.current) {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(center.lat, center.lng),
                    zoom: zoom,
                    // 2026 Premium UX Skin
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: window.naver.maps.MapTypeControlStyle.BUTTON,
                        position: window.naver.maps.Position.TOP_RIGHT
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        position: window.naver.maps.Position.RIGHT_CENTER
                    },
                    // Custom Style to feel like Google Maps but with Naver's precise data
                    logoControl: false,
                    scaleControl: true,
                    draggable: true,
                };

                const map = new window.naver.maps.Map(mapRef.current, mapOptions);

                // Add Custom Layering for "Hidden Gems"
                markers.forEach(marker => {
                    new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(marker.lat, marker.lng),
                        map: map,
                        title: marker.title,
                        icon: {
                            content: `<div class="p-1 rounded-full bg-[#6d4e73] border-2 border-white shadow-lg animate-bounce-slow">
                                         <div class="w-3 h-3 rounded-full bg-white"></div>
                                       </div>`,
                            size: new window.naver.maps.Size(24, 24),
                            anchor: new window.naver.maps.Point(12, 12)
                        }
                    });
                });
            }
        };

        const checkInterval = setInterval(() => {
            if (window.naver) {
                initMap();
                clearInterval(checkInterval);
            }
        }, 100);

        return () => clearInterval(checkInterval);
    }, [center, zoom, markers, language]);

    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div ref={mapRef} className="w-full h-full" id="naver-map-container" />

            {/* Custom Overlay for Premium Aesthetics */}
            <div className="absolute top-4 left-4 z-10 p-4 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-indigo-500/20 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] text-opacity-80">KGEM precision Live</span>
                </div>
                <h4 className="text-xs font-bold text-white">Advanced Hybrid Map</h4>
            </div>

            {/* Google Maps UX Skin Wrapper */}
            <style jsx global>{`
                #naver-map-container .naver-map-logo { display: none !important; }
                /* Custom styles to mimic global UX standards while keeping Naver precision */
            `}</style>
        </div>
    );
};
