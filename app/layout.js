import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'VR AR Experience',
  description: 'An augmented reality face-tracking application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Preload critical assets - matched exact URL from VrComponents.js */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-face-aframe.prod.js" as="script" crossOrigin="anonymous" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-face.wasm" as="fetch" type="application/wasm" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
