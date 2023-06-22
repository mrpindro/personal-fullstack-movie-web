import SupabaseProvider from '@/providers/SupabaseProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from '@/providers/userProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Web',
  description: 'By Pindro'
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
