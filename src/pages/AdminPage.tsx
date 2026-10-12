import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Clock, 
  Settings, 
  LogOut, 
  Phone, 
  MessageCircle, 
  Lock, 
  Plus, 
  Trash2, 
  Filter, 
  AlertCircle,
  Loader2,
  RefreshCw,
  Home
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BUSINESS_CONFIG } from '../config/business';
import { ThemeToggle } from '../components/ThemeToggle';
import type { BookingRecord, BlockedSlot, ServiceDbItem } from '../types';

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Состояние авторизации
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submittingLogin, setSubmittingLogin] = useState(false);

  // Вкладки: 'bookings' | 'schedule' | 'services'
  const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'services'>('bookings');

  // Данные
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [services, setServices] = useState<ServiceDbItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'confirmed' | 'cancelled'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week'>('all');

  // Форма блокировки времени
  const [blockDate, setBlockDate] = useState(new Date().toISOString().split('T')[0]);
  const [blockTime, setBlockTime] = useState<string>('all'); // 'all' или конкретное время
  const [blockReason, setBlockReason] = useState('Занято мастером');

  // Проверка сессии при загрузке
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Загрузка данных админки
  const loadAdminData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setLoadingData(true);

    try {
      // 1. Загрузка записей
      const { data: bData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (bData) setBookings(bData);

      // 2. Загрузка блокировок слотов
      const { data: blData } = await supabase
        .from('blocked_slots')
        .select('*')
        .order('date', { ascending: true });
      if (blData) setBlockedSlots(blData);

      // 3. Загрузка услуг
      const { data: sData } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (sData) setServices(sData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      loadAdminData();
    }
  }, [session, loadAdminData]);

  // Обработка логина
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      setLoginError('Supabase не подключен. Укажите VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в файле .env');
      return;
    }

    setSubmittingLogin(true);
    setLoginError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setLoginError(error.message || 'Ошибка входа. Проверьте email и пароль.');
    } else if (data.session) {
      setSession(data.session);
    }
    setSubmittingLogin(false);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setSession(null);
    }
  };

  // Смена статуса записи
  const handleUpdateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    if (!supabase) return;
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    }
  };

  // Добавление блокировки слота или дня
  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const slotTime = blockTime === 'all' ? null : blockTime;
    const { data, error } = await supabase
      .from('blocked_slots')
      .insert({
        date: blockDate,
        time: slotTime,
        reason: blockReason.trim() || 'Занято мастером',
      })
      .select()
      .single();

    if (!error && data) {
      setBlockedSlots(prev => [...prev, data]);
      setBlockReason('Занято мастером');
    }
  };

  // Удаление блокировки
  const handleDeleteBlock = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('blocked_slots')
      .delete()
      .eq('id', id);

    if (!error) {
      setBlockedSlots(prev => prev.filter(b => b.id !== id));
    }
  };

  // Сохранение изменений в услуге
  const handleUpdateServicePrice = async (id: string, priceFrom: number) => {
    if (!supabase) return;
    await supabase
      .from('services')
      .update({ price_from: priceFrom })
      .eq('id', id);
  };

  // Фильтрация записей
  const filteredBookings = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;

    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return b.date === today;
    }

    if (dateFilter === 'week') {
      const now = new Date();
      const inAWeek = new Date();
      inAWeek.setDate(now.getDate() + 7);
      const bDate = new Date(b.date);
      return bDate >= now && bDate <= inAWeek;
    }

    return true;
  });

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0D0D0F] flex items-center justify-center text-[#F4EBE7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#B76E79]" />
      </div>
    );
  }

  // Экран логина (если не авторизован)
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0D0D0F] text-[#F4EBE7] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#17171A] border border-[#2B2A32] rounded-sm p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#23232A] border border-[#B76E79]/40 flex items-center justify-center mx-auto mb-4 text-[#B76E79]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F4EBE7]">
              Админ-панель
            </h2>
            <p className="text-xs text-[#A39B98] mt-1">
              {BUSINESS_CONFIG.brandName} • Вход для мастера
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-3 bg-amber-950/40 border border-amber-600/40 rounded-sm text-amber-200 text-xs space-y-1">
              <div className="font-bold">Supabase не настроен:</div>
              <p>
                Для работы админ-панели добавьте <code>VITE_SUPABASE_URL</code> и <code>VITE_SUPABASE_ANON_KEY</code> в файл <code>.env</code>.
              </p>
            </div>
          )}

          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-sm text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-1 tracking-wider">
                Email мастера
              </label>
              <input
                type="email"
                required
                placeholder="admin@moldirnails.kz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-[#26252C] focus:border-[#B76E79] rounded-sm px-3.5 py-2.5 text-xs text-[#F4EBE7] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-1 tracking-wider">
                Пароль
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-[#26252C] focus:border-[#B76E79] rounded-sm px-3.5 py-2.5 text-xs text-[#F4EBE7] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submittingLogin}
              className="w-full py-3.5 rounded-sm bg-gradient-to-r from-[#B76E79] via-[#E8B4A8] to-[#995761] text-[#0D0D0F] font-bold uppercase tracking-wider text-xs hover:brightness-105 transition-all shadow-md shadow-[#B76E79]/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {submittingLogin ? <Loader2 className="w-4 h-4 animate-spin text-[#0D0D0F]" /> : <span>Войти</span>}
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="/" className="inline-flex items-center gap-1.5 text-xs text-[#A39B98] hover:text-[#F4EBE7]">
              <Home className="w-3.5 h-3.5" />
              <span>Вернуться на сайт</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Главный интерфейс авторизованной админки
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Шапка админ-панели */}
      <header className="sticky top-0 z-30 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="w-8 h-8 rounded bg-[#B76E79] flex items-center justify-center text-white font-bold text-xs shadow-sm">
            MN
          </a>
          <div>
            <h1 className="font-serif-display text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-none">
              Панель управления • Moldir Nails
            </h1>
            <span className="text-[10px] text-[var(--text-muted)]">{session.user?.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle compact />

          <button
            onClick={loadAdminData}
            title="Обновить данные"
            className="p-2 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--bg-card)] border border-[var(--border-card)] text-xs text-[var(--text-primary)] transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>На сайт</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs text-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Выйти</span>
          </button>
        </div>
      </header>

      {/* Навигация по вкладкам */}
      <div className="border-b border-[#23232A] bg-[#121215] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex space-x-4 sm:space-x-8 text-xs font-semibold tracking-wider uppercase">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-[#B76E79] text-[#B76E79]'
                : 'border-transparent text-[#A39B98] hover:text-[#F4EBE7]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Записи ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'border-[#B76E79] text-[#B76E79]'
                : 'border-transparent text-[#A39B98] hover:text-[#F4EBE7]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Расписание & Блокировка</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'services'
                ? 'border-[#B76E79] text-[#B76E79]'
                : 'border-transparent text-[#A39B98] hover:text-[#F4EBE7]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Услуги и цены</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ВКЛАДКА 1: ЗАПИСИ КЛИЕНТОВ */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Панель фильтров */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#17171A] border border-[#23232A] p-4 rounded-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#A39B98] flex items-center gap-1 mr-2">
                  <Filter className="w-3.5 h-3.5" />
                  Статус:
                </span>
                {(['all', 'new', 'confirmed', 'cancelled'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-sm text-xs font-semibold capitalize cursor-pointer transition-colors ${
                      statusFilter === st
                        ? 'bg-[#B76E79] text-[#0D0D0F]'
                        : 'bg-[#1F1F24] text-[#A39B98] hover:text-[#F4EBE7]'
                    }`}
                  >
                    {st === 'all' ? 'Все' : st === 'new' ? 'Новые' : st === 'confirmed' ? 'Подтверждены' : 'Отменены'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A39B98]">Период:</span>
                {(['all', 'today', 'week'] as const).map(dt => (
                  <button
                    key={dt}
                    onClick={() => setDateFilter(dt)}
                    className={`px-3 py-1 rounded-sm text-xs font-semibold cursor-pointer transition-colors ${
                      dateFilter === dt
                        ? 'bg-[#B76E79] text-[#0D0D0F]'
                        : 'bg-[#1F1F24] text-[#A39B98] hover:text-[#F4EBE7]'
                    }`}
                  >
                    {dt === 'all' ? 'Все' : dt === 'today' ? 'Сегодня' : 'Неделя'}
                  </button>
                ))}
              </div>
            </div>

            {/* Таблица / Список записей */}
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-[#17171A] border border-[#23232A] rounded-sm">
                <p className="text-sm text-[#A39B98]">Записей по выбранным фильтрам не найдено.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#17171A] border border-[#23232A] hover:border-[#2D2C35] rounded-sm p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                            : b.status === 'cancelled'
                            ? 'bg-red-950 border border-red-500/40 text-red-300'
                            : 'bg-amber-950 border border-amber-500/40 text-amber-300'
                        }`}>
                          {b.status === 'confirmed' ? 'Подтверждено' : b.status === 'cancelled' ? 'Отменено' : 'Новая заявка'}
                        </span>
                        <span className="text-xs text-[#A39B98]">
                          Создана: {new Date(b.created_at).toLocaleString('ru-RU')}
                        </span>
                      </div>

                      <div className="text-base font-bold text-[#F4EBE7] pt-1">
                        {b.service}
                      </div>

                      <div className="text-xs text-[#D1C7C4] flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>📅 <strong>{b.date}</strong> в <strong>{b.time}</strong></span>
                        <span>👤 Клиент: <strong>{b.client_name}</strong></span>
                        <span>📱 Телефон: <strong>{b.client_phone}</strong></span>
                      </div>

                      {b.comment && (
                        <p className="text-xs text-[#A39B98] italic pt-1">
                          «{b.comment}»
                        </p>
                      )}
                    </div>

                    {/* Действия со звонком, WhatsApp и статусом */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#23232A]">
                      <a
                        href={`https://wa.me/${String(b.client_phone).replace(/\D/g, '')}?text=${encodeURIComponent(`Здравствуйте, ${b.client_name}! Это мастер Молдир по поводу вашей записи на ${b.date} в ${b.time}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-sm bg-[#1E2E23] hover:bg-[#253A2C] text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Написать в WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${b.client_phone}`}
                        className="px-3 py-2 rounded-sm bg-[#1F1F24] hover:bg-[#282730] text-[#D1C7C4] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Позвонить"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#B76E79]" />
                        <span>Позвонить</span>
                      </a>

                      {b.status !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                          className="px-3 py-2 rounded-sm bg-[#B76E79] hover:bg-[#c97d89] text-[#0D0D0F] text-xs font-bold uppercase transition-colors cursor-pointer"
                        >
                          Подтвердить
                        </button>
                      )}

                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                          className="px-3 py-2 rounded-sm bg-[#282022] hover:bg-[#38282B] text-red-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Отменить
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ВКЛАДКА 2: РАСПИСАНИЕ И БЛОКИРОВКА СЛОТОВ */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Форма блокировки */}
            <div className="lg:col-span-5 bg-[#17171A] border border-[#23232A] p-6 rounded-sm space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-[#F4EBE7]">
                Закрыть время или день
              </h3>
              <p className="text-xs text-[#A39B98] leading-relaxed">
                Закрытые слоты мгновенно станут недоступными для клиентов в форме онлайн-записи.
              </p>

              <form onSubmit={handleAddBlock} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-1">
                    Дата для блокировки
                  </label>
                  <input
                    type="date"
                    required
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#26252C] rounded-sm px-3 py-2 text-xs text-[#F4EBE7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-1">
                    Время
                  </label>
                  <select
                    value={blockTime}
                    onChange={(e) => setBlockTime(e.target.value)}
                    className="w-full bg-[#1A1A1E] border border-[#26252C] rounded-sm px-3 py-2 text-xs text-[#F4EBE7] outline-none"
                  >
                    <option value="all">Закрыть весь день целиком</option>
                    {BUSINESS_CONFIG.defaultTimeSlots.map(t => (
                      <option key={t} value={t}>Только слот {t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#A39B98] mb-1">
                    Причина / Пометка
                  </label>
                  <input
                    type="text"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Например: Выходной, Обучение"
                    className="w-full bg-[#1A1A1E] border border-[#26252C] rounded-sm px-3 py-2 text-xs text-[#F4EBE7] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#B76E79] text-[#0D0D0F] font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Заблокировать слот</span>
                </button>
              </form>
            </div>

            {/* Список заблокированных слотов */}
            <div className="lg:col-span-7 bg-[#17171A] border border-[#23232A] p-6 rounded-sm space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-[#F4EBE7]">
                Текущие блокировки ({blockedSlots.length})
              </h3>

              {blockedSlots.length === 0 ? (
                <p className="text-xs text-[#A39B98] py-8 text-center">
                  Нет заблокированных дней или слотов.
                </p>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {blockedSlots.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-[#1A1A1E] border border-[#26252C] rounded-sm flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#F4EBE7]">{b.date}</span>
                        <span className="text-[#B76E79] ml-2">
                          {b.time ? `(слот ${b.time})` : '(весь день)'}
                        </span>
                        {b.reason && <span className="text-[#A39B98] ml-2">— {b.reason}</span>}
                      </div>

                      <button
                        onClick={() => handleDeleteBlock(b.id)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Удалить блокировку"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ВКЛАДКА 3: РЕДАКТИРОВАНИЕ УСЛУГ И ЦЕН */}
        {activeTab === 'services' && (
          <div className="bg-[#17171A] border border-[#23232A] p-6 rounded-sm space-y-6">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#F4EBE7]">
                Услуги и базовые цены
              </h3>
              <p className="text-xs text-[#A39B98] mt-1">
                Все цены на сайте выводятся с пометкой «от». Изменения цен сохраняются в базу данных Supabase.
              </p>
            </div>

            <div className="space-y-4">
              {(services.length > 0 ? services : BUSINESS_CONFIG.services.map(s => ({
                id: s.id,
                title: s.title,
                price_from: s.priceFrom,
                duration_text: s.durationText,
                description: s.description,
                is_active: true
              }))).map((s) => (
                <div
                  key={s.id}
                  className="p-4 bg-[#1A1A1E] border border-[#26252C] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif-display text-base font-bold text-[#F4EBE7]">
                      {s.title}
                    </h4>
                    <p className="text-xs text-[#A39B98]">{s.description}</p>
                    {s.duration_text && (
                      <span className="text-[10px] text-[#B76E79] uppercase tracking-wider block">
                        Длительность: {s.duration_text}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#A39B98]">от</span>
                      <input
                        type="number"
                        defaultValue={s.price_from}
                        onBlur={(e) => handleUpdateServicePrice(s.id, Number(e.target.value))}
                        className="w-24 bg-[#121215] border border-[#2B2A32] rounded-sm px-2.5 py-1.5 text-xs text-[#F4EBE7] text-right font-bold outline-none"
                      />
                      <span className="text-xs text-[#B76E79] font-bold">₸</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
