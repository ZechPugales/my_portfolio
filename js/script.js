// ------------------------------
// Select DOM elements
// ------------------------------
const nav = document.querySelector(".nav"); // Navigation menu container
const navMenu = document.querySelector(".nav-items"); // Navigation items list
const btnToggleNav = document.querySelector(".menu-btn"); // Menu button (menu/close)
const workEls = document.querySelectorAll(".work-box"); // All work/project boxes
const workImgs = document.querySelectorAll(".work-img"); // All work/project images
const mainEl = document.querySelector("main"); // Main page content
const yearEl = document.querySelector(".footer-text span"); // Year element in footer

// ------------------------------
// Function to toggle navigation menu
// ------------------------------
const toggleNav = () => {
  nav.classList.toggle("hidden"); // Show/hide navigation menu

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  // Change menu button text based on menu state
  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // Delay changing text to "close" after the nav transition
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475); // Match CSS transition duration
  }
};

// Event listener to toggle menu on button click
btnToggleNav.addEventListener("click", toggleNav);

// Close menu when a nav link is clicked
navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

// Close menu when pressing Escape key
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// ------------------------------
// Animate work/project elements on scroll
// ------------------------------

// Initially add transform class (hidden/translated) to images
workImgs.forEach((workImg) => workImg.classList.add("transform"));

// IntersectionObserver to trigger animations when elements enter viewport
let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries; // Only observing one element at a time
    const [textbox, picture] = Array.from(entry.target.children); // Destructure children: [text, image]

    if (entry.isIntersecting) {
      picture.classList.remove("transform"); // Animate image in

      // Animate all children of the textbox (text, tech list, links)
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 } // Trigger when 30% of element is visible
);

// Observe each work/project box
workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// ------------------------------
// Theme toggle and persistence
// ------------------------------
const switchThemeEl = document.querySelector('input[type="checkbox"]'); // Theme toggle input
const storedTheme = localStorage.getItem("theme"); // Retrieve stored theme from localStorage

// Set checkbox state based on stored theme (default dark if no stored value)
switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

// Event listener for theme toggle
switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    // Light mode
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    // Dark mode
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// ------------------------------
// Trap tab focus when menu is open
// ------------------------------
const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]'); // Last focusable nav link

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault(); // Prevent tabbing out of menu
    btnToggleNav.focus(); // Focus back on menu button
  }
});

// ------------------------------
// Rotating logos animation
// ------------------------------
const logosWrappers = document.querySelectorAll(".logo-group");

// Helper sleep function
const sleep = (number) => new Promise((res) => setTimeout(res, number));

// Animate logos in each wrapper sequentially
logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children); // Get individual logos
  await sleep(1400 * i); // Stagger start time for each wrapper

  setInterval(() => {
    // Rotate logos: move first to last
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;

    // Animate positions: top, center, bottom
    logos[0].classList.add("hide", "to-top"); // Animate out upwards
    logos[1].classList.remove("hide", "to-top", "to-bottom"); // Center logo
    logos[2].classList.add("hide", "to-bottom"); // Animate out downwards
  }, 5600); // Rotate every 5.6 seconds
});

// ------------------------------
// Set current year in footer
// ------------------------------
yearEl.textContent = new Date().getFullYear();
