import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { ProductCategories } from "@/components/sections/product-categories";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhatWeDo />
        <ProductCategories />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
