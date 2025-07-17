// Данные (можно заменить на API или localStorage)
const data = {
  male: {
    "Кроссовки": ["Nike Pegasus 37", "Adidas Ultraboost", "Puma RS-X"],
    "Куртки": ["The North Face", "Columbia", "Patagonia"]
  },
  female: {
    "Кроссовки": ["Nike Air Max", "Adidas NMD", "Reebok Classic"],
    "Куртки": ["ZARA", "H&M", "Calvin Klein"]
  }
};

// 1. Выбор пола (index.html)
function selectGender(gender) {
  localStorage.setItem("gender", gender); // Сохраняем выбор
  window.location.href = "category.html"; // Переходим к категориям
}

// 2. Загрузка категорий (category.html)
if (window.location.pathname.includes("category.html")) {
  const gender = localStorage.getItem("gender");
  const title = document.getElementById("category-title");
  const categoriesContainer = document.getElementById("categories");

  title.textContent = `Выберите категорию (${gender === "male" ? "Мужской" : "Женский"})`;

  Object.keys(data[gender]).forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.onclick = () => selectCategory(category);
    categoriesContainer.appendChild(button);
  });
}

function selectCategory(category) {
  localStorage.setItem("category", category);
  window.location.href = "models.html";
}

// 3. Загрузка моделей (models.html)
if (window.location.pathname.includes("models.html")) {
  const gender = localStorage.getItem("gender");
  const category = localStorage.getItem("category");
  const title = document.getElementById("models-title");
  const modelsContainer = document.getElementById("models");

  title.textContent = `${category} (${gender === "male" ? "Мужские" : "Женские"})`;

  data[gender][category].forEach(model => {
    const item = document.createElement("div");
    item.textContent = model;
    modelsContainer.appendChild(item);
  });
}