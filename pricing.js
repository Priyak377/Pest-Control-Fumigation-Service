
/* =========================================
   VERMINEX PRICING PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // -------------------------------------
  // CURRENT YEAR
  // -------------------------------------
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // -------------------------------------
  // RESTORE SAVED THEME
  // -------------------------------------
  const savedTheme = localStorage.getItem("verminex-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    html.setAttribute("data-theme", savedTheme);
  }

  // -------------------------------------
  // LIGHT / DARK MODE
  // -------------------------------------
  const themeToggle =
    document.getElementById("themeToggle") ||
    document.querySelector(".theme-toggle");

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

  themeToggle?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("verminex-theme", nextTheme);

    updateThemeIcon();
  });

  // -------------------------------------
  // RESTORE SAVED TEXT DIRECTION
  // -------------------------------------
  const savedDirection = localStorage.getItem("verminex-direction");

  if (savedDirection === "rtl" || savedDirection === "ltr") {
    html.setAttribute("dir", savedDirection);
  } else if (!html.hasAttribute("dir")) {
    html.setAttribute("dir", "ltr");
  }

  // -------------------------------------
  // LTR / RTL DIRECTION
  // -------------------------------------
  const directionToggle =
    document.getElementById("directionToggle") ||
    document.querySelector(".direction-toggle");

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

  directionToggle?.addEventListener("click", () => {
    const currentDirection = html.getAttribute("dir") || "ltr";
    const nextDirection = currentDirection === "rtl" ? "ltr" : "rtl";

    html.setAttribute("dir", nextDirection);
    localStorage.setItem("verminex-direction", nextDirection);

    updateDirectionLabel();
  });

  // -------------------------------------
  // MOBILE NAVIGATION
  // -------------------------------------
  const mobileMenuToggle =
    document.getElementById("mobileMenuToggle") ||
    document.querySelector(".menu-toggle");

  const mainNav =
    document.getElementById("mainNav") ||
    document.querySelector(".main-nav");

  const homeDropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  function closeMobileMenu() {
    mainNav?.classList.remove("nav-open", "open");
    homeDropdown?.classList.remove("open");

    if (mobileMenuToggle) {
      const icon = mobileMenuToggle.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }

      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }

    dropdownToggle?.setAttribute("aria-expanded", "false");
  }

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.setAttribute("aria-expanded", "false");

    mobileMenuToggle.addEventListener("click", () => {
      const isOpen = !(
        mainNav.classList.contains("nav-open") ||
        mainNav.classList.contains("open")
      );

      mainNav.classList.toggle("nav-open", isOpen);
      mainNav.classList.toggle("open", isOpen);

      const icon = mobileMenuToggle.querySelector("i");

      if (icon) {
        icon.className = isOpen
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
      }

      mobileMenuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }

  // Home dropdown on mobile
  if (dropdownToggle && homeDropdown) {
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

  // Close menu after selecting a navigation link
  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1000px)").matches) {
        closeMobileMenu();
      }
    });
  });

  // Reset mobile menu on desktop resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMobileMenu();
    }
  });

  // -------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // -------------------------------------
  const revealElements = document.querySelectorAll(
    ".pricing-plans .section-heading, " +
    ".price-card, " +
    ".treatment-copy, " +
    ".treatment-card, " +
    ".included-item"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 4) * 80}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // -------------------------------------
  // SMOOTH SCROLL FOR PAGE ANCHORS
  // -------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      let target;

      try {
        target = document.querySelector(targetId);
      } catch {
        return;
      }

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });
    });
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
