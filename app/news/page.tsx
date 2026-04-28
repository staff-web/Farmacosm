import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { NewsPageClient } from "./news-client";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "News & Blog | Farmacosm",
  description: "Latest news, insights, and industry updates from Farmacosm.",
};

export default function NewsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          title="Farmacosm News"
          subtitle="Industry insights and company updates" imageSrc={"/images/blog-pharma.jpg"}        />
        <NewsPageClient />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
