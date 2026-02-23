"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative w-full">
      {/* === HERO MEDIA === */}
      <div className="relative h-[80vh] min-h-[540px] w-full overflow-hidden">
        {/* Desktop: Video */}
        <video
          className="absolute inset-0 hidden h-full w-full object-cover sm:block"
          src="/hero.mp4"
          poster="/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        {/* Mobile: Statisches Bild */}
        <img
          src="/hero.jpg"
          alt="Werbebildschirme in Aktion"
          className="absolute inset-0 block h-full w-full object-cover sm:hidden"
        />

        {/* Dunkles Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.78),rgba(0,0,0,.38)_52%,rgba(0,0,0,.85))]" />

        {/* === HEADLINE + CTAs === */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-screen-xl px-4 text-center text-white md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl bg-black/40 p-6 backdrop-blur-sm sm:p-10">
              <h1 className="m-0 text-[28px] font-black leading-tight sm:text-[36px] md:text-5xl drop-shadow-lg">
                Werbebildschirme Schweiz <br className="hidden md:block" />
                <span className="text-infra-green drop-shadow-xl">Digital Signage perfekt inszeniert.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed sm:text-[18px] md:text-[20px] text-white drop-shadow-md">
                Ihre Botschaft, die ankommt. Ob im Schaufenster, am Empfang oder im Büro – wir bieten <strong>Komplettlösungen aus der Schweiz</strong>. Einfach, zuverlässig und effektiv.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="#preise" className="btn btn-primary">
                  Angebote ansehen
                </Link>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-consult"));
                  }}
                  className="btn btn-secondary"
                >
                  Kostenloses Beratungsgespräch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Weißer Fade zum Content unten */}
        <div className="absolute inset-x-0 bottom-0 z-[15] h-16 bg-gradient-to-t from-slate-50/95 to-transparent" />
      </div>

      {/* === GRÜNER INFOSTREIFEN (ohne Badge-Zeile) === */}
      <div className="relative z-[20] -mt-16 sm:-mt-24 md:-mt-32">
        <div className="w-full bg-[#3C9646] py-6 shadow-xl ring-1 ring-black/10">
          <div className="mx-auto max-w-screen-xl px-4 text-white md:px-6">
            <h2 className="m-0 text-center text-xl font-extrabold md:text-2xl">
              Alles aus einer Hand – Displays, Software &amp; Hosting
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[14.5px] md:text-[16.5px]">
              Komplett-Paket: Displays für jeden Zweck, fertig eingerichtete Player und ein extrem
              einfaches CMS. <strong>Gehostet in der Schweiz</strong> oder lokal bei Ihnen – Inhalte
              ändern Sie jederzeit per Webzugriff.
            </p>

            {/* Kacheln */}
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:text-left gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                  {/* Display Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">Displays & Hardware</h3>
                  <p className="mt-1 text-sm text-white/90 leading-snug">Professionelle Screens (24/7). Hell, robust und langlebig.</p>
                </div>
              </div>

              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:text-left gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                  {/* CMS / Software Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">Software & Content</h3>
                  <p className="mt-1 text-sm text-white/90 leading-snug">Kinderleichte Verwaltung. Vorlagen im eigenen Design inklusive.</p>
                </div>
              </div>

              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:text-left gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                  {/* Swiss Service Icon (Shield/Check) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">Schweizer Service</h3>
                  <p className="mt-1 text-sm text-white/90 leading-snug">Beratung, Installation und Support direkt aus der Schweiz.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


