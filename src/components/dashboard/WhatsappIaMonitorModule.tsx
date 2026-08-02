"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquareCode, 
  Bot, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles, 
  Send,
  UserCheck,
  RefreshCw,
  Eye,
  Loader2
} from "lucide-react";
import { fetchWhatsappLogsFromSupabase, sendWhatsappMessageInSupabase } from "@/lib/supabase";

export function WhatsappIaMonitorModule() {
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);
  const [selectedChat, setSelectedChat] = useState("chat1");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchWhatsappLogsFromSupabase();
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSending(true);
    try {
      await sendWhatsappMessageInSupabase({
        customer_phone: "+51 987 654 321",
        customer_name: "Roberto Mendoza",
        message_text: replyText,
        direction: "outgoing",
        is_bot_reply: !isHumanTakeover
      });
      setReplyText("");
      await loadLogs();
    } catch (err) {
      alert("Error al guardar mensaje en Supabase");
    } finally {
      setSending(false);
    }
  };

  const chats = [
    {
      id: "chat1",
      customerName: "Roberto Mendoza",
      phone: "+51 987 654 321",
      time: "Hace 2 min",
      lastMessage: "Envié la captura de Yape por S/ 100",
      status: "ocr_pending",
      ocrScore: "98.5%",
      amount: "S/ 100.00",
      opNumber: "8912345"
    },
    {
      id: "chat2",
      customerName: "Carlos Silva",
      phone: "+51 912 345 678",
      time: "Hace 15 min",
      lastMessage: "¡Reserva confirmada! Cancha 1 8pm",
      status: "confirmed",
      ocrScore: "99.1%",
      amount: "S/ 100.00",
      opNumber: "9123456"
    }
  ];

  const currentChatData = chats.find(c => c.id === selectedChat) || chats[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-emerald-400" />
            Asistente Virtual WhatsApp & Motor OCR (Supabase Persisted)
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Persistencia real en Supabase DB para mensajes de WhatsApp, verificación OCR de comprobantes Yape/Plin e intervención humana.
          </p>
        </div>

        {/* Human Takeover Toggle Switch */}
        <div className="flex items-center space-x-3 bg-emerald-950/40 border border-emerald-800/60 px-4 py-2 rounded-xl">
          <div className="flex items-center space-x-2">
            {isHumanTakeover ? (
              <UserCheck className="w-4 h-4 text-amber-400" />
            ) : (
              <Bot className="w-4 h-4 text-emerald-400" />
            )}
            <span className="text-xs font-semibold text-white">
              {isHumanTakeover ? "Modo Control Humano Activo" : "Agente IA Autónomo"}
            </span>
          </div>
          <button
            onClick={() => setIsHumanTakeover(!isHumanTakeover)}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
              isHumanTakeover ? "bg-amber-500" : "bg-emerald-600"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black transition-transform ${
                isHumanTakeover ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main 2-Column Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[580px]">
        {/* Left Column: Chat List (4 cols) */}
        <div className="lg:col-span-4 bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-4 flex flex-col space-y-3 overflow-y-auto">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400">
              Chats Recientes
            </span>
            <span className="text-[10px] bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded">
              WhatsApp API v20
            </span>
          </div>

          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  selectedChat === chat.id
                    ? "bg-emerald-950/60 border-emerald-500/50 text-white shadow-lg"
                    : "bg-emerald-950/20 border-emerald-900/30 text-gray-300 hover:bg-emerald-950/40"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{chat.customerName}</span>
                  <span className="text-[10px] text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-1">{chat.lastMessage}</p>

                {chat.status === "ocr_pending" && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded mt-2 border border-amber-700/50">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Validar Yape (OCR 98.5%)
                  </span>
                )}
                {chat.status === "confirmed" && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded mt-2 border border-emerald-700/50">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Reserva Confirmada
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Center Column: Chat Stream & OCR Validation (8 cols) */}
        <div className="lg:col-span-8 bg-[#070e0a] border border-emerald-900/40 rounded-2xl flex flex-col justify-between overflow-hidden">
          {/* Active Chat Header */}
          <div className="p-4 bg-emerald-950/40 border-b border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center font-bold text-emerald-300 text-sm">
                {currentChatData.customerName[0]}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{currentChatData.customerName}</h4>
                <p className="text-xs font-mono text-emerald-400">{currentChatData.phone}</p>
              </div>
            </div>

            <span className="text-xs font-mono bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800/60 text-emerald-300">
              GCal Event ID: #gcal_89123
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 flex-grow overflow-y-auto space-y-4 text-xs font-sans">
            {/* Historical logs from Supabase */}
            {logs.map((log) => (
              <div key={log.id} className={`flex ${log.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl border ${
                  log.direction === 'outgoing' 
                    ? 'bg-emerald-950/60 text-emerald-100 border-emerald-800/50' 
                    : 'bg-neutral-900 text-gray-200 border-neutral-800'
                }`}>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono mb-1 text-emerald-400">
                    {log.is_bot_reply ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    <span>{log.is_bot_reply ? "Bot IA" : "Administrador Humano"}</span>
                  </div>
                  <p>{log.message_text}</p>
                  <span className="text-[10px] text-gray-500 block text-right mt-1">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* OCR Proof Mock Card */}
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-neutral-900 text-gray-200 p-3 rounded-2xl border border-amber-900/40 space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
                  <ImageIcon className="w-4 h-4" />
                  <span>Comprobante Yape Recibido</span>
                </div>

                <div className="p-3 bg-purple-950/30 border border-purple-800/50 rounded-xl space-y-2 font-mono">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-300 font-bold">Yape! Perú</span>
                    <span className="text-emerald-400 font-bold">S/ 100.00</span>
                  </div>
                  <div className="text-[10px] text-gray-300 space-y-0.5">
                    <p>Destino: SEPARA PE S.A.C.</p>
                    <p>Nº Operación: <span className="text-white font-bold">{currentChatData.opNumber || "8912345"}</span></p>
                  </div>
                </div>

                <div className="bg-emerald-950/60 border border-emerald-600/60 p-2.5 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Culqui OCR Engine
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/80 px-1.5 py-0.5 rounded">
                      Confianza: {currentChatData.ocrScore || "98.5%"}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200">
                    ✅ Monto coincide (S/ 100.00) | ✅ Nº Operación Único
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-emerald-950/30 border-t border-emerald-900/40 flex items-center space-x-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={isHumanTakeover ? "Escribe un mensaje para enviar vía WhatsApp..." : "Modo Bot activo (activa Control Humano para enviar)..."}
              disabled={!isHumanTakeover || sending}
              className="flex-grow bg-emerald-950/40 border border-emerald-900/60 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isHumanTakeover || sending}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black p-2 rounded-xl transition-all font-bold"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
