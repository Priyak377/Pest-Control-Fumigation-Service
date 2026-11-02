
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. DARK MODE / LIGHT MODE
  ===================================== */

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeIcon) {
      themeIcon.className = theme === "dark"
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    localStorage.setItem("verminex-theme", theme);
  }

  const savedTheme = localStorage.getItem("verminex-theme");
  const initialTheme = savedTheme ||
    document.documentElement.getAttribute("data-theme") ||
    "light";

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });


  /* =====================================
     2. RTL / LTR DIRECTION
  ===================================== */

  const directionToggle = document.querySelector(".direction-toggle");

  function applyDirection(direction) {
    document.documentElement.setAttribute("dir", direction);

    if (directionToggle) {
      directionToggle.innerHTML = direction === "rtl"
        ? 'LTR <span aria-hidden="true"></span>'
        : 'RTL <span aria-hidden="true"></span>';

      directionToggle.setAttribute(
        "aria-label",
        direction === "rtl"
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout"
      );
    }

    localStorage.setItem("verminex-direction", direction);
  }

  const savedDirection = localStorage.getItem("verminex-direction");
  const initialDirection = savedDirection ||
    document.documentElement.getAttribute("dir") ||
    "ltr";

  applyDirection(initialDirection);

  directionToggle?.addEventListener("click", () => {
    const currentDirection =
      document.documentElement.getAttribute("dir");

    applyDirection(currentDirection === "rtl" ? "ltr" : "rtl");
  });


  /* =====================================
     3. BOOK INSPECTION MODAL
  ===================================== */

  const inspectionModal = document.getElementById("inspectionModal");
  const openModalButtons = document.querySelectorAll(
    ".open-inspection-modal"
  );

  const closeModalButton = document.querySelector(
    ".inspection-modal-close"
  );

  const modalOverlay = document.querySelector(
    ".inspection-modal-overlay"
  );

  function openInspectionModal() {
    if (!inspectionModal) return;

    inspectionModal.classList.add("active");
    inspectionModal.classList.add("is-open");
    inspectionModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    const firstInput = inspectionModal.querySelector(
      "input, select, textarea"
    );

    firstInput?.focus();
  }

  function closeInspectionModal() {
    if (!inspectionModal) return;

    inspectionModal.classList.remove("active");
    inspectionModal.classList.remove("is-open");
    inspectionModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  openModalButtons.forEach(button => {
    button.addEventListener("click", openInspectionModal);
  });

  closeModalButton?.addEventListener("click", closeInspectionModal);

  modalOverlay?.addEventListener("click", closeInspectionModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeInspectionModal();
    }
  });


  /* =====================================
     4. INSPECTION FORM
  ===================================== */

  const inspectionForm = document.getElementById("inspectionForm");
  const inspectionStatus = document.getElementById(
    "inspectionFormStatus"
  );

  inspectionForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!inspectionForm.checkValidity()) {
      inspectionForm.reportValidity();
      return;
    }

    const formData = new FormData(inspectionForm);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email") || "Not provided";
    const service = formData.get("service");
    const address = formData.get("address") || "Not provided";
    const message = formData.get("message") || "Not provided";

    const enquiry = `
VERMINEX - INSPECTION REQUEST

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Property Address: ${address}
Additional Details: ${message}
    `.trim();

    localStorage.setItem("verminex-inspection-enquiry", enquiry);

    if (inspectionStatus) {
      inspectionStatus.textContent =
        "Your inspection enquiry has been prepared successfully. This demo does not send it to a business email.";
    }

    inspectionForm.reset();
  });


  /* =====================================
     5. CONTACT FORM
  ===================================== */

  const contactForm = document.getElementById("verminexContactForm");
  const contactResult = document.getElementById("contactFormResult");
  const copyButton = document.getElementById("contactCopyButton");

  let preparedContactEnquiry = "";

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    preparedContactEnquiry = `
VERMINEX - CONTACT ENQUIRY

Name: ${formData.get("name")}
Phone: ${formData.get("phone")}
Email: ${formData.get("email")}
Property Type: ${formData.get("property")}
Pest Concern: ${formData.get("pest")}
Location: ${formData.get("location")}
Message: ${formData.get("message") || "Not provided"}
    `.trim();

    if (contactResult) {
      contactResult.textContent =
        "Your enquiry details are ready. You can copy them below.";
    }

    if (copyButton) {
      copyButton.hidden = false;
    }
  });

  copyButton?.addEventListener("click", async () => {
    if (!preparedContactEnquiry) return;

    try {
      await navigator.clipboard.writeText(preparedContactEnquiry);
      copyButton.textContent = "Copied Successfully!";
    } catch (error) {
      if (contactResult) {
        contactResult.textContent =
          "Unable to copy automatically. Please check your browser permissions.";
      }
    }
  });


  /* =====================================
     6. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(!!isOpen));

    const menuIcon = menuToggle.querySelector("i");

    if (menuIcon) {
      menuIcon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    }
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");

      const menuIcon = menuToggle?.querySelector("i");

      if (menuIcon) {
        menuIcon.className = "fa-solid fa-bars";
      }
    });
  });


  /* =====================================
     7. FOOTER CURRENT YEAR
  ===================================== */

  document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

});
/* VERMINEX THEME TOGGLE */

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  localStorage.setItem("verminex-theme", theme);

  if (themeIcon) {
    themeIcon.className =
      theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("verminex-theme") || "light";

setTheme(savedTheme);

// Toggle theme
themeToggle?.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  setTheme(currentTheme === "dark" ? "light" : "dark");
});