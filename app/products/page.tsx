import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ProductsNewContent } from "./products-new";

export const metadata: Metadata = {
  title: "Products | Farmacosm",
  description:
    "Explore Farmacosm's comprehensive range of pharmaceutical, chemical, and food products with advanced filtering and detailed specifications.",
};

export default function ProductsPage() {
  // Note: Translation hook cannot be used in Server Components
  // This is a layout component, the actual translation happens in ProductsNewContent
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <PageHero
          imageSrc="/images/pharma-materials.jpg"
          subtitle="Product Catalog"
          title="products.title"
          description="products.description"
          useTranslation={true}
        />
        <Suspense fallback={null}>
          <ProductsNewContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
