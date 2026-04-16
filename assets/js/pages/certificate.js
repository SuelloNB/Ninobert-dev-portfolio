import { certificateData } from "../data/certificateData.js";

export function loadCertificate() {
  const container = document.querySelector(".certificate-container");
  const section = document.querySelector(".certificate-section");
  if (!container) return;

  // 1. Build Cards
  container.innerHTML = certificateData.map((cert, i) => `
    <div class="certificate-card" data-index="${i}">
      <div class="certificate-img">
        <img src="${cert.image}" alt="${cert.title}">
      </div>
      <div class="certificate-overlay">
        <span class="certificate-card-tag">${cert.tag}</span>
        <h2 class="certificate-title-text">${cert.title}</h2>
        <p class="certificate-date">${cert.date}</p>
        <div class="certificate-description"><p>${cert.description}</p></div>
        <a class="certificate-btn" href="${cert.file}" target="_blank">Verify PDF</a>
      </div>
    </div>
  `).join("");

  // 2. Build Indicators (Ensure they are appended to the SECTION, not the container)
  const controls = document.createElement("div");
  controls.className = "cert-controls";
  controls.innerHTML = `
    <div class="cert-indicators">
      ${certificateData.map((_, i) => `<div class="indicator-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
    </div>
    <p class="swipe-hint">← Swipe Left or Right →</p>
  `;
  section.appendChild(controls);

  let currentIndex = 0;
  let startX = 0;

  const updateSlider = () => {
    if (window.innerWidth < 1024) {
      const cards = document.querySelectorAll(".certificate-card");
      const cardWidth = cards[0].offsetWidth;
      const gap = 24; // 1.5rem
      
      // Offset calculation to keep the focused card centered
      const offset = currentIndex * (cardWidth + gap);
      container.style.transform = `translateX(-${offset}px)`;

      cards.forEach((card, i) => {
        card.classList.toggle("is-focused", i === currentIndex);
        // Automatically close description if we move away from the card
        if (i !== currentIndex) card.classList.remove("is-active");
      });

      document.querySelectorAll(".indicator-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  };

  // 3. Tap & Interaction Logic
  container.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        const index = parseInt(card.dataset.index);
        
        // If user taps a card that isn't focused, move to it
        if (index !== currentIndex) {
          currentIndex = index;
          updateSlider();
          return;
        }

        // If user taps the focused card, toggle description
        e.stopPropagation();
        card.classList.toggle("is-active");
      }
    });
  });

  // Tap anywhere else to close
  document.addEventListener("click", () => {
    container.querySelectorAll(".certificate-card").forEach(c => c.classList.remove("is-active"));
  });

  // 4. Swipe Handling with Looping
  container.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  container.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % certificateData.length;
      } else {
        currentIndex = (currentIndex - 1 + certificateData.length) % certificateData.length;
      }
      updateSlider();
    }
  });

  // Initialize
  updateSlider();
  window.addEventListener("resize", updateSlider);
}