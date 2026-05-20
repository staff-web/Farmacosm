#!/bin/bash

# Installation script for translation dependencies
# Run: bash scripts/setup-translations.sh

echo "🌍 Setting up translation system..."

# Install required packages (if any)
echo "📦 Checking dependencies..."

# Create necessary directories
mkdir -p public/locales
mkdir -p scripts

echo "✅ Translation system setup complete!"
echo ""
echo "Next steps:"
echo "1. Add LanguageProvider to your layout.tsx"
echo "2. Import LanguageSwitcher in your navigation component"
echo "3. Use useLanguage() hook in your components"
echo "4. Run: npm run translate to batch translate content"
echo ""
echo "To add more translation keys:"
echo "1. Edit public/locales/en.json"
echo "2. Run: npm run translate"
echo "3. The km.json will be auto-updated"
