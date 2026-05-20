export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  specs: string;
  price: string;
  description: string;
  features: string[];
  applications?: string[];
  technicalData?: string;
}

// ─── 6 categories matching the navigation exactly ─────────────────────────────

export const productData: Record<string, Product[]> = {
  "Pharmaceutical and health care": [
    {
      id: 1,
      name: "Pharmaceutical Grade Sodium Bicarbonate",
      image: "/images/blog-pharma.jpg",
      category: "Pharmaceutical and health care",
      specs: "99.8% purity, Ph.Eur standard",
      price: "Contact for quote",
      description: "High-quality pharmaceutical grade sodium bicarbonate for pharmaceutical formulations.",
      features: ["Ph.Eur certified", "99.8% purity", "Bulk availability", "FDA compliant"],
      applications: ["Tablet formulations", "Injectable solutions", "Antacids", "Buffering agents"],
      technicalData: "CAS: 144-55-8 | Molecular Weight: 84.01 g/mol | Appearance: White crystalline powder",
    },
    {
      id: 2,
      name: "Sodium Stannate",
      image: "/images/blog-compliance.jpg",
      category: "Pharmaceutical and health care",
      specs: "Industrial & pharmaceutical grade",
      price: "Contact for quote",
      description: "Premium sodium stannate for advanced pharmaceutical and chemical applications.",
      features: ["Multiple grades", "Consistent quality", "Competitive pricing", "Long shelf life"],
      applications: ["Electroplating", "Pharmaceutical intermediates", "Catalysts", "Ceramics"],
      technicalData: "CAS: 12058-66-1 | Molecular Weight: 266.73 g/mol | Purity: 98% min",
    },
    {
      id: 3,
      name: "Pharmaceutical Grade Sodium Hydroxide",
      image: "/images/blog-sustainable.jpg",
      category: "Pharmaceutical and health care",
      specs: "USP/BP certified",
      price: "Contact for quote",
      description: "Pure sodium hydroxide for pharmaceutical and laboratory use.",
      features: ["USP certified", "High purity", "Safe packaging", "Bulk availability"],
      applications: ["pH adjustment", "API synthesis", "Cleaning validation", "Laboratory reagents"],
      technicalData: "CAS: 1310-73-2 | Molecular Weight: 40.00 g/mol | Assay: 98-100.5%",
    },
  ],
  "Personal and home care": [
    {
      id: 10,
      name: "Premium Emollient Oil Complex",
      image: "/images/cosmetic-care.jpg",
      category: "Personal and home care",
      specs: "100% natural blend",
      price: "Contact for quote",
      description: "Luxurious emollient oils for Personal and cosmetic formulations.",
      features: ["Skin conditioning", "Light texture", "Antioxidant rich", "Sustainable sourced"],
      applications: ["Moisturizers", "Serums", "Body lotions", "Hair oils"],
      technicalData: "Natural oil blend | Non-comedogenic | Dermatologically tested",
    },
    {
      id: 11,
      name: "Surfactant Blend for Shampoos",
      image: "/images/blog-compliance.jpg",
      category: "Personal and home care",
      specs: "Mild and gentle",
      price: "Contact for quote",
      description: "Specialized surfactant blends for high-performance shampoo formulations.",
      features: ["Gentle cleansing", "Rich lather", "Hair conditioning", "pH balanced"],
      applications: ["Shampoos", "Body washes", "Facial cleansers", "Baby products"],
      technicalData: "Active matter: 30-40% | pH: 5.5-6.5 | Biodegradable",
    },
    {
      id: 12,
      name: "Home Care Disinfectant Base",
      image: "/images/blog-partnership.jpg",
      category: "Personal and home care",
      specs: "Industrial strength",
      price: "Contact for quote",
      description: "Powerful disinfectant compounds for household cleaning products.",
      features: ["Antimicrobial action", "Fast acting", "Non-corrosive", "Safe formulation"],
      applications: ["Surface cleaners", "Floor disinfectants", "Bathroom cleaners", "Kitchen sprays"],
      technicalData: "Active ingredient: 5-10% | Contact time: 30 seconds",
    },
  ],
  "Food and Food ingredient": [
    {
      id: 7,
      name: "Natural Food Preservative",
      image: "/images/chemical-supply.jpg",
      category: "Food and Food ingredient",
      specs: "Food grade certified",
      price: "Contact for quote",
      description: "Natural preservatives and additives for food manufacturing.",
      features: ["Natural origin", "Food safe", "Clean label", "Effective preservation"],
      applications: ["Bakery products", "Dairy items", "Beverages", "Meat preservation"],
      technicalData: "Natural origin | Shelf life: 24 months | Storage: Cool dry place",
    },
    {
      id: 8,
      name: "Emulsifier Complex for Beverages",
      image: "/images/blog-pharma.jpg",
      category: "Food and Food ingredient",
      specs: "Stabilizing agent",
      price: "Contact for quote",
      description: "Premium emulsifiers for stable beverage and food formulations.",
      features: ["Superior stability", "Homogeneous mixing", "Shelf stable", "Cost efficient"],
      applications: ["Carbonated drinks", "Juice concentrates", "Sports beverages", "Flavored milk"],
      technicalData: "HLB value: 12-15 | Particle size: < 2 microns",
    },
    {
      id: 9,
      name: "Food Grade Thickening Agent",
      image: "/images/food-ingredients.jpg",
      category: "Food and Food ingredient",
      specs: "All-natural source",
      price: "Contact for quote",
      description: "Natural thickening agents for soups, sauces, and beverages.",
      features: ["Clean label", "High viscosity", "Neutral taste", "Easy dispersion"],
      applications: ["Sauces and gravies", "Soups", "Desserts", "Dressings"],
      technicalData: "Viscosity: 500-2000 cP | pH stability: 3-9",
    },
  ],
  "Chemical": [
    {
      id: 101,
      name: "Industrial Chemical Solvent",
      image: "/images/chemical-supply.jpg",
      category: "Chemical",
      specs: "Lab and industrial use",
      price: "Contact for quote",
      description: "Pure chemical solvents for laboratory and industrial applications.",
      features: ["High purity", "Safe handling", "Proper labeling", "Bulk orders"],
      applications: ["Extraction processes", "Cleaning agents", "Chemical synthesis", "Paint thinners"],
      technicalData: "Various grades available | Custom specifications on request",
    },
    {
      id: 102,
      name: "Advanced Catalyst Material",
      image: "/images/pharma-materials.jpg",
      category: "Chemical",
      specs: "Reaction optimization",
      price: "Contact for quote",
      description: "Specialized catalysts for chemical reactions and industrial processes.",
      features: ["High efficiency", "Reusable", "Cost saving", "Proven results"],
      applications: ["Petrochemical refining", "Polymerization", "Hydrogenation", "Oxidation reactions"],
      technicalData: "Custom formulations | Surface area: 100-500 m²/g",
    },
    {
      id: 103,
      name: "Industrial Chemical Reagent",
      image: "/images/chemical-supply.jpg",
      category: "Chemical",
      specs: "Laboratory grade",
      price: "Contact for quote",
      description: "High-purity chemical reagents for industrial applications.",
      features: ["High purity", "Consistent quality", "Bulk availability", "Technical support"],
      applications: ["Quality control labs", "Research institutions", "Manufacturing QA", "Environmental testing"],
      technicalData: "Purity: > 99% | Available in various pack sizes",
    },
  ],
  "Agro-product": [
    {
      id: 13,
      name: "Premium Feed Additive Complex",
      image: "/images/blog-sustainable.jpg",
      category: "Agro-product",
      specs: "Customizable formulations",
      price: "Contact for quote",
      description: "Specialized feed additives to improve livestock health and productivity.",
      features: ["Custom blending", "Quality assured", "Cost effective", "Regulatory compliant"],
      applications: ["Poultry farming", "Cattle nutrition", "Aquaculture", "Swine production"],
      technicalData: "Custom formulations available | Complies with regional feed regulations",
    },
    {
      id: 14,
      name: "Growth Promoting Feed Mix",
      image: "/images/blog-market.jpg",
      category: "Agro-product",
      specs: "Tested for efficacy",
      price: "Contact for quote",
      description: "Scientifically formulated feed additives for optimal animal nutrition.",
      features: ["Performance tested", "Natural ingredients", "Bioavailable", "Shelf stable"],
      applications: ["Broiler growth", "Dairy enhancement", "Egg production", "Fish growth"],
      technicalData: "Bioavailability: > 90% | Shelf life: 18 months | GMP certified",
    },
  ],
  "Packaging": [
    {
      id: 16,
      name: "Biodegradable Polymer Compound",
      image: "/images/blog-partnership.jpg",
      category: "Packaging",
      specs: "Eco-friendly formulation",
      price: "Contact for quote",
      description: "Advanced biodegradable plastic materials for sustainable packaging.",
      features: ["Eco-friendly", "High strength", "Temperature resistant", "Recyclable"],
      applications: ["Compostable bags", "Food packaging", "Agricultural films", "Disposable items"],
      technicalData: "Biodegradation time: 6-12 months | Compostable certified",
    },
    {
      id: 17,
      name: "High-Performance Plastic Resin",
      image: "/images/blog-tech.jpg",
      category: "Packaging",
      specs: "Industrial grade",
      price: "Contact for quote",
      description: "Premium plastic resins for demanding industrial applications.",
      features: ["High durability", "Chemical resistant", "Easy processing", "Cost effective"],
      applications: ["Industrial containers", "Automotive parts", "Consumer goods", "Electronics"],
      technicalData: "Melt flow index: 5-50 g/10min | Density: 0.9-1.4 g/cm³",
    },
    {
      id: 18,
      name: "Flexible Film Material",
      image: "/images/packaging.jpg",
      category: "Packaging",
      specs: "Multi-layer capability",
      price: "Contact for quote",
      description: "Versatile flexible film materials for flexible packaging solutions.",
      features: ["Excellent flexibility", "Barrier properties", "Printable surface", "UV resistant"],
      applications: ["Pouch packaging", "Lamination", "Shrink wrap", "Protective covers"],
      technicalData: "Thickness range: 20-200 microns | Tensile strength: > 30 MPa",
    },
  ],
};

// Ordered exactly as they appear in the navigation dropdown
export const categories = [
  "Pharmaceutical and health care",
  "Personal and home care",
  "Food and Food ingredient",
  "Chemical",
  "Agro-product",
  "Packaging",
] as const;

export type CategoryKey = (typeof categories)[number];

// Maps the nav href slug → category key
// e.g. "pharmaceutical-health-care" → "Pharmaceutical and health care"
export const SLUG_TO_CATEGORY: Record<string, string> = {
  "pharmaceutical-health-care": "Pharmaceutical and health care",
  "personal-care-home-care": "Personal and home care",
  "food-food-ingredient": "Food and Food ingredient",
  "chemical": "Chemical",
  "agro-product": "Agro-product",
  "packaging": "Packaging",
};
