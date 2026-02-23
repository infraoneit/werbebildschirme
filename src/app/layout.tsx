// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ConsultBridge from "@/components/ConsultBridge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Werbebildschirme & Digital Signage Schweiz | Infodisplays | InfraOne",
  description: "Digital Signage Schweiz ohne Abo-Kosten. Werbebildschirme & Infoscreens mit lokalem Betrieb und Live-Daten Integration. Einmalige Investition, schweizweite Installation.",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300">
        {children}
        {/* Öffnet überall das Beratungs-Modal bei Klick auf Elemente mit data-consult */}
        <ConsultBridge />
        <WhatsAppButton />
      </body>
    </html>
  );
}
