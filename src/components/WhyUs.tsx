"use client";
import { useState } from "react";

export default function WhyUs() {
  const [lb, setLb] = useState(false);

  const cards = [
    { img: "/images/screen6.webp",  h: "Miete oder lokal – mit/ohne Display", p: "Mietlösungen ab CHF 59.–/Monat mit Display & Player oder lokale Installation ohne Abo – auf Wunsch mit eigenem Display." },
    { img: "/images/screen7.webp",  h: "Personalisierte Anzeige-Vorlagen",   p: "Fixfertige Designs (Menü, Aktionen, Öffnungszeiten, KPI). Inhalte austauschen – fertig." },
    { img: "/images/screen8.webp",  h: "Offline-tauglich & skalierbar",       p: "Lokal weiter ohne Internet. Von 1 bis 100+ Displays – beliebig erweiterbar." },
    { img: "/images/screen9.webp",  h: "Datafeeds & Integrationen",            p: "Kalender, Datenbanken, Websites, Dashboards & mehr – zentral einbinden." }
  ];

  const tableRows = [
    { k: "Schweizer Hosting oder lokal möglich", io: "✓", other: "teilweise" },
    { k: "Display & Player inkl. (Mietmodell)", io: "✓", other: "oft Zusatzkosten" },
    { k: "Vorlagen & Branding enthalten", io: "✓", other: "variabel" },
    { k: "Offline-Playback / Caching", io: "✓", other: "teilweise" },
    { k: "Integration (Kalender, Dashboards, Daten)", io: "✓", other: "limitiert" },
    { k: "Einrichtung vor Ort & Support", io: "✓", other: "selten" },
    { k: "Kostenrechner & transparente Pakete", io: "✓", other: "selten" },
  ];

  return (
    <section id="benefits" className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-black">Warum InfraOne Digital Signage?</h2>

        {/* Kacheln (fein, ohne schwarze/grüne Ränder) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(c=>(
            <article key={c.h} className="overflow-hidden rounded-2xl bg-white shadow">
              <div className="relative h-40 w-full overflow-hidden">
                <img src={c.img} alt={c.h} className="h-full w-full object-cover" loading="lazy"/>
              </div>
              <div className="p-4">
                <h3 className="m-0 text-base font-semibold">{c.h}</h3>
                <p className="m-0 mt-1 text-sm text-slate-700">{c.p}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Vergleich + Bild (rechts klick-zoom) */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl bg-white p-4 shadow">
            <h3 className="m-0 text-lg font-bold">Unser Angebot im Vergleich</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 pr-3 font-semibold">Leistung</th>
                    <th className="py-2 pr-3 font-semibold">InfraOne</th>
                    <th className="py-2 font-semibold">Andere Anbieter</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(r=>(
                    <tr key={r.k} className="border-t border-slate-200/60">
                      <td className="py-2 pr-3">{r.k}</td>
                      <td className="py-2 pr-3 font-semibold text-emerald-700">{r.io}</td>
                      <td className="py-2">{r.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:col-span-1">
            <button
              type="button"
              onClick={()=>setLb(true)}
              className="h-full w-full overflow-hidden rounded-2xl bg-white shadow"
              aria-label="Bild vergrössern"
            >
              <img
                src="/images/screen17.webp"
                alt="Beispiel Digital Signage Installation"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>

      {lb && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={()=>setLb(false)}
          onKeyDown={(e)=> e.key === "Escape" && setLb(false)}
          tabIndex={-1}
        >
          <img
            src="/images/screen17.webp"
            alt="Beispiel Digital Signage Installation"
            className="max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
