import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
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
