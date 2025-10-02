
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Page1_Hello.css";

function Page3_Animation() {
  const navigate = useNavigate();
  const boxRef = useRef();

  const startAnimation = () => {
    const box = boxRef.current;
    if (!box) return;
    box.style.transition = "transform 1s";
    box.style.transform = "translateY(100px)";
    setTimeout(() => {
      box.style.transform = "translateY(0)";
    }, 1000);
  };

  return (
    <div className="page1-hello">
      <div className="header">
        <div className="logo-container">
          <svg width="50" height="50" fill="white" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <h1 className="main-title">Animation Y Demo</h1>
        <p className="subtitle">Try the vertical animation and go to the next page</p>
        <p style={{ fontSize: 24, color: '#1E90FF', fontWeight: 700, margin: '18px 0 0 0', textShadow: '0 1px 8px #fff', WebkitTextStroke: '0.2px #1E90FF', lineHeight: 1.25 }}>
          Don’t wait for problems — <span style={{ color: '#1E90FF', fontWeight: 900, fontSize: 24, filter: 'brightness(1.1)' }}>run a professional wallet diagnostic right now</span>
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
        <div
          ref={boxRef}
          style={{
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg,#6366f1,#0ea5e9)',
            borderRadius: 14,
            marginBottom: 28,
            boxShadow: '0 4px 16px 0 rgba(14,165,233,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 1s',
          }}
        />
        <button className="cta-button" style={{ marginBottom: 16, fontSize: 18 }} onClick={() => navigate("/page2")}>Back to Page 2</button>
        <button className="cta-button" style={{ marginBottom: 16, fontSize: 18 }} onClick={startAnimation}>Play Animation</button>
  {/* Кнопка Next Page удалена по запросу */}
      </div>
    </div>
  );
}

export default Page3_Animation;
