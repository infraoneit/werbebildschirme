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
            <h1 className="m-0 text-[28px] font-black leading-tight sm:text-[36px] md:text-5xl">
              Werbebildschirme Schweiz –{" "}
              <span className="opacity-95">Digital Signage einfach gemacht</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed sm:text-[18px] md:text-[19px]">
              Sie wollen Inhalte klar präsentieren? <strong>Wir liefern Displays, Player &amp; CMS</strong> –
              einsatzbereit, mit Schweizer Hosting oder lokal ohne Abo. Änderungen jederzeit im Browser.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="#pakete" className="btn btn-primary">
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
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile
                title="🖥️ Displays in allen Formaten"
                text="Indoor, Schaufenster (High-Brightness), Spezialgrössen inkl. Zubehör."
              />
              <InfoTile
                title="📦 Player & CMS inklusive"
                text="Vorlagen, Playlists, Zeitpläne – in Minuten startklar."
              />
              <InfoTile
                title={<>Schweizer Hosting &amp; Webzugriff</>}
                text="Sicher, schnell, skalierbar. Alternativ: lokaler Mini-Server."
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function InfoTile({
  title,
  text,
}: {
  title: React.ReactNode;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white/12 p-4 text-white shadow-inner ring-1 ring-white/20">
      <h3 className="m-0 text-[15.5px] font-bold sm:text-base">{title}</h3>
      <p className="m-0 mt-1 text-[13.5px] sm:text-[14.5px]">{text}</p>
    </div>
  );
}
