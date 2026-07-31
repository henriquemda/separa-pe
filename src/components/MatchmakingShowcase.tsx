"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Flame, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Zap, 
  ArrowRight,
  UserPlus
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MatchmakingShowcaseProps {
  onOpenBooking: (prefill?: any) => void;
}

const MATCHES = [
  {
    id: "m1",
    title: "Pichanga Nocturna 7v7 - ¡Falta Arquero!",
    district: "Surco, Lima (Complejo DeporSurco)",
    time: "Hoy 21:00 - 22:00",
    format: "7 vs 7",
    missingRole: "🧤 Arquero (¡Juega Gratis!)",
    missingCount: 1,
    level: "Intermedio / Competitivo",
    costPerPlayer: 0,
    organizer: "Carlos M. (FC Los Galácticos)",
    spotsLeft: 1,
    status: "🔥 ¡Último Cupo!",
    badgeColor: "bg-red-950 text-red-300 border-red-800"
  },
  {
    id: "m2",
    title: "Clásico del Viernes 6v6 - Faltan 2 Volantes",
    district: "San Borja, Lima (DeporCenter)",
    time: "Hoy 20:00 - 21:00",
    format: "6 vs 6",
    missingRole: "⚽ 2 Volantes / Medios",
    missingCount: 2,
    level: "Recreativo / Amistoso",
    costPerPlayer: 12,
    organizer: "Renzo V. (La Mancha FC)",
    spotsLeft: 2,
    status: "⚡ Confirmado",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800"
  },
  {
    id: "m3",
    title: "Pichanga Techada - Falta 1 Defensa",
    district: "Los Olivos, Lima Norte",
    time: "Hoy 22:00 - 23:00",
    format: "5 vs 5",
    missingRole: "🛡️ 1 Defensa Central",
    missingCount: 1,
    level: "Intermedio",
    costPerPlayer: 15,
    organizer: "Diego R. (Los Olivos FC)",
    spotsLeft: 1,
    status: "⚡ Confirmado",
    badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800"
  },
  {
    id: "m4",
    title: "Reto Arequipa Pichanga 7v7",
    district: "Yanahuara, Arequipa",
    time: "Mañana 19:00 - 20:00",
    format: "7 vs 7",
    missingRole: "⚽ 3 Jugadores Libres",
    missingCount: 3,
    level: "Todos los niveles",
    costPerPlayer: 14,
    organizer: "Patricio S. (Misti FC)",
    spotsLeft: 3,
    status: "🟢 Abierto",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800"
  }
];

export function MatchmakingShowcase({ onOpenBooking }: MatchmakingShowcaseProps) {
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredMatches = MATCHES.filter((m) => {
    if (filterRole === "all") return true;
    if (filterRole === "arquero") return m.missingRole.includes("Arquero");
    if (filterRole === "defensa") return m.missingRole.includes("Defensa");
    if (filterRole === "volante") return m.missingRole.includes("Volantes");
    return true;
  });

  return (
    <section id="matchmaking" className="py-20 bg-stadium relative border-t border-emerald-900/30">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 h-80 w-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold mb-3">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            Matchmaking Pichanguero en Tiempo Real
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ¿Te falta gente para armar el partido? <span className="text-gradient-turf">Modo "Falta Uno"</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Completa tu mancha en minutos con jugadores verificados en tu zona o súmate a pichangas abiertas cerca de ti.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {[
              { id: "all", label: "🔥 Todas las Pichangas" },
              { id: "arquero", label: "🧤 Faltan Arqueros" },
              { id: "volante", label: "⚽ Faltan Volantes" },
              { id: "defensa", label: "🛡️ Faltan Defensas" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterRole(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filterRole === tab.id
                    ? "bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20"
                    : "bg-emerald-950/40 text-gray-300 border-emerald-800/40 hover:border-emerald-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMatches.map((match, idx) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-3xl border border-emerald-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${match.badgeColor}`}>
                    {match.status}
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-cyan-400" />
                    Format: {match.format}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5">{match.title}</h3>
                
                <div className="space-y-1.5 text-xs text-gray-300 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{match.district}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-white">{match.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                    <span>Nivel: {match.level}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/40 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-400">Puesto requerido:</div>
                    <div className="text-sm font-extrabold text-cyan-300">{match.missingRole}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-400">Cuota personal:</div>
                    <div className="text-lg font-black text-amber-400">
                      {match.costPerPlayer === 0 ? "GRATIS" : formatCurrency(match.costPerPlayer)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-900/40 flex items-center justify-between gap-3">
                <span className="text-[11px] text-gray-400">
                  Org: <strong className="text-white">{match.organizer}</strong>
                </span>
                <button
                  onClick={() => onOpenBooking({
                    canchaName: match.title,
                    district: match.district.split("(")[0].trim(),
                    slotTime: match.time
                  })}
                  className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Unirme a esta Pichanga</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
