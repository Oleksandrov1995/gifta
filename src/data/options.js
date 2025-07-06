export const optionsPerson = [
  { label: "Друг", gender: "Чоловік" },
  { label: "Кум", gender: "Чоловік" },
  { label: "Сусід", gender: "Чоловік" },
  { label: "Брат", gender: "Чоловік" },
  { label: "Колега", gender: "Чоловік" },
  { label: "Партнер", gender: "Чоловік" },
  { label: "Побратим", gender: "Чоловік" },
  { label: "Керівник", gender: "Чоловік" },
  { label: "Дідусь", gender: "Чоловік" },
  { label: "Коханий", gender: "Чоловік" },
  { label: "Тато", gender: "Чоловік" },
  { label: "Дядько", gender: "Чоловік" },
  { label: "Син", gender: "Чоловік" },
  { label: "Онук", gender: "Чоловік" },
  { label: "Племінник", gender: "Чоловік" },

  { label: "Подруга", gender: "Жінка" },
  { label: "Кума", gender: "Жінка" },
  { label: "Сестра", gender: "Жінка" },
  { label: "Колега", gender: "Жінка" },
  { label: "Партнер", gender: "Жінка" },
  { label: "Керівник", gender: "Жінка" },
  { label: "Бабуся", gender: "Жінка" },
  { label: "Кохана", gender: "Жінка" },
  { label: "Мама", gender: "Жінка" },
  { label: "Тьотя", gender: "Жінка" },
  { label: "Дочка", gender: "Жінка" },
  { label: "Онучка", gender: "Жінка" },
  { label: "Племінниця", gender: "Жінка" },
];

export const ageOptions = Array.from({ length: 101 }, (_, i) => ({
  value: i,
  label: i === 1 ? "1 рік" : `${i} років`,
})).filter((opt) => opt.value > 0);

export const optionsGreetingSubject = [
  "День народження",
  "Річниця",
  "День ангела",
  "Весілля",
  "Підвищення",
  "Покупка",
  "Професійне свято",
  "Календарне свято",
  "Мемний день",
];

export const optionsHobbies = [
  "Автомобілі",
  "Садівництво",
  "Риболовля",
  "Кулінарія",
  "Домашні улюбленці",
  "Родина",
  "Мотоцикли",
  "Спорт",
  "Танці",
  "Музика",
  "Фото",
  "IT",
  "Відео-ігри",
  "Домашня майстерня",
  "Вишивка",
  "Мода та стиль",
];

export const cardStyleOptions = [
  "Мультяшний",
  "Діловий",
  "Техно",
  "В стилі картини",
];

