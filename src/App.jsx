import React from "react";
import { Routes, Route } from "react-router-dom";
import CryptoTicker from "./components/CryptoTicker";
import Page1_Hello from "./pages/Page1_Hello";
import Page2_Animation from "./pages/Page2_Animation";
import Page3_Animation from "./pages/Page3_Animation";
import Page4_Form from "./pages/Page4_Form";
import Page5_Goodbye from "./pages/Page5_Goodbye";

function App() {
  return (
    <>
      <div className="bg-animation"></div>
      <Routes>
        <Route path="/" element={<Page1_Hello />} />
        <Route path="/page2" element={<Page2_Animation />} />
        <Route path="/page3" element={<Page3_Animation />} />
        <Route path="/page4" element={<Page4_Form />} />
        <Route path="/page5" element={<Page5_Goodbye />} />
      </Routes>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <CryptoTicker />
      </div>
    </>
  );
}
export default App;