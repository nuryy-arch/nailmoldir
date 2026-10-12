export interface ServiceItem {
  id: string;
  title: string;
  priceFrom: number;
  priceFormatted: string; // e.g. "от 4 000 ₸"
  durationText?: string;
  description: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  placeholderHint?: string;
}

export interface AdvantageItem {
  icon: string;
  title: string;
  description: string;
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  comment?: string;
  honeypot?: string;
}

export interface BookingRecord {
  id: string;
  service: string;
  date: string;
  time: string;
  client_name: string;
  client_phone: string;
  comment?: string;
  status: 'new' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time: string | null;
  reason?: string;
}

export interface ServiceDbItem {
  id: string;
  title: string;
  price_from: number;
  description: string;
  duration_text?: string;
  is_active: boolean;
}
