import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesContent } from "./services-new";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Farmacosm offers comprehensive OEM/ODM/R&D services, custom warehousing, and regulatory standards support.",
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          imageSrc="/images/chemical-supply.jpg"
          subtitle="pageHero.services.subtitle"
          title="pageHero.services.title"
          description="pageHero.services.description"
          useTranslation={true}
        />
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}