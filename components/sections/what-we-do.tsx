"use client";

import { motion } from "framer-motion";
import { Package, FlaskConical, TrendingUp, ChevronRight } from "lucide-react";
import {
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";
import { useLanguage } from "@/contexts/LanguageContext";

const servicesData = [
  {
    icon: Package,
    titleKey: "services.supplyChain.title",
    descriptionKey: "services.supplyChain.description",
  },
  {
    icon: FlaskConical,
    titleKey: "services.productDev.title",
    descriptionKey: "services.productDev.description",
  },
];

export function WhatWeDo() {
  const { t } = useLanguage();

  return (
    <section className="bg-card py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-stretch">

          {/* LEFT — label + heading + description */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <div className="h-0.5 w-8 bg-primary" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                  {t("home.whatWeDo.label") || "We Offer"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl xl:text-5xl">
                {t("home.whatWeDo.title") || "End-to-end supply chain solutions"}
              </h2>

              <p className="mt-3 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("home.whatWeDo.description") || "From sourcing raw materials to regulatory guidance, we cover every link in your supply chain."}
              </p>
              
              <div className="pt-6 flex justify-start">
                <div className="group inline-flex items-start gap-2 text-primary font-semibold pl-4 border-l-4 border-primary text-left">
                  Explore how we optimize every link in your business operations.
                  {/* <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1" /> */}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — service cards */}
          <div className="lg:col-span-8 flex flex-col">
            <StaggerContainer 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 h-full" 
              staggerDelay={0.1}
            >
              {servicesData.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={staggerChildVariants}
                    className="group h-full flex"
                  >
                    <div className="relative flex flex-col w-full p-6 lg:p-12 bg-background border-l-4 border-border hover:border-primary transition-all duration-300 hover:shadow-md rounded-r-xl cursor-default">

                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <span className="text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <div className="h-8 w-px bg-border group-hover:bg-primary transition-colors duration-300" />
                          <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg lg:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                          {t(service.titleKey)}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                          {t(service.descriptionKey)}
                        </p>
                      </div>

                      {/* Bottom spacing helper to keep cards balanced */}
                      <div className="mt-8 opacity-0">
                         <ChevronRight className="h-6 w-6" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}