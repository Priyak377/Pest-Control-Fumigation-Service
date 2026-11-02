
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (link.closest(".nav-dropdown") &&
            window.innerWidth <= 900) {
          return;
        }

        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // HOME DROPDOWN
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", event => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        dropdown.classList.toggle("open");
      }
    });

    document.addEventListener("click", event => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  // DARK / LIGHT THEME
  const themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );

      themeToggle.setAttribute(
        "title",
        theme === "dark" ? "Light Mode" : "Dark Mode"
      );
    }

    try {
      localStorage.setItem("verminex-theme", theme);
    } catch {}
  }

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("verminex-theme");
  } catch {}

  applyTheme(
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : html.getAttribute("data-theme") || "light"
  );

  themeToggle?.addEventListener("click", () => {
    applyTheme(
      html.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
  });

  // LTR / RTL DIRECTION
  const directionToggle = document.querySelector(".direction-toggle");

  function applyDirection(direction) {
    html.setAttribute("dir", direction);

    if (directionToggle) {
      directionToggle.textContent = direction === "ltr" ? "RTL" : "LTR";

      directionToggle.setAttribute(
        "aria-label",
        direction === "ltr"
          ? "Switch to right-to-left direction"
          : "Switch to left-to-right direction"
      );
    }

    try {
      localStorage.setItem("verminex-direction", direction);
    } catch {}
  }

  let savedDirection = null;

  try {
    savedDirection = localStorage.getItem("verminex-direction");
  } catch {}

  applyDirection(
    savedDirection === "rtl" || savedDirection === "ltr"
      ? savedDirection
      : html.getAttribute("dir") || "ltr"
  );

  directionToggle?.addEventListener("click", () => {
    applyDirection(
      html.getAttribute("dir") === "rtl" ? "ltr" : "rtl"
    );
  });

  // ACTIVE NAVIGATION LINK
  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    const linkPage = href?.split("/").pop().toLowerCase();
    const isActive = linkPage === currentPage;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // FOOTER YEAR
  document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // SCROLL REVEAL ANIMATIONS
  const revealSelectors = [
    ".story-visual",
    ".story-copy",
    ".section-heading",
    ".value-card",
    ".process-copy",
    ".process-item",
    ".cta-content",
    ".footer-about",
    ".footer-column"
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.classList.add("reveal");
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 3) * 80}ms`;
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // RESET MOBILE MENU ON DESKTOP RESIZE
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      mainNav?.classList.remove("active");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");

      if (menuToggle) {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }

      dropdown?.classList.remove("open");
    }
  });
});

/* ========================================
   BOOK INSPECTION POPUP
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("inspectionModal");
  if (!modal) return;

  const openButtons = document.querySelectorAll(".open-inspection-modal");
  const closeButton = modal.querySelector(".inspection-modal-close");
  const overlay = modal.querySelector(".inspection-modal-overlay");
  const form = document.getElementById("inspectionForm");
  const status = document.getElementById("inspectionFormStatus");

  let previousFocus = null;

  function openModal() {
    previousFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const firstField = modal.querySelector("input");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (previousFocus) previousFocus.focus();
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    status.className = "inspection-form-status is-success";
    status.textContent =
      "Your form is valid. Please connect this form to your email or backend to send the inspection request.";

    // No request is sent until a backend or form service is connected.
  });
});
