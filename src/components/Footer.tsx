import React from 'react';
import { Sparkles, MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090B] border-t border-[#1C1C22] text-[#A39B98]">
      {/* Основная часть футера */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Бренд */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#B76E79] flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-[#0D0D0F]" />
              </div>
              <span className="font-serif-display text-xl font-bold tracking-[0.15em] text-[#F4EBE7]">
                {BUSINESS_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-xs text-[#A39B98] leading-relaxed max-w-md font-light">
              Nail-мастер Молдир: бережный аппаратный маникюр, стойкое наращивание, эстетический Smart-педикюр и авторское обучение. Салон «Салта Исаева», г. Кызылорда.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={BUSINESS_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#17171A] border border-[#2B2A32] flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.contacts.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#17171A] border border-[#2B2A32] flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.contacts.phoneClean}`}
                className="w-9 h-9 rounded-sm bg-[#17171A] border border-[#2B2A32] flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#F4EBE7] mb-4">
              Разделы
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-[#E8B4A8] transition-colors">
                  Услуги и цены
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E8B4A8] transition-colors">
                  Работы (портфолио)
                </a>
              </li>
              <li>
                <a href="#master" className="hover:text-[#E8B4A8] transition-colors">
                  О мастере
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-[#E8B4A8] transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-[#E8B4A8] transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/admin" className="text-[#B76E79] hover:text-[#E8B4A8] transition-colors">
                  Админ-панель
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты студии */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#F4EBE7] mb-4">
              Локация
            </h4>
            <div className="space-y-2 text-xs text-[#A39B98]">
              <p className="text-[#F4EBE7] font-medium">{BUSINESS_CONFIG.contacts.city}</p>
              <p>{BUSINESS_CONFIG.contacts.address}</p>
              <p className="pt-2 text-[#E8B4A8] font-semibold">{BUSINESS_CONFIG.contacts.phone}</p>
              <p className="text-[11px] text-[#A39B98]">{BUSINESS_CONFIG.contacts.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8 border-t border-[#1C1C22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716E]">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.brandName}. Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <span>Салон «Салта Исаева»</span>
            <span>Кызылорда</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
