#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/locales');
const SOURCE_FILE = path.join(__dirname, '../public/locales/en.json');

const enContent = fs.readFileSync(SOURCE_FILE, 'utf8');
const enJson = JSON.parse(enContent);

const translations = {
  es: {
    'Welcome to Farmacosm': 'Bienvenido a Farmacosm',
    'Premium pharmaceutical solutions': 'Soluciones farmacéuticas premium',
    'Your Trust Supply Chain Partner': 'Su socio de cadena de suministro de confianza',
    'We deliver reliable supply chain solutions for industrial and specialty ingredients': 'Entregamos soluciones confiables de cadena de suministro para ingredientes industriales y especiales',
    'Explore Products': 'Explorar Productos',
    'About Us': 'Acerca de Nosotros',
    'Quality Products': 'Productos de Calidad',
    'Premium pharmaceutical and chemical supplies': 'Suministros farmacéuticos y químicos premium',
    'Advanced Research': 'Investigación Avanzada',
    'Cutting-edge pharmaceutical solutions': 'Soluciones farmacéuticas de vanguardia',
    'Reliable Supply Chain': 'Cadena de Suministro Confiable',
    'Comprehensive logistics and warehousing services': 'Servicios integrales de logística y almacenamiento',
    'Global Distribution': 'Distribución Global',
    'Efficient delivery across Southeast Asia': 'Entrega eficiente en toda Asia Sudoriental',
    'What We Do': '¿Qué Hacemos?',
    'Home': 'Inicio',
    'About': 'Acerca de',
    'Products': 'Productos',
    'Services': 'Servicios',
    'News': 'Noticias',
    'Contact': 'Contacto',
  },
  fr: {
    'Welcome to Farmacosm': 'Bienvenue à Farmacosm',
    'Premium pharmaceutical solutions': 'Solutions pharmaceutiques premium',
    'Your Trust Supply Chain Partner': 'Votre partenaire de chaîne d\'approvisionnement de confiance',
    'We deliver reliable supply chain solutions for industrial and specialty ingredients': 'Nous fournissons des solutions fiables de chaîne d\'approvisionnement pour les ingrédients industriels et spécialisés',
    'Explore Products': 'Explorez les Produits',
    'About Us': 'À Propos de Nous',
    'Quality Products': 'Produits de Qualité',
    'Premium pharmaceutical and chemical supplies': 'Fournitures pharmaceutiques et chimiques premium',
    'Advanced Research': 'Recherche Avancée',
    'Cutting-edge pharmaceutical solutions': 'Solutions pharmaceutiques de pointe',
    'Reliable Supply Chain': 'Chaîne d\'approvisionnement fiable',
    'Comprehensive logistics and warehousing services': 'Services complets de logistique et d\'entreposage',
    'Global Distribution': 'Distribution Mondiale',
    'Efficient delivery across Southeast Asia': 'Livraison efficace dans toute l\'Asie du Sud-Est',
    'What We Do': 'Ce Que Nous Faisons',
    'Home': 'Accueil',
    'About': 'À Propos',
    'Products': 'Produits',
    'Services': 'Services',
    'News': 'Actualités',
    'Contact': 'Contact',
  },
  de: {
    'Welcome to Farmacosm': 'Willkommen bei Farmacosm',
    'Premium pharmaceutical solutions': 'Premium-Pharmalösungen',
    'Your Trust Supply Chain Partner': 'Ihr vertrauenswürdiger Supply-Chain-Partner',
    'We deliver reliable supply chain solutions for industrial and specialty ingredients': 'Wir liefern zuverlässige Supply-Chain-Lösungen für Industrie- und Spezialzutaten',
    'Explore Products': 'Produkte Erkunden',
    'About Us': 'Über Uns',
    'Quality Products': 'Qualitätsprodukte',
    'Premium pharmaceutical and chemical supplies': 'Premium Pharma- und Chemikalienversorgung',
    'Advanced Research': 'Fortgeschrittene Forschung',
    'Cutting-edge pharmaceutical solutions': 'Hochmoderne Pharmalösungen',
    'Reliable Supply Chain': 'Zuverlässige Lieferkette',
    'Comprehensive logistics and warehousing services': 'Umfassende Logistik- und Lagerhaltungsdienste',
    'Global Distribution': 'Globale Verteilung',
    'Efficient delivery across Southeast Asia': 'Effiziente Lieferung in ganz Südostasien',
    'What We Do': 'Was Wir Tun',
    'Home': 'Startseite',
    'About': 'Über',
    'Products': 'Produkte',
    'Services': 'Dienste',
    'News': 'Nachrichten',
    'Contact': 'Kontakt',
  },
  zh: {
    'Welcome to Farmacosm': '欢迎来到法玛宇宙',
    'Premium pharmaceutical solutions': '高级制药解决方案',
    'Your Trust Supply Chain Partner': '您值得信赖的供应链合作伙伴',
    'We deliver reliable supply chain solutions for industrial and specialty ingredients': '我们为工业和特种成分提供可靠的供应链解决方案',
    'Explore Products': '探索产品',
    'About Us': '关于我们',
    'Quality Products': '优质产品',
    'Premium pharmaceutical and chemical supplies': '优质制药和化学品供应',
    'Advanced Research': '先进研究',
    'Cutting-edge pharmaceutical solutions': '尖端制药解决方案',
    'Reliable Supply Chain': '可靠的供应链',
    'Comprehensive logistics and warehousing services': '全面的物流和仓储服务',
    'Global Distribution': '全球分布',
    'Efficient delivery across Southeast Asia': '东南亚高效配送',
    'What We Do': '我们做什么',
    'Home': '首页',
    'About': '关于',
    'Products': '产品',
    'Services': '服务',
    'News': '新闻',
    'Contact': '联系',
  },
  ja: {
    'Welcome to Farmacosm': 'ファルマコズムへようこそ',
    'Premium pharmaceutical solutions': 'プレミアム製薬ソリューション',
    'Your Trust Supply Chain Partner': 'あなたの信頼できるサプライチェーンパートナー',
    'We deliver reliable supply chain solutions for industrial and specialty ingredients': '工業用および特殊成分向けの信頼できるサプライチェーンソリューションを提供します',
    'Explore Products': '製品を探索',
    'About Us': 'について',
    'Quality Products': '品質製品',
    'Premium pharmaceutical and chemical supplies': 'プレミアム医薬品および化学品供給',
    'Advanced Research': '高度な研究',
    'Cutting-edge pharmaceutical solutions': '最先端の医薬品ソリューション',
    'Reliable Supply Chain': '信頼できるサプライチェーン',
    'Comprehensive logistics and warehousing services': '包括的なロジスティクスおよび倉庫保管サービス',
    'Global Distribution': 'グローバル流通',
    'Efficient delivery across Southeast Asia': '東南アジア全体への効率的な配送',
    'What We Do': 'なし',
    'Home': 'ホーム',
    'About': 'について',
    'Products': '製品',
    'Services': 'サービス',
    'News': 'ニュース',
    'Contact': 'お問い合わせ',
  },
};

function deepTranslate(obj, langDict) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = langDict[value] || value;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = deepTranslate(value, langDict);
    } else {
      result[key] = value;
    }
  }
  return result;
}

for (const [lang, dict] of Object.entries(translations)) {
  try {
    const translated = deepTranslate(enJson, dict);
    const filepath = path.join(OUTPUT_DIR, `${lang}.json`);
    fs.writeFileSync(filepath, JSON.stringify(translated, null, 2));
    console.log(`✅ ${lang}`);
  } catch (err) {
    console.error(`❌ ${lang}:`, err.message);
  }
}

console.log('Done!');
