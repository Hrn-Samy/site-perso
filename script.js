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

/* =========================
   GOD MODE JS (append)
   ========================= */

// Smooth scroll buttons
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Copy email + links
const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("samy.haroun78@gmail.com");
      copyEmailBtn.textContent = "Copié ✅";
      setTimeout(() => (copyEmailBtn.textContent = "Copier mon email"), 1200);
    } catch {
      alert("Impossible de copier automatiquement");
    }
  });
}

const copyLinksBtn = document.getElementById("copyLinksBtn");
if (copyLinksBtn) {
  copyLinksBtn.addEventListener("click", async () => {
    const txt = [
      "Email: samy.haroun78@gmail.com",
      "Instagram: https://instagram.com/eikichi_7gt",
      "GitHub: https://github.com/Hrn-Samy",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(txt);
      copyLinksBtn.textContent = "Copié ✅";
      setTimeout(() => (copyLinksBtn.textContent = "Copier mes liens"), 1200);
    } catch {
      alert("Impossible de copier automatiquement");
    }
  });
}

// Confetti (simple)
const confettiBtn = document.getElementById("confettiBtn");
if (confettiBtn) {
  confettiBtn.addEventListener("click", () => {
    const n = 80;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("div");
      p.className = "confetti";
      p.style.left = Math.random() * 100 + "vw";
      p.style.top = "-10px";
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.opacity = String(0.7 + Math.random() * 0.3);
      p.style.animationDuration = 0.9 + Math.random() * 1.2 + "s";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2200);
    }
  });
}

// Confetti CSS injected (small)
(function confettiCSS(){
  const css = `
    .confetti{
      position:fixed;
      width:10px;height:14px;
      background: linear-gradient(135deg, rgba(124,92,255,.9), rgba(46,229,157,.9));
      border-radius: 3px;
      z-index: 9999;
      animation: confFall linear forwards;
      pointer-events:none;
    }
    @keyframes confFall{
      to{ transform: translateY(110vh) rotate(720deg); opacity:0; }
    }
  `;
  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);
})();

// Theme toggle (light/dark)
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.setAttribute("data-theme", "light");

function setThemeIcon(){
  if (!themeToggle) return;
  const isLight = document.body.getAttribute("data-theme") === "light";
  themeToggle.textContent = isLight ? "☀️" : "🌙";
}
setThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.getAttribute("data-theme") === "light";
    if (isLight) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
    setThemeIcon();
  });
}

/* ===== Local stats ===== */
let totalClicks = 0;
document.addEventListener("click", () => {
  totalClicks++;
  const el = document.getElementById("clickCount");
  if (el) el.textContent = String(totalClicks);
});

const visitKey = "gm_visits";
const visits = (Number(localStorage.getItem(visitKey)) || 0) + 1;
localStorage.setItem(visitKey, String(visits));
const visitCountEl = document.getElementById("visitCount");
if (visitCountEl) visitCountEl.textContent = String(visits);

let seconds = 0;
setInterval(() => {
  seconds++;
  const el = document.getElementById("timeOnPage");
  if (el) el.textContent = seconds + "s";
}, 1000);

const resetStatsBtn = document.getElementById("resetStatsBtn");
if (resetStatsBtn) {
  resetStatsBtn.addEventListener("click", () => {
    localStorage.removeItem(visitKey);
    location.reload();
  });
}

/* ===== Terminal ===== */
const termInput = document.getElementById("termInput");
const termBody = document.getElementById("termBody");

