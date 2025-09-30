"use client";

import { useMemo, useState } from "react";

/* ===================== Konfiguration ===================== */
// Display-Modelle (Beispielwerte – einfach anpassen)
type DisplayModelKey =
  | "indoor43"
  | "indoor55"
  | "highBright55"
  | "outdoor55"
  | "stretched37";
type Model = { key: DisplayModelKey; label: string; priceMonthly: number; priceBuy: number };
const MODELS: Model[] = [
  { key: "indoor43", label: "Indoor 43″", priceMonthly: 59, priceBuy: 500 },
  { key: "indoor55", label: "Indoor 55″", priceMonthly: 69, priceBuy: 700 },
  { key: "highBright55", label: "High-Brightness 55″", priceMonthly: 99, priceBuy: 1200 },
  { key: "outdoor55", label: "Outdoor 55″", priceMonthly: 159, priceBuy: 2000 },
  { key: "stretched37", label: "Stretched 37″", priceMonthly: 129, priceBuy: 1600 },
];

// Basispreise lokal
const PRICE_SERVER_PER_SITE = 470; // je Standort (CMS)
const PRICE_PLAYER_LOCAL = 190;    // je Display (Player)
const STARTER_FIX = 660;           // 1 Standort + 1 Display
// SIM
const PRICE_SIM_MONTH = 10;
// Abo (eigener Display)
const PRICE_PLAYER_ABO = 25;

/* ===================== Hilfen / UI ===================== */
const chf = (n: number) => `CHF ${n.toLocaleString("de-CH")}`;

