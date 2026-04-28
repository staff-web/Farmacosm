"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CTA } from "@/components/sections/cta";
import { Beaker, Cog, Microscope } from "lucide-react";

const services = [
  {
    id: "oem",
    title: "OEM Services",
    icon: Cog,
    description: "Original Equipment Manufacturing",
    details:
      "Our OEM services provide complete manufacturing solutions tailored to your specifications. We handle production at scale while maintaining the highest quality standards.",
    features: [
      "Large-scale manufacturing",
      "Customized production runs",
      "Quality control and testing",
      "On-time delivery",
      "Cost-effective solutions",
      "Flexible batch sizes",
    ],
  },
  {
    id: "odm",
    title: "ODM Services",
    icon: Beaker,
    description: "Original Design Manufacturing",
    details:
      "Design and develop your products with our expert team. From concept to production, we create innovative solutions tailored to market demands.",
    features: [
      "Product design & development",
      "Formulation expertise",
      "Prototype development",
      "Market research support",
      "Full production capability",
      "Intellectual property support",
    ],
  },
  {
    id: "rd",
    title: "R&D Services",
    icon: Microscope,
    description: "Research & Development",
    details:
      "Advance your innovation with our research and development partnerships. We invest in cutting-edge research to create breakthrough solutions.",
    features: [
      "Advanced research facilities",
      "Scientific expertise",
      "Innovation partnerships",
      "Technology transfer",
      "Testing & validation",
      "Publication & patents",
    ],
  },
];

export function ServicesContent() {
  const [selectedService, setSelectedService] = useState<string>("oem");

  const selected = services.find((s) => s.id === selectedService);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Services */}
      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 lg:mb-16 text-center px-2"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <div className="h-0.5 w-6 sm:w-8 bg-primary" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                Our Services
              </span>
              <div className="h-0.5 w-6 sm:w-8 bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
              Comprehensive Solutions
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer specialized services across manufacturing, design, and
              research to meet your business needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
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
                  className={`group relative overflow-hidden rounded-2xl p-6 lg:p-8 text-left transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-2 border-primary"
                      : "bg-card border-2 border-border hover:border-primary/30"
                  }`}
                >
                  {/* Animated background */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isSelected
                        ? "opacity-20 bg-black"
                        : "opacity-0 bg-primary/5 group-hover:opacity-100"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: isSelected ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-primary-foreground/20"
                          : "bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isSelected ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </motion.div>

                    <h3
                      className={`text-xl lg:text-2xl font-bold transition-colors ${
                        isSelected
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {service.description}
                    </p>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-4 pt-4 border-t border-primary-foreground/20"
                      >
                        <p className="text-sm text-primary-foreground/90">
                          Click to view details
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
                      isSelected ? "w-full bg-primary-foreground/30" : "w-0"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Detailed Service View */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-8 lg:p-12"
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    {selected.icon && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                      >
                        <selected.icon className="h-8 w-8" />
                      </motion.div>
                    )}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {selected.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {selected.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selected.details}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selected.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3 rounded-lg bg-white/50 p-4 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <motion.a
                    href="/contact"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg"
                  >
                    Learn More & Contact
                    <span>→</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-3xl bg-card border border-border p-8 lg:p-12"
          >
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Quality Guaranteed
              </h4>
              <p className="text-muted-foreground">
                Every product meets international quality standards and regulatory
                requirements.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Expert Team
              </h4>
              <p className="text-muted-foreground">
                Our scientists and engineers bring decades of combined experience
                to your projects.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Partnership Focus
              </h4>
              <p className="text-muted-foreground">
                We work as your partner, invested in your success and long-term
                growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Warehouse & Custom Solutions */}
      <section className="bg-card py-12 sm:py-16 lg:py-20 border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-0.5 w-8 bg-primary" />
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                Support Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Logistics & Compliance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-background p-8 lg:p-10"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Warehouse & Logistics
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our state-of-the-art warehousing facilities handle storage,
                inventory management, and distribution of pharmaceutical and
                chemical materials across Southeast Asia.
              </p>
              <ul className="space-y-3">
                {[
                  "Temperature-controlled storage",
                  "Inventory management systems",
                  "Custom clearance processing",
                  "Distribution coordination",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-background p-8 lg:p-10"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Standards & Regulations
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Navigate regulatory compliance with confidence. Our expert team
                ensures your products meet all local and international standards.
              </p>
              <ul className="space-y-3">
                {[
                  "Regulatory compliance consulting",
                  "Product registration assistance",
                  "Quality certification support",
                  "Documentation management",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
