"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

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
    },
  ],
  "Agro-product": [
    {
      id: 3,
      name: "Premium Feed Additive Complex",
      image: "/images/blog-sustainable.jpg",
      category: "Agro-product",
      specs: "Customizable formulations",
      price: "Contact for quote",
      description: "Specialized feed additives to improve livestock health and productivity.",
      features: ["Custom blending", "Quality assured", "Cost effective", "Regulatory compliant"],
    },
    {
      id: 4,
      name: "Growth Promoting Feed Mix",
      image: "/images/blog-market.jpg",
      category: "Agro-product",
      specs: "Tested for efficacy",
      price: "Contact for quote",
      description: "Scientifically formulated feed additives for optimal animal nutrition.",
      features: ["Performance tested", "Natural ingredients", "Bioavailable", "Shelf stable"],
    },
  ],
  "Packaging": [
    {
      id: 5,
      name: "Biodegradable Polymer Compound",
      image: "/images/blog-partnership.jpg",
      category: "PLASTIC MATERIALS",
      specs: "Eco-friendly formulation",
      price: "Contact for quote",
      description: "Advanced biodegradable plastic materials for sustainable packaging.",
      features: ["Eco-friendly", "High strength", "Temperature resistant", "Recyclable"],
    },
    {
      id: 6,
      name: "High-Performance Plastic Resin",
      image: "/images/blog-tech.jpg",
      category: "PLASTIC MATERIALS",
      specs: "Industrial grade",
      price: "Contact for quote",
      description: "Premium plastic resins for demanding industrial applications.",
      features: ["High durability", "Chemical resistant", "Easy processing", "Cost effective"],
    },
  ],
  "CHEMICAL MATERIALS": [
    {
      id: 7,
      name: "Industrial Chemical Solvent",
      image: "/images/hero-lab.jpg",
      category: "CHEMICAL MATERIALS",
      specs: "Lab and industrial use",
      price: "Contact for quote",
      description: "Pure chemical solvents for laboratory and industrial applications.",
      features: ["High purity", "Safe handling", "Proper labeling", "Bulk orders"],
    },
    {
      id: 8,
      name: "Advanced Catalyst Material",
      image: "/images/pharma-materials.jpg",
      category: "CHEMICAL MATERIALS",
      specs: "Reaction optimization",
      price: "Contact for quote",
      description: "Specialized catalysts for chemical reactions and industrial processes.",
      features: ["High efficiency", "Reusable", "Cost saving", "Proven results"],
    },
  ],
  "FOOD ADDITIVES": [
    {
      id: 9,
      name: "Natural Food Preservative",
      image: "/images/chemical-supply.jpg",
      category: "FOOD ADDITIVES",
      specs: "Food grade certified",
      price: "Contact for quote",
      description: "Natural preservatives and additives for food manufacturing.",
      features: ["Natural origin", "Food safe", "Clean label", "Effective preservation"],
    },
    {
      id: 10,
      name: "Emulsifier Complex for Beverages",
      image: "/images/blog-pharma.jpg",
      category: "FOOD ADDITIVES",
      specs: "Stabilizing agent",
      price: "Contact for quote",
      description: "Premium emulsifiers for stable beverage and food formulations.",
      features: ["Superior stability", "Homogeneous mixing", "Shelf stable", "Cost efficient"],
    },
  ],
  "SODIUM HYDROXIDE": [
    {
      id: 11,
      name: "Pharmaceutical Grade Sodium Hydroxide",
      image: "/images/blog-compliance.jpg",
      category: "SODIUM HYDROXIDE",
      specs: "USP/BP certified",
      price: "Contact for quote",
      description: "Pure sodium hydroxide for pharmaceutical and laboratory use.",
      features: ["USP certified", "High purity", "Safe packaging", "Bulk availability"],
    },
    {
      id: 12,
      name: "Industrial Sodium Hydroxide Solution",
      image: "/images/blog-sustainable.jpg",
      category: "SODIUM HYDROXIDE",
      specs: "50% liquid solution",
      price: "Contact for quote",
      description: "Industrial strength sodium hydroxide for manufacturing processes.",
      features: ["Ready to use", "Consistent strength", "Large containers", "Economical"],
    },
  ],
  "EDTA SERIES": [
    {
      id: 13,
      name: "EDTA Disodium",
      image: "/images/blog-market.jpg",
      category: "EDTA SERIES",
      specs: "Chelating agent",
      price: "Contact for quote",
      description: "Chelating agent for pharmaceutical and cosmetic applications.",
      features: ["Stable complex formation", "Wide compatibility", "pH flexible", "Proven efficacy"],
    },
    {
      id: 14,
      name: "EDTA Tetrasodium",
      image: "/images/blog-partnership.jpg",
      category: "EDTA SERIES",
      specs: "Advanced chelation",
      price: "Contact for quote",
      description: "Superior chelating complex for advanced pharmaceutical formulations.",
      features: ["Rapid chelation", "High stability", "Enhanced solubility", "Premium grade"],
    },
  ],
  "SPECIALTY MATERIALS": [
    {
      id: 15,
      name: "Hafnium Oxide Powder",
      image: "/images/blog-tech.jpg",
      category: "SPECIALTY MATERIALS",
      specs: "High purity grade",
      price: "Contact for quote",
      description: "Premium hafnium oxide for advanced material applications.",
      features: ["99.9% purity", "Fine powder", "Stable suspension", "Custom sizing"],
    },
    {
      id: 16,
      name: "Scandium Trichloride Solution",
      image: "/images/hero-lab.jpg",
      category: "SPECIALTY MATERIALS",
      specs: "Concentrated solution",
      price: "Contact for quote",
      description: "Specialty chemical for advanced synthesis and research.",
      features: ["Lab grade", "Precisely measured", "Sealed storage", "Documentation included"],
    },
    {
      id: 17,
      name: "Boron Nitride Powder",
      image: "/images/pharma-materials.jpg",
      category: "SPECIALTY MATERIALS",
      specs: "Hexagonal form",
      price: "Contact for quote",
      description: "Boron nitride for thermal and mechanical applications.",
      features: ["High thermal conductivity", "Electrically insulating", "Chemical inert", "Fine particle size"],
    },
  ],
};

