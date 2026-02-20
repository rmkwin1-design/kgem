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
  themeColor: "#6d4e73",
};

import ClientTracker from "@/components/ClientTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={plusJakartaSans.className}>
        <AuthProvider>
          <LanguageProvider>
            <PreferenceProvider>
              <PaymentProvider>
                <ClientTracker />
                {children}
                <Analytics />
              </PaymentProvider>
            </PreferenceProvider>

          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
