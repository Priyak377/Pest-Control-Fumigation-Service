
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // Header elements
  const themeButton = document.querySelector(
    ".theme-toggle, #themeToggle"
  );

  const directionButton = document.querySelector(
    ".direction-toggle, #directionToggle"
  );

  const menuButton = document.querySelector(
    ".menu-toggle, #mobileMenuToggle"
  );

  const nav = document.querySelector(
    ".main-nav, #mainNav"
  );

  // =========================
  // CURRENT YEAR
  // =========================
  document.querySelectorAll(".current-year, #currentYear")
    .forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

  // =========================
  // DARK / LIGHT MODE
  // =========================
  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("verminex-theme", theme);

    if (themeButton) {
      const icon = themeButton.querySelector("i");

      if (icon) {
        icon.className =
          theme === "dark"
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
      }

      themeButton.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );

      themeButton.setAttribute(
        "aria-pressed",
        String(theme === "dark")
      );
    }
  }

  const savedTheme = localStorage.getItem("verminex-theme");

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const newTheme =
        html.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";

      applyTheme(newTheme);
    });
  }

  // =========================
  // RTL / LTR DIRECTION
  // =========================
  function applyDirection(direction) {
    html.setAttribute("dir", direction);
    localStorage.setItem("verminex-direction", direction);

    if (directionButton) {
      // Show the direction the user can switch to
      directionButton.textContent =
        direction === "rtl" ? "LTR" : "RTL";

      directionButton.setAttribute(
        "aria-label",
        `Switch text direction to ${
          direction === "rtl" ? "LTR" : "RTL"
        }`
      );
    }
  }

  const savedDirection = localStorage.getItem(
    "verminex-direction"
  );

  applyDirection(savedDirection === "rtl" ? "rtl" : "ltr");

  if (directionButton) {
    directionButton.addEventListener("click", () => {
      const newDirection =
        html.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

      applyDirection(newDirection);
    });
  }

  // =========================
  // MOBILE NAVIGATION
  // =========================
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      const icon = menuButton.querySelector("i");

      if (icon) {
        icon.className = isOpen
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
      }
    });

    const dropdown = nav.querySelector(".nav-dropdown");
    const dropdownToggle = nav.querySelector(
      ".nav-dropdown-toggle"
    );

    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener("click", (event) => {
        if (window.innerWidth <= 900) {
          event.preventDefault();
          dropdown.classList.toggle("open");
        }
      });
    }

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth <= 900 &&
          !link.classList.contains("nav-dropdown-toggle")
        ) {
          nav.classList.remove("open");

          menuButton.setAttribute("aria-expanded", "false");

          const icon = menuButton.querySelector("i");

          if (icon) {
            icon.className = "fa-solid fa-bars";
          }
        }
      });
    });
  }

  // Reset mobile navigation on desktop resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && nav && menuButton) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");

      const icon = menuButton.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }

      nav.querySelectorAll(".nav-dropdown.open")
        .forEach((dropdown) => {
          dropdown.classList.remove("open");
        });
    }
  });

  // =========================
  // REVEAL ANIMATIONS
  // =========================
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }
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
