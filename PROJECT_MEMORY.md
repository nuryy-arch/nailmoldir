# 🧠 Память проекта Moldir Nails (Кызылорда)
> **Этот файл создан для сохранения полного контекста между рабочими сессиями AI и разработчика.**  
> При следующем входе прочтите этот файл первым делом — в нём зафиксировано актуальное состояние, инфраструктура, ссылки и правила проекта.

---

## 📍 Основная информация о проекте

- **Тип проекта**: Премиальный веб-сайт онлайн-записи и админ-панель для nail-мастера Мөлдір.
- **Локация**: Казахстан, г. Кызылорда, **ул. Казантаева, 19 (салон красоты «Aizada Studio»)**.
- **Телефон / WhatsApp**: `+7 777 456 80 00` (`https://wa.me/77774568000`).
- **Instagram**: `@moldir_nails_kyzylorda` (`https://www.instagram.com/moldir_nails_kyzylorda/`).
- **Официальное фото мастера**: [`public/moldir-portrait.png`](file:///D:/nail-stylist-mody/public/moldir-portrait.png) (портрет с двумя букетами роз).
- **Стиль**: Dark Chic & Luxury Nude — графит `#0D0D0F`, акценты розового золота `#B76E79` / `#E8B4A8`, шрифтовая пара *Cormorant Garamond* + *Plus Jakarta Sans*.
- **Поддержка тем**: Полноценная светлая (День ☀️) и темная (Ночь 🌙) темы через [`src/context/ThemeContext.tsx`](file:///D:/nail-stylist-mody/src/context/ThemeContext.tsx) с сохранением в `localStorage`.

---

## 🌐 Ссылки и продакшн

| Ресурс | Ссылка |
|---|---|
| **Главный сайт (Production)** | [https://nail-stylist-mody.vercel.app](https://nail-stylist-mody.vercel.app) |
| **Админ-панель** | [https://nail-stylist-mody.vercel.app/admin](https://nail-stylist-mody.vercel.app/admin) |
| **GitHub репозиторий** | [https://github.com/nuryy-arch/nailmoldir](https://github.com/nuryy-arch/nailmoldir) (ветка `main`) |
| **Vercel проект** | `nail-stylist-mody` (аккаунт: `dony8`) |
| **Supabase проект** | `ehcgjilrdeqsjfrcnffp` ([https://supabase.com/dashboard/project/ehcgjilrdeqsjfrcnffp](https://supabase.com/dashboard/project/ehcgjilrdeqsjfrcnffp)) |

---

## 🔐 Ключи и настройки окружения (.env)

Находятся в файле [`D:\nail-stylist-mody\.env`](file:///D:/nail-stylist-mody/.env) и прописаны в **Vercel Environment Variables**:
- `VITE_SUPABASE_URL`: указан в `.env` (проект `ehcgjilrdeqsjfrcnffp`)
- `VITE_SUPABASE_ANON_KEY`: публичный анонимный ключ (в файле `.env`)
- `SUPABASE_SERVICE_ROLE_KEY`: секретный ключ сервисной роли (в файле `.env` и Vercel Secrets)
- `TELEGRAM_BOT_TOKEN=` *(настраивается при необходимости Telegram бота)*
- `TELEGRAM_CHAT_ID=` *(настраивается при необходимости Telegram бота)*

---

## 🛠️ Стек технологий и особенности реализации

1. **Frontend**: React 19, Vite, TypeScript, Lucide Icons.
2. **Стилизация**: Tailwind CSS v4 (`@tailwindcss/vite`).
   - Для работы темной темы используется `@custom-variant dark (&:where(.dark, .dark *));` в [`src/index.css`](file:///D:/nail-stylist-mody/src/index.css).
   - Все переменные цвета адаптированы под обе темы через CSS variables (`--bg-page`, `--bg-card`, `--border-card`, `--text-primary`, `--rose-gold` и т.д.).
3. **База данных & Бэкенд**: Supabase (PostgreSQL + Auth + Row Level Security).
   - SQL-схема хранится в [`supabase/schema.sql`](file:///D:/nail-stylist-mody/supabase/schema.sql).
   - Таблица `bookings`: записи клиентов с уникальным индексом на активные слоты.
   - Таблица `blocked_slots`: закрытые мастером часы или целые дни.
   - Таблица `services`: список услуг и редактируемые цены.
   - Представление `public_busy_slots`: безопасный просмотр занятых дат/слотов для клиентов без раскрытия персональных данных.

---

## ⚡ Админ-панель (/admin) — Возможности

1. **Авторизация**: через `supabase.auth.signInWithPassword`.
2. **Вкладка «Записи»**:
   - Просмотр всех записей с фильтрами по статусу (Все, Новые, Подтверждены, Отменены) и дате (Все, Сегодня, Неделя, Выбрать дату).
   - Кнопки связи: моментальный переход в **WhatsApp** с предзаполненным вежливым сообщением или прямой **звонок**.
   - Смена статуса: «Подтвердить», «Отменить».
   - **Удаление отдельной записи**: кнопка корзины 🗑️ на каждой карточке с подтверждением.
   - **Очистка записей**:
     - *Очистить за конкретный день*: выбор даты в модальном окне и удаление броней на выбранный день.
     - *Очистить все записи*: полная очистка таблицы с защитой подтверждением словом `УДАЛИТЬ`.
3. **Вкладка «Расписание & Блокировка»**:
   - Блокировка отдельного слота времени (напр. 10:00) или целого дня (напр. отпуск/выходной).
   - Заблокированные дни немедленно скрываются в форме онлайн-записи.
4. **Вкладка «Услуги и цены»**:
   - Редактирование цен в реальном времени с автосохранением в базу Supabase.
   - Все цены на сайте отображаются с префиксом «от ... ₸».

---

## 🚀 Команды для терминала (PowerShell на Windows)

> **ВАЖНО**: Всегда работайте в директории `D:\nail-stylist-mody`.  
> В PowerShell 5.1 не используйте `&&`, используйте `;` или раздельные строки.

- **Запуск локально**:
  ```powershell
  cd D:\nail-stylist-mody
  npm run dev
  ```
- **Проверка сборки**:
  ```powershell
  npm run build
  ```
- **Фиксация и отправка изменений в Git**:
  ```powershell
  git add . ; git commit -m "описание" ; git push origin main
  ```
- **Публикация в продакшн Vercel**:
  ```powershell
  npx vercel --prod --yes
  ```

---

## 📋 Важные правила и ограничения
1. Адрес всегда должен быть: **г. Кызылорда, ул. Казантаева, 19 (салон красоты «Aizada Studio»)**.
2. Номер телефона мастера: **+7 777 456 80 00**.
3. Все цены на сайте должны выводиться в формате **от Х ХХХ ₸**.
4. Фото мастера должно оставаться актуальным: `/moldir-portrait.png`.
