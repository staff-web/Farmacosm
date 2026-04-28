import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ContactPageClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Farmacosm for product inquiries, quotes, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main className="flex flex-col">
        {/* Hero */}
        <PageHero
          imageSrc="/images/food-ingredients.jpg"
          subtitle="Contact"
          title="Get in touch."
          description="Have a question or need a quote? Reach out and our team will respond within one business day."
        />

        {/* Content Section */}
        <section className="relative bg-background py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ContactPageClient />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
