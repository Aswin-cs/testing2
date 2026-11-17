import type { Metadata } from "next";
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
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}

