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


const bot = new TelegramBot(TOKEN, { polling: true });
bot.getMe().then(me => {
  console.log('Бот Telegram авторизован как:', me.username);
}).catch(err => {
  console.error('Ошибка авторизации Telegram:', err.message);
  if (err.response && err.response.body) {
    console.error('Детали:', err.response.body);
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

export function sendToAllUsers(text, filePath) {
  users.forEach((userId) => {
    if (filePath && fs.existsSync(filePath)) {
      bot.sendDocument(userId, filePath, {}, { filename: path.basename(filePath) });
      bot.sendMessage(userId, text);
    } else {
      bot.sendMessage(userId, text);
    }
  });
}
