
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const directionToggle = document.querySelector(".direction-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const homeDropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  // Copyright year
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Restore saved theme
  const savedTheme = localStorage.getItem("verminex-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    html.setAttribute("data-theme", savedTheme);
  }

  // Update theme icon and accessibility label
  function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    const isDark = html.getAttribute("data-theme") === "dark";

    if (icon) {
      icon.className = isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    }

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  updateThemeIcon();

  // Toggle dark/light mode
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", nextTheme);
      localStorage.setItem("verminex-theme", nextTheme);

      updateThemeIcon();
    });
  }

  // Restore saved text direction
  const savedDirection = localStorage.getItem("verminex-direction");

  if (savedDirection === "rtl" || savedDirection === "ltr") {
    html.setAttribute("dir", savedDirection);
  } else if (!html.hasAttribute("dir")) {
    html.setAttribute("dir", "ltr");
  }

  // Update RTL/LTR button label
  function updateDirectionLabel() {
    if (!directionToggle) return;

    const currentDirection = html.getAttribute("dir") || "ltr";
    const nextDirection = currentDirection === "rtl" ? "ltr" : "rtl";

    directionToggle.textContent = nextDirection.toUpperCase();

    directionToggle.setAttribute(
      "aria-label",
      `Switch text direction to ${nextDirection.toUpperCase()}`
    );
  }

  updateDirectionLabel();

  // Toggle RTL/LTR direction
  if (directionToggle) {
    directionToggle.addEventListener("click", () => {
      const currentDirection = html.getAttribute("dir") || "ltr";
      const nextDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      html.setAttribute("dir", nextDirection);
      localStorage.setItem("verminex-direction", nextDirection);

      updateDirectionLabel();
    });
  }

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Home dropdown for mobile and touch screens
  if (dropdownToggle && homeDropdown) {
    dropdownToggle.setAttribute("aria-expanded", "false");

    dropdownToggle.addEventListener("click", (event) => {
      if (window.matchMedia("(max-width: 1000px)").matches) {
        event.preventDefault();

        const isOpen = homeDropdown.classList.toggle("open");

        dropdownToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      }
    });
  }

  // Close mobile menu after selecting a navigation link
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1000px)").matches) {
          mainNav.classList.remove("open");
          homeDropdown?.classList.remove("open");

          menuToggle?.setAttribute("aria-expanded", "false");

          if (menuToggle) {
            menuToggle.innerHTML =
              '<i class="fa-solid fa-bars"></i>';
          }

          dropdownToggle?.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Reset mobile navigation when switching to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      mainNav?.classList.remove("open");
      homeDropdown?.classList.remove("open");

      menuToggle?.setAttribute("aria-expanded", "false");

      if (menuToggle) {
        menuToggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      }

      dropdownToggle?.setAttribute("aria-expanded", "false");
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
