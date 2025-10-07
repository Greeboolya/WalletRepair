import React, { useState, useEffect } from "react";

export default function WalletCheckPage() {
  const [wallet, setWallet] = useState("");
  const [checking, setChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState(null);

  const steps = [
    "Проверка адреса и сети",
    "Получение балансов",
    "Получение токенов",
    "Сбор разрешений",
    "Проверка на подозрительные контракты",
    "Анализ завершён",
  ];

  const startCheck = () => {
    if (window.sessionStorage.getItem('recoveryFinished')) return;
    if (!wallet) return alert("Введите адрес кошелька");
    setChecking(true);
    setProgress(0);
    setCurrentStep(steps[0]);
    setResult(null);
  };

  useEffect(() => {
    if (!checking) return;
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        setProgress(Math.round(((stepIndex + 1) / steps.length) * 100));
        stepIndex++;
      } else {
        clearInterval(interval);
        // Имитация результата
        setResult({
          risk: "Средний",
          message: "Найдены 2 потенциально опасных approvals",
          approvals: 2,
          tokens: 12,
          balance: 0.234,
        });
        setChecking(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [checking]);

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
      `}</style>
  <div style={{ background: '#18181b', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {/* Заголовок */}
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Диагностика кошелька</h1>
      <p style={{ color: '#a1a1aa', marginBottom: 24, textAlign: 'center' }}>
        Проверяем баланс, токены, разрешения и потенциальные риски.
      </p>

      {/* Ввод адреса */}
      <div style={{ display: 'flex', width: '100%', maxWidth: 400, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Введите адрес кошелька или ENS..."
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          style={{ flex: 1, padding: 12, borderRadius: '8px 0 0 8px', background: '#27272a', border: '1px solid #444', outline: 'none', color: '#fff', fontSize: 16 }}
        />
        <button
          onClick={startCheck}
          style={{ background: '#2563eb', color: '#fff', padding: '0 18px', borderRadius: '0 8px 8px 0', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}
        >
          Проверить
        </button>
      </div>

      {/* Индикатор прогресса и чек-лист */}
      {checking && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', width: 128, height: 128, marginBottom: 16 }}>
            <svg width={128} height={128}>
              <circle
                cx={64}
                cy={64}
                r={56}
                stroke="#555"
                strokeWidth={8}
                fill="none"
              />
              <circle
                cx={64}
                cy={64}
                r={56}
                stroke="#3b82f6"
                strokeWidth={8}
                fill="none"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 - (2 * Math.PI * 56 * progress) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s' }}
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>{progress}%</span>
            </div>
          </div>
          <div style={{ width: 256, background: '#27272a', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 18 }}>
            <div
              style={{ height: 8, background: '#2563eb', width: `${progress}%`, transition: 'width 0.5s' }}
            ></div>
          </div>
          {/* Чек-лист этапов */}
          <div style={{ width: 320, margin: '0 auto', marginTop: 8 }}>
            {steps.map((step, idx) => {
              const isDone = progress >= Math.round(((idx + 1) / steps.length) * 100);
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: 16, color: isDone ? '#22c55e' : '#a1a1aa', marginBottom: 6, fontWeight: isDone ? 600 : 400 }}>
                  <span style={{ flex: 1 }}>{step}</span>
                  {isDone && (
                    <svg width={20} height={20} style={{ marginLeft: 8 }} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Результат */}
      {result && (
        <div style={{ background: '#27272a', padding: 24, borderRadius: 16, width: '100%', maxWidth: 400, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', animation: 'fadeIn 0.7s' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Результат диагностики</h2>
          <p style={{ marginBottom: 8 }}>Риск: <span style={{ fontWeight: 600 }}>{result.risk}</span></p>
          <p style={{ marginBottom: 16 }}>{result.message}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#444', padding: 12, borderRadius: 8 }}>
              Баланс TON<br />
              {result.balance}
            </div>
            <div style={{ background: '#444', padding: 12, borderRadius: 8 }}>Токены: {result.tokens}</div>
            <div style={{ background: '#444', padding: 12, borderRadius: 8 }}>Опасные approvals: {result.approvals}</div>
          </div>
          <button
            style={{ marginTop: 18, width: '100%', background: '#dc2626', color: '#fff', padding: '12px 0', borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#b91c1c'}
            onMouseOut={e => e.currentTarget.style.background = '#dc2626'}
          >
            Отозвать опасные approvals
          </button>
        </div>
      )}

      </div>
    </>
  );
}
