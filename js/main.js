// Carusel Js
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const totalSlides = slides.length;

function updateSlide() {
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Avtomatik slayder (har 3 soniyada)
setInterval(nextSlide, 3000);

// search
let cachedProducts = [];

async function fetchProducts() {
  if (cachedProducts.length > 0) return cachedProducts; // Avval yuklangan ma'lumotlardan foydalanish
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    cachedProducts = products.map((product) => ({
      id: product.id,
      name: product.title,
      category: product.category,
      price: `${product.price} so'm`,
      image: product.image,
    }));
    return cachedProducts;
  } catch (error) {
    console.error("Mahsulotlarni yuklashda xatolik:", error);
    return [];
  }
}

async function searchProducts(query) {
  const products = await fetchProducts();
  const lowerCaseQuery = query.toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(lowerCaseQuery)
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts(); // Dastlab barcha mahsulotlarni yuklash

  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  input.addEventListener("input", async () => {
    const results = await searchProducts(input.value);
    resultsContainer.innerHTML = results
      .map(
        (product) => `
            <div class="section-avto-jihoz-card">
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <h4>${product.price}</h4>
                <h5>242 000 so'm x 12oy</h5>
                <div class="section-avto-jihoz-card-btn">
                    <div class="korzinka">
                        <img src="./images/home/korzinka.svg" alt="" />
                    </div>
                    <div>
                        <button>Muddatli to'lov</button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  });
});
