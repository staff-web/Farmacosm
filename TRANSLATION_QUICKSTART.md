# 🌐 Quick Start: English-Khmer Translation System

## ✅ What's Been Set Up

Your Farmacosm website now has a complete bilingual translation system:

### 📁 New Files Created

**Infrastructure:**
- `public/locales/en.json` - English translations (source)
- `public/locales/km.json` - Khmer translations (auto-generated)

**React Components:**
- `contexts/LanguageContext.tsx` - Global language state management
- `components/language-switcher.tsx` - Responsive language toggle button
- `components/navigation-new.tsx` - Updated navigation with language switcher
- `hooks/useTranslation.ts` - Custom hook for easy translation access

**Utilities:**
- `lib/translations.ts` - Translation helper functions
- `scripts/translate.js` - Batch translation script

**Documentation & Examples:**
- `TRANSLATION_GUIDE.md` - Complete guide (see this for detailed info!)
- `components/example-translation-usage.tsx` - Usage examples
- `components/product-card-example.tsx` - Product component with translations
- `components/layout-example.tsx` - Layout integration example

**Configuration:**
- `app/layout.tsx` - Updated with LanguageProvider and Khmer font
- `package.json` - Added npm scripts

---

## 🚀 Implementation Steps

### Step 1: Replace Old Navigation

Your current navigation is in `components/navigation.tsx`. Replace it with the new version:

```bash
# Option A: Use the new version we created
cp components/navigation-new.tsx components/navigation.tsx

# Option B: Manually add to your current navigation.tsx:
# - Import: import { LanguageSwitcher } from '@/components/language-switcher';
# - Import: import { useLanguage } from '@/contexts/LanguageContext';
# - Add LanguageSwitcher in the navigation
```

### Step 2: Update Your Pages

Add translations to all your pages. Example for contact page:

**Before:**
```tsx
<h1>Contact Us</h1>
```

**After:**
```tsx
'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();
  return <h1>{t('contact.title')}</h1>;
}
```

### Step 3: Update Product Components

Apply the same pattern to `ProductsNew`, `ProductCard`, etc. See `components/product-card-example.tsx` for reference.

### Step 4: Batch Translate Content

Add new English text to `public/locales/en.json`, then run:

```bash
npm run translate
```

This auto-translates all content to Khmer!

---

## 💡 Key Files to Update

1. **Navigation**: `components/navigation.tsx`
   - Already integrated in `navigation-new.tsx`
   - Just merge the changes

2. **Contact Page**: `app/contact/contact-client.tsx`
   ```tsx
   const { t } = useLanguage();
   return (
     <h1>{t('contact.title')}</h1>
     <button>{t('contact.callUs')}</button>
   );
   ```

3. **Products Page**: `app/products/products-new.tsx`
   ```tsx
   const { t } = useLanguage();
   return (
     <h1>{t('products.title')}</h1>
     <button>{t('products.addToCart')}</button>
   );
   ```

4. **All Other Pages**: Apply the same `useLanguage()` + `t()` pattern

---

## 🎯 Translation Keys Available Now

### Navigation
- `navigation.home`
- `navigation.products`
- `navigation.services`
- `navigation.about`
- `navigation.news`
- `navigation.contact`

### Products Page
- `products.title`
- `products.filterByCategory`
- `products.allCategories`
- `products.addToCart`
- `products.viewDetails`

### Contact Page
- `contact.title`
- `contact.address`
- `contact.hours`
- `contact.callUs`
- `contact.clickToCall`
- `contact.name`
- `contact.email`
- `contact.phone`
- `contact.message`
- `contact.submit`

### Common (Global)
- `common.language`
- `common.english`
- `common.khmer`

---

## 🔧 Adding More Translations

### Process:
1. **Add English text** to `public/locales/en.json`:
   ```json
   {
     "newPage": {
       "title": "My Page Title",
       "description": "My description"
     }
   }
   ```

2. **Run translation script**:
   ```bash
   npm run translate
   ```

3. **Use in component**:
   ```tsx
   {t('newPage.title')}
   ```

---

## 📱 Language Switcher Features

✅ **Responsive Design**
- Desktop: Shows "English" / "ខ្មែរ" with globe icon
- Mobile: Shows "EN" / "KM" with globe icon (scaled down)

✅ **Automatic Switching**
- Click to change language
- Entire page translates instantly
- No page reload needed

✅ **Persistent Selection**
- Selected language saved to localStorage
- Remembers user's choice on next visit

✅ **Smooth Animations**
- Framer Motion transitions
- Dropdown animations
- Language changes are smooth

---

## 🎨 Language-Specific Styling

When you need different styling for Khmer text:

```tsx
<p className={language === 'km' ? 'font-battambang' : 'font-sans'}>
  {t('contact.message')}
</p>
```

The Battambang Khmer font is already loaded in your layout.tsx

---

## 📊 Translation API

**Free Translation Service**: MyMemory API
- No API key required
- No cost
- Rate limited at ~200ms between requests
- Automatic fallback to English if translation fails

---

## ✨ What Happens Now

1. **Language switcher appears** in your navigation
   - Shows current language
   - Dropdown to switch to Khmer

2. **Page content translates** when you click
   - All translated text updates instantly
   - Animations smooth the transitions

3. **Language preference persists**
   - Saves to browser storage
   - Remembers on next visit

4. **All new translations are batch-generated**
   - Add English text to en.json
   - Run `npm run translate`
   - Khmer translations automatically created

---

## 🚨 Important Notes

### Must Do:
1. ✅ Replace `navigation.tsx` with `navigation-new.tsx` (or merge)
2. ✅ Update your page components to use `useLanguage()` hook
3. ✅ Wrap content with `LanguageProvider` in layout (already done)
4. ✅ Add translations for your content

### Don't:
- ❌ Don't hard-code text like "Contact Us" - use `t('contact.title')`
- ❌ Don't forget to mark components as `'use client'` if using hooks
- ❌ Don't skip running `npm run translate` after adding new keys

---

## 🧪 Test It

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Look for language switcher** in top navigation
   - Should show "English" or "EN"

3. **Click to switch to Khmer**
   - ខ្មែរ text should appear

4. **Reload page**
   - Khmer should still be selected (saved in localStorage)

5. **Check responsive**
   - Desktop: Shows full "English" / "ខ្មែរ"
   - Mobile: Shows "EN" / "KM"

---

## 📚 Full Documentation

See `TRANSLATION_GUIDE.md` for:
- Complete hook reference
- All translation keys
- Code examples
- Troubleshooting
- Best practices

---

## 📞 Next Steps

1. **Update navigation**: Replace or merge `navigation-new.tsx`
2. **Update pages**: Add `useLanguage()` to all pages
3. **Add translations**: Fill in `public/locales/en.json` with all your content
4. **Run batch translate**: `npm run translate`
5. **Test everything**: Check both English and Khmer work

---

**Questions?** Check the examples in:
- `components/example-translation-usage.tsx`
- `components/product-card-example.tsx`
- `TRANSLATION_GUIDE.md`

**Ready to translate more?**
```bash
npm run translate
```

Enjoy your bilingual website! 🌍
