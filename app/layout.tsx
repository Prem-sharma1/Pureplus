import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import RootLayoutClient from '@/components/RootLayoutClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pureplush.in'),
  title: 'Pureplush | Natural Personal Care, Soaps, Shampoo Bars & Herbal Powders',
  description: 'Gentle Herbal Hair & Skin Care for Everyday Self-Care. Discover soaps, shampoo bars and herbal powders made with carefully selected botanical ingredients for simple daily routines.',
  keywords: [
    'Pureplush',
    'Handcrafted Soaps',
    'Solid Shampoo Bars',
    'Herbal Powders',
    'Multani Mitti Shampoo Bar',
    'Goat Milk Soap',
    'Facewash Powder',
    'Herbal Facepack',
    'Natural Personal Care India'
  ],
  alternates: {
    canonical: 'https://www.pureplush.in',
  },
  icons: {
    icon: '/Pureplus.png',
    shortcut: '/Pureplus.png',
    apple: '/Pureplus.png',
  },
  openGraph: {
    title: 'Pureplush | Natural Personal Care, Soaps, Shampoo Bars & Herbal Powders',
    description: 'Gentle Herbal Hair & Skin Care for Everyday Self-Care. Discover soaps, shampoo bars and herbal powders made with carefully selected botanical ingredients.',
    url: 'https://www.pureplush.in',
    siteName: 'Pureplush',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pureplush',
    url: 'https://www.pureplush.in',
    logo: 'https://www.pureplush.in/whitepureplus.jpeg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8446816247',
      contactType: 'customer service',
      email: 'info@pureplush.in',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SR NO. 27/2, Near Viman Build, Dhanori',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411015',
      addressCountry: 'IN'
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '768046529349085');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-light text-charcoal">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=768046529349085&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

