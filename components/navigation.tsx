"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/products", 
    label: "Product",
    subLinks: [
      { href: "/products", label: "Pharmaceutical and health care:  API & Excipient" },
      { href: "/products", label: "Personal care and home care :  Active ingredient and Functional ingredient" },
      { href: "/products", label: "Food and Food ingredient: Flour, spice and food additive" },
      { href: "/products", label: "Chemical : water chemical and industrial chemical" },
      { href: "/products", label: "Agro-product : Agriculture product , agro-chemical and animal feed" },
      { href: "/products", label: "Packaging : cosmetic and food packaging" },
    ]
  },
  { 
    href: "/services", 
    label: "Service",
    subLinks: [
      { href: "/services", label: "OEM/ODM" },
      { href: "/services", label: "R&D and Product analysis" },
      { href: "/services", label: "Distribution & Warehousing" },
    ]
  },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      setMobileOpenSection(null);
    }
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-card/95 "
        : "bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
        }`}
    >
      <nav className="mx-auto flex h-[84px] sm:h-[92px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link href="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/farmacosmlogo.png"
            className="w-auto block h-12 sm:h-14 md:h-16 lg:h-20"
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "darken",
            }}
            alt="Logo"
          />
        </Link>


        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => {
                if (link.subLinks) {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                  setOpenDropdown(link.href);
                }
              }}
              onMouseLeave={() => {
                if (link.subLinks) {
                  closeTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown(null);
                  }, 200); // 200ms delay
                }
              }}
            >
              {link.subLinks ? (
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 rounded-lg px-5 py-3 text-base font-semibold transition-colors ${pathname.startsWith(link.href)
                    ? "text-primary"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-5 py-3 text-base font-semibold transition-colors ${pathname === link.href
                    ? "text-primary"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )}
              {link.subLinks && openDropdown === link.href && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) {
                      clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => {
                      setOpenDropdown(null);
                    }, 160);
                  }}
                  className="absolute top-full left-0 mt-1 w-max min-w-64 rounded-lg bg-card/95 backdrop-blur-sm border border-border shadow-lg py-2 z-50"
                >
                  {link.subLinks.map((subLink, index) => (
                    <motion.div
                      key={subLink.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden
    ${scrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10"
            }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-card lg:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
              {navLinks.map((link, i) => (
                <div key={link.href} className="pb-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between gap-3 py-3">
                      {link.subLinks ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setMobileOpenSection(mobileOpenSection === link.href ? null : link.href);
                          }}
                          aria-expanded={mobileOpenSection === link.href}
                          className={`flex-1 text-left text-base font-semibold transition-colors ${mobileOpenSection === link.href || pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                            }`}
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`text-base font-semibold transition-colors ${pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                            }`}
                        >
                          {link.label}
                        </Link>
                      )}
                      {link.subLinks && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setMobileOpenSection(mobileOpenSection === link.href ? null : link.href);
                          }}
                          aria-expanded={mobileOpenSection === link.href}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenSection === link.href ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                  {link.subLinks && mobileOpenSection === link.href && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.25 }}
                      className="ml-3 overflow-hidden px-1 py-1 space-y-1"
                    >
                      {link.subLinks.map((subLink, j) => (
                        <motion.div
                          key={subLink.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + 0.1 + j * 0.05, duration: 0.25 }}
                        >
                          <Link
                            href={subLink.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${pathname === subLink.href
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {subLink.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="mt-3 mb-1 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25"
                >
                  Get a Quote
                </Link>
              </motion.div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
