
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // DARK / LIGHT THEME
  const themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.innerHTML =
        theme === "dark"
          ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
          : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
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

  // RTL / LTR DIRECTION
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

  // SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(
    ".service-area-card, .area-service-item"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 3) * 100}ms`;
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  // SMOOTH SCROLLING
  document.querySelectorAll('.areas-page a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

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

  // AREA ENQUIRY FORM
  const enquiryForm = document.getElementById("areaEnquiryForm");
  const formStatus = document.getElementById("areaFormStatus");

  enquiryForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);

    const name = String(formData.get("name") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const pincode = String(formData.get("pincode") || "").trim();
    const pest = String(formData.get("pest") || "").trim();

    const message = [
      "Hello Verminex, I would like to check service availability.",
      "",
      `Name: ${name}`,
      `City: ${city}`,
      `PIN Code: ${pincode}`,
      `Pest Concern: ${pest}`
    ].join("\n");

    // Add your real WhatsApp business number here.
    // India format: country code + number, without + or spaces.
    const businessWhatsAppNumber = "";

    if (!businessWhatsAppNumber) {
      if (formStatus) {
        formStatus.textContent =
          "Your enquiry is ready. Add your business WhatsApp number in this JavaScript file to enable sending.";
      }

      const messageWindow = window.open("", "_blank");

      if (messageWindow) {
        const pre = messageWindow.document.createElement("pre");

        pre.style.cssText =
          "font:16px Arial,sans-serif;white-space:pre-wrap;padding:24px;line-height:1.7;";
        pre.textContent = message;

        messageWindow.document.title = "Verminex Enquiry";
        messageWindow.document.body.appendChild(pre);
      } else if (formStatus) {
        formStatus.textContent =
          "Your browser blocked the new tab. Please allow pop-ups and try again.";
      }

      return;
    }

    const whatsappUrl =
      "https://wa.me/" +
      businessWhatsAppNumber +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (formStatus) {
      formStatus.textContent =
        "Your WhatsApp enquiry is ready. Review the details and send the message in WhatsApp.";
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