function termPrint(line, isOut=false){
  if (!termBody) return;
  const div = document.createElement("div");
  div.className = "term-line";
  div.innerHTML = isOut ? `<span class="muted">${line}</span>` : line;
  termBody.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

function runCmd(cmd){
  const c = cmd.trim().toLowerCase();
  if (!c) return;

  termPrint(`<span class="term-prompt">samy@site:~$</span> ${cmd}`);

  if (c === "help") termPrint("Commandes: help, about, skills, socials, clear", true);
  else if (c === "about") termPrint("Je suis Samy, terminale, Mantes-la-Jolie. Objectif: progresser.", true);
  else if (c === "skills") termPrint("HTML • CSS • JavaScript • Analyse • Commentaire • Illustration", true);
  else if (c === "socials") termPrint("IG: instagram.com/eikichi_7gt | GitHub: github.com/Hrn-Samy", true);
  else if (c === "clear") { if (termBody) termBody.innerHTML = ""; }
  else termPrint("Commande inconnue. Tape help", true);
}

if (termInput) {
  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCmd(termInput.value);
      termInput.value = "";
    }
  });
}

/* ===== Click game (5s) ===== */
const startClickGame = document.getElementById("startClickGame");
const clickGameScore = document.getElementById("clickGameScore");
const clickGameHint = document.getElementById("clickGameHint");

let cgRunning = false;
let cgScore = 0;
let cgTimer = null;

function setCGHint(t){ if (clickGameHint) clickGameHint.textContent = t; }
function setCGScore(n){ if (clickGameScore) clickGameScore.textContent = String(n); }

if (startClickGame) {
  startClickGame.addEventListener("click", () => {
    if (cgRunning) return;
    cgRunning = true;
    cgScore = 0;
    setCGScore(0);
    setCGHint("Clique sur le score ! (5s)");
    startClickGame.textContent = "Go !";

    const clickTarget = clickGameScore;
    const onClick = () => {
      if (!cgRunning) return;
      cgScore++;
      setCGScore(cgScore);
    };
    if (clickTarget) clickTarget.addEventListener("click", onClick);

    let left = 5;
    cgTimer = setInterval(() => {
      left--;
      if (left <= 0) {
        clearInterval(cgTimer);
        cgRunning = false;
        startClickGame.textContent = "Start";
        setCGHint("Score final: " + cgScore);
        if (clickTarget) clickTarget.removeEventListener("click", onClick);
      }
    }, 1000);
  });
}

/* ===== Reflex test ===== */
const reflexBox = document.getElementById("reflexBox");
const reflexHint = document.getElementById("reflexHint");

let reflexState = "idle";
let reflexStartTime = 0;
let reflexTimeout = null;

if (reflexBox) {
  reflexBox.addEventListener("click", () => {
    if (reflexState === "idle") {
      reflexState = "waiting";
      reflexBox.textContent = "Attends...";
      reflexBox.classList.add("wait");
      reflexHint.textContent = "Prépare toi";
      const delay = 1200 + Math.random() * 2200;
      reflexTimeout = setTimeout(() => {
        reflexState = "go";
        reflexBox.classList.remove("wait");
        reflexBox.classList.add("go");
        reflexBox.textContent = "CLIQUE !";
        reflexStartTime = performance.now();
        reflexHint.textContent = "Go";
      }, delay);
      return;
    }

    if (reflexState === "waiting") {
      clearTimeout(reflexTimeout);
      reflexState = "idle";
      reflexBox.classList.remove("wait");
      reflexBox.textContent = "Start";
      reflexHint.textContent = "Trop tôt 😭";
      return;
    }

    if (reflexState === "go") {
      const ms = Math.round(performance.now() - reflexStartTime);
      reflexState = "idle";
      reflexBox.classList.remove("go");
      reflexBox.textContent = "Start";
      reflexHint.textContent = `Ton temps: ${ms}ms`;
      return;
    }
  });
}

/* ===== Quiz ===== */
const quizStart = document.getElementById("quizStart");
const quizQ = document.getElementById("quizQ");
const quizChoices = document.getElementById("quizChoices");
const quizHint = document.getElementById("quizHint");

const quizData = [
  { q: "Quel sport je kiffe le plus ?", a: ["Basket", "Foot", "Tennis"], ok: 1 },
  { q: "Je suis en...", a: ["Première", "Terminale", "Seconde"], ok: 1 },
  { q: "Mon objectif principal ?", a: ["M'améliorer", "Ne rien faire", "Dormir"], ok: 0 },
];
let quizI = 0;
let quizScore = 0;

