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
  { id: 1, title: "Showroom & Beratung", img: "/images/usecases/usecase1.webp", alt: "Showroom mit Digital-Signage-Display", backTitle: "Angebote live am Produkt zeigen", backText: "Neuheiten, Preise und Aktionen sofort auf Bildschirmen darstellen. Ideal für digitale Werbung im Verkaufsraum. Inhalte zentral steuern – direkt am Produkt sichtbar." },
  { id: 2, title: "Digitale Speisekarten", img: "/images/usecases/usecase2.webp", alt: "Digitale Speisekarten in der Gastronomie", backTitle: "Menüs & Preise sofort ändern", backText: "Tagesmenüs, Allergene oder neue Angebote ohne Druckkosten einpflegen. Werbebildschirme zeigen Inhalte ansprechend und aktuell – ideal für Zusatzverkäufe." },
  { id: 3, title: "Schaufenster & Laden", img: "/images/usecases/usecase3.webp", alt: "Schaufenster mit Display", backTitle: "Angebote klar präsentieren", backText: "Digitale Werbung in Schaufenstern oder im Laden lenkt Aufmerksamkeit auf Produkte. Aktionen/Neuheiten einfach planen und für alle Standorte ausspielen." },
  { id: 4, title: "Empfang & Lobby", img: "/images/usecases/usecase4.webp", alt: "Empfang und Lobby mit Display", backTitle: "Besucher begrüssen & informieren", backText: "Willkommens-Nachrichten, Wegweiser oder Veranstaltungsinfos im Eingangsbereich. Sorgt für einen professionellen ersten Eindruck und entlastet das Personal." },
  { id: 5, title: "Wartebereich", img: "/images/usecases/usecase5.webp", alt: "Wartebereich mit Infodisplay", backTitle: "Aufrufe & Hinweise klar anzeigen", backText: "Patientenaufrufe, Wartezeiten oder Service-Infos deutlich sichtbar. Moderne Boards verbessern Abläufe in Praxen, Kliniken und Apotheken." },
  { id: 6, title: "Öffentliche Informationen", img: "/images/usecases/usecase6.webp", alt: "Öffentliche Informationen auf Display", backTitle: "Bürger-Infos einfach sichtbar", backText: "Öffnungszeiten, Baustellen, Abstimmungen oder Notfallmeldungen zentral steuern und sofort anzeigen. Transparenz & schnelle Information für Gemeinden." },
  { id: 7, title: "Campus & Bildung", img: "/images/usecases/usecase7.webp", alt: "Campus mit Displays", backTitle: "Pläne, Räume & Sicherheit", backText: "Infoboards zeigen Stundenpläne, Raumänderungen, Mensa-Menüs oder Sicherheitshinweise. Erleichtert Orientierung und erhöht die Sicherheit." },
  { id: 8, title: "Outdoor Displays", img: "/images/usecases/usecase8.webp", alt: "Outdoor High-Brightness Display", backTitle: "Wetterfest, hell & verbunden", backText: "Outdoor-Displays: robust, tageslichttauglich, per SIM/4G/5G angebunden. Perfekt für Gemeinden, Events und Handel." },
];

export default function UseCases() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);
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
    <section id="usecases" className="py-10 md:py-14">
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
                  className={`relative w-full h-[56vw] min-h-[260px] max-h-[520px] [transform-style:preserve-3d] [transition:transform_.6s] ${
                    flipped === s.id ? "[transform:rotateY(180deg)]" : ""
                  }`}
                  aria-label={s.title}
                >
                  {/* Front */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl bg-black/5 [backface-visibility:hidden]">
                    <div className="absolute inset-0 grid place-items-center bg-black/80">
                      <img
                        src={s.img}
                        alt={s.alt}
                        className="max-h-full max-w-full object-contain"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                    {/* gut lesbares Label */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="inline-flex items-center rounded-md bg-black/70 px-2.5 py-1.5 text-white backdrop-blur">
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
                  <div className="absolute inset-0 rounded-2xl bg-white p-5 text-slate-800 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="flex h-full flex-col">
                      <h3 className="text-xl font-bold">{s.backTitle}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed">{s.backText}</p>
                      <div className="mt-auto pt-4">
                        <button
                          className="rounded-md border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
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
    </section>
  );
}
