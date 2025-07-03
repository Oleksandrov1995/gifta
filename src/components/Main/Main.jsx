import React, { useState } from "react";
import Select from "react-select";
import {
  cardStyleOptions,
  optionsHobbies,
  optionsPerson,
  ageOptions,
  optionsGreetingSubject,
} from "../../data/options";
import "./Main.css";

export const Main = () => {
  const [formData, setFormData] = useState({
    person: "",
    gender: "",
    age: null,
    greetingSubject: "",
    hobbies: "",
    appearanceDescription: "",
    photoFile: null,
    cardStyle: "",
    greetingText: "",
  });

  const [loading, setLoading] = useState(false);

  const genderOptions = ["Чоловік", "Жінка", "Інше"];

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleOptionSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({ ...prev, photoFile: e.target.files[0] }));
  };

  const handleReset = () => {
    setFormData({
      person: "",
      gender: "",
      age: null,
      greetingSubject: "",
      hobbies: "",
      appearanceDescription: "",
      photoFile: null,
      cardStyle: "",
      greetingText: "",
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const submitData = new FormData();
  submitData.append("person", formData.person);
  // ... додаємо інші поля

  try {
    const response = await fetch(
      "https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c",
      {
        method: "POST",
        body: submitData,
      }
    );

    const text = await response.text();
    console.log("Відповідь сервера:", text);

    if (text) {
      const imageUrl = text.trim().replace(/^"+|"+$/g, "");
      // Переходимо у тому ж вікні
      window.location.href = imageUrl;
      // Після переходу наступні рядки можуть не виконатися,
      // бо сторінка перезавантажиться/перейде
      // Але якщо потрібно — можна викликати alert або reset раніше
      alert("Привітання надіслано успішно!");
      handleReset();
    } else {
      alert("Посилання на зображення не знайдено у відповіді.");
    }
  } catch (error) {
    alert("Сталася помилка: " + error.message);
  } finally {
    setLoading(false);
  }
};



  const showGreetingIdeas = () => {
    alert(
      `Ідеї для тексту привітання:\n\n- В 30 років все тільки починається! Продовжуй рухатися до мети!\n- Бажаю здоров'я, щастя і нових звершень!\n- Нехай кожен день приносить радість і успіх!`
    );
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Створи привітання разом з Gifta</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <h2>Кого вітаємо?</h2>
            {optionsPerson.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionSelect("person", option)}
                className={formData.person === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              placeholder="Свій варіант"
              value={formData.person}
              onChange={handleInputChange("person")}
            />
          </section>

          <section>
            <h2>Оберіть стать</h2>
            {genderOptions.map((gender) => (
              <button
                type="button"
                key={gender}
                onClick={() => handleOptionSelect("gender", gender)}
                className={formData.gender === gender ? "active" : ""}
              >
                {gender}
              </button>
            ))}
          </section>

          <section>
            <h2>Вік</h2>
            <Select
              options={ageOptions}
              value={formData.age}
              onChange={(option) => handleOptionSelect("age", option)}
              placeholder="Оберіть вік"
              isClearable
            />
          </section>

          <section>
            <h2>З чим вітаємо?</h2>
            {optionsGreetingSubject.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionSelect("greetingSubject", option)}
                className={formData.greetingSubject === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              placeholder="Свій варіант"
              value={formData.greetingSubject}
              onChange={handleInputChange("greetingSubject")}
            />
          </section>

          <section>
            <h2>Хобі та захоплення</h2>
            {optionsHobbies.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleOptionSelect("hobbies", option)}
                className={formData.hobbies === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              placeholder="Свій варіант"
              value={formData.hobbies}
              onChange={handleInputChange("hobbies")}
            />
          </section>

          <section>
            <h2>Опис зовнішності</h2>
            <input
              type="text"
              placeholder="напр. підтягнутий, має гарний ніс..."
              value={formData.appearanceDescription}
              onChange={handleInputChange("appearanceDescription")}
            />
            <div>
              Або <input type="file" accept="image/*" onChange={handlePhotoChange} />
              {formData.photoFile && <p>Обрано файл: {formData.photoFile.name}</p>}
            </div>
          </section>

          <section>
            <h2>Стиль листівки</h2>
            {cardStyleOptions.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => handleOptionSelect("cardStyle", style)}
                className={formData.cardStyle === style ? "active" : ""}
              >
                {style}
              </button>
            ))}
          </section>

          <section>
            <h2>Текст привітання</h2>
            <input
              type="text"
              placeholder="Наприклад: В 30 років все тільки починається!"
              value={formData.greetingText}
              onChange={handleInputChange("greetingText")}
            />
            <button type="button" onClick={showGreetingIdeas}>
              Переглянути ідеї тексту
            </button>
          </section>

          <div style={{ marginTop: 20 }}>
            <button type="submit" disabled={loading}>
              {loading ? "Надсилаємо..." : "Надіслати"}
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

