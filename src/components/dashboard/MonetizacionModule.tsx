"use client";

import { useState, useEffect } from "react";
import { 
  Coins, 
  PartyPopper, 
  GraduationCap, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Clock, 
  ArrowRight,
  TrendingUp,
  X,
  Loader2
} from "lucide-react";
import { 
  fetchCreditPackagesFromSupabase, 
  createCreditPackageInSupabase,
  fetchSpecialServicesFromSupabase,
  createSpecialServiceInSupabase
} from "@/lib/supabase";

export function MonetizacionModule() {
  const [creditPacks, setCreditPacks] = useState<any[]>([]);
  const [specialServices, setSpecialServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal forms
  const [showPackModal, setShowPackModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Form states
  const [packName, setPackName] = useState("");
  const [totalMinutes, setTotalMinutes] = useState(600);
  const [packPrice, setPackPrice] = useState(900);
  const [discountTag, setDiscountTag] = useState("18% OFF");

  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState(450);
  const [serviceType, setServiceType] = useState("Evento");

  const [submitting, setSubmitting] = useState(false);

  const loadMonetizationData = async () => {
    setLoading(true);
    try {
      const [packs, services] = await Promise.all([
        fetchCreditPackagesFromSupabase(),
        fetchSpecialServicesFromSupabase()
      ]);
      setCreditPacks(packs);
      setSpecialServices(services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMonetizationData();
  }, []);

  const handleCreatePack = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createCreditPackageInSupabase({
        name: packName,
        total_minutes: totalMinutes,
        price: packPrice,
        discount_tag: discountTag
      });
      setShowPackModal(false);
      setPackName("");
      await loadMonetizationData();
    } catch (err) {
      alert("Error al guardar paquete prepago");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createSpecialServiceInSupabase({
        title: serviceTitle,
        description: serviceDesc,
        price: servicePrice,
        type: serviceType
      });
      setShowServiceModal(false);
      setServiceTitle("");
      setServiceDesc("");
      await loadMonetizationData();
    } catch (err) {
      alert("Error al guardar servicio especial");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Coins className="w-5 h-5 text-emerald-400" />
          Servicios Adicionales, Monetización & Bolsa de Minutos (Supabase Live)
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Crea y administra paquetes prepago y convenios especiales guardados en Supabase PostgreSQL.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-emerald-400 flex items-center justify-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-mono">Cargando Paquetes desde Supabase DB...</span>
        </div>
      ) : (
        <>
          {/* Section 1: Bolsa de Minutos / Créditos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Bolsa de Minutos / Paquetes Prepago Atractivos
              </h3>
              <button
                onClick={() => setShowPackModal(true)}
                className="text-xs bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Crear Paquete Prepago
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {creditPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-[#080e0a] border border-emerald-900/40 rounded-2xl p-5 space-y-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {pack.discount_tag || pack.discount || "Oferta"}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {pack.sales_count || pack.salesCount || 0} vendidos
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-lg">{pack.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">{(pack.total_minutes || pack.hours * 60) / 60} horas acreditadas</p>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-2 border-t border-emerald-900/30">
                    <span className="text-2xl font-black text-white font-mono">S/ {pack.price}.00</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Paquetes de Eventos & Academias */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-emerald-400" />
                Paquetes Especiales & Convenios de Academias
              </h3>
              <button
                onClick={() => setShowServiceModal(true)}
                className="text-xs bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Nuevo Paquete de Evento
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#080e0a] border border-emerald-900/40 rounded-2xl p-5 flex items-start space-x-4 hover:border-emerald-500/50 transition-all"
                >
                  <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    <PartyPopper className="w-6 h-6" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300">
                        {service.type}
                      </span>
                      <span className="text-sm font-bold text-white font-mono">S/ {service.price}.00</span>
                    </div>
                    <h4 className="font-bold text-white text-base">{service.title}</h4>
                    <p className="text-xs text-gray-400">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal Add Credit Package */}
      {showPackModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#080e0a] border border-emerald-800/60 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="font-bold text-white text-base">Crear Paquete Prepago en Supabase</h3>
              <button onClick={() => setShowPackModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePack} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Nombre del Paquete</label>
                <input
                  type="text"
                  required
                  value={packName}
                  onChange={(e) => setPackName(e.target.value)}
                  placeholder="ej. Pack 15 Horas Nocturnas"
                  className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Total Minutos</label>
                  <input
                    type="number"
                    value={totalMinutes}
                    onChange={(e) => setTotalMinutes(Number(e.target.value))}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Precio (S/)</label>
                  <input
                    type="number"
                    value={packPrice}
                    onChange={(e) => setPackPrice(Number(e.target.value))}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Etiqueta de Descuento</label>
                <input
                  type="text"
                  value={discountTag}
                  onChange={(e) => setDiscountTag(e.target.value)}
                  placeholder="ej. 25% OFF"
                  className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPackModal(false)}
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

      {/* Modal Add Special Service */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#080e0a] border border-emerald-800/60 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <h3 className="font-bold text-white text-base">Crear Paquete de Evento en Supabase</h3>
              <button onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Título del Paquete</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="ej. Paquete Torneo Relámpago"
                  className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Descripción</label>
                <textarea
                  required
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="ej. Incluye 4 horas de Cancha 4 + sonido..."
                  rows={3}
                  className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Precio (S/)</label>
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(Number(e.target.value))}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block">Tipo</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-emerald-950/30 border border-emerald-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Evento">Evento</option>
                    <option value="Mensual">Mensual</option>
                    <option value="Torneo">Torneo</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
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
