import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const links = {
  company: [
    { href: "/home", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  products: [
    { href: "/products", label: "Pharmaceutical" },
    { href: "/products", label: "Chemical" },
    { href: "/products", label: "Food Ingredients" },
    { href: "/products", label: "Personal Care" },
    { href: "/products", label: "Agro-products" },
    { href: "/products", label: "Packaging" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#0a1628] text-slate-300 border-t border-slate-800 overflow-hidden font-sans">
      
      {/* --- Subtle Animated AI Pattern Background --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ pointerEvents: 'none' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ai-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-pattern)">
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              from="0 0" 
              to="60 60" 
              dur="25s" 
              repeatCount="indefinite" 
            />
          </rect>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        
        {/* Main Grid: 4 Equal Columns for a streamlined single-row layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[220px_1fr_1fr_1fr] items-start">
          
          {/* Column 1: Brand (Logo aligned with other columns) */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <Image 
                src="/images/farmacosmlogo.png"
                width={200}
                height={120}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain brightness-[1.1]"
                alt="Farmacosm Logo"
              />
            </Link>
          
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col">
             <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Company
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-7">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Products
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-7">
              {links.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Contact
            </p>
            <div className="mt-8 flex flex-col gap-4 text-sm leading-7">
              <a
                href="mailto:info@farmacosm.com"
                className="group flex items-center gap-4 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-all group-hover:border-primary/30 group-hover:bg-slate-800">
                  <Mail className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                info@farmacosm.com
              </a>
              <a
                href="tel:+85516329930"
                className="group flex items-center gap-4 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-all group-hover:border-primary/30 group-hover:bg-slate-800">
                  <Phone className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                076 421 0661
              </a>
              <div className="flex items-start gap-4 text-slate-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 mt-0.5">
                  <MapPin className="h-4 w-4 text-slate-500" />
                </div>
                <span className="leading-relaxed">No.B6, Road 01,<br />Russey Keo, Phnom Penh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800/60 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] tracking-[0.35em] text-slate-500 uppercase">
            &copy; {new Date().getFullYear()} Farmacosm. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="hidden h-px w-14 bg-slate-800 sm:block" />
            <p className="text-[10px] font-semibold italic tracking-[0.4em] text-slate-500 uppercase">
              Together for better
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}