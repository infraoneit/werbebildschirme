import { z } from "zod";

/** --- Pricing (anpassbar) --- */
const PRICES = {
  rent: { // pro Monat
    display: { indoor: 59, high: 89 },    // CHF pro Display
    playerPerUnit: 15,                     // CHF pro Player
    simPerUnit: 5,                         // CHF pro SIM
  },
  buy: { // einmalig
    display: { indoor: 660, high: 1190 },  // CHF pro Display
    playerPerUnit: 360,                    // CHF pro Player
  }
};

export const CalculatorInput = z.object({
  model: z.enum(["miete", "lokal"]),
  locations: z.number().int().min(1).default(1),
  players: z.number().int().min(1).default(1),
  sim: z.number().int().min(0).default(0),
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

export function presetItem(model: "miete"|"lokal", type: "indoor"|"high", size=55) {
  return {
    type,
    size,
    qty: 1,
    monthly: model === "miete" ? (type==="indoor" ? PRICES.rent.display.indoor : PRICES.rent.display.high) : 0,
    once:    model === "lokal" ? (type==="indoor" ? PRICES.buy.display.indoor  : PRICES.buy.display.high)   : 0
  };
}

export function calc(t: TCalculatorInput) {
  const dispOnce = t.displays.reduce((s,d)=> s + d.once*d.qty, 0);
  const dispMonth = t.displays.reduce((s,d)=> s + d.monthly*d.qty, 0);
  const playerOnce = (t.model==="lokal" ? PRICES.buy.playerPerUnit : 0) * t.players;
  const playerMonth = (t.model==="miete" ? PRICES.rent.playerPerUnit : 0) * t.players;
  const simMonth = PRICES.rent.simPerUnit * t.sim;
  return {
    once: +(dispOnce + playerOnce).toFixed(2),
    monthly: +(dispMonth + playerMonth + simMonth).toFixed(2),
  };
}
