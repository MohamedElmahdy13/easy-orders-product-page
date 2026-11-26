import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/layouts/AnnouncementBar';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
