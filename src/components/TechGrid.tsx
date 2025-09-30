"use client";
import { useState } from "react";

export default function TechGrid(){
  const tech = [
    {img:"/images/tech1.webp", h:"Software (CMS)", li:["Layouts, Playlists, Zeitpläne","Rollen & Freigaben","Branding, Datenfeeds, Vorlagen"]},
    {img:"/images/tech2.webp", h:"Inhalte & Formate", li:["Bilder, Videos, PDFs, Webseiten/HTML","Live-Infos: Uhrzeit, Wetter, Kalender","Datenquellen: CSV/JSON, Dashboards"]},
    {img:"/images/tech3.webp", h:"Hardware", li:["Miete: Display & Player inklusive","Lokal: Mini-Server + Player","LAN/WLAN, optional SIM/4G/5G"]},
    {img:"/images/tech4.webp", h:"Player-Optionen", li:["Android & Windows (bewährt)","webOS & Tizen (modellabhängig)","Linux (je nach Einsatz)"]},
  ];

  const [lightbox,setLightbox] = useState<string | null>(null);

  return (
    <section id="technik" className="bg-slate-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-3 text-3xl font-black">Wie funktioniert Digital Signage?</h2>

        {/* GIF */}
        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="m-0 text-slate-700">
            Inhalte erstellen Sie im Browser, planen diese und die Player übernehmen automatisch.
            Hosting in der Schweiz (oder lokal), Integrationen z. B. Kalender, Dashboards, Datenbanken.
          </p>
          <div className="mt-3 text-center">
            <img
              src="/how%20digital%20signage%20works.gif"
              alt="Ablauf: Upload → Vorlage → Display"
              className="mx-auto w-full max-w-[960px] rounded-xl"
            />
          </div>
        </div>

        {/* Kacheln */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tech.map(t=>(
            <article key={t.h} className="overflow-hidden rounded-2xl bg-white shadow">
              <button
                type="button"
                onClick={()=>setLightbox(t.img)}
                className="group block h-36 w-full overflow-hidden"
                aria-label={`${t.h} Bild vergrößern`}
              >
                <img src={t.img} alt={t.h} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy"/>
              </button>
              <div className="p-4">
                <h3 className="m-0 text-base font-extrabold text-slate-900">{t.h}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-slate-700">
                  {t.li.map(x=> <li key={x}>{x}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog" aria-modal="true" tabIndex={-1}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={()=>setLightbox(null)}
          onKeyDown={(e)=> e.key==="Escape" && setLightbox(null)}
        >
          <img src={lightbox} alt="Technik-Detailansicht" className="max-h-[90vh] max-w-[92vw] rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}
