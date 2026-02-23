"use client";
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: number;
  title: string;
  img: string;   // .webp-Pfad
  alt: string;
  backTitle: string;
  backText: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Empfang & Lobby",
    img: "/images/usecases/usecase4.webp", // New German Image
    alt: "Empfangsdisplay mit Live-Daten",
    backTitle: "Der erste Eindruck zählt",
    backText: "Begrüssen Sie Ihre Gäste professionell und modern mit einem digitalen Empfangsbildschirm. Zeigen Sie vollautomatisch die nächsten Bus-Abfahrten, das aktuelle Wetter oder die Live-Leistung Ihrer Solaranlage an. Ein smartes Display im Eingangsbereich schafft sofortiges Vertrauen, verkürzt gefühlte Wartezeiten und entlastet Ihr Empfangspersonal spürbar von wiederkehrenden Standardfragen. Setzen Sie auf Innovation, die man sieht."
  },
  {
    id: 2,
    title: "Immobilien & Makler",
    img: "/images/usecases/usecase3.webp", // New German Image
    alt: "Digitales Schaufenster für Immobilien",
    backTitle: "Verkauf rund um die Uhr",
    backText: "Verwandeln Sie Ihr Schaufenster in einen 24/7-Verkäufer. Präsentieren Sie Ihre Immobilien-Exposés hell, bewegt und immer topaktuell auf hochauflösenden Displays. Bewegte Bilder ziehen Blicke magisch an und generieren wertvolle Interessenten, selbst wenn Ihr Büro längst geschlossen ist. Änderungen an Preisen oder Objektstatus sind dank zentraler Steuerung in Sekunden live – ohne teure Aushänge neu drucken zu müssen."
  },
  {
    id: 3,
    title: "Gastronomie & Menü",
    img: "/images/usecases/usecase2.webp", // Placeholder (Restaurant)
    alt: "Digitale Menükarte",
    backTitle: "Appetit auf mehr",
    backText: "Präsentieren Sie Ihre Speisen und Getränke so, dass Ihren Gästen das Wasser im Mund zusammenläuft. Mit digitalen Menüboards wechseln Sie im Handumdrehen vom Mittagsmenü zur Abendkarte, bewerben spontane Specials oder markieren ausverkaufte Gerichte sofort. Brillante Bilder und Animationen steigern nachweislich den Umsatz und machen Lust auf Zusatzverkäufe wie Desserts oder Drinks."
  },
  {
    id: 4,
    title: "KMU & Gewerbe",
    img: "/images/usecases/usecase1.webp", // Placeholder (Retail)
    alt: "Werbebildschirm im Laden",
    backTitle: "Mehr Umsatz am POS",
    backText: "Beeinflussen Sie die Kaufentscheidung genau dort, wo es zählt: am Point of Sale. Zeigen Sie Ihre aktuellen Aktionen, Neuheiten und Angebote direkt im Laden auf brillanten Screens. Bewegte Werbebotschaften verkaufen nachweislich besser als statische Plakate. Planen Sie Ihre Kampagnen bequem im Voraus und steuern Sie Inhalte für alle Filialen zentral per Mausklick – für maximale Verkaufsförderung."
  },
  {
    id: 5,
    title: "Gemeinden & Verwaltung",
    img: "/images/usecases/usecase6.webp", // Placeholder (Municipal)
    alt: "Digitale Amtstafel",
    backTitle: "Infos schnell & papierlos",
    backText: "Modernisieren Sie Ihre Bürgerkommunikation und ersetzen Sie den veralteten Aushangkasten. Veröffentlichen Sie Baugesuche, Einladungen zur Gemeindeversammlung oder wichtige Notfallinformationen sofort digital und gut sichtbar. Das spart nicht nur wertvolle Zeit und laufende Druckkosten, sondern signalisiert Ihren Bürgern auch, dass Ihre Gemeinde transparent, effizient und zukunftsorientiert arbeitet."
  },
  {
    id: 6,
    title: "Mitarbeiter-Infos",
    img: "/images/usecases/usecase7.webp", // New German Image (Needs check)
    alt: "Infoboard im Pausenraum",
    backTitle: "Alle auf dem gleichen Stand",
    backText: "Verbessern Sie die interne Kommunikation mit einem digitalen Schwarzen Brett. Teilen Sie wichtige Kennzahlen, Geburtstage, Schichtpläne oder Sicherheitsunterweisungen direkt im Pausenraum oder in der Produktion. So erreichen Sie effizient auch Mitarbeiter ohne eigenen PC-Arbeitsplatz, vermeiden Informationslücken und stärken nachhaltig das Wir-Gefühl und die Motivation in Ihrem gesamten Unternehmen."
  },
];

