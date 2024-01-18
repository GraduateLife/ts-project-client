import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import TopSlogan from '@/components/topSlogan';
import { site_name } from '@/theme/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: site_name,
  description: 'a virtual goods trading platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col flex-center bg-[#FDFDFD]">
          <TopSlogan />
          <Header />
          <section className="lg:px-20 lg:min-h-[700px]">{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
