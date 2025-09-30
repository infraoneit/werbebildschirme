"use client";
import { useState } from "react";

export default function CallbackForm(){
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setOk(null); setErr(null);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const phoneOk = /^[0-9+()\s-]{7,}$/.test(phone);
    if(name.length < 2 || !phoneOk){ setErr("Bitte Name und gültige Telefonnummer eingeben."); return; }

    setSending(true);
    try{
      const res = await fetch("https://formsubmit.co/ajax/info@infraone.ch", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Rückruf – Displays (werbebildschirme.ch)",
          _template: "table",
          _captcha: "false",
          Name: name,
          Telefon: phone,
          Seite: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const json = await res.json().catch(()=>({}));
      if(!res.ok || (json && json.success === false)) throw new Error();
      setOk("Danke! Wir rufen Sie innerhalb der nächsten 4 Stunden zurück.");
      form.reset();
    } catch {
      setErr("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="m-0 text-xl font-extrabold">Rückruf anfordern</h2>
      <p className="m-0 mt-1 text-slate-700">Wir beraten zu Helligkeit, Einsatzort und Montage.</p>

      <form className="mt-4 grid gap-3 md:grid-cols-3" onSubmit={onSubmit}>
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
          inputMode="tel"
          pattern="^[0-9+()\s-]{7,}$"
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
    </div>
  );
}
