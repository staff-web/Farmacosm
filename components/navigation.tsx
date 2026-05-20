"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language-switcher";

// Updated to accept 't' and accurately map your product and service keys
const getNavLinks = (t: (key: string) => string) => [
  { href: "/", label: t("navigation.home") },
  {
    href: "/products",
    label: t("navigation.products"),
    subLinks: [
      { href: "/products?category=pharmaceutical-health-care", label: t("products.categories.pharma") },
      { href: "/products?category=personal-care-home-care", label: t("products.categories.personalCare") },
      { href: "/products?category=food-food-ingredient", label: t("products.categories.food") },
      { href: "/products?category=chemical", label: t("products.categories.chemical") },
      { href: "/products?category=agro-product", label: t("products.categories.agro") },
      { href: "/products?category=packaging", label: t("products.categories.packaging") },
    ],
  },
  {
    href: "/services",
    label: t("navigation.services"),
    // You can apply the same pattern to services if you have translation keys for them!
    subLinks: [
      { href: "/services?service=oem-odm", label: "OEM / ODM" },
      { href: "/services?service=rd", label: "R&D and Product Analysis" },
      { href: "/services?service=warehouse", label: "Distribution & Warehousing" },
    ],
  },
  { href: "/about", label: t("navigation.about") },
  { href: "/news", label: t("navigation.news") },
  { href: "/contact", label: t("navigation.contact") },
];

export function Navigation() {
  const { t } = useLanguage();
  const navLinks = getNavLinks(t); // Dynamically builds translated links on render
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white shadow-md border-b border-slate-100 py-1" 
            : "bg-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center shrink-0">
            <motion.img
              src="/images/farmacosmlogo2.png"
              animate={{ scale: scrolled ? 0.9 : 1 }}
              className="h-[5.5rem] w-auto object-contain  md:h-25 lg:h-28"
              alt="Farmacosm Logo"
            />
          </Link>

          {/* Desktop Links and Language Switcher */}
          <div className="hidden lg:flex lg:gap-x-1 lg:items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div
                  key={link.href}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => {
                    if (link.subLinks) {
                      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                      setOpenDropdown(link.href);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.subLinks) {
                      closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 px-3 py-2 text-[15px] font-bold transition-colors duration-300 ${
                      isActive 
                        ? "text-[#0056b3]" 
                        : scrolled 
                          ? "text-slate-700 hover:text-[#0056b3]" 
                          : "text-white hover:text-white/80"
                    }`}
                  >
                    {link.label}
                    
                    {link.subLinks && (
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-300 ${
                          openDropdown === link.href ? "rotate-180" : ""
                        } ${isActive ? "text-[#0056b3]" : ""}`} 
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#0056b3]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.subLinks && openDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 top-full mt-1 w-72 rounded-xl bg-white p-2 shadow-2xl border border-slate-100 z-50"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0056b3] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {/* Language Switcher - Desktop */}
            <div className="ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-primary/20">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Controls - Menu and Language Switcher */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <div className="scale-75 sm:scale-90">
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors relative z-50 ${
                scrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X className="h-7 w-7 sm:h-8 sm:w-8" /> : <Menu className="h-7 w-7 sm:h-8 sm:w-8" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] lg:hidden"
            />
            
            {/* Full Screen Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[101] w-full bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col min-h-full">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-white">
                  <Link href="/" className="flex items-center shrink-0">
                    <motion.img
                      src="/images/farmacosmlogo2.png"
                      animate={{ scale: scrolled ? 0.9 : 1 }}
                      className="h-[5.5rem] w-auto object-contain md:h-25 lg:h-28"
                      alt="Farmacosm Logo"
                    />
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 -mr-2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-7 w-7 sm:h-8 sm:w-8" />
                  </button>
                </div>
                
                {/* Scrollable Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
                  <div className="flex flex-col gap-y-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const hasSubLinks = !!link.subLinks;
                      const isSectionOpen = mobileOpenSection === link.href;
                      
                      return (
                        <div key={link.href} className="border-b border-slate-100 last:border-0">
                          <div className="flex items-center justify-between py-2">
                            <Link 
                              href={link.href} 
                              onClick={() => !hasSubLinks && setIsOpen(false)}
                              className={`py-3 text-xl sm:text-2xl font-bold tracking-wide transition-colors ${
                                isActive ? "text-[#0056b3]" : "text-slate-800 hover:text-[#0056b3]"
                              }`}
                            >
                              {link.label}
                            </Link>
                            {hasSubLinks && (
                              <button 
                                onClick={() => setMobileOpenSection(isSectionOpen ? null : link.href)}
                                className="p-3 -mr-3 text-slate-500 hover:text-[#0056b3] transition-colors"
                                aria-label={`Toggle ${link.label} submenu`}
                              >
                                <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${isSectionOpen ? "rotate-180" : ""}`} />
                              </button>
                            )}
                          </div>
                          
                          <AnimatePresence>
                            {hasSubLinks && isSectionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col pb-3 pl-3 sm:pl-4 mt-1 border-l-4 border-[#0056b3]/30 space-y-1">
                                  {link.subLinks!.map((sub) => (
                                    <Link 
                                      key={sub.href} 
                                      href={sub.href} 
                                      onClick={() => setIsOpen(false)} 
                                      className="px-3 py-3 text-base sm:text-lg font-medium text-slate-600 hover:text-[#0056b3] hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50">
                  <p className="text-sm text-slate-500 text-center">
                    © Farmacosm - Your Trusted Supply Chain Partner
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}