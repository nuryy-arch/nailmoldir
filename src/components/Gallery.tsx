import React, { useState } from 'react';
import { Eye, Image as ImageIcon } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

        {/* Сетка фото-плейсхолдеров (6 работ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_CONFIG.gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.imageUrl)}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#17171A] border border-[#23232A] hover:border-[#B76E79]/50 cursor-pointer transition-all duration-300 flex flex-col justify-between p-6"
            >
              {/* Фоновый плейсхолдер с мягким градиентом */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E24] via-[#17171A] to-[#121215] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#26252C] flex items-center justify-center text-[#B76E79] mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#A39B98] block mb-1">
                  Фото работы #{idx + 1}
                </span>
                <span className="text-sm font-serif-display text-[#F4EBE7] font-semibold">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#B76E79] mt-2 bg-[#26252C]/60 px-2.5 py-1 rounded-full">
                  {item.placeholderHint}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#E8B4A8] font-bold mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif-display text-lg font-bold text-[#F4EBE7]">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#D1C7C4]">
                  <Eye className="w-3.5 h-3.5 text-[#B76E79]" />
                  <span>Открыть просмотр</span>
                </div>
              </div>
            </div>
          ))}
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

      {/* Модальное окно просмотра */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-xl w-full bg-[#17171A] border border-[#2A2930] rounded-sm p-6 text-center">
            <h3 className="font-serif-display text-xl text-[#F4EBE7] mb-3">Просмотр фото</h3>
            <p className="text-xs text-[#A39B98] mb-6">
              Вы можете заменить фото-плейсхолдеры в папке <code>public/gallery/</code> своими реальными фотографиями из портфолио.
            </p>
            <button
              onClick={() => setSelectedImage(null)}
              className="px-6 py-2.5 rounded-sm bg-[#B76E79] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
