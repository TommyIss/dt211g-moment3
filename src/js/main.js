"use strict";

// Varibler
let navMenuEl = document.getElementById("nav-menu");
let openBtnEl = document.getElementById("open-btn");
let closeBtnEl = document.getElementById("close-btn");
let playBtnEl = document.getElementById("play-btn");



// Event lyssnare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);

document.addEventListener("DOMContentLoaded", function() {
    //URL-sökvägen
    let path = window.location.pathname;
    
    if(path === '/animering.html') {
        playBtnEl.addEventListener("click", playAnimation);
    }

});

// funktion
function toggleMenu() {
    let style = window.getComputedStyle(navMenuEl);

    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

function playAnimation() {
    let value = playBtnEl.innerHTML;

    let img1 = document.getElementById('img1');
    let img2 = document.getElementById('img2');
    let img3 = document.getElementById('img3');
    let img4 = document.getElementById('img4');
    let img5 = document.getElementById('img5');
    let img6 = document.getElementById('img6');

    if(value === 'Play') {
        playBtnEl.innerHTML = 'Pause';
        img1.style.animation = 'shadowEffect 5s 0s infinite alternate ease-in-out';
        img2.style.animation = 'shadowEffect 5s 5s infinite alternate ease-in-out';
        img3.style.animation = 'rotation 15s ease-in-out infinite alternate';
        img4.style.animation = 'rotation2 15s ease-in-out infinite alternate';
        img5.style.animation = 'circlePath2 15s 1s ease-in-out infinite alternate';
        img6.style.animation = 'circlePath1 15s 1s ease-in-out infinite alternate';
    } else {
        playBtnEl.innerHTML = 'Play';
        img1.style.animation = '';
        img2.style.animation = '';
        img3.style.animation = '';
        img4.style.animation = '';
        img5.style.animation = '';
        img6.style.animation = '';
    }
}