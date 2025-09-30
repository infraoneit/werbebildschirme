"use client";
import { useState } from "react";
import Link from "next/link";

function PackageCard({
  title, price, period, features, ctaText, ctaHref, recommended = false,
}: {
  title: string;
  price: string;
  period?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  recommended?: boolean;
}) {
  return (
    <article
      className={[
        "relative flex flex-col rounded-2xl bg-white p-6 shadow",
        recommended ? "ring-2 ring-[#3C9646]" : "",
      ].join(" ")}
    >
      {recommended && (
        <div className="absolute -top-3 left-4 rounded-full bg-[#3C9646] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow">
          Empfohlenes Angebot
        </div>
      )}

      <h3 className="mb-2 text-2xl font-extrabold leading-none text-[#D72027]">{title}</h3>

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-black">{price}</span>
        {period ? <span className="text-sm text-slate-500">{period}</span> : null}
      </div>

      <ul className="mb-5 space-y-2 text-[15px] text-slate-700">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link
          href={ctaHref}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#3C9646] px-4 py-2.5 font-semibold text-white hover:brightness-105"
        >
          {ctaText}
        </Link>
      </div>
    </article>
  );
}

export default function Packages() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onCallbackSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null); setErr(null);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const phoneOk = /^[0-9+()\s-]{7,}$/.test(phone);

    if (name.length < 2 || !phoneOk) {
      setErr("Bitte Name und gültige Telefonnummer eingeben.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@infraone.ch", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Rückruf – Pakete & Preise (werbebildschirme.ch)",
          _template: "table",
          _captcha: "false",
          Name: name,
          Telefon: phone,
          Seite: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error();
      setOk("Danke! Wir rufen Sie innerhalb der nächsten 4 Stunden zurück.");
      form.reset();
    } catch {
      setErr("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="pakete" className="py-12 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-black md:text-4xl">Pakete &amp; Preise</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Transparent und passend für jeden Bedarf. Mietmodell (gehostet), Starter-Paket lokal oder
            Enterprise-Lösungen auf Anfrage.
          </p>
        </div>

        {/* Karten */}
        <div className="grid gap-5 md:grid-cols-3">
          <PackageCard
            title="Starter (lokal)"
            price="CHF 660.–"
            features={[
              "Mini-Server (lokal) & 1 Player",
              "2 personalisierte Vorlagen",
              "1h Einführung inklusive",
              "Eigener Bildschirm möglich",
            ]}
            ctaText="Angebot anfordern"
            ctaHref="/bestellen"  // -> Bestellformular
          />

        <PackageCard
            title="Miete (gehostet)"
            price="ab CHF 59.–"
            period="/Monat"
            features={[
              "Display (Indoor/Outdoor) & Player inklusive",
              "Schweizer Hosting & Webzugriff",
              "Vorlagen, Playlists, Zeitpläne",
              "Vertragslaufzeit 24 Monate",
            ]}
            ctaText="Jetzt mieten"
            ctaHref="/bestellen"  // -> Bestellformular
            recommended
          />

          <PackageCard
            title="Enterprise"
            price="Auf Anfrage"
            features={[
              "Filialnetze, Monitoring, SLAs",
              "Lokal oder gehostet",
              "Integrationen & erweiterte Vorlagen",
              "Individuelle Betreuung",
            ]}
            ctaText="Beratung buchen"
            ctaHref="#"
          />
        </div>

        {/* Hinweis & Link zum Rechner */}
        <div className="mt-6 rounded-2xl bg-white p-4 text-slate-700 shadow">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="m-0">
              <strong>Nichts Passendes dabei?</strong> Stellen Sie sich Ihr individuelles Angebot mit unserem
              Kostenrechner zusammen.
            </p>
            <Link
              href="/rechner"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:bg-slate-50"
            >
              Zum Kostenrechner
            </Link>
          </div>
        </div>

        {/* Fragen zu den Paketen? (nur EIN Block) */}
        <div className="mt-8">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="text-xl font-extrabold">Fragen zu den Paketen?</h3>
            <p className="mt-1 text-slate-700">
              Gerne erklären wir Details zu Displays, Playern, Hosting &amp; Vorlagen. Sie können
              einen <strong>Rückruf</strong> anfordern oder direkt ein{" "}
              <button
                className="underline font-semibold"
                onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}
              >
                kostenloses Beratungsgespräch
              </button>{" "}
              buchen.
            </p>

            {/* Rückruf-Formular */}
            <form className="mt-4 grid gap-3 md:grid-cols-3" onSubmit={onCallbackSubmit}>
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
                pattern="^[0-9+()\s-]{7,}$"
                inputMode="tel"
                placeholder="Telefon*"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C9646]"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-xl bg-[#3C9646] px-4 py-2 font-semibold text-white hover:brightness-105 disabled:opacity-60"
              >
                {sending ? "Senden…" : "Rückruf anfordern"}
              </button>
            </form>

            {ok && <p className="mt-3 text-[#0E7F1C]" aria-live="polite">{ok}</p>}
            {err && <p className="mt-3 text-[#D72027]" aria-live="polite">{err}</p>}

            {/* Zusatzhinweis */}
            <p className="mt-5 text-[15px] text-slate-600">
              Hinweis: <strong>SIM-Karten für Standorte ohne Internet</strong> können Sie direkt bei uns mitbestellen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
