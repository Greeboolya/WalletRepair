import React, { useEffect, useState } from "react";

function PerformanceAnalyticsCard() {
  // Для горизонтального индикатора
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Анимация роста полоски
    const timeout = setTimeout(() => {
      setBarWidth(100);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);
    return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: 540,
      height: 440,
      borderRadius: 20,
      background: '#0f172a',
      padding: 24,
      boxShadow: '0 12px 40px 0 rgba(80, 0, 200, 0.15)',
      transition: 'all 0.3s',
      overflow: 'hidden',
      margin: '0 auto',
    }}>
      {/* Градиентный слой */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 16,
        background: 'linear-gradient(90deg, #6366f1 0%, #a21caf 50%, #ec4899 100%)',
        opacity: 0.2,
        filter: 'blur(8px)',
        zIndex: 0,
        transition: 'opacity 0.3s',
      }} />
      {/* Внутренний фон */}
      <div style={{
        position: 'absolute',
        inset: 2,
        borderRadius: 15,
        background: '#0f172a',
        zIndex: 1,
      }} />
  <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Верхняя панель */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1 0%, #a21caf 100%)',
            }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>Performance Analytics</h3>
          </div>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            borderRadius: 999,
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '2px 8px',
            fontSize: 12, fontWeight: 500, color: '#10b981',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#10b981', display: 'inline-block' }} />
            Live
          </span>
        </div>
        {/* Два блока */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ borderRadius: 8, background: 'rgba(30,41,59,0.5)', padding: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', margin: 0 }}>Total Views</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>24.5K</p>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#10b981' }}>+12.3%</span>
          </div>
          <div style={{ borderRadius: 8, background: 'rgba(30,41,59,0.5)', padding: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', margin: 0 }}>Conversions</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>1.2K</p>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#10b981' }}>+8.1%</span>
          </div>
        </div>
        {/* График */}
        <div style={{ marginBottom: 16, height: 48, width: '100%', overflow: 'hidden', borderRadius: 10, background: 'rgba(30,41,59,0.5)', padding: 12, display: 'flex', alignItems: 'center' }}>
          {/* Одна горизонтальная полоска-индикатор */}
          <div style={{
            height: 24,
            width: `${barWidth}%`,
            background: '#6366f1',
            borderRadius: 8,
            transition: 'width 0.8s cubic-bezier(.4,2,.6,1)',
          }} />
        </div>
        {/* Нижняя панель */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Элемент Last 7 days удалён */}
          {/* Кнопка View Details удалена */}
        </div>
      </div>
    </div>
  );
}
export default PerformanceAnalyticsCard;
