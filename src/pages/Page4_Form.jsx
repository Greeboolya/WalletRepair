import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Page4_Form() {
  const [step, setStep] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const navigate = useNavigate();

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setStep(2);
  };

  const handleChangeWord = (index, value) => {
    const newWords = [...seedWords];
    newWords[index] = value;
    setSeedWords(newWords);
  };

  const toggleSeedLength = () => {
    setSeedWords(seedWords.length === 12 ? Array(24).fill("") : Array(12).fill(""));
  };

  const handleSubmit = () => {
    console.log("Отправка данных:", { selectedIcon, seedWords });
    alert("Данные сохранены!");
    navigate("/page5"); // переход на страницу 5
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Page 4: Ввод данных</h1>

      {step === 1 && (
        <div>
          <p>Выберите иконку:</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((icon) => (
              <button key={icon} onClick={() => handleIconClick(icon)}>
                Иконка {icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <button onClick={toggleSeedLength}>
            Использовать {seedWords.length === 12 ? "24" : "12"} слов
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginTop: 10,
            }}
          >
            {seedWords.map((word, index) => (
              <input
                key={index}
                placeholder={`Слово ${index + 1}`}
                value={word}
                onChange={(e) => handleChangeWord(index, e.target.value)}
                style={{ border: "1px solid black", padding: 5 }}
              />
            ))}
          </div>

          <button onClick={handleSubmit} style={{ marginTop: 20, padding: 5 }}>
            Отправить
          </button>
        </div>
      )}
    </div>
  );
}

export default Page4_Form;
