#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SOURCE_LANG = 'en';
const SOURCE_FILE = path.join(__dirname, '../public/locales/en.json');
const OUTPUT_DIR = path.join(__dirname, '../public/locales');
const TRANSLATE_URL = process.env.LIBRETRANSLATE_URL || 'http://localhost:5000';
const DELAY_MS = Number(process.env.LT_DELAY_MS || 200);
const TIMEOUT_MS = Number(process.env.LT_TIMEOUT_MS || 15000);
const SAVE_EVERY = Number(process.env.LT_SAVE_EVERY || 5);
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.translation-progress.json');
const MANIFEST_FILE = path.join(OUTPUT_DIR, 'locales-manifest.json');
const PARTIAL_SUFFIX = '.inprogress.json';

const LANGUAGE_NATIVE_NAMES = {
  en: 'English',
  km: 'ខ្មែរ',
  zh: '中文',
  ja: '日本語',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ar: 'العربية',
  hi: 'हिन्दी',
  ko: '한국어',
  tr: 'Türkçe',
  pl: 'Polski',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  cs: 'Čeština',
  hu: 'Magyar',
  el: 'Ελληνικά',
  he: 'עברית',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  ro: 'Română',
  uk: 'Українська',
  bg: 'Български',
  sr: 'Српски',
  hr: 'Hrvatski',
  sk: 'Slovenčina',
  sl: 'Slovenščina',
  et: 'Eesti',
  lv: 'Latviešu',
  lt: 'Lietuvių',
  is: 'Íslenska',
  ga: 'Gaeilge',
  ca: 'Català',
  eu: 'Euskara',
  gl: 'Galego',
  sw: 'Kiswahili',
  tl: 'Filipino',
};

