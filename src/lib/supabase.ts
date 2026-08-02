import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scfbvmcggxiiccnrjmoj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZmJ2bWNnZ3hpaWNjbnJqbW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzgwMzksImV4cCI6MjA4NjQ1NDAzOX0.xtF4xmDTsphNlSd85ql2Au5F7u88DvXA8hwlGoo_XRU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. PITCHES (FIELDS) API
export async function fetchFieldsFromSupabase() {
  const { data, error } = await supabase
    .from('fields')
    .select('*')
    .order('created_at', { ascending: true });
    
  if (error || !data || data.length === 0) {
    console.warn('Fallback local fields:', error);
    return [
      { id: 'a1b2c3d4-0001-4000-8000-000000000001', name: 'Cancha 1 - La Bombonera', type: 'futbol_5', surface_type: 'Sintético Premium', price_day: 70, price_night: 100, is_active: true },
      { id: 'a1b2c3d4-0002-4000-8000-000000000002', name: 'Cancha 2 - Maracaná', type: 'futbol_6', surface_type: 'Sintético Monofilamento', price_day: 80, price_night: 110, is_active: true },
      { id: 'a1b2c3d4-0003-4000-8000-000000000003', name: 'Cancha 3 - Bernabéu', type: 'futbol_7', surface_type: 'Césped FIFA Quality', price_day: 100, price_night: 140, is_active: true },
      { id: 'a1b2c3d4-0004-4000-8000-000000000004', name: 'Cancha 4 - Estadio Principal', type: 'futbol_11', surface_type: 'Estadio Sintético Pro', price_day: 160, price_night: 220, is_active: true }
    ];
  }
  return data;
}

export async function createFieldInSupabase(field: {
  name: string;
  type: string;
  surface_type: string;
  price_day: number;
  price_night: number;
}) {
  const { data, error } = await supabase
    .from('fields')
    .insert([field])
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteFieldInSupabase(id: string) {
  const { error } = await supabase
    .from('fields')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// 2. BOOKINGS API
export async function fetchBookingsFromSupabase(dateStr?: string) {
  let query = supabase.from('bookings').select('*');
  if (dateStr) {
    query = query.eq('booking_date', dateStr);
  }
  const { data, error } = await query;
  if (error) {
    console.warn('Error fetching bookings:', error);
    return [];
  }
  return data || [];
}

export async function createBookingInSupabase(booking: {
  field_id: string;
  customer_name: string;
  customer_phone: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  payment_method?: string;
}) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        ...booking,
        status: 'confirmed',
        source: 'dashboard_manual',
        google_event_id: `gcal_manual_${Date.now()}`
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function cancelBookingInSupabase(bookingId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .select();

  if (error) throw error;
  return data[0];
}

// 3. CREDIT PACKAGES & SERVICES API
export async function fetchCreditPackagesFromSupabase() {
  const { data, error } = await supabase.from('credit_packages').select('*');
  if (error || !data || data.length === 0) {
    return [
      { id: 'p1', name: 'Pack 10 Horas Nocturnas', total_minutes: 600, price: 900, discount_tag: '18% OFF', sales_count: 24 },
      { id: 'p2', name: 'Pack 5 Horas Diurnas', total_minutes: 300, price: 320, discount_tag: '20% OFF', sales_count: 42 },
      { id: 'p3', name: 'Bolsa VIP Pelotero 20 Horas', total_minutes: 1200, price: 1600, discount_tag: '27% OFF', sales_count: 15 }
    ];
  }
  return data;
}

export async function createCreditPackageInSupabase(pkg: {
  name: string;
  total_minutes: number;
  price: number;
  discount_tag?: string;
}) {
  const { data, error } = await supabase.from('credit_packages').insert([pkg]).select();
  if (error) throw error;
  return data[0];
}

export async function fetchSpecialServicesFromSupabase() {
  const { data, error } = await supabase.from('special_services').select('*');
  if (error || !data || data.length === 0) {
    return [
      { id: 's1', title: 'Paquete Cumpleaños Infantil', description: '3 Horas de Cancha 1 + Luces + Salón de Parrilla + Árbitro', price: 450, type: 'Evento' },
      { id: 's2', title: 'Convenio Academia de Fútbol', description: 'Reserva recurrente Mar a Jue (04:00 PM - 06:00 PM) Cancha 3', price: 1200, type: 'Mensual' }
    ];
  }
  return data;
}

export async function createSpecialServiceInSupabase(service: {
  title: string;
  description: string;
  price: number;
  type: string;
}) {
  const { data, error } = await supabase.from('special_services').insert([service]).select();
  if (error) throw error;
  return data[0];
}

// 4. WHATSAPP & OCR LOGS API
export async function fetchWhatsappLogsFromSupabase() {
  const { data, error } = await supabase.from('whatsapp_messages_log').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function sendWhatsappMessageInSupabase(log: {
  customer_phone: string;
  customer_name: string;
  message_text: string;
  direction: 'incoming' | 'outgoing';
  is_bot_reply: boolean;
}) {
  const { data, error } = await supabase.from('whatsapp_messages_log').insert([log]).select();
  if (error) throw error;
  return data[0];
}
