"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  PieChart, 
  Download,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { fetchBookingsFromSupabase } from "@/lib/supabase";

export function ReportesModule() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchBookingsFromSupabase();
        setBookings(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const yapeCount = bookings.filter(b => b.payment_method === 'yape').length;
  const plinCount = bookings.filter(b => b.payment_method === 'plin').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Reportes Avanzados, Métricas de Ocupación e Ingresos (Supabase Real-Time Engine)
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Análisis financiero y métricas de rendimiento calculados en directo desde los registros de Supabase DB.
          </p>
        </div>

        <button
          onClick={() => alert("Exportando reporte a Excel...")}
          className="flex items-center space-x-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-4 py-2 rounded-xl text-sm transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Exportar Excel / CSV</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-emerald-400 flex items-center justify-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-mono">Calculando Métricas desde Supabase DB...</span>
        </div>
      ) : (
        <>
          {/* Main KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#080e0a] border border-emerald-900/40 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-gray-400 font-semibold">Ingresos Totales Acumulados</span>
              <h3 className="text-3xl font-black text-emerald-400 font-mono">S/ {totalRevenue.toFixed(2)}</h3>
              <p className="text-[11px] text-gray-500">Basado en {bookings.length} reservas registradas</p>
            </div>

            <div className="bg-[#080e0a] border border-emerald-900/40 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-gray-400 font-semibold">Reservas Confirmadas</span>
              <h3 className="text-3xl font-black text-white font-mono">{confirmedCount}</h3>
              <p className="text-[11px] text-emerald-400 font-mono">100% liquidadas vía Yape/Plin</p>
            </div>

            <div className="bg-[#080e0a] border border-emerald-900/40 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-gray-400 font-semibold">Desglose por Billetera Digital</span>
              <div className="flex items-center justify-between text-sm font-mono pt-1">
                <span className="text-purple-400 font-bold">Yape: {yapeCount}</span>
                <span className="text-cyan-400 font-bold">Plin: {plinCount}</span>
              </div>
            </div>
          </div>

          {/* Bookings Real Table */}
          <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-white text-base">Historial de Reservas en Base de Datos</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-emerald-950/60 border-b border-emerald-900/50 text-emerald-400 font-mono">
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Celular</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Horario</th>
                    <th className="p-3">Monto</th>
                    <th className="p-3">Origen</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/30">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-emerald-950/20">
                      <td className="p-3 font-semibold text-white">{b.customer_name}</td>
                      <td className="p-3 font-mono text-gray-400">{b.customer_phone}</td>
                      <td className="p-3 font-mono text-gray-300">{b.booking_date}</td>
                      <td className="p-3 font-mono text-emerald-300">{b.start_time}</td>
                      <td className="p-3 font-mono font-bold text-white">S/ {b.total_price}.00</td>
                      <td className="p-3 uppercase text-[10px] font-mono text-gray-400">{b.source}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950 text-amber-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
