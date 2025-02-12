"use strict";

// Varibler
let navMenuEl = document.getElementById("nav-menu");
let openBtnEl = document.getElementById("open-btn");
let closeBtnEl = document.getElementById("close-btn");


// Event lyssnare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);


// funktion
function toggleMenu() {
    let style = window.getComputedStyle(navMenuEl);

    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}