"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories, Product, productData, SLUG_TO_CATEGORY } from "./products-data";

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Product Card — matches screenshot exactly ────────────────────────────────

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      variants={itemVariants}
      onClick={() => onSelect(product)}
      className="group bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image - fixed height remains the same */}
      <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content - flex column to push footer down */}
      <div className="p-4 sm:p-4 lg:p-5 flex flex-col flex-grow">
        {/* Title - can wrap but doesn't affect alignment */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
          {product.name}
        </h3>
        
        {/* Specs - can wrap */}
        <p className="mt-1 text-xs sm:text-sm text-gray-500">{product.specs}</p>

        {/* Spacer that pushes the View Details link to the bottom */}
        <div className="flex-grow" />

        {/* View Details link - now always at bottom */}
        <div className="mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            {t("products.viewDetails")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal — Simplified version (only image, title, and contact button) ──────

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleContactClick = () => {
    // You can replace this with your actual contact logic
    window.location.href = '/contact';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - X in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-105"
          aria-label="Close modal"
        >
          <X className="h-4 sm:h-5 w-4 sm:w-5 text-gray-700" />
        </button>

        {/* Hero image */}
        <div className="relative h-40 sm:h-48 lg:h-60 w-full bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>

        {/* Simplified Body - Only Title and Contact Button */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Category pill */}
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full border border-blue-100">
            {product.category}
          </span>

          {/* Title */}
          <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h2>

          {/* Price */}
          <p className="mt-2 text-sm sm:text-base font-semibold text-blue-600">{product.price}</p>

          {/* Divider */}
          <hr className="my-6 sm:my-8 border-gray-100" />

          {/* Contact Button */}
          <button
            onClick={handleContactClick}
            className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
          >
            <span>{t("products.contactForInfo")}</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* ===== DETAILED PRODUCT INFORMATION - TEMPORARILY COMMENTED OUT ===== */}
        {/* 
        <div className="p-4 sm:p-6 lg:p-8">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full border border-blue-100">
            {product.category}
          </span>

          <h2 className="mt-2 sm:mt-3 text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h2>

          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base font-semibold text-blue-600">{product.price}</p>

          <hr className="my-3 sm:my-4 lg:my-5 border-gray-100" />

          <div className="mb-4 sm:mb-5">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
              Specifications
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">{product.specs}</p>
          </div>

          <div className="mb-4 sm:mb-5">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
              Description
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
                Features
              </h3>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.applications && product.applications.length > 0 && (
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
                Applications
              </h3>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-2">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {app}
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.technicalData && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                Technical Data
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.technicalData}
              </p>
            </div>
          )}

          <hr className="mb-4 sm:mb-5 border-gray-100" />

          <div className="flex gap-2 sm:gap-3">
            <button
              className="flex-1 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-colors"
              onClick={onClose}
            >
              Request Quote
            </button>
            <button
              className="flex-1 py-2 sm:py-3 bg-white hover:bg-gray-50 text-gray-900 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl border border-gray-200 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        */}
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductsNewContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Create a ref for the products section
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // Resolve category from URL ?category= param
  useEffect(() => {
    if (!categoryParam) return;

    // Try slug map first (e.g. "pharmaceutical-health-care")
    const fromSlug = SLUG_TO_CATEGORY[categoryParam];
    if (fromSlug && (categories as readonly string[]).includes(fromSlug)) {
      setSelectedCategory(fromSlug);
      return;
    }

    // Fallback: loose case-insensitive match
    const normalized = categoryParam.replace(/-/g, " ").toLowerCase();
    const match = (categories as readonly string[]).find(
      (c) => c.toLowerCase() === normalized
    );
    if (match) setSelectedCategory(match);
  }, [categoryParam]);

  // Scroll to products section when category changes (including initial load)
  useEffect(() => {
    if (categoryParam && productsSectionRef.current) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        productsSectionRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    }
  }, [categoryParam, selectedCategory]);

  const currentProducts = productData[selectedCategory] ?? [];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const slug =
      Object.entries(SLUG_TO_CATEGORY).find(([, v]) => v === category)?.[0] ?? "";
    router.push(`/products?category=${slug}`, { scroll: false });
  };

  return (
    <>
      <section className="bg-white py-12 sm:py-16 lg:py-20 min-h-screen">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-start lg:items-stretch">

            {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full lg:w-56 xl:w-64 flex-shrink-0"
            >
              <div className="lg:sticky lg:top-24">
                {/* "PRODUCTS" header — solid blue, matches screenshot */}
                <div className="bg-blue-600 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-t-lg">
                  <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                    {t("navigation.products")}
                  </h2>
                </div>

                {/* Category list */}
                <div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden bg-white max-h-96 sm:max-h-none overflow-y-auto sm:overflow-y-visible">
                  {(categories as readonly string[]).map((category, index) => {
                    const isSelected = selectedCategory === category;
                    const isLast = index === (categories as readonly string[]).length - 1;

                    return (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 transition-colors duration-150 text-xs sm:text-sm ${
                          !isLast ? "border-b border-gray-100" : ""
                        } ${
                          isSelected
                            ? "bg-blue-50 text-blue-600"
                            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className={isSelected ? "font-semibold" : "font-normal"}>
                          {category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>

            {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
            <div className="flex-1 w-full" ref={productsSectionRef}>
              {/* Category heading */}
              <motion.div
                key={selectedCategory + "-hd"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="mb-6 sm:mb-8"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  {selectedCategory}
                </h1>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                  {currentProducts.length}{" "}
                  {currentProducts.length !== 1
                    ? t("products.availablePlural")
                    : t("products.available")}
                </p>
              </motion.div>

              {/* Products grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}