import { skillsData } from "../data/skillData.js";

export function loadSkills() {
  const container = document.querySelector(".skill-container");

  if (!container) {
    console.error("Skill container not found");
    return;
  }

  container.innerHTML = skillsData.map((skill, index) => `
    <div class="skill-card" style="transition-delay:${index * 0.08}s">

      <div class="skill-card-img">
        <img src="${skill.image}" alt="${skill.title}">
      </div>

      <div class="skill-card-overlay">
        <div class="skill-card-content">

          <h2>${skill.title}</h2>

          <span class="skill-card-tag">${skill.tag}</span>

          <ul>
            ${skill.items.map(item => `<li>${item}</li>`).join("")}
          </ul>

        </div>
      </div>

    </div>
  `).join("");
}