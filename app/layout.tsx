import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Farmacosm - Together for Better",
    template: "%s | Farmacosm",
  },
  description:
    "Farmacosm delivers reliable, sustainable, and cost-effective pharmaceutical, chemical, and food ingredient supply chain solutions in Cambodia and Southeast Asia.",
  keywords: [
    "pharmaceutical supply",
    "chemical supply",
    "Cambodia",
    "healthcare materials",
    "food ingredients",
    "OEM",
    "ODM",
  ],
  charset: "utf-8",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Khmer font support */}
        <link
          href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
