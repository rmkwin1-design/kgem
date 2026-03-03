import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { PreferenceProvider } from "@/context/PreferenceContext";
import { PaymentProvider } from "@/context/PaymentContext";



import { Analytics } from "@vercel/analytics/react";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K-Gem | 0.1% Korea Travel Secret Guide",
  description: "Discover AI-verified authentic local gems and secret spots in Korea. The ultimate alternative to Google Maps for navigating Korea like a local.",
  keywords: ["Korea Travel", "Seoul Guide", "Local Secrets", "K-Gem", "Travel AI", "Naver Map Guide", "Visit Korea 2026"],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  alternates: {
    canonical: "https://kgem.vercel.app/",
    languages: {
      "ko-KR": "https://kgem.vercel.app/?lang=ko",
      "en-US": "https://kgem.vercel.app/?lang=en",
      "ja-JP": "https://kgem.vercel.app/?lang=ja",
    },
  },
  openGraph: {
    title: "K-Gem | 0.1% Korea Travel Secret Guide",
    description: "Navigate Korea like a local. AI-verified hidden gems and seamless navigation guide.",
    url: "https://kgem.vercel.app/",
    siteName: "K-Gem",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#d4af35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import ClientTracker from "@/components/ClientTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="overflow-hidden bg-[var(--bg-dark)] text-white">
      {/* 
        Moved main overflow restraints to fixed body and a scrolling sub-viewer wrapper to kill Safari/Chrome bounce.
        IMPORTANT: Applied hardware paint containment to absolutely lock width to the device.
      */}
      <body className={`${plusJakartaSans.className} fixed inset-0 w-full max-w-[100vw] h-[100dvh] overflow-hidden m-0 p-0 overscroll-none`}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=contactless,map_off,person" />
        <AuthProvider>
          <LanguageProvider>
            <PreferenceProvider>
              <PaymentProvider>
                {/* 
                  #app-clip contains all scrollable content.
                  overscroll-y-none and overscroll-x-none strictly prevent scroll chaining.
                */}
                <div id="app-clip" className="relative w-full max-w-[100vw] h-[100dvh] overflow-y-auto overflow-x-hidden pt-safe pb-safe isolate overscroll-none scroll-smooth">
                  <ClientTracker />
                  {children}
                  <Analytics />
                </div>
              </PaymentProvider>
            </PreferenceProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
