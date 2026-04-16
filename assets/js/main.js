import { initProjects } from "../js/pages/projects.js";
import { initContactForm } from "../js/pages/contact.js";
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
  initSkillObserver();
  initSkillBarAnimation();
  initContactForm();
  initFooterReveal();
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
    .experience-card,
    .skill-section,
    .projects,
    .projects__viewer,
    .certificate-title,
    .certificate-card,
    .education-section,
    .education-card,
    .about-section,
    .about-container,
    .about-bottom
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
   ACTIVE NAV - REFINED
========================= */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]"); // Only targets sections with IDs
  const links = document.querySelectorAll(".navbar a");

  const observerOptions = {
    // This margin ensures the 'active' state switches when the section 
    // is roughly in the middle of the screen.
    rootMargin: "-10% 0px -70% 0px", 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        // Remove active from all
        links.forEach(link => link.classList.remove("active"));
        
        // Add active to the current visible section link
        const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

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


/*===========================
  SKILLBAR ANIMATION
============================*/
function initSkillBarAnimation() {
  // Target the section that contains the skills
  const aboutSection = document.querySelector(".about-bottom");

  if (!aboutSection) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Find all fills within this section
      const bars = entry.target.querySelectorAll(".progress-fill");

      bars.forEach((bar, index) => {
        const value = bar.getAttribute("data-value");
        
        // Staggered grow effect
        setTimeout(() => {
          bar.style.width = value + "%";
          
          // Optional: if you want to animate the number counting up,
          // you would add that logic here.
        }, index * 150); 
      });

      obs.unobserve(entry.target); // Disable after running once
    });
  }, { threshold: 0.3 }); // Triggers when 30% of the section is visible

  observer.observe(aboutSection);
}

/*======================
  Navbar Logic
=======================*/
const navToggle = document.getElementById("navToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar ul li");

if (navToggle && navbar) {
    // Assign index for staggered animation
    navLinks.forEach((li, index) => {
        li.style.setProperty('--i', index + 1);
    });

    navToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        navToggle.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            navToggle.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
}

/*======================
  Footer Animation
=======================*/
function initFooterReveal() {
  const footer = document.querySelector(".footer");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  if (footer) observer.observe(footer);
}

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

// Check for saved user preference, else use system preference
const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.classList.add('light-mode');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save preference to local storage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        localStorage.setItem('portfolio-theme', 'dark');
    }
});