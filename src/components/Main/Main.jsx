import React, { useState } from "react";
import {
  cardStyleOptions,
  optionsHobbies,
  optionsPerson,
  optionsGreetingSubject,
} from "../../data/options";
import "./Main.css";

export const Main = () => {
  const [formData, setFormData] = useState({
    person: "",
    gender: "",
    age: "", // замінив null на порожній рядок
    greetingSubject: "",
    hobbies: [], // масив
    appearanceDescription: "",
    photoFile: null,
    cardStyle: "",
    greetingText: "",
  });

  const [customHobby, setCustomHobby] = useState("");
  const [customCardStyle, setCustomCardStyle] = useState("");
  const [loading, setLoading] = useState(false);

  const genderOptions = ["Чоловік", "Жінка"];
  const filteredOptions = optionsPerson.filter(
    (option) => option.gender === formData.gender
  );

  const handleOptionSelect = (field, value) => {
    if (field === "hobbies") {
      setCustomHobby((prevCustom) => prevCustom); // не чистимо текст одразу

      setFormData((prev) => {
        const alreadySelected = prev.hobbies.includes(value);
        if (alreadySelected) {
          // Прибираємо вибране
          return {
            ...prev,
            hobbies: prev.hobbies.filter((hobby) => hobby !== value),
          };
        } else if (prev.hobbies.length < 4) {
          // Додаємо, якщо менше 4
          return {
            ...prev,
            hobbies: [...prev.hobbies, value],
          };
        } else {
          return prev; // ліміт досягнуто
        }
      });
    } else if (field === "customHobby") {
      const trimmedValue = value.trim();
      setCustomHobby(trimmedValue);

      setFormData((prev) => {
        // Відфільтровуємо попередній текст (той, що не в кнопках)
        const filtered = prev.hobbies.filter((hobby) =>
          optionsHobbies.includes(hobby)
        );
        if (trimmedValue === "") {
          // Якщо поле очищене — залишаємо тільки кнопки
          return { ...prev, hobbies: filtered };
        } else if (filtered.length < 4) {
          // Додаємо/замінюємо свій варіант, якщо ліміт не досягнуто
          return { ...prev, hobbies: [...filtered, trimmedValue] };
        } else {
          // Якщо ліміт досягнуто — не додаємо текст
          return prev;
        }
      });
    } else {
      // Для інших полів просто оновлюємо значення
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({ ...prev, photoFile: e.target.files[0] }));
  };

  const uploadImageToCloudinary = async (file) => {
  const cloudName = "dnma2ioeb"; // 🔁 заміни на свій
  const uploadPreset = "my_unsigned_preset"; // 🔁 заміни на свій

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Не вдалося завантажити фото на Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // ⬅️ URL зображення
};


  const handleReset = () => {
    setFormData({
      person: "",
      gender: "",
      age: "",
      greetingSubject: "",
      hobbies: [],
      appearanceDescription: "",
      photoFile: null,
      cardStyle: "",
      greetingText: "",
    });
    setCustomHobby("");
    setCustomCardStyle("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let uploadedImageUrl = "";

    // Якщо є фото — спочатку завантаж його на Cloudinary
    if (formData.photoFile) {
      uploadedImageUrl = await uploadImageToCloudinary(formData.photoFile);
    }

  const submitData = `Ти — спеціаліст сервісу генерації вітальних листівок. Користувач сервісу заповнює інформацію про отримувача листівки (стать, вік, відношення, подія, хобі, опис зовнішності або фото, стиль, текст привітання).

Твоє завдання — згенерувати зображення листівки на основі цієї інформації. Якщо деяких даних не вистачає — використовуй лише ті, що надані, не вигадуй нічого зайвого.

Інформація від користувача про отримувача листівки:
Стать{${formData.gender}}
Вік ${formData.age}
Кого вітаємо ${formData.person} 
З чим вітаємо${formData.greetingSubject}
Додаткові деталі приводу для привітання якщо користувач їх надасть{}
Хобі, захоплення або рід діяльності${formData.hobbies} 
Додаткові деталі про хобі, захоплення або рід діяльності якщо користувач їх надасть{}
Опис зовнішності або фото отримувача листівки${uploadedImageUrl}
Візуальний стиль${formData.cardStyle}
Текст привітання${formData.appearanceDescription}


Критерії:

Дотримуйся стилю, не використовуй стереотипів, фантазійних або клішованих елементів, якщо вони не зазначені. 

Образ персонажа має бути художнім, але строго відповідати типажу отримувача на фото або в описі.
— Уважно повторюй форму зачіски: напрямок, як лежить волосся, колір волосся. Не малюй зачіску, яка радикально відрізняється за напрямком волосся, кольором або стилем (наприклад, волосся на фото лежить вперед — не зачісуй в боки, і навпаки).
— Відтворюй пропорції статури: якщо на фото кремезна або широка фігура — не малюй худорлявого персонажа, і навпаки.
— Зберігай форму обличчя, зокрема лінії підборіддя і загальний силует обличчя.
— Типаж очей, носа, посмішки має бути наближений до фото, без перебільшень (наприклад, не роби широку посмішку, якщо на фото посмішка спокійна).
— Враховуй одяг і кольори, але не додавай зайвих деталей, яких немає на фото чи в описі.
— Не використовуй гримаси, перебільшені емоції, абстрактні елементи.
— Образ має бути впізнаваним і символічним, щоб людина могла відчути, що це саме вона, але не повинен бути фото-реалістичним.

Фон має відповідати хобі, захопленням або роду діяльності, або доповнювати їх, або бути нейтральним якщо не достатньо їнформації чи це відповідатиме стилю.
- Не використовувати зайвої реалістичності якщо це не задане стилем
- Не використовувати хаотичного повторення символів
- Жінки від 35 років мають виглядати молодшими, а не старшими за свій вік. Уникати зістарених образів якщо про це не йдеться в інформації від користувача (вік 70+, привітання для бабусі)
- Чоловіки 45+ - без явного живота, якщо не вказано.
- Підлітки — без іграшок та мультяшних елементів якщо про це не вказано.
- Не використовувати зайвої реалістичності, якщо не вказано стилем`;

    // Тепер формуємо дані для Make
    // const submitData = new FormData();
    // submitData.append("person", formData.person);
    // submitData.append("gender", formData.gender);
    // submitData.append("age", formData.age);
    // submitData.append("greetingSubject", formData.greetingSubject);
    // submitData.append("hobbies", formData.hobbies.join(", "));
    // submitData.append("appearanceDescription", formData.appearanceDescription);
    // submitData.append("photoUrl", uploadedImageUrl); // ⬅️ тільки URL
    // submitData.append("cardStyle", formData.cardStyle);
    // submitData.append("greetingText", formData.greetingText);
    // submitData.append("promtForAI", promptForAI);
    

    // const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
    //   method: "POST",
    //   body: submitData,
    // });
    const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt: submitData }), // ключ prompt — для Make
});


    const text = await response.text();
    console.log("Відповідь сервера:", text);

    if (text) {
      const imageUrl = text.trim().replace(/^"+|"+$/g, "");
      window.location.href = imageUrl;
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
            <input
              type="number"
              min="0"
              max="115"
              value={formData.age}
              onChange={(e) => handleOptionSelect("age", e.target.value)}
              placeholder="Введіть вік"
            />
            <p>років</p>
          </section>

          <section>
            <h2>Кого вітаємо?</h2>

            {filteredOptions.map((option) => {
              const isActive = formData.person === option.label;
              return (
                <button
                  type="button"
                  key={option.label}
                  onClick={() => handleOptionSelect("person", option.label)}
                  className={isActive ? "active" : ""}
                >
                  {option.label}
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Свій варіант"
              value={
                filteredOptions.some((opt) => opt.label === formData.person)
                  ? ""
                  : formData.person
              }
              onChange={(e) => {
                handleOptionSelect("person", e.target.value);
              }}
            />
          </section>

          <section>
            <h2>З чим вітаємо?</h2>

            {optionsGreetingSubject.map((option) => {
              const isActive = formData.greetingSubject === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleOptionSelect("greetingSubject", option)}
                  className={isActive ? "active" : ""}
                >
                  {option}
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Свій варіант"
              value={
                optionsGreetingSubject.includes(formData.greetingSubject)
                  ? ""
                  : formData.greetingSubject
              }
              onChange={(e) =>
                handleOptionSelect("greetingSubject", e.target.value)
              }
            />
          </section>

          <section>
            <h2>Хобі та захоплення</h2>

            {optionsHobbies.map((option) => {
              const isActive = formData.hobbies.includes(option);
              const isDisabled =
                !isActive && formData.hobbies.length >= 4 && customHobby === "";

              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleOptionSelect("hobbies", option)}
                  className={isActive ? "active" : ""}
                  disabled={isDisabled}
                >
                  {option}
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Свій варіант"
              value={
                formData.hobbies.length > 0 &&
                formData.hobbies.every((hobby) => optionsHobbies.includes(hobby))
                  ? ""
                  : customHobby
              }
              onChange={(e) => handleOptionSelect("customHobby", e.target.value)}
              disabled={formData.hobbies.length >= 4}
            />

            {formData.hobbies.length >= 4 && customHobby === "" && (
              <p className="limit-message">Максимум 4 варіанти</p>
            )}
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
              Або{" "}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              {formData.photoFile && <p>Обрано файл: {formData.photoFile.name}</p>}
            </div>
          </section>

          <section>
            <h2>Стиль листівки</h2>
            {cardStyleOptions.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => {
                  handleOptionSelect("cardStyle", style);
                  setCustomCardStyle("");
                }}
                className={
                  formData.cardStyle === style && customCardStyle === ""
                    ? "active"
                    : ""
                }
              >
                {style}
              </button>
            ))}

            <input
              type="text"
              placeholder="Свій варіант"
              value={customCardStyle}
              onChange={(e) => {
                setCustomCardStyle(e.target.value);
                setFormData((prev) => ({ ...prev, cardStyle: e.target.value }));
              }}
            />
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
