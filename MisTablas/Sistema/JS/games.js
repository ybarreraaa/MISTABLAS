/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Minijuegos Interactivos y Dinámicos de Acción y Comprensión
 */

class GamesModule {
  constructor(app) {
    this.app = app;
    this.currentGame = null;
    this.timerInterval = null;
    this.animationFrameId = null;
    this.gameScore = 0;
    this.streak = 0;
  }

  init() {
    this.setupArenaEvents();
  }

  setupArenaEvents() {
    const closeBtn = document.getElementById('arenaCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.app.sound.playClick();
        this.closeArena();
      });
    }
  }

  openArena(title, gameType) {
    this.currentGame = gameType;
    this.gameScore = 0;
    this.streak = 0;
    clearInterval(this.timerInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const overlay = document.getElementById('gameArenaOverlay');
    const titleEl = document.getElementById('arenaTitle');
    const scoreEl = document.getElementById('arenaScore');
    const streakEl = document.getElementById('arenaStreak');

    if (titleEl) titleEl.textContent = title;
    if (scoreEl) scoreEl.textContent = '0 pts';
    if (streakEl) streakEl.textContent = '0 racha';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.app.sound.playWhoosh();
  }

  closeArena() {
    clearInterval(this.timerInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    const overlay = document.getElementById('gameArenaOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const body = document.getElementById('arenaBody');
    if (body) body.innerHTML = '';
    this.app.updateHeaderStats();
  }

  addGamePoints(pts) {
    this.gameScore += pts;
    this.streak++;
    this.app.addScore(pts);
    const scoreEl = document.getElementById('arenaScore');
    const streakEl = document.getElementById('arenaStreak');
    if (scoreEl) scoreEl.textContent = `${this.gameScore} pts`;
    if (streakEl) streakEl.textContent = `🔥 ${this.streak}`;
  }

  resetStreak() {
    this.streak = 0;
    const streakEl = document.getElementById('arenaStreak');
    if (streakEl) streakEl.textContent = '0 racha';
  }

  /* =========================================================================
     JUEGO 1: TIRO AL BLANCO MATEMÁTICO (DIANA DE ESTRELLAS KAWAII)
     100% intuitivo, divertido y con proyectiles de estrellas animadas
     ========================================================================= */
  startTargetShootingGame() {
    this.openArena('🎯 Tiro al Blanco Matemático: Diana de Estrellas', 'target');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 7;
    const student = this.app.getStudent();
    const myAvatar = student.avatar || 'creature2.svg';

    body.innerHTML = `
      <div class="target-shooting-arena" id="shootingArena">
        <!-- Banner del Objetivo -->
        <div class="shooting-target-banner">
          <div style="font-size:0.9rem; font-weight:800; color:#cbd5e1; text-transform:uppercase;">
            🎯 ¡Apunta a la diana con el resultado correcto! • Ronda <span id="shootingRoundNum">1</span>/${maxRounds}
          </div>
          <div class="shooting-formula" id="shootingFormula">-- × -- = ?</div>
          <div id="shootingHint" class="catch-hint-pill" style="display:none;"></div>
        </div>

        <!-- Zona de Dianas Flotantes -->
        <div class="shooting-targets-grid" id="shootingTargetsGrid"></div>

        <!-- Mascota Tiradora Abajo -->
        <div class="shooting-player-row">
          <div class="shooting-mascot-box">
            <img src="IMAGEN/${myAvatar}" alt="Mascota" class="mascot-avatar-bob" style="width:72px; height:72px;">
            <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:900; color:#facc15;">
              ¡Toca la diana correcta! ⭐
            </div>
          </div>
        </div>
      </div>
    `;

    const nextShootingRound = () => {
      if (round >= maxRounds) {
        this.app.sound.playLevelUp();
        this.app.triggerConfetti();
        this.finishGameModal('¡Puntería Maestra de Campeón! 🎯', `¡Acertaste a todas las dianas con disparos de estrellas mágicas! Ganaste ${this.gameScore} monedas.`);
        return;
      }

      round++;
      const roundEl = document.getElementById('shootingRoundNum');
      if (roundEl) roundEl.textContent = round;

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      const formulaEl = document.getElementById('shootingFormula');
      const hintEl = document.getElementById('shootingHint');
      if (formulaEl) formulaEl.textContent = `${a} × ${b} = ?`;
      if (hintEl) hintEl.style.display = 'none';

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && fake !== ans && !opts.includes(fake)) {
          opts.push(fake);
        }
      }
      opts.sort(() => Math.random() - 0.5);

      const grid = document.getElementById('shootingTargetsGrid');
      if (!grid) return;
      grid.innerHTML = '';

      const targetColors = [
        'radial-gradient(circle at 35% 35%, #ffffff 0%, #38bdf8 30%, #0284c7 100%)',
        'radial-gradient(circle at 35% 35%, #ffffff 0%, #f472b6 30%, #db2777 100%)',
        'radial-gradient(circle at 35% 35%, #ffffff 0%, #34d399 30%, #059669 100%)',
        'radial-gradient(circle at 35% 35%, #ffffff 0%, #fbbf24 30%, #d97706 100%)'
      ];

      opts.forEach((opt, idx) => {
        const targetBtn = document.createElement('div');
        targetBtn.className = 'floating-target-bullseye';
        targetBtn.style.background = targetColors[idx % targetColors.length];
        targetBtn.style.animationDelay = `${idx * 0.25}s`;
        targetBtn.innerHTML = `
          <div class="bullseye-ring">
            <span class="bullseye-number">${opt}</span>
          </div>
        `;

        targetBtn.addEventListener('click', (e) => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            this.app.sound.playStar();
            targetBtn.classList.add('hit-explode');
            this.addGamePoints(150);

            // Efecto de estrella mágica voladora hacia la diana
            const star = document.createElement('div');
            star.className = 'flying-shooting-star';
            star.textContent = '⭐';
            document.getElementById('shootingArena').appendChild(star);
            setTimeout(() => star.remove(), 400);

            setTimeout(nextShootingRound, 550);
          } else {
            this.app.sound.playIncorrect();
            targetBtn.classList.add('wrong-shake');
            setTimeout(() => targetBtn.classList.remove('wrong-shake'), 400);
            if (hintEl) {
              hintEl.style.display = 'inline-block';
              hintEl.textContent = `💡 ${a} × ${b} es ${ans}. ¡Apunta a la diana ${ans}!`;
            }
            this.resetStreak();
          }
        });

        grid.appendChild(targetBtn);
      });
    };

    nextShootingRound();
  }

  /* Alias para compatibilidad */
  startGroupBuilderGame() {
    this.startTargetShootingGame();
  }

  /* =========================================================================
     JUEGO 2: ATRAPA-BURBUJAS EN EL RÍO MÁGICO (CON FÍSICAS EN TIEMPO REAL)
     Burbujas en movimiento fluido continuo rebotando por la pantalla
     ========================================================================= */
  startCatchMonsterGame() {
    this.openArena('🌊 Atrapa-Burbujas en el Río Mágico', 'catch');
    const body = document.getElementById('arenaBody');

    body.innerHTML = `
      <div class="catch-river-arena" id="catchRiverArena">
        <div class="catch-target-box">
          <div style="font-size:0.85rem; font-weight:800; color:#cbd5e1; text-transform:uppercase;">Atrapa el resultado de:</div>
          <div class="catch-target-formula" id="catchTargetFormula">6 × 7 = ?</div>
          <div id="catchHintBox" class="catch-hint-pill" style="display:none;"></div>
        </div>
        <div id="catchBubbleContainer" style="width:100%; height:100%; position:relative; overflow:hidden;"></div>
      </div>
    `;

    const container = document.getElementById('catchBubbleContainer');
    const formulaEl = document.getElementById('catchTargetFormula');
    const hintBox = document.getElementById('catchHintBox');

    let round = 0;
    const maxRounds = 8;
    let bubbles = [];
    let currentAns = 0;
    let hintTimeout = null;

    const spawnRound = () => {
      if (round >= maxRounds) {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Pescador Legendario de Tablas! 🌊', `¡Atrapaste todas las respuestas en movimiento con reflejos increíbles! Puntos ganados: ${this.gameScore}.`);
        return;
      }

      round++;
      container.innerHTML = '';
      bubbles = [];
      clearTimeout(hintTimeout);
      if (hintBox) hintBox.style.display = 'none';

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      currentAns = a * b;

      formulaEl.textContent = `${a} × ${b} = ?`;

      // Pista cariñosa después de 3.5 segundos
      hintTimeout = setTimeout(() => {
        if (hintBox) {
          hintBox.style.display = 'inline-block';
          hintBox.innerHTML = `💡 Pista de apoyo: ${a} veces ${b} es igual a ${currentAns}`;
        }
      }, 3500);

      let options = [currentAns];
      while (options.length < 5) {
        const fake = currentAns + (Math.floor(Math.random() * 7) - 3) * (a <= 4 ? a : 2);
        if (fake > 0 && fake !== currentAns && !options.includes(fake)) {
          options.push(fake);
        }
      }
      options.sort(() => Math.random() - 0.5);

      const colors = [
        'linear-gradient(135deg, #38bdf8, #0284c7)',
        'linear-gradient(135deg, #f472b6, #db2777)',
        'linear-gradient(135deg, #34d399, #059669)',
        'linear-gradient(135deg, #fbbf24, #d97706)',
        'linear-gradient(135deg, #a78bfa, #7c3aed)'
      ];

      options.forEach((val, idx) => {
        const bEl = document.createElement('div');
        bEl.className = 'dynamic-river-bubble';
        bEl.style.background = colors[idx % colors.length];
        bEl.innerHTML = `<span>${val}</span>`;

        const bObj = {
          el: bEl,
          val: val,
          x: 40 + idx * 110,
          y: 60 + Math.random() * 200,
          vx: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.4),
          vy: (Math.random() > 0.5 ? 1 : -1) * (1.1 + Math.random() * 1.3),
          radius: 38
        };

        bEl.addEventListener('click', () => {
          if (val === currentAns) {
            this.app.sound.playCorrect();
            this.app.sound.playStar();
            bEl.classList.add('popped');
            this.addGamePoints(150);

            clearTimeout(hintTimeout);
            setTimeout(spawnRound, 500);
          } else {
            this.app.sound.playIncorrect();
            bEl.style.transform = 'scale(0.85)';
            bEl.style.opacity = '0.5';
            setTimeout(() => {
              bEl.style.transform = 'scale(1)';
              bEl.style.opacity = '1';
            }, 400);
            this.resetStreak();
          }
        });

        container.appendChild(bEl);
        bubbles.push(bObj);
      });
    };

    // Bucle de físicas en tiempo real para movimiento fluido
    const updatePhysics = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || 680;
      const h = rect.height || 420;

      bubbles.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        // Rebote en bordes
        if (b.x < b.radius) { b.x = b.radius; b.vx *= -1; }
        if (b.x > w - b.radius * 2) { b.x = w - b.radius * 2; b.vx *= -1; }
        if (b.y < b.radius) { b.y = b.radius; b.vy *= -1; }
        if (b.y > h - b.radius * 2) { b.y = h - b.radius * 2; b.vy *= -1; }

        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
      });

      this.animationFrameId = requestAnimationFrame(updatePhysics);
    };

    spawnRound();
    updatePhysics();
  }

  /* =========================================================================
     JUEGO 3: BATALLA RPG DE CRIATURAS (ATAQUES MÁGICOS Y DUELOS)
     ========================================================================= */
  startCreatureBattleGame() {
    this.openArena('⚔️ Batalla Épica de Criaturas Pokémon-Cute', 'battle');
    const body = document.getElementById('arenaBody');

    let bossHP = 100;
    const student = this.app.getStudent();
    const myAvatar = student.avatar || 'creature2.svg';

    body.innerHTML = `
      <div class="battle-arena">
        <div class="battle-characters-row">
          <!-- Mi Criatura -->
          <div class="battle-char-box">
            <div style="font-family:'Fredoka',sans-serif; font-size:1.15rem; font-weight:800; color:#4f46e5;">Tu Mascota</div>
            <img id="myBattleImg" src="IMAGEN/${myAvatar}" style="width:96px; height:96px; transition:all 0.25s;" alt="Tu criatura">
            <div class="battle-hp-bar"><div class="battle-hp-fill" style="width:100%;"></div></div>
          </div>

          <!-- VS Badge con energía -->
          <div style="text-align:center;">
            <div style="font-family:'Fredoka',sans-serif; font-size:2rem; font-weight:900; color:#ef4444; animation:pulseGlow 2s infinite;">VS</div>
            <div id="battleEnergyPill" style="font-size:0.85rem; font-weight:800; color:#b45309; background:#fef08a; padding:3px 10px; border-radius:9999px;">
              ⚡ Turno de Ataque
            </div>
          </div>

          <!-- Rival Boss -->
          <div class="battle-char-box">
            <div style="font-family:'Fredoka',sans-serif; font-size:1.15rem; font-weight:800; color:#9333ea;">Dragón Guardián</div>
            <img id="rivalBattleImg" src="IMAGEN/boss_dragon.svg" style="width:105px; height:105px; transition:all 0.25s;" alt="Rival">
            <div class="battle-hp-bar"><div id="rivalHpFill" class="battle-hp-fill" style="background:#a855f7; width:100%;"></div></div>
          </div>
        </div>

        <div id="battleSpecialBanner" style="display:none; background:#fef08a; border:2px solid #eab308; color:#854d0e; font-family:'Fredoka',sans-serif; font-weight:800; padding:6px 14px; border-radius:9999px; margin-bottom:12px; font-size:1.1rem;">
          ⚡ ¡ATAQUE ESPECIAL ACTIVADO! (Doble Poder) ⚡
        </div>

        <div id="battlePrompt" style="font-family:'Fredoka',sans-serif; font-size:2.8rem; color:#1e1b4b; font-weight:900; margin-bottom:18px;">
          -- × -- = ?
        </div>

        <div id="battleChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:14px; max-width:440px; margin:0 auto;"></div>
      </div>
    `;

    const nextRound = () => {
      if (bossHP <= 0) {
        this.app.sound.playLevelUp();
        this.app.triggerConfetti();
        this.finishGameModal('¡Victoria en la Batalla Épica! 👑', `¡Derrotaste al Dragón Guardián con tus multiplicaciones y protegiste a tus mascotas! Puntos: ${this.gameScore}.`);
        return;
      }

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const ans = a * b;

      document.getElementById('battlePrompt').textContent = `${a} × ${b} = ?`;

      const isSpecial = this.streak >= 2;
      const specialBanner = document.getElementById('battleSpecialBanner');
      if (specialBanner) specialBanner.style.display = isSpecial ? 'inline-block' : 'none';

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const choicesBox = document.getElementById('battleChoices');
      choicesBox.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            const dmg = isSpecial ? 50 : 25;
            bossHP = Math.max(0, bossHP - dmg);
            this.addGamePoints(150);

            const myImg = document.getElementById('myBattleImg');
            const rivalImg = document.getElementById('rivalBattleImg');
            if (myImg) myImg.style.transform = 'scale(1.25) translateX(30px)';
            if (rivalImg) {
              rivalImg.style.transform = 'rotate(15deg) scale(0.85)';
              rivalImg.style.filter = 'sepia(1) hue-rotate(300deg)';
            }
            document.getElementById('rivalHpFill').style.width = `${bossHP}%`;

            setTimeout(() => {
              if (myImg) myImg.style.transform = 'none';
              if (rivalImg) {
                rivalImg.style.transform = 'none';
                rivalImg.style.filter = 'none';
              }
              nextRound();
            }, 600);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
            if (specialBanner) specialBanner.style.display = 'none';
          }
        });

        choicesBox.appendChild(btn);
      });
    };

    nextRound();
  }

  /* =========================================================================
     JUEGO 4: CARRERA MATEMÁTICA CON NITRO Y PISTA
     ========================================================================= */
  startMathRaceGame() {
    this.openArena('🏎️ Carrera Matemática Turbo', 'race');
    const body = document.getElementById('arenaBody');

    let playerPos = 20;
    let rivalPos = 20;
    const finishLine = 560;
    let questionStartTime = Date.now();

    body.innerHTML = `
      <div class="race-track-box">
        <h3 style="text-align:center; margin-bottom:14px; font-size:1.5rem; color:#f8fafc;">
          ¡Pisa el Nitro y llega antes a la meta!
        </h3>

        <!-- Carril Jugador -->
        <div class="race-lane">
          <div id="playerRunner" class="race-runner" style="left: 20px;">🚗💨</div>
          <div class="race-finish-line">🏁</div>
        </div>

        <!-- Carril Rival -->
        <div class="race-lane">
          <div id="rivalRunner" class="race-runner" style="left: 20px;">🏎️</div>
          <div class="race-finish-line">🏁</div>
        </div>

        <div style="background:#1e1b4b; border-radius:20px; padding:20px; margin-top:20px; text-align:center;">
          <div id="racePrompt" style="font-family:'Fredoka',sans-serif; font-size:2.6rem; color:#facc15; font-weight:900; margin-bottom:16px;">-- × --</div>
          <div id="raceChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:400px; margin:0 auto;"></div>
        </div>
      </div>
    `;

    const nextRaceLap = () => {
      if (playerPos >= finishLine) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡1er Lugar en la Carrera! 🥇', `¡Cruzaste la meta a toda velocidad con nitro turbo! Puntos ganados: ${this.gameScore}.`);
        return;
      }

      rivalPos += 45;
      const rivalEl = document.getElementById('rivalRunner');
      if (rivalEl) rivalEl.style.left = `${Math.min(finishLine - 40, rivalPos)}px`;

      questionStartTime = Date.now();
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('racePrompt').textContent = `${a} × ${b} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('raceChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          const elapsed = (Date.now() - questionStartTime) / 1000;
          if (opt === ans) {
            this.app.sound.playCorrect();
            const isTurbo = elapsed < 2.5;
            playerPos += isTurbo ? 140 : 90;
            this.addGamePoints(isTurbo ? 200 : 120);

            const runnerEl = document.getElementById('playerRunner');
            runnerEl.style.left = `${Math.min(finishLine, playerPos)}px`;
            if (isTurbo) {
              runnerEl.innerHTML = '🚀🔥';
              setTimeout(() => { runnerEl.innerHTML = '🚗💨'; }, 600);
            }

            setTimeout(nextRaceLap, 400);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextRaceLap();
  }

  /* =========================================================================
     JUEGO 5: MEMORIA MÁGICA 3D (EMPAREJA OPERACIÓN Y RESULTADO)
     ========================================================================= */
  startMemoryMultiplicationGame() {
    this.openArena('🃏 Memoria Mágica 3D', 'memory');
    const body = document.getElementById('arenaBody');

    const pairs = [
      { id: 1, text: '3 × 4', matchId: 1, type: 'op' },
      { id: 1, text: '12', matchId: 1, type: 'res' },
      { id: 2, text: '5 × 6', matchId: 2, type: 'op' },
      { id: 2, text: '30', matchId: 2, type: 'res' },
      { id: 3, text: '7 × 8', matchId: 3, type: 'op' },
      { id: 3, text: '56', matchId: 3, type: 'res' },
      { id: 4, text: '9 × 4', matchId: 4, type: 'op' },
      { id: 4, text: '36', matchId: 4, type: 'res' }
    ];

    pairs.sort(() => Math.random() - 0.5);

    body.innerHTML = `
      <div style="text-align:center; max-width:620px; width:100%;">
        <div style="font-family:'Fredoka',sans-serif; font-size:1.3rem; color:#f8fafc; margin-bottom:14px;">
          Encuentra las parejas: relaciona cada multiplicación con su resultado
        </div>
        <div class="memory-board" id="memoryGrid"></div>
      </div>
    `;

    const grid = document.getElementById('memoryGrid');
    let flippedCards = [];
    let matchedPairs = 0;

    pairs.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'memory-card hidden';
      card.dataset.idx = idx;
      card.textContent = p.text;

      card.addEventListener('click', () => {
        if (card.classList.contains('matched') || !card.classList.contains('hidden') || flippedCards.length >= 2) return;

        this.app.sound.playClick();
        card.classList.remove('hidden');
        flippedCards.push({ card, item: p });

        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
          if (first.item.id === second.item.id && first.item.type !== second.item.type) {
            this.app.sound.playCorrect();
            this.app.sound.playStar();
            first.card.classList.add('matched');
            second.card.classList.add('matched');
            this.addGamePoints(150);
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === 4) {
              setTimeout(() => {
                this.app.sound.playLevelUp();
                this.finishGameModal('¡Memoria Prodigiosa! 🌟', `¡Encontraste todas las parejas de multiplicaciones a la perfección! Puntos: ${this.gameScore}.`);
              }, 600);
            }
          } else {
            this.app.sound.playIncorrect();
            setTimeout(() => {
              first.card.classList.add('hidden');
              second.card.classList.add('hidden');
              flippedCards = [];
            }, 900);
          }
        }
      });

      grid.appendChild(card);
    });
  }

  /* =========================================================================
     JUEGO 6: EL IMPOSTOR MATEMÁTICO (DETECTIVE DE ERRORES)
     ========================================================================= */
  startMathImpostorGame() {
    this.openArena('🕵️ El Impostor Matemático: ¡Encuentra el Error!', 'impostor');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 5;

    const cases = [
      { cards: ['3 × 4 = 12', '5 × 6 = 30', '7 × 3 = 21', '8 × 4 = 34'], impIndex: 3, fix: '8 × 4 = 32' },
      { cards: ['6 × 7 = 42', '9 × 3 = 27', '4 × 8 = 30', '5 × 5 = 25'], impIndex: 2, fix: '4 × 8 = 32' },
      { cards: ['9 × 6 = 54', '7 × 7 = 48', '8 × 5 = 40', '6 × 6 = 36'], impIndex: 1, fix: '7 × 7 = 49' },
      { cards: ['4 × 9 = 36', '3 × 8 = 24', '7 × 8 = 56', '5 × 9 = 48'], impIndex: 3, fix: '5 × 9 = 45' },
      { cards: ['8 × 8 = 64', '6 × 8 = 46', '9 × 9 = 81', '7 × 6 = 42'], impIndex: 1, fix: '6 × 8 = 48' }
    ];

    const nextInvestigation = () => {
      if (round >= maxRounds) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Detective Matemático del Año! 🔎', `¡Descubriste a todos los impostores falsos! Puntos: ${this.gameScore}.`);
        return;
      }

      const curCase = cases[round];
      round++;

      body.innerHTML = `
        <div style="text-align:center; max-width:620px; width:100%;">
          <div style="font-size:2.6rem; margin-bottom:6px;">🔎</div>
          <h3 style="font-size:1.8rem; color:#f8fafc; margin-bottom:6px;">Caso #${round}: ¿Cuál operación es falsa?</h3>
          <p style="color:#cbd5e1; font-weight:600; margin-bottom:18px;">
            Tres tarjetas dicen la verdad y <strong>UNA tiene una mentira</strong>. ¡Descubre al impostor!
          </p>

          <div class="impostor-cards-grid" id="impostorGrid"></div>
          <div id="impostorResolution" style="min-height:50px; margin-top:16px; font-family:'Fredoka',sans-serif; font-size:1.3rem; font-weight:800;"></div>
        </div>
      `;

      const grid = document.getElementById('impostorGrid');
      const resBox = document.getElementById('impostorResolution');

      curCase.cards.forEach((text, idx) => {
        const card = document.createElement('div');
        card.className = 'impostor-card';
        card.textContent = text;

        card.addEventListener('click', () => {
          if (idx === curCase.impIndex) {
            this.app.sound.playCorrect();
            card.style.background = '#dcfce7';
            card.style.borderColor = '#16a34a';
            card.style.color = '#15803d';
            resBox.innerHTML = `🎉 <span style="color:#4ade80;">¡LO ATRAPASTE! El impostor era: ${text}. Lo correcto es: ${curCase.fix}</span>`;
            this.addGamePoints(180);
            setTimeout(nextInvestigation, 1800);
          } else {
            this.app.sound.playIncorrect();
            card.style.background = '#fee2e2';
            card.style.borderColor = '#dc2626';
            resBox.innerHTML = `❌ <span style="color:#f87171;">"${text}" es verdadera. ¡Busca la que tiene el error!</span>`;
            this.resetStreak();
          }
        });

        grid.appendChild(card);
      });
    };

    nextInvestigation();
  }

  /* =========================================================================
     JUEGO 7: COMBO RELÁMPAGO (60 SEGUNDOS)
     ========================================================================= */
  startLightningComboGame() {
    this.openArena('⚡ Combo Relámpago (60 Segundos)', 'combo');
    const body = document.getElementById('arenaBody');

    let timeLeft = 60;
    body.innerHTML = `
      <div style="text-align:center; max-width:480px; width:100%; background:#1e1b4b; border-radius:24px; padding:28px; border:3.5px solid #f59e0b;">
        <div style="font-size:1.15rem; font-weight:800; color:#fbbf24; margin-bottom:8px;">⏱️ TIEMPO: <span id="comboTimerNum">60</span>s</div>
        <div id="comboPrompt" style="font-family:'Fredoka',sans-serif; font-size:3.2rem; color:#ffffff; font-weight:900; margin-bottom:20px;">-- × --</div>
        <div id="comboChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"></div>
      </div>
    `;

    const timerNum = document.getElementById('comboTimerNum');
    this.timerInterval = setInterval(() => {
      timeLeft--;
      if (timerNum) timerNum.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Tiempo Cumplido en el Combo Relámpago! ⚡', `¡Lograste un puntaje impresionante de ${this.gameScore} puntos con multiplicador activo!`);
      }
    }, 1000);

    const nextComboRound = () => {
      if (timeLeft <= 0) return;
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('comboPrompt').textContent = `${a} × ${b}`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('comboChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            const comboMultiplier = Math.min(4, Math.floor(this.streak / 2) + 1);
            this.addGamePoints(100 * comboMultiplier);
            nextComboRound();
          } else {
            this.app.sound.playIncorrect();
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextComboRound();
  }

  /* Minijuegos adicionales de apoyo */
  startDangerousPathGame() {
    this.startGroupBuilderGame();
  }

  startCastleDefenseGame() {
    this.startCreatureBattleGame();
  }

  startLostTreasureGame() {
    this.startCatchMonsterGame();
  }

  /* Misión Especial de Zona (Batalla con el Jefe de la Zona) */
  startSpecialMission(tablesList, zoneName) {
    this.openArena(`👑 Duelo con el Jefe de ${zoneName}`, 'boss');
    const body = document.getElementById('arenaBody');

    let bossHP = 100;
    body.innerHTML = `
      <div class="battle-arena">
        <h3 style="font-size:1.6rem; color:#1e1b4b; margin-bottom:12px;">
          👑 Gran Duelo de Zona: ${zoneName}
        </h3>
        <p style="font-size:1.05rem; color:#475569; font-weight:600; margin-bottom:16px;">
          Responde las preguntas de las <strong>Tablas: ${tablesList.join(' y ')}</strong> para derrotar al Jefe Guardián.
        </p>

        <div class="battle-characters-row">
          <div class="battle-char-box">
            <div style="font-size:1.1rem; font-weight:800; color:#4f46e5;">Tu Mascota</div>
            <img src="IMAGEN/${this.app.getStudent().avatar || 'creature2.svg'}" style="width:90px; height:90px;" alt="Tu criatura">
          </div>
          <div style="font-size:2rem; font-weight:900; color:#ef4444;">VS</div>
          <div class="battle-char-box">
            <div style="font-size:1.1rem; font-weight:800; color:#b45309;">Jefe Guardián</div>
            <img id="zoneBossImg" src="IMAGEN/boss_dragon.svg" style="width:105px; height:105px; transition:transform 0.2s;" alt="Jefe">
            <div class="battle-hp-bar"><div id="zoneBossHpFill" class="battle-hp-fill" style="background:#ea580c; width:100%;"></div></div>
          </div>
        </div>

        <div id="bossPrompt" style="font-family:'Fredoka',sans-serif; font-size:2.8rem; color:#1e1b4b; font-weight:900; margin:16px 0;">-- × -- = ?</div>
        <div id="bossChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:400px; margin:0 auto;"></div>
      </div>
    `;

    const nextBossTurn = () => {
      if (bossHP <= 0) {
        this.app.sound.playLevelUp();
        this.app.triggerConfetti();
        this.finishGameModal(`¡Victoria Legendaria en ${zoneName}! 🏆`, `¡Superaste al Jefe Guardián de la zona y obtuviste la Gran Medalla! Puntos ganados: ${this.gameScore}.`);
        return;
      }

      const t = tablesList[Math.floor(Math.random() * tablesList.length)];
      const k = Math.floor(Math.random() * 9) + 2;
      const ans = t * k;

      document.getElementById('bossPrompt').textContent = `${t} × ${k} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('bossChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            bossHP = Math.max(0, bossHP - 25);
            this.addGamePoints(200);

            const bImg = document.getElementById('zoneBossImg');
            if (bImg) bImg.style.transform = 'scale(0.85) rotate(15deg)';
            document.getElementById('zoneBossHpFill').style.width = `${bossHP}%`;

            setTimeout(() => {
              if (bImg) bImg.style.transform = 'none';
              nextBossTurn();
            }, 500);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextBossTurn();
  }

  finishGameModal(title, msg) {
    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div style="background:#ffffff; border-radius:28px; padding:36px; max-width:540px; text-align:center; border:4px solid #facc15; box-shadow:0 25px 50px rgba(0,0,0,0.4); animation:rubberBand 0.7s;">
        <div style="font-size:3.5rem; margin-bottom:8px;">🏆</div>
        <h3 style="font-size:2.2rem; color:#1e1b4b; margin-bottom:12px;">${title}</h3>
        <p style="font-size:1.2rem; color:#475569; font-weight:600; line-height:1.5; margin-bottom:24px;">${msg}</p>
        <button type="button" class="btn btn-primary" id="btnFinishArena" style="font-size:1.25rem; padding:14px 34px;">
          <span>Continuar Aventura</span> 🚀
        </button>
      </div>
    `;

    document.getElementById('btnFinishArena').addEventListener('click', () => {
      this.closeArena();
    });
  }
}
