"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ContactPageClient } from "./contact-client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        <PageHero
          imageSrc="/images/food-ingredients.jpg"
          subtitle={t("pageHero.contact.subtitle")}
          title={t("pageHero.contact.title")}
          description={t("pageHero.contact.description")}
        />
        <section className="relative bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContactPageClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}