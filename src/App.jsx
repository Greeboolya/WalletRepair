import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Page1_Hello from "./pages/Page1_Hello";
import Page2_Animation from "./pages/Page2_Animation";
import Page3_Animation from "./pages/Page3_Animation";

import Page5_Goodbye from "./pages/Page5_Goodbye";
import WalletCheckPage from "./pages/WalletCheckPage";
import WalletSummaryTest from "./pages/WalletSummaryTest";
import Pickwallet from "./pages/Pickwallet";
import './cyber-bg.css';


function App() {
  // Прокидываем jettons через state для отладки
  const [debugJettons, setDebugJettons] = React.useState([]);
  const location = useLocation();
  React.useEffect(() => {
    window.sessionStorage.clear();
  }, [location.pathname]);
  return (
    <>
  <div className="bg-cybersecurity"></div>
      <Routes>
        <Route path="/" element={<Page1_Hello />} />
        <Route path="/page2" element={<Page2_Animation />} />
        <Route path="/page3" element={<Page3_Animation />} />
        <Route path="/page5" element={<Page5_Goodbye />} />
        <Route path="/wallet-check" element={<WalletCheckPage />} />
        <Route path="/wallet-summary-test" element={<WalletSummaryTest />} />
        <Route path="/pickwallet" element={<Pickwallet />} />
        {/* <Route path="/playground" element={<Playground />} /> */}
      </Routes>
    </>
  );
}
export default App;