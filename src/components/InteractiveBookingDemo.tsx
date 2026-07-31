"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  QrCode, 
  Share2, 
  Zap, 
  Building2, 
  Activity, 
  TrendingUp, 
  Lightbulb, 
  Lock,
  ArrowRight
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface InteractiveBookingDemoProps {
  onOpenBooking: (prefill?: any) => void;
  audienceMode: "pelotero" | "complejo";
  setAudienceMode: (mode: "pelotero" | "complejo") => void;
}

const CANCHAS_SURCO = [
  {
    id: "c1",
    name: "Cancha 1 - 'La Bombonera' (7v7)",
    type: "Grass Sintético Monofilamento",
    price: 180,
    slots: [
      { time: "18:00 - 19:00", status: "booked", player: "Carlos M. (Yape)" },
      { time: "19:00 - 20:00", status: "booked", player: "Renzo V. (Plin)" },
      { time: "20:00 - 21:00", status: "last", player: "🔥 ¡Último Slot!" },
      { time: "21:00 - 22:00", status: "available", player: "Disponible" },
      { time: "22:00 - 23:00", status: "available", player: "Disponible" },
    ]
  },
  {
    id: "c2",
    name: "Cancha 2 - 'El Maracaná' (6v6 Con Techo)",
    type: "Techado con Luces LED Pro",
    price: 160,
    slots: [
      { time: "18:00 - 19:00", status: "booked", player: "Diego R." },
      { time: "19:00 - 20:00", status: "available", player: "Disponible" },
      { time: "20:00 - 21:00", status: "booked", player: "FC Surco" },
      { time: "21:00 - 22:00", status: "booked", player: "Los Peloteros FC" },
      { time: "22:00 - 23:00", status: "available", player: "Disponible" },
    ]
  }
];