function StepHeader({ step, setStep }: { step: number; setStep: (n: number) => void }) {
  const items = ["Modell", "Displays", "Optionen", "Übersicht", "Bestellung"];
  return (
    <ol className="mb-6 grid grid-cols-5 gap-2 text-sm">
      {items.map((label, idx) => {
        const n = idx + 1;
        const active = n === step;
        const done = n < step;
        return (
          <li key={n}>
            <button
              type="button"
              onClick={() => (done ? setStep(n) : null)}
              className={[
                "flex w-full items-center justify-center gap-2 rounded-2xl border px-3 py-2",
                active
                  ? "border-emerald-600 bg-emerald-50 font-bold"
                  : done
                  ? "border-slate-200 bg-white"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              ].join(" ")}
              aria-current={active ? "step" : undefined}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold">
                {n}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Counter({
  value,
  setValue,
  min = 0,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
      <button
        type="button"
        className="h-10 w-10 rounded-l-full hover:bg-slate-50"
        onClick={() => setValue(Math.max(min, value - 1))}
        aria-label="Wert verringern"
      >
        –
      </button>
      <span className="w-12 text-center font-semibold">{value}</span>
      <button
        type="button"
        className="h-10 w-10 rounded-r-full hover:bg-slate-50"
        onClick={() => setValue(value + 1)}
        aria-label="Wert erhöhen"
      >
        +
      </button>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "flex w-full items-center justify-between rounded-2xl border px-4 py-3",
        checked ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white",
      ].join(" ")}
      aria-pressed={checked}
    >
      <span className="font-medium">{label}</span>
      <span
        className={[
          "relative inline-block h-6 w-11 rounded-full transition",
          checked ? "bg-emerald-600" : "bg-slate-300",
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-0 top-0 h-6 w-6 rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

/* ===================== Seite ===================== */
export default function RechnerWizard() {
  const [step, setStep] = useState(1);

  // Schritt 1: Modell
  const [mode, setMode] = useState<"rent" | "buy" | null>(null);

  // Schritt 2: Displays/Standorte (modellabhängig)
  // Wir verwalten pro Modell eine Menge (für Miete UND optional Kauf im lokalen Modell)
  const [quantities, setQuantities] = useState<Record<DisplayModelKey, number>>({
    indoor43: 1,
    indoor55: 0,
    highBright55: 0,
    outdoor55: 0,
    stretched37: 0,
  });
  const setQty = (key: DisplayModelKey, v: number) =>
    setQuantities((q) => ({ ...q, [key]: Math.max(0, v) }));

  const totalScreens = useMemo(
    () => Object.values(quantities).reduce((s, n) => s + n, 0),
    [quantities]
  );

  const [sites, setSites] = useState(1);

  // Schritt 3: Optionen
  const [simQty, setSimQty] = useState(0);
  const [ownDisplay, setOwnDisplay] = useState(false); // nur Miete: eigener Bildschirm -> Player-Abo

  // Schritt 3 (Miete): Rechnungsintervall
  const [rentInterval, setRentInterval] = useState<"monthly" | "yearly">("monthly");

  // Schritt 5: Formularzustände
  const [formSending, setFormSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [billSameAddr, setBillSameAddr] = useState(true);
  const [billSameEmail, setBillSameEmail] = useState(true);
  const [agree, setAgree] = useState(false);

  /* ===================== Preise berechnen ===================== */
  const rentMonthlyModels = useMemo(() => {
    return MODELS.reduce((sum, m) => sum + m.priceMonthly * (quantities[m.key] || 0), 0);
  }, [quantities]);

  const rentMonthly = useMemo(() => {
    if (mode !== "rent") return 0;
    if (ownDisplay) {
      // eigener Display => nur Player-Abo
      return totalScreens * PRICE_PLAYER_ABO + simQty * PRICE_SIM_MONTH;
    }
    return rentMonthlyModels + simQty * PRICE_SIM_MONTH;
  }, [mode, ownDisplay, rentMonthlyModels, simQty, totalScreens]);

  const rentYearly = rentMonthly * 12;

  const buyOnce = useMemo(() => {
    if (mode !== "buy") return 0;
    const base = sites * PRICE_SERVER_PER_SITE + totalScreens * PRICE_PLAYER_LOCAL;
    const overrideStarter = sites === 1 && totalScreens === 1 ? STARTER_FIX : base;
    const displays = MODELS.reduce((s, m) => s + m.priceBuy * (quantities[m.key] || 0), 0);
    return overrideStarter + displays;
  }, [mode, sites, totalScreens, quantities]);

  /* ===================== Submit ===================== */
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);

    const fd = new FormData(e.currentTarget);
    // Pflichtfelder
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const shipStreet = (fd.get("shipStreet") as string)?.trim();
    const shipZipCity = (fd.get("shipZipCity") as string)?.trim();

    if (!name || !email || !shipStreet || !shipZipCity) {
      setMsg("Bitte Name, E-Mail und Lieferadresse ausfüllen.");
      return;
    }
    if (!agree) {
      setMsg("Bitte AGB akzeptieren.");
      return;
    }

    const payload = {
      mode,
      rentInterval,
      items: quantities,
      sites,
      simQty,
      ownDisplay,
      totals: {
        rentMonthly,
        rentYearly,
        buyOnce,
      },
      customer: {
        name,
        email,
        phone,
        company: (fd.get("company") as string)?.trim(),
      },
      shipping: {
        street: shipStreet,
        zipCity: shipZipCity,
        country: (fd.get("shipCountry") as string) || "Schweiz",
      },
      billing: billSameAddr
        ? "same-as-shipping"
        : {
            street: (fd.get("billStreet") as string)?.trim(),
            zipCity: (fd.get("billZipCity") as string)?.trim(),
            country: (fd.get("billCountry") as string) || "Schweiz",
          },
      billingEmail: billSameEmail ? email : (fd.get("billEmail") as string)?.trim(),
      message: (fd.get("message") as string)?.trim(),
    };

    // einfache Prüfung der alternativen Felder
    if (!billSameAddr) {
      if (!payload.billing || typeof payload.billing === "string") {
        setMsg("Bitte Rechnungsadresse vollständig eingeben oder „= Lieferadresse“ aktivieren.");
        return;
      }
      if (!payload.billing.street || !payload.billing.zipCity) {
        setMsg("Bitte Rechnungsadresse vollständig eingeben.");
        return;
      }
    }
    if (!billSameEmail) {
      if (!payload.billingEmail) {
        setMsg("Bitte Rechnungs-E-Mail eingeben oder „= Bestell-E-Mail“ aktivieren.");
        return;
      }
    }

    setFormSending(true);
    try {
      // Netlify Function (baust du in /.netlify/functions/order)
      const res = await fetch("/.netlify/functions/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setMsg("Danke! Wir haben Ihre Bestellung/Anfrage erhalten. Bestätigung folgt per E-Mail.");
      (e.currentTarget as HTMLFormElement).reset();
      setAgree(false);
    } catch {
      setMsg("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setFormSending(false);
    }
  }

  /* ===================== Render ===================== */
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-center text-4xl font-black">Kostenrechner</h1>
      <p className="mb-6 text-center text-slate-600">
        In 5 Schritten zur Offerte/Bestellung – klar, schnell, verständlich.
      </p>

      <StepHeader step={step} setStep={setStep} />

      {/* STEP 1: Modell */}
      {step === 1 && (
        <section className="grid gap-4 sm:grid-cols-2">
          <button
            className={`rounded-3xl border-2 p-6 text-left shadow transition hover:shadow-md ${
              mode === "rent" ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"
            }`}
            onClick={() => {
              setMode("rent");
              setStep(2);
            }}
          >
            <h2 className="m-0 text-2xl font-extrabold">Miete</h2>
            <p className="mt-1 text-slate-600">Mit Display & Player. Ab CHF 59.–/Monat.</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              <li>Wartung & Hosting inklusive</li>
              <li>Monatlich oder jährlich (Vorauszahlung)</li>
            </ul>
          </button>
          <button
            className={`rounded-3xl border-2 p-6 text-left shadow transition hover:shadow-md ${
              mode === "buy" ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"
            }`}
            onClick={() => {
              setMode("buy");
              setStep(2);
            }}
          >
            <h2 className="m-0 text-2xl font-extrabold">Kauf (lokal)</h2>
            <p className="mt-1 text-slate-600">Einmalig. Starter ab CHF 660.–</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              <li>CMS-Server vor Ort</li>
              <li>Player pro Display</li>
              <li>Optional Displays kaufen</li>
            </ul>
          </button>
        </section>
      )}

      {/* STEP 2: Displays/Modelle */}
      {step === 2 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold">
              {mode === "rent" ? "Displays auswählen (Miete)" : "Displays & Standorte"}
            </h2>
            <div className="text-slate-600">
              Gesamt-Displays: <strong>{totalScreens}</strong>
            </div>
          </div>

          {mode === "buy" && (
            <div className="mb-4">
              <label className="block rounded-2xl border border-slate-200 bg-white p-4">
                <span className="text-sm font-semibold">Anzahl Standorte (je 1 CMS-Server)</span>
                <div className="mt-2">
                  <Counter value={sites} setValue={setSites} min={1} />
                </div>
              </label>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-lg font-bold">{m.label}</div>
                <div className="mt-1 text-sm text-slate-600">
                  {mode === "rent" ? (
                    <>Miete: <strong>{chf(m.priceMonthly)}</strong>/Monat</>
                  ) : (
                    <>
                      Kauf: <strong>{chf(m.priceBuy)}</strong>
                    </>
                  )}
                </div>
                <div className="mt-3">
                  <Counter
                    value={quantities[m.key]}
                    setValue={(v) => setQty(m.key, v)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Zurück
            </button>
            <button
              className="btn-primary"
              onClick={() => setStep(3)}
              disabled={totalScreens < 1 || (mode === "buy" && sites < 1)}
            >
              Weiter
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: Optionen */}
      {step === 3 && (
        <section className="grid gap-4">
          <h2 className="text-2xl font-extrabold">Optionen</h2>

          {mode === "rent" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Toggle
                checked={rentInterval === "yearly"}
                onChange={(v) => setRentInterval(v ? "yearly" : "monthly")}
                label="Jährliche Rechnung (12 Monate im Voraus)"
              />
              <Toggle
                checked={ownDisplay}
                onChange={setOwnDisplay}
                label="Ich habe eigene Displays (nur Player-Abo)"
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block rounded-2xl border border-slate-200 bg-white p-4">
              <span className="text-sm font-semibold">SIM-Karten (4G/5G)</span>
              <div className="mt-2 flex items-center justify-between">
                <Counter value={simQty} setValue={setSimQty} />
                <span className="text-sm text-slate-600">{chf(PRICE_SIM_MONTH)}/Monat je SIM</span>
              </div>
            </label>
          </div>

          <div className="mt-6 flex justify-between">
            <button className="btn-secondary" onClick={() => setStep(2)}>
              Zurück
            </button>
            <button className="btn-primary" onClick={() => setStep(4)}>
              Weiter
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: Übersicht */}
      {step === 4 && (
        <section className="grid gap-4">
          <h2 className="text-2xl font-extrabold">Übersicht</h2>

          <div className="rounded-3xl border-l-4 border-emerald-600 bg-white p-5 shadow">
            {mode === "rent" ? (
              <>
                <div className="text-xl font-bold">
                  {rentInterval === "monthly"
                    ? <>Monatskosten: {chf(rentMonthly)}.–</>
                    : <>Jahreskosten (Vorauszahlung): {chf(rentYearly)}.–</>}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {ownDisplay ? "Player-Abo (eigene Displays)" : "Display-Miete"} • SIM: {simQty} × {chf(PRICE_SIM_MONTH)}/Monat
                </p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold">Einmalig: {chf(buyOnce)}.–</div>
                <p className="mt-1 text-sm text-slate-600">
                  {sites} Standort(e) • {totalScreens} Display(s) • inkl. Server & Player • Displays (Kauf) nach Auswahl
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="btn-secondary" onClick={() => setStep(3)}>
              Zurück
            </button>
            <button className="btn-primary" onClick={() => setStep(5)}>
              Weiter
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: Formular */}
      {step === 5 && (
        <section className="grid gap-4">
          <h2 className="text-2xl font-extrabold">Bestellung</h2>

          <form onSubmit={submit} className="grid gap-4">
            {/* Kontakt */}
            <div className="rounded-2xl bg-white p-4 shadow">
              <h3 className="m-0 text-lg font-bold">Kontakt</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Name*</span>
                  <input name="name" required className="input" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">E-Mail*</span>
                  <input name="email" type="email" required className="input" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Telefon</span>
                  <input name="phone" type="tel" className="input" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Firma</span>
                  <input name="company" className="input" />
                </label>
              </div>
            </div>

            {/* Lieferadresse */}
            <div className="rounded-2xl bg-white p-4 shadow">
              <h3 className="m-0 text-lg font-bold">Lieferadresse</h3>
              <div className="mt-3 grid gap-3">
                <label className="block">
                  <span className="text-sm font-semibold">Strasse & Nr.*</span>
                  <input name="shipStreet" required className="input" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">PLZ / Ort*</span>
                  <input name="shipZipCity" required className="input" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Land</span>
                  <input name="shipCountry" defaultValue="Schweiz" className="input" />
                </label>
              </div>
            </div>

            {/* Rechnungsadresse */}
            <div className="rounded-2xl bg-white p-4 shadow">
              <h3 className="m-0 text-lg font-bold">Rechnungsadresse & -E-Mail</h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Toggle
                  checked={billSameAddr}
                  onChange={setBillSameAddr}
                  label="Rechnungsadresse = Lieferadresse"
                />
                <Toggle
                  checked={billSameEmail}
                  onChange={setBillSameEmail}
                  label="Rechnungs-E-Mail = Bestell-E-Mail"
                />
              </div>

              {!billSameAddr && (
                <div className="mt-3 grid gap-3">
                  <label className="block">
                    <span className="text-sm font-semibold">Rechnungs-Strasse & Nr.*</span>
                    <input name="billStreet" required className="input" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold">Rechnungs-PLZ / Ort*</span>
                    <input name="billZipCity" required className="input" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold">Rechnungs-Land</span>
                    <input name="billCountry" defaultValue="Schweiz" className="input" />
                  </label>
                </div>
              )}

              {!billSameEmail && (
                <div className="mt-3">
                  <label className="block">
                    <span className="text-sm font-semibold">Rechnungs-E-Mail*</span>
                    <input name="billEmail" type="email" required className="input" />
                  </label>
                </div>
              )}
            </div>

            {/* Intervallhinweis bei Miete */}
            {mode === "rent" && (
              <div className="rounded-2xl bg-white p-4 shadow">
                <h3 className="m-0 text-lg font-bold">Rechnung</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Intervall: <strong>{rentInterval === "monthly" ? "monatlich" : "jährlich (Vorauszahlung)"}</strong>
                </p>
                <p className="text-sm text-slate-600">
                  Betrag:{" "}
                  <strong>
                    {rentInterval === "monthly" ? `${chf(rentMonthly)} / Monat` : `${chf(rentYearly)} / Jahr`}
                  </strong>
                </p>
              </div>
            )}

            {/* Nachricht + AGB */}
            <div className="rounded-2xl bg-white p-4 shadow">
              <h3 className="m-0 text-lg font-bold">Bemerkungen</h3>
              <textarea name="message" rows={4} className="mt-3 w-full rounded-2xl border border-slate-300 p-3" />
              <label className="mt-3 flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  Ich akzeptiere die <a href="/agb" className="underline">AGB</a>.
                </span>
              </label>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <button type="button" className="btn-secondary" onClick={() => setStep(4)}>
                Zurück
              </button>
              <button
                disabled={formSending}
                className="btn-primary"
              >
                {formSending ? "Sendet…" : "Bestellung absenden"}
              </button>
            </div>

            {msg && <p className="text-sm text-slate-700">{msg}</p>}
          </form>
        </section>
      )}

      {/* Sticky Footer-Navi für große Bildschirme optional weglassen */}
    </main>
  );
}

/* ===================== Tailwind Utility Aliase ===================== */
const baseBtn =
  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-bold transition";
const primary =
  "bg-[#3C9646] text-white shadow hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-emerald-200";
const secondary =
  "border border-slate-200 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200";

function BtnClassJoin(...parts: string[]) {
  return parts.join(" ");
}

// Easy classes for JSX
const btnPrimary = BtnClassJoin(baseBtn, primary);
const btnSecondary = BtnClassJoin(baseBtn, secondary);

// expose as class names
const _ = {
  btnPrimary,
  btnSecondary,
};

// little mapping to classNames in JSX (avoid TS error)
declare global {
  interface Window {}
}
;(globalThis as any).btn = _;
