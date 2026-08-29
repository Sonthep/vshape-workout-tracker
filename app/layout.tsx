import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import "./globals.css";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "V/SHAPE — Workout Tracker",
  description: "โปรแกรมสร้างทรง V ด้วยดัมเบล สำหรับฝึกที่บ้าน",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111827",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <AppHeader />
        {children}
        <BottomNav />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