export function InteractiveBookingDemo({
  onOpenBooking,
  audienceMode,
  setAudienceMode
}: InteractiveBookingDemoProps) {
  const [activeCancha, setActiveCancha] = useState(CANCHAS_SURCO[0]);
  const [selectedSlotTime, setSelectedSlotTime] = useState("20:00 - 21:00");
  const [numPlayers, setNumPlayers] = useState(14);
  const [lightControlOn, setLightControlOn] = useState(true);
  const [autoYapeActive, setAutoYapeActive] = useState(true);

  const pricePerPlayer = Math.ceil(activeCancha.price / numPlayers);

  return (
    <section id="demo" className="py-20 bg-stadium relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Experiencia Interactiva En Vivo
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Prueba cómo funciona <span className="text-gradient-turf">Separa.pe</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Interactúa con nuestra demo en vivo como pelotero o como administrador de complejo deportivo.
          </p>

          {/* Mode Selector Buttons */}
          <div className="mt-6 inline-flex rounded-xl bg-emerald-950/60 p-1.5 border border-emerald-800/40">
            <button
              onClick={() => setAudienceMode("pelotero")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                audienceMode === "pelotero"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" />
              Vista Pelotero (Reserva en 1-Clic)
            </button>
            <button
              onClick={() => setAudienceMode("complejo")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                audienceMode === "complejo"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Vista Admin (Software para Canchas)
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Demo Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            {audienceMode === "pelotero" ? (
              /* PELOTERO DEMO VIEW */
              <motion.div
                key="pelotero-demo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Side: Field & Slot Selection */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        Complejo DeporSurco - Sede Caminos del Inca
                      </h3>
                      <p className="text-xs text-gray-400">Av. Caminos del Inca 1420, Surco • Grass Sintético Pro</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-2.5 py-1 rounded-full font-semibold">
                      Abierto 24 Horas
                    </span>
                  </div>

                  {/* Pitch Selector */}
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {CANCHAS_SURCO.map((cancha) => (
                      <button
                        key={cancha.id}
                        onClick={() => setActiveCancha(cancha)}
                        className={`flex flex-col text-left p-3.5 rounded-xl border transition-all min-w-[220px] ${
                          activeCancha.id === cancha.id
                            ? "bg-emerald-950/80 border-emerald-400 shadow-md shadow-emerald-500/20"
                            : "bg-emerald-950/30 border-emerald-800/40 hover:border-emerald-700"
                        }`}
                      >
                        <span className="text-sm font-extrabold text-white">{cancha.name}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{cancha.type}</span>
                        <span className="text-xs font-bold text-emerald-400 mt-2">
                          {formatCurrency(cancha.price)} / hora
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Slot Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center justify-between">
                      <span>Selecciona Horario para Hoy (Noche):</span>
                      <span className="text-emerald-400 text-[11px] font-normal">🟢 En vivo</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCancha.slots.map((slot, i) => {
                        const isSelected = selectedSlotTime === slot.time && slot.status !== "booked";
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              if (slot.status !== "booked") {
                                setSelectedSlotTime(slot.time);
                              }
                            }}
                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              slot.status === "booked"
                                ? "bg-gray-900/40 border-gray-800 opacity-60 cursor-not-allowed"
                                : isSelected
                                ? "bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20"
                                : slot.status === "last"
                                ? "bg-amber-950/30 border-amber-500/50 hover:border-amber-400"
                                : "bg-emerald-950/30 border-emerald-800/40 hover:border-emerald-600"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Clock className={`h-4 w-4 ${
                                slot.status === "booked" ? "text-gray-500" : isSelected ? "text-emerald-400" : "text-gray-300"
                              }`} />
                              <div>
                                <div className="text-sm font-bold text-white">{slot.time}</div>
                                <div className="text-[11px] text-gray-400">{slot.player}</div>
                              </div>
                            </div>

                            {slot.status === "booked" ? (
                              <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded font-semibold">
                                Ocupado
                              </span>
                            ) : (
                              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg ${
                                isSelected 
                                  ? "bg-emerald-400 text-black"
                                  : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                              }`}>
                                {isSelected ? "Seleccionado" : "Reservar"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Side: Split Payment Calculator & Booking Action */}
                <div className="lg:col-span-5 bg-emerald-950/50 rounded-2xl p-5 border border-emerald-800/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-4">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                        Calculadora "Dividir Cuota"
                      </h4>
                      <span className="bg-purple-900/60 text-purple-300 border border-purple-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                        YAPE / PLIN
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Cancha seleccionada:</span>
                        <span className="font-bold text-white">{activeCancha.name.split("-")[0]}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Horario:</span>
                        <span className="font-bold text-emerald-400">{selectedSlotTime}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Precio Total Cancha:</span>
                        <span className="font-extrabold text-white text-base">{formatCurrency(activeCancha.price)}</span>
                      </div>

                      {/* Number of Players Slider */}
                      <div className="pt-2">
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-gray-300">Cantidad de Amigos/Jugadores:</span>
                          <span className="text-emerald-400 font-extrabold">{numPlayers} personas</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="20"
                          value={numPlayers}
                          onChange={(e) => setNumPlayers(parseInt(e.target.value))}
                          className="w-full accent-emerald-400 bg-emerald-900 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Result Box */}
                      <div className="bg-emerald-900/40 border border-emerald-500/40 p-4 rounded-xl text-center shadow-inner">
                        <span className="text-xs text-emerald-300 font-medium block">
                          Cuota individual por jugador:
                        </span>
                        <span className="text-3xl font-extrabold text-gradient-turf block mt-0.5">
                          {formatCurrency(pricePerPlayer)} <span className="text-xs text-gray-300 font-normal">/ persona</span>
                        </span>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Generamos un link para que cada amigo yapee directamente la seña.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => onOpenBooking({
                        canchaName: activeCancha.name,
                        slotTime: selectedSlotTime,
                        price: activeCancha.price,
                        perPlayer: pricePerPlayer
                      })}
                      className="neon-glow-btn w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 py-3.5 text-base font-extrabold text-black shadow-lg"
                    >
                      <Sparkles className="h-5 w-5 fill-black" />
                      <span>Confirmar Reserva con Yape / Plin</span>
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                      <Lock className="h-3 w-3 text-emerald-400" /> Confirmación automática en 30 segundos
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ADMIN COMPLEX DEMO VIEW */
              <motion.div
                key="admin-demo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Admin Dashboard Sidebar Controls */}
                <div className="lg:col-span-4 flex flex-col gap-4 bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/50">
                  <div className="flex items-center gap-3 border-b border-emerald-800/40 pb-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-400 flex items-center justify-center text-black font-extrabold">
                      🏟️
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Complejo 'El Golazo Surco'</h4>
                      <p className="text-xs text-amber-300 font-medium">Panel de Administración SaaS 24/7</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/40">
                      <span className="text-xs text-gray-300 font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-emerald-400" /> Validaciones Yape Automáticas (IA)
                      </span>
                      <button
                        onClick={() => setAutoYapeActive(!autoYapeActive)}
                        className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                          autoYapeActive ? "bg-emerald-500 justify-end" : "bg-gray-700 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-black font-bold" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/40">
                      <span className="text-xs text-gray-300 font-medium flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-400" /> Control Luces Reflectores IoT
                      </span>
                      <button
                        onClick={() => setLightControlOn(!lightControlOn)}
                        className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                          lightControlOn ? "bg-amber-400 justify-end" : "bg-gray-700 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-black font-bold" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-800/40">
                    <div className="text-xs text-gray-400 mb-2">Ingresos del Día (Surco):</div>
                    <div className="text-3xl font-extrabold text-amber-400">S/ 2,480.00</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                      <TrendingUp className="h-3.5 w-3.5" /> +42% vs mes anterior (Sin WhatsApp)
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking()}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3 rounded-xl text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Prueba Gratis (14 Días)</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Admin Occupancy Grid */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Activity className="h-5 w-5 text-amber-400" />
                      Ocupación de Canchas en Tiempo Real
                    </h3>
                    <span className="text-xs text-gray-400">4 Canchas • 100% Sincronizado</span>
                  </div>

                  {/* Simulated Occupancy Grid Table */}
                  <div className="space-y-3">
                    {[
                      { name: "Cancha 1 (Sintético 7v7)", status: "En juego - Reservado vía Yape (S/ 180)", light: true, time: "20:00 - 21:00" },
                      { name: "Cancha 2 (Techado 5v5)", status: "Reservado vía Plin (S/ 160)", light: true, time: "20:00 - 21:00" },
                      { name: "Cancha 3 (Gras Natural 11v11)", status: "🟢 Slot Disponible - Promoción Relámpago", light: false, time: "20:00 - 21:00" },
                      { name: "Cancha 4 (Sintético 6v6)", status: "Reservado vía Seña (S/ 150)", light: true, time: "21:00 - 22:00" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-xs text-gray-300 mt-0.5">{item.status}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                            item.light && lightControlOn
                              ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                          }`}>
                            {item.light && lightControlOn ? "💡 Luces ON" : "🌑 Luces OFF"}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
