import React, { useEffect, useState } from "react";

function Page5_Goodbye() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    window.sessionStorage.clear(); // сбрасываем флаг восстановления при заходе на финальную страницу
    window.sessionStorage.setItem('recoveryFinished', '1');
  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              color: "#fff",
              borderRadius: 18,
              padding: "32px 28px",
              maxWidth: 420,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              fontSize: 18,
              lineHeight: 1.6,
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Готово — ваш TON-кошелёк защищён! 🎉
            </div>
            Мы автоматически устранили обнаруженные проблемы: отозвали лишние
            разрешения, заблокировали подозрительные контракты и очистили кошелёк
            от вредоносных токенов. <br />
            <br />
            Рекомендуем перезагрузить ваше устройство, проверить работу кошелька
            и, при необходимости, повторить сканирование. Спокойных транзакций!
          </div>
        </div>
      )}
    </div>
  );
}

export default Page5_Goodbye;
