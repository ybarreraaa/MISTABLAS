/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Motor Principal (Aventura, Zonas, Audio Polifónico, Racha, Navegación y Colección)
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('misTablas_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('misTablas_muted', this.muted);
    return this.muted;
  }

  /* Sonido suave de clic / pop al presionar botones y pestañas */
  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  /* Alias para compatibilidad */
  playPop() {
    this.playClick();
  }

  /* Sonido alegre y triunfal cuando una respuesta está correcta (Do-Mi-Sol-Do agudo) */
  playCorrect() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Arpegio Do Mayor dulce y brillante
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.22);
      });
    } catch (e) {}
  }

  /* Alias para compatibilidad */
  playSuccess() {
    this.playCorrect();
  }

  /* Sonido amistoso y suave cuando la respuesta es incorrecta (dos tonos descendentes suaves) */
  playIncorrect() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(280, now);
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(200, now + 0.16);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.32);
      gain2.gain.setValueAtTime(0.16, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.35);
    } catch (e) {}
  }

  /* Alias para compatibilidad */
  playError() {
    this.playIncorrect();
  }

  /* Sonido brillante de tintineo de monedas tipo tesoro (Si5 -> Mi6) */
  playCoin() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  /* Sonido mágico de estrellas / premios (cascada arpegiada de campanitas) */
  playStar() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const starNotes = [739.99, 880.00, 1108.73, 1479.98];
      starNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.16, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  /* Fanfarria gloriosa de subida de nivel, zona conquistada o victoria de jefe */
  playLevelUp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const fanfare = [
        { f: 523.25, d: 0.1 },  // Do
        { f: 659.25, d: 0.1 },  // Mi
        { f: 783.99, d: 0.1 },  // Sol
        { f: 1046.50, d: 0.22 }, // Do alto
        { f: 880.00, d: 0.12 }, // La
        { f: 1046.50, d: 0.45 }  // Do sostenido triunfal
      ];
      let offset = 0;
      fanfare.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = note.f;
        gain.gain.setValueAtTime(0.22, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + note.d);
        offset += note.d * 0.85;
      });
    } catch (e) {}
  }

  /* Sonido suave de deslizamiento / apertura de modal */
  playWhoosh() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }
}

class App {
  constructor() {
    this.sound = new SoundEngine();
    this.student = this.loadStudent();
    this.tablesModule = null;
    this.gamesModule = null;
    this.simceModule = null;
  }

  init() {
    if (!this.student || !this.student.name) {
      window.location.href = '../index.html';
      return;
    }

    // Default stats if fresh
    if (!this.student.streakDays) this.student.streakDays = 3;
    if (!this.student.unlockedZones) this.student.unlockedZones = [1];
    if (!this.student.completedTables) this.student.completedTables = [];

    this.tablesModule = new TablesModule(this);
    this.gamesModule = new GamesModule(this);
    this.simceModule = new SimceModule(this);

    this.tablesModule.init();
    this.gamesModule.init();
    this.simceModule.init();

    this.renderUserProfile();
    this.updateHeaderStats();
    this.setupDockNavigation();
    this.setupSoundButton();
    this.setupActionGameCards();
    this.renderAdventureZones();
    this.renderCollectionGrid();
    this.setupDailyChallenge();
    this.setupContinueAdventureBtn();

    setTimeout(() => {
      this.showToast(`✨ ¡Bienvenido a Mundo Multiplica, ${this.student.name}!`, 'success');
    }, 400);
  }

  loadStudent() {
    try {
      const data = localStorage.getItem('misTablas_student');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error loading student', e);
    }
    return null;
  }

  getStudent() {
    return this.student;
  }

  saveStudent(studentObj) {
    this.student = studentObj;
    localStorage.setItem('misTablas_student', JSON.stringify(this.student));
    this.updateHeaderStats();
    this.renderCollectionGrid();
  }

  addScore(pts) {
    this.student.score = (this.student.score || 0) + pts;
    this.sound.playCoin();
    this.saveStudent(this.student);
  }

  renderUserProfile() {
    const avatarEl = document.getElementById('headerAvatarImg');
    const nameEl = document.getElementById('headerStudentName');
    const bannerNameEl = document.getElementById('bannerStudentName');

    if (avatarEl && this.student.avatar) {
      avatarEl.src = `IMAGEN/${this.student.avatar}`;
      avatarEl.alt = this.student.avatarName || 'Avatar';
    }
    if (nameEl) nameEl.textContent = this.student.name;
    if (bannerNameEl) bannerNameEl.textContent = this.student.name;
  }

