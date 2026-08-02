"use client";

import { useState } from "react";
import { 
  CalendarSync, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  Globe, 
  Clock,
  Sparkles
} from "lucide-react";

export function GoogleCalendarSyncModule() {
  const [syncing, setSyncing] = useState(false);

  const calendars = [
    { id: "cal1", branchName: "Sede Los Olivos", calendarId: "losolivos.separa@gmail.com", status: "synced", lastSync: "Hace 1 minuto", totalEvents: 142 },
    { id: "cal2", branchName: "Sede Surco", calendarId: "surco.separa@gmail.com", status: "synced", lastSync: "Hace 3 minutos", totalEvents: 98 },
    { id: "cal3", branchName: "Sede San Miguel", calendarId: "sanmiguel.separa@gmail.com", status: "synced", lastSync: "Hace 5 minutos", totalEvents: 67 }
  ];

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarSync className="w-5 h-5 text-emerald-400" />
            Sincronización Bidireccional con Google Calendar
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Garantiza cero reservas dobles (overbooking) al sincronizar automáticamente con Google Calendar en tiempo real mediante Webhooks.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={syncing}
          className="flex items-center space-x-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-4 py-2 rounded-xl text-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Sincronizando..." : "Forzar Sincronización"}</span>
        </button>
      </div>

      {/* Connected Calendars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calendars.map((cal) => (
          <div
            key={cal.id}
            className="bg-[#080f0b] border border-emerald-900/40 rounded-2xl p-5 space-y-4 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-base">{cal.branchName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Webhook Activo
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs text-gray-400">
              <p className="text-gray-300 font-semibold">{cal.calendarId}</p>
              <p className="text-[11px] text-gray-500">Eventos Totales: {cal.totalEvents}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-emerald-900/30">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> {cal.lastSync}
              </span>
              <button className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                <span>Abrir en GCal</span> <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sync Architecture Status Banner */}
      <div className="bg-gradient-to-r from-emerald-950/50 to-teal-950/30 border border-emerald-800/50 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Protección Anticolisión en Tiempo Real (Anti-Sync Loops)</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
          El sistema asigna un hash único de evento (`google_event_id`) y utiliza cierres de exclusión temporal en Upstash Redis para evitar bucles de actualización entre Supabase y Google Calendar.
        </p>
      </div>
    </div>
  );
}
