// app/news/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, User } from "lucide-react";



const blogPosts: Record<
  number,
  {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string;
    content: string;
    relatedPosts: number[];
  }
> = {
  1: {
    title: "Innovations in Pharmaceutical Supply Chain Management",
    excerpt: "Discover how modern logistics and warehousing solutions are transforming pharmaceutical distribution across Southeast Asia.",
    category: "Industry",
    author: "Dr. Sarah Chen",
    date: "March 10, 2025",
    image: "/images/blog-pharma.jpg",
    content: `The pharmaceutical supply chain has undergone a dramatic transformation in recent years. Modern logistics solutions, advanced warehousing technologies, and strategic partnerships are enabling faster, more reliable distribution of critical medications and materials across Southeast Asia.

Farmacosm has been at the forefront of this revolution, implementing cutting-edge temperature-controlled warehousing, real-time inventory management systems, and comprehensive distribution networks. Our commitment to regulatory compliance and quality assurance ensures that every product reaches its destination in pristine condition.

Key innovations include:
- Automated inventory management with AI-powered forecasting
- Real-time tracking and traceability for all shipments
- Temperature and humidity controlled storage facilities
- Strategic partnerships with regional logistics providers

The benefits are substantial: reduced delivery times, lower costs, improved product integrity, and enhanced customer satisfaction. As regulatory requirements continue to evolve, our agile approach ensures we stay ahead of the curve.`,
    relatedPosts: [2, 6, 9],
  },
  2: {
    title: "Regulatory Compliance: Meeting International Standards",
    excerpt: "Understanding the latest regulatory requirements for chemical materials and food additives in 2025.",
    category: "Compliance",
    author: "James Wilson",
    date: "March 8, 2025",
    image: "/images/blog-compliance.jpg",
    content: `Regulatory compliance is not just a legal requirement—it's a cornerstone of our business philosophy. Farmacosm's dedicated compliance team monitors evolving regulations across all major markets. From GMP standards to ISO certifications, HACCP protocols to FDA requirements, we ensure that every product meets or exceeds regulatory expectations.

Latest regulatory updates for 2025:
- Enhanced traceability requirements for pharmaceutical materials
- Stricter environmental standards for chemical manufacturing
- Updated food safety protocols following international guidelines
- Increased documentation and audit requirements

Our proactive approach includes regular audits, comprehensive documentation, and continuous training. We work closely with regulatory bodies and industry associations to anticipate changes and maintain our certifications.`,
    relatedPosts: [3, 7, 11],
  },
  3: {
    title: "Sustainable Practices in Chemical Manufacturing",
    excerpt: "How Farmacosm is committed to eco-friendly production methods and sustainable sourcing.",
    category: "Sustainability",
    author: "Emma Rodriguez",
    date: "March 5, 2025",
    image: "/images/blog-sustainable.jpg",
    content: `Sustainability is no longer an option—it's an imperative. Farmacosm has implemented comprehensive sustainability initiatives across all operations. From green chemistry principles to waste reduction programs, we're committed to reducing our environmental footprint.

Our sustainability commitment includes:
- Investment in renewable energy for manufacturing facilities
- Implementation of waste minimization and recycling programs
- Sourcing from environmentally responsible suppliers
- Continuous research into eco-friendly alternative processes
- Carbon footprint tracking and reduction targets

These initiatives benefit the environment and create long-term cost savings while meeting the demands of eco-conscious customers.`,
    relatedPosts: [8, 1, 5],
  },
  4: {
    title: "Market Insights: Q1 2025 Pharmaceutical Trends",
    excerpt: "Latest market analysis and emerging trends in the pharmaceutical and chemical sectors.",
    category: "Market Analysis",
    author: "Michael Zhang",
    date: "March 1, 2025",
    image: "/images/blog-market.jpg",
    content: `Q1 2025 presents challenges and opportunities for the pharmaceutical and chemical sectors. Key trends include:

- Increased demand for specialty chemicals in advanced applications
- Growing consolidation among mid-sized manufacturers
- Rising raw material costs but stable end-product pricing
- Accelerated adoption of digital supply chain technologies
- Increased regulatory scrutiny on environmental and safety practices

Farmacosm's diversified portfolio and services help customers capitalize on these opportunities.`,
    relatedPosts: [6, 11, 2],
  },
  5: {
    title: "Partnership Spotlight: Success Stories from Our Clients",
    excerpt: "Read how leading companies have benefited from Farmacosm's comprehensive supply chain solutions.",
    category: "Case Study",
    author: "Lisa Thompson",
    date: "February 25, 2025",
    image: "/images/blog-partnership.jpg",
    content: `Our success is measured by our clients' success. Farmacosm has partnered with leading companies across multiple industries, delivering solutions that drive growth and efficiency.

Client success stories highlight:
- 35% reduction in supply chain costs
- 99.2% on-time delivery rate
- Successful market expansion into new regions
- Improved product quality through custom formulations
- Enhanced regulatory compliance and certifications`,
    relatedPosts: [1, 9, 10],
  },
  6: {
    title: "Technology & Innovation: Digital Supply Chain Solutions",
    excerpt: "Exploring how digital tools and AI are revolutionizing pharmaceutical supply chain management.",
    category: "Technology",
    author: "Dr. Robert Kim",
    date: "February 20, 2025",
    image: "/images/blog-tech.jpg",
    content: `Digital transformation is revolutionizing supply chain management. AI, IoT, and advanced analytics enable unprecedented visibility, efficiency, and responsiveness.

Farmacosm's technology initiatives include:
- AI-powered demand forecasting reducing inventory waste by 25%
- Real-time supply chain visibility through IoT sensors
- Blockchain-based traceability for pharmaceutical products
- Automated compliance monitoring and reporting
- Predictive analytics for supply chain optimization`,
    relatedPosts: [4, 12, 11],
  },
  7: {
    title: "Quality Assurance: Our Commitment to Excellence",
    excerpt: "Understanding the rigorous testing and certification processes that ensure product quality at every stage.",
    category: "Compliance",
    author: "Jennifer Park",
    date: "February 15, 2025",
    image: "/images/blog-compliance.jpg",
    content: `Quality is not an afterthought—it's woven into every aspect of our operations. Farmacosm maintains rigorous quality standards.

Our framework includes:
- Comprehensive testing at every production stage
- Regular third-party audits and certifications
- ISO 9001:2015 compliance
- GMP and HACCP adherence
- Continuous staff training and certification`,
    relatedPosts: [2, 3, 1],
  },
  8: {
    title: "Green Chemistry: Leading the Sustainable Revolution",
    excerpt: "How eco-friendly manufacturing practices are reshaping the chemical industry for a better tomorrow.",
    category: "Sustainability",
    author: "Dr. Thomas Green",
    date: "February 10, 2025",
    image: "/images/blog-sustainable.jpg",
    content: `Green chemistry represents a fundamental shift in how the chemical industry operates. Key principles:

- Design processes to prevent waste
- Use renewable resources
- Reduce toxic substances
- Maximize atom efficiency
- Minimize energy consumption

Farmacosm invests in green chemistry methods and sustainable suppliers.`,
    relatedPosts: [3, 1, 12],
  },
  9: {
    title: "Supply Chain Resilience: Lessons from 2024",
    excerpt: "Key insights on building robust supply chains that can withstand disruptions and market volatility.",
    category: "Industry",
    author: "Victoria Chen",
    date: "February 5, 2025",
    image: "/images/blog-pharma.jpg",
    content: `2024 taught the industry lessons about resilience. Disruptions require flexible supply chains.

Farmacosm's strategy includes:
- Multi-source sourcing
- Strategic inventory positioning
- Flexible manufacturing and logistics partnerships
- Continuous monitoring of developments
- Scenario planning and stress testing`,
    relatedPosts: [1, 4, 6],
  },
  10: {
    title: "Customer Success: Transforming Business Partnerships",
    excerpt: "Discover how our personalized approach to supply chain management drives customer satisfaction and growth.",
    category: "Case Study",
    author: "Mark Johnson",
    date: "January 30, 2025",
    image: "/images/blog-partnership.jpg",
    content: `True partnership means building relationships based on mutual success.

Elements of our approach:
- Dedicated account management
- Regular performance reviews
- Collaborative planning
- Custom solutions
- Open communication`,
    relatedPosts: [5, 1, 9],
  },
  11: {
    title: "Market Forecast: 2025 Chemical Industry Projections",
    excerpt: "Expert analysis on market growth, emerging opportunities, and strategic positioning for success.",
    category: "Market Analysis",
    author: "Sarah Foster",
    date: "January 25, 2025",
    image: "/images/blog-market.jpg",
    content: `The chemical industry enters 2025 with cautious optimism. Positive trends include:

- Global market growth 2-3%
- Specialty chemicals growth outpaces commodity chemicals
- Robust demand for pharmaceuticals and food additives
- Southeast Asia driving growth
- Sustainability-focused products command premium pricing`,
    relatedPosts: [4, 6, 8],
  },
  12: {
    title: "Innovation in Product Development: OEM & ODM Excellence",
    excerpt: "Exploring our capabilities in custom product formulation and manufacturing partnerships.",
    category: "Technology",
    author: "Dr. Alex Rivera",
    date: "January 20, 2025",
    image: "/images/blog-tech.jpg",
    content: `OEM and ODM services provide growth opportunities for companies seeking custom solutions without in-house R&D.

Farmacosm's capabilities:
- State-of-the-art labs
- Experienced chemists and engineers
- Concept to full-scale production
- Rapid prototyping
- Regulatory support`,
    relatedPosts: [6, 1, 3],
  },
};

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((id) => ({
    id,
  }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = blogPosts[postId];

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground">Article not found</h1>
            <Link href="/news" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = post.relatedPosts.slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="relative bg-card py-12 sm:py-16 lg:py-20 border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link href="/news" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">{post.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-lg prose-primary max-w-none">
              <div className="space-y-6 text-foreground leading-relaxed">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg">{paragraph}</p>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedId) => {
                const relatedPost = blogPosts[relatedId];
                return (
                  <motion.div
                    key={relatedId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <Link href={`/news/${relatedId}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-4 sm:p-6 bg-background">
                        <div className="text-xs font-semibold text-primary mb-2">{relatedPost.category}</div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {relatedPost.date}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}