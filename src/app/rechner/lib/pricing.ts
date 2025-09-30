import { DisplayKey } from "./types";

/** 9 Platzhalter-Modelle – DU ersetzt nur die Bilder / Preise */
export const RENT_MODELS: { key: DisplayKey; label: string; priceMonthly: number; }[] = [
  // Indoor
  { key: "indoor43",  label: "Indoor 43″",  priceMonthly: 59 },
  { key: "indoor55",  label: "Indoor 55″",  priceMonthly: 69 },
  { key: "indoor65",  label: "Indoor 65″",  priceMonthly: 89 },
  // Outdoor
  { key: "outdoor43", label: "Outdoor 43″", priceMonthly: 129 },
  { key: "outdoor55", label: "Outdoor 55″", priceMonthly: 159 },
  { key: "outdoor75", label: "Outdoor 75″", priceMonthly: 219 },
  // Weitere
  { key: "stretched37", label: "Stretched 37″", priceMonthly: 109 },
  { key: "videowall55", label: "Videowall 2×2/55″", priceMonthly: 299 },
  { key: "totem55",    label: "Infotafel/Totem 55″", priceMonthly: 139 },
];

/** gleiche 9 Modelle zum Kauf (optional beim lokalen Modell) */
export const BUY_MODELS: { key: DisplayKey; label: string; priceBuy: number; }[] = [
  { key: "indoor43",  label: "Indoor 43″",  priceBuy: 500 },
  { key: "indoor55",  label: "Indoor 55″",  priceBuy: 700 },
  { key: "indoor65",  label: "Indoor 65″",  priceBuy: 900 },
  { key: "outdoor43", label: "Outdoor 43″", priceBuy: 1600 },
  { key: "outdoor55", label: "Outdoor 55″", priceBuy: 2000 },
  { key: "outdoor75", label: "Outdoor 75″", priceBuy: 3200 },
  { key: "stretched37", label: "Stretched 37″", priceBuy: 1600 },
  { key: "videowall55", label: "Videowall 2×2/55″", priceBuy: 8900 },
  { key: "totem55",    label: "Infotafel/Totem 55″", priceBuy: 2200 },
];

/** Preise/Regeln */
export const PRICE_SIM_MONTH       = 10;
export const PRICE_PLAYER_ABO      = 25;   // Mietmodell: Player-Abo (eigene Displays)
export const PRICE_PLAYER_LOCAL    = 190;  // Kauf: Player pro Display (einmalig)
export const PRICE_SERVER_UNIT     = 470;  // Kauf: 1 CMS-Server Einheit (kann mehrere Standorte bedienen)
export const STARTER_FIX           = 660;  // 1 Server + 1 Player Bundle
export const YEARLY_DISCOUNT       = 0.05; // 5% Rabatt
export const YEARLY_FACTOR         = 1 - YEARLY_DISCOUNT;

export const chf = (n:number) => `CHF ${n.toLocaleString("de-CH")}`;

/** Platzhalter-Bilder — du ersetzt nur die Dateien im public/images */
export const MODEL_IMAGES: Record<DisplayKey,string> = {
  indoor43:     "/images/bildschirm01.webp",
  indoor55:     "/images/bildschirm02.webp",
  indoor65:     "/images/bildschirm03.webp",
  outdoor43:    "/images/bildschirm04.webp",
  outdoor55:    "/images/bildschirm05.webp",
  outdoor75:    "/images/bildschirm06.webp",
  stretched37:  "/images/bildschirm07.webp",
  videowall55:  "/images/bildschirm08.webp",
  totem55:      "/images/bildschirm09.webp",
};
