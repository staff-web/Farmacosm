# English-Khmer Translation System for Farmacosm

Complete guide for implementing and using the bilingual translation system.

## 📋 Overview

This system provides:
- ✅ English-Khmer translation management
- ✅ Responsive language switcher in navigation
- ✅ LocalStorage-based language persistence
- ✅ Free translation using MyMemory API
- ✅ Easy-to-use React hooks and context
- ✅ Batch translation script for updating all content

## 🚀 Quick Start

### 1. **Setup LanguageProvider**

Your `app/layout.tsx` is already configured with `LanguageProvider`. If not, add:

```tsx
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### 2. **Use Translations in Components**

```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t('products.title')}</h1>
      <p>{t('contact.callUs')}</p>
    </div>
  );
}
```

### 3. **Language Switcher (Already in Navigation)**

The `LanguageSwitcher` component is integrated in your navigation:
- Shows current language (English/ខ្មែរ)
- Dropdown with both options
- Responsive design (mobile: compact, desktop: full)
- Automatically switches page content

## 📁 File Structure

```
public/locales/
├── en.json          # English translations (source)
└── km.json          # Khmer translations (auto-generated)

contexts/
└── LanguageContext.tsx    # Language state & provider

components/
├── language-switcher.tsx  # Language toggle button
└── navigation-new.tsx     # Updated navigation with switcher

hooks/
└── useTranslation.ts      # Translation hook

lib/
└── translations.ts        # Translation utilities

scripts/
├── translate.js           # Batch translation script
└── setup-translations.sh  # Setup script

public/locales/en.json    # Source translations
public/locales/km.json    # Translated content
```

## 🔤 Translation Keys Structure

Keys are organized by feature/page:

```json
{
  "common": { ... },           // Global terms
  "navigation": { ... },       // Navigation menu
  "home": { ... },             // Home page
  "products": { ... },         // Products page
  "contact": { ... },          // Contact page
  "footer": { ... }            // Footer
}
```

Access with dot notation: `t('navigation.home')`

## 🌐 Adding New Translations

### Step 1: Add to `public/locales/en.json`

```json
{
  "newPage": {
    "title": "My New Title",
    "description": "My description here"
  }
}
```

### Step 2: Run Translation Script

```bash
npm run translate
```

This automatically translates all new keys to Khmer and updates `km.json`.

### Step 3: Use in Component

```tsx
const { t } = useLanguage();
return <h1>{t('newPage.title')}</h1>;
```

## 📝 Translation Keys Reference

### Navigation
```
navigation.home        → Home / ទំព័រដើម
navigation.products    → Products / ផលិតផល
navigation.services    → Services / សេវាកម្ម
navigation.about       → About / អំពីយើងខ្ញុំ
navigation.news        → News / ព័ត៌មាន
navigation.contact     → Contact / ទាក់ទងយើងខ្ញុំ
```

### Common
```
common.language        → Language / ភាសា
common.english         → English / ឧបទ្ទេស
common.khmer           → Khmer / ខ្មែរ
```

### Products
```
products.title         → Our Products / ផលិតផលរបស់យើងខ្ញុំ
products.filterByCategory
products.addToCart
products.viewDetails
```

### Contact
```
contact.title          → Contact Us / ទាក់ទងយើងខ្ញុំ
contact.name           → Name / ឈ្មោះ
contact.email          → Email / អ៊ីមែល
contact.phone          → Phone / ទូរស័ព្ទ
contact.message        → Message / សារ
contact.submit         → Submit / ដាក់ស្នើ
contact.callUs         → Call Us / ហៅយើងខ្ញុំ
```

## 🎨 Usage Examples

### Basic Translation

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t('products.title')}</h1>;
}
```

### Conditional Styling for Language

```tsx
export function StyledText() {
  const { t, language } = useLanguage();
  
  return (
    <p className={language === 'km' ? 'font-battambang' : 'font-sans'}>
      {t('contact.message')}
    </p>
  );
}
```

### Form with Translations

