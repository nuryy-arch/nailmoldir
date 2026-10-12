import React, { useState } from 'react';
import { Eye, Image as ImageIcon, X } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';
import type { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="gallery" className="py-24 bg-[#0D0D0F] relative border-t border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold mb-2">
              Портфолио
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EBE7]">
              Работы мастера
            </h2>
          </div>

          <a
            href={BUSINESS_CONFIG.contacts.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8B4A8] hover:text-white transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
            <span>Больше работ в Instagram ({BUSINESS_CONFIG.contacts.instagramName})</span>
          </a>
        </div>

        {/* Сетка фото (6 работ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_CONFIG.gallery.map((item, idx) => {
            const isFailed = failedImages[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#17171A] border border-[#23232A] hover:border-[#B76E79]/60 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                {/* Реальное фото */}
                {!isFailed ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onError={() => handleImageError(item.id)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  /* Фоновый плейсхолдер с мягким градиентом, если фото не загрузилось */
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E24] via-[#17171A] to-[#121215] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#26252C] flex items-center justify-center text-[#B76E79] mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A39B98] block mb-1">
                      Работа #{idx + 1}
                    </span>
                    <span className="text-sm font-serif-display text-[#F4EBE7] font-semibold">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#E8B4A8] font-bold mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif-display text-lg font-bold text-[#F4EBE7]">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#D1C7C4]">
                    <Eye className="w-3.5 h-3.5 text-[#B76E79]" />
                    <span>Посмотреть ближе</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Большая ссылка на Instagram */}
        <div className="mt-12 text-center">
          <a
            href={BUSINESS_CONFIG.contacts.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#17171A] hover:bg-[#202025] border border-[#2B2932] hover:border-[#B76E79]/60 text-xs font-bold uppercase tracking-wider text-[#F4EBE7] transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
            <span>Больше работ в Instagram {BUSINESS_CONFIG.contacts.instagramName}</span>
          </a>
        </div>
      </div>

      {/* Модальное окно полноразмерного просмотра */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#17171A] border border-[#2A2930] rounded-sm overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-[#F4EBE7] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Картинка */}
            <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Описание под фото */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#23232A]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#B76E79] font-bold block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#F4EBE7]">
                  {selectedItem.title}
                </h3>
              </div>

              <a
                href={BUSINESS_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#B76E79] hover:bg-[#A35D68] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Открыть профиль</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
