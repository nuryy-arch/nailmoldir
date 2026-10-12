import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Тёмный градиентный фон с мягким свечением розового золота */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0F]/80 via-[#0D0D0F]/90 to-[#0D0D0F]" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17171A]/90 border border-[#B76E79]/30 text-xs tracking-[0.2em] uppercase text-[#E8B4A8] mb-8 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" />
          <span>Кызылорда • Салон «Салта Исаева»</span>
        </div>

        {/* Заголовок */}
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F4EBE7] tracking-tight leading-[1.08] mb-6">
          Аккуратный маникюр и{' '}
          <span className="block rose-gold-gradient-text italic font-normal drop-shadow-sm">
            Smart-педикюр
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[#D1C7C4] block mt-2">
            в Кызылорде
          </span>
        </h1>

        {/* Короткий подзаголовок */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#A39B98] font-light leading-relaxed mb-10">
          Стойкое наращивание, чистая аппаратная техника и авторское обучение от мастера Молдир.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold uppercase tracking-[0.15em] text-xs hover:brightness-105 transition-all shadow-xl shadow-[#B76E79]/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#0D0D0F]" />
            Записаться онлайн
          </button>
          
          <a
            href="#gallery"
            onClick={scrollToGallery}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#17171A] hover:bg-[#202025] border border-[#2A2930] text-[#F4EBE7] font-semibold uppercase tracking-[0.15em] text-xs transition-all hover:border-[#B76E79]/60 flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-[#B76E79]" />
            Смотреть работы
          </a>
        </div>

        {/* Быстрые факты */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 pt-10 border-t border-[#1E1E24] w-full max-w-3xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17171A] border border-[#2A2930] flex items-center justify-center text-[#B76E79]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#A39B98] uppercase tracking-wider">График</div>
              <div className="text-sm font-medium text-[#F4EBE7]">По предварительной записи</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17171A] border border-[#2A2930] flex items-center justify-center text-[#B76E79]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#A39B98] uppercase tracking-wider">Локация</div>
              <div className="text-sm font-medium text-[#F4EBE7]">Казантаева, 31</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17171A] border border-[#2A2930] flex items-center justify-center text-[#B76E79]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#A39B98] uppercase tracking-wider">Окошки</div>
              <div className="text-sm font-medium text-[#F4EBE7]">В сторис Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
