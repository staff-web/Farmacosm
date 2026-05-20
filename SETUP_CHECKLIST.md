# ✅ Translation System Setup Checklist

Use this to ensure everything is properly implemented.

## Phase 1: Foundation ✓ (Already Done)

- [x] Created `public/locales/en.json` - English source translations
- [x] Created `public/locales/km.json` - Khmer translations
- [x] Created `contexts/LanguageContext.tsx` - Language state management
- [x] Created `components/language-switcher.tsx` - Language toggle button
- [x] Created `hooks/useTranslation.ts` - Translation hook
- [x] Created `lib/translations.ts` - Helper functions
- [x] Created `scripts/translate.js` - Batch translation script
- [x] Updated `app/layout.tsx` with LanguageProvider & Khmer font
- [x] Updated `package.json` with npm scripts
- [x] Created documentation files

## Phase 2: Integration ⏳ (You Need To Do)

### Step 1: Update Navigation
- [ ] Review `components/navigation-new.tsx`
- [ ] Either:
  - [ ] Copy it over: `cp components/navigation-new.tsx components/navigation.tsx`
  - [ ] Or manually merge the language switcher into your current navigation
- [ ] Test navigation loads without errors
- [ ] Verify language switcher appears in header

### Step 2: Update App Layout
- [ ] Verify `app/layout.tsx` has:
  - [x] `import { LanguageProvider } from "@/contexts/LanguageContext"`
  - [x] `<LanguageProvider>` wrapper
  - [x] Khmer font imported
- [ ] Test app loads without errors

### Step 3: Update Page Components
For EACH page (contact, products, about, services, news, blog):

**For each file:**
- [ ] Add `'use client';` at top (if not already there)
- [ ] Import: `import { useLanguage } from '@/contexts/LanguageContext';`
- [ ] Call hook: `const { t, language } = useLanguage();`
- [ ] Replace hard-coded text with `t()` calls

**Example for Contact Page:**
```tsx
// app/contact/contact-client.tsx
'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export function ContactPageClient() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('contact.title')}</h1>
      <button>{t('contact.callUs')}</button>
    </div>
  );
}
```

### Step 4: Add Missing Translations

- [ ] Review your entire website
- [ ] List all user-facing text
- [ ] Add to `public/locales/en.json`:
  ```json
  {
    "yourPage": {
      "title": "Your Page Title",
      "description": "Description text",
      "buttonLabel": "Button text"
    }
  }
  ```

### Step 5: Batch Translate
- [ ] Run: `npm run translate`
- [ ] Check for errors in terminal
- [ ] Verify `public/locales/km.json` updated with new keys

### Step 6: Test Everything

**For English:**
- [ ] All pages load correctly
- [ ] All text displays properly
- [ ] Navigation works
- [ ] All buttons/links functional

**For Khmer:**
- [ ] Click language switcher
- [ ] Select "ខ្មែរ"
- [ ] All text translates to Khmer
- [ ] Khmer text displays properly (use Battambang font)
- [ ] Navigation and buttons still work
- [ ] Reload page - Khmer still selected

**Mobile Responsive:**
- [ ] Language switcher shows abbreviation (EN/KM) on mobile
- [ ] Dropdown works on touch devices
- [ ] Page content translates properly

---

## Translation Coverage Checklist

### Pages
- [ ] Home (/)
- [ ] About (/about)
- [ ] Products (/products)
- [ ] Product Details (/products/[id])
- [ ] Services (/services)
- [ ] News (/news)
- [ ] Blog Post (/news/[id])
- [ ] Contact (/contact)

### Components
- [ ] Navigation menu
- [ ] Footer
- [ ] Header
- [ ] Product cards
- [ ] Product modals
- [ ] Contact form
- [ ] Search/filters
- [ ] Buttons (CTA, Submit, etc.)
- [ ] Form labels
- [ ] Error messages
- [ ] Success messages

### Content Elements
- [ ] Headings (H1, H2, H3)
- [ ] Paragraph text
- [ ] Button labels
- [ ] Placeholder text
- [ ] Form validation messages
- [ ] Empty state messages
- [ ] Tooltips
- [ ] Breadcrumbs
- [ ] Pagination labels

---

## Implementation Example: Contact Page

