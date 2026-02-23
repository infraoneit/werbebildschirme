"use client";
import { useState } from "react";

export default function WhyUs() {
  const [lb, setLb] = useState(false);



  const tableRows = [
    { k: "Schweizer Ansprechpartner", io: "✓", other: "Callcenter" },
    { k: "Keine versteckten Kosten", io: "✓", other: "Oft Zusatzgebühren" },
    { k: "Hardware & Software aus einer Hand", io: "✓", other: "Oft getrennt" },
    { k: "Offline-Ausfallsicherheit", io: "✓", other: "Teilweise" },
    { k: "Vorlagen inklusive", io: "✓", other: "Selten" },
  ];

  return (
    <section id="benefits" className="py-12 scroll-mt-24">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-black">Warum InfraOne Digital Signage?</h2>

        {/* Kacheln (Icons statt Bilder) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow border border-slate-100">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Cloud oder Lokal</h3>
            <p className="mt-2 text-sm text-slate-600">Sie haben die Wahl: Flexibles Abo-Modell (Cloud) oder einmaliger Kauf (Lokal). Volle Kontrolle über Ihre Kosten.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow border border-slate-100">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Läuft immer stabil</h3>
            <p className="mt-2 text-sm text-slate-600">Kein Internet? Kein Problem. Dank Offline-Modus laufen Ihre Inhalte auch bei Netzwerkausfall zuverlässig weiter.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow border border-slate-100">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Fertige Vorlagen</h3>
            <p className="mt-2 text-sm text-slate-600">Nutzen Sie unsere Profi-Layouts. Einfach Logo einfügen, Text anpassen – fertig. Keine Design-Kenntnisse nötig.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow border border-slate-100">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><path d="m4.93 4.93 14.14 14.14" /><path d="m19.07 4.93-14.14 14.14" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Automatische Inhalte</h3>
            <p className="mt-2 text-sm text-slate-600">Zeigen Sie Wetter, Nachrichten, Kalender oder Social Media Feeds automatisch an. Immer aktuell, ohne Aufwand.</p>
          </div>
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
                  {tableRows.map(r => (
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
              onClick={() => setLb(true)}
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
          onClick={() => setLb(false)}
          onKeyDown={(e) => e.key === "Escape" && setLb(false)}
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
