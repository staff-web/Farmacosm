"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";

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
      category: "Packaging",
      specs: "Eco-friendly formulation",
      price: "Contact for quote",
      description: "Advanced biodegradable plastic materials for sustainable packaging.",
      features: ["Eco-friendly", "High strength", "Temperature resistant", "Recyclable"],
    },
    {
      id: 6,
      name: "High-Performance Plastic Resin",
      image: "/images/blog-tech.jpg",
      category: "Packaging",
      specs: "Industrial grade",
      price: "Contact for quote",
      description: "Premium plastic resins for demanding industrial applications.",
      features: ["High durability", "Chemical resistant", "Easy processing", "Cost effective"],
    },
  ],
  "Chemical": [
    {
      id: 7,
      name: "Industrial Chemical Solvent",
      image: "/images/hero-lab.jpg",
      category: "Chemical",
      specs: "Lab and industrial use",
      price: "Contact for quote",
      description: "Pure chemical solvents for laboratory and industrial applications.",
      features: ["High purity", "Safe handling", "Proper labeling", "Bulk orders"],
    },
    {
      id: 8,
      name: "Advanced Catalyst Material",
      image: "/images/pharma-materials.jpg",
      category: "Chemical",
      specs: "Reaction optimization",
      price: "Contact for quote",
      description: "Specialized catalysts for chemical reactions and industrial processes.",
      features: ["High efficiency", "Reusable", "Cost saving", "Proven results"],
    },
  ],
  "Food and Food ingredient": [
    {
      id: 9,
      name: "Natural Food Preservative",
      image: "/images/chemical-supply.jpg",
      category: "Food and Food ingredient",
      specs: "Food grade certified",
      price: "Contact for quote",
      description: "Natural preservatives and additives for food manufacturing.",
      features: ["Natural origin", "Food safe", "Clean label", "Effective preservation"],
    },
    {
      id: 10,
      name: "Emulsifier Complex for Beverages",
      image: "/images/blog-pharma.jpg",
      category: "Food and Food ingredient",
      specs: "Stabilizing agent",
      price: "Contact for quote",
      description: "Premium emulsifiers for stable beverage and food formulations.",
      features: ["Superior stability", "Homogeneous mixing", "Shelf stable", "Cost efficient"],
    },
  ],
  "Personal care and home care": [
    {
      id: 11,
      name: "Pharmaceutical Grade Sodium Hydroxide",
      image: "/images/blog-compliance.jpg",
      category: "Personal care and home care",
      specs: "USP/BP certified",
      price: "Contact for quote",
      description: "Pure sodium hydroxide for pharmaceutical and laboratory use.",
      features: ["USP certified", "High purity", "Safe packaging", "Bulk availability"],
    },
    {
      id: 12,
      name: "Industrial Sodium Hydroxide Solution",
      image: "/images/blog-sustainable.jpg",
      category: "Personal care and home care",
      specs: "50% liquid solution",
      price: "Contact for quote",
      description: "Industrial strength sodium hydroxide for manufacturing processes.",
      features: ["Ready to use", "Consistent strength", "Large containers", "Economical"],
    },
  ],
};

interface ProductsCategoryContentProps {
  category: string;
}

export function ProductsCategoryContent({ category }: ProductsCategoryContentProps) {
  const normalizedCategory = category?.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') ?? "";
  const categoryKey = Object.keys(productData).find(
    (key) => key.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === normalizedCategory
  );
  const products = categoryKey ? productData[categoryKey as keyof typeof productData] : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-background py-12 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => {
            const colors = [
              { bg: "from-blue-50 to-blue-100/50", accent: "text-blue-600", bar: "from-blue-500 to-blue-400" },
              { bg: "from-emerald-50 to-emerald-100/50", accent: "text-emerald-600", bar: "from-emerald-500 to-emerald-400" },
              { bg: "from-purple-50 to-purple-100/50", accent: "text-purple-600", bar: "from-purple-500 to-purple-400" },
              { bg: "from-amber-50 to-amber-100/50", accent: "text-amber-600", bar: "from-amber-500 to-amber-400" },
              { bg: "from-rose-50 to-rose-100/50", accent: "text-rose-600", bar: "from-rose-500 to-rose-400" },
              { bg: "from-cyan-50 to-cyan-100/50", accent: "text-cyan-600", bar: "from-cyan-500 to-cyan-400" },
            ];
            const color = colors[product.id % colors.length];

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20`}
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
                  <motion.h3
                    className={`text-xl font-bold transition-colors duration-300 ${color.accent} group-hover:opacity-100`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    {product.name}
                  </motion.h3>

                  <motion.p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    {product.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    className="mt-5 space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {product.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className={`flex items-center gap-2.5 text-sm text-foreground/70 transition-all duration-300 group-hover:${color.accent} group-hover:translate-x-1`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150 ${color.accent.replace("text-", "bg-")}`} />
                        {feature}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color.bar} transition-all duration-500 group-hover:w-full`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}