export default function CTASection() {
  return (
    <section id="demo" className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="rounded-2xl bg-gradient-to-br from-[--infra-green]/10 to-emerald-50 p-8 shadow text-center md:text-left">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="m-0 text-3xl font-black">Starte jetzt dein Projekt</h2>
              <p className="mt-3 text-lg text-slate-700">
                Lass uns sprechen. In 15 Minuten zeigen wir dir, wie einfach es geht.
                Egal ob ein Display oder hundert.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-consult")); }}
                className="inline-flex items-center justify-center rounded-xl bg-[#3D9646] px-6 py-3.5 text-lg font-bold text-white shadow-lg hover:brightness-105"
              >
                Beratung buchen
              </a>
              <a
                href="tel:+41XXXXXXXXX"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-6 py-3.5 text-lg font-bold text-slate-700 hover:bg-slate-50"
              >
                Anrufen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
