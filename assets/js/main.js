import { initProjects } from "../js/pages/projects.js";
// import { initContactForm } from "./contact.js";
import { loadSkills } from "../js/pages/skill.js";


//Skill Function
document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  initCinematicScroll();
  initSmoothNavigation();
  initActiveNavHighlight();
  initNavbarScrollEffect();
  initProjects();
});

//Scroll Animation
function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

/* =========================
   CINEMATIC SCROLL SYSTEM
========================= */
function initCinematicScroll() {
  const elements = document.querySelectorAll(`
    .hero,
    .info,
    .experience,
    .skill-card,
    .projects,
    .certificate-section,
    .education-section
  `);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* =========================
   SMOOTH NAVIGATION
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
   ACTIVE NAV HIGHLIGHT
========================= */
function initActiveNavHighlight() {

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

      }

    });

  }, {
    threshold: 0.55
  });

  sections.forEach(section => observer.observe(section));

}

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
function initNavbarScrollEffect() {

  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });

}

/* =========================
   BOOTSTRAP (FIXED)
========================= */
onReady(() => {

  initCinematicScroll();
  initSmoothNavigation();
  initActiveNavHighlight();
  initNavbarScrollEffect();

});

//Project Function
document.addEventListener("DOMContentLoaded", ()=>{
  initProjects();
});