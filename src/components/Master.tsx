import React from 'react';
import { Sparkles, Calendar, BookOpen, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

interface MasterProps {
  onOpenBooking: () => void;
}

export const Master: React.FC<MasterProps> = ({ onOpenBooking }) => {
  return (
    <section id="master" className="py-24 bg-[var(--bg-page)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Левая колонка: Визуальная карточка мастера с реальным портретом */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md group">
              {/* Декоративное свечение розового золота сзади */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#B76E79]/35 via-transparent to-[#E8B4A8]/30 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative aspect-[4/5] rounded-md bg-[var(--bg-card)] border border-[var(--border-card)] group-hover:border-[#B76E79]/80 overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-all shadow-xl">
                {/* Реальный портрет Молдир */}
                <img
                  src={BUSINESS_CONFIG.masterPhotoUrl}
                  alt={`${BUSINESS_CONFIG.masterName} — ${BUSINESS_CONFIG.masterRole}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Градиентное затемнение снизу для идеальной читаемости текста поверх любого фото */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-40% to-transparent" />

                {/* Верхняя статусная плашка */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#B76E79]/50 text-[10px] uppercase tracking-widest text-[#E8B4A8] font-bold shadow-lg">
                    {BUSINESS_CONFIG.masterRole}
                  </div>
                </div>

                {/* Нижняя информация поверх фото */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <h3 className="font-serif-display text-3xl font-bold text-white mb-1 drop-shadow-sm">
                      {BUSINESS_CONFIG.masterName}
                    </h3>
                    <div className="w-14 h-0.5 bg-gradient-to-r from-[#B76E79] to-[#E8B4A8]" />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/20 text-xs text-[#E5DCD8]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B76E79] shrink-0" />
                      <span className="truncate">{BUSINESS_CONFIG.contacts.address}</span>
                    </div>
                    <a
                      href={BUSINESS_CONFIG.contacts.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#E8B4A8] hover:text-white transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#B76E79] shrink-0" />
                      <span>{BUSINESS_CONFIG.contacts.instagramName} (~6.4K)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Текст о мастере */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-bold mb-2">
                Знакомство
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                О мастере Молдир
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
              Молдир — сертифицированный nail-стилист из Кызылорды, принимающий клиентов в уютном салоне красоты «Aizada Studio».
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4.5 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3.5 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">Специализация:</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Чистый аппаратный маникюр без повреждений, архитектурное наращивание ногтей гелем и акрилом любой сложности, а также атравматичный Smart-педикюр.
                  </p>
                </div>
              </div>

              <div className="p-4.5 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3.5 shadow-sm">
                <BookOpen className="w-5 h-5 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">Обучение nail-мастеров:</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Проведение индивидуальных обучающих курсов для начинающих специалистов и действующих мастеров с постановкой руки и разбором современных техник.
                  </p>
                </div>
              </div>
            </div>

            {/* TODO плашка для владельца */}
            <div className="p-3.5 bg-[var(--bg-card)] border border-dashed border-[#B76E79]/50 rounded-sm text-xs text-[var(--text-muted)] shadow-xs">
              <span className="text-[#8F4C56] dark:text-[#E8B4A8] font-bold block mb-1">
                TODO: блок для персонального текста мастера
              </span>
              Вы можете добавить сюда свои реальные дипломы, стаж работы или персональное приветствие в файле <code>src/components/Master.tsx</code>.
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold uppercase tracking-wider text-xs hover:brightness-105 transition-all shadow-md shadow-[#B76E79]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Записаться к Молдир</span>
              </button>

              <a
                href={BUSINESS_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] hover:border-[#B76E79]/60 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
                <span>Профиль в Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
