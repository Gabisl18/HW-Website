// ---------- Mobile nav toggle ----------
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// ---------- Highlight current page in nav ----------
function highlightActiveLink() {
  const links = document.querySelectorAll(".main-nav a");
  const current = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });
}

// ---------- Home page: surf quote generator ----------
const SURF_QUOTES = [
  "The best surfer out there is the one having the most fun.",
  "Only a surfer knows the feeling.",
  "You can't stop the waves, but you can learn to surf.",
  "Surfing soothes me; it's always changing, and I'm always trying to figure it out.",
  "The wave is not a wall, it's a wave. It moves, and so should you.",
  "Every wave is different, just like every day in the water.",
];

function initQuoteGenerator() {
  const btn = document.getElementById("quote-btn");
  const quoteEl = document.getElementById("quote-text");
  if (!btn || !quoteEl) return;

  btn.addEventListener("click", () => {
    const random = SURF_QUOTES[Math.floor(Math.random() * SURF_QUOTES.length)];
    quoteEl.textContent = `"${random}"`;
  });
}

// ---------- Gear page: wetsuit thickness calculator ----------
function suggestWetsuit(tempF) {
  if (tempF >= 75) return { thickness: "No wetsuit needed", detail: "Boardshorts or a swimsuit will do just fine." };
  if (tempF >= 68) return { thickness: "2/2mm - 3/2mm spring suit", detail: "A light spring suit or top will keep you comfortable." };
  if (tempF >= 62) return { thickness: "3/2mm full suit", detail: "A full 3/2mm wetsuit is the sweet spot for these temps." };
  if (tempF >= 55) return { thickness: "4/3mm full suit", detail: "Go with a 4/3mm, and consider boots for longer sessions." };
  if (tempF >= 48) return { thickness: "5/4mm full suit + boots/gloves", detail: "Cold water: add boots, gloves, and maybe a hood." };
  return { thickness: "6/5mm full suit + hood, boots, gloves", detail: "This is serious cold-water territory. Cover up completely." };
}

function initWetsuitTool() {
  const form = document.getElementById("wetsuit-form");
  const input = document.getElementById("water-temp");
  const resultBox = document.getElementById("wetsuit-result");
  if (!form || !input || !resultBox) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const temp = Number(input.value);

    if (Number.isNaN(temp) || input.value.trim() === "") {
      resultBox.textContent = "Please enter a valid water temperature in °F.";
      resultBox.classList.add("show");
      return;
    }

    const suggestion = suggestWetsuit(temp);
    resultBox.innerHTML = `<strong>${suggestion.thickness}</strong><br>${suggestion.detail}`;
    resultBox.classList.add("show");
  });
}

// ---------- Contact page: client-side validation ----------
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const status = document.getElementById("form-status");

  function setError(field, message) {
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = message;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    if (nameField.value.trim().length < 2) {
      setError(nameField, "Please enter your name.");
      valid = false;
    } else {
      setError(nameField, "");
    }

    if (!isValidEmail(emailField.value.trim())) {
      setError(emailField, "Please enter a valid email address.");
      valid = false;
    } else {
      setError(emailField, "");
    }

    if (messageField.value.trim().length < 10) {
      setError(messageField, "Message should be at least 10 characters.");
      valid = false;
    } else {
      setError(messageField, "");
    }

    if (!valid) {
      status.textContent = "Please fix the errors above.";
      status.className = "form-status show";
      return;
    }

    status.textContent = "Thanks! Your message has been received (demo form — no data is actually sent).";
    status.className = "form-status show success";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  highlightActiveLink();
  initQuoteGenerator();
  initWetsuitTool();
  initContactForm();
});
