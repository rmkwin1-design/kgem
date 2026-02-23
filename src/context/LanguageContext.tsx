'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ko } from '../locales/ko';
import { en } from '../locales/en';
import { ja } from '../locales/ja';

type Language = 'ko' | 'en' | 'ja';
type Translations = typeof ko;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const translations = { ko, en, ja };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ko');

    useEffect(() => {
        const savedLang = localStorage.getItem('kgem_lang') as Language;
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('kgem_lang', lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
