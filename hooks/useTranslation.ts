/**
 * Translation Hook
 * Provides easy access to translations in any component
 */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Custom hook for translations
 * Usage: const t = useTranslation();
 *        t('contact.callUs')
 */
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
