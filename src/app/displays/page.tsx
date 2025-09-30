"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultModal from "@/components/ConsultModal";
import { useState } from "react";

/**
 * Datentyp für einen Display-Eintrag.
 * - pdf   -> öffnet beim Klick das Datenblatt im neuen Tab
 * - thumb -> Vorschaubild (erste PDF-Seite als .webp)
 * - price -> Text, den wir anzeigen (bereits CHF inkl. 8.1 %)
 */
type DisplayItem = {
  key: string;
  title: string;
  teaser: string;
  pdf: string;
  thumb: string;
  price: string;
};

/**
 * Deine 9 Produkte.
 * Wenn ein Bild noch nicht perfekt wirkt: einfach das .webp austauschen.
 */
const DISPLAYS: DisplayItem[] = [
  {
    key: "nsd-3203",
    title: "NSD-3203 – 32\" Android Signage",
    teaser:
      `32" FHD (1920×1080), 500 nits, Android 9.0, 24/7, Wi-Fi/Bluetooth, RS232/LAN, USB, Portrait/Landscape`,
    pdf: "/pdf/NSD-3203_DS_V010_20240318.pdf",
    thumb: "/images/previews/nsd-3203.webp",
    price: "CHF 733.– inkl. 8.1% MwSt."
  },
  {
    key: "nsd-4303",
    title: "NSD-4303 – 43\" Android Signage",
    teaser:
      `43" 4K (3840×2160), 500 nits, Android 9.0, 24/7, Wi-Fi/Bluetooth, RS232/LAN, USB, Portrait/Landscape`,
    pdf: "/pdf/NSD-4303_DS_V010_20240318.pdf",
    thumb: "/images/previews/nsd-4303.webp",
    price: "CHF 1’083.– inkl. 8.1% MwSt."
  },
  {
    key: "nsd-5503",
    title: "NSD-5503 – 55\" Android Signage",
    teaser:
      `55" 4K (3840×2160), 500 nits, Android 9.0, 24/7, Anti-Glare 25%, RS232/LAN, Portrait/Landscape`,
    pdf: "/pdf/NSD-5503_DS_V010_20240318.pdf",
    thumb: "/images/previews/nsd-5503.webp",
    price: "CHF 1’468.– inkl. 8.1% MwSt."
  },
  {
    key: "nsd-6503",
    title: "NSD-6503 – 65\" Android Signage",
    teaser:
      `65" 4K (3840×2160), 500 nits, Android 9.0, 24/7, Anti-Glare 25%, RS232/LAN, Portrait/Landscape`,
    pdf: "/pdf/NSD-6503_DS_V010_20240318.pdf",
    thumb: "/images/previews/nsd-6503.webp",
    price: "CHF 2’710.– inkl. 8.1% MwSt."
  },
  {
    key: "pn-46d2",
    title: "PN-46D2 – 46\" Videowall",
    teaser:
      `46" FHD Videowall, 500 nits, 3.5 mm Bezel, DP/RS232 Daisy-Chain, UniWall bis 15×15`,
    pdf: "/pdf/PN-46D2_DS_V010_20230613.pdf",
    thumb: "/images/previews/pn-46d2.webp",
    price: "CHF 2’936.– inkl. 8.1% MwSt."
  },
  {
    key: "pn-55d3",
    title: "PN-55D3 – 55\" Videowall",
    teaser:
      `55" FHD Videowall, 500 nits, 3.5 mm Bezel, OPS-Slot, 24/7, HeatControl-Sensoren`,
    pdf: "/pdf/PN-55D3_DS_V010_20220124.pdf",
    thumb: "/images/previews/pn-55d3.webp",
    price: "CHF 3’840.– inkl. 8.1% MwSt."
  },
  {
    key: "po-5502",
    title: "PO-5502 – 55\" Outdoor High Brightness",
    teaser:
      `55" FHD Outdoor, 2500 nits, EcoSmart Sensor, Anti-Burn-in™, RS232/IR, 24/7, VESA 600×400`,
    pdf: "/pdf/PO-5502_EB_V021_20211123.pdf",
    thumb: "/images/previews/po-5502.webp",
    price: "CHF 5’647.– inkl. 8.1% MwSt."
  },
  {
    key: "pf-55h",
    title: "PF-55H – 55\" Semi-Outdoor Totem",
    teaser:
      `55" FHD Semi-Outdoor Totem, 700 nits, freistehend, Glasfront (EOL – Restbestand, ca. 12 Stk.)`,
    pdf: "/pdf/PF-55H_DS_PF5H00_V013_20150731.pdf",
    thumb: "/images/previews/pf-55h.webp",
    price: "CHF 3’388.– inkl. 8.1% MwSt."
  },
  {
    key: "osp",
    title: "OSP – Outdoor Screen Protector (32–65\")",
    teaser:
      `Outdoor Screen Protector 32–65", IP65 Front / IP54 Korpus, Heizung/Lüftung, −15…+40 °C, Schloss, Sicherheitsglas`,
    pdf: "/pdf/Datenblatt_OSP_AGNeovo.pdf",
    thumb: "/images/previews/osp.webp",
    price: "Preis auf Anfrage"
  }
];

