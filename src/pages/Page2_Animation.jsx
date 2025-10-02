
import React, { useRef } from "react";
import PerformanceAnalyticsCard from "../components/PerformanceAnalyticsCard";
import { useNavigate } from "react-router-dom";
import "./Page1_Hello.css";

function Page2_Animation() {
  const navigate = useNavigate();
  const boxRef = useRef();

  const startAnimation = () => {
    const box = boxRef.current;
    if (!box) return;
    box.style.transition = "transform 1s";
    box.style.transform = "translateX(200px)";
    setTimeout(() => {
      box.style.transform = "translateX(0)";
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
        <h1 className="main-title">Animation Demo</h1>
        <p className="subtitle">Try the animation and go to the next page</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, gap: 24 }}>
        <PerformanceAnalyticsCard cardSize="large" />
        {/* Анимация и кнопка Play Animation удалены по запросу */}
  {/* Кнопка Next Page удалена по запросу */}
      </div>
    </div>
  );
}

export default Page2_Animation;
