import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Page3_Animation() {
  const navigate = useNavigate();
  const boxRef = useRef();

  const startAnimation = () => {
    const box = boxRef.current;
    if (!box) return;
    box.style.transition = "transform 1s";
    box.style.transform = "translateY(100px)";
    setTimeout(() => {
      box.style.transform = "translateY(0)";
    }, 1000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Страница 3: Анимация</h1>
      <div
        ref={boxRef}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "blue",
          marginBottom: 20,
        }}
      />
      <button onClick={() => navigate("/page2")}>Назад на страницу 2</button>
      <button onClick={startAnimation} style={{ marginLeft: 10 }}>
        Повторить анимацию
      </button>
      <button onClick={() => navigate("/page4")} style={{ marginLeft: 10 }}>
        Следующая страница
      </button>
    </div>
  );
}

export default Page3_Animation;
