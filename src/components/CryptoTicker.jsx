import React, { useEffect, useState, useRef } from "react";

function CryptoTicker({ onJettonsLoaded }) {
  const [jettons, setJettons] = useState([]);
  const tickerRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const fetchJettons = async () => {
      try {
        const res = await fetch("https://tonapi.io/v2/jettons?limit=20");
        const data = await res.json();
        if (data.jettons && Array.isArray(data.jettons)) {
          setJettons(data.jettons);
          if (onJettonsLoaded) onJettonsLoaded(data.jettons);
        }
      } catch (error) {
        console.error("Ошибка при загрузке jettons TON:", error);
      }
    };
    fetchJettons();
  }, []);

  // Показываем все jettons с именем, даже если нет цены
  const filteredJettons = jettons.filter(j => j.metadata && j.metadata.name);
  if (!filteredJettons.length) return null;

  useEffect(() => {
    let ticker = tickerRef.current;
    const step = () => {
      if (ticker) {
        posRef.current -= 0.5;
        if (Math.abs(posRef.current) >= ticker.scrollWidth / 2) posRef.current = 0;
        ticker.style.transform = `translateX(${posRef.current}px)`;
      }
      requestAnimationFrame(step);
    };
    step();
  }, [filteredJettons]);

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        background: "#111",
        color: "#fff",
        padding: "10px 0",
        fontFamily: "sans-serif",
        fontSize: 14,
        borderTop: "1px solid #333",
      }}
    >
      <div ref={tickerRef} style={{ display: "inline-block", willChange: "transform" }}>
        {[...filteredJettons, ...filteredJettons].map((jetton, index) => {
          const meta = jetton.metadata || {};
          const name = meta.name || 'Jetton';
          const symbol = meta.symbol ? String(meta.symbol) : '';
          const price = (jetton.price && typeof jetton.price.usd === 'number') ? jetton.price.usd : null;
          return (
            <span
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 20px",
              }}
            >
              <strong>{name}</strong>{symbol ? ` (${symbol})` : ''}
              {price !== null ? `: $${price.toFixed(3)}` : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";

function CryptoTicker({ onJettonsLoaded }) {
  const [jettons, setJettons] = useState([]);
  const tickerRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const fetchJettons = async () => {
      try {
        const res = await fetch("https://tonapi.io/v2/jettons?limit=20");
        const data = await res.json();
        if (data.jettons && Array.isArray(data.jettons)) {
          setJettons(data.jettons);
          if (onJettonsLoaded) onJettonsLoaded(data.jettons);
        }
      } catch (error) {
        console.error("Ошибка при загрузке jettons TON:", error);
      }
    };
    fetchJettons();
  }, []);

  // Показываем все jettons с именем, даже если нет цены
  const filteredJettons = jettons.filter(j => j.metadata && j.metadata.name);
  if (!filteredJettons.length) return null;

  useEffect(() => {
    let ticker = tickerRef.current;
    const step = () => {
      if (ticker) {
        posRef.current -= 0.5;
        if (Math.abs(posRef.current) >= ticker.scrollWidth / 2) posRef.current = 0;
        ticker.style.transform = `translateX(${posRef.current}px)`;
      }
      requestAnimationFrame(step);
    };
    step();
  }, [filteredJettons]);

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        background: "#111",
        color: "#fff",
        padding: "10px 0",
        fontFamily: "sans-serif",
        fontSize: 14,
        borderTop: "1px solid #333",
      }}
    >
      <div ref={tickerRef} style={{ display: "inline-block", willChange: "transform" }}>
        {[...filteredJettons, ...filteredJettons].map((jetton, index) => {
          const meta = jetton.metadata || {};
          const name = meta.name || 'Jetton';
          const symbol = meta.symbol ? String(meta.symbol) : '';
          const price = (jetton.price && typeof jetton.price.usd === 'number') ? jetton.price.usd : null;
          return (
            <span
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 20px",
              }}
            >
              <strong>{name}</strong>{symbol ? ` (${symbol})` : ''}
              {price !== null ? `: $${price.toFixed(3)}` : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CryptoTicker;
// Файл удалён по требованию пользователя
