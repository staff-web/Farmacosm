"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import {
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";
import { useEffect, useRef, useState } from "react";

export function ProductCategories() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    {
      title: t("products.categories.pharma"),
      slug: "pharmaceutical-health-care",
      image: "/images/pharma-materials.jpg",
      gradient: "from-blue-600/90 to-indigo-700/90",
    },
    {
      title: t("products.categories.personalCare"),
      slug: "personal-care-home-care",
      image: "/images/PersonalCare.png",
      gradient: "from-pink-600/90 to-rose-700/90",
    },
    {
      title: t("products.categories.food"),
      slug: "food-food-ingredient",
      image: "/images/food-ingredients.jpg",
      gradient: "from-amber-600/90 to-orange-700/90",
    },
    {
      title: t("products.categories.chemical"),
      slug: "chemical",
      image: "/images/chemical-supply.jpg",
      gradient: "from-teal-600/90 to-emerald-700/90",
    },
    {
      title: t("products.categories.agro"),
      slug: "agro-product",
      image: "/images/agro-product.jpg",
      gradient: "from-green-600/90 to-lime-700/90",
    },
    {
      title: t("products.categories.packaging"),
      slug: "packaging",
      image: "/images/packaging.jpg",
      gradient: "from-purple-600/90 to-violet-700/90",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, bottom } = sectionRef.current.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        document.querySelectorAll(".parallax-card").forEach((card) => {
          const cardTop = card.getBoundingClientRect().top;
          const yPos = -((cardTop * 0.12) / 2);
          const img = card.querySelector(
            ".parallax-image-container"
          ) as HTMLElement;
          if (img) img.style.transform = `translateY(${yPos}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary py-16 sm:py-24 lg:py-32"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                {t("products.productGroups")}
              </p>
              <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl xl:text-5xl">
                {t("products.oneTrustedSource")}
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl">
                {t("products.trustedDesc")}
              </p>
            </div>
            {/* Desktop-only link */}
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 shrink-0 text-sm font-semibold text-primary transition-all hover:opacity-70 hover:gap-3 group"
            >
              {t("products.viewAll")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          staggerDelay={0.08}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={staggerChildVariants}
              whileHover={{ y: -6 }}
              className="parallax-card transition-all duration-500"
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <div className="parallax-image-container absolute inset-0 transition-transform duration-100 ease-out">
                    <Image
                      src={cat.image || "/placeholder.svg"}
                      alt={cat.title}
                      fill
                      className="object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                      <div className="relative">
                        <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="relative text-base sm:text-lg lg:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
                          {cat.title}
                        </p>
                      </div>
                    </div>

                    <div className="absolute right-3 top-3 sm:right-5 sm:top-5 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-white/30 group-hover:scale-110">
                      <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <div
          className={`mt-10 sm:mt-12 text-center transition-all duration-1000 delay-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 sm:gap-3 px-7 sm:px-10 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg"
          >
            {t("products.exploreAll")}
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground font-medium">
            {t("products.productCount")}
          </p>
        </div>

      </div>
    </section>
  );
}