"use me";
"use client";

import { Sparkles, Calendar, Zap } from "lucide-react";

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export function StickyMobileBar({ onOpenBooking }: StickyMobileBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#040806]/95 border-t border-emerald-500/30 backdrop-blur-lg lg:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Zap className="h-3 w-3 fill-emerald-400" /> Confirmación en 1-Clic
          </span>
          <span className="text-xs text-white font-extrabold">Canchas desde S/ 14 / persona</span>
        </div>

        <button
          onClick={onOpenBooking}
          className="neon-glow-btn flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg"
        >
          <Sparkles className="h-4 w-4 fill-black" />
          <span>Separar Cancha</span>
        </button>
      </div>
    </div>
  );
}
