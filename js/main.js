// Carusel Js
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const totalSlides = slides.length;

// Slayderni yangilash
function updateSlide() {
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;
}

// Keyingi slayd
function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide();
}

// Oldingi slayd
function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
}

// Tugmalar uchun event
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Avtomatik slayd o'tkazish (har 3 soniyada)
setInterval(nextSlide, 3000);

// search
function searchProducts(searchInputId, suggestionBoxId) {
  let searchValue = document.getElementById(searchInputId).value.toLowerCase();
  let products = document.querySelectorAll(".section-avto-jihoz-card");
  let suggestionBox = document.getElementById(suggestionBoxId);

  suggestionBox.innerHTML = ""; // Eski natijalarni tozalash

  if (searchValue === "") {
    suggestionBox.style.display = "none"; // Agar input bo‘sh bo‘lsa, yashirish
    return;
  }

  let hasResults = false;

  products.forEach((product) => {
    let productName = product.getAttribute("data-name").toLowerCase();
    let productPrice = product.getAttribute("data-price");
    let productImage = product.querySelector("img").src;

    if (productName.includes(searchValue)) {
      hasResults = true;

      let suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");

      suggestionItem.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <div class="suggestion-info">
          <p class="suggestion-title">${product.getAttribute("data-name")}</p>
          <p class="suggestion-price">${productPrice} so'm</p>
        </div>
      `;

      suggestionItem.onclick = function () {
        document.getElementById(searchInputId).value =
          product.getAttribute("data-name");
        suggestionBox.style.display = "none";
        highlightProduct(product);
      };

      suggestionBox.appendChild(suggestionItem);
    }
  });

  suggestionBox.style.display = hasResults ? "block" : "none";
}

function highlightProduct(product) {
  product.scrollIntoView({ behavior: "smooth", block: "center" });
  product.style.border = "2px solid #ffbf1f";
  setTimeout(() => {
    product.style.border = "";
  }, 2000);
}

// Desktop uchun eventlar
document
  .getElementById("search-desktop")
  .addEventListener("input", function () {
    searchProducts("search-desktop", "suggestions-desktop");
  });

// Mobil uchun eventlar
document.getElementById("search-mobile").addEventListener("input", function () {
  searchProducts("search-mobile", "suggestions-mobile");
});
