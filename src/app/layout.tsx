import type {Metadata} from 'next';
import { Anton, Archivo } from 'next/font/google';
import './globals.css';
import { Chatbot } from '@/components/chatbot';
import NextTopLoader from 'nextjs-toploader';
import { FirebaseClientProvider } from '@/firebase';
import { SmoothScrollProvider } from '@/components/experience/smooth-scroll-provider';
import { CustomCursor } from '@/components/experience/custom-cursor';
import { AmbientSound } from '@/components/experience/ambient-sound';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-archivo',
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
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${archivo.variable}`}>
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
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <CustomCursor />
          <AmbientSound />
          <Chatbot />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
