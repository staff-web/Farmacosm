#!/usr/bin/env node
/**
 * Batch Translation Script for English to Khmer
 * Uses Google Translate free API via libre-translate
 * 
 * Usage: node scripts/translate.js
 * 
 * Install dependency: npm install node-fetch
 */

const fs = require('fs');
const path = require('path');

// Translation API endpoint (using free Google Translate alternative)
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

// Delay between requests (to avoid rate limiting)
const DELAY_MS = 200;

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Translate text using MyMemory Translation API (free)
 */
async function translateText(text, targetLang = 'km') {
  if (!text || text.trim() === '') return text;
  
  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `en|${targetLang}`
    });

    const response = await fetch(`${TRANSLATE_API}?${params}`);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    console.warn(`⚠️  Failed to translate: "${text.substring(0, 50)}..."`);
    return text;
  } catch (error) {
    console.error(`Error translating text: ${error.message}`);
    return text;
  }
}

/**
 * Recursively translate all string values in an object
 */
async function translateObject(obj, targetLang = 'km') {
  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      console.log(`Translating: "${value.substring(0, 50)}..."`);
      translated[key] = await translateText(value, targetLang);
      await sleep(DELAY_MS); // Rate limiting
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateObject(value, targetLang);
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

/**
 * Main translation process
 */
async function main() {
  try {
    console.log('🌐 Starting batch translation to Khmer...\n');

    // Read English translations
    const enPath = path.join(__dirname, '../public/locales/en.json');
    const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

    // Translate to Khmer
    console.log('📝 Translating English → Khmer\n');
    const kmTranslations = await translateObject(enTranslations, 'km');

    // Save Khmer translations
    const kmPath = path.join(__dirname, '../public/locales/km.json');
    fs.writeFileSync(kmPath, JSON.stringify(kmTranslations, null, 2), 'utf-8');

    console.log('\n✅ Translation complete!');
    console.log(`💾 Saved to: ${kmPath}`);
  } catch (error) {
    console.error('❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
