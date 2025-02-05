import { incrementVisitorCount } from "./visitorCount.js";

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const menuLinks = menu.children;
const closeButton = document.getElementById("close-button");
const modal = document.getElementById("modal");
const darkModeButton = document.getElementById("dark-mode-button");
const darkModeButtonMd = document.getElementById("dark-mode-button-md");
const htmlElement = document.documentElement;

menuButton.addEventListener("click", toggleMenuDisplay);
closeButton.addEventListener("click", toggleMenuDisplay);
for (let link of menuLinks) {
    link.addEventListener("click", toggleMenuDisplay);
}
modal.addEventListener("touchstart", toggleMenuDisplay);
darkModeButton.addEventListener("click", toggleDarkMode);
darkModeButtonMd.addEventListener("click", toggleDarkMode);

populateVisitorCount();

async function populateVisitorCount() {
    let updatedVisitorCount = await incrementVisitorCount();
    const visitorCountElement = document.getElementById("visitor-counter");

    let digits = updatedVisitorCount.toString().split("");
    for (let digit of digits) {
        visitorCountElement.innerHTML += `<span class=\"bg-green-500 dark:bg-green-400 rounded-md p-2 font-mono\">${digit}</span>`;
    }
}

function toggleMenuDisplay() {
    menu.classList.toggle("hidden");
    menu.classList.toggle("grid");
    closeButton.classList.toggle("hidden");
    menuButton.classList.toggle("hidden");
    modal.classList.toggle("hidden");
}

function toggleDarkMode() {
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") === "light") {
            htmlElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            htmlElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    } else {
        if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            htmlElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }
}
