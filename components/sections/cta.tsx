"use client";

import Link from "next/link";
import { FadeUp, ScaleIn } from "@/components/scroll-animations";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <FadeUp>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to partner with us?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-primary-foreground/75">
            Let us help you source high-quality materials for your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-primary-foreground/90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}