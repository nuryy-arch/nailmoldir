import React from 'react';
import { ShieldCheck, Sparkles, Heart, Coffee } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Advantages: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#B76E79]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#B76E79]" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#B76E79]" />;
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-[#B76E79]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#B76E79]" />;
    }
  };

  return (
    <section id="advantages" className="py-24 bg-[#0D0D0F] relative border-t border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B76E79] font-semibold mb-2">
            Качество и безопасность
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EBE7] mb-4">
            Преимущества студии
          </h2>
          <p className="text-sm sm:text-base text-[#A39B98] font-light">
            Принципы бережного ухода, бескомпромиссной чистоты и комфорта для каждого клиента.
          </p>
        </div>

        {/* Сетка 4 преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_CONFIG.advantages.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#17171A] border border-[#23232A] hover:border-[#B76E79]/50 rounded-sm p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#1F1F24] border border-[#2B2A32] flex items-center justify-center mb-6">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#F4EBE7] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A39B98] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#23232A] flex items-center justify-between text-[11px] text-[#B76E79]">
                <span>Стандарт качества</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
