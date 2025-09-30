// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ConsultBridge from "@/components/ConsultBridge";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.werbebildschirme.ch"),
  title: "Werbebildschirme & Digital Signage Schweiz – mieten ab CHF 59.– | InfraOne IT Solutions",
  description:
    "Schweizweit: Werbebildschirme im Mietmodell ab CHF 59.–/Monat – inkl. Display (Indoor/Outdoor), Player & Schweizer Hosting. Alternativ: lokale Lösung ohne Abo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
        {/* Öffnet überall das Beratungs-Modal bei Klick auf Elemente mit data-consult */}
        <ConsultBridge />
      </body>
    </html>
  );
}
