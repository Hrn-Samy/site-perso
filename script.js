const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ===== Intro Animation FIX ===== */

const intro = document.getElementById("intro");

if (intro) {
  // démarre l’animation
  intro.classList.add("intro-show");

  // cache après 2.2s
  setTimeout(() => {
    intro.classList.add("intro-hide");
  }, 2200);
}

/* ===== Burger menu ===== */

const burger = document.querySelector(".burger");
const menu = document.querySelector("[data-menu]");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===== Fun Zone ===== */

let clicks = 0;
function clickCounter(){
  clicks++;
  document.getElementById("clicks").textContent = clicks;
}

function updateClock(){
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();

function randomMsg(){
  const msgs = [
    "Continue d'avancer",
    "Reste discipliné",
    "Travaille en silence",
    "Le futur se construit aujourd'hui",
    "Rien n'est impossible"
  ];
  document.getElementById("msg").textContent =
    msgs[Math.floor(Math.random()*msgs.length)];
}


