"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Pharmaceutical & Healthcare",
    image: "/images/pharma-materials.jpg",
    gradient: "from-blue-600/90 to-indigo-700/90",
    textColor: "text-white",
  },
  {
    title: "Chemical Products",
    image: "/images/chemical-supply.jpg",
    gradient: "from-teal-600/90 to-emerald-700/90",
    textColor: "text-white",
  },
  {
    title: "Food & Ingredients",
    image: "/images/food-ingredients.jpg",
    gradient: "from-amber-600/90 to-orange-700/90",
    textColor: "text-white",
  },
  {
    title: "Personal Care",
    image: "/images/cosmetic-care.jpg",
    gradient: "from-pink-600/90 to-rose-700/90",
    textColor: "text-white",
  },
  {
    title: "Agro-products",
    image: "/images/agro-product.jpg",
    gradient: "from-green-600/90 to-lime-700/90",
    textColor: "text-white",
  },
  {
    title: "Packaging",
    image: "/images/packaging.jpg",
    gradient: "from-purple-600/90 to-violet-700/90",
    textColor: "text-white",
  },
];

export function ProductCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleColor, setTitleColor] = useState("text-black");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setTimeout(() => {
            setTitleColor("text-blue-600");
          }, 500);
        } else {
          setTitleColor("text-black");
        }
      },
      {
        threshold: 0.3,
        rootMargin: "100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Setup parallax effect for images only
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;

      // Only apply parallax when section is in viewport
      if (sectionTop < windowHeight && sectionBottom > 0) {
        const cards = document.querySelectorAll('.parallax-card');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardTop = rect.top;
          const cardHeight = rect.height;

          // Calculate parallax effect
          const speed = 0.12; // Adjust this value to control parallax speed
          const yPos = -((cardTop * speed) / 2);

          // Apply transform only to the image container, not the whole card
          const imageContainer = card.querySelector('.parallax-image-container');
          if (imageContainer) {
            (imageContainer as HTMLElement).style.transform = `translateY(${yPos}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-secondary py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
            }`}
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Product groups
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className={`transition-colors duration-1000 delay-300 ${titleColor}`}>
                  Six categories
                </span>
                <br />
                <span className="text-foreground mt-2 block">
                  Personal care and Home care
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
                Comprehensive raw material solutions across diverse industries,
                backed by quality assurance and reliable supply chains.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:text-blue-800 hover:gap-3 hover:scale-105 md:flex group"
            >
              View all categories
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        <StaggerContainer
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              variants={staggerChildVariants}
              whileHover={{ y: -8 }}
              className="transition-all duration-500 parallax-card"
            >
              <Link
                href="/products"
                className="group block overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  {/* Image container with parallax effect */}
                  <div className="parallax-image-container absolute inset-0 transition-transform duration-100 ease-out">
                    <Image
                      src={cat.image || "/placeholder.svg"}
                      alt={cat.title}
                      fill
                      className="object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>

                  {/* Fixed overlays (stay in place, no parallax) */}
                  <div className="absolute inset-0">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500`}
                    />

                    {/* Top gradient for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                    {/* Semi-transparent overlay on hover */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />

                    {/* Fixed text container (no parallax) */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <div className="relative">
                        {/* Text background for better readability */}
                        <div className="absolute -inset-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <p className={`relative text-xl font-bold ${cat.textColor} drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-tight leading-tight`}>
                          {cat.title}
                        </p>
                      </div>
                    </div>

                    {/* Fixed hover indicator (no parallax) */}
                    <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-500 transform translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-white/30 group-hover:scale-110">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>

                    {/* Fixed shine effect (no parallax) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <div
          className={`mt-12 text-center bg-blue transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-blue-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg"
          >
            Explore all categories
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </Link>
          <p className="mt-6 text-sm text-muted-foreground font-medium">
            Over 500+ products across 6 categories
          </p>
        </div>
      </div>
    </section>
  );
}