export default function UseCases() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Auto-Slide
  useEffect(() => { startAuto(); return stopAuto; }, [index]);
  const startAuto = () => { stopAuto(); timerRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5000); };
  const stopAuto = () => { if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null; } };

  // Swipe
  const startX = useRef(0);
  const isDragging = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => { isDragging.current = true; startX.current = e.clientX; stopAuto(); };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    isDragging.current = false;
    if (dx > 60) prev(); else if (dx < -60) next();
    startAuto();
  };

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const go = (i: number) => setIndex(i);

  return (
    <section id="loesungen" className="py-10 md:py-14 scroll-mt-24">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Anwendungsbereiche</h2>
          <div className="hidden gap-2 sm:flex">
            <button onClick={prev} className="rounded-lg border px-3 py-2 hover:bg-slate-50" aria-label="Zurück">‹</button>
            <button onClick={next} className="rounded-lg border px-3 py-2 hover:bg-slate-50" aria-label="Weiter">›</button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl bg-white p-2 shadow"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)`, touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {slides.map((s) => (
              <figure key={s.id} className="w-full shrink-0 p-2">
                {/* feste responsive Höhe => keine abgeschnittenen Bilder */}
                <div
                  className={`relative w-full h-[56vw] min-h-[260px] max-h-[520px] [transform-style:preserve-3d] [transition:transform_.6s] ${flipped === s.id ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  aria-label={s.title}
                >
                  {/* Front */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl bg-black/5 [backface-visibility:hidden]">
                    <div className="absolute inset-0 grid place-items-center bg-black/80">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setLightbox(s.img); }}
                        className="h-full w-full cursor-zoom-in"
                        aria-label={`${s.title} vergrößern`}
                      >
                        <img
                          src={s.img}
                          alt={s.alt}
                          className="max-h-full max-w-full object-cover"
                          draggable={false}
                          loading="lazy"
                        />
                      </button>
                    </div>
                    {/* gut lesbares Label */}
                    <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                      <div className="inline-flex items-center rounded-md bg-black/70 px-2.5 py-1.5 text-white backdrop-blur pointer-events-auto">
                        <span className="text-[15px] font-semibold">{s.title}</span>
                        <button
                          className="ml-3 rounded bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-white"
                          onClick={(e) => { e.stopPropagation(); setFlipped(s.id); }}
                        >
                          Lesen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 rounded-2xl bg-white p-6 text-slate-800 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                    <div className="flex h-full flex-col">
                      <h3 className="text-xl font-bold">{s.backTitle}</h3>
                      <p className="mt-4 text-[16px] leading-relaxed text-slate-600">{s.backText}</p>
                      <div className="mt-auto pt-6">
                        <button
                          className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                          onClick={(e) => { e.stopPropagation(); setFlipped(null); }}
                        >
                          Zurück
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          {/* Dots */}
          <div className="pointer-events-auto absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Zu Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-slate-900" : "bg-slate-400/60"}`}
              />
            ))}
          </div>

          {/* Pfeile mobil */}
          <div className="absolute inset-y-0 left-1 flex items-center sm:hidden">
            <button onClick={prev} aria-label="Zurück" className="rounded-full bg-white/80 px-2 py-1 shadow hover:bg-white">‹</button>
          </div>
          <div className="absolute inset-y-0 right-1 flex items-center sm:hidden">
            <button onClick={next} aria-label="Weiter" className="rounded-full bg-white/80 px-2 py-1 shadow hover:bg-white">›</button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          tabIndex={-1}
        >
          <img
            src={lightbox}
            alt="Vollbildansicht"
            className="max-h-[95vh] max-w-[95vw] rounded shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white hover:text-slate-300"
            onClick={() => setLightbox(null)}
            aria-label="Schließen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </section>
  );
}
