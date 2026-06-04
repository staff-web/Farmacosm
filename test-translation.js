// Quick test to verify translation logic
// This can be pasted into browser console to test

async function testTranslation() {
  console.log('🧪 Starting translation test...');
  
  // Test Google Translate API
  async function translateWithGoogleTranslate(text, target) {
    const langMap = {
      'es': 'es', 'fr': 'fr', 'de': 'de', 'km': 'km'
    };
    
    const googleLang = langMap[target] || target;
    const truncated = text.substring(0, 500);
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'en',
      tl: googleLang,
      dt: 't',
      q: truncated
    });
    
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?${params.toString()}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      
      if (!response.ok) {
        console.warn(`⚠️ Google Translate returned ${response.status}`);
        return text;
      }
      
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map(pair => pair[0]).join('');
        if (translated && translated !== text) {
          return translated;
        }
      }
      return text;
    } catch (error) {
      console.warn(`⚠️ Google Translate failed:`, error);
      return text;
    }
  }
  
  // Test cases
  const tests = [
    { text: 'Your Trust Supply Chain Partner', lang: 'es' },
    { text: 'We deliver reliable supply chain solutions for industrial and specialty ingredients.', lang: 'fr' },
    { text: 'Explore Products', lang: 'de' },
    { text: 'Your Trust Supply Chain Partner', lang: 'km' }
  ];
  
  for (const test of tests) {
    const translated = await translateWithGoogleTranslate(test.text, test.lang);
    console.log(`✅ ${test.lang.toUpperCase()}: ${translated}`);
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('✨ Test complete!');
}

// Run the test
testTranslation();
