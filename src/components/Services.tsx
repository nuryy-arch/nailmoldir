import React from 'react';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import type { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
  services?: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ 
  onSelectService, 
  services = BUSINESS_CONFIG.services 
}) => {
  return (
    <section id="services" className="py-24 bg-[var(--bg-page)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-bold mb-2">
              Прайс-лист
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Услуги и цены
            </h2>
          </div>
          
          {/* Пометка о точной стоимости */}
          <div className="max-w-md bg-[var(--bg-card)] border border-[var(--border-card)] rounded-sm p-4.5 flex items-start gap-3 text-xs text-[var(--text-muted)] shadow-sm">
            <Info className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[var(--text-primary)] font-medium">Важно:</strong> {BUSINESS_CONFIG.priceNotice}
            </p>
          </div>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group relative bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] hover:border-[#B76E79]/60 rounded-sm p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {service.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#B76E79] to-[#E8B4A8] text-[#0D0D0F] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="w-3 h-3 text-[#0D0D0F]" />
                  <span>Популярно</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#B76E79] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#B76E79] block">
                      {service.priceFormatted}
                    </span>
                    {service.durationText && (
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-medium">
                        {service.durationText}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  Запись в WhatsApp мастера
                </span>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-sm bg-[var(--bg-subtle)] group-hover:bg-[#B76E79] text-[var(--text-primary)] group-hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-[var(--border-subtle)] group-hover:border-[#B76E79]"
                >
                  <span>Записаться</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
