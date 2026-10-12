import React, { useState, useEffect, useCallback, useId, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Loader2
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BUSINESS_CONFIG } from '../config/business';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BookingFormData, ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  services?: ServiceItem[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  services = BUSINESS_CONFIG.services,
}) => {
  const modalTitleId = useId();
  const modalDescId = useId();
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Генерируем доступные даты на горизонт 14 дней вперед
  const availableDates = React.useMemo(() => {
    const list: { dateString: string; label: string; dayName: string; isWeekend: boolean }[] = [];
    const now = new Date();
    
    for (let i = 0; i < BUSINESS_CONFIG.bookingHorizonDays; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const dateString = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay(); // 0 = вс
      const isWeekend = BUSINESS_CONFIG.disabledWeekdays.includes(dayOfWeek);

      const dayName = d.toLocaleDateString('ru-RU', { weekday: 'short' });
      const label = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });

      list.push({ dateString, label, dayName, isWeekend });
    }
    return list;
  }, []);

  const firstValidDate = availableDates.find(d => !d.isWeekend)?.dateString || availableDates[0]?.dateString || '';

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: preselectedServiceId || services[0]?.id || 'apparat-manicure',
    date: firstValidDate,
    time: BUSINESS_CONFIG.defaultTimeSlots[0] || '10:00',
    name: '',
    phone: '',
    comment: '',
    honeypot: '', // Защита от спам-ботов
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [busySlots, setBusySlots] = useState<{ date: string; time: string | null }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<BookingFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Обновляем выбранную услугу, если модалка открыта с карточки конкретной услуги
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  // Загружаем занятые слоты и заблокированные дни из Supabase
  const loadBusySlots = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from('public_busy_slots')
        .select('date, time');
      if (!error && data) {
        setBusySlots(data);
      }
    } catch {
      // Игнорируем ошибку чтения публичных слотов
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadBusySlots();
    }
  }, [isOpen, loadBusySlots]);

  // Закрытие по нажатию клавиши Esc и блокировка скролла фона
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Проверка доступности слота
  const isDateBlocked = (dateStr: string) => {
    return busySlots.some(s => s.date === dateStr && s.time === null);
  };

  const isTimeSlotBusy = (dateStr: string, timeStr: string) => {
    return busySlots.some(s => s.date === dateStr && (s.time === timeStr || s.time === null));
  };

  // Валидация формы
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать не менее 2 символов';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите контактный номер';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.phone = 'Введите корректный номер телефона (+7 ...)';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Выберите дату визита';
    }

    if (!formData.time) {
      newErrors.time = 'Выберите время записи';
    } else if (isTimeSlotBusy(formData.date, formData.time)) {
      newErrors.time = 'Этот слот уже занят. Пожалуйста, выберите другое время';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectedService = services.find(s => s.id === formData.serviceId) || services[0];

  // Маска ввода телефона
  const handlePhoneChange = (val: string) => {
    let cleaned = val.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+7') && !cleaned.startsWith('8') && cleaned.length > 0) {
      cleaned = '+7' + cleaned;
    }
    setFormData(prev => ({ ...prev, phone: cleaned }));
  };

  // Отправка заявки
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Защита от спам-ботов (honeypot)
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      let bookingId = 'local-' + Date.now();

      // 1. Сохранение в Supabase (если настроен)
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('bookings')
          .insert({
            service: selectedService?.title || 'Маникюр',
            date: formData.date,
            time: formData.time,
            client_name: formData.name.trim(),
            client_phone: formData.phone.trim(),
            comment: formData.comment?.trim() || '',
            status: 'new',
          })
          .select('id')
          .single();

        if (error) {
          if (error.code === '23505') {
            throw new Error('К сожалению, этот слот только что был занят. Выберите другое время.');
          }
          console.warn('Supabase booking error:', error);
        } else if (data) {
          bookingId = data.id;
        }
      }

      // 2. Отправка уведомления мастеру через Serverless Function /api/notify
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: bookingId,
            service: selectedService?.title || 'Маникюр',
            date: formData.date,
            time: formData.time,
            client_name: formData.name.trim(),
            client_phone: formData.phone.trim(),
            comment: formData.comment?.trim() || '',
          }),
        });
      } catch (notifyErr) {
        // Ошибка отправки в Telegram не должна блокировать клиента
        console.warn('Notify endpoint error:', notifyErr);
      }

      setLastSubmission({ ...formData });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Формирование ссылки для открытия в WhatsApp с готовым текстом
  const getWhatsAppBookingUrl = () => {
    const text = 
      `Здравствуйте! Хочу записаться к вам:\n` +
      `💅 Услуга: ${selectedService?.title || 'Маникюр'} (${selectedService?.priceFormatted})\n` +
      `📅 Дата: ${formData.date}\n` +
      `⏰ Время: ${formData.time}\n` +
      `👤 Имя: ${formData.name.trim()}\n` +
      `📱 Телефон: ${formData.phone.trim()}\n` +
      (formData.comment ? `💬 Комментарий: ${formData.comment.trim()}\n` : '') +
      `\nПодтвердите, пожалуйста, запись!`;

    return `https://wa.me/${BUSINESS_CONFIG.contacts.phoneClean}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenWhatsApp = () => {
    window.open(getWhatsAppBookingUrl(), '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalContainerRef}
        className="relative w-full max-w-2xl bg-[#17171A] border border-[#2B2A32] rounded-sm p-5 sm:p-8 my-6 shadow-2xl text-left"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A39B98] hover:text-[#F4EBE7] p-2 transition-colors cursor-pointer text-xl leading-none"
          aria-label="Закрыть окно записи"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#B76E79] block mb-1">
                Онлайн-запись к Молдир
              </span>
              <h3 id={modalTitleId} className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F4EBE7]">
                Запись на процедуру
              </h3>
              <p id={modalDescId} className="text-xs text-[#A39B98] mt-1">
                Выберите услугу, удобный день и время. Запись подтверждается мастером в WhatsApp.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-sm bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Поле-ловушка для спам-ботов */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* 1. Выбор услуги */}
              <div>
                <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider">
                  1. Выберите услугу
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, serviceId: service.id }))}
                      className={`p-3 text-left rounded-sm border transition-all cursor-pointer ${
                        formData.serviceId === service.id
                          ? 'bg-[#222129] border-[#B76E79] text-[#F4EBE7] shadow-md shadow-[#B76E79]/15'
                          : 'bg-[#1A1A1E] border-[#26252C] text-[#A39B98] hover:border-[#383742] hover:text-[#F4EBE7]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#F4EBE7]">{service.title}</div>
                      <div className="flex justify-between items-center mt-1 text-[11px]">
                        <span className="text-[#B76E79] font-bold">{service.priceFormatted}</span>
                        {service.durationText && <span>{service.durationText}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Выбор даты (Календарные дни на 14 дней вперед) */}
              <div>
                <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider flex items-center justify-between">
                  <span>2. Выберите дату (ближайшие 14 дней)</span>
                  <span className="text-[10px] text-[#A39B98] normal-case">
                    *Вс — выходной / по согласованию
                  </span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                  {availableDates.map((item) => {
                    const isBlocked = isDateBlocked(item.dateString);
                    const isDisabled = item.isWeekend || isBlocked;
                    const isSelected = formData.date === item.dateString;

                    return (
                      <button
                        key={item.dateString}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setFormData(prev => ({ ...prev, date: item.dateString }))}
                        className={`p-2 rounded-sm border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isDisabled
                            ? 'bg-[#131316] border-[#1C1C22] text-[#4F4B4A] cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-[#B76E79] border-[#B76E79] text-[#0D0D0F] font-bold shadow-md'
                            : 'bg-[#1A1A1E] border-[#26252C] text-[#D1C7C4] hover:border-[#B76E79]/50 hover:bg-[#202025]'
                        }`}
                      >
                        <span className={`text-[10px] uppercase ${isSelected ? 'text-[#0D0D0F]' : 'text-[#A39B98]'}`}>
                          {item.dayName}
                        </span>
                        <span className="text-xs font-semibold mt-0.5">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>}
              </div>

              {/* 3. Выбор времени */}
              <div>
                <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider">
                  3. Выберите время записи (интервал 1.5 часа)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {BUSINESS_CONFIG.defaultTimeSlots.map((time) => {
                    const isBusy = isTimeSlotBusy(formData.date, time);
                    const isSelected = formData.time === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isBusy}
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                        className={`py-2 px-1 rounded-sm border text-xs font-medium transition-all text-center ${
                          isBusy
                            ? 'bg-[#131316] border-[#1C1C22] text-[#4F4B4A] cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#B76E79] border-[#B76E79] text-[#0D0D0F] font-bold shadow-md'
                            : 'bg-[#1A1A1E] border-[#26252C] text-[#F4EBE7] hover:border-[#B76E79]/50 cursor-pointer'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="text-[11px] text-red-400 mt-1">{errors.time}</p>}
              </div>

              {/* 4. Контактные данные клиента */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A39B98] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Например: Алина"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full bg-[#1A1A1E] border ${
                        errors.name ? 'border-red-500' : 'border-[#26252C]'
                      } focus:border-[#B76E79] rounded-sm pl-9 pr-3.5 py-2.5 text-xs text-[#F4EBE7] outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider">
                    Номер телефона *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A39B98] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+7 7XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full bg-[#1A1A1E] border ${
                        errors.phone ? 'border-red-500' : 'border-[#26252C]'
                      } focus:border-[#B76E79] rounded-sm pl-9 pr-3.5 py-2.5 text-xs text-[#F4EBE7] outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Необязательный комментарий */}
              <div>
                <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-2 tracking-wider">
                  Пожелания или комментарий (необязательно)
                </label>
                <input
                  type="text"
                  placeholder="Есть ли снятие, фото желаемого дизайна или сломанный ноготь?"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full bg-[#1A1A1E] border border-[#26252C] focus:border-[#B76E79] rounded-sm px-3.5 py-2.5 text-xs text-[#F4EBE7] outline-none transition-colors"
                />
              </div>

              {/* Честное напоминание о подтверждении */}
              <div className="p-3 bg-[#131316] border border-[#23232A] rounded-sm flex items-start gap-2.5 text-xs text-[#A39B98]">
                <Info className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <span>
                  Запись подтверждается мастером в WhatsApp. Онлайн-календаря нет, поэтому мы свяжемся с вами для фиксации времени.
                </span>
              </div>

              {/* Итоговая панель */}
              <div className="pt-4 border-t border-[#23232A] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <div className="text-[11px] text-[#A39B98]">Ориентировочная стоимость:</div>
                  <div className="font-serif-display text-2xl font-bold text-[#B76E79]">
                    {selectedService?.priceFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-sm bg-[#1A1A1E] hover:bg-[#222129] text-[#A39B98] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-lg shadow-[#B76E79]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0D0D0F]" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <span>Отправить заявку</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Экран успешной отправки заявки */
          <div className="py-6 text-center space-y-6 animate-in fade-in-50 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#B76E79]/15 border border-[#B76E79] mx-auto flex items-center justify-center text-[#B76E79]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#B76E79] block mb-2">
                Заявка успешно отправлена
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F4EBE7]">
                Мастер подтвердит запись в WhatsApp
              </h3>
              <p className="text-xs text-[#A39B98] mt-2 max-w-md mx-auto leading-relaxed">
                Мы получили ваши данные. Мастер Молдир проверит свободный слот и напишет вам в WhatsApp для окончательного подтверждения.
              </p>
            </div>

            {/* Сводка заявки */}
            {lastSubmission && (
              <div className="bg-[#1A1A1E] border border-[#2B2A32] rounded-sm p-4 max-w-lg mx-auto text-left text-xs space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#A39B98] font-bold border-b border-[#23232A] pb-1">
                  Сводка визита:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#D1C7C4]">
                  <div>Услуга: <strong className="text-[#F4EBE7]">{selectedService?.title}</strong></div>
                  <div>Стоимость: <strong className="text-[#B76E79]">{selectedService?.priceFormatted}</strong></div>
                  <div>Дата и время: <strong className="text-[#F4EBE7]">{lastSubmission.date} в {lastSubmission.time}</strong></div>
                  <div>Имя: <strong className="text-[#F4EBE7]">{lastSubmission.name}</strong></div>
                  <div className="col-span-2">Телефон: <strong className="text-[#F4EBE7]">{lastSubmission.phone}</strong></div>
                  {lastSubmission.comment && (
                    <div className="col-span-2 text-[11px] text-[#A39B98]">
                      Комментарий: {lastSubmission.comment}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Быстрые действия после отправки */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp сейчас</span>
              </button>

              <a
                href={BUSINESS_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#222129] hover:bg-[#2A2932] text-[#F4EBE7] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#2D2C35]"
              >
                <InstagramIcon className="w-4 h-4 text-[#B76E79]" />
                <span>Прислать фото дизайна в Instagram</span>
              </a>
            </div>

            <div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-[#A39B98] hover:text-[#F4EBE7] underline cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
