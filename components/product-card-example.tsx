'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

/**
 * Example: Updated ProductCard Component with Translation Support
 * 
 * Shows how to integrate translations into existing product components.
 * Apply similar patterns to ProductsNew, ProductModal, etc.
 */

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCardWithTranslation({ product, onViewDetails }: ProductCardProps) {
  const { t, language } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3">
        {/* Category */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className={`text-lg sm:text-xl font-bold line-clamp-2 ${
          language === 'km' ? 'font-battambang' : ''
        }`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-sm text-gray-600 line-clamp-2 ${
          language === 'km' ? 'font-battambang' : ''
        }`}>
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <span className="text-xs text-gray-500">
            {t('products.price', 'Price')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails?.(product)}
            className="px-3 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
          >
            {t('products.viewDetails', 'View Details')}
          </button>
          <button className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium">
            {t('products.addToCart', 'Add to Cart')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Example: Product Filter with Translation
 */
export function ProductFilterWithTranslation({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-bold ${language === 'km' ? 'font-battambang' : ''}`}>
        {t('products.filterByCategory', 'Filter by Category')}
      </h3>

      <div className="space-y-2">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {t('products.allCategories', 'All Categories')}
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Example: Product Modal with Translation
 */
export function ProductModalWithTranslation({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t, language } = useLanguage();

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className={`text-2xl font-bold ${language === 'km' ? 'font-battambang' : ''}`}>
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">
                {t('products.filterByCategory', 'Category')}
              </p>
              <p className={`text-lg font-bold ${language === 'km' ? 'font-battambang' : ''}`}>
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">
                {t('products.price', 'Price')}
              </p>
              <p className="text-3xl font-bold text-primary">
                ${product.price}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Description
              </p>
              <p className={`text-gray-700 leading-relaxed ${
                language === 'km' ? 'font-battambang' : ''
              }`}>
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              {t('products.addToCart', 'Add to Cart')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
