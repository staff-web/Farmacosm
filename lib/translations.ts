/**
 * Translation utilities and configuration
 */

export type Language = 'en' | 'km';

export interface Translations {
  [key: string]: string | Translations;
}

/**
 * Get translation key with nested support
 * Example: t('contact.callUs') or t('home.title')
 */
export function getTranslation(
  translations: Translations,
  key: string,
  fallback: string = key
): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return fallback;
    }
  }

  return typeof value === 'string' ? value : fallback;
}

/**
 * Flatten nested translation object
 */
export function flattenTranslations(obj: Translations, prefix = ''): Record<string, string> {
  const flattened: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      flattened[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(flattened, flattenTranslations(value as Translations, fullKey));
    }
  }

  return flattened;
}

/**
 * Merge translations (for extending translations)
 */
export function mergeTranslations(base: Translations, override: Translations): Translations {
  const merged = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (typeof value === 'object' && value !== null && key in merged && typeof merged[key] === 'object') {
      merged[key] = mergeTranslations(merged[key] as Translations, value as Translations);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}
