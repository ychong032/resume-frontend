import { incrementVisitorCount } from "./visitorCount.js";

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const menuLinks = menu.children;
const closeButton = document.getElementById("close-button");
const modal = document.getElementById("modal");
const lightModeButton = document.getElementById("light-mode-button");
const lightModeButtonMd = document.getElementById("light-mode-button-md");
const darkModeButton = document.getElementById("dark-mode-button");
const darkModeButtonMd = document.getElementById("dark-mode-button-md");
const htmlElement = document.documentElement;

initDarkModeButtons();
initEventListeners();
populateVisitorCount();

async function populateVisitorCount() {
    let updatedVisitorCount = await incrementVisitorCount();
    const visitorCountElement = document.getElementById("visitor-counter");

    let digits = updatedVisitorCount.toString().split("");
    for (let digit of digits) {
        visitorCountElement.innerHTML += `<span class=\"bg-green-500 dark:bg-green-400 rounded-md p-2 font-mono\">${digit}</span>`;
    }
}

function initDarkModeButtons() {
    lightModeButtonMd.classList.toggle(
        "hidden",
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    darkModeButtonMd.classList.toggle(
        "hidden",
        !lightModeButtonMd.classList.contains("hidden")
    );

    lightModeButton.classList.toggle(
        "hidden",
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    darkModeButton.classList.toggle(
        "hidden",
        !lightModeButton.classList.contains("hidden")
    );
}

function initEventListeners() {
    menuButton.addEventListener("click", toggleMenuDisplay);
    closeButton.addEventListener("click", toggleMenuDisplay);
    for (let link of menuLinks) {
        link.addEventListener("click", toggleMenuDisplay);
    }
    modal.addEventListener("touchstart", toggleMenuDisplay);
    lightModeButton.addEventListener("click", toggleDarkMode);
    lightModeButtonMd.addEventListener("click", toggleDarkMode);
    darkModeButton.addEventListener("click", toggleDarkMode);
    darkModeButtonMd.addEventListener("click", toggleDarkMode);
}

function toggleMenuDisplay() {
    menu.classList.toggle("hidden");
    menu.classList.toggle("grid");
    closeButton.classList.toggle("hidden");
    menuButton.classList.toggle("hidden");
    modal.classList.toggle("hidden");
}

function toggleDarkMode() {
    localStorage.setItem(
        "theme",
        htmlElement.classList.contains("dark") ? "light" : "dark"
    );
    htmlElement.classList.toggle("dark");
    lightModeButtonMd.classList.toggle("hidden");
    darkModeButtonMd.classList.toggle("hidden");
    lightModeButton.classList.toggle("hidden");
    darkModeButton.classList.toggle("hidden");
}
