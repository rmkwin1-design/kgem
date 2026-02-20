'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type MapType = 'naver' | 'kakao' | 'google';

interface PreferenceContextType {
    preferredMap: MapType;
    setPreferredMap: (map: MapType) => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [preferredMap, setPreferredMap] = useState<MapType>('naver');

    // Persistence logic
    useEffect(() => {
        const saved = localStorage.getItem('kgem_preferred_map');
        if (saved && (saved === 'naver' || saved === 'kakao' || saved === 'google')) {
            setPreferredMap(saved as MapType);
        }
    }, []);

    const updatePreferredMap = (map: MapType) => {
        setPreferredMap(map);
        localStorage.setItem('kgem_preferred_map', map);
    };

    return (
        <PreferenceContext.Provider value={{ preferredMap, setPreferredMap: updatePreferredMap }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreference = () => {
    const context = useContext(PreferenceContext);
    if (!context) {
        throw new Error('usePreference must be used within a PreferenceProvider');
    }
    return context;
};
