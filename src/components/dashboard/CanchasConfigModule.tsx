"use client";

import { useState, useEffect } from "react";
import { 
  Dribbble, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Moon, 
  Sun, 
  Check, 
  AlertTriangle,
  Lightbulb,
  X,
  Loader2
} from "lucide-react";
import { fetchFieldsFromSupabase, createFieldInSupabase, deleteFieldInSupabase } from "@/lib/supabase";

export function CanchasConfigModule() {
  const [pitches, setPitches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState("futbol_6");
  const [surfaceType, setSurfaceType] = useState("Sintético Monofilamento FIFA");
  const [priceDay, setPriceDay] = useState(80);
  const [priceNight, setPriceNight] = useState(110);
  const [submitting, setSubmitting] = useState(false);

  const loadPitches = async () => {
    setLoading(true);
    try {
      const data = await fetchFieldsFromSupabase();
      setPitches(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPitches();
  }, []);

  const handleCreatePitch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createFieldInSupabase({
        name,
        type,
        surface_type: surfaceType,
        price_day: priceDay,
        price_night: priceNight
      });
      setShowAddModal(false);
      setName("");
      await loadPitches();
    } catch (err) {
      alert("Error al crear la cancha en Supabase");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePitch = async (id: string) => {
    if (!confirm("¿Seguro de eliminar esta cancha de Supabase?")) return;
    try {
      await deleteFieldInSupabase(id);
      setPitches(pitches.filter(p => p.id !== id));
    } catch (err) {
      alert("Error al eliminar la cancha");
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Dribbble className="w-5 h-5 text-emerald-400" />
            Gestión de Canchas & Tarifario Dinámico (Supabase Real-Time DB)
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Crea, edita y elimina canchas reales persistidas directamente en Supabase PostgreSQL.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nueva Cancha</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-emerald-400 flex items-center justify-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-mono">Cargando Canchas desde Supabase DB...</span>
        </div>
      ) : (
        /* Grid of Pitches */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pitches.map((p) => (
            <div
              key={p.id}
              className="bg-[#080f0b] border border-emerald-900/40 rounded-2xl p-5 space-y-4 hover:border-emerald-500/50 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    {p.type?.replace('_', ' ')}
                  </span>
                  <h3 className="font-bold text-white text-base mt-2 group-hover:text-emerald-300 transition-colors">
                    {p.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleDeletePitch(p.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/60 transition-colors"
                    title="Eliminar Cancha"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Rates Summary */}
              <div className="space-y-2 pt-2 border-t border-emerald-900/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> Tarifa Día (08:00 - 18:00)
                  </span>
                  <span className="font-mono font-bold text-white">S/ {p.price_day || p.priceDay}.00/h</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-400" /> Tarifa Noche (18:00 - 00:00)
                  </span>
                  <span className="font-mono font-bold text-emerald-400">S/ {p.price_night || p.priceNight}.00/h</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400 border-t border-emerald-900/30">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Lightbulb className="w-3.5 h-3.5" /> Iluminación LED OK
                </span>
                <span className="bg-emerald-950/50 px-2 py-0.5 rounded text-emerald-300">
                  {p.is_active !== false ? "Operativa" : "Inactiva"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Pitch */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#080e0a] border border-emerald-800/60 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="font-bold text-white text-base">Agregar Nueva Cancha a Supabase</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePitch} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Nombre de la Cancha</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Cancha 5 - Camp Nou"
                  className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Formato</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="futbol_5">Fútbol 5</option>
                    <option value="futbol_6">Fútbol 6</option>
                    <option value="futbol_7">Fútbol 7</option>
                    <option value="futbol_8">Fútbol 8</option>
                    <option value="futbol_11">Fútbol 11</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Tipo de Césped</label>
                  <input
                    type="text"
                    value={surfaceType}
                    onChange={(e) => setSurfaceType(e.target.value)}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Precio Día (S/)</label>
                  <input
                    type="number"
                    value={priceDay}
                    onChange={(e) => setPriceDay(Number(e.target.value))}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Precio Noche (S/)</label>
                  <input
                    type="number"
                    value={priceNight}
                    onChange={(e) => setPriceNight(Number(e.target.value))}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold disabled:opacity-50"
                >
                  {submitting ? "Guardando..." : "Guardar en Supabase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
