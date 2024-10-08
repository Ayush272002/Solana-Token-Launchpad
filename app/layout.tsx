import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SolanaProvider from '@/components/SolanaProvider';
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Solana Token Launchpad',
  description: 'Create and manage Solana tokens with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0F172A] text-gray-100`}
      >
        <Toaster theme="dark" richColors />
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
