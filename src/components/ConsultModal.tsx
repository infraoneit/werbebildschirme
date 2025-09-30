"use client";

import { useEffect, useState } from "react";

type ConsultPayload = {
  type: "consult";
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    notes?: string;            // freie Nachricht
    slots?: string;            // Terminvorschläge
  };
};

export default function ConsultModal() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
    slots: "",
  });

  // Modal öffnen: per Custom-Event "open-consult" oder via #beratung
  useEffect(() => {
    const openHandler = () => setOpen(true);
    // sauber typisieren statt any:
    window.addEventListener("open-consult" as keyof WindowEventMap, openHandler as EventListener);
    if (typeof window !== "undefined" && window.location.hash === "#beratung") setOpen(true);
    return () => {
      window.removeEventListener("open-consult" as keyof WindowEventMap, openHandler as EventListener);
    };
  }, []);

  function up<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function close() {
    if (!sending) setOpen(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");

    // minimale Validierung
    if (!form.name.trim()) {
      setMsg("Bitte Name angeben.");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMsg("Bitte gültige E-Mail angeben.");
      return;
    }

    const payload: ConsultPayload = {
      type: "consult",
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        company: form.company.trim() || undefined,
        notes: form.notes.trim() || undefined,
        slots: form.slots.trim() || undefined,
      },
    };

    try {
      setSending(true);
      // an deine bestehende Netlify-Function schicken (MS Graph Mail)
      await fetch("/.netlify/functions/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMsg("Danke! Wir melden uns zeitnah mit Terminvorschlägen.");
      // Felder leeren
      setForm({ name: "", email: "", phone: "", company: "", notes: "", slots: "" });
    } catch {
      setMsg("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Beratung anfragen"
      onClick={close}
    >
      <div
        className="max-w-xl w-full rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="m-0 text-xl font-extrabold">Beratung anfragen</h2>
          <button
            type="button"
            className="btn btn-ghost"
            aria-label="Schliessen"
            onClick={close}
            disabled={sending}
          >
            ×
          </button>
        </div>

        <p className="muted mt-1">
          Hinterlasse uns kurz deine Kontaktdaten und Terminvorschläge – wir melden uns.
        </p>

        <form className="grid gap-3 mt-3" onSubmit={onSubmit}>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="font-semibold">Name *</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => up("name", e.target.value)}
                className="input"
              />
            </label>
            <label className="grid gap-1">
              <span className="font-semibold">E-Mail *</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => up("email", e.target.value)}
                className="input"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="font-semibold">Telefon</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => up("phone", e.target.value)}
                className="input"
              />
            </label>
            <label className="grid gap-1">
              <span className="font-semibold">Firma</span>
              <input
                type="text"
                value={form.company}
                onChange={(e) => up("company", e.target.value)}
                className="input"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="font-semibold">Nachricht</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => up("notes", e.target.value)}
              className="input"
              placehol
