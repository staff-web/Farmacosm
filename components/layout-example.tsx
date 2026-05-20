'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import React, { Suspense } from 'react';

/**
 * Example: Updated app layout with LanguageProvider
 * Replace the existing layout.tsx with this version
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: LanguageProvider must be added in your actual layout.tsx
  // Wrap your content with LanguageProvider
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add Khmer font support */}
        <link
          href="https://fonts.googleapis.com/css2?family=Battambang&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Wrap with LanguageProvider */}
        {/* <LanguageProvider>
          {children}
        </LanguageProvider> */}
      </body>
    </html>
  );
}
