import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/providers';
import './globals.css';
import { GeistSans } from 'geist/font/sans';

const APP_NAME = 'LCoin';
const APP_DESCRIPTION = 'App by Jared Hernandez';

export const metadata: Metadata = {
  title: 'LCoin',
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
    startupImage: [
      {
        url: '/assets/apple-splash-2048-2732.jpg',
        media:
          'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2732-2048.jpg',
        media:
          'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1668-2388.jpg',
        media:
          'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2388-1668.jpg',
        media:
          'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1536-2048.jpg',
        media:
          'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2048-1536.jpg',
        media:
          'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1668-2224.jpg',
        media:
          'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2224-1668.jpg',
        media:
          'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1620-2160.jpg',
        media:
          'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2160-1620.jpg',
        media:
          'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1290-2796.jpg',
        media:
          'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2796-1290.jpg',
        media:
          'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1179-2556.jpg',
        media:
          'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2556-1179.jpg',
        media:
          'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1284-2778.jpg',
        media:
          'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2778-1284.jpg',
        media:
          'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1170-2532.jpg',
        media:
          'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2532-1170.jpg',
        media:
          'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1125-2436.jpg',
        media:
          'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2436-1125.jpg',
        media:
          'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1242-2688.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2688-1242.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-828-1792.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-1792-828.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-1242-2208.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-2208-1242.jpg',
        media:
          'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-750-1334.jpg',
        media:
          'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-1334-750.jpg',
        media:
          'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/assets/apple-splash-640-1136.jpg',
        media:
          'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/assets/apple-splash-1136-640.jpg',
        media:
          'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },

  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/apple-touch-icon.png' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  keywords: ['lcoin', 'finance', 'nextjs'],
};

export const viewport: Viewport = {
  themeColor: '#000000',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
