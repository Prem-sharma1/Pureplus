import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Pureplush | Premium Ayurvedic & Natural Wellness Shop',
  description: 'Pureplush brings you premium Ayurvedic, handcrafted skincare powders, luxury soaps, shampoo bars, and natural wellness products designed for ultimate body care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-light text-charcoal">
        <Navbar />
        <main className="flex-grow pt-[116px] lg:pt-[160px]">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}

