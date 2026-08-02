"use client";

import { useState } from "react";
import { 
  Building2, 
  Bell, 
  Bot, 
  Calendar, 
  Plus, 
  Sparkles, 
  Search, 
  ChevronDown,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface DashboardHeaderProps {
  activeBranch: string;
  setActiveBranch: (branch: string) => void;
  onOpenNewBooking: () => void;
  unreadNotifications: number;
}

export function DashboardHeader({
  activeBranch,
  setActiveBranch,
  onOpenNewBooking,
  unreadNotifications
}: DashboardHeaderProps) {
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  const branches = [
    { id: "los-olivos", name: "Sede Los Olivos", address: "Av. Carlos Izaguirre 1450" },
    { id: "surco", name: "Sede Surco", address: "Av. Primavera 890" },
    { id: "san-miguel", name: "Sede San Miguel", address: "Av. La Marina 2100" }
  ];

  return (
    <header className="h-16 border-b border-emerald-900/30 bg-[#060c08]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Brand & Branch Selector */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-black font-black text-lg tracking-tighter">S.</span>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-lg flex items-center gap-1.5">
              separa<span className="text-emerald-400">.pe</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                SaaS Admin
              </span>
            </h1>
          </div>
        </div>

        {/* Branch Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
            className="flex items-center space-x-2 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 text-emerald-200 px-3 py-1.5 rounded-lg text-sm transition-all"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">
              {branches.find(b => b.id === activeBranch)?.name || "Seleccionar Sede"}
            </span>
            <ChevronDown className="w-4 h-4 text-emerald-400" />
          </button>

          {showBranchDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#0a120d] border border-emerald-800/60 rounded-xl shadow-2xl p-1 z-50">
              {branches.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBranch(b.id);
                    setShowBranchDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    activeBranch === b.id 
                      ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50" 
                      : "text-gray-300 hover:bg-emerald-950/60"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-sm">{b.name}</p>
                    <p className="text-gray-400 text-[11px]">{b.address}</p>
                  </div>
                  {activeBranch === b.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center relative w-80">
        <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar reserva, cliente o DNI/RUC..."
          className="w-full bg-emerald-950/20 border border-emerald-900/50 text-sm text-gray-200 placeholder-gray-500 pl-9 pr-4 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* WhatsApp AI Agent Live Status Indicator */}
        <div className="hidden lg:flex items-center space-x-2 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-300">Bot IA Activo</span>
        </div>

        {/* Notifications Button */}
        <button className="relative p-2 rounded-lg bg-emerald-950/30 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/40 transition-colors border border-emerald-900/40">
          <Bell className="w-4 h-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Quick New Booking Button */}
        <button
          onClick={onOpenNewBooking}
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-1.5 rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Reserva</span>
        </button>
      </div>
    </header>
  );
}
