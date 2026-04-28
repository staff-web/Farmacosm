import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/sections/page-hero";

interface Props {
  params: {
    service: string;
  };
}

const serviceMap = {
  "oem-odm": {
    title: "OEM/ODM",
    subtitle: "Manufacturing & Design Services",
    description:
      "Complete OEM and ODM manufacturing services from product design to full-scale production.",
    details: [
      "Custom formulation and manufacturing",
      "Scalable production capacity",
      "Quality control and regulatory compliance",
      "End-to-end support from concept to shipment",
    ],
  },
  "r-d-product-analysis": {
    title: "R&D and Product Analysis",
    subtitle: "Research, Development & Testing",
    description:
      "Advanced research and product analysis services to accelerate innovation and ensure product safety.",
    details: [
      "Laboratory testing and validation",
      "Product formulation support",
      "Analytical chemistry and stability studies",
      "Tailored research partnerships for new products",
    ],
  },
  "distribution-warehousing": {
    title: "Distribution & Warehousing",
    subtitle: "Logistics and Storage Solutions",
    description:
      "Secure warehousing and distribution services that keep your products moving safely and efficiently.",
    details: [
      "Temperature-controlled storage",
      "Inventory management and order fulfillment",
      "National and international shipping support",
      "Reliable logistics for the full supply chain",
    ],
  },
};

function formatServiceTitle(service?: string) {
  if (!service) return "Services";
  return serviceMap[service as keyof typeof serviceMap]?.title ?? service;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(serviceMap).map((service) => ({ service }));
}

export function generateMetadata({ params }: Props): Metadata {
  const serviceInfo = serviceMap[params?.service as keyof typeof serviceMap];
  const title = serviceInfo?.title ?? "Farmacosm Services";

  return {
    title: `${title} | Farmacosm Services`,
    description: serviceInfo?.description ?? "Explore Farmacosm services.",
  };
}

export default function ServiceCategoryPage({ params }: Props) {
  const service = params?.service;
  const serviceInfo = service ? serviceMap[service as keyof typeof serviceMap] : undefined;

  if (!serviceInfo) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground">Service not found</h1>
            <p className="mt-4 text-muted-foreground">Please select a valid service from the navigation menu.</p>
            <Link href="/services" className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <PageHero
          imageSrc="/images/hero-lab.jpg"
          subtitle="Service Detail"
          title={serviceInfo.title}
          description={serviceInfo.description}
        />

        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-foreground">{serviceInfo.subtitle}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{serviceInfo.description}</p>

                <div className="mt-8 space-y-4">
                  {serviceInfo.details.map((item) => (
                    <div key={item} className="rounded-3xl bg-white/80 p-5 shadow-sm border border-border">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.16em] text-primary">Farmacosm Services</p>
                  <h3 className="text-xl font-semibold text-foreground">Why choose us?</h3>
                </div>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <li>• Proven experience in pharmaceutical and industrial manufacturing.</li>
                  <li>• Deep regulatory and compliance expertise.</li>
                  <li>• Seamless coordination from formulation to delivery.</li>
                  <li>• Personalized support for every client and product.</li>
                </ul>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Contact our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
