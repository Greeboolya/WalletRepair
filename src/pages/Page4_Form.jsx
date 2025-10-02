

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page1_Hello.css";

function Page4_Form() {
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const [showWords, setShowWords] = useState(Array(12).fill(false));
  const [wordsCount, setWordsCount] = useState(12);
  const navigate = useNavigate();

  const handleChangeWord = (index, value) => {
    const newWords = [...seedWords];
    newWords[index] = value;
    setSeedWords(newWords);
  };

  const handleToggleShow = (index) => {
    const newShow = [...showWords];
    newShow[index] = !newShow[index];
    setShowWords(newShow);
  };

  const handleWordsCount = (count) => {
    setWordsCount(count);
    setSeedWords(Array(count).fill(""));
    setShowWords(Array(count).fill(false));
  };

  const handleClear = () => {
    setSeedWords(Array(wordsCount).fill(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data saved!");
    navigate("/page5");
  };

  return (
    <div className="page1-hello" style={{ 
      background: `#111215 url('/back1.jpg') center/cover no-repeat`, 
      minHeight: '100vh',
      marginTop: 0,
      boxSizing: 'border-box'
    }}>
      <div className="header" style={{ marginBottom: 0 }}>
        <div className="logo-container" style={{ marginBottom: 10 }}>
          <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
            <linearGradient id="shield" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF7F" />
              <stop offset="100%" stopColor="#00BFFF" />
            </linearGradient>
            <path d="M30 5L10 15v15c0 14 10 25 20 25s20-11 20-25V15L30 5z" fill="url(#shield)" stroke="#00FF7F" strokeWidth="2"/>
          </svg>
          <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', fontWeight: 900, color: '#00FF7F', fontSize: 22, letterSpacing: 2 }}>TRUST</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 0, marginTop: 18 }}>
  <form onSubmit={handleSubmit} style={{ background: 'rgba(70,130,180,0.85)', borderRadius: 10, boxShadow: '0 2px 24px 0 #000', padding: 18, minWidth: 300, maxWidth: 420, width: '100%', border: '1.5px solid #222', position: 'relative', minHeight: 320, backdropFilter: 'blur(2px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ flex: 1, height: 4, background: '#222', borderRadius: 2, marginRight: 8, position: 'relative' }}>
              <div style={{ width: '100%', height: 4, background: '#00FF7F', borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, height: 4, background: '#222', borderRadius: 2, marginLeft: 8, position: 'relative' }}>
              <div style={{ width: '100%', height: 4, background: '#00FF7F', borderRadius: 2 }} />
            </div>
          </div>
            <h2
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 32,
                textAlign: 'center',
                marginBottom: 8,
                marginTop: 0,
                padding: 0,
                wordBreak: 'break-word',
                lineHeight: 1.2,
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Import with Secret Phrase
            </h2>
          <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
            <select
              value={wordsCount}
              onChange={e => handleWordsCount(Number(e.target.value))}
              style={{
                width: '100%',
                background: '#23272f',
                color: '#fff',
                border: '1.5px solid #00FF7F',
                borderRadius: 6,
                padding: '12px 16px',
                fontWeight: 600,
                fontSize: 16,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                textAlign: 'center',
                margin: 0,
                boxSizing: 'border-box',
                display: 'block',
              }}
            >
              <option value={12}>I have a 12 word Secret Phrase</option>
              <option value={24}>I have a 24 word Secret Phrase</option>
            </select>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: wordsCount === 24 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
              gap: 7,
              marginBottom: 10
            }}
          >
            {seedWords.map((word, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#23272f', borderRadius: 5, padding: 0, border: '1px solid #222', minWidth: 0, width: '100%' }}>
                <span style={{ color: '#7fffd4', fontWeight: 600, fontSize: 14, width: 20 }}>{i + 1}.</span>
                <input
                  type={showWords[i] ? 'text' : 'password'}
                  value={word}
                  onChange={e => handleChangeWord(i, e.target.value)}
                  placeholder={showWords[i] ? `Word ${i + 1}` : '•••••'}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: 15, padding: '10px 6px', outline: 'none', minWidth: 0, width: '100%' }}
                />
                <button type="button" onClick={() => handleToggleShow(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7fffd4', fontSize: 16, marginLeft: 4, padding: 0 }}>
                  {showWords[i] ? (
                    <svg width="16" height="16" fill="#7fffd4" viewBox="0 0 20 20"><path d="M10 3C5 3 1.73 7.11 1.13 9.36a1 1 0 000 .28C1.73 12.89 5 17 10 17s8.27-4.11 8.87-6.36a1 1 0 000-.28C18.27 7.11 15 3 10 3zm0 12c-3.87 0-7.19-3.13-7.82-5C2.81 8.13 6.13 5 10 5s7.19 3.13 7.82 5c-.63 1.87-3.95 5-7.82 5zm0-8a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"/></svg>
                  ) : (
                    <svg width="16" height="16" fill="#7fffd4" viewBox="0 0 20 20"><path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.1 1.1C2.6 7.01 1.47 8.7 1.13 9.36a1 1 0 000 .28C1.73 12.89 5 17 10 17c1.61 0 3.09-.32 4.39-.87l1.21 1.21a.75.75 0 101.06-1.06l-14-14zm7.13 9.25a3 3 0 01-4.35-4.35l4.35 4.35zm-5.16-5.16l1.41 1.41A3 3 0 0010 13a3 3 0 002.12-.88l1.41 1.41A7.96 7.96 0 0110 15c-3.87 0-7.19-3.13-7.82-5 .29-.86 1.42-2.55 3.09-4.09z"/></svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#00FF7F',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                borderRadius: 999,
                padding: '12px 0',
                marginBottom: 18,
                textAlign: 'center',
                display: 'block',
                transition: 'border 0.2s, background 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.border = '1.5px solid #00FF7F'; e.currentTarget.style.background = 'rgba(0,255,127,0.07)'; }}
              onMouseOut={e => { e.currentTarget.style.border = 'none'; e.currentTarget.style.background = 'none'; }}
            >
              Clear all
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0, gap: 12 }}>
            <button
              type="button"
              className="cta-button"
              style={{
                background: 'none',
                color: '#00FF7F',
                border: 'none',
                fontWeight: 600,
                fontSize: 18,
                minWidth: 90,
                borderRadius: 999,
                textAlign: 'center',
                padding: '12px 0',
                flex: 1,
                display: 'block',
                transition: 'border 0.2s, background 0.2s',
              }}
              onClick={() => navigate(-1)}
              onMouseOver={e => { e.currentTarget.style.border = '1.5px solid #00FF7F'; e.currentTarget.style.background = 'rgba(0,255,127,0.07)'; }}
              onMouseOut={e => { e.currentTarget.style.border = 'none'; e.currentTarget.style.background = 'none'; }}
            >
              Back
            </button>
            <button
              type="submit"
              className="cta-button"
              style={{
                background: '#00FF7F',
                color: '#111215',
                fontWeight: 700,
                fontSize: 18,
                minWidth: 90,
                border: '1.5px solid #00FF7F',
                borderRadius: 999,
                textAlign: 'center',
                padding: '12px 0',
                flex: 1,
                display: 'block',
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page4_Form;
