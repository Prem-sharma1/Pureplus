'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin pages: no Navbar, Footer, padding, or floating widgets
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[116px] lg:pt-[160px]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
