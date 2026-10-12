import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Если Telegram не настроен, возвращаем 200 с предупреждением, чтобы не ломать запись
    return res.status(200).json({ 
      ok: false, 
      message: 'Telegram bot is not configured (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)' 
    });
  }

  const {
    id,
    service,
    date,
    time,
    client_name,
    client_phone,
    comment,
  } = req.body || {};

  if (!service || !date || !time || !client_name || !client_phone) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const text = 
    `💅 *НОВАЯ ЗАПИСЬ В MOLDIR NAILS!*\n\n` +
    `✨ *Услуга:* ${service}\n` +
    `📅 *Дата:* ${date}\n` +
    `⏰ *Время:* ${time}\n` +
    `👤 *Клиент:* ${client_name}\n` +
    `📱 *Телефон:* \`${client_phone}\`\n` +
    (comment ? `💬 *Комментарий:* ${comment}\n\n` : `\n`) +
    `_Статус записи: Новый запрос_`;

  // Inline-кнопки для быстрого подтверждения или отмены прямо в Telegram
  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '✅ Подтвердить', callback_data: `confirm:${id}` },
        { text: '❌ Отклонить', callback_data: `cancel:${id}` },
      ],
      [
        { text: '💬 Написать клиенту (WhatsApp)', url: `https://wa.me/${String(client_phone).replace(/\D/g, '')}` }
      ]
    ]
  };

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup,
      }),
    });

    const data = await telegramRes.json();
    return res.status(200).json({ ok: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: 'Failed to send Telegram message', details: message });
  }
}
