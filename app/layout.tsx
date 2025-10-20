import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fund Frolic - AI-Powered Grant Finder for Startups",
  description: "Fuel your startup's growth without giving up equity. Our AI Grant Finder instantly matches your project with grants built for for-profits and nonprofits alike.",
  metadataBase: new URL("https://www.fundfrolic.com"),
  keywords: ["grants", "startup funding", "for-profit grants", "nonprofit grants", "AI grant finder", "business grants", "equity-free funding"],
  authors: [{ name: "Fund Frolic" }],
  creator: "Fund Frolic",
  publisher: "Fund Frolic",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fundfrolic.com",
    siteName: "Fund Frolic",
    title: "Fund Frolic - AI-Powered Grant Finder for Startups",
    description: "Fuel your startup's growth without giving up equity. Our AI Grant Finder instantly matches your project with grants built for for-profits and nonprofits alike.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fund Frolic - Fuel Your Startup's Growth Without Giving Up Equity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fund Frolic - AI-Powered Grant Finder for Startups",
    description: "Fuel your startup's growth without giving up equity. Find grants in seconds with AI.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