export default function DisplaysPage() {
  const [rcOk, setRcOk] = useState<string | null>(null);

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        {/* --------- HEADER: Erklärung + CTAs --------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              {/* Text links */}
              <div className="max-w-3xl">
                <h1 className="m-0 text-3xl font-black md:text-4xl">Bildschirme & Modelle</h1>
                <p className="m-0 mt-2 text-slate-700">
                  Hier findest du die wichtigsten Modelle für Digital-Signage in <strong>Retail</strong>, <strong>Empfang</strong>, <strong>Schaufenster</strong>,
                  <strong> Videowalls</strong> und <strong>Outdoor</strong>. Preise in CHF <strong>inkl. 8.1 % MwSt.</strong>.<br />
                  Bestellungen laufen über unseren <em>Kostenrechner</em>: Wähle <strong>Miete</strong> (gehostetes System) oder <strong>Lokales System (Kauf)</strong>,
                  ergänze Player/SIM und schicke die Bestellung ab.
                </p>
              </div>

              {/* Buttons rechts (klar unterscheidbar) */}
              <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row">
                <Link
                  href="/rechner/miete"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center rounded-xl bg-[#3C9646] px-4 py-2 font-semibold text-white hover:brightness-105"
                >
                  Individuelles Angebot berechnen – Mietmodell
                </Link>
                <Link
                  href="/rechner/lokal"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Individuelles Angebot berechnen – Lokales System (Kauf)
                </Link>
              </div>
            </div>

            {/* Kleine Schritt-Erklärung */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <strong>So funktioniert’s:</strong> Modell hier auswählen → <em>Jetzt bestellen</em> öffnet den Kostenrechner im neuen Tab →
              dort <strong>Mengen</strong>, <strong>Abrechnung</strong> (Monat/Jahr oder Kauf) & <strong>Optionen</strong> (Player/SIM) festlegen → <strong>Bestellung absenden</strong>.
            </div>
          </div>
        </section>

        {/* --------- GRID: Kacheln --------- */}
        <section className="py-8 md:py-10">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DISPLAYS.map((d) => (
                <article key={d.key} className="overflow-hidden rounded-2xl bg-white shadow">
                  {/* --- PDF-Thumbnail --- 
                     * Höhe bewusst größer, damit Hochformat-PDFs komplett reinpassen.
                     * object-contain → NICHT zuschneiden.
                     * Oben ein weißer Verlauf (Overlay), um Logos/Balken dezent auszublenden.
                  */}
                  <div className="relative w-full">
                    <a
                      href={d.pdf}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${d.title} – Datenblatt öffnen`}
                      className="block"
                    >
                      <div className="h-72 md:h-80 grid place-items-center overflow-hidden rounded-t-2xl bg-white">
                        <img
                          src={d.thumb}
                          alt={`${d.title} – Vorschau Seite 1`}
                          className="max-h-full max-w-full object-contain p-3"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Overlay: blendet die obersten ~40px weiß aus, damit das große Hersteller-Branding nicht dominiert */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent" />
                      </div>
                    </a>
                  </div>

                  {/* Text + Preis + Button */}
                  <div className="p-4">
                    <h3 className="m-0 text-lg font-extrabold">{d.title}</h3>
                    <p className="m-0 mt-1 text-sm text-slate-700">{d.teaser}</p>
                    <p className="mt-2 font-semibold text-[#3C9646]">{d.price}</p>

                    <div className="mt-3">
                      <Link
                        href="/rechner"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center rounded-xl bg-[#3C9646] px-4 py-2 font-semibold text-white hover:brightness-105"
                      >
                        Jetzt bestellen
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* --------- Rückruf & Beratung (eine Box) --------- */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow">
              <h2 className="m-0 text-xl font-extrabold">Rückruf & Beratung</h2>
              <p className="m-0 mt-1 max-w-3xl text-slate-700">
                Wir helfen bei Größe, Helligkeit (nits), Einsatz (Indoor/Semi-Outdoor/Outdoor), Montage sowie Player (Android/Windows) & CMS (z. B. Xibo).
              </p>

              <form
                className="mt-4 grid gap-3 sm:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
                  const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
                  if (name.length < 2 || phone.length < 5) return;

                  try {
                    await fetch("https://formsubmit.co/ajax/info@infraone.ch", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify({
                        _subject: "Rückruf / Beratung – Displays (werbebildschirme.ch)",
                        _template: "table",
                        _captcha: "false",
                        Name: name,
                        Telefon: phone,
                        Seite: typeof window !== "undefined" ? window.location.href : ""
                      })
                    });
                    form.reset();
                    alert("Danke! Wir melden uns werktags schnellstmöglich.");
                  } catch {
                    alert("Senden fehlgeschlagen. Bitte später erneut versuchen.");
                  }
                }}
              >
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name*"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C9646]"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Telefon*"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C9646]"
                />
                <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#3C9646] px-4 py-2 font-semibold text-white hover:brightness-105"
                  >
                    Rückruf anfordern
                  </button>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Beratungsgespräch buchen
                  </button>
                </div>

                <div className="mt-6">
                  <Link href="/" className="inline-flex rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">
                    ← Zurück zur Startseite
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <ConsultModal />
      <Footer />
    </>
  );
}
