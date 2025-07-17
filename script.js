// ========== ДАННЫЕ ТОВАРОВ ========== //
const data = {
  male: {
    "Кроссовки": [
      { 
        name: "Nike Pegasus 37", 
        image: "images/nike_pegasus.jpg",
        sizes: ["RU 42", "RU 43", "RU 44", "RU 45"],
        description: "Беговые кроссовки с воздушной подушкой Zoom Air для максимального комфорта."
      },
      { 
        name: "Adidas Ultraboost", 
        image: "images/adidas_ultraboost.jpg",
        sizes: ["RU 41", "RU 42", "RU 43"],
        description: "Инновационные кроссовки с технологией Boost для энергии при каждом шаге."
      }
    ],
    "Куртки": [
      {
        name: "The North Face",
        image: "images/tnf_jacket.jpg",
        sizes: ["S", "M", "L", "XL"],
        description: "Тёплая ветрозащитная куртка для активного отдыха."
      }
    ]
  },
  female: {
    "Кроссовки": [
      {
        name: "Adidas NMD",
        image: "images/adidas_nmd.jpg",
        sizes: ["RU 36", "RU 37", "RU 38"],
        description: "Стильные кроссовки с технологией Boost для повседневной носки."
      },
      {
        name: "Nike Air Max",
        image: "images/nike_airmax.jpg",
        sizes: ["RU 37", "RU 38", "RU 39"],
        description: "Культовая модель с видимой воздушной подушкой."
      }
    ],
    "Куртки": [
      {
        name: "ZARA Parka",
        image: "images/zara_parka.jpg",
        sizes: ["XS", "S", "M"],
        description: "Лёгкая парка с капюшоном и стильным кроем."
      }
    ]
  }
};

// ========== ГЛАВНАЯ СТРАНИЦА (index.html) ========== //
// Выбор пола
function selectGender(gender) {
  localStorage.setItem("gender", gender);
  window.location.href = "category.html";
}

// Рандомный товар
function showRandomProduct() {
  const genders = ["male", "female"];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const categories = Object.keys(data[randomGender]);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const products = data[randomGender][randomCategory];
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  localStorage.setItem("gender", randomGender);
  localStorage.setItem("category", randomCategory);
  localStorage.setItem("product", JSON.stringify(randomProduct));
  window.location.href = "product.html";
}

// ========== СТРАНИЦА КАТЕГОРИЙ (category.html) ========== //
if (window.location.pathname.includes("category.html")) {
  const gender = localStorage.getItem("gender");
  const title = document.getElementById("category-title");
  const categoriesContainer = document.getElementById("categories");

  // Динамически меняем цвет фона
  document.body.className = gender === "male" ? "male-theme" : "female-theme";
  title.textContent = `Выберите категорию (${gender === "male" ? "Мужской" : "Женский"})`;

  // Загружаем категории
  Object.keys(data[gender]).forEach(category => {
    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = category;
    button.onclick = () => {
      localStorage.setItem("category", category);
      window.location.href = "models.html";
    };
    categoriesContainer.appendChild(button);
  });
}

// ========== СТРАНИЦА МОДЕЛЕЙ (models.html) ========== //
if (window.location.pathname.includes("models.html")) {
  const gender = localStorage.getItem("gender");
  const category = localStorage.getItem("category");
  const title = document.getElementById("models-title");
  const modelsContainer = document.getElementById("models");

  document.body.className = gender === "male" ? "male-theme" : "female-theme";
  title.textContent = `${category} (${gender === "male" ? "Мужские" : "Женские"})`;

  // Создаём карточки товаров
  data[gender][category].forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
    `;
    card.onclick = () => {
      localStorage.setItem("product", JSON.stringify(product));
      window.location.href = "product.html";
    };
    modelsContainer.appendChild(card);
  });
}

// ========== СТРАНИЦА ТОВАРА (product.html) ========== //
if (window.location.pathname.includes("product.html")) {
  const product = JSON.parse(localStorage.getItem("product"));
  const gender = localStorage.getItem("gender");

  document.body.className = gender === "male" ? "male-theme" : "female-theme";
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;

  // Добавляем размеры
  const sizesContainer = document.getElementById("product-sizes");
  product.sizes.forEach(size => {
    const sizeBtn = document.createElement("button");
    sizeBtn.className = "size-btn";
    sizeBtn.textContent = size;
    sizesContainer.appendChild(sizeBtn);
  });
}

// Для главной страницы
if (window.location.pathname.endsWith("index.html")) {
  // Можно добавить анимации или другие эффекты
  console.log("Добро пожаловать в МАЛЕНЬКИЙ МУК!");
}

// Для страницы категорий (category.html) и остальных — оставляем предыдущую логику 