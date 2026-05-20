"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const productData = {
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
  "Chemical": [
    {
      id: 4,
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
      id: 5,
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
      id: 6,
      name: "Industrial Sodium Hydroxide Solution",
      image: "/images/blog-market.jpg",
      category: "Chemical",
      specs: "50% liquid solution",
      price: "Contact for quote",
      description: "Industrial strength sodium hydroxide for manufacturing processes.",
      features: ["Ready to use", "Consistent strength", "Large containers", "Economical"],
      applications: ["Paper manufacturing", "Textile processing", "Water treatment", "Metal cleaning"],
      technicalData: "Concentration: 50% ± 1% | Iron content: < 10 ppm",
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
      applications: ["Poultry feed", "Cattle nutrition", "Swine farming", "Aquaculture"],
      technicalData: "Custom formulations | GMP certified | Traceable ingredients",
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
      applications: ["Growth enhancement", "Feed efficiency", "Immune support", "Digestive health"],
      technicalData: "Dosage: 1-2 kg/ton feed | Available in 25kg bags",
    },
    {
      id: 15,
      name: "Soil Enhancement Nutrient Package",
      image: "/images/agro-product.jpg",
      category: "Agro-product",
      specs: "Enriched micronutrients",
      price: "Contact for quote",
      description: "Complete nutrient solution for soil enrichment and crop optimization.",
      features: ["Balanced formulation", "Easy application", "Rapid absorption", "Yield improving"],
      applications: ["Crop fertilization", "Soil remediation", "Organic farming", "Hydroponics"],
      technicalData: "NPK ratio customizable | Micronutrients included | Water soluble",
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

interface ProductsCategoryContentProps {
  category: string;
}

export function ProductsCategoryContent({ category }: ProductsCategoryContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Map slug to actual category key - MATCHING NAVIGATION MENU
  const slugToCategoryMap: { [key: string]: string } = {
    "pharmaceutical-health-care": "Pharmaceutical and health care",
    "personal-care-home-care": "Personal and home care",
    "food-food-ingredient": "Food and Food ingredient",
    "chemical": "Chemical",
    "agro-product": "Agro-product",
    "packaging": "Packaging",
  };

  // Get the category key from the slug
  const categoryKey = slugToCategoryMap[category?.toLowerCase().trim() ?? ""];
  
  // Get products for this category
  const products = categoryKey && productData[categoryKey as keyof typeof productData] 
    ? [...productData[categoryKey as keyof typeof productData]] 
    : [];

  // Handle product click for detail view
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Color schemes for product cards
  const getColorScheme = (id: number) => {
    const colors = [
      { bg: "from-blue-50 to-blue-100/50", accent: "text-blue-600", bar: "from-blue-500 to-blue-400", hover: "hover:shadow-blue-500/20" },
      { bg: "from-emerald-50 to-emerald-100/50", accent: "text-emerald-600", bar: "from-emerald-500 to-emerald-400", hover: "hover:shadow-emerald-500/20" },
      { bg: "from-purple-50 to-purple-100/50", accent: "text-purple-600", bar: "from-purple-500 to-purple-400", hover: "hover:shadow-purple-500/20" },
      { bg: "from-amber-50 to-amber-100/50", accent: "text-amber-600", bar: "from-amber-500 to-amber-400", hover: "hover:shadow-amber-500/20" },
      { bg: "from-rose-50 to-rose-100/50", accent: "text-rose-600", bar: "from-rose-500 to-rose-400", hover: "hover:shadow-rose-500/20" },
      { bg: "from-cyan-50 to-cyan-100/50", accent: "text-cyan-600", bar: "from-cyan-500 to-cyan-400", hover: "hover:shadow-cyan-500/20" },
    ];
    return colors[id % colors.length];
  };

  if (!categoryKey) {
    return (
      <section className="bg-background py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold">Category Not Found</h2>
          <p className="text-muted-foreground mt-2">The category "{category}" does not exist.</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="bg-background py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">No products available in this category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-12 sm:py-20 lg:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const color = getColorScheme(product.id);
            
            return (
              <div
                key={`${product.id}-${categoryKey}`}
                onClick={() => handleProductClick(product)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg transition-all duration-500 hover:shadow-2xl ${color.hover} cursor-pointer`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r ${color.bar} transition-all duration-500 group-hover:w-full`} />

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/40" />
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-7">
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${color.accent} group-hover:opacity-100`}>
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mt-5 space-y-2">
                    {product.features.slice(0, 3).map((feature: string) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-foreground/70 transition-all duration-300 group-hover:translate-x-1"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150 ${color.accent.replace("text-", "bg-")}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* View Details Button */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <button className={`text-sm font-semibold ${color.accent} hover:opacity-80 transition-opacity flex items-center gap-1`}>
                      View Details <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </button>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color.bar} transition-all duration-500 group-hover:w-full`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Product Image */}
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-white/90">{selectedProduct.specs}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="bg-muted/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {selectedProduct.technicalData || "Contact us for detailed technical specifications"}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProduct.applications || ["Pharmaceutical Manufacturing", "Industrial Processing", "Research & Development"]).map((app: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="text-2xl font-bold text-primary">{selectedProduct.price}</p>
                        </div>
                        <button
                          onClick={closeModal}
                          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}