"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./rechner.css";
import Stepper from "./components/Stepper";
import Toggle from "./components/Toggle";
import Counter from "./components/Counter";
import ModelCard from "./components/ModelCard";
import CostBox from "./components/CostBox";
import OrderForm from "./components/OrderForm";
import {
  CLOUD_MODELS,
  BUY_MODELS,
  MODEL_IMAGES,
  MODEL_PDFS,
  chf,
  PRICE_PLAYER_CLOUD,
  PRICE_PLAYER_LOCAL,
  PRICE_CMS_MONTH,
  PRICE_SIM_MONTH,
  PRICE_SERVER_UNIT,
  YEARLY_DISCOUNT,
} from "./lib/pricing";
import { DisplayKey, Interval } from "./lib/types";

type Mode = "cloud" | "local";
type Step = 1 | 2 | 3 | 4 | 5;

type CustomerData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  sameAddr?: boolean;
  sameMail?: boolean;
  notes?: string;
};

type OrderPayload = {
  type: Mode;
  interval?: Interval;
  servers?: number;
  players?: number;
  simQty: number;
  qty: Record<DisplayKey, number>;
  pricing: {
    monthlyTotal?: number;
    yearlyTotal?: number;
    hardwareOnce: number;
    cmsMonthly?: number;
    simMonthly: number;
    serverOnce?: number;
    playerOnce?: number;
    displaysBuyOnce?: number;
  };
  customer: CustomerData;
};

