"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "../rechner.css";
import Stepper from "../components/Stepper";
import Toggle from "../components/Toggle";
import Counter from "../components/Counter";
import ModelCard from "../components/ModelCard";
import CostBox from "../components/CostBox";
import OrderForm from "../components/OrderForm";
import {
  RENT_MODELS,
  MODEL_IMAGES,
  chf,
  PRICE_PLAYER_ABO,
  PRICE_SIM_MONTH,
} from "../lib/pricing";
import { DisplayKey, Interval } from "../lib/types";

export default function MietPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [err, setErr] = useState<string>("");

  // 1) Art
  const [rentKind, setRentKind] = useState<"rentDisplays" | "ownDisplays" | null>(
    null
  );

  // 2) Abrechnung
  const [interval, setInterval] = useState<Interval>("monthly");

  // 3) Mengen
  const [qty, setQty] = useState<Record<DisplayKey, number>>({
    indoor43: 0,
    indoor55: 0,
    indoor65: 0,
    outdoor43: 0,
    outdoor55: 0,
    outdoor75: 0,
    stretched37: 0,
    videowall55: 0,
    totem55: 0,
  });
  const [playersOnly, setPlayersOnly] = useState(0); // für „eigene Displays“
  const [simQty, setSimQty] = useState(0);

  // Preise berechnen
  const baseMonthly = useMemo(() => {
    if (rentKind === "ownDisplays") return playersOnly * PRICE_PLAYER_ABO;
    return RENT_MODELS.reduce(
      (s, m) => s + (qty[m.key] || 0) * m.priceMonthly,
      0
    );
  }, [rentKind, playersOnly, qty]);

  const baseYear = baseMonthly * 12; // Geräte/Player Jahresbasis
  const discount = Math.round(baseYear * 0.05); // 5% nur auf Geräte/Player
  const simMonthly = simQty * PRICE_SIM_MONTH; // SIM separat
  const monthlyTotal = baseMonthly + (simQty > 0 ? simMonthly : 0);
  const yearlyTotal =
    Math.round(baseYear - discount) + (simQty > 0 ? simMonthly * 12 : 0);

  // Anzeige in CostBox
  const showMonthly = interval === "monthly";
  const costLabel = showMonthly
    ? "Monatlich"
    : "Jährlich (Voraus, −5 % Geräte/Player)";
  const costLines = showMonthly
    ? simQty > 0
      ? [{ k: "inkl. SIM", v: `+ ${chf(simMonthly)}/Mon.` }]
      : undefined
    : [
        { k: "Geräte/Player (12×)", v: chf(baseYear) },
        { k: "5 % Rabatt", v: `– ${chf(discount)}` },
        ...(simQty > 0 ? [{ k: "SIM (12×)", v: chf(simMonthly * 12) }] : []),
      ];
  const costAmount = showMonthly
    ? `${chf(monthlyTotal)}/Monat`
    : `${chf(yearlyTotal)}/Jahr`;

  const canStep1 = rentKind !== null;
  const canStep3 =
    rentKind === "ownDisplays"
      ? playersOnly > 0
      : Object.values(qty).some((v) => v > 0);

  function next(to: 1 | 2 | 3 | 4 | 5) {
    setErr("");
    if (to === 2 && !canStep1) {
      setErr("Bitte zuerst eine Art wählen.");
      return;
    }
    if (to === 4 && !canStep3) {
      setErr("Bitte mindestens ein Gerät oder Player wählen.");
      return;
    }
    setStep(to);
  }

  const lines = useMemo(() => {
    const L: { label: string; qty?: number; price?: number; total?: number }[] =
      [];
    if (rentKind === "ownDisplays" && playersOnly > 0)
      L.push({
        label: "Player-Abo",
        qty: playersOnly,
        price: PRICE_PLAYER_ABO,
        total: playersOnly * PRICE_PLAYER_ABO,
      });
    if (rentKind === "rentDisplays") {
      RENT_MODELS.forEach((m) => {
        const q = qty[m.key] || 0;
        if (q > 0)
          L.push({
            label: m.label,
            qty: q,
            price: m.priceMonthly,
            total: q * m.priceMonthly,
          });
      });
    }
    if (simQty > 0)
      L.push({
        label: "SIM-Karten",
        qty: simQty,
        price: PRICE_SIM_MONTH,
        total: simMonthly,
      });
    return L;
  }, [rentKind, playersOnly, qty, simQty, simMonthly]);

  async function sendOrder(payload: any) {
    await fetch("/.netlify/functions/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Danke! Wir melden uns mit einer Bestätigung.");
  }

  return (
    <main className="rechner">
      <div className="wrap">
        {/* Kopfzeile */}
        <div className="flex justify-between items-center mb-4 gap-2">
          <a href="/" className="btn btn-ghost">
            ← Zurück zur Website
          </a>
          <div className="flex items-center gap-2">
            <Link
              href="/displays/"
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              Displays ansehen
            </Link>
            <Link href="/rechner/lokal" className="btn btn-ghost">
              Zum Lokal-Rechner
            </Link>
          </div>
        </div>

        <h1 className="heading text-3xl font-black">Kostenrechner – Miete</h1>
        <p className="muted">
          Gerätepreise exkl. MwSt. Jahreszahlung mit 5 % Rabatt auf Geräte/Player.
        </p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-4 mt-4">
          <div>
            <Stepper
              steps={["Art", "Abrechnung", "Mengen", "Übersicht", "Bestellung"]}
              active={step}
              goto={(n) => setStep(n as any)}
            />
            {err && <p className="error mt-2">{err}</p>}

            {/* 1: Art */}
            {step === 1 && (
              <section className="grid sm:grid-cols-2 gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setRentKind("rentDisplays")}
                  className={`panel text-left ${
                    rentKind === "rentDisplays"
                      ? "outline outline-2 outline-emerald-600"
                      : ""
                  }`}
                >
                  <h2 className="m-0 text-xl font-extrabold">Displays mieten</h2>
                  <p className="muted mt-1">Display + Player pro Gerät im Abo.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRentKind("ownDisplays")}
                  className={`panel text-left ${
                    rentKind === "ownDisplays"
                      ? "outline outline-2 outline-emerald-600"
                      : ""
                  }`}
                >
                  <h2 className="m-0 text-xl font-extrabold">
                    Eigene Displays (nur Player)
                  </h2>
                  <p className="muted mt-1">
                    Player-Abo CHF 25/Monat pro Gerät, inkl. CMS-Zugang.
                  </p>
                </button>

                <div className="flex justify-end gap-2 col-span-full">
                  <button className="btn btn-primary" onClick={() => next(2)}>
                    Weiter
                  </button>
                </div>
              </section>
            )}

            {/* 2: Abrechnung */}
            {step === 2 && (
              <section className="grid gap-3 mt-3">
                <h2 className="text-xl font-extrabold m-0">Abrechnung</h2>
                <div className="panel grid sm:grid-cols-2 gap-3">
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
                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>
                    Zurück
                  </button>
                  <button className="btn btn-primary" onClick={() => next(3)}>
                    Weiter
                  </button>
                </div>
              </section>
            )}

            {/* 3: Mengen */}
            {step === 3 && (
              <section className="grid gap-3 mt-3">
                <h2 className="text-xl font-extrabold m-0">Mengen</h2>

                {rentKind === "ownDisplays" ? (
                  <label className="panel">
                    <span className="font-semibold">Anzahl Player (Abo)</span>
                    <div className="mt-2">
                      <Counter
                        value={playersOnly}
                        onChange={(v) => setPlayersOnly(Math.max(1, v))}
                        min={1}
                      />
                    </div>
                    <div className="muted text-sm mt-1">
                      CHF {PRICE_PLAYER_ABO}.– / Monat pro Player
                    </div>
                  </label>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {RENT_MODELS.map((m) => (
                      <ModelCard
                        key={m.key}
                        title={m.label}
                        price={`${chf(m.priceMonthly)}/Monat`}
                        qty={qty[m.key]}
                        setQty={(n) =>
                          setQty((p) => ({ ...p, [m.key]: Math.max(0, n) }))
                        }
                        imgSrc={MODEL_IMAGES[m.key]}
                      />
                    ))}
                  </div>
                )}

                <label className="panel">
                  <span className="font-semibold">SIM-Karten (4G/5G, optional)</span>
                  <div className="mt-2 flex items-center justify-between">
                    <Counter
                      value={simQty}
                      onChange={(v) => setSimQty(Math.max(0, v))}
                    />
                    <span className="muted text-sm">
                      CHF {PRICE_SIM_MONTH}.–/Monat je SIM
                    </span>
                  </div>
                </label>

                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>
                    Zurück
                  </button>
                  <button className="btn btn-primary" onClick={() => next(4)}>
                    Weiter
                  </button>
                </div>
              </section>
            )}

            {/* 4: Übersicht als Tabelle */}
            {step === 4 && (
              <section className="grid gap-3 mt-3">
                <h2 className="text-xl font-extrabold m-0">Übersicht</h2>
                <div className="panel overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Menge</th>
                        <th>Preis</th>
                        <th>Summe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((li, i) => (
                        <tr key={i}>
                          <td>{li.label}</td>
                          <td>{li.qty ?? "–"}</td>
                          <td>{li.price ? `CHF ${li.price}` : "–"}</td>
                          <td>{li.total ? `CHF ${li.total}` : "–"}</td>
                        </tr>
                      ))}
                      {!showMonthly && (
                        <>
                          <tr>
                            <td colSpan={3}>
                              <strong>Geräte/Player (12×)</strong>
                            </td>
                            <td>
                              <strong>{chf(baseYear)}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3}>5 % Rabatt</td>
                            <td>– {chf(discount)}</td>
                          </tr>
                          {simQty > 0 && (
                            <tr>
                              <td colSpan={3}>SIM (12×)</td>
                              <td>{chf(simMonthly * 12)}</td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan={3}>
                              <strong>Jahres­summe</strong>
                            </td>
                            <td>
                              <strong>{chf(yearlyTotal)}</strong>
                            </td>
                          </tr>
                        </>
                      )}
                      {showMonthly && (
                        <tr>
                          <td colSpan={3}>
                            <strong>Monatssumme</strong>
                          </td>
                          <td>
                            <strong>{chf(monthlyTotal)}</strong>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={() => setStep(3)}>
                    Zurück
                  </button>
                  <button className="btn btn-primary" onClick={() => setStep(5)}>
                    Weiter
                  </button>
                </div>
              </section>
            )}

            {/* 5: Bestellung */}
            {step === 5 && (
              <section className="grid gap-3 mt-3">
                <h2 className="text-xl font-extrabold m-0">Bestellung</h2>
                <OrderForm
                  intervalText={
                    showMonthly ? "monatlich" : "jährlich (Voraus, −5 %)"
                  }
                  amountText={
                    showMonthly
                      ? `${chf(monthlyTotal)}/Monat`
                      : `${chf(yearlyTotal)}/Jahr`
                  }
                  onSubmitPayload={async (data) => {
                    await sendOrder({
                      type: "rent",
                      rentKind,
                      interval,
                      simQty,
                      playersOnly,
                      qty,
                      pricing: {
                        monthlyTotal,
                        yearlyTotal,
                        baseMonthly,
                        baseYear,
                        discount,
                        simMonthly,
                      },
                      customer: data,
                    });
                  }}
                />
              </section>
            )}
          </div>

          <CostBox label={costLabel} amount={costAmount} lines={costLines} />
        </div>
      </div>
    </main>
  );
}
