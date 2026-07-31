"use me";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Shield, Check, Flame } from "lucide-react";

const REGIONS = [
  {
    name: "Lima Metropolitana",
    count: "240+ Canchas",
    districts: [
      "Surco (38 Canchas)",
      "San Borja (24 Canchas)",
      "Miraflores (18 Canchas)",
      "Los Olivos (42 Canchas)",
      "La Molina (22 Canchas)",
      "San Miguel (20 Canchas)",
      "Chorrillos (16 Canchas)",
      "La Victoria / Matute (14 Canchas)"
    ]
  },
  {
    name: "Arequipa",
    count: "45+ Canchas",
    districts: [
      "Yanahuara",
      "Cayma",
      "José Luis Bustamante",
      "Cerro Colorado"
    ]
  },
  {
    name: "La Libertad (Trujillo)",
    count: "38+ Canchas",
    districts: [
      "El Recreo",
      "Víctor Larco",
      "La Esperanza",
      "Trujillo Centro"
    ]
  },
  {
    name: "Lambayeque (Chiclayo)",
    count: "28+ Canchas",
    districts: [
      "Pimentel",
      "Chiclayo Centro",
      "La Victoria Chiclayo"
    ]
  },
  {
    name: "Junín (Huancayo) & Cusco",
    count: "30+ Canchas",
    districts: [
      "El Tambo",
      "Wanchaq Cusco",
      "Huancayo Centro"
    ]
  }
];

interface RegionalCoverageProps {
  onOpenBooking: (prefill?: any) => void;
}

export function RegionalCoverage({ onOpenBooking }: RegionalCoverageProps) {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <section id="cobertura" className="py-20 bg-[#040806] relative border-t border-emerald-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <MapPin className="h-3.5 w-3.5" />
            Red Nacional Separa.pe
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Las mejores canchas del Perú en <span className="text-gradient-turf">un solo lugar</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Explora la disponibilidad en tiempo real en los distritos con mayor tradición pichanguera.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          {REGIONS.map((reg) => (
            <button
              key={reg.name}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                selectedRegion.name === reg.name
                  ? "bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20"
                  : "bg-emerald-950/40 text-gray-300 border-emerald-800/40 hover:border-emerald-600"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{reg.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                selectedRegion.name === reg.name ? "bg-black text-emerald-300 font-bold" : "bg-emerald-900 text-emerald-300"
              }`}>
                {reg.count}
              </span>
            </button>
          ))}
        </div>

        {/* District Grid for Active Region */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-400" />
                Canchas disponibles en {selectedRegion.name}
              </h3>
              <p className="text-xs text-gray-400">Verificadas con refletores LED, vestuarios y estacionamiento seguro</p>
            </div>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {selectedRegion.count}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {selectedRegion.districts.map((dist, idx) => (
              <div
                key={idx}
                onClick={() => onOpenBooking({ district: dist.split("(")[0].trim() })}
                className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-400 hover:bg-emerald-950/60 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {dist}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400" /> Reserva inmediata
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
