"use client";

import { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Phone, 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles,
  Lock,
  Plus,
  Loader2,
  XCircle
} from "lucide-react";
import { fetchFieldsFromSupabase, fetchBookingsFromSupabase, cancelBookingInSupabase } from "@/lib/supabase";

interface BookingSlot {
  id: string;
  fieldId: string;
  timeSlot: string;
  status: "available" | "confirmed" | "wa_hold" | "maintenance" | "gcal_sync";
  customerName?: string;
  customerPhone?: string;
  amount?: number;
  paymentMethod?: string;
  dbBookingId?: string;
}

export function PitchGridTimeline({ onSelectSlot }: { onSelectSlot: (slot: any) => void }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [fields, setFields] = useState<any[]>([]);
  const [dbBookings, setDbBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const timeSlots = [
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [fData, bData] = await Promise.all([
        fetchFieldsFromSupabase(),
        fetchBookingsFromSupabase(selectedDate)
      ]);
      setFields(fData);
      setDbBookings(bData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("¿Seguro de cancelar esta reserva en Supabase DB?")) return;
    try {
      await cancelBookingInSupabase(bookingId);
      await loadData();
    } catch (e) {
      alert("Error al cancelar la reserva");
    }
  };

  const getSlotDetails = (fieldId: string, timeSlot: string): BookingSlot => {
    // Look up in real DB bookings
    const match = dbBookings.find(b => b.field_id === fieldId && b.start_time.startsWith(timeSlot) && b.status !== 'cancelled');
    if (match) {
      return {
        id: match.id,
        dbBookingId: match.id,
        fieldId: match.field_id,
        timeSlot: match.start_time,
        status: match.status === 'pending_payment' ? 'wa_hold' : (match.google_event_id ? 'gcal_sync' : 'confirmed'),
        customerName: match.customer_name,
        customerPhone: match.customer_phone,
        amount: match.total_price,
        paymentMethod: match.payment_method || 'yape'
      };
    }

    return {
      id: `${fieldId}-${timeSlot}`,
      fieldId,
      timeSlot,
      status: "available"
    };
  };

  return (
    <div className="space-y-6">
      {/* Date Header Controls & Status Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-emerald-950/60 border border-emerald-800/60 text-white font-bold text-sm px-3 py-1 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button 
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="text-xs text-emerald-400 font-mono bg-emerald-900/40 px-2.5 py-1 rounded-md border border-emerald-700/50 hover:bg-emerald-800/50"
          >
            Hoy
          </button>
        </div>

        {/* Legend / Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterStatus === "all"
                ? "bg-emerald-500 text-black font-bold"
                : "bg-emerald-950/40 text-gray-400 border border-emerald-900/50 hover:text-white"
            }`}
          >
            Todos ({dbBookings.length})
          </button>
          <button
            onClick={() => setFilterStatus("available")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
              filterStatus === "available"
                ? "bg-emerald-900 text-emerald-200 border border-emerald-500"
                : "text-emerald-400/80 hover:text-emerald-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Libre</span>
          </button>
          <button
            onClick={() => setFilterStatus("confirmed")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
              filterStatus === "confirmed"
                ? "bg-cyan-900 text-cyan-200 border border-cyan-500"
                : "text-cyan-400/80 hover:text-cyan-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Confirmado</span>
          </button>
          <button
            onClick={() => setFilterStatus("wa_hold")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
              filterStatus === "wa_hold"
                ? "bg-amber-900 text-amber-200 border border-amber-500"
                : "text-amber-400/80 hover:text-amber-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Hold WA</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-emerald-400 flex items-center justify-center space-x-2 bg-[#070e0a] border border-emerald-900/40 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-mono">Sincronizando Reservas en tiempo real desde Supabase DB...</span>
        </div>
      ) : (
        /* Main Gantt Grid */
        <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-950/60 border-b border-emerald-900/50">
                  <th className="p-4 w-48 text-xs font-mono uppercase text-emerald-400 font-semibold border-r border-emerald-900/50">
                    Horario / Cancha
                  </th>
                  {fields.map((f) => (
                    <th key={f.id} className="p-4 min-w-[200px] border-r border-emerald-900/40 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{f.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 uppercase">
                          {f.type?.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-normal mt-0.5">{f.surface_type || f.surface}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30">
                {timeSlots.map((time) => {
                  const isNight = parseInt(time.split(":")[0]) >= 18;
                  return (
                    <tr key={time} className="hover:bg-emerald-950/10 transition-colors">
                      {/* Time Label */}
                      <td className="p-3 text-xs font-mono font-bold text-gray-300 bg-emerald-950/20 border-r border-emerald-900/50 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-500" /> {time}
                        </span>
                        {isNight && (
                          <span className="text-[9px] bg-amber-950/60 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800/40">
                            Noche 💡
                          </span>
                        )}
                      </td>

                      {/* Pitch Slots */}
                      {fields.map((f) => {
                        const slot = getSlotDetails(f.id, time);
                        const price = isNight ? (f.price_night || f.priceNight) : (f.price_day || f.priceDay);

                        if (filterStatus !== "all" && slot.status !== filterStatus) {
                          return (
                            <td key={f.id} className="p-2 border-r border-emerald-900/30 opacity-25">
                              <div className="h-16 rounded-xl border border-dashed border-emerald-900/40 flex items-center justify-center text-[11px] text-gray-600">
                                Filtrado
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td key={f.id} className="p-2 border-r border-emerald-900/30 last:border-r-0">
                            {slot.status === "available" && (
                              <button
                                onClick={() => onSelectSlot({ field: f, time, price })}
                                className="w-full h-16 rounded-xl bg-emerald-950/20 hover:bg-emerald-900/40 border border-emerald-800/30 hover:border-emerald-500/60 transition-all p-2 flex flex-col justify-between text-left group"
                              >
                                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                                  <span className="font-semibold text-emerald-300">Disponible</span>
                                  <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-xs font-mono font-bold text-white">
                                  S/ {price}.00
                                </span>
                              </button>
                            )}

                            {(slot.status === "confirmed" || slot.status === "gcal_sync") && (
                              <div className="w-full h-16 rounded-xl bg-cyan-950/40 border border-cyan-600/50 p-2.5 flex flex-col justify-between shadow-md relative group">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-bold text-cyan-200 truncate max-w-[130px]">
                                    {slot.customerName}
                                  </span>
                                  <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-900 text-cyan-300">
                                    {slot.paymentMethod || "yape"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                                  <span>S/ {slot.amount}.00</span>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                                </div>

                                {slot.dbBookingId && (
                                  <button
                                    onClick={() => handleCancelBooking(slot.dbBookingId!)}
                                    className="absolute -top-1.5 -right-1.5 bg-red-900 text-red-200 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Cancelar Reserva"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}

                            {slot.status === "wa_hold" && (
                              <div className="w-full h-16 rounded-xl bg-amber-950/50 border border-amber-500/60 p-2.5 flex flex-col justify-between animate-pulse">
                                <div className="flex items-center justify-between text-xs text-amber-200">
                                  <span className="font-semibold truncate max-w-[110px] flex items-center gap-1">
                                    <Bot className="w-3 h-3 text-amber-400" /> {slot.customerName}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-amber-400">
                                  <span className="font-mono text-amber-300">Hold WA DB</span>
                                  <span className="text-[10px] underline cursor-pointer hover:text-amber-200">
                                    Ver Chat
                                  </span>
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
