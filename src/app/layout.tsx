import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import ToneController from "@/components/ToneController";
import { MotionConfig } from "motion/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  ),
  title: { default: "Pratap Mahalingam | Finance × Data × AI", template: "%s | Pratap Mahalingam" },
  description: "Pratap Mahalingam connects finance, data and intelligence. MBA in AI & Business Analytics; thirteen projects with verified results and code.",
  openGraph: { title: "Pratap Mahalingam | Finance × Data × AI", description: "I connect finance, data & intelligence.", images: ["/og-image.jpg"], type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#07080d", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-tone="dark">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <MotionConfig reducedMotion="user">
          <Preloader />
          <Nav />
          <main id="main">{children}</main>
          <Cursor />
          <SmoothScroll />
          <ToneController />
        </MotionConfig>
      </body>
    </html>
  );
}
