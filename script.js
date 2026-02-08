/* =========================
   SITE GOD MODE — script.js
   VERSION SAFE (anti-crash)
   Remplace tout le fichier
   ========================= */

(() => {
  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel)
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

  // Small guard so a single feature doesn't kill everything
  const safe = (name, fn) => {
    try { fn() } catch (e) { console.warn("Feature failed:", name, e) }
  }

  /* ===== Basics ===== */

  safe("year", () => {
    const year = $("#year")
    if (year) year.textContent = String(new Date().getFullYear())
  })

  safe("intro", () => {
    const intro = $("#intro")
    if (!intro) return
    intro.classList.add("intro-show")
    setTimeout(() => intro.classList.add("intro-hide"), 2200)
  })

  safe("burger", () => {
    const burger = $(".burger")
    const menu = $("[data-menu]")
    if (!burger || !menu) return

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
  })

  safe("smooth-scroll", () => {
    $$("[data-scroll]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-scroll")
        const el = target ? $(target) : null
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    })
  })

  /* ===== Copy actions ===== */

  safe("copy-email", () => {
    const copyEmailBtn = $("#copyEmailBtn")
    if (!copyEmailBtn) return

    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("samy.haroun78@gmail.com")
        copyEmailBtn.textContent = "Copié ✅"
        setTimeout(() => (copyEmailBtn.textContent = "Copier mon email"), 1200)
      } catch {
        alert("Copie impossible, fais clic droit copier")
      }
    })
  })

  safe("copy-links", () => {
    const copyLinksBtn = $("#copyLinksBtn")
    if (!copyLinksBtn) return

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
  })

  /* ===== Confetti ===== */

  safe("confetti-css", () => {
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
  })

  safe("confetti", () => {
    const confettiBtn = $("#confettiBtn")
    if (!confettiBtn) return

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
  })

  /* ===== Theme toggle ===== */

  safe("theme", () => {
    const themeToggle = $("#themeToggle")
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") document.body.setAttribute("data-theme", "light")

    const setThemeIcon = () => {
      if (!themeToggle) return
      const isLight = document.body.getAttribute("data-theme") === "light"
      themeToggle.textContent = isLight ? "☀️" : "🌙"
    }

    setThemeIcon()

    if (!themeToggle) return
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
  })

  /* ===== Optional Clock (safe) ===== */

  safe("clock", () => {
    const clockEl = $("#clock")
    if (!clockEl) return

    const updateClock = () => {
      // super safe
      const el = $("#clock")
      if (!el) return
      el.textContent = new Date().toLocaleTimeString()
    }

    updateClock()
    setInterval(updateClock, 1000)
  })

  /* ===== Local stats ===== */

  safe("stats", () => {
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
  })

  /* ===== Terminal ===== */

  safe("terminal", () => {
    const termInput = $("#termInput")
    const termBody = $("#termBody")
    if (!termInput || !termBody) return

    const termPrint = (html, out = false) => {
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
      else if (c === "clear") termBody.innerHTML = ""
      else termPrint("Commande inconnue. Tape help", true)
    }

    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        runCmd(termInput.value)
        termInput.value = ""
      }
    })
  })

  /* ===== Click game ===== */

  safe("click-game", () => {
    const startClickGame = $("#startClickGame")
    const clickGameScore = $("#clickGameScore")
    const clickGameHint = $("#clickGameHint")
    if (!startClickGame || !clickGameScore || !clickGameHint) return

    let running = false
    let score = 0
    let timer = null

    const setHint = (t) => (clickGameHint.textContent = t)
    const setScore = (n) => (clickGameScore.textContent = String(n))

    startClickGame.addEventListener("click", () => {
      if (running) return
      running = true
      score = 0
      setScore(0)
      setHint("Clique sur le score pendant 5s")
      startClickGame.textContent = "Go"

      const onClick = () => {
        if (!running) return
        score++
        setScore(score)
      }
      clickGameScore.addEventListener("click", onClick)

      let left = 5
      timer = setInterval(() => {
        left--
        if (left <= 0) {
          clearInterval(timer)
          running = false
          startClickGame.textContent = "Start"
          setHint("Score final: " + score)
          clickGameScore.removeEventListener("click", onClick)
        }
      }, 1000)
    })
  })

  /* ===== Reflex test ===== */

  safe("reflex", () => {
    const reflexBox = $("#reflexBox")
    const reflexHint = $("#reflexHint")
    if (!reflexBox || !reflexHint) return

    let state = "idle"
    let start = 0
    let t = null

    reflexBox.addEventListener("click", () => {
      if (state === "idle") {
        state = "waiting"
        reflexBox.textContent = "Attends"
        reflexBox.classList.add("wait")
        reflexHint.textContent = "Prépare toi"
        const delay = 1200 + Math.random() * 2200
        t = setTimeout(() => {
          state = "go"
          reflexBox.classList.remove("wait")
          reflexBox.classList.add("go")
          reflexBox.textContent = "CLIQUE"
          start = performance.now()
          reflexHint.textContent = "Go"
        }, delay)
        return
      }

      if (state === "waiting") {
        clearTimeout(t)
        state = "idle"
        reflexBox.classList.remove("wait")
        reflexBox.textContent = "Start"
        reflexHint.textContent = "Trop tôt"
        return
      }

      if (state === "go") {
        const ms = Math.round(performance.now() - start)
        state = "idle"
        reflexBox.classList.remove("go")
        reflexBox.textContent = "Start"
        reflexHint.textContent = `Ton temps: ${ms}ms`
      }
    })
  })

  /* ===== Quiz ===== */

  safe("quiz", () => {
    const quizStart = $("#quizStart")
    const quizQ = $("#quizQ")
    const quizChoices = $("#quizChoices")
    const quizHint = $("#quizHint")
    if (!quizStart || !quizQ || !quizChoices || !quizHint) return

    const data = [
      { q: "Quel sport je kiffe le plus ?", a: ["Basket", "Foot", "Tennis"], ok: 1 },
      { q: "Je suis en", a: ["Première", "Terminale", "Seconde"], ok: 1 },
      { q: "Mon objectif principal ?", a: ["M'améliorer", "Ne rien faire", "Dormir"], ok: 0 },
    ]

    let i = 0
    let score = 0

    const render = () => {
      const item = data[i]
      quizQ.textContent = item.q
      quizChoices.innerHTML = ""
      item.a.forEach((txt, idx) => {
        const b = document.createElement("button")
        b.type = "button"
        b.className = "chip-btn"
        b.textContent = txt
        b.addEventListener("click", () => {
          const good = idx === item.ok
          if (good) score++
          quizHint.textContent = good ? "✅ Bien joué" : "❌ Raté"
          setTimeout(() => {
            i++
            quizHint.textContent = ""
            if (i >= data.length) {
              quizQ.textContent = `Terminé: ${score}/${data.length}`
              quizChoices.innerHTML = ""
              return
            }
            render()
          }, 600)
        })
        quizChoices.appendChild(b)
      })
    }

    quizStart.addEventListener("click", () => {
      i = 0
      score = 0
      render()
    })
  })

  /* ===== Snake ===== */

  safe("snake", () => {
    const snakeCanvas = $("#snake")
    const snakeScoreEl = $("#snakeScore")
    const snakeStartBtn = $("#snakeStart")
    const snakePauseBtn = $("#snakePause")
    if (!snakeCanvas || !snakeStartBtn || !snakePauseBtn || !snakeScoreEl) return

    const ctx = snakeCanvas.getContext("2d")
    const grid = 20
    const tile = snakeCanvas.width / grid

    let interval = null
    let paused = false
    let dir = { x: 1, y: 0 }
    let snake = [{ x: 10, y: 10 }]
    let food = { x: 15, y: 15 }
    let score = 0

    const init = () => {
      snake = [{ x: 10, y: 10 }]
      dir = { x: 1, y: 0 }
      food = { x: 15, y: 15 }
      score = 0
      snakeScoreEl.textContent = "0"
    }

    const setDir = (nx, ny) => {
      const rx = -dir.x
      const ry = -dir.y
      if (snake.length > 1 && nx === rx && ny === ry) return
      dir = { x: nx, y: ny }
    }

    const rndFood = () => {
      food = { x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid) }
    }

    const draw = () => {
      ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height)
      ctx.fillStyle = "rgba(46,229,157,.95)"
      ctx.fillRect(food.x * tile, food.y * tile, tile - 2, tile - 2)
      ctx.fillStyle = "rgba(124,92,255,.95)"
      snake.forEach((s) => ctx.fillRect(s.x * tile, s.y * tile, tile - 2, tile - 2))
    }

    const step = () => {
      if (paused) return

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

      if (head.x < 0) head.x = grid - 1
      if (head.x >= grid) head.x = 0
      if (head.y < 0) head.y = grid - 1
      if (head.y >= grid) head.y = 0

      if (snake.some((p) => p.x === head.x && p.y === head.y)) {
        clearInterval(interval)
        interval = null
        alert("Perdu 😭 score: " + score)
        return
      }

      snake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        score++
        snakeScoreEl.textContent = String(score)
        rndFood()
      } else {
        snake.pop()
      }

      draw()
    }

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

    snakeStartBtn.addEventListener("click", () => {
      if (interval) return
      init()
      paused = false
      snakePauseBtn.textContent = "Pause"
      draw()
      interval = setInterval(step, 120)
    })

    snakePauseBtn.addEventListener("click", () => {
      paused = !paused
      snakePauseBtn.textContent = paused ? "Reprendre" : "Pause"
    })
  })

  /* ===== Gallery modal ===== */

  safe("gallery", () => {
    const imgModal = $("#imgModal")
    const modalImg = $("#modalImg")
    const imgClose = $("#imgClose")
    if (!imgModal || !modalImg) return

    const close = () => {
      imgModal.classList.remove("open")
      imgModal.setAttribute("aria-hidden", "true")
    }

    $$(".g-item").forEach((it) => {
      it.addEventListener("click", () => {
        const src = it.getAttribute("data-img")
        if (!src) return
        modalImg.src = src
        imgModal.classList.add("open")
        imgModal.setAttribute("aria-hidden", "false")
      })
    })

    if (imgClose) imgClose.addEventListener("click", close)
    imgModal.addEventListener("click", (e) => {
      if (e.target === imgModal) close()
    })
  })

  /* ===== Music ===== */

  safe("music", () => {
    const music = $("#music")
    const musicToggle = $("#musicToggle")
    const musicVol = $("#musicVol")
    const musicStatus = $("#musicStatus")
    if (!music || !musicToggle || !musicVol || !musicStatus) return

    const setStatus = () => {
      musicStatus.textContent = music.paused ? "en pause" : "en lecture"
    }

    music.volume = Number(musicVol.value)
    musicVol.addEventListener("input", () => {
      music.volume = Number(musicVol.value)
    })

    musicToggle.addEventListener("click", async () => {
      try {
        if (music.paused) await music.play()
        else music.pause()
        setStatus()
        musicToggle.textContent = music.paused ? "Play" : "Pause"
      } catch {
        alert("Ajoute un fichier music.mp3 à la racine pour activer la musique")
      }
    })

    setStatus()
  })

  /* ===== Chat bot local ===== */

  safe("chat", () => {
    const chatLog = $("#chatLog")
    const chatInput = $("#chatInput")
    const chatSend = $("#chatSend")
    if (!chatLog || !chatInput || !chatSend) return

    const addBubble = (text, who) => {
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

    const send = () => {
      const v = chatInput.value
      if (!v.trim()) return
      addBubble(v, "me")
      chatInput.value = ""
      setTimeout(() => addBubble(botReply(v), "bot"), 240)
    }

    chatSend.addEventListener("click", send)
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send()
    })
  })

  /* ===== Mini assistant ===== */

  safe("assistant", () => {
    const assistantOut = $("#assistantOut")
    if (!assistantOut) return

    const answers = {
      "Donne moi un objectif sport cette semaine": "3 séances: 1 cardio, 1 renfo, 1 foot + étirements après",
      "Donne moi un conseil pour progresser en CSS": "1 composant par jour: bouton, card, navbar, puis améliore",
      "Donne moi une idée de projet simple en JavaScript": "Mini tracker tâches + localStorage + filtres",
    }

    $$("[data-ask]").forEach((b) => {
      b.addEventListener("click", () => {
        const k = b.getAttribute("data-ask")
        assistantOut.textContent = answers[k] || "Pas trouvé"
      })
    })
  })

  console.log("GOD MODE JS OK (SAFE)")
})()

