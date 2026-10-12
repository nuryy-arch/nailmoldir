import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Info } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

interface ContactsProps {
  onOpenBooking: () => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onOpenBooking }) => {
  return (
    <section id="contacts" className="py-24 bg-[var(--bg-page)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-bold mb-2">
              Локация и связь
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Контакты
            </h2>
          </div>

          <div className="max-w-md bg-[var(--bg-card)] border border-[var(--border-card)] rounded-sm p-4 flex items-start gap-3 text-xs text-[var(--text-muted)] shadow-sm">
            <Info className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
            <p>
              {BUSINESS_CONFIG.contacts.note}. «Горящие окошки» ежедневно публикуются в сторис Instagram.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Колонка 1: Адрес и маршрут */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-sm p-8 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[#B76E79] shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">
                    Адрес рабочего места
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {BUSINESS_CONFIG.contacts.city}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.contacts.address}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[#B76E79] shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">
                    График работы
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] space-y-1">
                    <div>{BUSINESS_CONFIG.contacts.workingHours}</div>
                    <div className="text-[11px] text-[#B76E79]">
                      {BUSINESS_CONFIG.contacts.workingDaysNotice}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка "Построить маршрут" в 2GIS / Карты */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <a
                href={BUSINESS_CONFIG.contacts.mapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-sm bg-[var(--bg-subtle)] hover:bg-[#B76E79] border border-[var(--border-card)] hover:border-[#B76E79] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#B76E79] group-hover:text-white" />
                <span>Построить маршрут (2GIS / Карты)</span>
              </a>
            </div>
          </div>

          {/* Колонка 2: Прямая связь (WhatsApp, телефон, Instagram) */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-sm p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B76E79] font-bold mb-3">
                Прямая запись & Консультация
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                Основная запись ведётся индивидуально через WhatsApp. Вы можете написать напрямую или отправить онлайн-заявку.
              </p>

              <div className="space-y-3">
                <a
                  href={BUSINESS_CONFIG.contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[var(--bg-subtle)] hover:border-[#25D366]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <div>
                    <span className="font-semibold block">Написать в WhatsApp</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{BUSINESS_CONFIG.contacts.phone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.contacts.phoneClean}`}
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[var(--bg-subtle)] hover:border-[#B76E79]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#B76E79]" />
                  <div>
                    <span className="font-semibold block">Позвонить</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{BUSINESS_CONFIG.contacts.phone}</span>
                  </div>
                </a>

                <a
                  href={BUSINESS_CONFIG.contacts.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-sm bg-[var(--bg-subtle)] hover:border-[#B76E79]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] transition-all shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
                  <div>
                    <span className="font-semibold block">Instagram профиль</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{BUSINESS_CONFIG.contacts.instagramName}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] text-[var(--text-muted)] block text-center">
                Отвечаем в течение 10–15 минут в рабочее время
              </span>
            </div>
          </div>

          {/* Колонка 3: Онлайн-форма быстрой записи */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-sm p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B76E79]/15 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="text-xs uppercase tracking-widest text-[#B76E79] font-bold mb-3">
                Удобная форма
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[var(--text-primary)] mb-3">
                Записаться на процедуру
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                Выберите услугу, удобную дату и время в нашем интерактивном календаре. Заявка мгновенно формируется для отправки мастеру.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold uppercase tracking-wider text-xs hover:brightness-105 transition-all shadow-md shadow-[#B76E79]/20 cursor-pointer text-center block"
              >
                Открыть онлайн-запись
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
