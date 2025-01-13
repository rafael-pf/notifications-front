import type { Metadata } from 'next';

import NextAuthSessionProvider from 'providers/sessionProvider';
import { ThemeProvider } from 'components/theme-provider';
import { Toaster } from 'components/ui/toaster';

import { NotificationProvider } from 'contexts/NotificationContext';

import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'A simple boilerplate for next.js',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NotificationProvider>{children}</NotificationProvider>
            <Toaster />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
