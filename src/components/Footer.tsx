import React from 'react';
import { Sparkles, MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-subtle)] border-t border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors duration-300">
      {/* Основная часть футера */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Бренд */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#B76E79] flex items-center justify-center text-white font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif-display text-xl font-bold tracking-[0.15em] text-[var(--text-primary)]">
                {BUSINESS_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md font-light">
              Nail-мастер Молдир: бережный аппаратный маникюр, стойкое наращивание, эстетический Smart-педикюр и авторское обучение. Салон «Aizada Studio», г. Кызылорда.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.contacts.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.contacts.phoneClean}`}
                className="w-9 h-9 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all shadow-xs"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)] mb-4">
              Разделы
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-[#B76E79] transition-colors">
                  Услуги и цены
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B76E79] transition-colors">
                  Работы (портфолио)
                </a>
              </li>
              <li>
                <a href="#master" className="hover:text-[#B76E79] transition-colors">
                  О мастере
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-[#B76E79] transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-[#B76E79] transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/admin" className="text-[#B76E79] hover:underline transition-colors font-medium">
                  Админ-панель
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты студии */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)] mb-4">
              Локация
            </h4>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <p className="text-[var(--text-primary)] font-medium">{BUSINESS_CONFIG.contacts.city}</p>
              <p>{BUSINESS_CONFIG.contacts.address}</p>
              <p className="pt-2 text-[#8F4C56] dark:text-[#E8B4A8] font-bold">{BUSINESS_CONFIG.contacts.phone}</p>
              <p className="text-[11px]">{BUSINESS_CONFIG.contacts.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.brandName}. Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <span>Салон «Aizada Studio»</span>
            <span>Кызылорда</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
