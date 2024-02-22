import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import TopSlogan from '@/components/topSlogan';
import { site_name } from '@/theme/constants';
import { TooltipProvider } from '@/theme/ui/tooltip';
import { ReactNode } from 'react';
import { Toaster } from '@/theme/ui/toaster';
import { ModeToggle, ThemeProvider } from '@/theme/themeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: site_name,
  description: 'a virtual goods trading platform',
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster></Toaster>
      </ThemeProvider>
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Wrapper>
          <main className="flex flex-col flex-center bg-[#FDFDFD] dark:bg-slate-800">
            <TopSlogan />
            <Header />
            <section className="lg:px-20 lg:min-h-[700px]">{children}</section>

            <Footer />
          </main>
        </Wrapper>
      </body>
    </html>
  );
}
