"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { blogPosts } from "./blog-data";
import type { BlogPost } from "./blog-data";
import { useLanguage } from "@/contexts/LanguageContext";


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
  const { t, language } = useLanguage();
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const getTitle = (post: BlogPost) =>
    language === "en" ? post.title_en : post.title_kh;
  const getExcerpt = (post: BlogPost) =>
    language === "en" ? post.excerpt_en : post.excerpt_kh;
  const getCategory = (post: BlogPost) =>
    language === "en" ? post.category_en : post.category_kh;

  const categories = Array.from(
    new Set(blogPosts.map((post) => getCategory(post)))
  );

  return (
    <section className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newspaper Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-b-2 sm:border-b-4 border-primary pb-3 sm:pb-4 lg:pb-6 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("news.latestUpdates")}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-foreground tracking-tight mt-2">
            {t("news.sectionTitle")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2 sm:mt-3 max-w-2xl">
            {t("news.sectionDesc")}
          </p>
        </motion.div>

        {/* Featured Posts - Newspaper Masonry Grid */}
        <motion.div
          className="mb-12 lg:mb-20 grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 md:grid-cols-2"
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
                } overflow-hidden rounded-lg sm:rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg h-full`}
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
                        ? "md:w-1/2 h-40 sm:h-48 md:h-auto"
                        : "w-full h-36 sm:h-40"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={getTitle(post)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-4">
                      <span className="inline-block bg-primary px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold text-primary-foreground uppercase tracking-wide">
                        {getCategory(post)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col justify-between p-3 sm:p-4 lg:p-5 ${
                      index === 0 ? "md:w-1/2" : "w-full"
                    }`}
                  >
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {getTitle(post)}
                      </h3>
                      <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {getExcerpt(post)}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-border pt-2 sm:pt-3">
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 sm:h-4 w-3 sm:w-4" />
                          {post.author}
                        </div>
                      </div>
                      <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-2 border-primary"
          >
            {t("news.moreNews")}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {regularPosts.map((post) => (
              <Link href={`/news/${post.id}`} key={post.id}>
                <motion.article
                  variants={itemVariants}
                  className="group overflow-hidden rounded-lg sm:rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-muted h-36 sm:h-40 lg:h-48">
                    <Image
                      src={post.image}
                      alt={getTitle(post)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="inline-block bg-primary px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-bold text-primary-foreground uppercase tracking-wide">
                        {getCategory(post)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-4 sm:p-4 lg:p-5 flex-1">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base lg:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {getTitle(post)}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {getExcerpt(post)}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 sm:h-3.5 w-3 sm:w-3.5 flex-shrink-0" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 sm:h-3.5 w-3 sm:w-3.5 flex-shrink-0" />
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
          className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-6 lg:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
            {t("news.browseCategory")}
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <button
                key={`${category}-${index}`}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm hover:bg-primary/20 transition-colors border border-primary/20 hover:border-primary/40"
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