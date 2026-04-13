import { certificateData } from "../data/certificateData.js";

export function loadCertificate() {
  const container = document.querySelector(".certificate-container");

  if (!container) return;

  container.innerHTML = certificateData.map((cert, index) => `
    <div class="certificate-card reveal" style="transition-delay:${index * 0.08}s">

      <!-- IMAGE -->
      <div class="certificate-img">
        <img src="${cert.image}" alt="${cert.title}">
      </div>

      <!-- OVERLAY CONTENT -->
      <div class="certificate-overlay">

        <!-- ALWAYS VISIBLE -->
        <div class="certificate-header">
          <h2 class="certificate-title-text">${cert.title}</h2>
          <p class="certificate-date">${cert.date}</p>
          <span class="certificate-card-tag">${cert.tag}</span>
        </div>

        <!-- HOVER DESCRIPTION -->
        <div class="certificate-description">
          <p>${cert.description}</p>
        </div>

        <!-- BUTTON -->
        <a class="certificate-btn" href="${cert.file}" target="_blank">
          View Certificate
        </a>

      </div>

    </div>
  `).join("");
}