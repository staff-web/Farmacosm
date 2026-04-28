import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
