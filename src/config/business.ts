import type { ServiceItem, GalleryItem, AdvantageItem } from '../types';

export const BUSINESS_CONFIG = {
  brandName: 'Moldir Nails',
  city: 'Кызылорда',
  masterName: 'Молдир',
  masterRole: 'Nail stylist',
  masterPhotoUrl: '/moldir-portrait.png',
  tagline: 'Аккуратный маникюр и эстетичный Smart-педикюр в Кызылорде',
  subtitle: 'Пространство безупречной чистоты, бережной аппаратной техники и трендовых дизайнов. Индивидуальный подход к каждому ноготку.',
  
  // Контакты и локация (только реальные данные из ТЗ)
  contacts: {
    city: 'г. Кызылорда',
    address: 'ул. Казантаева, 31 (салон красоты «Салта Исаева» / salta_issayeva.studio)',
    phone: '+7 777 456 80 00',
    phoneClean: '77774568000',
    whatsappUrl: 'https://wa.me/77774568000',
    instagramName: '@nail_stylist_moldir',
    instagramUrl: 'https://www.instagram.com/nail_stylist_moldir/',
    // Ссылка на построение маршрута в 2GIS / Карты
    mapsRouteUrl: 'https://2gis.kz/kyzylorda/search/%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%82%D0%B0%D0%B5%D0%B2%D0%B0%2C%2031',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=%D0%9A%D1%8B%D0%B7%D1%8B%D0%BB%D0%BE%D1%80%D0%B4%D0%B0+%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%82%D0%B0%D0%B5%D0%B2%D0%B0+31',
    
    // TODO: График работы (укажите точные рабочие часы, если они изменятся)
    workingHours: 'Пн – Сб: 10:00 – 19:00 (по предварительной записи)',
    workingDaysNotice: '«Горящие окошки» ежедневно публикуются в сторис Instagram',
    note: 'Онлайн-календаря у мастера нет, запись подтверждается индивидуально через WhatsApp',
  },

  // Услуги и цены согласно ТЗ (все цены с пометкой "от", цены в тенге)
  priceNotice: 'Точная стоимость зависит от длины и сложности дизайна, уточняется при записи.',
  services: [
    {
      id: 'apparat-manicure',
      title: 'Аппаратный маникюр с покрытием',
      priceFrom: 4000,
      priceFormatted: 'от 4 000 ₸',
      durationText: '1.5 – 2 часа',
      description: 'Чистейшая аппаратная обработка кутикулы, придание аккуратной формы, выравнивание ногтевой пластины базой и стойкое цветное покрытие под кутикулу.',
      popular: true,
    },
    {
      id: 'extension',
      title: 'Наращивание ногтей (гель / акрил)',
      priceFrom: 7000,
      priceFormatted: 'от 7 000 ₸',
      durationText: '2 – 2.5 часа',
      description: 'Моделирование правильной архитектуры и изящной формы (квадрат, мягкий квадрат, миндаль, овал). Зависит от длины и дизайна.',
      popular: true,
    },
    {
      id: 'smart-pedicure',
      title: 'Smart-педикюр (полный комплекс)',
      priceFrom: 6000,
      priceFormatted: 'от 6 000 ₸',
      durationText: '1.5 – 2 часа',
      description: 'Атравматичная обработка стопы smart-дисками, раскрытие и шлифовка трещин, аккуратная обработка пальчиков и нанесение стойкого покрытия.',
      popular: false,
    },
    {
      id: 'training',
      title: 'Обучение ногтевому сервису',
      priceFrom: 0,
      priceFormatted: 'цена по запросу',
      durationText: 'индивидуальный курс',
      description: 'Авторские базовые программы и курсы повышения квалификации: постановка руки, чистый аппаратный срез, безопасность и тонкости моделирования.',
      popular: false,
    },
  ] as ServiceItem[],

  // Расписание для записи:
  // По умолчанию слоты 10:00–19:00 с шагом 1 час 30 минут (10:00, 11:30, 13:00, 14:30, 16:00, 17:30, 19:00)
  defaultTimeSlots: [
    '10:00',
    '11:30',
    '13:00',
    '14:30',
    '16:00',
    '17:30',
    '19:00',
  ],

  // Настройка дней записи: горизонт 14 дней вперед
  bookingHorizonDays: 14,
  // Отключить воскресенье по умолчанию: 0 = Sunday, 1 = Monday, etc.
  disabledWeekdays: [0], // 0 — Воскресенье (можно изменить на [] если мастер работает без выходных)

  // Галерея работ: ссылки на плейсхолдеры в /gallery/
  // Вы можете положить свои фото в папку public/gallery/ (work-1.jpg, work-2.jpg ...)
  gallery: [
    {
      id: 'work-1',
      title: 'Аппаратный маникюр & Идеальные блики',
      category: 'Маникюр',
      imageUrl: '/gallery/work-1.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-1.jpg',
    },
    {
      id: 'work-2',
      title: 'Наращивание ногтей: четкий миндаль',
      category: 'Наращивание',
      imageUrl: '/gallery/work-2.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-2.jpg',
    },
    {
      id: 'work-3',
      title: 'Smart-педикюр и эстетичное покрытие',
      category: 'Педикюр',
      imageUrl: '/gallery/work-3.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-3.jpg',
    },
    {
      id: 'work-4',
      title: 'Французский маникюр / Минимализм',
      category: 'Маникюр',
      imageUrl: '/gallery/work-4.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-4.jpg',
    },
    {
      id: 'work-5',
      title: 'Трендовый дизайн & Розовое золото',
      category: 'Дизайн',
      imageUrl: '/gallery/work-5.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-5.jpg',
    },
    {
      id: 'work-6',
      title: 'Укрепление и моделирование гелем',
      category: 'Наращивание',
      imageUrl: '/gallery/work-6.jpg',
      placeholderHint: 'TODO: положите свое фото в public/gallery/work-6.jpg',
    },
  ] as GalleryItem[],

  // Преимущества: сформулированы аккуратно, без выдуманных регалий
  advantages: [
    {
      icon: 'ShieldCheck',
      title: 'Стерильность инструментов',
      description: 'Многоэтапная дезинфекция и стерилизация. Крафт-пакет с индикатором стерильности вскрывается при вас, расходные материалы — одноразовые.',
    },
    {
      icon: 'Sparkles',
      title: 'Аппаратная обработка',
      description: 'Бережная и деликатная работа с кутикулой без порезов и пропилов. Чистый срез для аккуратного отрастания.',
    },
    {
      icon: 'Heart',
      title: 'Аккуратное покрытие',
      description: 'Идеальные блики, покрытие под кутикулу и укрепление ногтевой пластины. Стойкая и комфортная носка.',
    },
    {
      icon: 'Coffee',
      title: 'Комфортная атмосфера салона',
      description: 'Приятный приём в салоне красоты «Салта Исаева», удобные кресла, внимание к деталям и чашка согревающего чая или кофе.',
    },
  ] as AdvantageItem[],
};
