import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { NotificationsProvider } from '@/lib/contexts/NotificationsContext';
import Header from '@/components/navigation/Header';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Mavens',
  description: 'Digital Solutions Company',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('next-url') || '';
  const isAuthRoute = pathname.includes('/auth');

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationsProvider>
            {!isAuthRoute && <Header />}
            <main className={!isAuthRoute ? 'pt-20' : ''}>
              {children}
            </main>
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 