export default function RechnerPage() {
  const [mode, setMode] = useState<Mode>("cloud");
  const [step, setStep] = useState<Step>(1);
  const [err, setErr] = useState<string>("");

  // --- Cloud State ---
  const [interval, setInterval] = useState<Interval>("monthly");

  // --- Local State ---
  const [servers, setServers] = useState(1);
  const [players, setPlayers] = useState(1);

  // --- Shared State ---
  const [qty, setQty] = useState<Record<DisplayKey, number>>({
    indoor43: 0, indoor55: 0, indoor65: 0,
    outdoor43: 0, outdoor55: 0, outdoor75: 0,
    stretched37: 0, videowall55: 0, totem55: 0,
  });
  const [simQty, setSimQty] = useState(0);

  // --- Calculations ---
  const totalScreens = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);

  // Cloud Calc
  const hardwareDisplaysCloud = useMemo(() =>
    CLOUD_MODELS.reduce((s, m) => s + (qty[m.key] || 0) * m.priceBuy, 0),
    [qty]);
  const hardwarePlayersCloud = totalScreens * PRICE_PLAYER_CLOUD;
  const hardwareOnceCloud = hardwareDisplaysCloud + hardwarePlayersCloud;

  const cmsMonthly = totalScreens * PRICE_CMS_MONTH;
  const simMonthlyVal = simQty * PRICE_SIM_MONTH;
  const monthlyRecurring = cmsMonthly + simMonthlyVal;
  const yearlyRecurring = (cmsMonthly * 12 * (1 - YEARLY_DISCOUNT)) + (simMonthlyVal * 12);

  // Local Calc
  const displaysBuyOnceLocal = useMemo(
    () => BUY_MODELS.reduce((s, m) => s + (qty[m.key] || 0) * m.priceBuy, 0),
    [qty]
  );
  const serverOnce = servers * PRICE_SERVER_UNIT;
  const onceTotalLocal = serverOnce + displaysBuyOnceLocal;

  // --- Display Logic ---
  const showMonthly = interval === "monthly";
  const isCloud = mode === "cloud";

  // CostBox Lines
  const costLines = isCloud
    ? [
      { k: "Hardware (einmalig)", v: chf(hardwareOnceCloud) },
      showMonthly
        ? { k: "Abo (monatlich)", v: `${chf(monthlyRecurring)}/Mon.` }
        : { k: "Abo (jährlich)", v: `${chf(yearlyRecurring)}/Jahr` }
    ]
    : [
      { k: `CMS-Server × ${servers}`, v: chf(serverOnce) },
      { k: "Displays (Kauf)", v: chf(displaysBuyOnceLocal) },
    ];

  const costAmount = isCloud
    ? (showMonthly
      ? `${chf(hardwareOnceCloud)} + ${chf(monthlyRecurring)}/Mon.`
      : `${chf(hardwareOnceCloud)} + ${chf(yearlyRecurring)}/Jahr`)
    : `${chf(onceTotalLocal)} (einmalig)`;


  function next(to: Step) {
    setErr("");
    if (to === 3 && isCloud && totalScreens < 1) {
      setErr("Bitte mindestens ein Display wählen.");
      return;
    }
    if (to === 3 && !isCloud && servers < 1) {
      setErr("Bitte gültige Kapazität wählen.");
      return;
    }
    setStep(to);
  }

  // --- Overview Lines ---
  const lines = useMemo(() => {
    const L: { label: string; qty?: number; price?: number; total?: number }[] = [];

    if (isCloud) {
      // Cloud Hardware
      CLOUD_MODELS.forEach((m) => {
        const q = qty[m.key] || 0;
        if (q > 0) L.push({ label: `${m.label} (Hardware)`, qty: q, price: m.priceBuy, total: q * m.priceBuy });
      });
      if (totalScreens > 0) {
        L.push({ label: "Player (Hardware)", qty: totalScreens, price: PRICE_PLAYER_CLOUD, total: hardwarePlayersCloud });
      }
      // Cloud Software
      if (totalScreens > 0) {
        L.push({ label: "CMS-Lizenz (Abo)", qty: totalScreens, price: PRICE_CMS_MONTH, total: cmsMonthly });
      }
    } else {
      // Local Hardware
      L.push({ label: `CMS-Server (Lokal)`, qty: servers, price: PRICE_SERVER_UNIT, total: serverOnce });
      BUY_MODELS.forEach((m) => {
        const q = qty[m.key] || 0;
        if (q > 0) L.push({ label: `${m.label} (Kauf)`, qty: q, price: m.priceBuy, total: q * m.priceBuy });
      });
    }

    return L;
  }, [isCloud, qty, totalScreens, hardwarePlayersCloud, cmsMonthly, servers, serverOnce]);


  async function sendOrder(payload: OrderPayload) {
    await fetch("/.netlify/functions/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Danke! Wir melden uns mit einer Bestätigung.");
  }

  return (
    <main className="rechner bg-slate-50 min-h-screen transition-colors duration-300">
      <div className="wrap py-8 px-4 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6 gap-2">
          <Link href="/" className="btn btn-ghost">← Zurück zur Website</Link>
          <Link href="/displays/" target="_blank" rel="noopener" className="btn btn-ghost">Displays ansehen</Link>
        </div>

        <h1 className="heading text-3xl font-black mb-2">Kostenschätzer</h1>
        <p className="muted mb-6">
          Wähle dein Modell: <strong>Cloud</strong> (einfach, Abo) oder <strong>Lokal</strong> (Kauf, eigener Server).
        </p>

        {/* --- Mode Switcher --- */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setMode("cloud"); setStep(1); }}
            className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all ${mode === "cloud"
              ? "border-[#3D9646] bg-emerald-50/50 ring-2 ring-[#3D9646]"
              : "border-slate-200 bg-white hover:border-[#3D9646]"
              }`}
          >
            <div className="font-bold text-lg">Cloud-Lösung</div>
            <div className="text-sm text-slate-600">Hardware Kauf + CMS-Abo. Zentral verwaltbar.</div>
          </button>
          <button
            onClick={() => { setMode("local"); setStep(1); }}
            className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all ${mode === "local"
              ? "border-[#3D9646] bg-emerald-50/50 ring-2 ring-[#3D9646]"
              : "border-slate-200 bg-white hover:border-[#3D9646]"
              }`}
          >
            <div className="font-bold text-lg">Lokale Lösung</div>
            <div className="text-sm text-slate-600">Hardware + Server Kauf. Keine monatlichen Kosten.</div>
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <Stepper
              steps={isCloud ? ["Abrechnung", "Displays", "Übersicht", "Bestellung"] : ["Kapazität", "Displays", "Übersicht", "Bestellung"]}
              active={step}
              goto={(n: number) => setStep(n as Step)}
            />
            {err && <p className="error mt-2 text-red-600 font-bold">{err}</p>}

            {/* --- STEP 1: Cloud (Abrechnung) vs Local (Kapazität) --- */}
            {step === 1 && (
              <section className="grid gap-4 mt-4">
                {isCloud ? (
                  <>
                    <h2 className="text-xl font-extrabold m-0">Abrechnung (Software)</h2>
                    <div className="panel grid sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <Toggle
                        label="Monatlich"
                        checked={interval === "monthly"}
                        onChange={() => setInterval("monthly")}
                      />
                      <Toggle
                        label="Jährlich (Voraus, −5 %)"
                        checked={interval === "yearly"}
                        onChange={() => setInterval("yearly")}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-extrabold m-0">Kapazität</h2>
                    <div className="panel bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <p className="muted text-sm mb-4">Server-Einheiten frei wählbar.</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <label> CMS-Server (à CHF {PRICE_SERVER_UNIT})
                          <div className="mt-2">
                            <Counter value={servers} onChange={(v) => setServers(Math.max(1, v))} min={1} />
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-end">
                  <button className="btn btn-primary" onClick={() => next(2)}>Weiter</button>
                </div>
              </section>
            )}

            {/* --- STEP 2: Displays --- */}
            {step === 2 && (
              <section className="grid gap-4 mt-4">
                <h2 className="text-xl font-extrabold m-0">Displays</h2>
                <p className="muted text-sm">
                  {isCloud
                    ? "Player sind im Display integriert (keine Zusatzkosten)."
                    : "Wähle hier die Displays (optional)."}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(isCloud ? CLOUD_MODELS : BUY_MODELS).map((m) => (
                    <ModelCard
                      key={m.key}
                      title={m.label}
                      price={`${chf(m.priceBuy)}`}
                      qty={qty[m.key]}
                      setQty={(n) => setQty((p) => ({ ...p, [m.key]: Math.max(0, n) }))}
                      imgSrc={MODEL_IMAGES[m.key]}
                      pdf={MODEL_PDFS[m.key]}
                    />
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>Zurück</button>
                  <button className="btn btn-primary" onClick={() => next(3)}>Weiter</button>
                </div>
              </section>
            )}

            {/* --- STEP 3: Übersicht --- */}
            {step === 3 && (
              <section className="grid gap-4 mt-4">
                <h2 className="text-xl font-extrabold m-0">Übersicht</h2>
                <div className="panel overflow-x-auto bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-sm">
                        <th className="py-2">Position</th>
                        <th className="py-2">Menge</th>
                        <th className="py-2">Einzelpreis</th>
                        <th className="py-2">Summe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((li, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0">
                          <td className="py-2">{li.label}</td>
                          <td className="py-2">{li.qty ?? "–"}</td>
                          <td className="py-2">{li.price ? `CHF ${li.price}` : "–"}</td>
                          <td className="py-2">{li.total ? `CHF ${li.total}` : "–"}</td>
                        </tr>
                      ))}

                      {/* Zusammenfassung */}
                      <tr className="border-t-2 border-slate-200">
                        <td colSpan={3} className="py-3 font-bold">Einmalig gesamt</td>
                        <td className="py-3 font-bold">{isCloud ? chf(hardwareOnceCloud) : chf(onceTotalLocal)}</td>
                      </tr>

                      {isCloud && (
                        <tr>
                          <td colSpan={3} className="py-2 font-bold">
                            Abo ({showMonthly ? "Monatlich" : "Jährlich"})
                            {!showMonthly && <span className="text-xs block font-normal text-emerald-600">inkl. 5% Rabatt auf CMS</span>}
                          </td>
                          <td className="py-2 font-bold">
                            {showMonthly ? chf(monthlyRecurring) : chf(yearlyRecurring)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>Zurück</button>
                  <button className="btn btn-primary" onClick={() => setStep(4)}>Weiter</button>
                </div>
              </section>
            )}

            {/* --- STEP 4: Bestellung --- */}
            {step === 4 && (
              <section className="grid gap-4 mt-4">
                <h2 className="text-xl font-extrabold m-0">Bestellung</h2>
                <OrderForm
                  intervalText={isCloud ? (showMonthly ? "monatlich" : "jährlich") : "einmalig"}
                  amountText={costAmount}
                  onSubmitPayload={async (data: CustomerData) => {
                    await sendOrder({
                      type: mode,
                      interval: isCloud ? interval : undefined,
                      servers: !isCloud ? servers : undefined,
                      players: !isCloud ? players : undefined,
                      simQty,
                      qty,
                      pricing: {
                        monthlyTotal: isCloud ? monthlyRecurring : undefined,
                        yearlyTotal: isCloud ? yearlyRecurring : undefined,
                        hardwareOnce: isCloud ? hardwareOnceCloud : onceTotalLocal,
                        cmsMonthly: isCloud ? cmsMonthly : undefined,
                        simMonthly: simMonthlyVal,
                        serverOnce: !isCloud ? serverOnce : undefined,
                        playerOnce: !isCloud ? playerOnce : undefined,
                        displaysBuyOnce: !isCloud ? displaysBuyOnceLocal : undefined,
                      },
                      customer: data,
                    });
                  }}
                />
              </section>
            )}
          </div>

          <CostBox label="Kostenübersicht" amount={costAmount} lines={costLines} />
        </div>
      </div>
    </main>
  );
}
