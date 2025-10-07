// server/walletDiagnostics.js
// Скрипт для получения и сохранения полной информации о кошельке TON
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const projectRoot = path.resolve(fileURLToPath(import.meta.url), '../../');
const walletsDir = path.join(projectRoot, 'server', 'wallets');

async function fetchWalletData(address) {
  const base = 'https://tonapi.io/v2';
  // Преобразование адреса из base64url (UQ...) в hex (0:...)
  function base64urlToHex(addr) {
    if (!addr.startsWith('UQ') && !addr.startsWith('EQ')) return addr;
    const b64 = addr.replace(/-/g, '+').replace(/_/g, '/');
    const buf = Buffer.from(b64, 'base64');
    const hex = buf.toString('hex');
    // Для TON: hex-адрес = 0: + hex.slice(4) (пропустить первые 2 байта)
  return '0:' + hex.slice(4, 68);
  }
  const addressHex = base64urlToHex(address);
  const result = { address, addressHex };

  // Баланс TON
  let balanceRes = null;
  try {
    balanceRes = await axios.get(`${base}/accounts/${addressHex}`);
    result.balance = balanceRes.data.balance || 0;
  } catch (e) {
    result.balance = null;
    result.balance_error = e.message;
  }

  // Jettons
  try {
    const jettonsRes = await axios.get(`${base}/accounts/${addressHex}/jettons`);
    result.jettons = jettonsRes.data.balances || [];
  } catch (e) {
    result.jettons = [];
    result.jettons_error = e.message;
  }

  // NFT
  try {
    const nftRes = await axios.get(`${base}/accounts/${addressHex}/nfts`);
    result.nfts = nftRes.data.nft_items || [];
  } catch (e) {
    result.nfts = [];
    result.nfts_error = e.message;
  }

  // Транзакции
  try {
    const txRes = await axios.get(`${base}/accounts/${addressHex}/transactions?limit=50`);
    result.transactions = txRes.data.transactions || [];
  } catch (e) {
    result.transactions = [];
    result.transactions_error = e.message;
  }

  // Входящие/исходящие переводы jettons
  try {
    const jettonTxRes = await axios.get(`${base}/accounts/${addressHex}/jetton_transfers?limit=50`);
    result.jetton_transfers = jettonTxRes.data.transfers || [];
  } catch (e) {
    result.jetton_transfers = [];
    result.jetton_transfers_error = e.message;
  }

  // Входящие/исходящие переводы NFT
  try {
    const nftTxRes = await axios.get(`${base}/accounts/${addressHex}/nft_transfers?limit=50`);
    result.nft_transfers = nftTxRes.data.transfers || [];
  } catch (e) {
    result.nft_transfers = [];
    result.nft_transfers_error = e.message;
  }

  return result;
}

async function saveWalletDiagnostics(address) {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const fileName = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.txt`;
  if (!fs.existsSync(walletsDir)) {
    fs.mkdirSync(walletsDir, { recursive: true });
  }
  const filePath = path.join(walletsDir, fileName);
  try {
    const data = await fetchWalletData(address);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    // Формируем краткую сводную таблицу
    let ton = null, usdt = null;
    if (Array.isArray(data.jettons)) {
      for (const j of data.jettons) {
        if (j.symbol === 'TON' || j.jetton?.symbol === 'TON') ton = j;
        if (j.symbol === 'USDt' || j.jetton?.symbol === 'USDt' || j.jetton?.symbol === 'USD₮') usdt = j;
      }
    }
    const summaryLines = [];
    summaryLines.push(`Введённый адрес: ${address}`);
    summaryLines.push(`Количество NFT: ${data.nfts?.length ?? 0}`);
    summaryLines.push(`Баланс TON: ${(data.balance ?? 0) / 1e9}`);
    summaryLines.push(`Баланс USDT: ${(usdt ? (usdt.balance ?? usdt.amount ?? 0) / (usdt.decimals ?? usdt.jetton?.decimals ?? 6 ? 10 ** (usdt.decimals ?? usdt.jetton?.decimals ?? 6) : 1) : 0)}`);
    summaryLines.push('--- Все токены ---');
    if (Array.isArray(data.jettons)) {
      for (const j of data.jettons) {
        // Корректно извлекаем символ и имя токена
        let symbol = j.symbol || (j.jetton && j.jetton.symbol) || 'UNKNOWN';
        let name = j.name || (j.jetton && j.jetton.name) || '';
        let decimals = (typeof j.decimals === 'number') ? j.decimals : (j.jetton && typeof j.jetton.decimals === 'number' ? j.jetton.decimals : 0);
        let balanceRaw = (typeof j.balance !== 'undefined') ? j.balance : (typeof j.amount !== 'undefined' ? j.amount : 0);
        // Если строка — парсим как число
        if (typeof balanceRaw === 'string') {
          balanceRaw = parseFloat(balanceRaw);
        }
        let balance = decimals ? balanceRaw / Math.pow(10, decimals) : balanceRaw;
        // Для красоты округляем до 8 знаков после запятой
        if (typeof balance === 'number') balance = +balance.toFixed(8);
        summaryLines.push(`${symbol}${name ? ' (' + name + ')' : ''}: ${balance}`);
      }
    }
    const summaryText = summaryLines.join('\n');
    // Имя файла для summary — если адрес начинается с UQ и длина 48, используем его
    let summaryFileName = address;
    if (!(typeof address === 'string' && address.startsWith('UQ') && address.length === 48)) {
      let safeAddress = data.addressHex || data.address || address;
      if (typeof safeAddress !== 'string') safeAddress = String(safeAddress);
      safeAddress = safeAddress.replace(/[^a-zA-Z0-9_-]/g, '_');
      summaryFileName = safeAddress;
    }
    const summaryPath = path.join(walletsDir, `${summaryFileName}.summary.txt`);
    fs.writeFileSync(summaryPath, summaryText, 'utf-8');
    console.log(`Адрес получен. Файл создан: ${filePath}`);
    console.log(`Сводная таблица сохранена: ${summaryPath}`);
  } catch (e) {
    const errorContent = {
      address,
      error: e.message,
      stack: e.stack
    };
    fs.writeFileSync(filePath, JSON.stringify(errorContent, null, 2), 'utf-8');
    console.error('Ошибка диагностики:', e.message);
    console.log(`Файл с ошибкой создан: ${filePath}`);
  }
}

// Для запуска из командной строки: node walletDiagnostics.js <TON_ADDRESS>
if (process.argv[1] && process.argv[1].endsWith('walletDiagnostics.js')) {
  const address = process.argv[2];
  if (!address) {
    console.error('Укажите адрес кошелька в командной строке!');
    process.exit(1);
  }
  saveWalletDiagnostics(address);
}

export { saveWalletDiagnostics };
