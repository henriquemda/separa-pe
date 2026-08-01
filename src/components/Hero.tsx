"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Flame,
  Building2,
  Lock,
  Smartphone,
  TrendingUp,
  CheckCircle2
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
  const [complexName, setComplexName] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      district: selectedDistrict,
      format: selectedFormat,
      time: selectedTime,
      date: selectedDate
    });
  };

  const handleSaasDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({ complexName: complexName || "Mi Complejo Deportivo", plan: "Pro SaaS" });
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-mesh-pitch pitch-lines pt-8 pb-16 lg:pt-16 lg:pb-24 flex items-center justify-center">
      {/* Background Interactive Pitch Canvas */}
      <PitchCanvasAnimation />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-10 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Dynamic Dual-Persona Switcher Header Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-4 py-1.5 backdrop-blur-xl shadow-xl shadow-emerald-500/10"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-bold tracking-wide text-emerald-300">
              {audienceMode === "pelotero"
                ? "⚽ MODO PELOTERO: 384 CANCHAS DISPONIBLES HOY EN LIMA"
                : "🚀 MODO COMPLEJO SAAS: +140 COMPLEJOS AUTOMATIZADOS EN PERÚ"}
            </span>
            <div className="ml-2 pl-2 border-l border-emerald-800/60 flex items-center gap-1.5">
              <button
                onClick={() => setAudienceMode(audienceMode === "pelotero" ? "complejo" : "pelotero")}
                className="text-[11px] font-extrabold text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors flex items-center gap-1"
              >
                <span>Cambiar a {audienceMode === "pelotero" ? "Modo Complejo 🏢" : "Modo Pelotero ⚽"}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {audienceMode === "pelotero" ? (
            /* ========================================== */
            /* 1. AWWWARDS-GRADE PELOTERO HERO SECTION    */
            /* ========================================== */
            <motion.div
              key="pelotero-hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-5xl mx-auto"
            >
              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Reserva tu cancha en <span className="text-gradient-turf">segundos</span>.
                <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-emerald-200 to-gray-400">
                  Sin llamadas. Sin plantones.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Elige tu distrito, confirma tu seña con <span className="text-emerald-400 font-bold">Yape</span> o <span className="text-cyan-400 font-bold">Plin</span> y divide la cuota en 1-clic entre tus 14 peloteros. Chau peleas por la plata.
              </p>

              {/* Bespoke Awwwards Search Terminal */}
              <div className="mt-9 w-full max-w-4xl">
                <form
                  onSubmit={handleSearchSubmit}
                  className="glass-card rounded-3xl p-4 sm:p-6 shadow-2xl border border-emerald-500/30 relative overflow-hidden backdrop-blur-2xl bg-[#040806]/85"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* District Selector */}
                    <div className="flex flex-col gap-1 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/40 hover:border-emerald-500/50 transition-all text-left">
                      <label className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                        Distrito / Ciudad
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer w-full"
                      >
                        {DISTRICTS.map((dist) => (
                          <option key={dist} value={dist} className="bg-[#040806] text-white">
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Format Selector */}
                    <div className="flex flex-col gap-1 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/40 hover:border-emerald-500/50 transition-all text-left">
                      <label className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-emerald-400" />
                        Formato de Cancha
                      </label>
                      <select
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer w-full"
                      >
                        {FORMATS.map((fmt) => (
                          <option key={fmt} value={fmt} className="bg-[#040806] text-white">
                            {fmt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Time Slot Selector */}
                    <div className="flex flex-col gap-1 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/40 hover:border-emerald-500/50 transition-all text-left">
                      <label className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        Horario Preferido
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer w-full"
                      >
                        <option value="19:00 - 20:00" className="bg-[#040806]">19:00 - 20:00</option>
                        <option value="20:00 - 21:00" className="bg-[#040806]">20:00 - 21:00 (Popular 🔥)</option>
                        <option value="21:00 - 22:00" className="bg-[#040806]">21:00 - 22:00 (Popular 🔥)</option>
                        <option value="22:00 - 23:00" className="bg-[#040806]">22:00 - 23:00</option>
                      </select>
                    </div>

                    {/* CTA Search Button */}
                    <button
                      type="submit"
                      className="neon-glow-btn flex h-full min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 px-6 py-3.5 font-extrabold text-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/25"
                    >
                      <Search className="h-5 w-5" />
                      <span className="text-base">Buscar Canchas</span>
                    </button>
                  </div>

                  {/* Quick Filters Pill Bar */}
                  <div className="mt-4 pt-3 border-t border-emerald-800/30 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-emerald-400">Filtros rápidos:</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-200 font-medium">
                        🌿 Grass Sintético Pro
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-200 font-medium">
                        💡 Reflectores LED
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-200 font-medium">
                        🏢 Techado / Anti-Lluvia
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                      <Zap className="h-3.5 w-3.5 fill-emerald-400" />
                      Confirmación Instantánea 24/7
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Proof Badges & Quick Stats */}
              <div className="mt-10 flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3 flex-wrap justify-center bg-emerald-950/30 px-6 py-2.5 rounded-full border border-emerald-800/30">
                  <span className="text-xs font-semibold text-gray-400">Pagos aceptados al instante:</span>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-950/90 text-purple-200 border border-purple-500/40 text-xs font-extrabold px-3 py-1 rounded-lg">
                      📱 YAPE
                    </span>
                    <span className="bg-cyan-950/90 text-cyan-200 border border-cyan-500/40 text-xs font-extrabold px-3 py-1 rounded-lg">
                      ⚡ PLIN
                    </span>
                    <span className="bg-blue-950/90 text-blue-200 border border-blue-500/40 text-xs font-extrabold px-3 py-1 rounded-lg">
                      🏛️ BCP / Interbank
                    </span>
                    <span className="bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs font-extrabold px-3 py-1 rounded-lg">
                      💳 Tarjetas
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mt-2">
                  <div className="glass-card p-3.5 rounded-2xl text-center border border-emerald-500/20">
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">+120,000</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Pichangas Reservadas</div>
                  </div>
                  <div className="glass-card p-3.5 rounded-2xl text-center border border-emerald-500/20">
                    <div className="text-xl sm:text-2xl font-extrabold text-white">380+</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Canchas en Todo Perú</div>
                  </div>
                  <div className="glass-card p-3.5 rounded-2xl text-center border border-amber-500/20">
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-400">99.8%</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Asistencia (Cero Plantones)</div>
                  </div>
                  <div className="glass-card p-3.5 rounded-2xl text-center border border-emerald-500/20">
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">4.9 ★</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Valoración Pelotera</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================== */
            /* 2. AWWWARDS-GRADE COMPLEJO SAAS HERO      */
            /* ========================================== */
            <motion.div
              key="complejo-hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left max-w-6xl mx-auto"
            >
              {/* Left Column: Copy & Trial CTA */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  SaaS nº 1 de Automatización de Canchas en Perú
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  Automatiza tus canchas. <br />
                  <span className="text-gradient-gold">Elimina los no-shows al 100%.</span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                  Controla reservas, señas automáticas del 50% por Yape/Plin con validación IA, encendido de reflectores IoT y caja registradora desde tu celular.
                </p>

                {/* SaaS Trial Form */}
                <form
                  onSubmit={handleSaasDemoSubmit}
                  className="mt-6 w-full max-w-md bg-emerald-950/40 p-2 sm:p-2.5 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row gap-2 shadow-2xl backdrop-blur-xl"
                >
                  <input
                    type="text"
                    value={complexName}
                    onChange={(e) => setComplexName(e.target.value)}
                    placeholder="Nombre de tu Complejo Deportivo"
                    className="bg-[#040806] border border-emerald-800/60 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 text-sm flex-1 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold px-6 py-3 rounded-xl text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Probar Demo 14 Días</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {/* Trust Pills */}
                <div className="mt-4 flex items-center gap-5 text-xs text-gray-300 flex-wrap">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" /> Sin tarjeta de crédito
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" /> Configuración en 5 min
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" /> Soporte WhatsApp 24/7 Perú
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive SaaS Command Center Preview Card */}
              <div className="lg:col-span-5 w-full">
                <div className="glass-card rounded-3xl p-5 border border-amber-500/30 shadow-2xl bg-[#040806]/90 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-xs font-bold text-gray-300">SEPARA ADMIN SaaS v4.2</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold border border-emerald-800/60">
                      ● EN VIVO
                    </span>
                  </div>

                  {/* KPI Mini Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Ocupación Hoy</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-0.5">94% (16/17 slots)</div>
                      <div className="text-[10px] text-emerald-300 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-emerald-400" /> +32% vs mes anterior
                      </div>
                    </div>
                    <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Señas Verificadas IA</div>
                      <div className="text-xl font-extrabold text-amber-400 mt-0.5">S/ 1,440.00</div>
                      <div className="text-[10px] text-amber-300 flex items-center gap-1 mt-1">
                        <Lock className="h-3 w-3 text-amber-400" /> 0% no-shows
                      </div>
                    </div>
                  </div>

                  {/* Simulated Receipt Validation Notification */}
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/50 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300">
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Yape Recibido S/ 90.00</div>
                        <div className="text-[10px] text-gray-400">Juan Pérez - Cancha 1 (20:00)</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500 text-black font-extrabold text-[10px] rounded-lg">
                      IA OK ✓
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking({ plan: "Pro SaaS" })}
                    className="w-full py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold text-xs hover:bg-amber-400/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Panel Completo de Control</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

