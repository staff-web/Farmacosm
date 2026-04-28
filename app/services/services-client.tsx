"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  MessageSquare,
  Target,
  DollarSign,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { CTA } from "@/components/sections/cta";
import {
  StaggerContainer,
  staggerChildVariants,
} from "@/components/scroll-animations";

const mainServices = [
  {
    title: "Product OEM / ODM / R&D",
    description:
      "From formulation development to full-scale manufacturing, our product development services cover the entire lifecycle. Whether you need original equipment manufacturing, custom product design, or research and development, our team delivers.",
    features: [
      "Custom formulation development",
      "OEM manufacturing solutions",
      "ODM product design and production",
      "Research & development partnerships",
      "Prototype to production scaling",
      "Quality assurance at every stage",
    ],
  },
  {
    title: "Custom / Warehouse Solutions",
    description:
      "Streamline your logistics with our comprehensive warehousing and custom clearance services. We handle storage, inventory management, and distribution so you can focus on growing your business.",
    features: [
      "Temperature-controlled storage",
      "Inventory management systems",
      "Custom clearance processing",
      "Distribution and logistics coordination",
      "Bulk and split-order handling",
      "Import/export documentation support",
    ],
  },
  {
    title: "Standard & Regulation",
    description:
      "Navigate complex regulatory landscapes with confidence. Our team keeps you compliant with local and international requirements, ensuring your products meet every quality benchmark.",
    features: [
      "Regulatory compliance consulting",
      "Product registration assistance",
      "Quality standard certification",
      "Documentation and filing support",
      "International standards alignment",
      "Ongoing compliance monitoring",
    ],
  },
];

const benefits = [
  {
    icon: CheckCircle2,
    title: "One stop service",
    description:
      "Everything you need under one roof, from sourcing to delivery.",
  },
  {
    icon: Zap,
    title: "Effective & timely",
    description:
      "Efficiency and precision, ensuring deadlines without compromise.",
  },
  {
    icon: MessageSquare,
    title: "Easy communication",
    description:
      "Dedicated team, no barriers, no delays. Always reachable.",
  },
  {
    icon: Target,
    title: "High responsibility",
    description:
      "Accountable for every commitment, delivering on every promise.",
  },
  {
    icon: DollarSign,
    title: "Competitive pricing",
    description:
      "Cost-effective solutions leveraging our extensive network.",
  },
  {
    icon: Handshake,
    title: "Partnership approach",
    description:
      "Long-term relationships built on mutual trust and shared goals.",
  },
];

export function ServicesContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Services */}
      <section className="bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-8 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
              {mainServices.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-border transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative z-10 p-8 lg:p-12">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                      {/* Left side - Title and description */}
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                            {service.title}
                          </h2>
                        </div>
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
                          {service.description}
                        </p>
                      </div>

                      {/* Right side - Features */}
                      <div className="lg:col-span-6 lg:col-start-7">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.features.map((f, fIndex) => (
                            <motion.div
                              key={f}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: fIndex * 0.05 }}
                              viewport={{ once: true }}
                              className="group/item flex items-start gap-3 rounded-lg border border-primary/10 bg-white p-3.5 transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/10"
                            >
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary transition-transform duration-300 group-hover/item:scale-150" />
                              <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover/item:text-primary">
                                {f}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

        {/* Benefits - Why Work With Us */}
        <section className="bg-card py-16 sm:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Header Section - Sticky */}
              <div className="w-full lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="sticky top-20 sm:top-24"
                >
                  <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                    <div className="h-0.5 w-8 bg-primary" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                      Why work with us
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl xl:text-5xl lg:leading-tight">
                    The Farmacosm difference
                  </h2>

                  <div className="mt-6 space-y-4">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      We take customer and supplier concerns as our own. Fulfilling your needs is our priority.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Benefits Grid */}
              <div className="w-full lg:col-span-8">
                <StaggerContainer
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  staggerDelay={0.1}
                >
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.title}
                        variants={staggerChildVariants}
                        className="group h-full"
                      >
                        <div className="h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 border border-primary/10 p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15">
                          {/* Animated background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                              {/* Icon Container */}
                              <motion.div
                                className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                              >
                                <Icon className="h-6 w-6" />
                              </motion.div>

                              {/* Arrow */}
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="h-5 w-5 text-primary" />
                              </motion.div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                              <motion.h3
                                className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                              >
                                {benefit.title}
                              </motion.h3>

                              <motion.p
                                className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/85"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                viewport={{ once: true }}
                              >
                                {benefit.description}
                              </motion.p>
                            </div>

                            {/* Hover Line Effect */}
                            <div className="mt-6 pt-6 border-t border-primary/10">
                              <div className="h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full" />
                            </div>
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

      {/* CTA */}
      <CTA />
    </>
  );
}
