'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language, Translations } from '@/lib/translations';
import { getTranslation, mergeTranslations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language Provider Component
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations on mount and language change
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        
        // Load English translations (always load as fallback)
        const enRes = await fetch('/locales/en.json');
        const enTranslations = await enRes.json();

        // Load language-specific translations
        let selectedTranslations = enTranslations;
        if (language !== 'en') {
          const langRes = await fetch(`/locales/${language}.json`);
          if (langRes.ok) {
            const langTranslations = await langRes.json();
            // Merge with English as fallback
            selectedTranslations = mergeTranslations(enTranslations, langTranslations);
          }
        }

        setTranslations(selectedTranslations);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback: use empty object, getTranslation will return the key
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Restore language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'km')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(translations, key, fallback);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to use language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
