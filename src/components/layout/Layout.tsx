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
      <main className="flex-1 pb-[72px] pt-[92px] lg:pb-0 lg:pt-[104px]">
        {children}
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
