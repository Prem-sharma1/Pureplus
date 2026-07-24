import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import RootLayoutClient from '@/components/RootLayoutClient';

export const metadata: Metadata = {
  title: 'Pureplush | Premium Ayurvedic & Natural Wellness Shop',
  description: 'Pureplush brings you premium Ayurvedic, handcrafted skincare powders, luxury soaps, shampoo bars, and natural wellness products designed for ultimate body care.',
  icons: {
    icon: '/Pureplus.png',
    shortcut: '/Pureplus.png',
    apple: '/Pureplus.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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

