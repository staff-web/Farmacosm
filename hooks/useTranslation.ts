/**
 * Translation Hook
 * Provides easy access to translations in any component
 */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Custom hook for translations
 * Usage: const { t, language, isLoading, loadError } = useTranslation();
 *        t('contact.callUs')
 */
export function useTranslation() {
  const { t, language, isLoading, loadError } = useLanguage();
  return { t, language, isLoading, loadError };
}
