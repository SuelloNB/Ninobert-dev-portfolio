import { certficateData } from "../data/certificateData";

export function loadSkills(){
    const container = document.querySelector(".certificate__container");
  
    container.innerHTML = certficateData.map((certificateData   , index) => `
      <div class="certificate-card" style="transition-delay:${index * 0.1}s">
        
        <div class="certificate-card-img">
          <img src="${skill.image}" alt="${skill.title}">
        </div>
  
        <div class="certificate-card-overlay">
          <div class="certificate-card-content">
  
            <div class="certificate-card-title">
              <h2>${skill.title}</h2>
            </div>
  
  
            <div class="certificate-card-details">
              <div class="certificate-card-divider"></div>
              <ul class="certificate-card-list">
                ${skill.items.map(certficateData => `<li>${certficateData}</li>`).join("")}
              </ul>
            </div>
  
          </div>
        </div>
  
      </div>
    `).join("");
  }