  updateHeaderStats() {
    const scoreVal = document.getElementById('statScoreVal');
    const starsVal = document.getElementById('statStarsVal');
    const levelVal = document.getElementById('statLevelVal');
    const streakVal = document.getElementById('statStreakDaysVal');
    const globalProgressBar = document.getElementById('globalProgressBar');
    const globalProgressText = document.getElementById('globalProgressText');

    let totalStars = 0;
    const progress = this.student.tableProgress || {};
    Object.values(progress).forEach(p => {
      totalStars += (p.stars || 0);
    });

    const completedCount = (this.student.completedTables || []).length;
    const globalPercent = Math.min(100, Math.round((completedCount / 9) * 100));

    // Calculate level based on score & tables
    const lvl = Math.floor((this.student.score || 0) / 400) + 1;

    if (scoreVal) scoreVal.textContent = (this.student.score || 0).toLocaleString();
    if (starsVal) starsVal.textContent = totalStars;
    if (levelVal) levelVal.textContent = `Nivel ${lvl}`;
    if (streakVal) streakVal.textContent = `${this.student.streakDays || 1} días`;

    if (globalProgressBar) globalProgressBar.style.width = `${globalPercent}%`;
    if (globalProgressText) globalProgressText.textContent = `${globalPercent}%`;

    if (this.simceModule) {
      this.simceModule.updateNavBadge();
    }
  }

