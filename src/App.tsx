import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Master } from './components/Master';
import { Advantages } from './components/Advantages';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminPage } from './pages/AdminPage';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { BUSINESS_CONFIG } from './config/business';
import type { ServiceItem } from './types';

export const App: React.FC = () => {
  const [isAdminPath, setIsAdminPath] = useState(window.location.pathname.startsWith('/admin'));
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [services, setServices] = useState<ServiceItem[]>(BUSINESS_CONFIG.services);

  // Слушаем изменение URL для SPA-навигации между сайтом и /admin
  useEffect(() => {
    const checkPath = () => {
      setIsAdminPath(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  // Если Supabase настроен, подтягиваем актуальные цены из таблицы services
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: ServiceItem[] = data.map(item => ({
            id: item.id,
            title: item.title,
            priceFrom: item.price_from,
            priceFormatted: item.price_from > 0 ? `от ${item.price_from.toLocaleString('ru-RU')} ₸` : 'цена по запросу',
            durationText: item.duration_text,
            description: item.description,
            popular: item.id === 'apparat-manicure' || item.id === 'extension',
          }));
          setServices(mapped);
        }
      });
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSelectService = (serviceId: string) => {
    handleOpenBooking(serviceId);
  };

  // Если открыт маршрут /admin, рендерим защищенную админ-панель
  if (isAdminPath) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-[#F4EBE7] flex flex-col selection:bg-[#B76E79] selection:text-white">
      {/* Навигационная панель */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Основной контент */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <Services onSelectService={handleSelectService} services={services} />
        <Gallery />
        <Master onOpenBooking={() => handleOpenBooking()} />
        <Advantages />
        <Contacts onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Футер */}
      <Footer />

      {/* Мобильная прилипающая кнопка «Записаться» (появляется внизу экрана на мобильных устройствах) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30">
        <button
          onClick={() => handleOpenBooking()}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold text-xs uppercase tracking-widest shadow-2xl shadow-[#B76E79]/40 flex items-center justify-center gap-2 cursor-pointer border border-[#E8B4A8]/40"
        >
          <Calendar className="w-4 h-4 text-[#0D0D0F]" />
          <span>Онлайн-запись</span>
        </button>
      </div>

      {/* Интерактивное модальное окно записи */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={selectedServiceId}
        services={services}
      />
    </div>
  );
};

export default App;
