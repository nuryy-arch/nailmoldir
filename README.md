# Moldir Nails (Kyzylorda) — Сайт онлайн-записи и админ-панель

Премиальный сайт онлайн-записи для nail-мастера Молдир в стиле **Dark Chic** (графит `#0D0D0F`, акцент розовое золото `#B76E79` / `#E8B4A8`), разработанный на React + Vite + TypeScript + Tailwind CSS с серверной частью на Supabase и Telegram-уведомлениями.

---

## Чек-лист: Что нужно настроить вручную (TODO)

### 1. Места в коде для ваших персональных данных (TODO)
- **Фотографии работ**: положите реальные фото ваших работ в папку `public/gallery/` (`work-1.jpg`, `work-2.jpg`, `work-3.jpg`, `work-4.jpg`, `work-5.jpg`, `work-6.jpg`). Названия и описания карточек настраиваются в [`src/config/business.ts`](file:///D:/nail-stylist-mody/src/config/business.ts).
- **Текст «О мастере»**: в файле [`src/components/Master.tsx`](file:///D:/nail-stylist-mody/src/components/Master.tsx) можно вписать реальный стаж, сертификаты или личное обращение к гостям (отмечено блоком TODO).
- **График работы**: в файле [`src/config/business.ts`](file:///D:/nail-stylist-mody/src/config/business.ts) строка `workingHours` (по умолчанию указано «Пн – Сб: 10:00 – 19:00»).

---

## 2. Настройка базы данных Supabase

1. Зарегистрируйтесь на [supabase.com](https://supabase.com) и создайте новый проект (например, `moldir-nails`).
2. В боковом меню откройте **SQL Editor** -> **New query**.
3. Скопируйте всё содержимое файла [`supabase/schema.sql`](file:///D:/nail-stylist-mody/supabase/schema.sql) и нажмите **Run**.
   - Будут созданы таблицы `bookings` (записи), `blocked_slots` (блокировка дней/часов), `services` (услуги), представление `public_busy_slots` и политики безопасности Row Level Security.
4. В разделе **Project Settings** -> **API** скопируйте:
   - **Project URL** -> `VITE_SUPABASE_URL`
   - **anon public key** -> `VITE_SUPABASE_ANON_KEY`
   - **service_role secret key** -> `SUPABASE_SERVICE_ROLE_KEY`
5. Создайте администратора:
   - Перейдите в **Authentication** -> **Users** -> **Add user** -> **Create user**.
   - Введите ваш email и надежный пароль (под ними вы будете входить в админ-панель на `/admin`).

---

## 3. Настройка Telegram-бота для мгновенных уведомлений

1. Откройте в Telegram бота [@BotFather](https://t.me/BotFather) и отправьте команду `/newbot`.
2. Задайте имя (например, `Moldir Nails Bot`) и юзернейм (например, `moldir_nails_booking_bot`).
3. Скопируйте полученный токен -> `TELEGRAM_BOT_TOKEN`.
4. Узнайте свой персональный Chat ID: напишите боту [@userinfobot](https://t.me/userinfobot) и скопируйте свой Id -> `TELEGRAM_CHAT_ID`.
5. Нажмите **Start** в вашем созданном боте, чтобы он мог присылать вам сообщения.

---

## 4. Переменные окружения (.env)

Создайте в корне проекта файл `.env` на основе [`.env.example`](file:///D:/nail-stylist-mody/.env.example):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
TELEGRAM_BOT_TOKEN=123456789:ABCDEF...
TELEGRAM_CHAT_ID=123456789
```
*(Файл `.env` добавлен в `.gitignore` и защищен от публикации в репозитории).*

---

## 5. Деплой на Vercel

1. Загрузите проект на GitHub или выполните деплой через команду:
   ```bash
   vercel
   ```
2. В панели Vercel проекта перейдите в **Settings** -> **Environment Variables** и добавьте все 5 переменных из вашего `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. Выполните **Redeploy**.

---

## 6. Установка Webhook для Telegram

Чтобы кнопки «✅ Подтвердить» и «❌ Отклонить» прямо в Telegram-сообщении мгновенно меняли статус в базе, привяжите webhook к Vercel Function:
Вставьте в браузер следующую ссылку (заменив токен бота и ваш Vercel-домен):
```
https://api.telegram.org/bot<ВАШ_TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<ВАШ_ДОМЕН_НА_VERCEL>.vercel.app/api/telegram
```
Вы должны получить ответ: `{"ok":true,"result":true,"description":"Webhook was set"}`.

---

## 7. Админ-панель

- Доступна по адресу: `/admin` (или кликом по ссылке в футере).
- **Вкладка «Записи»**: фильтры по статусу и дате, кнопки быстрого перехода в WhatsApp клиента, звонка, подтверждения и отмены.
- **Вкладка «Расписание»**: закрытие всего дня или конкретного времени (закрытые слоты блокируются в форме онлайн-записи).
- **Вкладка «Услуги»**: прямое изменение базовых цен.

---

## 8. Запуск проекта локально
```bash
npm run dev
```
Сайт откроется по адресу `http://localhost:5173`.
