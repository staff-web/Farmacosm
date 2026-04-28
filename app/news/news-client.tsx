"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { StaggerContainer, staggerChildVariants } from "@/components/scroll-animations";

const blogPosts = [
  {
    id: 1,
    title: "Innovations in Pharmaceutical Supply Chain Management",
    excerpt:
      "Discover how modern logistics and warehousing solutions are transforming pharmaceutical distribution across Southeast Asia.",
    category: "Industry",
    author: "Dr. Sarah Chen",
    date: "March 10, 2025",
    image: "/images/blog-pharma.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Regulatory Compliance: Meeting International Standards",
    excerpt:
      "Understanding the latest regulatory requirements for chemical materials and food additives in 2025.",
    category: "Compliance",
    author: "James Wilson",
    date: "March 8, 2025",
    image: "/images/blog-compliance.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Sustainable Practices in Chemical Manufacturing",
    excerpt:
      "How Farmacosm is committed to eco-friendly production methods and sustainable sourcing.",
    category: "Sustainability",
    author: "Emma Rodriguez",
    date: "March 5, 2025",
    image: "/images/blog-sustainable.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Market Insights: Q1 2025 Pharmaceutical Trends",
    excerpt:
      "Latest market analysis and emerging trends in the pharmaceutical and chemical sectors.",
    category: "Market Analysis",
    author: "Michael Zhang",
    date: "March 1, 2025",
    image: "/images/blog-market.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Partnership Spotlight: Success Stories from Our Clients",
    excerpt:
      "Read how leading companies have benefited from Farmacosm's comprehensive supply chain solutions.",
    category: "Case Study",
    author: "Lisa Thompson",
    date: "February 25, 2025",
    image: "/images/blog-partnership.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Technology & Innovation: Digital Supply Chain Solutions",
    excerpt:
      "Exploring how digital tools and AI are revolutionizing pharmaceutical supply chain management.",
    category: "Technology",
    author: "Dr. Robert Kim",
    date: "February 20, 2025",
    image: "/images/blog-tech.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "Quality Assurance: Our Commitment to Excellence",
    excerpt:
      "Understanding the rigorous testing and certification processes that ensure product quality at every stage.",
    category: "Compliance",
    author: "Jennifer Park",
    date: "February 15, 2025",
    image: "/images/blog-compliance.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Green Chemistry: Leading the Sustainable Revolution",
    excerpt:
      "How eco-friendly manufacturing practices are reshaping the chemical industry for a better tomorrow.",
    category: "Sustainability",
    author: "Dr. Thomas Green",
    date: "February 10, 2025",
    image: "/images/blog-sustainable.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Supply Chain Resilience: Lessons from 2024",
    excerpt:
      "Key insights on building robust supply chains that can withstand disruptions and market volatility.",
    category: "Industry",
    author: "Victoria Chen",
    date: "February 5, 2025",
    image: "/images/blog-pharma.jpg",
    featured: false,
  },
  {
    id: 10,
    title: "Customer Success: Transforming Business Partnerships",
    excerpt:
      "Discover how our personalized approach to supply chain management drives customer satisfaction and growth.",
    category: "Case Study",
    author: "Mark Johnson",
    date: "January 30, 2025",
    image: "/images/blog-partnership.jpg",
    featured: false,
  },
  {
    id: 11,
    title: "Market Forecast: 2025 Chemical Industry Projections",
    excerpt:
      "Expert analysis on market growth, emerging opportunities, and strategic positioning for success.",
    category: "Market Analysis",
    author: "Sarah Foster",
    date: "January 25, 2025",
    image: "/images/blog-market.jpg",
    featured: false,
  },
  {
    id: 12,
    title: "Innovation in Product Development: OEM & ODM Excellence",
    excerpt:
      "Exploring our capabilities in custom product formulation and manufacturing partnerships.",
    category: "Technology",
    author: "Dr. Alex Rivera",
    date: "January 20, 2025",
    image: "/images/blog-tech.jpg",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function NewsPageClient() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Newspaper Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-b-4 border-primary pb-4 sm:pb-6 mb-8 sm:mb-12 lg:pb-8 lg:mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Latest Updates
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight mt-2">
            Farmacosm News
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl">
            Industry insights, market trends, and company updates from the
            pharmaceutical and chemical supply chain leaders.
          </p>
        </motion.div>

        {/* Featured Posts - Newspaper Masonry Grid */}
        <motion.div
          className="mb-12 lg:mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredPosts.map((post, index) => (
            <Link href={`/news/${post.id}`} key={post.id}>
            <motion.article
              variants={itemVariants}
              className={`group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } overflow-hidden rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg h-full`}
            >
              <div
                className={`flex flex-col ${
                  index === 0 ? "md:flex-row" : ""
                } h-full`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-muted ${
                    index === 0
                      ? "md:w-1/2 h-56 md:h-auto"
                      : "w-full h-48"
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-between p-6 lg:p-8 ${
                    index === 0 ? "md:w-1/2" : "w-full"
                  }`}
                >
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Regular Posts Grid - Multi-column Newspaper Layout */}
        <div className="mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-foreground mb-8 pb-4 border-b-2 border-primary"
          >
            More News
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {regularPosts.map((post) => (
              <Link href={`/news/${post.id}`} key={post.id}>
              <motion.article
                variants={itemVariants}
                className="group overflow-hidden rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-muted h-40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-5 lg:p-6 flex-1">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </div>
                  </div>
                </div>
              </motion.article>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card rounded-lg border border-border p-6 lg:p-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            Browse by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors border border-primary/20 hover:border-primary/40"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
