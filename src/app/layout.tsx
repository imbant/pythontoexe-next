import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Python to EXE: Simplify Your Coding Journey!",
  description: "No Tech Background? No Problem! Easily Create Standalone Applications from Your Python Scripts and Share Your Achievements with the World!",
  authors: {
    url: 'https://imbant.github.io/blog/about/',
    name: 'imbAnt',
  },
  keywords: ['python', 'python3', 'exe', 'python to exe', 'application'],
  verification: {
    google: 'A_Xha3lJqdfB-mYDqQ0-P4Ta1ceqnSWWePuZJWYSxC4',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5ER0BJJJZ5"></Script>
      <Script id="googleAnalysis" dangerouslySetInnerHTML={
        {
          __html: `          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-5ER0BJJJZ5');
  `
        }
      }></Script>
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
