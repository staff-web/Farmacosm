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
          subtitle="Our services"
          title="How we work with you."
          description="End-to-end supply chain solutions from product development to regulatory compliance, designed to help your business succeed in the region."
        />
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}
