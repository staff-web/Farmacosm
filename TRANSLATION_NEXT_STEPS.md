# Translation Implementation - What to Do Next

Your translation system is now working! You can see it on:
- ✅ Navigation (already done)
- ✅ Hero section (already done)  
- ✅ What We Do section (already done)

## Quick Pattern to Follow for Other Pages

I've shown you the pattern. For any other page/component, follow these 3 steps:

### Step 1: Add Import
```tsx
import { useLanguage } from "@/contexts/LanguageContext";
```

### Step 2: Call Hook in Component
```tsx
export function MyComponent() {
  const { t } = useLanguage();  // ← Add this line
  // rest of component...
}
```

### Step 3: Use Translations Instead of Hard-Coded Text
**BEFORE:**
```tsx
<h1>My Title</h1>
<p>My description text</p>
```

**AFTER:**
```tsx
<h1>{t("page.title")}</h1>
<p>{t("page.description")}</p>
```

## Components You Still Need to Update

These components have hard-coded text that should be translated:

1. **CTA Section** (`components/sections/cta.tsx`)
   - Has hardcoded titles and buttons

2. **Product Categories** (`components/sections/product-categories.tsx`)
   - Has product category text

3. **Products Page** (`app/products/page.tsx` and related)
   - Product titles, descriptions, filters

4. **Contact Page** (`app/contact/page.tsx`)
   - Form labels, headings

5. **News Section** (`app/news/page.tsx`)
   - Blog post titles, dates

6. **Footer** (`components/footer.tsx`)
   - Footer links and copyright text

## Simple Implementation Guide

For each component:

1. Open the file
2. Add `import { useLanguage } from "@/contexts/LanguageContext";` at top
3. Add `const { t } = useLanguage();` inside the component function
4. Replace hard-coded text with `{t("key.path")}`
5. Add those text entries to `public/locales/en.json` under the appropriate section
6. Run `npm run translate` to auto-generate Khmer
7. Done! Your new content will translate instantly

## Example: Contact Page

**Step 1: Add the hook**
```tsx
"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactPage() {
  const { t } = useLanguage();
  
  return (
    <h1>{t("contact.title")}</h1>
    <p>{t("contact.description")}</p>
  );
}
```

**Step 2: Add to en.json**
```json
{
  "contact": {
    "title": "Contact Us",
    "description": "Get in touch with our team..."
  }
}
```

**Step 3: Run translation**
```bash
npm run translate
```

That's it! Contact page now translates between English and Khmer.

## Testing

After updating each component:

1. `npm run dev` (start dev server)
2. Click language switcher in navigation
3. See your content change from English to Khmer
4. Click again to switch back
5. Refresh page - language preference is saved

## Files Already Updated

These are complete and working:

✅ `components/navigation.tsx` - Navigation links translate
✅ `components/sections/hero.tsx` - Hero carousel titles/subtitles translate  
✅ `components/sections/what-we-do.tsx` - Service titles/descriptions translate
✅ `public/locales/en.json` - All translation keys organized
✅ `public/locales/km.json` - Auto-generated Khmer translations

## Quick Checklist

For each page/section you update:

- [ ] Added `useLanguage` import
- [ ] Added `const { t } = useLanguage()` in component
- [ ] Replaced hard-coded text with `t()` calls
- [ ] Added translation keys to `en.json`
- [ ] Ran `npm run translate`
- [ ] Tested both English and Khmer
- [ ] Checked mobile responsiveness

## If You Get Stuck

**Q: Translation key not showing?**
- A: Make sure you added it to `en.json` first, then run `npm run translate`

**Q: Old English text still showing?**
- A: Check that you're using `{t("correct.key")}` - verify the key exists in `en.json`

**Q: Component not translating?**
- A: Make sure component is marked with `"use client"` at top

**Q: Language not persisting after reload?**
- A: This is built-in - it saves to browser storage automatically

## Next Priority

1. **Contact Page** - Usually most critical for visitors
2. **Products Page** - Important for business
3. **Services/About Pages** - Company info
4. **Footer** - Quick win, affects all pages
5. **Blog/News** - If applicable

That's all you need to know! Just follow the pattern and you'll have a fully bilingual site.
