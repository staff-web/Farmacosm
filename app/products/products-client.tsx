'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { CTA } from "@/components/sections/cta";

interface ProductGroup {
  title: string;
  description: string;
  image: string;
  features: string[];
  gradient: string;
}

interface ProductsGridClientProps {
  productGroups: ProductGroup[];
}

export function ProductsGridClient({ productGroups }: ProductsGridClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      {/* Products Grid Section */}
      <section className="bg-background py-12 sm:py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="mb-12 sm:mb-16 text-center lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Our Product Portfolio
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Comprehensive Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover our six specialized categories designed to meet the diverse needs of industries across Southeast Asia
            </p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {productGroups.map((product, index) => {
              const colors = [
                { bg: "from-blue-50 to-blue-100/50", accent: "text-blue-600", bar: "from-blue-500 to-blue-400" },
                { bg: "from-emerald-50 to-emerald-100/50", accent: "text-emerald-600", bar: "from-emerald-500 to-emerald-400" },
                { bg: "from-purple-50 to-purple-100/50", accent: "text-purple-600", bar: "from-purple-500 to-purple-400" },
                { bg: "from-amber-50 to-amber-100/50", accent: "text-amber-600", bar: "from-amber-500 to-amber-400" },
                { bg: "from-rose-50 to-rose-100/50", accent: "text-rose-600", bar: "from-rose-500 to-rose-400" },
                { bg: "from-cyan-50 to-cyan-100/50", accent: "text-cyan-600", bar: "from-cyan-500 to-cyan-400" },
              ];
              const color = colors[index % colors.length];

              return (
                <motion.div
                  key={product.title}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20`}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r ${color.bar} transition-all duration-500 group-hover:w-full`} />

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/40" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 lg:p-7">
                    <motion.h3
                      className={`text-xl font-bold transition-colors duration-300 ${color.accent} group-hover:opacity-100`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      {product.title}
                    </motion.h3>

                    <motion.p
                      className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      viewport={{ once: true }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      className="mt-5 space-y-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          className={`flex items-center gap-2.5 text-sm text-foreground/70 transition-all duration-300 group-hover:${color.accent} group-hover:translate-x-1`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150 ${color.accent.replace("text-", "bg-")}`} />
                          {feature}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color.bar} transition-all duration-500 group-hover:w-full`} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
