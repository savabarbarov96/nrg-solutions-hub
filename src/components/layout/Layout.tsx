import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileCTA } from './MobileCTA';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
