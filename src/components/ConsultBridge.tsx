// src/components/ConsultBridge.tsx
"use client";
import { useEffect } from "react";

export default function ConsultBridge() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-consult]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-consult"));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
