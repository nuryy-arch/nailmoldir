import React, { useState } from 'react';
import { Sparkles, Menu, X, Calendar, Clock, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { ThemeToggle } from './ThemeToggle';
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
    <header className="sticky top-0 z-40 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-300">
      {/* Верхний информационный бар с мягким свечением */}
      <div className="bg-[var(--bg-subtle)] border-b border-[var(--border-gold)] px-4 py-1.5 text-center transition-colors">
        <p className="text-[11px] sm:text-xs text-[#8F4C56] dark:text-[#E8B4A8] font-medium tracking-wider flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B76E79] animate-pulse"></span>
          <span>КЫЗЫЛОРДА • САЛОН «САЛТА ИСАЕВА» • ОНЛАЙН-ЗАПИСЬ WHATSAPP</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8B4A8] via-[#B76E79] to-[#80464F] flex items-center justify-center text-white font-bold shadow-lg shadow-[#B76E79]/25 transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-[0.15em] text-[var(--text-primary)] group-hover:text-[#B76E79] dark:group-hover:text-[#E8B4A8] transition-colors">
                {BUSINESS_CONFIG.brandName}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-semibold">
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
                className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#B76E79] dark:hover:text-[#E8B4A8] transition-colors font-medium py-1 relative group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B76E79] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Переключатель темы, соцсети и кнопка записи */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Переключатель День/Ночь */}
            <ThemeToggle />

            <a
              href={BUSINESS_CONFIG.contacts.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--text-secondary)] hover:text-[#B76E79] dark:hover:text-[#E8B4A8] transition-colors flex items-center gap-1.5 ml-1"
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

          {/* Мобильная кнопка меню и переключатель темы */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <ThemeToggle compact className="sm:hidden" />

            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-sm bg-[#B76E79] text-white text-xs font-bold uppercase tracking-wider sm:hidden cursor-pointer"
            >
              Запись
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] hover:text-[#B76E79] focus:outline-none cursor-pointer"
              aria-label="Переключить меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное выдвижное меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-page)] border-b border-[var(--border-subtle)] px-5 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[var(--text-primary)] hover:text-[#B76E79] py-2 border-b border-[var(--border-subtle)]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Тема оформления:</span>
            <ThemeToggle />
          </div>
          
          <div className="pt-1 space-y-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B76E79] shrink-0" />
              <span>{BUSINESS_CONFIG.contacts.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B76E79] shrink-0" />
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