function renderQuiz(){
  if (!quizQ || !quizChoices) return;
  const item = quizData[quizI];
  quizQ.textContent = item.q;
  quizChoices.innerHTML = "";
  item.a.forEach((txt, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip-btn";
    b.textContent = txt;
    b.addEventListener("click", () => {
      const good = idx === item.ok;
      if (good) quizScore++;
      quizHint.textContent = good ? "✅ Bien joué" : "❌ Raté";
      setTimeout(() => {
        quizI++;
        quizHint.textContent = "";
        if (quizI >= quizData.length) {
          quizQ.textContent = `Terminé: ${quizScore}/${quizData.length}`;
          quizChoices.innerHTML = "";
          return;
        }
        renderQuiz();
      }, 600);
    });
    quizChoices.appendChild(b);
  });
}

if (quizStart) {
  quizStart.addEventListener("click", () => {
    quizI = 0;
    quizScore = 0;
    renderQuiz();
  });
}

/* ===== Snake ===== */
const snakeCanvas = document.getElementById("snake");
const snakeScoreEl = document.getElementById("snakeScore");
const snakeStartBtn = document.getElementById("snakeStart");
const snakePauseBtn = document.getElementById("snakePause");

let snakeInterval = null;
let snakePaused = false;

function snakeGame(){
  if (!snakeCanvas) return;

  const ctx = snakeCanvas.getContext("2d");
  const grid = 20;
  const tile = snakeCanvas.width / grid;

  let snake = [{x: 10, y: 10}];
  let dir = {x: 1, y: 0};
  let food = {x: 15, y: 15};
  let score = 0;

  function rndFood(){
    food = {x: Math.floor(Math.random()*grid), y: Math.floor(Math.random()*grid)};
  }

  function draw(){
    ctx.clearRect(0,0,snakeCanvas.width,snakeCanvas.height);

    // food
    ctx.fillStyle = "rgba(46,229,157,.95)";
    ctx.fillRect(food.x*tile, food.y*tile, tile-2, tile-2);

    // snake
    ctx.fillStyle = "rgba(124,92,255,.95)";
    snake.forEach((s,i) => {
      ctx.fillRect(s.x*tile, s.y*tile, tile-2, tile-2);
    });
  }

  function step(){
    if (snakePaused) return;

    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

    // wrap
    if (head.x < 0) head.x = grid-1;
    if (head.x >= grid) head.x = 0;
    if (head.y < 0) head.y = grid-1;
    if (head.y >= grid) head.y = 0;

    // collision self
    if (snake.some((p) => p.x === head.x && p.y === head.y)) {
      clearInterval(snakeInterval);
      snakeInterval = null;
      alert("Perdu 😭 score: " + score);
      return;
    }

    snake.unshift(head);

    // eat
    if (head.x === food.x && head.y === food.y) {
      score++;
      if (snakeScoreEl) snakeScoreEl.textContent = String(score);
      rndFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function setDir(nx, ny){
    // prevent reverse
    if (snake.length > 1) {
      const rx = -dir.x, ry = -dir.y;
      if (nx === rx && ny === ry) return;
    }
    dir = {x:nx, y:ny};
  }

  function onKey(e){
    if (e.key === "ArrowUp") setDir(0,-1);
    if (e.key === "ArrowDown") setDir(0,1);
    if (e.key === "ArrowLeft") setDir(-1,0);
    if (e.key === "ArrowRight") setDir(1,0);
  }

  document.addEventListener("keydown", onKey);

  // dpad mobile
  document.querySelectorAll(".dpad [data-dir]").forEach((b) => {
    b.addEventListener("click", () => {
      const d = b.getAttribute("data-dir");
      if (d === "up") setDir(0,-1);
      if (d === "down") setDir(0,1);
      if (d === "left") setDir(-1,0);
      if (d === "right") setDir(1,0);
    });
  });

  draw();
  snakeInterval = setInterval(step, 120);
}

if (snakeStartBtn) {
  snakeStartBtn.addEventListener("click", () => {
    if (snakeInterval) return;
    if (snakeScoreEl) snakeScoreEl.textContent = "0";
    snakePaused = false;
    snakeGame();
  });
}
if (snakePauseBtn) {
  snakePauseBtn.addEventListener("click", () => {
    snakePaused = !snakePaused;
    snakePauseBtn.textContent = snakePaused ? "Reprendre" : "Pause";
  });
}

/* ===== Gallery modal ===== */
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const imgClose = document.getElementById("imgClose");

document.querySelectorAll(".g-item").forEach((it) => {
  it.addEventListener("click", () => {
    const src = it.getAttribute("data-img");
    if (!imgModal || !modalImg) return;
    modalImg.src = src;
    imgModal.classList.add("open");
    imgModal.setAttribute("aria-hidden", "false");
  });
});

function closeModal(){
  if (!imgModal) return;
  imgModal.classList.remove("open");
  imgModal.setAttribute("aria-hidden", "true");
}
if (imgClose) imgClose.addEventListener("click", closeModal);
if (imgModal) imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) closeModal();
});

