'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Language Switcher Component
 * Click-based dropdown for better mobile/desktop experience
 */
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: t('common.english', 'English'), flag: '🇺🇸' },
    { code: 'km', label: t('common.khmer', 'ខ្មែរ'), flag: '🇰🇭' },
  ] as const;

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main button - Click to toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-[#0056b3] hover:bg-white shadow-sm transition-all duration-300"
        title={t('common.toggleLanguage', 'Toggle Language')}
      >
        <Globe className="h-4 sm:h-5 w-4 sm:w-5 text-[#0056b3]" />
        
        {/* Show full text on desktop, abbreviation on mobile */}
        <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-slate-700">
          {currentLang?.label}
        </span>
        <span className="sm:hidden text-xs font-semibold text-slate-700">
          {language.toUpperCase()}
        </span>

        {/* Chevron icon - rotates when open */}
        <svg
          className={`h-3 sm:h-4 w-3 sm:w-4 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.button>

      {/* Dropdown menu - AnimatePresence for click open/close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-xl z-50"
          >
            <div className="p-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    language === lang.code
                      ? 'bg-[#0056b3] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.label}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-white">✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Language = 'en' | 'km';