const categories = Object.keys(productData);

export function ProductsNewContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [expandedCategory, setExpandedCategory] = useState<string>(
    categories[0]
  );

  // Set selected category from URL param
  useEffect(() => {
    if (categoryParam) {
      const formattedCategory = categoryParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
        setExpandedCategory(formattedCategory);
      }
    }
  }, [categoryParam]);

  const currentProducts = productData[selectedCategory as keyof typeof productData] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      {/* Products Section */}
      <section className="bg-background py-12 sm:py-16 lg:py-20 min-h-screen">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar - Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="sticky top-20 sm:top-24 space-y-2">
                {/* Header */}
                <div className="bg-primary px-4 py-3 rounded-lg mb-4">
                  <h2 className="text-lg font-bold text-primary-foreground uppercase tracking-wide">
                    Products
                  </h2>
                </div>

                {/* Categories List */}
                <div className="space-y-1 bg-card rounded-lg border border-border overflow-hidden">
                  {categories.map((category, index) => {
                    const isSelected = selectedCategory === category;
                    const hasSubcategories =
                      category === "PLASTIC MATERIALS" ||
                      category === "CHEMICAL MATERIALS" ||
                      category === "FOOD ADDITIVES";

                    return (
                      <div key={category}>
                        <button
                          onClick={() => {
                            setSelectedCategory(category);
                            setExpandedCategory(
                              expandedCategory === category ? "" : category
                            );
                          }}
                          className={`w-full text-left px-4 py-3 border-b border-border transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-primary/10 text-primary font-semibold"
                              : "bg-white hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="text-sm font-medium">{category}</span>
                          {hasSubcategories && (
                            <motion.div
                              animate={{
                                rotate: expandedCategory === category ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          )}
                        </button>

                        {/* Subcategories */}
                        <AnimatePresence>
                          {hasSubcategories &&
                            expandedCategory === category && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-muted/50 border-b border-border"
                              >
                                <button
                                  className="w-full text-left px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={() => setSelectedCategory(category)}
                                >
                                  View all
                                </button>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Main Content - Products Grid */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {selectedCategory}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {currentProducts.length} products available
                </p>
              </div>

              {/* Products Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {currentProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    variants={itemVariants}
                    onClick={() => setSelectedProduct(product)}
                    className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-40 bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-left">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 text-left">
                        {product.specs}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        View Details →
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Content */}
              <div>
                {/* Image */}
                <div className="relative h-80 w-full bg-muted overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-3">
                      {selectedProduct.category}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {selectedProduct.name}
                    </h1>
                    <p className="mt-2 text-lg font-semibold text-primary">
                      {selectedProduct.price}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Specifications
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedProduct.specs}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="/contact"
                      className="flex-1 rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition hover:shadow-lg"
                    >
                      Request Quote
                    </a>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-semibold text-foreground transition hover:bg-muted"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
