import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
console.log('--- TelegramBot запуск ---');
if (!TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN не найден в переменных окружения!');
  process.exit(1);
}
if (TOKEN.length < 30 || !TOKEN.match(/^\d{9,10}:[A-Za-z0-9_-]{35,}$/)) {
  console.error('Внимание: токен Telegram выглядит некорректно:', TOKEN);
} else {
  console.log('Токен Telegram успешно загружен:', TOKEN.slice(0,8) + '...');
}
const USERS_FILE = path.join(__dirname, 'telegram_users.json');

let users = [];
if (fs.existsSync(USERS_FILE)) {
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (e) {
    users = [];
  }
}


const bot = new TelegramBot(TOKEN, { polling: false });

// Функция для попытки запуска polling с обработкой ошибок
function startPolling() {
  console.log('Попытка запуска polling...');
  bot.startPolling()
    .then(() => {
      console.log('Polling успешно запущен');
      return bot.getMe();
    })
    .then(me => {
      console.log('Бот Telegram авторизован как:', me.username);
    })
    .catch(err => {
      console.error('Ошибка запуска polling:', err.message);
      if (err.message.includes('409')) {
        console.log('Обнаружен конфликт polling. Останавливаем polling и работаем без него.');
        bot.stopPolling();
        // Перезапуск через 30 секунд
        setTimeout(() => {
          console.log('Попытка перезапуска polling через 30 секунд...');
          startPolling();
        }, 30000);
      }
    });
}

// Запускаем polling с обработкой ошибок
startPolling();

// Обработка ошибок polling с автоматическим перезапуском
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
  if (error.message.includes('409')) {
    console.log('Останавливаем polling из-за конфликта...');
    bot.stopPolling();
    // Перезапуск через 60 секунд
    setTimeout(() => {
      console.log('Автоматический перезапуск polling после ошибки 409...');
      startPolling();
    }, 60000);
  }
});

bot.onText(/\/addme/, (msg) => {
  const userId = msg.from.id;
  if (!users.includes(userId)) {
    users.push(userId);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
    bot.sendMessage(userId, 'Вы добавлены в список админов.');
  } else {
    bot.sendMessage(userId, 'Вы уже в списке админов.');
  }
});

// Команда для добавления пользователя по username (только для существующих админов)
bot.onText(/\/adduser (@\w+)/, async (msg, match) => {
  const adminId = msg.from.id;
  const username = match[1]; // @username
  
  // Проверяем, является ли отправитель админом
  if (!users.includes(adminId)) {
    bot.sendMessage(adminId, 'У вас нет прав для добавления пользователей. Сначала используйте /addme');
    return;
  }
  
  try {
    // Пытаемся найти пользователя через API бота
    bot.sendMessage(adminId, `Ищу пользователя ${username}... Попросите его написать боту любое сообщение, чтобы получить ID.`);
    
    // Временное решение: создаем временный слушатель для получения сообщений от нового пользователя
    const tempListener = (tempMsg) => {
      if (tempMsg.from.username && tempMsg.from.username.toLowerCase() === username.replace('@', '').toLowerCase()) {
        const newUserId = tempMsg.from.id;
        if (!users.includes(newUserId)) {
          users.push(newUserId);
          try {
            fs.writeFileSync(USERS_FILE, JSON.stringify(users));
            console.log(`ID ${newUserId} успешно добавлен в telegram_users.json`);
          } catch (err) {
            console.error(`Ошибка записи ID ${newUserId} в telegram_users.json:`, err.message);
          }
          bot.sendMessage(adminId, `Пользователь ${username} (ID: ${newUserId}) добавлен в список админов!`);
          bot.sendMessage(newUserId, 'Вы добавлены в список админов администратором.');
        } else {
          bot.sendMessage(adminId, `Пользователь ${username} уже в списке админов.`);
        }
        bot.off('message', tempListener);
      }
    };
    
    bot.on('message', tempListener);
    
    // Удаляем слушатель через 5 минут, если пользователь не написал
    setTimeout(() => {
      bot.off('message', tempListener);
    }, 300000);
    
  } catch (error) {
    bot.sendMessage(adminId, `Ошибка при поиске пользователя ${username}: ${error.message}`);
  }
});

// Команда для добавления пользователя по ID (только для существующих админов)
bot.onText(/\/addid (\d+)/, (msg, match) => {
  const adminId = msg.from.id;
  const newUserId = parseInt(match[1]);
  
  // Проверяем, является ли отправитель админом
  if (!users.includes(adminId)) {
    bot.sendMessage(adminId, 'У вас нет прав для добавления пользователей. Сначала используйте /addme');
    return;
  }
  
  if (!users.includes(newUserId)) {
    users.push(newUserId);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
    bot.sendMessage(adminId, `Пользователь с ID ${newUserId} добавлен в список админов!`);
    // Пытаемся уведомить добавленного пользователя
    bot.sendMessage(newUserId, 'Вы добавлены в список админов администратором.').catch(() => {
      bot.sendMessage(adminId, 'Пользователь добавлен, но не удалось отправить ему уведомление (возможно, он не писал боту).');
    });
  } else {
    bot.sendMessage(adminId, `Пользователь с ID ${newUserId} уже в списке админов.`);
  }
});

// Команда для просмотра списка админов
bot.onText(/\/listadmins/, (msg) => {
  const adminId = msg.from.id;
  
  if (!users.includes(adminId)) {
    bot.sendMessage(adminId, 'У вас нет прав для просмотра списка админов.');
    return;
  }
  
  if (users.length === 0) {
    bot.sendMessage(adminId, 'Список админов пуст.');
  } else {
    bot.sendMessage(adminId, `Список админов (${users.length}):\n${users.map(id => `• ${id}`).join('\n')}`);
  }
});

export function sendToAllUsers(text, filePath) {
  console.log(`--- Начинаем рассылку всем пользователям ---`);
  console.log(`Количество пользователей в списке: ${users.length}`);
  console.log(`Пользователи: ${JSON.stringify(users)}`);
  console.log(`Текст сообщения: ${text.substring(0, 100)}...`);
  console.log(`Файл для отправки: ${filePath || 'отсутствует'}`);
  
  if (users.length === 0) {
    console.log('ВНИМАНИЕ: Список пользователей пуст! Сообщения не будут отправлены.');
    return;
  }
  
  users.forEach((userId, index) => {
    console.log(`Отправляем пользователю ${index + 1}/${users.length} (ID: ${userId})`);
    
    if (filePath && fs.existsSync(filePath)) {
      bot.sendDocument(userId, filePath, {}, { filename: path.basename(filePath) })
        .then(() => {
          console.log(`✅ Файл успешно отправлен пользователю ${userId}`);
          return bot.sendMessage(userId, text);
        })
        .then(() => {
          console.log(`✅ Сообщение успешно отправлено пользователю ${userId}`);
        })
        .catch(err => {
          console.error(`❌ Ошибка отправки пользователю ${userId}:`, err.message);
        });
    } else {
      bot.sendMessage(userId, text)
        .then(() => {
          console.log(`✅ Сообщение успешно отправлено пользователю ${userId}`);
        })
        .catch(err => {
          console.error(`❌ Ошибка отправки сообщения пользователю ${userId}:`, err.message);
        });
    }
  });
  
  console.log(`--- Рассылка завершена ---`);
}
