import React, { useState } from "react";
import "./Main.css";
import Select from "react-select";
import {
  cardStyleOptions,
  optionsHobbies,
  optionsPerson,
  ageOptions,
  optionsGreetingSubject,
} from "../../data/options";

export const Main = () => {
  const [greeting, setGreeting] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedAge, setSelectedAge] = useState(null);
  const [greetingSubject, setGreetingSubject] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState("");
  const [appearanceDescription, setAppearanceDescription] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [cardStyle, setCardStyle] = useState("");
  const [greetingText, setGreetingText] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const genderOptions = ["Чоловік", "Жінка", "Інше"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("person", selectedPerson);
    formData.append("gender", selectedGender);
    formData.append("age", selectedAge?.label || "");
    formData.append("greetingSubject", greetingSubject);
    formData.append("hobbies", selectedHobbies);
    formData.append("appearanceDescription", appearanceDescription);
    formData.append("cardStyle", cardStyle);
    formData.append("greetingText", greetingText);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const response = await fetch("https://hook.eu2.make.com/atg7qiaxvlwxi5uls9483gpi7uuj439p", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Привітання надіслано успішно!");
        handleReset();
      } else {
        alert("Помилка при надсиланні. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Щось пішло не так. Спробуйте пізніше.");
    }
  };

  const handleReset = () => {
    setGreeting("");
    setSelectedPerson("");
    setSelectedAge(null);
    setGreetingSubject("");
    setSelectedHobbies("");
    setAppearanceDescription("");
    setPhotoFile(null);
    setCardStyle("");
    setGreetingText("");
    setSelectedGender("");
  };

  const handleOptionClick = (option, type) => {
    if (type === "person") setSelectedPerson(option);
    if (type === "subject") setGreetingSubject(option);
    if (type === "hobby") setSelectedHobbies(option);
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleCardStyleClick = (style) => {
    setCardStyle(style);
  };

  const handleShowGreetingIdeas = () => {
    alert(
      `Ідеї для тексту привітання:\n\n- В 30 років все тільки починається! Продовжуй рухатися до мети!\n- Бажаю здоров'я, щастя і нових звершень!\n- Нехай кожен день приносить радість і успіх!`
    );
  };

  return (
    <div className="container">
      <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <h1>Створи привітання разом з Gifta</h1>
        <form onSubmit={handleSubmit}>
          <h2>Кого вітаємо?</h2>
          <div id="optionsPerson">
            {optionsPerson.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionClick(option, "person")}
                aria-pressed={selectedPerson === option}
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Свій варіант"
              name="custom_person"
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
            />
          </div>

          <h2>Оберіть стать</h2>
          <div id="optionsGender" style={{ marginBottom: "10px" }}>
            {genderOptions.map((gender) => (
              <button
                type="button"
                key={gender}
                onClick={() => setSelectedGender(gender)}
                aria-pressed={selectedGender === gender}
                style={{
                  marginRight: "5px",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  backgroundColor: selectedGender === gender ? "#ccc" : "transparent",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {gender}
              </button>
            ))}
          </div>

          <h2>Вік</h2>
          <Select
            options={ageOptions}
            value={selectedAge}
            onChange={(option) => setSelectedAge(option)}
            placeholder="Оберіть вік"
            isClearable
          />

          <h2>З чим вітаємо?</h2>
          <div>
            {optionsGreetingSubject.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionClick(option, "subject")}
                aria-pressed={greetingSubject === option}
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Свій варіант"
              name="custom_subject"
              value={greetingSubject}
              onChange={(e) => setGreetingSubject(e.target.value)}
            />
          </div>

          <h2>Хобі та захоплення</h2>
          <div>
            {optionsHobbies.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionClick(option, "hobby")}
                aria-pressed={selectedHobbies === option}
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Свій варіант"
              name="custom_hobby"
              value={selectedHobbies}
              onChange={(e) => setSelectedHobbies(e.target.value)}
            />
          </div>

          <h2>Опис зовнішності</h2>
          <input
            type="text"
            placeholder="наприклад: підтягнутий як на свій вік, має гарний козацький ніс та коротку зачіску"
            value={appearanceDescription}
            onChange={(e) => setAppearanceDescription(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
          <div>
            Або <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoFile && <p>Обрано файл: {photoFile.name}</p>}
          </div>

          <h2>Стиль листівки</h2>
          <div>
            {cardStyleOptions.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => handleCardStyleClick(style)}
                style={{
                  margin: "5px 5px 5px 0",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  backgroundColor: cardStyle === style ? "#ccc" : "transparent",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                aria-pressed={cardStyle === style}
              >
                {style}
              </button>
            ))}
          </div>

          <h2>Текст привітання</h2>
          <input
            type="text"
            placeholder="наприклад: В 30 років все тільки починається! Продовжуй рухатися до мети та бути надійною під..."
            value={greetingText}
            onChange={(e) => setGreetingText(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
          <div>
            Або{" "}
            <button type="button" onClick={handleShowGreetingIdeas}>
              Переглянути ідеї тексту
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <button type="submit" style={{ marginRight: 10 }}>
              Надіслати
            </button>
            <button type="button" onClick={handleReset}>
              Очистити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