/* ===== Music ===== */
const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");
const musicVol = document.getElementById("musicVol");
const musicStatus = document.getElementById("musicStatus");

function setMusicStatus(){
  if (!musicStatus || !music) return;
  musicStatus.textContent = music.paused ? "en pause" : "en lecture";
}
if (musicVol && music) {
  music.volume = Number(musicVol.value);
  musicVol.addEventListener("input", () => {
    music.volume = Number(musicVol.value);
  });
}
if (musicToggle && music) {
  musicToggle.addEventListener("click", async () => {
    try {
      if (music.paused) await music.play();
      else music.pause();
      setMusicStatus();
      musicToggle.textContent = music.paused ? "Play" : "Pause";
    } catch {
      alert("Ajoute un fichier music.mp3 dans le repo pour activer la musique");
    }
  });
  setMusicStatus();
}

/* ===== Chat bot local ===== */
const chatLog = document.getElementById("chatLog");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

function addBubble(text, who){
  if (!chatLog) return;
  const div = document.createElement("div");
  div.className = "bubble " + who;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function botReply(msg){
  const m = msg.trim().toLowerCase();
  if (m === "help") return "Commandes: help, socials, about, skills, fun";
  if (m === "socials") return "IG: @eikichi_7gt | GitHub: Hrn-Samy";
  if (m === "about") return "Samy, 17 ans, terminale, Mantes-la-Jolie. Objectif: progresser";
  if (m === "skills") return "HTML, CSS, JavaScript, analyse, commenter, illustrer";
  if (m === "fun") return "Teste le quiz, le reflex, et le snake 😎";
  return "Je capte. Essaie: help";
}

function sendChat(){
  if (!chatInput) return;
  const v = chatInput.value;
  if (!v.trim()) return;
  addBubble(v, "me");
  chatInput.value = "";
  setTimeout(() => addBubble(botReply(v), "bot"), 240);
}

if (chatSend) chatSend.addEventListener("click", sendChat);
if (chatInput) chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendChat();
});

/* ===== Mini assistant buttons ===== */
const assistantOut = document.getElementById("assistantOut");
const answers = {
  "Donne moi un objectif sport cette semaine": "Fais 3 séances: 1 cardio, 1 renfo, 1 foot + 10 min d’étirements après chaque séance",
  "Donne moi un conseil pour progresser en CSS": "Fais 1 mini composant par jour: bouton, card, navbar. Copie puis améliore. Répète",
  "Donne moi une idée de projet simple en JavaScript": "Un mini tracker: tu ajoutes des tâches, tu coches, ça sauvegarde en localStorage",
};

document.querySelectorAll("[data-ask]").forEach((b) => {
  b.addEventListener("click", () => {
    const k = b.getAttribute("data-ask");
    if (!assistantOut) return;
    assistantOut.textContent = answers[k] || "Pas trouvé";
  });
});




