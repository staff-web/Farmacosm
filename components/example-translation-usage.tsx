'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

/**
 * Example Component: Using Translations
 * Shows how to implement translations in any component
 */

export function ExampleComponent() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Example 1: Simple translation */}
      <section>
        <h2 className="text-2xl font-bold">
          {t('products.title', 'Our Products')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('products.filterByCategory', 'Filter by Category')}
        </p>
      </section>

      {/* Example 2: Translated button */}
      <section>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          {t('products.addToCart', 'Add to Cart')}
        </button>
      </section>

      {/* Example 3: Conditional text based on language */}
      <section>
        <p className={language === 'km' ? 'font-battambang' : 'font-sans'}>
          {t('common.language', 'Language')}: {language.toUpperCase()}
        </p>
      </section>

      {/* Example 4: Translated form labels */}
      <section className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.name', 'Name')}
          </label>
          <input
            type="text"
            placeholder={t('contact.name', 'Enter your name')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.email', 'Email')}
          </label>
          <input
            type="email"
            placeholder={t('contact.email', 'Enter your email')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.message', 'Message')}
          </label>
          <textarea
            placeholder={t('contact.message', 'Enter your message')}
            className="w-full px-4 py-2 border rounded-lg"
            rows={5}
          />
        </div>

        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          {t('contact.submit', 'Submit')}
        </button>
      </section>

      {/* Example 5: Animated translations */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20"
        >
          <h3 className="font-bold mb-2">
            {t('contact.quickContact', 'Quick Contact')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('contact.sendMessage', 'Send us a Message')}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
