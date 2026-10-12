import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Image as ImageIcon, ShieldCheck, Star } from 'lucide-react';

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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-20 transition-colors duration-300">
      {/* Декоративное эстетичное фоновое свечение (адаптивно к дню и ночи) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#B76E79]/20 via-[#E8B4A8]/15 to-transparent rounded-full blur-3xl opacity-70 animate-ambient-glow" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Бейдж с аватаркой мастера */}
        <div className="inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs tracking-[0.15em] uppercase text-[#8F4C56] dark:text-[#E8B4A8] mb-8 backdrop-blur-md shadow-md hover:scale-[1.02] transition-transform">
          <img
            src="/moldir-portrait.jpg"
            alt="Молдир"
            className="w-7 h-7 rounded-full object-cover border border-[#B76E79] shadow-sm"
          />
          <span className="font-semibold">Кызылорда • Салон «Салта Исаева»</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79] animate-ping" />
        </div>

        {/* Заголовок */}
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.08] mb-6 transition-colors">
          Аккуратный маникюр и{' '}
          <span className="block rose-gold-gradient-text italic font-normal drop-shadow-sm my-1">
            Smart-педикюр
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[var(--text-secondary)] block mt-2">
            в Кызылорде
          </span>
        </h1>

        {/* Короткий подзаголовок */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[var(--text-muted)] font-light leading-relaxed mb-10 transition-colors">
          Стойкое наращивание, чистая аппаратная техника и авторское обучение от nail-стилиста Молдир.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold uppercase tracking-[0.15em] text-xs hover:brightness-105 transition-all shadow-xl shadow-[#B76E79]/25 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#0D0D0F]" />
            Записаться онлайн
          </button>
          
          <a
            href="#gallery"
            onClick={scrollToGallery}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] text-[var(--text-primary)] font-semibold uppercase tracking-[0.15em] text-xs transition-all hover:border-[#B76E79]/60 flex items-center justify-center gap-2 shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-[#B76E79]" />
            Смотреть работы
          </a>
        </div>

        {/* Бейджи доверия (Trust Chips) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-12 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>100% стерильность</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>Носка без сколов от 3-4 недель</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>~6.4K подписчиков в Instagram</span>
          </div>
        </div>

        {/* Быстрые факты */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-[var(--border-subtle)] w-full max-w-3xl text-left">
          <div className="p-4 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[#B76E79] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">График</div>
              <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">По предварительной записи</div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[#B76E79] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Локация</div>
              <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">Казантаева, 31</div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[#B76E79] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Окошки</div>
              <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">В сторис Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