### Before:
```tsx
export function ContactPageClient() {
  return (
    <section>
      <h1>Contact Us</h1>
      <div>
        <p>Address</p>
        <p>No.B6, Road 01...</p>
      </div>
      <button>Call Us</button>
      <input placeholder="Enter your name" />
      <button>Submit</button>
    </section>
  );
}
```

### After:
```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function ContactPageClient() {
  const { t, language } = useLanguage();

  return (
    <section>
      <h1>{t('contact.title')}</h1>
      <div>
        <p>{t('contact.address')}</p>
        <p>No.B6, Road 01...</p>
      </div>
      <button>{t('contact.callUs')}</button>
      <input placeholder={t('contact.name')} />
      <button>{t('contact.submit')}</button>
    </section>
  );
}
```

### Add to en.json:
```json
{
  "contact": {
    "title": "Contact Us",
    "address": "Address",
    "callUs": "Call Us",
    "name": "Enter your name",
    "submit": "Submit"
  }
}
```

---

## File Update Priority

Update pages in this order:

1. **High Priority** (Most Visited):
   - [ ] Home page
   - [ ] Products page
   - [ ] Navigation

2. **Medium Priority** (Commonly Used):
   - [ ] Contact page
   - [ ] About page
   - [ ] Services page

3. **Low Priority** (Less Visited):
   - [ ] News/Blog pages
   - [ ] Footer
   - [ ] Secondary pages

---

## Verification Commands

```bash
# Check if translations load
npm run dev

# Check if JSON is valid
node -e "require('./public/locales/en.json')"
node -e "require('./public/locales/km.json')"

# Run batch translation
npm run translate

# Check for translation errors
grep -r "undefined" public/locales/
```

---

## Common Issues & Fixes

### Issue: Language switcher not showing
**Solution:**
1. Verify `navigation.tsx` imports `LanguageSwitcher`
2. Check `LanguageProvider` wraps app in layout
3. Clear browser cache and reload

### Issue: Text not translating
**Solution:**
1. Verify component uses `'use client'`
2. Check `useLanguage()` is called
3. Verify translation key exists in JSON
4. Check for typos in key name

### Issue: Khmer text looks wrong
**Solution:**
1. Verify Battambang font loaded (check in layout.tsx)
2. Use `className="font-battambang"` for Khmer text
3. Check UTF-8 encoding on files
4. Try different browser

### Issue: Translation script fails
**Solution:**
1. Check internet connection (needs API access)
2. Verify en.json syntax is valid
3. Check for special characters that might break API
4. Try again later (API rate limits)

---

## Performance Tips

- ✅ Translations load once on app start
- ✅ Language switching is instant (no API call)
- ✅ localStorage caches language preference
- ✅ Batch translate during development, not production

## Security Notes

- ✅ All translation files are static (no sensitive data)
- ✅ Language preference stored locally (no server needed)
- ✅ MyMemory API is official and trusted
- ✅ No personal data sent to translation service

---

## Final Checklist

Before launching:
- [ ] All pages have `useLanguage()` hook
- [ ] All user-facing text uses `t()` function
- [ ] Navigation includes language switcher
- [ ] Khmer font imported in layout
- [ ] All translations updated via batch script
- [ ] Tested English version thoroughly
- [ ] Tested Khmer version thoroughly
- [ ] Tested mobile responsiveness
- [ ] Tested language persistence (reload page)
- [ ] Verified animation/styling preserved
- [ ] Checked for hard-coded English text
- [ ] Confirmed no console errors
- [ ] Performance acceptable

---

## Success Indicators

You'll know it's working when:
✅ Language switcher appears in navigation
✅ Clicking it switches between English and Khmer instantly
✅ Page content translates immediately
✅ Reloading page keeps same language selected
✅ Mobile shows compact switcher (EN/KM)
✅ Desktop shows full names (English/ខ្មែរ)
✅ All text displays without encoding issues
✅ Animations still work smoothly
✅ No console errors
✅ Both languages are fully functional

---

## Next: Production Deployment

Once all tests pass:
1. Verify all translations are accurate
2. Test on multiple devices/browsers
3. Check performance metrics
4. Deploy to production
5. Monitor user language selection (analytics)
6. Gather feedback for improvements

---

**Last Updated**: May 2026
**Status**: Ready for implementation
**Estimated Time**: 2-4 hours for full setup

Need help? Check `TRANSLATION_GUIDE.md` for detailed documentation!
