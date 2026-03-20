// Constants
const THEME = "theme";
const LIGHT = "light";
const DARK = "dark";

// Initial color scheme (leave empty to follow system)
const initialColorScheme = "";

function getPreferTheme() {
  // User's explicit choice from localStorage
  const currentTheme = localStorage.getItem(THEME);
  if (currentTheme) return currentTheme;

  // Site default if set
  if (initialColorScheme) return initialColorScheme;

  // Fallback to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
}

let themeValue = window.theme?.themeValue ?? getPreferTheme();

function setPreference() {
  localStorage.setItem(THEME, themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild?.setAttribute("data-theme", themeValue);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  const body = document.body;
  if (body) {
    const bgColor = window.getComputedStyle(body).backgroundColor;
    document.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
  }
}

// Update the global theme API
if (window.theme) {
  window.theme.setPreference = setPreference;
  window.theme.reflectPreference = reflectPreference;
} else {
  window.theme = {
    themeValue,
    setPreference,
    reflectPreference,
    getTheme: () => themeValue,
    setTheme: (val) => { themeValue = val; },
  };
}

// Ensure theme is reflected immediately
reflectPreference();

function setThemeFeature() {
  reflectPreference();

  const btn = document.querySelector("#theme-btn");
  if (!btn) return;

  const handleClick = () => {
    // Toggle theme
    themeValue = themeValue === LIGHT ? DARK : LIGHT;
    window.theme?.setTheme(themeValue);
    setPreference();

    // Add rotation class
    btn.classList.add("rotate");
    setTimeout(() => btn.classList.remove("rotate"), 300);
  };

  btn.removeEventListener("click", handleClick);
  btn.addEventListener("click", handleClick);
}

// Initialize after page load
setThemeFeature();

// Re‑attach on view transitions
document.addEventListener("astro:after-swap", setThemeFeature);

// Preserve theme color during page transition
document.addEventListener("astro:before-swap", (event) => {
  const bgColor = document.querySelector("meta[name='theme-color']")?.getAttribute("content");
  if (bgColor) {
    event.newDocument.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
  }
});

// Listen to system preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
  themeValue = matches ? DARK : LIGHT;
  window.theme?.setTheme(themeValue);
  setPreference();
});
