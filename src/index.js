import { incrementVisitorCount } from "./visitorCount.js";

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const menuLinks = menu.children;
const closeButton = document.getElementById("close-button");
const modal = document.getElementById("modal");

menuButton.addEventListener("click", toggleMenuDisplay);
closeButton.addEventListener("click", toggleMenuDisplay);
for (let link of menuLinks) {
    link.addEventListener("click", toggleMenuDisplay);
}
modal.addEventListener("touchstart", toggleMenuDisplay);
populateVisitorCount();

async function populateVisitorCount() {
    let updatedVisitorCount = await incrementVisitorCount();
    const visitorCountElement = document.getElementById("visitor-counter");

    let digits = updatedVisitorCount.toString().split("");
    for (let digit of digits) {
        visitorCountElement.innerHTML += `<span class=\"bg-sky-300 rounded-md p-2 font-mono\">${digit}</span>`;
    }
}

function toggleMenuDisplay() {
    menu.classList.toggle("hidden");
    menu.classList.toggle("grid");
    closeButton.classList.toggle("hidden");
    menuButton.classList.toggle("hidden");
    modal.classList.toggle("hidden");
}
