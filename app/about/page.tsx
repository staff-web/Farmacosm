"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowRight, Target, Eye, Users, Award, Shield, Leaf, CheckCircle } from "lucide-react";
import {
  FadeUp,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  staggerChildVariants,
  ParallaxImage,
} from "@/components/scroll-animations";
import { motion } from "framer-motion";
import { CTA } from "@/components/sections/cta";

const values = [
  {
    icon: Shield,
    title: "Reliability",
    desc: "Consistent quality and timely delivery across every order.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Your concerns are our priorities. Always.",
  },
  {
    icon: Award,
    title: "Quality Standards",
    desc: "GMP, ISO, and HACCP compliant sourcing and processes.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Responsible sourcing practices for a better future.",
  },
];

const industries = [
  "Pharmaceutical",
  "Chemical",
  "Food & Beverage",
  "Personal Care",
  "Agro-chemical",
  "Packaging",
  "Veterinary Medicine",
];

export default function AboutPage() {
  return (
    <>
      <div className="relative z-50">
        <Navigation />
      </div>
      <main>
        {/* Hero Section */}
        {/*
          FIX: Added `isolate` to create a new stacking context, preventing Chrome
          from compositing child blur layers against the parent gradient incorrectly.
        */}
        {/* Hero Section - No gradient, just solid dark background */}
        <section className="relative isolate overflow-hidden bg-[#0a1628] py-16 sm:py-24 lg:py-32">
          {/* Simple background image with solid overlay - no gradient */}
          <div className="absolute inset-0">
            <Image
              src="/images/team-collaboration.jpg"
              alt="Team collaboration"
              fill
              className="object-cover opacity-5"
              sizes="100vw"
              priority
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-primary">OUR FOUNDATION</p>
              <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white">
                Built on trust,{" "}
                <span className="text-primary">driven by purpose</span>
              </h1>
              <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300">
                Farmacosm brings together core values of reliability, quality, and customer focus across multiple industries. Discover what drives us.
              </p>
            </motion.div>

            {/* Values Grid */}
            <StaggerContainer
              className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4"
              staggerDelay={0.1}
            >
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    variants={staggerChildVariants}
                    className="group relative overflow-hidden rounded-xl bg-[rgba(255,255,255,0.07)] ring-1 ring-white/10 p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:bg-[rgba(255,255,255,0.12)] hover:ring-primary/30"
                  >
                    {/* Icon */}
                    <div className="relative">
                      <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb,99,102,241),0.25)] group-hover:shadow-[0_0_28px_rgba(var(--primary-rgb,99,102,241),0.4)] transition-shadow duration-300">
                        <Icon className="h-5 sm:h-6 w-5 sm:w-6" />
                      </div>
                    </div>

                    <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-300">
                      {val.desc}
                    </p>

                    {/* Decorative bottom line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                );
              })}
            </StaggerContainer>

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 sm:mt-16"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <p className="text-xs sm:text-sm font-semibold text-primary">INDUSTRIES WE SERVE:</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {industries.map((ind, index) => (
                    <motion.span
                      key={ind}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,255,255,0.06)] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white ring-1 ring-white/10 hover:bg-primary/10 hover:ring-primary/30 transition-all duration-300"
                    >
                      <CheckCircle className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
                      {ind}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-card py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              <SlideInLeft>
                <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10">
                    <Target className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  </div>
                  <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-foreground">
                    Our Mission
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    To provide reliable, sustainable, and cost-effective supply
                    chain solutions, empowering businesses in Cambodia and Southeast
                    Asia to access high-quality materials through strong
                    partnerships and a customer-first approach.
                  </p>
                </div>
              </SlideInLeft>

              <SlideInRight>
                <div className="rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary">
                    <Eye className="h-5 sm:h-6 w-5 sm:w-6 text-primary-foreground" />
                  </div>
                  <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-foreground">
                    Our Vision
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    To become the leading supply chain partner in the region,
                    recognized for quality, innovation, and sustainability in
                    pharmaceutical, chemical, food, and personal care material
                    sourcing.
                  </p>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* Industries we serve - Detailed section */}
        {/* <section className="bg-secondary py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
              <FadeUp>
                <p className="text-xs sm:text-sm font-semibold text-primary">Industries</p>
                <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground">
                  Related fields we serve
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Our expertise spans across multiple sectors, ensuring
                  specialized solutions for each industry.
                </p>
              </FadeUp>
              <StaggerContainer
                className="flex flex-wrap gap-2 sm:gap-3"
                staggerDelay={0.06}
              >
                {industries.map((ind) => (
                  <motion.span
                    key={ind}
                    variants={staggerChildVariants}
                    className="rounded-full border border-primary/20 bg-card px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg"
                  >
                    {ind}
                  </motion.span>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section> */}

        {/* Image + Team */}
        <section className="bg-card py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
              <SlideInLeft>
                <ParallaxImage
                  className="relative aspect-[4/3] min-h-[240px] sm:min-h-[320px] lg:aspect-auto lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl"
                  speed={0.15}
                >
                  <Image
                    src="/images/team-collaboration.jpg"
                    alt="Farmacosm team working together"
                    fill
                    className="rounded-xl sm:rounded-2xl object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </ParallaxImage>
              </SlideInLeft>

              <SlideInRight>
                <p className="text-xs sm:text-sm font-semibold text-primary">Our team</p>
                <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground">
                  Expert professionals, dedicated to your success.
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Our team combines deep technical knowledge with industry
                  experience across pharmaceutical sciences, product development,
                  regulatory compliance, and supply chain management.
                </p>
                <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
                  {["Technical Team", "Product Dev", "Standards & QA"].map(
                    (team) => (
                      <div
                        key={team}
                        className="rounded-lg sm:rounded-xl border border-border bg-secondary p-3 sm:p-4 text-center hover:border-primary/30 transition-all duration-300"
                      >
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {team}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}