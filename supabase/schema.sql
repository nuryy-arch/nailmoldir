-- =======================================================================
-- SQL СХЕМА ДЛЯ MOLDIR NAILS (SUPABASE / POSTGRESQL)
-- Запустите этот скрипт в Supabase Dashboard -> SQL Editor -> Run
-- =======================================================================

-- 1. Таблица записей клиентов (bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    comment TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Индекс уникальности: нельзя создать две активные записи на одну дату и время
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_slot_idx 
ON public.bookings (date, time) 
WHERE status != 'cancelled';

-- 2. Таблица заблокированных дней и часов (blocked_slots)
-- Если time IS NULL — заблокирован весь день.
CREATE TABLE IF NOT EXISTS public.blocked_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    time TEXT,
    reason TEXT DEFAULT 'Занято мастером',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Таблица услуг для управления из админ-панели (services)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price_from INTEGER NOT NULL DEFAULT 0,
    duration_text TEXT DEFAULT '',
    description TEXT DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Начальные данные для услуг
INSERT INTO public.services (id, title, price_from, duration_text, description, is_active, sort_order)
VALUES
('apparat-manicure', 'Аппаратный маникюр с покрытием', 4000, '1.5 – 2 часа', 'Чистейшая аппаратная обработка кутикулы, придание аккуратной формы, выравнивание ногтевой пластины базой и стойкое цветное покрытие под кутикулу.', true, 1),
('extension', 'Наращивание ногтей (гель / акрил)', 7000, '2 – 2.5 часа', 'Моделирование правильной архитектуры и изящной формы (квадрат, мягкий квадрат, миндаль, овал). Зависит от длины и дизайна.', true, 2),
('smart-pedicure', 'Smart-педикюр (полный комплекс)', 6000, '1.5 – 2 часа', 'Атравматичная обработка стопы smart-дисками, раскрытие и шлифовка трещин, аккуратная обработка пальчиков и нанесение стойкого покрытия.', true, 3),
('training', 'Обучение ногтевому сервису', 0, 'индивидуальный курс', 'Авторские базовые программы и курсы повышения квалификации: постановка руки, чистый аппаратный срез, безопасность и тонкости моделирования.', true, 4)
ON CONFLICT (id) DO NOTHING;

-- 4. Публичное безопасное представление для проверки занятых слотов (БЕЗ личных данных клиентов!)
-- Клиенты читают только дату и время, номера телефонов и имена не раскрываются.
CREATE OR REPLACE VIEW public.public_busy_slots AS
SELECT date, time FROM public.bookings WHERE status != 'cancelled'
UNION
SELECT date, time FROM public.blocked_slots;

-- 5. Настройка Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Политики для bookings:
-- Анонимный посетитель может ТОЛЬКО вставить новую запись:
DROP POLICY IF EXISTS "Allow anonymous insert on bookings" ON public.bookings;
CREATE POLICY "Allow anonymous insert on bookings" 
ON public.bookings 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Авторизованный администратор может читать, менять статус и удалять:
DROP POLICY IF EXISTS "Allow authenticated admin full access on bookings" ON public.bookings;
CREATE POLICY "Allow authenticated admin full access on bookings" 
ON public.bookings 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Service Role (для Telegram webhook и Vercel Functions) имеет полный доступ ко всем таблицам автоматически.

-- Политики для blocked_slots:
DROP POLICY IF EXISTS "Allow public read on blocked_slots" ON public.blocked_slots;
CREATE POLICY "Allow public read on blocked_slots" 
ON public.blocked_slots 
FOR SELECT 
TO anon 
USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on blocked_slots" ON public.blocked_slots;
CREATE POLICY "Allow authenticated admin full access on blocked_slots" 
ON public.blocked_slots 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Политики для services:
DROP POLICY IF EXISTS "Allow public read on services" ON public.services;
CREATE POLICY "Allow public read on services" 
ON public.services 
FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on services" ON public.services;
CREATE POLICY "Allow authenticated admin full access on services" 
ON public.services 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
