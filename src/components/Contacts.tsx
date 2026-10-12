import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Info } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

interface ContactsProps {
  onOpenBooking: () => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onOpenBooking }) => {
  return (
    <section id="contacts" className="py-24 bg-[#0D0D0F] relative border-t border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold mb-2">
              Локация и связь
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EBE7]">
              Контакты
            </h2>
          </div>

          <div className="max-w-md bg-[#17171A] border border-[#26252C] rounded-sm p-4 flex items-start gap-3 text-xs text-[#A39B98]">
            <Info className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
            <p>
              {BUSINESS_CONFIG.contacts.note}. «Горящие окошки» ежедневно публикуются в сторис Instagram.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Колонка 1: Адрес и маршрут */}
          <div className="bg-[#17171A] border border-[#23232A] rounded-sm p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#1F1F24] border border-[#2B2A32] flex items-center justify-center text-[#B76E79] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#A39B98] font-bold mb-1">
                    Адрес рабочего места
                  </div>
                  <div className="text-sm font-semibold text-[#F4EBE7]">
                    {BUSINESS_CONFIG.contacts.city}
                  </div>
                  <div className="text-xs text-[#D1C7C4] mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.contacts.address}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#23232A] pt-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#1F1F24] border border-[#2B2A32] flex items-center justify-center text-[#B76E79] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#A39B98] font-bold mb-1">
                    График работы
                  </div>
                  <div className="text-xs text-[#D1C7C4] space-y-1">
                    <div>{BUSINESS_CONFIG.contacts.workingHours}</div>
                    <div className="text-[11px] text-[#B76E79]">
                      TODO: укажите точный график в business.ts
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка "Построить маршрут" в 2GIS / Карты */}
            <div className="pt-4 border-t border-[#23232A]">
              <a
                href={BUSINESS_CONFIG.contacts.mapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-sm bg-[#222129] hover:bg-[#2A2932] border border-[#2D2C35] text-xs font-bold uppercase tracking-wider text-[#F4EBE7] hover:text-[#E8B4A8] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#B76E79]" />
                <span>Построить маршрут (2GIS / Карты)</span>
              </a>
            </div>
          </div>

          {/* Колонка 2: Прямая связь (WhatsApp, телефон, Instagram) */}
          <div className="bg-[#17171A] border border-[#23232A] rounded-sm p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B76E79] font-bold mb-3">
                Прямая запись & Консультация
              </div>
              <p className="text-xs text-[#A39B98] leading-relaxed mb-6 font-light">
                Основная запись ведётся индивидуально через WhatsApp. Вы можете написать напрямую или отправить онлайн-заявку.
              </p>

              <div className="space-y-3">
                <a
                  href={BUSINESS_CONFIG.contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[#1F1F24] hover:bg-[#25252C] border border-[#2B2A32] text-xs text-[#F4EBE7] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <div>
                    <span className="font-semibold block">Написать в WhatsApp</span>
                    <span className="text-[11px] text-[#A39B98]">{BUSINESS_CONFIG.contacts.phone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.contacts.phoneClean}`}
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[#1F1F24] hover:bg-[#25252C] border border-[#2B2A32] text-xs text-[#F4EBE7] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#B76E79]" />
                  <div>
                    <span className="font-semibold block">Позвонить</span>
                    <span className="text-[11px] text-[#A39B98]">{BUSINESS_CONFIG.contacts.phone}</span>
                  </div>
                </a>

                <a
                  href={BUSINESS_CONFIG.contacts.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[#1F1F24] hover:bg-[#25252C] border border-[#2B2A32] text-xs text-[#F4EBE7] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
                  <div>
                    <span className="font-semibold block">Instagram {BUSINESS_CONFIG.contacts.instagramName}</span>
                    <span className="text-[11px] text-[#A39B98]">Окошки в сторис</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#23232A] text-[11px] text-[#A39B98]">
              Ответ в WhatsApp в течение рабочего времени
            </div>
          </div>

          {/* Колонка 3: Баннер быстрой онлайн-записи */}
          <div className="bg-gradient-to-br from-[#1F1F24] via-[#17171A] to-[#121215] border border-[#B76E79]/40 rounded-sm p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B76E79]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8B4A8] block mb-2">
                Удобная форма
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#F4EBE7] mb-3">
                Онлайн-запись к Молдир
              </h3>
              <p className="text-xs text-[#D1C7C4] leading-relaxed font-light mb-6">
                Выберите желаемую процедуру, дату и время. Заявка сохранится в системе и сформирует готовое сообщение для подтверждения в WhatsApp.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-xl shadow-[#B76E79]/20 transition-all cursor-pointer"
            >
              Записаться сейчас
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
