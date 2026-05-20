"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    src: "/images/hero1.png",
    alt: "Pharmaceutical materials and compounds",
    title: "Quality Products",
    subtitle: "Premium pharmaceutical and chemical supplies",
    position: "object-center", 
  },
  {
    src: "/images/hero2.png",
    alt: "Modern pharmaceutical laboratory",
    title: "Advanced Research",
    subtitle: "Cutting-edge pharmaceutical solutions",
    position: "object-[center_20%]", 
  },
  {
    src: "/images/hero3.png",
    alt: "Chemical supply chain solutions",
    title: "Reliable Supply Chain",
    subtitle: "Comprehensive logistics and warehousing services",
    position: "object-[center_15%]", 
  },
  {
    src: "/images/hero4.png",
    alt: "Distribution and logistics center",
    title: "Global Distribution",
    subtitle: "Efficient delivery across Southeast Asia",
    position: "object-[center_25%]", 
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.5]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    setAutoplay(false);
  };

  return (
<section
  ref={containerRef}
  className="relative w-full h-svh overflow-hidden lg:h-screen lg:min-h-[700px]"
>
      {/* Image Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
 <Image
  src={heroImages[currentIndex].src}
  alt={heroImages[currentIndex].alt}
  fill
  priority={currentIndex === 0}
  sizes="100vw"
  quality={90}
  // This is the fix:
  className="object-cover object-[center_top]" 
/>
        </motion.div>
      </AnimatePresence>

      {/* Blue overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0c1d3a]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/75 sm:from-black/20 sm:via-black/45 sm:to-black/65" />

      {/* Decorative centre line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.5%,rgba(255,255,255,0.04)_49.5%,rgba(255,255,255,0.04)_50.5%,transparent_50.5%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center sm:justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary-foreground/90">
              Your Trust Supply Chain Partner 
            </span>
          </motion.div>

          {/* <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="max-w-3xl font-bold leading-[1.08] tracking-tight text-white text-3xl sm:text-5xl lg:text-7xl"
          >
            Together <span className="text-primary">for</span>
            <br />
            better.
          </motion.h1> */}

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-4 max-w-lg text-sm text-white/90 sm:mt-6 sm:text-base lg:text-lg"
          >
            We deliver reliable supply chain solutions for industrial and specialty ingredients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <Link
              href="/products"
              className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:shadow-xl sm:px-6 sm:py-3.5"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition hover:bg-primary-foreground/10 sm:px-6 sm:py-3.5"
            >
              About Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 sm:bottom-8 sm:right-8 sm:gap-4">
        <div className="flex gap-1.5 sm:gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setAutoplay(false); }}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-5 bg-primary sm:w-6"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/20 sm:h-10 sm:w-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={handleNext}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/20 sm:h-10 sm:w-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-primary-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}