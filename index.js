// Welcome Overlay logic

document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById("welcome-overlay");
  const continueBtn = document.getElementById("continue-btn");
  const funFact = document.getElementById("fun-fact");
  // Fun facts array
  const facts = [
    "I love building beautiful, accessible web apps!",
    "Fun fact: I can solve a Rubik's cube in under a minute.",
    "I enjoy hiking and exploring new places.",
    "I design with both code and creativity.",
    "I believe every pixel matters!",
    "I’m passionate about learning new tech."
  ];
  let factIndex = 0;
  function animateFact() {
    if (!funFact) return;
    let text = facts[factIndex];
    let i = 0;
    funFact.textContent = "";
    function type() {
      if (i < text.length) {
        funFact.textContent += text.charAt(i);
        i++;
        setTimeout(type, 35);
      } else {
        setTimeout(() => {
          factIndex = (factIndex + 1) % facts.length;
          animateFact();
        }, 2200);
      }
    }
    type();
  }
  if (funFact) animateFact();

  if (overlay && continueBtn) {
    // Trap focus for accessibility
    continueBtn.focus();
    continueBtn.addEventListener("click", function() {
      overlay.classList.add("hide");
      setTimeout(() => overlay.style.display = "none", 400);
    });
    // Allow Enter key to continue
    overlay.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        continueBtn.click();
      }
    });
  }
});

// Typing animation
const typedText = document.getElementById("typed-text");
const textArray = ["Web Developer", "Designer", "Problem Solver", "Frontend Developer"];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textIndex].length) {
    typedText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, 500);
  }
}
document.addEventListener("DOMContentLoaded", type);

// Dark mode toggle with persistence
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "light";

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Back to top button
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Contact form validation
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Name check
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    valid = false;
  } else {
    showError(nameInput, "");
  }

  // Email check
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email");
    valid = false;
  } else {
    showError(emailInput, "");
  }

  // Message check
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must be at least 10 characters");
    valid = false;
  } else {
    showError(messageInput, "");
  }

  if (valid) {
    formStatus.textContent = "Message sent successfully! ✅";
    formStatus.style.color = "green";
    form.reset();
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  } else {
    formStatus.textContent = "Please fix the errors above ❌";
    formStatus.style.color = "red";
  }
});

function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


