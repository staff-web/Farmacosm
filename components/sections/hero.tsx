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
import { useLanguage } from "@/contexts/LanguageContext";

const heroImagesData = [
  {
    src: "/images/hero1.png",
    alt: "Pharmaceutical materials and compounds",
    titleKey: "home.hero.slide1Title",
    subtitleKey: "home.hero.slide1Subtitle",
    mobileOffset: "0%",
    blur: false,
  },
  {
    src: "/images/hero2.png",
    alt: "Modern pharmaceutical laboratory",
    titleKey: "home.hero.slide2Title",
    subtitleKey: "home.hero.slide2Subtitle",
    mobileOffset: "0%",
    blur: false,
  },
  {
    src: "/images/hero3.png",
    alt: "Chemical supply chain solutions",
    titleKey: "home.hero.slide3Title",
    subtitleKey: "home.hero.slide3Subtitle",
    mobileOffset: "0%",
    blur: true, // This image will have a blur effect on desktop only
  },
  {
    src: "/images/hero4.png",
    alt: "Distribution and logistics center",
    titleKey: "home.hero.slide4Title",
    subtitleKey: "home.hero.slide4Subtitle",
    mobileOffset: "0%",
    blur: false,
  },
];

export function Hero() {
  const { t, language } = useLanguage();
  console.log('🎬 Hero component rendered with language:', language);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2], [0.1, 0.25]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImagesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImagesData.length) % heroImagesData.length);
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImagesData.length);
    setAutoplay(false);
  };

  const currentSlide = heroImagesData[currentIndex];

  // Determine if blur should be applied: only for third image (index 2) on desktop
  const shouldApplyBlur = currentSlide.blur && !isMobile;

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
          <div className="relative w-full h-full">
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-[center_top]"
            />

            {/* Conditional blur overlay - only on desktop for third image */}
            {shouldApplyBlur && (
              <div
                className="absolute inset-0"
                style={{
                  maskImage: "linear-gradient(to right, transparent 70%, black 85%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 70%, black 85%, black 100%)",
                }}
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  className="object-cover object-[center_top]"
                  style={{
                    filter: "blur(5px)",
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Blue overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0c1d3a]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-black/5 sm:from-black/5 sm:via-black/5 sm:to-black/5" />

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
              {(() => {
                const badge = t("home.hero.badge");
                console.log('🎨 Rendering badge:', badge);
                return badge;
              })()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-4 max-w-lg text-sm font-semibold text-white sm:mt-6 sm:text-base lg:text-lg"
          >
            {t("home.hero.tagline")}
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
              {t("home.hero.exploreProducts")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition hover:bg-primary-foreground/10 sm:px-6 sm:py-3.5"
            >
              {t("home.hero.aboutUs")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 sm:bottom-8 sm:right-8 sm:gap-4">
        <div className="flex gap-1.5 sm:gap-2">
          {heroImagesData.map((_, index) => (
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