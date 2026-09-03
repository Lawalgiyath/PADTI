import type {Metadata} from 'next';
import { Public_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { Chatbot } from '@/components/chatbot';
import NextTopLoader from 'nextjs-toploader';
import { FirebaseClientProvider } from '@/firebase';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-public-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PADTI - Professional Articulated Driver Training Institute',
  description: 'The global standard for professional heavy vehicle training and employment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${fraunces.variable}`}>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <FirebaseClientProvider>
          <NextTopLoader
            color="hsl(var(--primary))"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
          />
          {children}
          <Chatbot />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
