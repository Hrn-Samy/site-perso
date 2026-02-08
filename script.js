/* =========================
   SITE GOD MODE — script.js
   Remplace tout le fichier
   ========================= */

(() => {
  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel)
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

  // YEAR
  const year = $("#year")
  if (year) year.textContent = String(new Date().getFullYear())

  // INTRO (fix PC + mobile)
  const intro = $("#intro")
  if (intro) {
    intro.classList.add("intro-show")
    setTimeout(() => {
      intro.classList.add("intro-hide")
    }, 2200)
  }

  // BURGER MENU
  const burger = $(".burger")
  const menu = $("[data-menu]")
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open")
      burger.setAttribute("aria-expanded", String(isOpen))
    })
    $$("a", menu).forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("open")
        burger.setAttribute("aria-expanded", "false")
      })
    })
  }

  // Smooth scroll buttons
  $$("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll")
      const el = target ? $(target) : null
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })

  // Copy email + links
  const copyEmailBtn = $("#copyEmailBtn")
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("samy.haroun78@gmail.com")
        copyEmailBtn.textContent = "Copié ✅"
        setTimeout(() => (copyEmailBtn.textContent = "Copier mon email"), 1200)
      } catch {
        alert("Copie impossible, fais clic droit copier")
      }
    })
  }

  const copyLinksBtn = $("#copyLinksBtn")
  if (copyLinksBtn) {
    copyLinksBtn.addEventListener("click", async () => {
      const txt = [
        "Email: samy.haroun78@gmail.com",
        "Instagram: https://instagram.com/eikichi_7gt",
        "GitHub: https://github.com/Hrn-Samy",
      ].join("\n")
      try {
        await navigator.clipboard.writeText(txt)
        copyLinksBtn.textContent = "Copié ✅"
        setTimeout(() => (copyLinksBtn.textContent = "Copier mes liens"), 1200)
      } catch {
        alert("Copie impossible, fais clic droit copier")
      }
    })
  }

  // Confetti
  const confettiBtn = $("#confettiBtn")
  ;(() => {
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
    `
    const s = document.createElement("style")
    s.textContent = css
    document.head.appendChild(s)
  })()

  if (confettiBtn) {
    confettiBtn.addEventListener("click", () => {
      for (let i = 0; i < 80; i++) {
        const p = document.createElement("div")
        p.className = "confetti"
        p.style.left = Math.random() * 100 + "vw"
        p.style.top = "-10px"
        p.style.transform = `rotate(${Math.random() * 360}deg)`
        p.style.opacity = String(0.7 + Math.random() * 0.3)
        p.style.animationDuration = 0.9 + Math.random() * 1.2 + "s"
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 2200)
      }
    })
  }

  // Theme toggle
  const themeToggle = $("#themeToggle")
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") document.body.setAttribute("data-theme", "light")

  const setThemeIcon = () => {
    if (!themeToggle) return
    const isLight = document.body.getAttribute("data-theme") === "light"
    themeToggle.textContent = isLight ? "☀️" : "🌙"
  }
  setThemeIcon()

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.getAttribute("data-theme") === "light"
      if (isLight) {
        document.body.removeAttribute("data-theme")
        localStorage.setItem("theme", "dark")
      } else {
        document.body.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
      }
      setThemeIcon()
    })
  }

  // Local stats
  let totalClicks = 0
  document.addEventListener("click", () => {
    totalClicks++
    const el = $("#clickCount")
    if (el) el.textContent = String(totalClicks)
  })

  const visitKey = "gm_visits"
  const visits = (Number(localStorage.getItem(visitKey)) || 0) + 1
  localStorage.setItem(visitKey, String(visits))
  const visitCountEl = $("#visitCount")
  if (visitCountEl) visitCountEl.textContent = String(visits)

  let seconds = 0
  setInterval(() => {
    seconds++
    const el = $("#timeOnPage")
    if (el) el.textContent = seconds + "s"
  }, 1000)

  const resetStatsBtn = $("#resetStatsBtn")
  if (resetStatsBtn) {
    resetStatsBtn.addEventListener("click", () => {
      localStorage.removeItem(visitKey)
      location.reload()
    })
  }

  // Terminal
  const termInput = $("#termInput")
  const termBody = $("#termBody")

  const termPrint = (html, out = false) => {
    if (!termBody) return
    const div = document.createElement("div")
    div.className = "term-line"
    div.innerHTML = out ? `<span class="muted">${html}</span>` : html
    termBody.appendChild(div)
    termBody.scrollTop = termBody.scrollHeight
  }

  const runCmd = (cmd) => {
    const c = cmd.trim().toLowerCase()
    if (!c) return
    termPrint(`<span class="term-prompt">samy@site:~$</span> ${cmd}`)
    if (c === "help") termPrint("Commandes: help, about, skills, socials, clear", true)
    else if (c === "about") termPrint("Samy, terminale, Mantes-la-Jolie. Objectif: progresser", true)
    else if (c === "skills") termPrint("HTML • CSS • JavaScript • Analyse • Commenter • Illustrer", true)
    else if (c === "socials") termPrint("IG: instagram.com/eikichi_7gt | GitHub: github.com/Hrn-Samy", true)
    else if (c === "clear") { if (termBody) termBody.innerHTML = "" }
    else termPrint("Commande inconnue. Tape help", true)
  }

  if (termInput) {
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        runCmd(termInput.value)
        termInput.value = ""
      }
    })
  }

  // Click game
  const startClickGame = $("#startClickGame")
  const clickGameScore = $("#clickGameScore")
  const clickGameHint = $("#clickGameHint")

  let cgRunning = false
  let cgScore = 0
  let cgTimer = null

  const setCGHint = (t) => { if (clickGameHint) clickGameHint.textContent = t }
  const setCGScore = (n) => { if (clickGameScore) clickGameScore.textContent = String(n) }

  if (startClickGame) {
    startClickGame.addEventListener("click", () => {
      if (cgRunning) return
      cgRunning = true
      cgScore = 0
      setCGScore(0)
      setCGHint("Clique sur le score pendant 5s")
      startClickGame.textContent = "Go"

      const onClick = () => {
        if (!cgRunning) return
        cgScore++
        setCGScore(cgScore)
      }

      if (clickGameScore) clickGameScore.addEventListener("click", onClick)

      let left = 5
      cgTimer = setInterval(() => {
        left--
        if (left <= 0) {
          clearInterval(cgTimer)
          cgRunning = false
          startClickGame.textContent = "Start"
          setCGHint("Score final: " + cgScore)
          if (clickGameScore) clickGameScore.removeEventListener("click", onClick)
        }
      }, 1000)
    })
  }

  // Reflex test
  const reflexBox = $("#reflexBox")
  const reflexHint = $("#reflexHint")

  let reflexState = "idle"
  let reflexStartTime = 0
  let reflexTimeout = null

  if (reflexBox && reflexHint) {
    reflexBox.addEventListener("click", () => {
      if (reflexState === "idle") {
        reflexState = "waiting"
        reflexBox.textContent = "Attends"
        reflexBox.classList.add("wait")
        reflexHint.textContent = "Prépare toi"
        const delay = 1200 + Math.random() * 2200
        reflexTimeout = setTimeout(() => {
          reflexState = "go"
          reflexBox.classList.remove("wait")
          reflexBox.classList.add("go")
          reflexBox.textContent = "CLIQUE"
          reflexStartTime = performance.now()
          reflexHint.textContent = "Go"
        }, delay)
        return
      }

      if (reflexState === "waiting") {
        clearTimeout(reflexTimeout)
        reflexState = "idle"
        reflexBox.classList.remove("wait")
        reflexBox.textContent = "Start"
        reflexHint.textContent = "Trop tôt"
        return
      }

      if (reflexState === "go") {
        const ms = Math.round(performance.now() - reflexStartTime)
        reflexState = "idle"
        reflexBox.classList.remove("go")
        reflexBox.textContent = "Start"
        reflexHint.textContent = `Ton temps: ${ms}ms`
      }
    })
  }

  // Quiz
  const quizStart = $("#quizStart")
  const quizQ = $("#quizQ")
  const quizChoices = $("#quizChoices")
  const quizHint = $("#quizHint")

  const quizData = [
    { q: "Quel sport je kiffe le plus ?", a: ["Basket", "Foot", "Tennis"], ok: 1 },
    { q: "Je suis en", a: ["Première", "Terminale", "Seconde"], ok: 1 },
    { q: "Mon objectif principal ?", a: ["M'améliorer", "Ne rien faire", "Dormir"], ok: 0 },
  ]

  let quizI = 0
  let quizScore = 0

  const renderQuiz = () => {
    if (!quizQ || !quizChoices || !quizHint) return
    const item = quizData[quizI]
    quizQ.textContent = item.q
    quizChoices.innerHTML = ""
    item.a.forEach((txt, idx) => {
      const b = document.createElement("button")
      b.type = "button"
      b.className = "chip-btn"
      b.textContent = txt
      b.addEventListener("click", () => {
        const good = idx === item.ok
        if (good) quizScore++
        quizHint.textContent = good ? "✅ Bien joué" : "❌ Raté"
        setTimeout(() => {
          quizI++
          quizHint.textContent = ""
          if (quizI >= quizData.length) {
            quizQ.textContent = `Terminé: ${quizScore}/${quizData.length}`
            quizChoices.innerHTML = ""
            return
          }
          renderQuiz()
        }, 600)
      })
      quizChoices.appendChild(b)
    })
  }

  if (quizStart) {
    quizStart.addEventListener("click", () => {
      quizI = 0
      quizScore = 0
      renderQuiz()
    })
  }

  // Snake
  const snakeCanvas = $("#snake")
  const snakeScoreEl = $("#snakeScore")
  const snakeStartBtn = $("#snakeStart")
  const snakePauseBtn = $("#snakePause")

  let snakeInterval = null
  let snakePaused = false
  let snakeDir = { x: 1, y: 0 }
  let snake = [{ x: 10, y: 10 }]
  let food = { x: 15, y: 15 }
  let score = 0

  const snakeInit = () => {
    snake = [{ x: 10, y: 10 }]
    snakeDir = { x: 1, y: 0 }
    food = { x: 15, y: 15 }
    score = 0
    if (snakeScoreEl) snakeScoreEl.textContent = "0"
  }

  const setDir = (nx, ny) => {
    const rx = -snakeDir.x
    const ry = -snakeDir.y
    if (snake.length > 1 && nx === rx && ny === ry) return
    snakeDir = { x: nx, y: ny }
  }

  const rndFood = (grid) => {
    food = { x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid) }
  }

  const snakeStep = () => {
    if (!snakeCanvas || snakePaused) return
    const ctx = snakeCanvas.getContext("2d")
    const grid = 20
    const tile = snakeCanvas.width / grid

    const head = { x: snake[0].x + snakeDir.x, y: snake[0].y + snakeDir.y }

    if (head.x < 0) head.x = grid - 1
    if (head.x >= grid) head.x = 0
    if (head.y < 0) head.y = grid - 1
    if (head.y >= grid) head.y = 0

    if (snake.some((p) => p.x === head.x && p.y === head.y)) {
      clearInterval(snakeInterval)
      snakeInterval = null
      alert("Perdu 😭 score: " + score)
      return
    }

    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      score++
      if (snakeScoreEl) snakeScoreEl.textContent = String(score)
      rndFood(grid)
    } else {
      snake.pop()
    }

    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height)
    ctx.fillStyle = "rgba(46,229,157,.95)"
    ctx.fillRect(food.x * tile, food.y * tile, tile - 2, tile - 2)
    ctx.fillStyle = "rgba(124,92,255,.95)"
    snake.forEach((s) => ctx.fillRect(s.x * tile, s.y * tile, tile - 2, tile - 2))
  }

  if (snakeCanvas) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") setDir(0, -1)
      if (e.key === "ArrowDown") setDir(0, 1)
      if (e.key === "ArrowLeft") setDir(-1, 0)
      if (e.key === "ArrowRight") setDir(1, 0)
    })

    $$("[data-dir]").forEach((b) => {
      b.addEventListener("click", () => {
        const d = b.getAttribute("data-dir")
        if (d === "up") setDir(0, -1)
        if (d === "down") setDir(0, 1)
        if (d === "left") setDir(-1, 0)
        if (d === "right") setDir(1, 0)
      })
    })
  }

  if (snakeStartBtn) {
    snakeStartBtn.addEventListener("click", () => {
      if (snakeInterval) return
      snakeInit()
      snakePaused = false
      snakeInterval = setInterval(snakeStep, 120)
    })
  }

  if (snakePauseBtn) {
    snakePauseBtn.addEventListener("click", () => {
      snakePaused = !snakePaused
      snakePauseBtn.textContent = snakePaused ? "Reprendre" : "Pause"
    })
  }

  // Gallery modal
  const imgModal = $("#imgModal")
  const modalImg = $("#modalImg")
  const imgClose = $("#imgClose")

  $$(".g-item").forEach((it) => {
    it.addEventListener("click", () => {
      const src = it.getAttribute("data-img")
      if (!imgModal || !modalImg || !src) return
      modalImg.src = src
      imgModal.classList.add("open")
      imgModal.setAttribute("aria-hidden", "false")
    })
  })

  const closeModal = () => {
    if (!imgModal) return
    imgModal.classList.remove("open")
    imgModal.setAttribute("aria-hidden", "true")
  }

  if (imgClose) imgClose.addEventListener("click", closeModal)
  if (imgModal) imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) closeModal()
  })

  // Music
  const music = $("#music")
  const musicToggle = $("#musicToggle")
  const musicVol = $("#musicVol")
  const musicStatus = $("#musicStatus")

  const setMusicStatus = () => {
    if (!music || !musicStatus) return
    musicStatus.textContent = music.paused ? "en pause" : "en lecture"
  }

  if (music && musicVol) {
    music.volume = Number(musicVol.value)
    musicVol.addEventListener("input", () => {
      music.volume = Number(musicVol.value)
    })
  }

  if (music && musicToggle) {
    musicToggle.addEventListener("click", async () => {
      try {
        if (music.paused) await music.play()
        else music.pause()
        setMusicStatus()
        musicToggle.textContent = music.paused ? "Play" : "Pause"
      } catch {
        alert("Ajoute un fichier music.mp3 à la racine pour activer la musique")
      }
    })
    setMusicStatus()
  }

  // Chat bot local
  const chatLog = $("#chatLog")
  const chatInput = $("#chatInput")
  const chatSend = $("#chatSend")

  const addBubble = (text, who) => {
    if (!chatLog) return
    const div = document.createElement("div")
    div.className = "bubble " + who
    div.textContent = text
    chatLog.appendChild(div)
    chatLog.scrollTop = chatLog.scrollHeight
  }

  const botReply = (msg) => {
    const m = msg.trim().toLowerCase()
    if (m === "help") return "Commandes: help, socials, about, skills, fun"
    if (m === "socials") return "IG: @eikichi_7gt | GitHub: Hrn-Samy"
    if (m === "about") return "Samy, 17 ans, terminale, Mantes-la-Jolie. Objectif: progresser"
    if (m === "skills") return "HTML, CSS, JavaScript, analyse, commenter, illustrer"
    if (m === "fun") return "Teste le quiz, le reflex, et le snake 😎"
    return "Essaie: help"
  }

  const sendChat = () => {
    if (!chatInput) return
    const v = chatInput.value
    if (!v.trim()) return
    addBubble(v, "me")
    chatInput.value = ""
    setTimeout(() => addBubble(botReply(v), "bot"), 240)
  }

  if (chatSend) chatSend.addEventListener("click", sendChat)
  if (chatInput) chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChat()
  })

  // Mini assistant
  const assistantOut = $("#assistantOut")
  const answers = {
    "Donne moi un objectif sport cette semaine": "3 séances: 1 cardio, 1 renfo, 1 foot + étirements après",
    "Donne moi un conseil pour progresser en CSS": "1 composant par jour: bouton, card, navbar, puis améliore",
    "Donne moi une idée de projet simple en JavaScript": "Mini tracker tâches + localStorage + filtres",
  }

  $$("[data-ask]").forEach((b) => {
    b.addEventListener("click", () => {
      const k = b.getAttribute("data-ask")
      if (!assistantOut || !k) return
      assistantOut.textContent = answers[k] || "Pas trouvé"
    })
  })

  // Log pour vérifier que JS tourne
  console.log("GOD MODE JS OK")
})()
