export default function IntroSection() {
  return (
    <section className="bg-slate-50 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="m-0 text-center text-2xl font-black md:text-3xl">
          Alles aus einer Hand – Displays, Software & Hosting
        </h2>
        <p className="mx-auto mt-3 max-w-4xl text-center text-[17px] leading-relaxed text-slate-700">
          <strong>Komplett-Paket von InfraOne:</strong> Bildschirme für jeden Einsatz, fertig eingerichtete Player
          und ein extrem einfaches CMS. Auf Wunsch <strong>gehostet in der Schweiz</strong> – oder lokal bei Ihnen
          ohne Abo. Inhalte ändern Sie in Sekunden direkt im Browser.
        </p>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-3">
          <Feature icon="/window.svg" title="Displays in allen Formaten"
                   text="Indoor, Schaufenster (High-Brightness), Spezialgrössen – inkl. Zubehör." />
          <Feature icon="/file.svg" title="Player & CMS inklusive"
                   text="Vorlagen, Playlists, Zeitpläne – in Minuten startklar. Rollen & Freigaben." />
          <Feature icon="/globe.svg" title="Schweizer Hosting & Webzugriff"
                   text="Sicher, schnell, skalierbar. Alternativ: lokaler Mini-Server bei Ihnen." />
        </div>
      </div>
    </section>
  );
}

function Feature({icon,title,text}:{icon:string;title:string;text:string}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border bg-[--infra-green]/10">
          <img src={icon} alt="" className="h-4 w-4 opacity-90" />
        </span>
        <h3 className="m-0 text-[17px] font-semibold">{title}</h3>
      </div>
      <p className="m-0 text-[15px] leading-relaxed text-slate-700">{text}</p>
    </article>
  );
}
