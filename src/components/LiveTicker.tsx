"use me";
"use client";

import { Flame, CheckCircle2, MapPin, Zap, Clock } from "lucide-react";

const TICKER_ITEMS = [
  {
    id: 1,
    type: "booking",
    text: "Sede Surco (Cancha Sintética 7v7) reservada para hoy 9:00 PM",
    method: "Confirmado vía Yape 📲",
    district: "Lima - Surco",
    timeAgo: "Hace 2 min"
  },
  {
    id: 2,
    type: "urgency",
    text: "⚡ DeporCenter San Borja liberó 1 slot nocturno (Cancha Grass 6v6)",
    method: "Descuento 15%",
    district: "Lima - San Borja",
    timeAgo: "En vivo"
  },
  {
    id: 3,
    type: "match",
    text: "⚽ Pichanga 8v8 busca 2 jugadores (Falta Arquero) en Complejo Los Olivos",
    method: "Dividir cuota: S/ 12 c/u",
    district: "Lima Norte",
    timeAgo: "Hace 5 min"
  },
  {
    id: 4,
    type: "booking",
    text: "Sede Yanahuara Arequipa reservada (Cancha 5v5 Con Techo)",
    method: "Confirmado vía Plin ⚡",
    district: "Arequipa",
    timeAgo: "Hace 7 min"
  },
  {
    id: 5,
    type: "saas",
    text: "🏆 Complejo El Golazo automatizó sus 4 canchas y luces con Separa.pe",
    method: "Ocupación +38%",
    district: "Trujillo",
    timeAgo: "Hace 12 min"
  }
];

export function LiveTicker() {
  return (
    <div className="w-full bg-emerald-950/40 border-y border-emerald-500/20 py-2.5 overflow-hidden backdrop-blur-sm">
      <div className="flex animate-marquee space-x-8 items-center">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex items-center gap-3 text-xs sm:text-sm font-medium whitespace-nowrap bg-emerald-900/30 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-gray-200 shadow-sm"
          >
            {item.type === "urgency" ? (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            )}
            
            <span className="text-white font-semibold">{item.text}</span>
            <span className="text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]">
              {item.method}
            </span>
            <span className="text-gray-400 flex items-center gap-1 text-[11px]">
              <MapPin className="h-3 w-3 text-emerald-400" />
              {item.district}
            </span>
            <span className="text-gray-500 text-[11px] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
