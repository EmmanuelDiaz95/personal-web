import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import PageTabs from '@/components/layout/PageTabs';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/data/constants';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE.title,
  description: 'Finance operations leader. Projects and experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="max-w-page mx-auto px-16 max-lg:px-10 max-md:px-5 pt-9 pb-16 min-h-screen">
            <Header />
            <PageTabs />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
