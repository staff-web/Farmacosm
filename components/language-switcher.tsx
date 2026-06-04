'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const RAW_SUPPORTED_LANGUAGES: Array<{ code: string; label: string; nativeName: string }> = [
  { code: 'af', label: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'sq', label: 'Albanian', nativeName: 'Shqip' },
  { code: 'am', label: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية' },
  { code: 'hy', label: 'Armenian', nativeName: 'Հայերեն' },
  { code: 'az', label: 'Azerbaijani', nativeName: 'Azərbaycanca' },
  { code: 'eu', label: 'Basque', nativeName: 'Euskara' },
  { code: 'be', label: 'Belarusian', nativeName: 'Беларуская' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'bs', label: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'bg', label: 'Bulgarian', nativeName: 'Български' },
  { code: 'ca', label: 'Catalan', nativeName: 'Català' },
  { code: 'ceb', label: 'Cebuano', nativeName: 'Cebuano' },
  { code: 'ny', label: 'Chichewa', nativeName: 'Chichewa' },
  { code: 'zh', label: 'Chinese', nativeName: '中文' },
  { code: 'co', label: 'Corsican', nativeName: 'Corsu' },
  { code: 'hr', label: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'cs', label: 'Czech', nativeName: 'Čeština' },
  { code: 'da', label: 'Danish', nativeName: 'Dansk' },
  { code: 'nl', label: 'Dutch', nativeName: 'Nederlands' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'eo', label: 'Esperanto', nativeName: 'Esperanto' },
  { code: 'et', label: 'Estonian', nativeName: 'Eesti' },
  { code: 'tl', label: 'Filipino', nativeName: 'Filipino' },
  { code: 'fi', label: 'Finnish', nativeName: 'Suomi' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'fy', label: 'Frisian', nativeName: 'Frysk' },
  { code: 'gl', label: 'Galician', nativeName: 'Galego' },
  { code: 'ka', label: 'Georgian', nativeName: 'ქართული' },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'el', label: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ht', label: 'Haitian Creole', nativeName: 'Kreyòl ayisyen' },
  { code: 'ha', label: 'Hausa', nativeName: 'Hausa' },
  { code: 'haw', label: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi' },
  { code: 'he', label: 'Hebrew', nativeName: 'עברית' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'hmn', label: 'Hmong', nativeName: 'Hmong' },
  { code: 'hu', label: 'Hungarian', nativeName: 'Magyar' },
  { code: 'is', label: 'Icelandic', nativeName: 'Íslenska' },
  { code: 'ig', label: 'Igbo', nativeName: 'Igbo' },
  { code: 'id', label: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ga', label: 'Irish', nativeName: 'Gaeilge' },
  { code: 'it', label: 'Italian', nativeName: 'Italiano' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'jw', label: 'Javanese', nativeName: 'Basa Jawa' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'kk', label: 'Kazakh', nativeName: 'Қазақша' },
  { code: 'km', label: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
  { code: 'rw', label: 'Kinyarwanda', nativeName: 'Kinyarwanda' },
  { code: 'ko', label: 'Korean', nativeName: '한국어' },
  { code: 'ku', label: 'Kurdish', nativeName: 'Kurdî' },
  { code: 'ky', label: 'Kyrgyz', nativeName: 'Кыргызча' },
  { code: 'lo', label: 'Lao', nativeName: 'ລາວ' },
  { code: 'la', label: 'Latin', nativeName: 'Latina' },
  { code: 'lv', label: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', label: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'lb', label: 'Luxembourgish', nativeName: 'Lëtzebuergesch' },
  { code: 'mk', label: 'Macedonian', nativeName: 'Македонски' },
  { code: 'mg', label: 'Malagasy', nativeName: 'Malagasy' },
  { code: 'ms', label: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mt', label: 'Maltese', nativeName: 'Malti' },
  { code: 'mi', label: 'Maori', nativeName: 'Māori' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'mn', label: 'Mongolian', nativeName: 'Монгол' },
  { code: 'my', label: 'Myanmar (Burmese)', nativeName: 'မြန်မာ' },
  { code: 'ne', label: 'Nepali', nativeName: 'नेपाली' },
  { code: 'no', label: 'Norwegian', nativeName: 'Norsk' },
  { code: 'or', label: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ps', label: 'Pashto', nativeName: 'پښتو' },
  { code: 'fa', label: 'Persian', nativeName: 'فارسی' },
  { code: 'pl', label: 'Polish', nativeName: 'Polski' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ro', label: 'Romanian', nativeName: 'Română' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский' },
  { code: 'sm', label: 'Samoan', nativeName: 'Gagana Samoa' },
  { code: 'gd', label: 'Scots Gaelic', nativeName: 'Gàidhlig' },
  { code: 'sr', label: 'Serbian', nativeName: 'Српски' },
  { code: 'st', label: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'sn', label: 'Shona', nativeName: 'Shona' },
  { code: 'sd', label: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'si', label: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'sk', label: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'sl', label: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'so', label: 'Somali', nativeName: 'Soomaali' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'su', label: 'Sundanese', nativeName: 'Basa Sunda' },
  { code: 'sw', label: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'sv', label: 'Swedish', nativeName: 'Svenska' },
  { code: 'tg', label: 'Tajik', nativeName: 'Тоҷикӣ' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'tr', label: 'Turkish', nativeName: 'Türkçe' },
  { code: 'uk', label: 'Ukrainian', nativeName: 'Українська' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو' },
  { code: 'uz', label: 'Uzbek', nativeName: 'Oʻzbek' },
  { code: 'vi', label: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'cy', label: 'Welsh', nativeName: 'Cymraeg' },
  { code: 'xh', label: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'yi', label: 'Yiddish', nativeName: 'ייִדיש' },
  { code: 'yo', label: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'zu', label: 'Zulu', nativeName: 'isiZulu' },
];

const PRIORITY_LANGUAGE_CODES = ['en', 'km', 'zh', 'ja', 'fr', 'ko'];

const prioritizedSupportedLanguages = PRIORITY_LANGUAGE_CODES
  .map((code) => RAW_SUPPORTED_LANGUAGES.find((lang) => lang.code === code))
  .filter((lang): lang is { code: string; label: string; nativeName: string } => Boolean(lang));

const SUPPORTED_LANGUAGES = [
  ...prioritizedSupportedLanguages,
  ...RAW_SUPPORTED_LANGUAGES.filter((lang) => !PRIORITY_LANGUAGE_CODES.includes(lang.code)).sort((a, b) =>
    a.label.localeCompare(b.label, 'en'),
  ),
];

interface LanguageSwitcherProps {
  /** Pass nav's scrolled state so the button color matches other nav links */
  scrolled?: boolean;
}

export function LanguageSwitcher({ scrolled = true }: LanguageSwitcherProps) {
  const { language, setLanguage, isLoading, loadError } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === language);
  const currentLanguageName =
    currentLanguage?.label ||
    new Intl.DisplayNames(['en'], { type: 'language' }).of(language) ||
    language.toUpperCase();

  // When not scrolled (transparent nav over hero image) → white text like other links
  // When scrolled (white bg nav) → slate-700 text like other links
  const triggerColor = scrolled ? 'text-slate-700 hover:text-[#0056b3]' : 'text-white hover:text-white/80';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 ${triggerColor}`}
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline text-sm font-bold">{currentLanguageName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-left transition-colors ${
                  language === lang.code
                    ? 'text-[#0056b3] font-semibold bg-blue-50'
                    : 'text-slate-700 font-normal hover:text-[#0056b3]'
                }`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                disabled={isLoading && language === lang.code}
              >
                <span>{lang.label}</span>
              </Button>
            ))}
          </div>
          {loadError ? (
            <p className="mt-2 text-xs text-red-600">{loadError}</p>
          ) : null}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}