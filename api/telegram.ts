import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const ownerChatId = process.env.TELEGRAM_CHAT_ID;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const update = req.body;
  if (!update || !update.callback_query) {
    return res.status(200).json({ ok: true, message: 'No callback query' });
  }

  const callbackQuery = update.callback_query;
  const fromId = String(callbackQuery.from?.id);

  // Безопасность: проверяем, что кнопка нажата владельцем (заданным chat_id)
  if (ownerChatId && fromId !== String(ownerChatId)) {
    return res.status(403).json({ error: 'Unauthorized: Chat ID does not match owner' });
  }

  const data = callbackQuery.data; // "confirm:<id>" или "cancel:<id>"
  const [action, bookingId] = String(data).split(':');

  if (!bookingId || !['confirm', 'cancel'].includes(action)) {
    return res.status(200).json({ ok: false, message: 'Invalid callback data' });
  }

  const newStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
  const statusLabel = action === 'confirm' ? '✅ ПОДТВЕРЖДЕНО' : '❌ ОТКЛОНЕНО';

  // Обновляем статус записи в Supabase с правами service_role
  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);
  }

  // Редактируем сообщение в Telegram и убираем кнопки действий
  try {
    const originalText = callbackQuery.message?.text || '';
    const updatedText = `${originalText}\n\n━━━━━━━━━━━━━━━━━━━━\n📌 *Статус обновлён:* ${statusLabel}`;

    if (token && callbackQuery.message?.message_id) {
      await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.message_id,
          text: updatedText,
          parse_mode: 'Markdown',
        }),
      });

      // Отвечаем на callback_query, чтобы убрать часики на кнопке в Telegram
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: callbackQuery.id,
          text: `Запись ${action === 'confirm' ? 'подтверждена' : 'отклонена'}`,
        }),
      });
    }
  } catch (err) {
    console.error('Error handling Telegram webhook:', err);
  }

  return res.status(200).json({ ok: true, status: newStatus });
}
