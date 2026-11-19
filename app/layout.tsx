import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEROLYTICS • Urban Atmospheric Intelligence",
  description: "High-precision urban air quality dynamics, atmospheric particulate intelligence, and environmental health diagnostics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

