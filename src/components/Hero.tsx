"use me";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle,
  Trophy,
  Users,
  Zap,
  ArrowRight,
  SlidersHorizontal,
  Flame
} from "lucide-react";
import { PitchCanvasAnimation } from "./PitchCanvasAnimation";

interface HeroProps {
  onOpenBooking: (prefillData?: any) => void;
  audienceMode: "pelotero" | "complejo";
  setAudienceMode: (mode: "pelotero" | "complejo") => void;
}

const DISTRICTS = [
  "Surco, Lima",
  "San Borja, Lima",
  "Miraflores, Lima",
  "Los Olivos, Lima Norte",
  "La Molina, Lima",
  "San Miguel, Lima",
  "Yanahuara, Arequipa",
  "El Recreo, Trujillo",
  "Chiclayo Centro"
];

const FORMATS = ["5 vs 5", "6 vs 6", "7 vs 7", "11 vs 11"];

export function Hero({ onOpenBooking, audienceMode, setAudienceMode }: HeroProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("Surco, Lima");
  const [selectedFormat, setSelectedFormat] = useState("7 vs 7");
  const [selectedTime, setSelectedTime] = useState("20:00 - 21:00");
  const [selectedDate, setSelectedDate] = useState("Hoy (Noche)");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      district: selectedDistrict,
      format: selectedFormat,
      time: selectedTime,
      date: selectedDate
    });
  };

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-mesh-pitch pitch-lines pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Interactive Pitch Canvas */}
      <PitchCanvasAnimation />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Neuromarketing Urgency Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-emerald-500/10"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              {audienceMode === "pelotero"
                ? "⚡ 384 Canchas en Lima y Regiones disponibles hoy"
                : "🚀 +140 Complejos en Perú automatizaron sus canchas este mes"}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </motion.div>
        </div>

        {/* Dynamic Main Title */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            {audienceMode === "pelotero" ? (
              <>
                Reserva tu cancha en <span className="text-gradient-turf">segundos</span>.
                <br className="hidden sm:inline" />
                Sin llamadas. Sin WhatsApps.
              </>
            ) : (
              <>
                El Software #1 para <span className="text-gradient-gold">Canchas de Fútbol</span> en Perú.
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            {audienceMode === "pelotero" ? (
              <>
                Elige tu distrito, confirma con <span className="text-emerald-400 font-bold">Yape</span> o <span className="text-cyan-400 font-bold">Plin</span> y divide la cuota entre tu mancha en 1-clic. Chau plantones.
              </>
            ) : (
              <>
                Elimina reservas fantasma, cobros no verificados y horarios muertos. Controla tu caja, luces y señas automáticas desde tu celular.
              </>
            )}
          </motion.p>
        </div>

        {/* Interactive Search Bar (For Peloteros) or Quick Trial Form (For Complejos) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          {audienceMode === "pelotero" ? (
            <form
              onSubmit={handleSearchSubmit}
              className="glass-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-emerald-500/30"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* District Selector */}
                <div className="flex flex-col gap-1.5 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Distrito / Ciudad
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                  >
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist} className="bg-[#040806] text-white">
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format Selector */}
                <div className="flex flex-col gap-1.5 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Formato de Cancha
                  </label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                  >
                    {FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt} className="bg-[#040806] text-white">
                        {fmt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slot Selector */}
                <div className="flex flex-col gap-1.5 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Horario Preferido
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="19:00 - 20:00" className="bg-[#040806]">19:00 - 20:00</option>
                    <option value="20:00 - 21:00" className="bg-[#040806]">20:00 - 21:00 (Popular)</option>
                    <option value="21:00 - 22:00" className="bg-[#040806]">21:00 - 22:00 (Popular)</option>
                    <option value="22:00 - 23:00" className="bg-[#040806]">22:00 - 23:00</option>
                  </select>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="neon-glow-btn flex h-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 px-6 py-3 font-extrabold text-black transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Search className="h-5 w-5" />
                  <span>Buscar Cancha</span>
                </button>
              </div>

              {/* Quick Filters Pill Bar */}
              <div className="mt-4 pt-3 border-t border-emerald-800/30 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-emerald-400">Filtros rápidos:</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/30 text-emerald-200">
                    🌿 Grass Sintético
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/30 text-emerald-200">
                    💡 Con Reflectores LED
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/30 text-emerald-200">
                    🏢 Con Techo / Techado
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Zap className="h-3.5 w-3.5 fill-emerald-400" />
                  Confirmación Inmediata 24/7
                </div>
              </div>
            </form>
          ) : (
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¿Tienes canchas sintéticas o complejos deportivos?
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Empieza tu prueba gratis de 14 días. Sin tarjeta de crédito. Configura tus tarifas, señas por Yape y horarios en menos de 5 minutos.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Nombre de tu Complejo Deportivo"
                    className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 text-sm flex-1"
                  />
                  <button
                    onClick={() => onOpenBooking()}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold px-6 py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Probar Demo Gratis</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-amber-400" /> Cero comisión por reserva inicial
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-amber-400" /> Soporte WhatsApp 24/7 en Perú
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Neuromarketing Payment Trust Badges & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          {/* Payment Integrations Row */}
          <div className="flex items-center gap-4 flex-wrap justify-center bg-emerald-950/30 px-6 py-3 rounded-full border border-emerald-800/30">
            <span className="text-xs font-semibold text-gray-400">Pagos instantáneos asegurados:</span>
            <div className="flex items-center gap-3">
              <span className="bg-purple-900/60 text-purple-200 border border-purple-500/40 text-xs font-bold px-3 py-1 rounded-lg">
                📱 YAPE
              </span>
              <span className="bg-cyan-900/60 text-cyan-200 border border-cyan-500/40 text-xs font-bold px-3 py-1 rounded-lg">
                ⚡ PLIN
              </span>
              <span className="bg-blue-900/60 text-blue-200 border border-blue-500/40 text-xs font-bold px-3 py-1 rounded-lg">
                🏛️ BCP / Interbank
              </span>
              <span className="bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-lg">
                💳 Tarjetas Visa/MC
              </span>
            </div>
          </div>

          {/* Social Proof Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-center">
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">+120,000</div>
              <div className="text-xs text-gray-400 mt-1">Pichangas Reservadas</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">380+</div>
              <div className="text-xs text-gray-400 mt-1">Canchas en Todo Perú</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">99.8%</div>
              <div className="text-xs text-gray-400 mt-1">Asistencia (Cero Plantones)</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9 ★</div>
              <div className="text-xs text-gray-400 mt-1">Valoración de Peloteros</div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
