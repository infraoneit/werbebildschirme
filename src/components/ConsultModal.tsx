"use client";
import { useEffect, useState } from "react";

export default function ConsultModal() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-consult", openHandler as any);
    if (typeof window !== "undefined" && window.location.hash === "#beratung") setOpen(true);
    return () => window.removeEventListener("open-consult", openHandler as any);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true); setMsg("");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/.netlify/functions/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consult",
          name: data["Name"],
          email: data["E-Mail"],
          phone: data["Telefon"] || "",
          slots: data["Terminvorschläge"],
          page: window.location.href,
          honey: data["_honey"] || ""
        }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setMsg("Danke! Wir melden uns binnen 4 Stunden mit einer Terminbestätigung.");
      (e.target as HTMLFormElement).reset();
    } catch {
      try {
        const res2 = await fetch("https://formsubmit.co/ajax/info@infraone.ch", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "Beratung buchen – werbebildschirme.ch",
            _template: "table",
            _captcha: "false",
            Name: data["Name"],
            EMail: data["E-Mail"],
            Telefon: data["Telefon"] || "",
            Terminvorschlaege: data["Terminvorschläge"],
            Seite: window.location.href,
          }),
        });
        if (!res2.ok) throw new Error();
        setMsg("Danke! Wir melden uns bald mit einer Terminbestätigung.");
        (e.target as HTMLFormElement).reset();
      } catch {
        setMsg("Senden fehlgeschlagen. Bitte später erneut versuchen.");
      }
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-3"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="w-full max-w-[760px] rounded-2xl border bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between border-b pb-2">
          <h3 className="m-0 text-lg font-extrabold">Beratungsgespräch buchen</h3>
          <button className="rounded-lg border px-3 py-1" onClick={() => setOpen(false)} aria-label="Modal schließen">×</button>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm">Name*<br/>
            <input name="Name" required className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="text-sm">E-Mail*<br/>
            <input name="E-Mail" type="email" required className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="text-sm">Telefon<br/>
            <input name="Telefon" className="mt-1 w-full rounded-xl border p-2" />
          </label>
          <label className="text-sm sm:col-span-2">3 Terminvorschläge*<br/>
            <textarea name="Terminvorschläge" required rows={3} className="mt-1 w-full rounded-xl border p-2" placeholder="z. B. Di 10–12, Mi 14–16, Fr 9–11" />
          </label>
          <input type="text" name="_honey" className="hidden" />
          <div className="sm:col-span-2 mt-1 flex gap-2">
            <button disabled={sending} className="btn btn-primary">{sending ? "Sendet…" : "Anfrage senden"}</button>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-secondary">Abbrechen</button>
          </div>
        </form>

        {msg && <p className="mt-3 text-sm text-slate-700">{msg}</p>}
      </div>
    </div>
  );
}
