import type {Metadata} from 'next';
import './globals.css';
import { Chatbot } from '@/components/chatbot';
import NextTopLoader from 'nextjs-toploader';
import { FirebaseClientProvider } from '@/firebase';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <FirebaseClientProvider>
          <NextTopLoader 
            color="hsl(var(--accent))"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--accent)),0 0 5px hsl(var(--accent))"
          />
          {children}
          <Chatbot />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
