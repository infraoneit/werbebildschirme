"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type OrderPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  shipping: { street: string; zipCity: string; country: string };
  billingSame: boolean;
  billing?: { street: string; zipCity: string; country: string };
  payment: "prepay" | "invoicePublic";
  message?: string;
  summary?: any; // vom Rechner (unsichtbar für Kunde)
};

const chf = (n: number) => `CHF ${n.toLocaleString("de-CH")}`;

export default function OrderPage() {
  const [summary, setSummary] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [billingSame, setBillingSame] = useState(true);
  const [payment, setPayment] = useState<OrderPayload["payment"]>("prepay");

  useEffect(() => {
    try {
      const s = localStorage.getItem("rechnerState");
      if (s) setSummary(JSON.parse(s));
    } catch {}
  }, []);

  const niceSummary = useMemo(() => {
    if (!summary) return null;

    // Totale (falls vorhanden)
    const localOnce = summary?.totals?.localOnce ?? undefined;
    const rentMonthly = summary?.totals?.rentMonthly ?? undefined;
    const rentMonthlyPlayersOnly = summary?.totals?.rentMonthlyPlayersOnly ?? undefined;
    const rentBuyOnce = summary?.totals?.rentBuyOnce ?? undefined;

    return {
      localOnce,
      rentMonthly,
      rentMonthlyPlayersOnly,
      rentBuyOnce,
      rentItems: summary?.rent?.items?.filter((x: any) => x.qty > 0) ?? [],
      ownDisplay: !!summary?.rent?.ownDisplay,
    };
  }, [summary]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);

    const fd = new FormData(e.currentTarget);
    const data: OrderPayload = {
      name: (fd.get("name") as string).trim(),
      email: (fd.get("email") as string).trim(),
      phone: (fd.get("phone") as string).trim(),
      company: (fd.get("company") as string).trim(),
      shipping: {
        street: (fd.get("shipStreet") as string).trim(),
        zipCity: (fd.get("shipZipCity") as string).trim(),
        country: (fd.get("shipCountry") as string).trim() || "Schweiz",
      },
      billingSame,
      billing: billingSame
        ? undefined
        : {
            street: (fd.get("billStreet") as string).trim(),
            zipCity: (fd.get("billZipCity") as string).trim(),
            country: (fd.get("billCountry") as string).trim() || "Schweiz",
          },
      payment,
      message: (fd.get("message") as string).trim(),
      summary, // roh, nur für Mail/PDF
    };

    // Minimal-Validierung
    if (!data.name || !data.email || !data.shipping.street || !data.shipping.zipCity) {
      setMsg("Bitte Pflichtfelder ausfüllen (Name, E-Mail, Lieferadresse).");
      return;
    }
    if (!billingSame && (!data.billing?.street || !data.billing?.zipCity)) {
      setMsg("Bitte Rechnungsadresse vollständig angeben oder 'entspricht Lieferadresse' aktiv lassen.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/.netlify/functions/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMsg("Danke! Ihre Anfrage/Bestellung wurde gesendet. Sie erhalten gleich eine Bestätigung per E-Mail (PDF inkl.).");
      (e.target as HTMLFormElement).reset();
      setBillingSame(true);
      setPayment("prepay");
    } catch {
      setMsg("Senden fehlgeschlagen. Bitte später nochmals versuchen.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-screen-md px-4 py-10 md:px-6">
      <div className="mb-4">
        <Link href="/rechner" className="inline-block rounded-xl border px-3 py-1 text-sm hover:bg-slate-50">← Zurück zum Kostenrechner</Link>
      </div>

      <h1 className="text-3xl font-black">Bestellformular</h1>
      <p className="mt-1 text-slate-600">Bitte füllen Sie die Angaben aus. Wir bestätigen per E-Mail inkl. PDF-Zusammenfassung.</p>

      {/* Kurze, verständliche Zusammenfassung */}
      {niceSummary && (
        <div className="mt-4 rounded-2xl bg-white p-4 shadow">
          <h2 className="m-0 text-lg font-bold">Ihre Auswahl (Kurzfassung)</h2>
          <ul className="mt-2 text-sm text-slate-700">
            {typeof niceSummary.localOnce === "number" && (
              <li>Lokales System (einmalig): <strong>{chf(niceSummary.localOnce)}.–</strong></li>
            )}
            {!niceSummary.ownDisplay && typeof niceSummary.rentMonthly === "number" && (
              <li>Mietmodell (monatlich): <strong>{chf(niceSummary.rentMonthly)}.–</strong></li>
            )}
            {niceSummary.ownDisplay && (
              <li>Mietmodell (eigener Display, Abo): <strong>{chf(niceSummary.rentMonthlyPlayersOnly)}.–/Monat</strong></li>
            )}
            {typeof niceSummary.rentBuyOnce === "number" && niceSummary.rentBuyOnce > 0 && (
              <li>Einmalig Kauf-Displays: <strong>{chf(niceSummary.rentBuyOnce)}</strong></li>
            )}
          </ul>
          {/* Optional: vollständige Positionen aufklappen */}
          {niceSummary.rentItems?.length ? (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm font-semibold">Positionen anzeigen</summary>
              <ul className="mt-2 text-sm text-slate-700">
                {niceSummary.rentItems.map((i: any, idx: number) => (
                  <li key={idx}>{i.qty} × {i.type}</li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      )}

      {/* Formular */}
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Name*</span>
            <input name="name" required className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">E-Mail*</span>
            <input name="email" type="email" required className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Telefon</span>
            <input name="phone" type="tel" className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Firma (optional)</span>
            <input name="company" className="mt-1 w-full rounded-xl border p-2" />
          </label>
        </div>

        {/* Lieferadresse */}
        <div className="mt-2 rounded-2xl bg-white p-4 shadow">
          <h3 className="m-0 text-base font-bold">Lieferadresse</h3>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Strasse & Nr.*</span>
              <input name="shipStreet" required className="mt-1 w-full rounded-xl border p-2" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">PLZ / Ort*</span>
              <input name="shipZipCity" required className="mt-1 w-full rounded-xl border p-2" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Land</span>
              <input name="shipCountry" defaultValue="Schweiz" className="mt-1 w-full rounded-xl border p-2" />
            </label>
          </div>

          {/* Rechnungsadresse Umschalter */}
          <label className="mt-3 flex items-center gap-2">
            <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
            <span>Rechnungsadresse entspricht der Lieferadresse</span>
          </label>

          {!billingSame && (
            <div className="mt-3 rounded-xl border p-3">
              <h4 className="m-0 text-sm font-semibold">Rechnungsadresse</h4>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm">Strasse & Nr.*</span>
                  <input name="billStreet" required className="mt-1 w-full rounded-xl border p-2" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm">PLZ / Ort*</span>
                  <input name="billZipCity" required className="mt-1 w-full rounded-xl border p-2" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm">Land</span>
                  <input name="billCountry" defaultValue="Schweiz" className="mt-1 w-full rounded-xl border p-2" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Zahlungsart */}
        <div className="rounded-2xl bg-white p-4 shadow">
          <h3 className="m-0 text-base font-bold">Zahlungsart</h3>
          <div className="mt-2 grid gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" checked={payment === "prepay"} onChange={() => setPayment("prepay")} />
              <span>Rechnung (Vorauskasse)</span>
            </label>
            <label className="flex items-center gap-2 opacity-70">
              <input type="radio" name="payment" disabled />
              <span>Rechnung 30 Tage (nur für Behörden, auf Anfrage)</span>
            </label>
          </div>
        </div>

        {/* Nachricht */}
        <label className="block">
          <span className="text-sm font-semibold">Bemerkungen (optional)</span>
          <textarea name="message" rows={4} className="mt-1 w-full rounded-xl border p-2" />
        </label>

        <button
          disabled={sending}
          className="mt-1 rounded-xl bg-[#3C9646] px-4 py-2 font-semibold text-white hover:brightness-105 disabled:opacity-60"
        >
          {sending ? "Sendet…" : "Bestellung absenden"}
        </button>
        {msg && <p className="text-sm text-slate-700">{msg}</p>}
      </form>
    </main>
  );
}
