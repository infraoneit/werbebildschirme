"use client";

import { useState } from "react";

export type CustomerData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  sameAddr?: boolean;
  sameMail?: boolean;
  notes?: string;
  bill_email?: string;
  bill_street?: string;
  bill_city?: string;
  ship_street?: string;
  ship_city?: string;
};

type OrderFormProps = {
  /** z.B. "monatlich", "jährlich (Voraus, −5 %)" oder "einmalig" */
  intervalText: string;
  /** z.B. "CHF 125.–/Monat" oder "CHF 2’450.–" */
  amountText: string;
  /** wird beim Senden mit den Kundendaten aufgerufen */
  onSubmitPayload: (data: CustomerData) => Promise<void> | void;
};

export default function OrderForm({
  intervalText,
  amountText,
  onSubmitPayload,
}: OrderFormProps) {
  const [data, setData] = useState<CustomerData>({
    name: "",
    email: "",
    sameAddr: true,
    sameMail: true,
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  function up<K extends keyof CustomerData>(key: K, val: CustomerData[K]) {
    setData((p) => ({ ...p, [key]: val }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");

    if (!data.name?.trim()) {
      setErr("Bitte Namen angeben.");
      return;
    }
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setErr("Bitte gültige E-Mail angeben.");
      return;
    }

    try {
      setBusy(true);
      await onSubmitPayload(data);
    } catch (ex) {
      setErr("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="panel grid gap-3" onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="font-semibold">Name *</span>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => up("name", e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="font-semibold">E-Mail *</span>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => up("email", e.target.value)}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="font-semibold">Telefon</span>
          <input
            type="tel"
            value={data.phone ?? ""}
            onChange={(e) => up("phone", e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="font-semibold">Firma</span>
          <input
            type="text"
            value={data.company ?? ""}
            onChange={(e) => up("company", e.target.value)}
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="font-semibold">Adresse</span>
        <input
          type="text"
          placeholder="Strasse, Nr."
          value={data.address ?? ""}
          onChange={(e) => up("address", e.target.value)}
        />
      </label>

      {/* optionale Rechnungs-/Lieferadressen */}
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="font-semibold">Rechnungs-E-Mail</span>
          <input
            type="email"
            value={data.bill_email ?? ""}
            onChange={(e) => up("bill_email", e.target.value)}
            placeholder={data.sameMail ? "(= Bestell-E-Mail)" : ""}
            disabled={data.sameMail}
          />
        </label>

        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!data.sameMail}
              onChange={(e) => up("sameMail", e.target.checked)}
            />
            <span className="text-sm">Rechnungs-E-Mail = Bestell-E-Mail</span>
          </label>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="font-semibold">Rechnungsadresse</span>
          <input
            type="text"
            placeholder="Strasse, Nr."
            value={data.bill_street ?? ""}
            onChange={(e) => up("bill_street", e.target.value)}
            disabled={data.sameAddr}
          />
        </label>
        <label className="grid gap-1">
          <span className="font-semibold">&nbsp;</span>
          <input
            type="text"
            placeholder="PLZ, Ort"
            value={data.bill_city ?? ""}
            onChange={(e) => up("bill_city", e.target.value)}
            disabled={data.sameAddr}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="font-semibold">Lieferadresse</span>
          <input
            type="text"
            placeholder="Strasse, Nr."
            value={data.ship_street ?? ""}
            onChange={(e) => up("ship_street", e.target.value)}
            disabled={data.sameAddr}
          />
        </label>
        <label className="grid gap-1">
          <span className="font-semibold">&nbsp;</span>
          <input
            type="text"
            placeholder="PLZ, Ort"
            value={data.ship_city ?? ""}
            onChange={(e) => up("ship_city", e.target.value)}
            disabled={data.sameAddr}
          />
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!data.sameAddr}
          onChange={(e) => up("sameAddr", e.target.checked)}
        />
        <span className="text-sm">
          Rechnungs- & Lieferadresse gleich / nicht separat angeben
        </span>
      </label>

      <label className="grid gap-1">
        <span className="font-semibold">Bemerkungen</span>
        <textarea
          rows={3}
          value={data.notes ?? ""}
          onChange={(e) => up("notes", e.target.value)}
        />
      </label>

      {err && (
        <p className="error" role="alert">
          {err}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="muted text-sm">
          <strong>Betrag:</strong> {amountText} <span className="opacity-70">({intervalText})</span>
        </div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Senden…" : "Jetzt bestellen"}
        </button>
      </div>
    </form>
  );
}
