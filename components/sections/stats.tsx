"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  SlideInLeft,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";

/* ---------------- COUNT UP ---------------- */
function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
    } else {
      motionValue.set(0);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ---------------- DATA ---------------- */
const stats = [
  { value: 50,  suffix: "+", label: "Partner Companies" },
  { value: 100, suffix: "+", label: "Products Supplied" },
  { value: 6,               label: "Product Categories" },
  { value: 99,  suffix: "%", label: "Client Satisfaction" },
];

/* ---------------- SECTION ---------------- */
export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a1628] py-16 sm:py-24 lg:py-32"
    >
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image
          src="/images/team-collaboration.jpg"
          alt="Team collaboration"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Left content */}
          <SlideInLeft>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
              Our impact
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl xl:text-5xl">
              Trusted across Southeast Asia.
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-primary-foreground/60 max-w-md">
              We serve pharmaceutical, chemical, food, and personal care
              manufacturers with reliable sourcing, competitive pricing, and
              dedicated support.
            </p>
          </SlideInLeft>

          {/* Stats grid */}
          <StaggerContainer
            className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6"
            staggerDelay={0.12}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerChildVariants}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 sm:p-5 lg:p-6 backdrop-blur-sm"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tabular-nums">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-primary-foreground/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>

        </div>
      </div>
    </section>
  );
}