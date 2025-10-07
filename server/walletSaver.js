import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
const PORT = 3002;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const walletsDir = path.join(__dirname, 'wallets');
if (!fs.existsSync(walletsDir)) {
  fs.mkdirSync(walletsDir);
}

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

app.listen(PORT, () => {
  console.log(`WalletSaver server running on http://localhost:${PORT}`);
});
