
import React from "react";
import "./Page1_Hello.css";

function Page5_Goodbye() {
  return (
    <div className="page1-hello">
      <div className="header">
        <div className="logo-container">
          <svg width="50" height="50" fill="white" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <h1 className="main-title">Goodbye!</h1>
        <p className="subtitle">Thank you for using our service</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <p style={{ fontSize: 20, color: '#4B0082', fontWeight: 600, marginBottom: 30 }}>We hope to see you again!</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
          <button className="cta-button" style={{ fontSize: 18 }}>Main Page</button>
          <button className="cta-button" style={{ fontSize: 18 }}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default Page5_Goodbye;
