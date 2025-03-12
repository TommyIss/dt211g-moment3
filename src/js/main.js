"use strict";

// Varibler
let navMenuEl = document.getElementById("nav-menu");
let openBtnEl = document.getElementById("open-btn");
let closeBtnEl = document.getElementById("close-btn");
let playBtnEl = document.getElementById("play-btn");
let stapelDiagram = document.getElementById('stapel-diagram');
let circleDiagram = document.getElementById('circle-diagram');
let inputEl = document.getElementById('input');
let searchBtn = document.getElementById('searchBtn');
let marker, circle, map;

// Event lyssnare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);

document.addEventListener("DOMContentLoaded", function() {
    //URL-sökvägen
    let path = window.location.pathname;
    
    if(path === '/animering.html' || path === '/animering') {
        playBtnEl.addEventListener("click", playAnimation);
    } else if(path === '/diagram.html' || path === '/diagram') {
        window.onload = init;

        function init() {
            getData();
        }
    } else if(path === '/map.html' || path === '/map') {
        searchBtn.addEventListener('click', getMap);
        inputEl.addEventListener('keyup', function(event) {
            if(event.key === 'Enter') {
                getMap();
            }
        });
    }

});


// funktioner
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

/**
 * @function getData Hämtar data från API gällande utbildningar
 */
async function getData() {
    let url = 'https://studenter.miun.se/~mallar/dt211g/';

    try {
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error('Fel vid anslutning till data...');
        }
        let courses = await response.json();
        // console.log(courses);
        createStapelChart(courses);
    }
    catch(error) {
        console.error('Error: ', error)
    }
}


function isDarkTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

import ApexCharts from "apexcharts";

/**
 * Skapar stapeldiagram för kurserna samt cirkeldiagram för program 
 * @param {Array} datas - Array med utbildningar data
 */
function createStapelChart(datas) {
    let courseArray = []; // Tomt array för kurser
    let programArray = []; // Tomt array för program
    // Loopa genom data-array 
    datas.forEach(data => {
        // If-sats för kontorllera data om det är till kurs eller program och lägg dem data  
        if(data.type === 'Kurs') {
            courseArray.push({
                type: data.type,
                name: data.name, 
                applicantsTotal: data.applicantsTotal
            });
        } else if(data.type === 'Program') {
            programArray.push({
                type: data.type,
                name: data.name,
                applicantsTotal: data.applicantsTotal
            });
        }
    });
    courseArray.sort((a, b) => (b.applicantsTotal - a.applicantsTotal));
    
    programArray.sort((a, b) => (b.applicantsTotal - a.applicantsTotal));

    let isDark = isDarkTheme();
    let backgroundColor = isDark ? '#4DA1A9' : '#F6F4F0';
    let fontColor = isDark ? '#F6F4F0' : '#4DA1A9';

    let options = {
        chart: {
            type: 'bar',
            height: '600px',
            width: '100%',
            background: backgroundColor,
            foreColor: fontColor
        },
        title: {
            text: 'Mesta sökta kurserna',
            align: 'center',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                foreColor: fontColor
            }
        },
        series: [
            {
                name: 'Kurser',
                data: [
                    courseArray[0].applicantsTotal, 
                    courseArray[1].applicantsTotal, 
                    courseArray[2].applicantsTotal, 
                    courseArray[3].applicantsTotal, 
                    courseArray[4].applicantsTotal, 
                    courseArray[5].applicantsTotal
                ],
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                foreColor: fontColor
            }
            }
        ],
        xaxis: {
            categories: [
                courseArray[0].name, 
                courseArray[1].name, 
                courseArray[2].name, 
                courseArray[3].name, 
                courseArray[4].name, 
                courseArray[5].name
            ],
            labels: {
                style: {
                    fontSize: '1em'
                }
            }
        },
        fill: {
            colors: ['grey']
        },
    }
    let chart1 = new ApexCharts(stapelDiagram, options);
    chart1.render();


    // Cirkeldiagram för mesta sökta program
    let validData = programArray.slice(0, 5).map(program => Number(program.applicantsTotal) || 0);
    
    let options2 = {
        chart: {
            type: 'pie',
            height: '700px',
            width: '100%',
            background: backgroundColor,
            foreColor: fontColor
        },
        title: {
            text: 'Mesta sökta program',
            align: 'center',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                foreColor: fontColor
            }
        },
        series: [
            validData[0], 
            validData[1], 
            validData[2], 
            validData[3], 
            validData[4]
        ],
        labels: [
            programArray[0].name, 
            programArray[1].name, 
            programArray[2].name, 
            programArray[3].name, 
            programArray[4].name
        ],
        style: {
            fontSize: '0.9em'
        },
        dataLabels: {
            style: {
                fontSize: '0.9em'
            }
        },
        fill: {
            colors: ['blue', 'green', 'red', 'yellow', 'aqua']
        },
    }
    let chart2 = new ApexCharts(circleDiagram, options2);
    chart2.render();
}

/**
 * @function getMap Hämtar data från api gällande adressdetaljer från inmatade uppgifter i textfält
 */
async function getMap() {
    
    let destination = inputEl.value;
    let url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${destination}&format=jsonv2&limit=1`;

    try {
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error('Fel vid anslutning till data...');
        }
        let adress = await response.json();
        printMap(adress[0]);
    }
    catch(error) {
        console.error('Error: ', error);
    }
    
}

/**
 * @function printMap Tar emot data och skapar en karta med markör för inmatade adress
 * @param {object} data - Objekt som innehåller data gällande inmatade adress 
 */
function printMap(data) {
    
    let lat = data.lat;
    let lng = data.lon;
    if(map) {
        map.remove();
    }
    map = L.map('map');
    if(marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    map.setView([lat, lng], 13);
        
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng]).addTo(map);
        map.fitBounds(circle.getBounds());    
    
}