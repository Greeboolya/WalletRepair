import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Page2_Animation() {
  const navigate = useNavigate();
  const boxRef = useRef();

  const startAnimation = () => {
    const box = boxRef.current;
    if (!box) return;
    box.style.transition = "transform 1s";
    box.style.transform = "translateX(200px)";
    setTimeout(() => {
      box.style.transform = "translateX(0)";
    }, 1000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Страница 2: Анимация</h1>
      <div
        ref={boxRef}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "red",
          marginBottom: 20,
        }}
      />
      <button onClick={startAnimation}>Воспроизвести анимацию</button>
      <button onClick={() => navigate("/page3")} style={{ marginLeft: 10 }}>
        Следующая страница
      </button>
    </div>
  );
}

export default Page2_Animation;