```tsx
export function ContactForm() {
  const { t } = useLanguage();
  
  return (
    <form>
      <label>{t('contact.name')}</label>
      <input placeholder={t('contact.name')} />
      
      <label>{t('contact.email')}</label>
      <input type="email" placeholder={t('contact.email')} />
      
      <label>{t('contact.message')}</label>
      <textarea placeholder={t('contact.message')} />
      
      <button>{t('contact.submit')}</button>
    </form>
  );
}
```

### With Animations

```tsx
import { motion } from 'framer-motion';

export function AnimatedSection() {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <h2>{t('products.title')}</h2>
    </motion.div>
  );
}
```

## 📱 Responsive Language Switcher

The `LanguageSwitcher` component automatically adapts:

**Desktop (lg+)**
- Shows full language name: "English" or "ខ្មែរ"
- Dropdown on hover
- Normal scale

**Mobile (< lg)**
- Shows abbreviation: "EN" or "KM"
- Dropdown on click
- Scaled down (75-90%)

## 💾 LocalStorage

- Language preference is automatically saved to `localStorage.language`
- Persists across page reloads
- Restores on app startup

```tsx
// Manual language selection
const { setLanguage } = useLanguage();
setLanguage('km'); // Saves to localStorage
```

## 🔄 Translation API

The batch translation script uses **MyMemory Translation API** (free):
- No API key required
- Rate limit: ~200ms delay between requests
- Fallback to English if translation fails
- Supports 1000+ language pairs

## 📊 Hook Reference

### `useLanguage()`

```tsx
const {
  language,      // 'en' or 'km'
  setLanguage,   // (lang: 'en' | 'km') => void
  translations,  // Full translation object
  t,             // (key: string, fallback?: string) => string
  isLoading      // Boolean - loading translations
} = useLanguage();
```

## 🛠️ Npm Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "translate": "node scripts/translate.js",
    "setup-translations": "bash scripts/setup-translations.sh"
  }
}
```

Usage:
```bash
npm run translate           # Batch translate all content
npm run setup-translations # Initialize translation system
```

## 🎯 Best Practices

1. **Always use `t()` for user-facing text**
   - ✅ `{t('products.title')}`
   - ❌ `'Products'` (hard-coded text)

2. **Use dot notation for organized keys**
   - ✅ `t('contact.callUs')`
   - ❌ `t('call us')`

3. **Provide fallback values**
   ```tsx
   {t('newKey', 'Default text')}
   ```

4. **Use `language` prop for conditional styling**
   ```tsx
   <div className={language === 'km' ? 'font-battambang' : ''}>
   ```

5. **Handle language switching smoothly**
   - Page content updates automatically
   - No page refresh needed
   - Smooth transitions with Framer Motion

## 🚨 Troubleshooting

### Translations not loading?
```bash
# Check if locale files exist
ls public/locales/

# Verify JSON syntax
node -e "require('./public/locales/en.json')"
```

### Language switcher not appearing?
- Ensure `LanguageProvider` wraps your app
- Check if `LanguageSwitcher` is imported in navigation
- Verify `useLanguage()` is being called in a client component

### Khmer text not displaying correctly?
- Ensure Battambang font is loaded (already in layout.tsx)
- Check for encoding issues (UTF-8 required)
- Use `className="font-battambang"` for Khmer text

### Batch translation stuck?
```bash
# Kill and retry
npm run translate

# Check for errors
tail -f scripts/translate.js
```

## 🔗 Related Files

- Navigation: [components/navigation-new.tsx](../components/navigation-new.tsx)
- Language Switcher: [components/language-switcher.tsx](../components/language-switcher.tsx)
- Context: [contexts/LanguageContext.tsx](../contexts/LanguageContext.tsx)
- Hook: [hooks/useTranslation.ts](../hooks/useTranslation.ts)
- Translations: [public/locales/](../public/locales/)

## 📞 Support

For issues or questions:
1. Check the examples in `components/example-translation-usage.tsx`
2. Review translation keys in `public/locales/en.json`
3. Verify component uses `useLanguage()` hook
4. Ensure `LanguageProvider` wraps the component

---

**Created**: May 2026
**Framework**: Next.js 14 App Router
**Translation API**: MyMemory (Free, No Key Required)
**Supported Languages**: English (en), Khmer (km)
