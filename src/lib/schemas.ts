import { z } from "zod";

/** --- Pricing (anpassbar) --- */
const PRICES = {
  cloud: { // Cloud-Lösung (Kauf + Abo)
    display: { indoor: 660, high: 1190 },  // CHF pro Display (Kauf)
    playerPerUnit: 360,                    // CHF pro Player (Kauf)
    cmsPerUnit: 19,                        // CHF pro Monat (Abo)
  },
  lokal: { // Lokale Lösung (Kauf komplett)
    display: { indoor: 660, high: 1190 },  // CHF pro Display (Kauf)
    playerPerUnit: 360,                    // CHF pro Player (Kauf)
    serverPerUnit: 590,                    // CHF pro Mini-Server (Kauf, pauschal pro Standort)
  }
};

export const CalculatorInput = z.object({
  model: z.enum(["cloud", "lokal"]),
  locations: z.number().int().min(1).default(1),
  players: z.number().int().min(1).default(1),
  sim: z.number().int().min(0).default(0), // Optional, falls benötigt
  displays: z.array(z.object({
    type: z.enum(["indoor", "high"]),
    size: z.number().int().min(27).max(98),
    qty: z.number().int().min(1),
    monthly: z.number().nonnegative().default(0),
    once: z.number().nonnegative().default(0),
  })).min(1),
  notes: z.string().max(1000).optional(),
  contact: z.object({
    company: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6)
  }).optional()
});
export type TCalculatorInput = z.infer<typeof CalculatorInput>;

export function presetItem(model: "cloud" | "lokal", type: "indoor" | "high", size = 55) {
  // Preise sind hier vereinfacht. In einer echten App würde man size berücksichtigen.
  // Hier nehmen wir an, dass der Preis für alle Größen im Beispiel gleich ist oder wir müssten eine Map haben.
  // Für das Beispiel nutzen wir die Konstanten.

  const displayPrice = type === "indoor" ? PRICES.cloud.display.indoor : PRICES.cloud.display.high;

  return {
    type,
    size,
    qty: 1,
    monthly: model === "cloud" ? PRICES.cloud.cmsPerUnit : 0, // CMS Abo pro Screen/Player
    once: displayPrice // Hardware Kauf
  };
}

export function calc(t: TCalculatorInput) {
  // Displays
  const dispOnce = t.displays.reduce((s, d) => s + d.once * d.qty, 0);
  const dispMonth = t.displays.reduce((s, d) => s + d.monthly * d.qty, 0); // CMS Abo ist hier drin wenn presetItem genutzt wird

  // Player
  // Cloud: Player Kauf + CMS Abo (CMS Abo ist oben bei Display/Player Logik, oder separat?)
  // Wir nehmen an: 1 Player pro Display.
  // Wenn wir Player separat berechnen:
  const totalScreens = t.displays.reduce((s, d) => s + d.qty, 0);
  const playerOnce = PRICES.cloud.playerPerUnit * totalScreens;

  // Server (nur Lokal)
  const serverOnce = t.model === "lokal" ? PRICES.lokal.serverPerUnit * t.locations : 0;

  // CMS Abo (nur Cloud) - falls nicht im Display preset:
  // Wir haben es im presetItem oben als 'monthly' definiert.
  // Aber falls t.players manuell geändert wird:
  // Einfachheitshalber: CMS Abo pro Player.
  const cmsMonth = t.model === "cloud" ? PRICES.cloud.cmsPerUnit * totalScreens : 0;

  // Korrektur: presetItem setzt monthly. Wenn wir es hier neu berechnen, müssen wir aufpassen.
  // Wir ignorieren das 'monthly' im Display-Objekt für die Gesamtrechnung und berechnen es basierend auf der Anzahl.

  const finalOnce = dispOnce + playerOnce + serverOnce;
  const finalMonth = cmsMonth;

  return {
    once: +(finalOnce).toFixed(2),
    monthly: +(finalMonth).toFixed(2),
  };
}
