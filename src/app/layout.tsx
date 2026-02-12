import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K-Gem | 0.1% Korea Travel Secret Guide",
  description: "Discover AI-verified authentic local gems and secret spots in Korea known only to 0.1% of locals.",
  keywords: ["Korea Travel", "Seoul Guide", "Local Secrets", "K-Gem", "Travel AI"],
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
