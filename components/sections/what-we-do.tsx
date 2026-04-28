"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Handshake,
  Package,
  FlaskConical,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import {
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";

/* ---------------- SERVICES ---------------- */

const services = [
  
  {
    icon: Package,
    title: "Supply Chain",
    description:
      "Comprehensive supply of raw materials, equipment, and packaging solutions for the pharmaceutical, chemical, food, cosmetic, home care, and personal care industries",
  },
  {
    icon: FlaskConical,
    title: "Product Development",
    description:
      "OEM/ODM and R&D service to bring your product concept to market with expert formulation.",
  },
  {
    icon: TrendingUp,
    title: "Sales Extension",
    description:
      "Strategic market expansion support to grow your reach and strengthen distribution channels. ",
  },
];

/* ---------------- COUNT UP COMPONENT ---------------- */

function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: "-50px" }); // 👈 triggers earlier

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.6,
        ease: "easeOut",
      });
    } else {
      // 🔁 reset when leaving viewport
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


/* ---------------- MAIN SECTION ---------------- */

export function WhatWeDo() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-primary" />
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                WE OFFER
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                End-to-end supply chain solutions
              </h2>

              <p className="mt-6 text-lg text-muted-foreground">
                From sourcing raw materials to regulatory guidance, we cover every link in your supply chain.
              </p>

            <div className="pt-6 flex justify-start">
  <button className="group inline-flex items-start gap-2 text-primary font-semibold transition-all pl-4 border-l-4 border-primary text-left">
    From raw materials to regulatory guidance, we cover every link in your supply chain.
    <ChevronRight className="h-10 w-10 transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
  </button>
</div>
            </motion.div>
          </div>

        {/* SERVICES */}
<div className="lg:col-span-8">
  <StaggerContainer
    className="flex flex-col gap-6"
    staggerDelay={0.1}
  >
    {services.map((service, idx) => {
      const Icon = service.icon;
      return (
        <motion.div
          key={service.title}
          variants={staggerChildVariants}
          className="group w-full"
        >
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8 p-6 md:p-8 bg-white border-l-4 border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-md">
            
            {/* Number and Icon section */}
            <div className="flex items-center gap-4 md:w-48">
              <span className="text-3xl font-bold text-gray-300 group-hover:text-primary transition-colors duration-300">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="h-12 w-px bg-gray-200 group-hover:bg-primary transition-colors duration-300" />
              <Icon className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors duration-300" />
            </div>

            {/* Content section */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="md:w-12 flex justify-end">
              <motion.div 
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="text-gray-400 group-hover:text-primary transition-colors duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      );
    })}
  </StaggerContainer>



            {/* STATS
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="rounded-xl border p-8 bg-background">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      <CountUp value={500} suffix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground">Clients Served</p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      <CountUp value={98} suffix="%" />
                    </div>
                    <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      24/7
                    </div>
                    <p className="text-sm text-muted-foreground">Support</p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      <CountUp value={100} suffix="+" />
                    </div>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </div>

                </div>
              </div>
            </motion.div> */}

          </div>
        </div>
      </div>
    </section>
  );
}
