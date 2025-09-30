"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "../rechner.css";
import Stepper from "../components/Stepper";
import Counter from "../components/Counter";
import ModelCard from "../components/ModelCard";
import CostBox from "../components/CostBox";
import OrderForm from "../components/OrderForm";
import {
  BUY_MODELS, MODEL_IMAGES, chf,
  PRICE_PLAYER_LOCAL, PRICE_SERVER_UNIT, STARTER_FIX, PRICE_SIM_MONTH
} from "../lib/pricing";
import { DisplayKey } from "../lib/types";

export default function LokalPage(){
  const [step,setStep]=useState<1|2|3|4>(1);
  const [err,setErr]=useState("");

  const [servers,setServers]=useState(1);
  const [players,setPlayers]=useState(1);
  const [simQty,setSimQty]=useState(0);

  const [qty,setQty]=useState<Record<DisplayKey,number>>({
    indoor43:0, indoor55:0, indoor65:0, outdoor43:0, outdoor55:0, outdoor75:0,
    stretched37:0, videowall55:0, totem55:0
  });

  const displaysBuyOnce = useMemo(()=> BUY_MODELS.reduce((s,m)=> s + (qty[m.key]||0)*m.priceBuy, 0), [qty]);
  const displaysLines   = BUY_MODELS
    .filter(m => (qty[m.key]||0) > 0)
    .map(m => ({ k:`${m.label} × ${qty[m.key]}`, v: chf((qty[m.key]||0)*m.priceBuy) }));

  const serverOnce  = servers * PRICE_SERVER_UNIT;
  const playerOnce  = players * PRICE_PLAYER_LOCAL;
  const simMonthly  = simQty * PRICE_SIM_MONTH;

  const useStarter  = (servers===1 && players===1 && displaysBuyOnce===0);
  const onceTotal   = useStarter ? STARTER_FIX : (serverOnce + playerOnce + displaysBuyOnce);

  function next(to:1|2|3|4){
    setErr("");
    if(to===2 && (servers<1 || players<1)){ setErr("Bitte gültige Kapazität wählen."); return; }
    setStep(to);
  }

  async function sendOrder(payload:any){
    await fetch("/.netlify/functions/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    alert("Danke! Wir melden uns mit einer Bestätigung.");
  }

  const tableRows = [
    useStarter
      ? {k:"Starter-Paket (Fix)", v: chf(STARTER_FIX)}
      : {k:`CMS-Server × ${servers} / Player × ${players}`, v: chf(serverOnce + playerOnce)},
    ...displaysLines,
    ...(simQty>0 ? [{k:"SIM (monatlich)", v: `${chf(simMonthly)}/Monat`}] : []),
    {k:"Einmalig gesamt", v: chf(onceTotal)}
  ];

  const costLines = [
    ...(simQty>0 ? [{k:"SIM monatlich", v:`${chf(simMonthly)}/Mon.`}] : []),
  ];

  return (
    <main className="rechner">
      <div className="wrap">
        <div className="flex justify-between items-center mb-4 gap-2">
          <a href="/" className="btn btn-ghost">← Zurück zur Website</a>
          <div className="flex items-center gap-2">
            <Link href="/displays/" target="_blank" rel="noopener" className="btn btn-ghost">Displays ansehen</Link>
            <Link href="/rechner/miete" className="btn btn-ghost">Zum Miet-Rechner</Link>
          </div>
        </div>

        <h1 className="heading text-3xl font-black">Kostenrechner – Lokale Lösung (Kauf)</h1>
        <p className="muted">Ein CMS-Server kann mehrere Standorte bedienen. Player je Display.</p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-4 mt-4">
          <div>
            <Stepper steps={["Kapazität","Displays","Übersicht","Bestellung"]} active={step} goto={(n)=>setStep(n as any)} />
            {err && <p className="error mt-2">{err}</p>}

            {step===1 && (
              <section className="grid gap-3 mt-3">
                <div className="panel">
                  <h2 className="m-0 text-xl font-extrabold">Kapazität</h2>
                  <p className="muted text-sm">Server-Einheiten frei wählbar. 1 Player je Display.</p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    <label> CMS-Server (à CHF {PRICE_SERVER_UNIT}) <div className="mt-2"><Counter value={servers} onChange={(v)=>setServers(Math.max(1,v))} min={1} /></div></label>
                    <label> Player (à CHF {PRICE_PLAYER_LOCAL}) <div className="mt-2"><Counter value={players} onChange={(v)=>setPlayers(Math.max(1,v))} min={1} /></div></label>
                  </div>
                </div>

                <label className="panel">
                  <span className="font-semibold">SIM-Karten (optional, monatlich)</span>
                  <div className="mt-2 flex items-center justify-between">
                    <Counter value={simQty} onChange={(v)=> setSimQty(Math.max(0,v))} />
                    <span className="muted text-sm">CHF {PRICE_SIM_MONTH}.–/Monat je SIM</span>
                  </div>
                </label>

                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={()=>history.back()}>Zurück</button>
                  <button className="btn btn-primary" onClick={()=> next(2)}>Weiter</button>
                </div>
              </section>
            )}

            {step===2 && (
              <section className="grid gap-3 mt-3">
                <h2 className="m-0 text-xl font-extrabold">Displays (Kauf, optional)</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {BUY_MODELS.map(m=>(
                    <ModelCard key={m.key}
                      title={m.label}
                      price={`${chf(m.priceBuy)} (Kauf)`}
                      qty={qty[m.key]}
                      setQty={(n)=> setQty(p=>({ ...p, [m.key]:Math.max(0,n) }))}
                      imgSrc={MODEL_IMAGES[m.key]}
                    />
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={()=>setStep(1)}>Zurück</button>
                  <button className="btn btn-primary" onClick={()=> setStep(3)}>Weiter</button>
                </div>
              </section>
            )}

            {step===3 && (
              <section className="grid gap-3 mt-3">
                <h2 className="m-0 text-xl font-extrabold">Übersicht</h2>
                <div className="panel">
                  <table>
                    <tbody>
                      {tableRows.map(r=>(
                        <tr key={r.k}><td>{r.k}</td><td style={{textAlign:"right"}}><strong>{r.v}</strong></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between">
                  <button className="btn btn-ghost" onClick={()=>setStep(2)}>Zurück</button>
                  <button className="btn btn-primary" onClick={()=> setStep(4)}>Weiter</button>
                </div>
              </section>
            )}

            {step===4 && (
              <section className="grid gap-3 mt-3">
                <h2 className="m-0 text-xl font-extrabold">Bestellung</h2>
                <OrderForm
                  intervalText="einmalig"
                  amountText={`${chf(onceTotal)}.–`}
                  onSubmitPayload={async (data)=>{
                    await sendOrder({
                      type:"local",
                      servers, players, simQty, qty,
                      pricing:{ onceTotal, serverOnce, playerOnce, displaysBuyOnce, simMonthly, STARTER_FIX },
                      customer:data,
                    });
                  }}
                />
              </section>
            )}
          </div>

          <CostBox label="Einmalig" amount={`${chf(onceTotal)}.–`} lines={costLines}/>
        </div>
      </div>
    </main>
  );
}
