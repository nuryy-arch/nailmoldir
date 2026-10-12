import React, { useState } from 'react';
import { Sparkles, Menu, X, Calendar, Clock, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'Работы', href: '#gallery' },
    { name: 'О мастере', href: '#master' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Контакты', href: '#contacts' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0F]/95 backdrop-blur-md border-b border-[#1E1E24]">
      {/* Верхний информационный бар */}
      <div className="bg-[#141418] border-b border-[#B76E79]/20 px-4 py-1.5 text-center">
        <p className="text-[11px] sm:text-xs text-[#E8B4A8] tracking-wider flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B76E79] animate-pulse"></span>
          <span>КЫЗЫЛОРДА • САЛОН «САЛТА ИСАЕВА» • ЗАПИСЬ ЧЕРЕЗ WHATSAPP</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8B4A8] via-[#B76E79] to-[#80464F] flex items-center justify-center text-white font-bold shadow-lg shadow-[#B76E79]/20 transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#F4EBE7] group-hover:text-[#E8B4A8] transition-colors">
                {BUSINESS_CONFIG.brandName}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A39B98]">
                {BUSINESS_CONFIG.masterRole} • {BUSINESS_CONFIG.city}
              </span>
            </div>
          </a>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-[#D1C7C4] hover:text-[#E8B4A8] transition-colors font-medium py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Кнопка записи и быстрые контакты */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href={BUSINESS_CONFIG.contacts.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#A39B98] hover:text-[#E8B4A8] transition-colors flex items-center gap-1.5"
              title="Наш Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
              <span className="hidden xl:inline">{BUSINESS_CONFIG.contacts.instagramName}</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all shadow-md shadow-[#B76E79]/20 hover:scale-[1.02] cursor-pointer"
            >
              Записаться
            </button>
          </div>

          {/* Мобильная кнопка меню */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 rounded-sm bg-[#B76E79] text-white text-xs font-bold uppercase tracking-wider sm:hidden cursor-pointer"
            >
              Запись
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F4EBE7] hover:text-[#E8B4A8] focus:outline-none cursor-pointer"
              aria-label="Переключить меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное выдвижное меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141418] border-b border-[#1E1E24] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#F4EBE7] hover:text-[#E8B4A8] py-2 border-b border-[#1E1E24]/60"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-2 space-y-2 text-xs text-[#A39B98]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B76E79]" />
              <span>{BUSINESS_CONFIG.contacts.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B76E79]" />
              <span>{BUSINESS_CONFIG.contacts.workingHours}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-2 py-3 rounded-sm bg-gradient-to-r from-[#B76E79] to-[#E8B4A8] text-[#0D0D0F] font-bold uppercase tracking-wider text-xs text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Онлайн-запись
          </button>
        </div>
      )}
    </header>
  );
};