const DEFAULT_LANGUAGE_CODES = Object.keys(LANGUAGE_NATIVE_NAMES);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n', 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function timeoutFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timed out after ${TIMEOUT_MS}ms`));
    }, TIMEOUT_MS);

    fetch(url, { ...options, signal: controller.signal })
      .then((res) => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

async function getSupportedLanguages() {
  try {
    const response = await timeoutFetch(`${TRANSLATE_URL}/languages`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`LibreTranslate /languages responded with HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.map((item) => item.code).filter(Boolean);
  } catch (error) {
    console.warn(`⚠️  Could not fetch supported languages from LibreTranslate: ${error.message}`);
    return DEFAULT_LANGUAGE_CODES;
  }
}

function getStringPaths(value, currentPath = []) {
  if (typeof value === 'string') {
    return [{ path: currentPath, text: value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => getStringPaths(item, [...currentPath, index]));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => getStringPaths(child, [...currentPath, key]));
  }

  return [];
}

function setValueAtPath(object, path, newValue) {
  let target = object;

  for (let i = 0; i < path.length - 1; i += 1) {
    const segment = path[i];
    if (typeof segment === 'number') {
      target = target[segment];
    } else {
      target = target[segment];
    }
  }

  const lastSegment = path[path.length - 1];
  if (typeof lastSegment === 'number') {
    target[lastSegment] = newValue;
  } else {
    target[lastSegment] = newValue;
  }
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return { currentLanguage: null, currentIndex: 0, completedLanguages: [] };
  }

  try {
    return readJson(PROGRESS_FILE);
  } catch (error) {
    console.warn(`⚠️  Corrupt progress file, resetting progress: ${error.message}`);
    return { currentLanguage: null, currentIndex: 0, completedLanguages: [] };
  }
}

function saveProgress(progress) {
  writeJson(PROGRESS_FILE, progress);
}

async function translateText(text, targetLang) {
  const cacheKey = `${targetLang}:${text}`;
  translateText.cache = translateText.cache || new Map();
  if (translateText.cache.has(cacheKey)) {
    return translateText.cache.get(cacheKey);
  }

  try {
    const response = await timeoutFetch(`${TRANSLATE_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: SOURCE_LANG,
        target: targetLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body}`);
    }

    const payload = await response.json();
    const translated = payload.translatedText || payload.translated;

    if (!translated || typeof translated !== 'string') {
      throw new Error('Invalid response from LibreTranslate');
    }

    translateText.cache.set(cacheKey, translated);
    return translated;
  } catch (error) {
    console.error(`❌ Translation failed for [${targetLang}] "${text.slice(0, 50)}...": ${error.message}`);
    return text;
  }
}

async function buildManifest(generatedLanguages) {
  const languages = [SOURCE_LANG, ...generatedLanguages].map((code) => ({
    code,
    nativeName: LANGUAGE_NATIVE_NAMES[code] || code,
    label: LANGUAGE_NATIVE_NAMES[code] || code,
  }));

  writeJson(MANIFEST_FILE, languages);
  console.log(`✅ Manifest written to ${MANIFEST_FILE}`);
}

async function translateLanguage(sourceJson, targetLang, progress) {
  const outputFile = path.join(OUTPUT_DIR, `${targetLang}.json`);
  const partialFile = path.join(OUTPUT_DIR, `${targetLang}${PARTIAL_SUFFIX}`);
  const allStrings = getStringPaths(sourceJson);

  if (fs.existsSync(outputFile)) {
    console.log(`✅ Skipping ${targetLang} because ${outputFile} already exists`);
    return true;
  }

  let outputData = JSON.parse(JSON.stringify(sourceJson));
  let startIndex = 0;

  if (fs.existsSync(partialFile) && progress.currentLanguage === targetLang) {
    try {
      outputData = readJson(partialFile);
      startIndex = progress.currentIndex || 0;
      console.log(`🔁 Resuming ${targetLang} at string index ${startIndex}`);
    } catch (error) {
      console.warn(`⚠️  Could not load partial file for ${targetLang}: ${error.message}`);
      outputData = JSON.parse(JSON.stringify(sourceJson));
      startIndex = 0;
    }
  }

  const total = allStrings.length;
  for (let index = startIndex; index < total; index += 1) {
    const { path: valuePath, text } = allStrings[index];
    const key = valuePath.map((segment) => String(segment)).join('.');

    console.log(`⏳ [${targetLang}] ${index + 1}/${total} → ${key}`);
    const translation = await translateText(text, targetLang);
    setValueAtPath(outputData, valuePath, translation);

    progress.currentLanguage = targetLang;
    progress.currentIndex = index + 1;
    saveProgress(progress);
    writeJson(partialFile, outputData);

    await sleep(DELAY_MS);
  }

  fs.renameSync(partialFile, outputFile);
  progress.completedLanguages = [...new Set([...progress.completedLanguages, targetLang])];
  progress.currentLanguage = null;
  progress.currentIndex = 0;
  saveProgress(progress);
  console.log(`✅ Completed ${targetLang}: ${outputFile}`);
  return true;
}

async function main() {
  ensureDir(OUTPUT_DIR);

  const supportedLanguages = await getSupportedLanguages();
  const targetLanguages = supportedLanguages
    .filter((code) => code !== SOURCE_LANG)
    .sort();

  const usedLanguages = targetLanguages.filter((code) => {
    if (!LANGUAGE_NATIVE_NAMES[code]) {
      console.warn(`⚠️  Warning: no native name defined for ${code}, using code as label`);
    }
    return true;
  });

  if (usedLanguages.length === 0) {
    console.error('❌ No target languages found to generate. Check your LibreTranslate instance.');
    process.exit(1);
  }

  console.log(`🧾 Source language: ${SOURCE_LANG}`);
  console.log(`🌐 Target languages: ${usedLanguages.join(', ')}`);
  console.log(`📁 Writing translations into ${OUTPUT_DIR}`);

  const sourceJson = readJson(SOURCE_FILE);
  const progress = loadProgress();

  for (const targetLang of usedLanguages) {
    if (progress.completedLanguages.includes(targetLang) && fs.existsSync(path.join(OUTPUT_DIR, `${targetLang}.json`))) {
      console.log(`✅ Already generated ${targetLang}, skipping`);
      continue;
    }

    const partialFile = path.join(OUTPUT_DIR, `${targetLang}${PARTIAL_SUFFIX}`);
    if (fs.existsSync(partialFile) && progress.currentLanguage !== targetLang) {
      console.warn(`⚠️  There is an orphaned partial file for ${targetLang}. Delete ${partialFile} to restart this language.`);
      continue;
    }

    await translateLanguage(sourceJson, targetLang, progress);
  }

  await buildManifest([SOURCE_LANG, ...usedLanguages]);
  console.log('🎉 Batch translation complete. You can now deploy static locale files from /public/locales');
}

main().catch((error) => {
  console.error('❌ Batch translation script failed:', error);
  process.exit(1);
});
