"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CTA } from "@/components/sections/cta";
import { Cog, Microscope, Warehouse } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// Support card IDs that should scroll to the support section instead of switching tabs
const SUPPORT_IDS = ["logistics", "standards"];

// ─── Inner component (uses useSearchParams) ───────────────────────────────────
function ServicesInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("oem-odm");

  // ─── Data (inside component so t() is reactive) ───────────────────────────
  const services = [
    {
      id: "oem-odm",
      title: t("services.oem.title"),
      icon: Cog,
      description: t("services.oem.description"),
      details: t("services.oem.details"),
      features: [
        "Large-scale contract manufacturing",
        "Custom formulation & product design",
        "Prototype & pilot batch development",
        "Flexible MOQ & batch sizes",
        "Quality control & in-process testing",
        "Intellectual property support",
        "Packaging design & artwork",
        "On-time delivery commitment",
      ],
    },
    {
      id: "rd",
      title: t("services.rd.title"),
      icon: Microscope,
      description: t("services.rd.description"),
      details: t("services.rd.details"),
      features: [
        "Advanced research facilities",
        "Scientific & formulation expertise",
        "Innovation & co-development partnerships",
        "Technology transfer support",
        "Stability & compatibility testing",
        "Validation & documentation",
        "Publication & patent assistance",
        "Regulatory dossier preparation",
      ],
    },
    {
      id: "warehouse",
      title: t("services.warehouse.title"),
      icon: Warehouse,
      description: t("services.warehouse.description"),
      details: t("services.warehouse.details"),
      features: [
        "GDP-compliant ambient & cold-chain storage",
        "Temperature & humidity monitoring 24/7",
        "Inventory management system (IMS)",
        "Pick, pack & replenishment services",
        "Customs clearance & import documentation",
        "Regional distribution to SEA markets",
        "Hazardous materials handling",
        "Returns & reverse logistics",
      ],
    },
  ];

  const supportCards = [
    {
      id: "logistics",
      title: "Warehouse & Logistics",
      description:
        "Our state-of-the-art warehousing facilities handle storage, inventory management, and distribution of pharmaceutical and chemical materials across Southeast Asia.",
      bullets: [
        "Temperature-controlled storage",
        "Inventory management systems",
        "Custom clearance processing",
        "Distribution coordination",
      ],
    },
    {
      id: "standards",
      title: "Standards & Regulations",
      description:
        "Navigate regulatory compliance with confidence. Our expert team ensures your products meet all local and international standards.",
      bullets: [
        "Regulatory compliance consulting",
        "Product registration assistance",
        "Quality certification support",
        "Documentation management",
      ],
    },
  ];

  // Whenever the ?service= param changes (nav click), update the active tab
  useEffect(() => {
    const param = searchParams.get("service");
    if (!param) return;

    // If it matches a service card, switch the tab
    const matchedService = services.find((s) => s.id === param);
    if (matchedService) {
      setSelectedService(matchedService.id);
      // Scroll to top of services section
      setTimeout(() => {
        const el = document.getElementById("services-section");
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
      return;
    }

    // If it matches a support card, scroll to it
    if (SUPPORT_IDS.includes(param)) {
      setTimeout(() => {
        const el = document.getElementById(param);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
    }
  }, [searchParams]);

  const selected = services.find((s) => s.id === selectedService)!;

  return (
    <>
      {/* ── Services Section ─────────────────────────────────────────── */}
      <section
        id="services-section"
        className="bg-background py-16 sm:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 lg:mb-20 text-center px-2"
          >
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <div className="h-0.5 w-4 sm:w-6 lg:w-8 bg-primary" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                {t("services.sectionLabel")}
              </span>
              <div className="h-0.5 w-4 sm:w-6 lg:w-8 bg-primary" />
            </div>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
              {t("services.comprehensiveSolutions")}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("services.comprehensiveDesc")}
            </p>
          </motion.div>

          {/* Service Cards — clicking switches the detail panel */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 md:grid-cols-3 mb-12 lg:mb-16">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-2 border-primary"
                      : "bg-card border-2 border-border hover:border-primary/30"
                  }`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isSelected
                        ? "opacity-20 bg-black"
                        : "opacity-0 bg-primary/5 group-hover:opacity-100"
                    }`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: isSelected ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 sm:mb-4 inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg ${
                        isSelected ? "bg-primary-foreground/20" : "bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`h-5 sm:h-6 w-5 sm:w-6 ${
                          isSelected ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </motion.div>

                    <h3
                      className={`text-base sm:text-lg lg:text-xl font-bold transition-colors ${
                        isSelected ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {/* <p
                      className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium transition-colors ${
                        isSelected
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {service.description}
                    </p> */}

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary-foreground/20"
                      >
                        <p className="text-xs sm:text-sm text-primary-foreground/90">
                          Clicked
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
                      isSelected ? "w-full bg-primary-foreground/30" : "w-0"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-12 lg:mb-16 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-5 sm:p-8 lg:p-12"
              >
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-primary text-primary-foreground flex-shrink-0"
                    >
                      <selected.icon className="h-6 sm:h-8 w-6 sm:w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground">
                        {selected.title}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-primary font-medium">{selected.description}</p>
                    </div>
                  </div>
                  {/* <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {selected.details}
                  </p> */}
                </div>

                {/* <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  {selected.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-2 sm:gap-3 rounded-lg bg-white/50 p-3 sm:p-4 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-medium text-xs sm:text-sm lg:text-base text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div> */}

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/10">
                  <Link href="/contact" prefetch={true}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-primary-foreground transition-all hover:shadow-lg cursor-pointer"
                    >
                      {t("services.learnMore")}
                      <span>→</span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3 Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl sm:rounded-3xl bg-card border border-border p-5 sm:p-8 lg:p-12"
          >
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">{t("services.qualityTitle")}</h4>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                {t("services.qualityDesc")}
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">{t("services.expertTitle")}</h4>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                {t("services.expertDesc")}
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">{t("services.partnerTitle")}</h4>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                {t("services.partnerDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Support Section ───────────────────────────────────────────── */}
      {/* <section className="bg-card py-16 sm:py-24 lg:py-32 border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <div className="h-0.5 w-6 sm:w-8 bg-primary" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                Support Services
              </span>
            </div>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
              Logistics & Compliance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {supportCards.map((card, i) => (
              <motion.div
                key={card.id}
                id={card.id}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-xl sm:rounded-2xl border border-border bg-background p-5 sm:p-6 lg:p-8"
              >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">{card.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">{card.description}</p>
                <ul className="space-y-2 sm:space-y-3">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-2 sm:gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-base text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <CTA />
    </>
  );
}

// ─── Exported wrapper — required because useSearchParams needs Suspense ────────
export function ServicesContent() {
  return (
    <Suspense fallback={null}>
      <ServicesInner />
    </Suspense>
  );
}