  /* Sincronización de Navegación (Tanto Barra Superior como Accesos Rápidos) */
  setupDockNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn, .dock-btn, [data-tab]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.sound.playClick();
        const tab = btn.dataset.tab || btn.getAttribute('data-tab');
        if (tab) this.switchMainTab(tab);
      });
    });

    // Logo interactivo para volver al mapa de aventura
    const brand = document.querySelector('.brand-wrapper');
    if (brand) {
      brand.style.cursor = 'pointer';
      brand.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('adventure');
      });
    }

    // Píldora de guía en banner de saludo
    const guidePill = document.getElementById('btnGuideBannerPill');
    if (guidePill) {
      guidePill.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('guide');
      });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        this.sound.playClick();
        const confirmExit = confirm('¿Deseas cambiar de estudiante o volver al inicio?');
        if (confirmExit) window.location.href = '../index.html';
      });
    }

    // Atajo de teclado: Tecla Escape cierra modales abiertos
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const tableModal = document.getElementById('tableModalOverlay');
        const arenaModal = document.getElementById('gameArenaOverlay');
        if (tableModal && tableModal.classList.contains('open') && this.tablesModule) {
          this.tablesModule.closeTableModal();
        }
        if (arenaModal && arenaModal.classList.contains('open') && this.gamesModule) {
          this.gamesModule.closeArena();
        }
      }
    });
  }

  switchMainTab(tabName) {
    this.sound.playWhoosh();

    // Toggle active state on all navigation buttons
    document.querySelectorAll('.nav-tab-btn, .dock-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(`section-${tabName}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Dynamic renders on tab switch
    if (tabName === 'collection') this.renderCollectionGrid();
    if (tabName === 'adventure') this.renderAdventureZones();
    if (tabName === 'tables' && this.tablesModule) this.tablesModule.renderTablesGrid();
    if (tabName === 'guide' && this.tablesModule) this.tablesModule.renderMasterGuide();
    if (tabName === 'simce' && this.simceModule) this.simceModule.renderSimceState();
  }

  /* "Continuar Aventura": Lleva al niño directamente a la siguiente tabla pendiente */
  setupContinueAdventureBtn() {
    const btn = document.getElementById('btnContinueAdventure');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.sound.playCorrect();
      const completed = this.student.completedTables || [];
      let targetTable = 2;
      for (let t = 2; t <= 10; t++) {
        if (!completed.includes(t)) {
          targetTable = t;
          break;
        }
      }
      this.switchMainTab('tables');
      this.tablesModule.openTableModal(targetTable);
    });
  }

  /* Render 5 Adventure Zones */
  renderAdventureZones() {
    const container = document.getElementById('adventureZonesGrid');
    if (!container) return;
    container.innerHTML = '';

    const completed = this.student.completedTables || [];

    const zones = [
      {
        id: 1,
        name: "Bosque del 2 y 3",
        tables: [2, 3],
        img: "zone_forest.svg",
        color: "#10b981",
        mascot: "Chispa-Ratón ⚡ y Fuchy-Zorrito 🦊",
        unlocked: true,
        desc: "Un bosque encantado de árboles altos y hojas brillantes donde aprendes los dobles y triples."
      },
      {
        id: 2,
        name: "Volcán del 4 y 5",
        tables: [4, 5],
        img: "zone_volcano.svg",
        color: "#ea580c",
        mascot: "Pingüi-Frost 🐧 y Drako-Verde 🐲",
        unlocked: completed.includes(2) || completed.includes(3),
        desc: "Tierra de fuego y lava dorada donde dominarás el 'doble del doble' y los saltos de 5 en 5."
      },
      {
        id: 3,
        name: "Océano del 6 y 7",
        tables: [6, 7],
        img: "zone_ocean.svg",
        color: "#0284c7",
        mascot: "Axo-Rosa 🌸 y Gati-Cósmico 🐱",
        unlocked: completed.includes(4) || completed.includes(5),
        desc: "Aguas cristalinas con cristales matemáticos de 6 y 7 lados y perlas escondidas."
      },
      {
        id: 4,
        name: "Ciudad Eléctrica del 8 y 9",
        tables: [8, 9],
        img: "zone_city.svg",
        color: "#7c3aed",
        mascot: "Panda-Bambú 🐼 y Buhito-Sabio 🦉",
        unlocked: completed.includes(6) || completed.includes(7),
        desc: "Rascacielos iluminados con la mágica suma del 9 y los superpoderes del 8."
      },
      {
        id: 5,
        name: "Castillo del 10",
        tables: [10],
        img: "zone_castle.svg",
        color: "#f59e0b",
        mascot: "Estrellín-Solar ⭐ (¡Guardián del SIMCE!)",
        unlocked: completed.length >= 3,
        desc: "La fortaleza dorada suprema donde se rinde el gran Ensayo Matemático tipo SIMCE."
      }
    ];

    zones.forEach(zone => {
      const card = document.createElement('div');
      card.className = `zone-card ${zone.unlocked ? '' : 'locked'}`;
      card.style.borderColor = zone.color;

      const isZoneDone = zone.tables.every(t => completed.includes(t));

      card.innerHTML = `
        <div class="zone-img-preview">
          <img src="IMAGEN/${zone.img}" alt="${zone.name}">
        </div>

        <div class="zone-info-top">
          <h3 class="zone-name" style="color: ${zone.color};">${zone.name}</h3>
          <span style="font-size:0.85rem; font-weight:800; padding:4px 10px; border-radius:9999px; background:${zone.unlocked ? '#dcfce7' : '#f1f5f9'}; color:${zone.unlocked ? '#15803d' : '#64748b'};">
            ${zone.unlocked ? (isZoneDone ? '✅ Dominada' : '🔓 Abierta') : '🔒 Bloqueada'}
          </span>
        </div>

        <p class="zone-desc">${zone.desc}</p>
        <div style="font-size:0.9rem; font-weight:700; color:#475569; margin-bottom:12px;">
          🐾 Mascotas: <strong>${zone.mascot}</strong>
        </div>

        <div class="zone-meta-footer">
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${zone.tables.map(t => `
              <button type="button" class="btn btn-secondary btn-sm open-tbl-btn" data-tbl="${t}">
                📖 Tabla ${t} ${completed.includes(t) ? '★' : ''}
              </button>
            `).join('')}
          </div>

          <div style="display:flex; gap:6px;">
            <button type="button" class="btn btn-primary btn-sm play-zone-btn" data-tables="${zone.tables.join(',')}" data-zone="${zone.name}" title="Minijuegos interactivos de la zona">
              🎮 Jugar
            </button>
            <button type="button" class="btn btn-accent btn-sm boss-zone-btn" data-zone="${zone.name}" data-tables="${zone.tables.join(',')}" title="Batalla con Jefe">
              👑 Jefe
            </button>
            ${zone.id === 5 ? `
              <button type="button" class="btn ${this.simceModule && this.simceModule.isUnlocked() ? 'btn-success' : 'btn-secondary'} btn-sm simce-direct-btn" title="Ir al Ensayo SIMCE">
                ${this.simceModule && this.simceModule.isUnlocked() ? '⭐ SIMCE 🔓' : '🔒 SIMCE'}
              </button>
            ` : ''}
          </div>
        </div>
      `;

      card.querySelectorAll('.open-tbl-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.showToast(`🔒 ¡Región ${zone.name} bloqueada! Completa las anteriores.`, 'star');
            return;
          }
          this.sound.playClick();
          const t = parseInt(btn.dataset.tbl, 10);
          this.tablesModule.openTableModal(t);
        });
      });

      card.querySelectorAll('.play-zone-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.showToast(`🔒 ¡Región ${zone.name} bloqueada! Completa las anteriores.`, 'star');
            return;
          }
          this.sound.playClick();
          this.switchMainTab('games');
        });
      });

      card.querySelectorAll('.boss-zone-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.showToast(`🔒 ¡El Jefe de ${zone.name} está bloqueado! Completa las anteriores.`, 'star');
            return;
          }
          this.sound.playClick();
          const tList = btn.dataset.tables.split(',').map(Number);
          this.gamesModule.startSpecialMission(tList, btn.dataset.zone);
        });
      });

      const simceBtn = card.querySelector('.simce-direct-btn');
      if (simceBtn) {
        simceBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.sound.playClick();
          this.switchMainTab('simce');
        });
      }

      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        if (!zone.unlocked) {
          this.sound.playIncorrect();
          this.showToast('🔒 ¡Completa las zonas anteriores para desbloquear esta!', 'star');
          return;
        }
        this.sound.playClick();
        this.tablesModule.openTableModal(zone.tables[0]);
      });

      container.appendChild(card);
    });
  }

  /* Collection Grid (Pokédex Kawaii de Criaturas) */
  renderCollectionGrid() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const completed = this.student.completedTables || [];

    for (let t = 2; t <= 10; t++) {
      const data = TABLES_DATA[t];
      const isUnlocked = completed.includes(t);

      const card = document.createElement('div');
      card.className = `collection-creature-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="collection-img-box" style="border-color:${isUnlocked ? data.color : '#cbd5e1'};">
          <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}">
        </div>

        <div style="font-family:'Fredoka',sans-serif; font-size:1.3rem; font-weight:800; color:#1e1b4b;">
          ${data.creatureName} ${data.emoji}
        </div>

        <div style="font-size:0.9rem; font-weight:700; color:#64748b;">
          Guardián de la ${data.title}
        </div>

        <div style="font-size:0.85rem; font-style:italic; color:${data.color}; font-weight:700;">
          "${data.motto}"
        </div>

        <div style="margin-top:auto; width:100%;">
          ${isUnlocked ? `
            <button type="button" class="btn btn-primary btn-sm collection-action-btn" style="width:100%; background:${data.color}; border:none;">
              ★ Coleccionada ★
            </button>
          ` : `
            <button type="button" class="btn btn-secondary btn-sm collection-action-btn" style="width:100%;">
              🔒 Aprende la Tabla ${t}
            </button>
          `}
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        this.sound.playClick();
        this.tablesModule.openTableModal(t);
      });

      const cardBtn = card.querySelector('.collection-action-btn');
      if (cardBtn) {
        cardBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.sound.playClick();
          this.tablesModule.openTableModal(t);
        });
      }

      grid.appendChild(card);
    }
  }

  /* Setup Action Game Cards */
  setupActionGameCards() {
    const actionCards = document.querySelectorAll('.game-action-card');
    actionCards.forEach(card => {
      const launch = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const gameType = card.dataset.game;
        this.sound.playClick();
        this.launchGameByType(gameType);
      };

      card.style.cursor = 'pointer';
      card.addEventListener('click', launch);

      const innerBtn = card.querySelector('button');
      if (innerBtn) {
        innerBtn.addEventListener('click', launch);
      }
    });
  }

  launchGameByType(gameType) {
    switch (gameType) {
      case 'target':
      case 'builder':
        this.gamesModule.startTargetShootingGame();
        break;
      case 'catch':
        this.gamesModule.startCatchMonsterGame();
        break;
      case 'battle':
        this.gamesModule.startCreatureBattleGame();
        break;
      case 'race':
        this.gamesModule.startMathRaceGame();
        break;
      case 'memory':
        this.gamesModule.startMemoryMultiplicationGame();
        break;
      case 'impostor':
        this.gamesModule.startMathImpostorGame();
        break;
      case 'combo':
        this.gamesModule.startLightningComboGame();
        break;
      case 'path':
        this.gamesModule.startDangerousPathGame();
        break;
      case 'defense':
        this.gamesModule.startCastleDefenseGame();
        break;
      case 'treasure':
        this.gamesModule.startLostTreasureGame();
        break;
      default:
        this.gamesModule.startTargetShootingGame();
    }
  }

  /* Daily Challenge Setup */
  setupDailyChallenge() {
    const btn = document.getElementById('btnStartDailyChallenge');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.sound.playCorrect();
      this.gamesModule.startLightningComboGame();
      this.student.streakDays = (this.student.streakDays || 1) + 1;
      this.saveStudent(this.student);
    });
  }

  setupSoundButton() {
    const btnMute = document.getElementById('btnMuteToggle');
    if (btnMute) {
      const updateIcon = () => {
        btnMute.textContent = this.sound.muted ? '🔇' : '🔊';
      };
      updateIcon();
      btnMute.addEventListener('click', () => {
        const isMuted = this.sound.toggleMute();
        updateIcon();
        if (!isMuted) this.sound.playClick();
      });
    }
  }

  triggerConfetti() {
    this.sound.playStar();
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#fde047'];
    const particles = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 6 + 4,
        alpha: 1
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.alpha -= 0.012;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (frame < 80) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };
    animate();
  }

  showToast(msg, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.misTablasApp = new App();
  window.misTablasApp.init();
});
