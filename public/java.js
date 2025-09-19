const chatBox = document.getElementById("answer");
    const userInputField = document.getElementById("question");
    const sendBtn = document.getElementById("iaButton");

sendBtn.addEventListener("click", async () => {
  const userInput = userInputField.value.trim();
  if (!userInput) return;

  // Mostrar mensaje del usuario
  chatBox.innerHTML += `<p class="user">🧑‍💬 ${userInput}</p>`;
  userInputField.value = "";

  // 🔹 Agregar mensaje de "pensando..."
  const thinkingMsg = document.createElement("p");
  thinkingMsg.classList.add("bot");
  thinkingMsg.textContent = "🤖 Pensando...";
  chatBox.appendChild(thinkingMsg);

  try {
    const res = await fetch(`${window.location.origin}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput })
    });
    const data = await res.json();

    // Quitar el mensaje de pensando
    thinkingMsg.remove();

    if (data.error) {
      chatBox.innerHTML += `<p class="bot">⚠️ ${data.error}</p>`;
    } else {
      chatBox.innerHTML += `<p class="bot">${data.answer}</p>`;
    }

  } catch (err) {
    thinkingMsg.remove();
    chatBox.innerHTML += `<p class="bot">⚠️ Error de conexión con el servidor.</p>`;
    console.error(err);
  }
});

/* elementos del DOM (existirán si el script está al final del body) */
const track = document.querySelector('.carousel-track');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

let slides = [];            // se actualizará después de cargar productos
let currentIndex = 0;

/* Actualiza la posición del carrusel (seguro si no hay slides) */
function updateCarousel() {
  if (!track) return;
  if (slides.length === 0) {
    track.style.transform = "";
    return;
  }
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

/* Configura los controles (se llaman una sola vez) */
function setupCarouselControls() {
  if (!nextButton || !prevButton) return;

  nextButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    // recalcula posición cuando cambia el ancho de pantalla
    updateCarousel();
  });
}

/* Helper: espera a que todas las imágenes dentro de un contenedor terminen de cargar */
function waitImagesLoaded(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) return Promise.resolve();
  return Promise.all(imgs.map(img => {
    return new Promise(resolve => {
      if (img.complete) return resolve();
      img.addEventListener('load', resolve);
      img.addEventListener('error', resolve);
    });
  }));
}

/* Carga productos desde /api/products y los renderiza */
async function cargarProductos() {
  try {
    const res = await fetch(`${window.location.origin}/api/products`); // si tu servidor está en el mismo host/puerto
    if (!res.ok) throw new Error("Error al pedir productos: " + res.status);
    const productos = await res.json();

    const container = document.querySelector(".carousel-track");
    if (!container) return;

    // vaciamos por si ya había contenido
    container.innerHTML = "";

    productos.forEach(prod => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
      `;
      container.appendChild(div);
    });

    // Esperamos a que las imágenes terminen de cargar (importante para ancho correcto)
    await waitImagesLoaded(container);

    // Recalculamos slides y actualizamos carrusel
    slides = Array.from(track.children);
    if (currentIndex >= slides.length) currentIndex = 0;
    updateCarousel();

  } catch (err) {
    console.error("Error cargando productos:", err);
  }
}

/* Inicialización */
document.addEventListener("DOMContentLoaded", () => {
  setupCarouselControls();
  cargarProductos();
  
  // menú hamburguesa (tu código original)
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  if (hamburger) hamburger.addEventListener('click', () => overlay.classList.toggle('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  if (overlay) overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => overlay.classList.remove('active'));
  });
});