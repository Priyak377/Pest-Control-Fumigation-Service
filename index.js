
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const directionButton = document.querySelector(".direction-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  const savedTheme = (() => {
    try {
      return localStorage.getItem("verminex-theme");
    } catch {
      return null;
    }
  })();

  const savedDirection = (() => {
    try {
      return localStorage.getItem("verminex-direction");
    } catch {
      return null;
    }
  })();

  function setTheme(theme) {
    root.dataset.theme = theme;

    if (themeButton) {
      themeButton.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

      themeButton.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    try {
      localStorage.setItem("verminex-theme", theme);
    } catch {}
  }

  function setDirection(direction) {
    root.setAttribute("dir", direction);

    if (directionButton) {
      directionButton.textContent = direction === "ltr" ? "RTL" : "LTR";

      directionButton.setAttribute(
        "aria-label",
        direction === "rtl"
          ? "Switch to left-to-right"
          : "Switch to right-to-left"
      );
    }

    try {
      localStorage.setItem("verminex-direction", direction);
    } catch {}
  }

  setTheme(savedTheme === "dark" ? "dark" : "light");
  setDirection(savedDirection === "rtl" ? "rtl" : "ltr");

  themeButton?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  directionButton?.addEventListener("click", () => {
    setDirection(root.dir === "rtl" ? "ltr" : "rtl");
  });

  menuButton?.addEventListener("click", () => {
    if (!navigation) return;

    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navigation?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");

      if (menuButton) {
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    const isActive = href?.toLowerCase() === currentPage.toLowerCase();

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const form = document.querySelector(".contact-form");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent =
        "Your details are validated. Connect this form to your email or booking backend to submit your inspection request.";
      status.setAttribute("role", "status");
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
