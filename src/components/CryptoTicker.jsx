import React, { useEffect, useState, useRef } from "react";

function CryptoTicker() {
  const [coins, setCoins] = useState([]);
  const tickerRef = useRef(null);
  const posRef = useRef(0);

  // Получаем данные с CoinGecko
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Ошибка при загрузке криптовалют:", error);
      }
    };
    fetchCoins();
  }, []);

  // Анимация бегущей строки
  useEffect(() => {
    let ticker = tickerRef.current;

    const step = () => {
      if (ticker) {
        posRef.current -= 1;
        if (Math.abs(posRef.current) >= ticker.scrollWidth / 2) posRef.current = 0;
        ticker.style.transform = `translateX(${posRef.current}px)`;
      }
      requestAnimationFrame(step);
    };

    step();
  }, [coins]);

  if (!coins.length) return null;

  const items = [...coins, ...coins];

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
        {items.map((coin, index) => {
          const change = coin.price_change_percentage_24h;
          const color = change >= 0 ? "#4caf50" : "#f44336";
          const sign = change >= 0 ? "+" : "";

          return (
            <span
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 20px",
              }}
            >
              <strong>{coin.symbol.toUpperCase()}</strong>: ${coin.current_price.toLocaleString()}{" "}
              <span style={{ color }}>{sign}{change.toFixed(2)}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CryptoTicker;
