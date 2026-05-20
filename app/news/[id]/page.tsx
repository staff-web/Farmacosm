import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/sections/cta";
import { Calendar, User, ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
import { blogPosts } from "../blog-data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));
  if (!post) return {};
  return {
    title: `${post.title} | Farmacosm`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) return notFound();

  const otherPosts = blogPosts.filter((p) => p.id !== post.id);

  // Split: 1 featured sidebar post + rest as small list
  const sidebarFeatured = otherPosts[0];
  const sidebarList = otherPosts.slice(1, 5);
  // Always show exactly 8 in the bottom grid
  const bottomPosts = otherPosts.slice(0, 8);

  return (
    <>
     
      <main className="bg-background">

        {/* ── Newspaper Masthead ── */}
        <div className="border-b-4 border-foreground">
          {/* Single Back to News link in the masthead area */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-widest">
              <span>{post.date}</span>
            </div>
            <div className="py-4 sm:py-6 text-center">
              <div className="inline-block bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest px-3 py-1 mb-3">
                {post.category}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-none max-w-5xl mx-auto">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground mb-10">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                <span className="w-px h-4 bg-border" />
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
              </div>
              <div className="relative w-full h-72 sm:h-96 lg:h-[520px] overflow-hidden">
                  <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        
            </div>
          </div>
        </div>

        {/* ── Full-width Hero Image ── */}
        

        {/* ── Newspaper Body: 3-col layout ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* ── Main Article Column ── */}
            <article className="lg:col-span-8 border-r-0 lg:border-r border-border lg:pr-16">

              {/* Drop-cap intro */}
              <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed mb-6 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary first-letter:leading-none">
                {post.excerpt}
              </p>

              <div className="h-px bg-border my-6" />

              {/* Pull quote */}
              <blockquote className="border-l-4 border-primary pl-6 my-8">
                <p className="text-xl sm:text-2xl font-bold text-foreground italic leading-snug">
                  "The pharmaceutical and chemical industries are undergoing rapid transformation — efficiency, compliance, and sustainability are no longer optional."
                </p>
              </blockquote>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Across Southeast Asia, businesses are rethinking how they source, store, and distribute critical materials. The pressure to meet international standards while managing costs and reducing environmental impact has never been greater. Companies that invest in robust supply chain infrastructure today will be better positioned to capture tomorrow's opportunities.
                </p>
                <p>
                  At Farmacosm, we have spent years building the logistics backbone that our partners rely on. From temperature-controlled warehousing to end-to-end traceability systems, every link in the chain is designed with reliability and compliance in mind. Our teams work closely with regulatory bodies to ensure that shipments meet the highest standards at every checkpoint.
                </p>
                <p>
                  The adoption of digital tools — real-time tracking, automated compliance documentation, predictive inventory management — is no longer a differentiator. It is the baseline expectation. Partners who embrace these capabilities find that lead times shrink, errors decrease, and customer confidence grows measurably.
                </p>
              </div>

              <div className="h-px bg-border my-8" />

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h2 className="text-xl font-black text-foreground uppercase tracking-wide">Looking Ahead</h2>
                <p>
                  The next phase of innovation will centre on AI-driven demand forecasting and blockchain-based provenance tracking. Early adopters in our network are already reporting significant reductions in waste and spoilage. As regulatory frameworks evolve, those with transparent, auditable supply chains will find approval processes far smoother.
                </p>
                <p>
                  Farmacosm remains committed to investing in the infrastructure, partnerships, and expertise that keep our clients ahead of the curve. Whether you are scaling operations regionally or entering new markets, our team is ready to support every stage of that journey.
                </p>
              </div>

              {/* Author card */}
              <div className="mt-10 flex items-center gap-4 p-5 rounded-lg border border-border bg-card">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{post.category} Contributor · Farmacosm</div>
                </div>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Sidebar featured */}
              {sidebarFeatured && (
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                    Also In {sidebarFeatured.category}
                  </div>
                  <Link href={`/news/${sidebarFeatured.id}`} className="group block">
                    <div className="relative h-44 rounded overflow-hidden mb-3">
                      <Image
                        src={sidebarFeatured.image}
                        alt={sidebarFeatured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                        {sidebarFeatured.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {sidebarFeatured.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{sidebarFeatured.date}</p>
                  </Link>
                </div>
              )}

              <div className="h-px bg-border" />

              {/* Sidebar list */}
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                  More News
                </div>
                <div className="space-y-5">
                  {sidebarList.map((p, i) => (
                    <Link href={`/news/${p.id}`} key={p.id} className="group flex gap-3">
                      <span className="text-3xl font-black text-border leading-none select-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">{p.category}</span>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mt-0.5 line-clamp-2">
                          {p.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Categories */}
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                  Browse Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.map((p) => p.category))).map((cat) => (
                    <span key={cat} className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Full-width Bottom Posts Grid ── */}
        {bottomPosts.length > 0 && (
          <div className="border-t-4 border-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-8">
                Continue Reading
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bottomPosts.map((p) => (
                  <Link href={`/news/${p.id}`} key={p.id} className="group">
                    <div className="relative h-36 rounded overflow-hidden mb-3">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                        {p.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{p.date}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Back to all news */}
              <div className="mt-10 text-center">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity rounded"
                >
                  
                  View All News
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}