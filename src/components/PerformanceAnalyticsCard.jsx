import React, { useState, useEffect, useRef } from "react";

function PerformanceAnalyticsCard() {
  // Только русский язык, убираем все переключение
  const statusSets = [
    [
      "Диагностика инициализирована",
      "Диагностика на неполадки",
      "Обнаружение проблем",
      "Проверка на фишинг"
    ],
    [
      "Диагностика инициализирована",
      "Диагностика на неполадки",
      "Обнаружение проблем",
      "Проверка на фишинг"
    ],
    [
      "Диагностика инициализирована",
      "Диагностика на неполадки",
      "Обнаружение проблем",
      "Проверка на фишинг"
    ],
    [
      "Диагностика инициализирована",
      "Диагностика на неполадки",
      "Обнаружение проблем",
      "Проверка на фишинг"
    ],
    [
      "Оценка безопасности завершена"
    ]
  ];
  const [cycle, setCycle] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const timers = useRef([]);
  const statusTimers = useRef([]);

  // Текущий массив статусов
  const statusList = statusSets[cycle];

  // Тексты под полоской (только русский)
  const underBarTexts = [
    "Первичная диагностика",
    "Поиск неполадок",
    "Обнаружение проблем",
    "Проверка на фишинг",
    "Оценка безопасности завершена"
  ];

  // Цвет для зелёного текста
  const green = '#22c55e';

  // Список отображаемых надписей под полоской
  const [visibleUnderBar, setVisibleUnderBar] = useState([underBarTexts[0]]);

  // Анимация полоски и статусов
  const runBarAnimation = () => {
    timers.current.forEach(clearTimeout);
    statusTimers.current.forEach(clearTimeout);
    timers.current = [];
    statusTimers.current = [];
    setBarWidth(0);
    setStatusIdx(0);
    // Если первый цикл — сбрасываем надписи
    if (cycle === 0) {
      setVisibleUnderBar([underBarTexts[0]]);
    }
    // Количество шагов = статусов
    const steps = statusList.length;
    const totalDuration = Math.floor(Math.random() * 2000) + 2000; // 2-4 сек
    // Генерируем точки остановки (0...100), последний шаг всегда 100
    const stops = [];
    let current = 0;
    for (let i = 1; i < steps; i++) {
      // Для 4-го цикла делаем более плавное и равномерное заполнение
      if (cycle === 3) {
        current += Math.floor(100 / steps);
      } else {
        current += Math.floor(Math.random() * (100 / steps)) + 10;
      }
      if (current > 95) current = 95;
      stops.push(current);
    }
    stops[stops.length - 1] = 100;
    if (stops.length === 0) stops.push(100);
    // Интервалы между остановками
    let intervals = [];
    let left = totalDuration;
    for (let i = 0; i < stops.length; i++) {
      let min = Math.floor(totalDuration * 0.12);
      let max = Math.floor(totalDuration * 0.25);
      let val = i === stops.length - 1 ? left : Math.floor(Math.random() * (max - min + 1)) + min;
      intervals.push(val);
      left -= val;
    }
    // Анимация полоски и статуса
    let elapsed = 0;
    stops.forEach((point, idx) => {
      elapsed += intervals[idx];
      const t = setTimeout(() => {
        setBarWidth(point);
      }, elapsed);
      timers.current.push(t);
      // Смена статуса
      const st = setTimeout(() => {
        setStatusIdx(idx);
      }, elapsed);
      statusTimers.current.push(st);
    });
    // После завершения — переход к следующему циклу и добавление новой строки
    setTimeout(() => {
      if (cycle < 3) {
        setCycle(cycle + 1);
        setVisibleUnderBar(prev => {
          const nextText = underBarTexts[cycle + 1];
          if (prev.includes(nextText)) return prev;
          return [...prev, nextText];
        });
      } else {
        // После завершения 4-го цикла — явно завершаем анимацию, добавляем 4-ю надпись и увеличиваем cycle для зелёного цвета
        setBarWidth(100);
        setStatusIdx(statusSets[cycle].length - 1);
        setVisibleUnderBar(prev => {
          const nextText = underBarTexts[cycle];
          if (!nextText || prev.includes(nextText)) return prev;
          return [...prev, nextText];
        });
        // Не увеличиваем cycle до 4, оставляем 3
      }
    }, totalDuration + 400);
  };

  // Запуск анимации при маунте и по событию
  useEffect(() => {
    setCycle(0);
    setVisibleUnderBar([underBarTexts[0]]);
    runBarAnimation();
    const handler = () => {
      setCycle(0);
      setVisibleUnderBar([underBarTexts[0]]);
      runBarAnimation();
    };
    window.addEventListener('repeatBarAnimation', handler);
    return () => {
      timers.current.forEach(clearTimeout);
      statusTimers.current.forEach(clearTimeout);
      window.removeEventListener('repeatBarAnimation', handler);
    };
  }, []);

  // Запуск анимации при смене цикла
  useEffect(() => {
    if (cycle > 0 && cycle < 4) {
      runBarAnimation();
    }
    // Не запускаем анимацию при cycle > 3 (финальный этап)
    // eslint-disable-next-line
  }, [cycle]);

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: 680,
      height: 440,
      borderRadius: 24,
      background: '#0f172a',
      padding: 32,
      boxShadow: '0 12px 40px 0 rgba(80, 0, 200, 0.15)',
      transition: 'all 0.3s',
      overflow: 'hidden',
      margin: '0 auto',
    }}>
      {/* Градиентный слой */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 20,
        background: 'linear-gradient(90deg, #6366f1 0%, #a21caf 50%, #ec4899 100%)',
        opacity: 0.18,
        filter: 'blur(8px)',
        zIndex: 0,
        transition: 'opacity 0.3s',
      }} />
      {/* Внутренний фон */}
      <div style={{
        position: 'absolute',
        inset: 2,
        borderRadius: 18,
        background: '#0f172a',
        zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Статус над полоской */}
        <div style={{marginBottom: 16, textAlign: 'center'}}>
          <span style={{fontSize: 18, color: '#fff', fontWeight: 600}}>{statusList[statusIdx]}</span>
        </div>
        {/* График */}
        <div style={{ marginBottom: 8, height: 56, width: '100%', overflow: 'hidden', borderRadius: 12, background: 'rgba(30,41,59,0.5)', padding: 12, display: 'flex', alignItems: 'center' }}>
          {/* Горизонтальная полоска-индикатор с градиентом и анимацией */}
          <div style={{
            height: 28,
            width: `${barWidth}%`,
            background: 'linear-gradient(90deg,#6b7280 0%, #2563eb 100%)',
            borderRadius: 10,
            transition: 'width 400ms cubic-bezier(.4,0,.2,1)',
          }} />
        </div>
        {/* Текст(ы) под полоской */}
        <div style={{marginBottom: 16, textAlign: 'center'}}>
          {visibleUnderBar.map((text, idx) => {
            // Зеленый цвет и крупный шрифт только для завершённых, текущий — маленький
            let isFinished = cycle > idx;
            // Для финальной строки — только когда цикл завершён и полоска полностью заполнена
            if (idx === visibleUnderBar.length - 1) {
              isFinished = cycle === 3 && barWidth === 100;
            }
            return (
              <span key={idx} style={{
                display: 'block',
                fontSize: isFinished ? 22 : 16,
                color: isFinished ? green : '#38bdf8',
                fontWeight: isFinished ? 700 : 500,
                marginBottom: 4,
                transition: 'color 0.3s, font-size 0.3s'
              }}>{text}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PerformanceAnalyticsCard;
