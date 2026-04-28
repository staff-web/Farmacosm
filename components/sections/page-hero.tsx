"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeroProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  description?: string;
}

export function PageHero({ imageSrc, title, subtitle, description }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.75]);

  return (
    <section
      ref={containerRef}
      className="relative h-96 overflow-hidden md:h-[500px] lg:h-[600px]"
      style={{ position: "relative" }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Blue tinted overlay with blur effect */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0c1d3a]"
      />

      {/* Additional gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      {/* Decorative line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.5%,rgba(255,255,255,0.03)_49.5%,rgba(255,255,255,0.03)_50.5%,transparent_50.5%)]" />

      {/* Content */}
      <motion.div className="relative z-10 flex h-full flex-col justify-center pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {subtitle}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
