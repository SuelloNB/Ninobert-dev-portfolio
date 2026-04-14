import { initProjects } from "../js/pages/projects.js";
// import { initContactForm } from "./contact.js";
import { loadSkills } from "../js/pages/skill.js";
import { loadCertificate } from "../js/pages/certificate.js";
import { loadAbout } from "../js/pages/about.js";


/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  loadCertificate();
  loadAbout();

  initCinematicScroll();
  initSmoothNavigation();
  initActiveNavHighlight();
  initNavbarScrollEffect();
  initSkillObserver(); // IMPORTANT FIX

  initProjects();
});


/* =========================
   CINEMATIC SCROLL
========================= */
function initCinematicScroll() {
  const elements = document.querySelectorAll(`
    .hero,
    .info,
    .experience,
    .projects,
    .certificate-card,
    .education-section,
    .about-section

  `);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* =========================
   SKILL FIX OBSERVER
========================= */
function initSkillObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".skill-card").forEach(card => {
    observer.observe(card);
  });
}

/* =========================
   SMOOTH SCROLL NAV
========================= */
function initSmoothNavigation() {
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/* =========================
   ACTIVE NAV
========================= */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".navbar a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove("active"));
        document
          .querySelector(`.navbar a[href="#${entry.target.id}"]`)
          ?.classList.add("active");
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => observer.observe(sec));
}

/* =========================
   NAVBAR EFFECT
========================= */
function initNavbarScrollEffect() {
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}
