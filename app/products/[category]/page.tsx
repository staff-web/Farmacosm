import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ProductsCategoryContent } from "./products-category";

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = [
    "pharmaceutical-health-care",
    "personal-care-home-care",
    "food-food-ingredient",
    "chemical",
    "agro-product",
    "packaging",
  ];

  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  const categoryTitle = (params.category || "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${categoryTitle} | Farmacosm Products`,
    description: `Explore our ${categoryTitle} products at Farmacosm.`,
  };
}

export default function ProductCategoryPage({ params }: Props) {
  const categoryTitle = (params.category || "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <PageHero
          imageSrc="/images/pharma-materials.jpg"
          subtitle="Product Category"
          title={categoryTitle}
          description={`Browse our comprehensive ${categoryTitle} products with detailed specifications.`}
        />
        <ProductsCategoryContent category={params.category} />
      </main>
      <Footer />
    </>
  );
}
