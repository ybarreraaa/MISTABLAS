/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Motor Principal (Aventura, Zonas, Audio Sintetizado Web Audio API, Racha, Navegación y Colección)
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

  /* Sonido suave de clic / pop al presionar botones, tarjetas y pestañas */
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

  playPop() {
    this.playClick();
  }

  /* Sonido alegre y triunfal cuando una respuesta está correcta (Arpegio C5 - E5 - G5 - C6) */
  playCorrect() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
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

  playSuccess() {
    this.playCorrect();
  }

  /* Sonido amistoso y suave cuando la respuesta es incorrecta (dos tonos suaves descendentes) */
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

  /* Sonido mágico de estrellas / premios (campanitas arpegiadas) */
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
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.1 },
        { f: 1046.50, d: 0.22 },
        { f: 880.00, d: 0.12 },
        { f: 1046.50, d: 0.45 }
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

  /* Sonido suave de deslizamiento / apertura de modal o cambio de pantalla */
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

  /* Sonido de apertura de cofre del tesoro mágico */
  playChest() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Golpe grave de cerradura que se abre
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, now);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // Chispas de oro posteriores
      const notes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.18, now + 0.15 + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + 0.15 + idx * 0.07);
        osc.stop(now + 0.15 + idx * 0.07 + 0.35);
      });
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
    this.monsterModule = null;
  }

  init() {
    if (!this.student || !this.student.name) {
      window.location.href = '../index.html';
      return;
    }

    // Default stats if fresh
    if (!this.student.streakDays) this.student.streakDays = 3;
    if (!Array.isArray(this.student.unlockedZones) || this.student.unlockedZones.length === 0) {
      this.student.unlockedZones = [1];
    }
    if (!Array.isArray(this.student.completedTables)) this.student.completedTables = [];
    if (!Array.isArray(this.student.defeatedBosses)) this.student.defeatedBosses = [];
    if (!Array.isArray(this.student.openedChests)) this.student.openedChests = [];
    if (!Array.isArray(this.student.viewedTables)) this.student.viewedTables = [];

    this.tablesModule = new TablesModule(this);
    this.gamesModule = new GamesModule(this);
    this.simceModule = new SimceModule(this);
    if (typeof MonsterCreatorModule !== 'undefined') {
      this.monsterModule = new MonsterCreatorModule(this);
    }

    this.tablesModule.init();
    this.gamesModule.init();
    this.simceModule.init();
    if (this.monsterModule) this.monsterModule.init();

    this.renderUserProfile();
    this.updateHeaderStats();
    this.setupDockNavigation();
    this.setupSoundButton();
    this.setupActionGameCards();
    this.checkZoneProgression(false); // Sincronización silenciosa inicial de zonas
    this.renderAdventureZones();
    this.renderCollectionGrid();
    this.setupDailyChallenge();
    this.setupContinueAdventureBtn();
    this.updateSimceNavState();
    this.setupSimceUnlockModal();
    this.setupZoneUnlockModal();

    const bannerMonsterBtn = document.getElementById('btnBannerMonster');
    if (bannerMonsterBtn) {
      bannerMonsterBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('monster');
      });
    }

    const guidePill = document.getElementById('btnGuideBannerPill');
    if (guidePill) {
      guidePill.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('guide');
      });
    }

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
    this.renderAdventureZones();
  }

  addScore(pts) {
    const prevLvl = Math.floor((this.student.score || 0) / 400) + 1;
    this.student.score = (this.student.score || 0) + pts;
    const newLvl = Math.floor(this.student.score / 400) + 1;

    this.sound.playCoin();

    if (newLvl > prevLvl) {
      this.sound.playLevelUp();
      this.triggerConfetti();
      this.showToast(`👑 ¡SUBISTE DE NIVEL! Ahora eres Nivel ${newLvl} 🌟`, 'star');
    }

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
  }

  /* Sincronización de Navegación (Tanto Barra Superior como Dock Inferior) */
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

    const brand = document.querySelector('.brand-wrapper');
    if (brand) {
      brand.style.cursor = 'pointer';
      brand.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('adventure');
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const tableModal = document.getElementById('tableModalOverlay');
        const arenaModal = document.getElementById('gameArenaOverlay');
        const examplesModal = document.getElementById('monsterExamplesOverlay');
        if (tableModal && tableModal.classList.contains('open') && this.tablesModule) {
          this.tablesModule.closeTableModal();
        }
        if (arenaModal && arenaModal.classList.contains('open') && this.gamesModule) {
          this.gamesModule.closeArena();
        }
        if (examplesModal && examplesModal.classList.contains('open')) {
          examplesModal.classList.remove('open');
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
    if (tabName === 'guide' && this.tablesModule) this.tablesModule.renderMasterGuide();
    if (tabName === 'tables' && this.tablesModule) this.tablesModule.renderTablesGrid();
    if (tabName === 'monster' && this.monsterModule) this.monsterModule.onOpen();
    if (tabName === 'simce' && this.simceModule) this.simceModule.renderSimceState();
  }

  /* "Continuar Aventura": Lleva al niño a la siguiente tabla pendiente */
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
      this.switchMainTab('adventure');
      this.tablesModule.openTableModal(targetTable);
    });
  }

  /* =========================================================================
     MAPA DE ZONA MULTIPLICA CON EXPERIENCIA MEJORADA Y ORDENADA
     Ruta visual conectada (Track RPG) + Banner didáctico + 5 Zonas estructuradas
     ========================================================================= */
  renderAdventureZones() {
    const trackContainer = document.getElementById('adventureMapTrackContainer');
    const guideSlot = document.getElementById('adventureGuideBannerSlot');
    const zonesContainer = document.getElementById('adventureZonesGrid');
    const worldProgressPill = document.getElementById('adventureWorldProgressPill');
    const btnGoToAlbum = document.getElementById('btnGoToTablesAlbum');

    if (!zonesContainer) return;
    zonesContainer.innerHTML = '';

    // Configurar botón de acceso rápido al álbum completo de tablas
    if (btnGoToAlbum && !btnGoToAlbum.dataset.bound) {
      btnGoToAlbum.dataset.bound = 'true';
      btnGoToAlbum.addEventListener('click', () => {
        this.sound.playClick();
        this.switchMainTab('tables');
      });
    }

    const completed = this.student.completedTables || [];
    const openedChests = this.student.openedChests || [];
    const tableProgress = this.student.tableProgress || {};
    const defeatedBosses = this.student.defeatedBosses || [];
    const unlockedZones = this.student.unlockedZones || [1];

    const zones = [
      {
        id: 1,
        num: "ZONA 1",
        name: "Bosque Encantado",
        shortName: "Bosque",
        subtitle: "El poder del Doble y el Triple",
        tables: [2, 3],
        img: "zone_forest.svg",
        color: "#10b981",
        accentBg: "#ecfdf5",
        mascot: "Chispa-Ratón ⚡ y Fuchy-Zorrito 🦊",
        unlocked: true,
        prevZoneName: null,
        desc: "Un bosque mágico de árboles altos y hojas brillantes donde aprendes a duplicar y triplicar cantidades."
      },
      {
        id: 2,
        num: "ZONA 2",
        name: "Volcán Dorado",
        shortName: "Volcán",
        subtitle: "El doble del doble y el secreto del 5",
        tables: [4, 5],
        img: "zone_volcano.svg",
        color: "#ea580c",
        accentBg: "#fff7ed",
        mascot: "Pingüi-Frost 🐧 y Drako-Verde 🐲",
        unlocked: unlockedZones.includes(2) || (completed.includes(2) && completed.includes(3)) || defeatedBosses.includes(1),
        prevZoneName: "Bosque Encantado (Tablas 2 y 3)",
        desc: "Tierra de fuego y cristales dorados donde descubres el doble del doble y el secreto de la tabla del 5."
      },
      {
        id: 3,
        num: "ZONA 3",
        name: "Océano Cristalino",
        shortName: "Océano",
        subtitle: "Perlas de 6 lados y 7 estrellas marinas",
        tables: [6, 7],
        img: "zone_ocean.svg",
        color: "#0284c7",
        accentBg: "#f0f9ff",
        mascot: "Axo-Rosa 🌸 y Gati-Cósmico 🐱",
        unlocked: unlockedZones.includes(3) || (completed.includes(4) && completed.includes(5)) || defeatedBosses.includes(2),
        prevZoneName: "Volcán Dorado (Tablas 4 y 5)",
        desc: "Aguas brillantes con perlas matemáticas de 6 caras y las 7 constelaciones marinas de la suerte."
      },
      {
        id: 4,
        num: "ZONA 4",
        name: "Ciudad Eléctrica",
        shortName: "Ciudad",
        subtitle: "Rascacielos del 8 y la suma mágica del 9",
        tables: [8, 9],
        img: "zone_city.svg",
        color: "#7c3aed",
        accentBg: "#faf5ff",
        mascot: "Panda-Bambú 🐼 y Buhito-Sabio 🦉",
        unlocked: unlockedZones.includes(4) || (completed.includes(6) && completed.includes(7)) || defeatedBosses.includes(3),
        prevZoneName: "Océano Cristalino (Tablas 6 y 7)",
        desc: "Rascacielos iluminados con la fuerza del triple doble y el misterio genial de la suma mágica del 9."
      },
      {
        id: 5,
        num: "ZONA 5",
        name: "Castillo Legendario",
        shortName: "Castillo",
        subtitle: "El Cero Mágico y la Gran Prueba SIMCE",
        tables: [10],
        img: "zone_castle.svg",
        color: "#f59e0b",
        accentBg: "#fffbeb",
        mascot: "Estrellín-Solar ⭐ (¡Guardián del SIMCE!)",
        unlocked: unlockedZones.includes(5) || (completed.includes(8) && completed.includes(9)) || defeatedBosses.includes(4),
        prevZoneName: "Ciudad Eléctrica (Tablas 8 y 9)",
        desc: "La fortaleza suprema donde el cero mágico brilla, se rinde el gran Ensayo SIMCE y creas a tu monstruo."
      }
    ];

    // Determinar la zona activa actual
    let currentActiveZoneIndex = 0;
    zones.forEach((z, idx) => {
      if (z.unlocked) currentActiveZoneIndex = idx;
    });

    const activeZone = zones[currentActiveZoneIndex];
    if (worldProgressPill) {
      worldProgressPill.textContent = `📍 Zona Actual: ${activeZone.name}`;
      worldProgressPill.style.borderColor = activeZone.color;
    }

    // 1. RUTA VISUAL DE AVENTURA (Track estilo World Map RPG)
    if (trackContainer) {
      trackContainer.innerHTML = `
        <div class="adventure-track-card">
          <div class="adventure-track-header">
            <div class="track-header-title">
              <div class="track-header-icon">🧭</div>
              <div>
                <h4 style="margin:0; font-size:1.15rem; color:#1e1b4b; font-weight:800;">Ruta de la Gran Aventura</h4>
                <span style="font-size:0.88rem; color:#64748b; font-weight:600;">Haz clic en cualquier estación para navegar directamente a esa zona</span>
              </div>
            </div>
            <div class="track-header-stats">
              <span class="track-stats-pill">
                🏆 ${completed.length} de 9 Tablas Dominadas
              </span>
            </div>
          </div>

          <div class="adventure-map-track">
            <div class="map-track-line">
              <div class="map-track-line-progress" style="width: ${(currentActiveZoneIndex / 4) * 100}%;"></div>
            </div>
            ${zones.map((z, idx) => {
              const isCurrent = idx === currentActiveZoneIndex;
              const isZoneDone = z.tables.every(t => completed.includes(t));
              const icon = idx === 0 ? '🌲' : idx === 1 ? '🌋' : idx === 2 ? '🌊' : idx === 3 ? '⚡' : '🏰';
              let statusText = '🔒 Bloqueada';
              let nodeClass = 'locked-node';
              if (z.unlocked) {
                if (isZoneDone) {
                  statusText = '★ Dominada';
                  nodeClass = 'done-node';
                } else if (isCurrent) {
                  statusText = '▶ ¡Aquí!';
                  nodeClass = 'active-node';
                } else {
                  statusText = '🔓 Abierta';
                  nodeClass = 'unlocked-node';
                }
              }

              return `
                <div class="map-track-node ${nodeClass}" data-zone-id="${z.id}" style="--zone-color: ${z.color};" title="${z.unlocked ? z.name : '🔒 Bloqueada: Requiere ' + (z.prevZoneName || 'la zona previa')}">
                  ${isCurrent ? `
                    <div class="map-avatar-marker" title="¡Tú estás aquí!">
                      <img src="IMAGEN/${this.student.avatar || 'creature2.svg'}" alt="Tú">
                      <div class="avatar-speech-bubble">¡Aquí!</div>
                    </div>
                  ` : ''}
                  <div class="map-node-icon-circle" style="background:${z.unlocked ? z.accentBg : '#f1f5f9'}; border-color:${z.unlocked ? z.color : '#cbd5e1'};">
                    <span style="font-size: 1.5rem;">${z.unlocked ? icon : '🔒'}</span>
                  </div>
                  <strong class="map-node-title" style="${z.unlocked ? '' : 'color:#94a3b8;'}">${z.shortName}</strong>
                  <span class="map-node-status">${statusText}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      // Eventos en los nodos de la ruta
      trackContainer.querySelectorAll('.map-track-node').forEach(node => {
        node.addEventListener('click', () => {
          const zId = parseInt(node.dataset.zoneId, 10);
          const zObj = zones.find(z => z.id === zId);
          if (zObj && zObj.unlocked) {
            this.sound.playClick();
            const targetCard = document.getElementById(`zone-card-${zId}`);
            if (targetCard) {
              targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetCard.classList.remove('zone-card-highlight');
              void targetCard.offsetWidth; // reiniciar animación
              targetCard.classList.add('zone-card-highlight');
            }
          } else {
            this.sound.playIncorrect();
            node.classList.remove('shake-locked-card');
            void node.offsetWidth;
            node.classList.add('shake-locked-card');
            this.showToast(`🔒 ¡${zObj ? zObj.name : 'Esta región'} está bloqueada! Completa las tablas de ${zObj && zObj.prevZoneName ? zObj.prevZoneName : 'la zona anterior'} para desbloquearla.`, 'star');
          }
        });
      });
    }

    // 2. BANNER DIDÁCTICO DE BIENVENIDA A LA EXPLICACIÓN VISUAL
    if (guideSlot) {
      guideSlot.innerHTML = `
        <div class="adventure-guide-banner" id="adventureGuideBanner" title="Toca para abrir la Guía Maestra">
          <div class="guide-banner-icon-box">💡</div>
          <div class="guide-banner-text-box">
            <div class="guide-banner-tag">¿TE CUESTAN LAS TABLAS? ¡HAY UN SECRETO DIDÁCTICO!</div>
            <h3 class="guide-banner-title">Aprende qué significa multiplicar con grupos visuales</h3>
            <p class="guide-banner-subtitle">
              Descubre por qué <strong>3 × 4 = 12</strong> usando platos con frutillas, saltos en la recta y sumas repetidas. ¡Fácil, entretenido y paso a paso!
            </p>
          </div>
          <button type="button" class="btn btn-primary guide-banner-cta">
            <span>Ver Explicación Didáctica</span> ➔
          </button>
        </div>
      `;

      const bannerElement = guideSlot.querySelector('#adventureGuideBanner');
      if (bannerElement) {
        bannerElement.addEventListener('click', () => {
          this.sound.playClick();
          this.switchMainTab('guide');
        });
      }
    }

    // 3. TARJETAS ESTRUCTURADAS DE LAS 5 ZONAS
    zones.forEach(zone => {
      const isZoneDone = zone.tables.every(t => completed.includes(t));
      const isChestOpened = openedChests.includes(zone.id);
      const doneTablesCount = zone.tables.filter(t => completed.includes(t)).length;

      const card = document.createElement('article');
      card.id = `zone-card-${zone.id}`;
      card.className = `zone-card ${zone.unlocked ? '' : 'zone-locked'}`;
      card.style.setProperty('--zone-theme', zone.color);

      card.innerHTML = `
        <!-- Barra Superior de la Tarjeta -->
        <div class="zone-card-top-bar">
          <span class="zone-badge-pill" style="background:${zone.unlocked ? zone.color : '#94a3b8'}; color:#ffffff;">
            ${zone.num}
          </span>
          <span class="zone-status-badge ${isZoneDone ? 'status-done' : (zone.unlocked ? 'status-active' : 'status-locked')}">
            ${isZoneDone ? '✅ Zona Conquistada' : (zone.unlocked ? '⚡ Zona Abierta' : '🔒 Bloqueada')}
          </span>
        </div>

        <!-- Ilustración y Etiqueta de Tablas -->
        <div class="zone-card-media">
          <img src="IMAGEN/${zone.img}" alt="${zone.name}" class="zone-media-img" style="${zone.unlocked ? '' : 'filter: grayscale(1); opacity: 0.55;'}">
          <div class="zone-media-overlay-tag" style="${zone.unlocked ? '' : 'background: rgba(30, 27, 75, 0.9);'}">
            ${zone.unlocked ? `Tablas: ${zone.tables.join(' y ')}` : `🔒 Requiere: ${zone.prevZoneName}`}
          </div>
        </div>

        <!-- Contenido y Lore de la Zona -->
        <div class="zone-card-body">
          <h3 class="zone-card-title" style="color: ${zone.unlocked ? zone.color : '#64748b'};">${zone.name}</h3>
          <p class="zone-card-lore" style="${zone.unlocked ? '' : 'color: #94a3b8;'}">${zone.desc}</p>
          
          <div class="zone-mascot-pill" style="${zone.unlocked ? '' : 'opacity: 0.7;'}">
            <span>🐾 Guardianes:</span> <strong>${zone.mascot}</strong>
          </div>

          ${zone.unlocked ? `
            <!-- Barra de progreso de tablas en la zona -->
            <div class="zone-progress-row">
              <div class="zone-progress-label">
                <span>Progreso de tablas:</span>
                <strong>${doneTablesCount} de ${zone.tables.length} dominadas</strong>
              </div>
              <div class="zone-mini-track">
                <div class="zone-mini-fill" style="width: ${(doneTablesCount / zone.tables.length) * 100}%; background: ${zone.color};"></div>
              </div>
            </div>
          ` : `
            <!-- Banner informativo de bloqueo con candado -->
            <div class="zone-lock-banner">
              <div class="zone-lock-icon-circle">🔒</div>
              <div>
                <div class="zone-lock-text-title">Región Aún Bloqueada</div>
                <div class="zone-lock-text-req">Completa las tablas de <strong>${zone.prevZoneName}</strong> para abrir este camino.</div>
              </div>
            </div>
          `}
        </div>

        <!-- Acciones Estructuradas en Pasos Claros -->
        <div class="zone-card-actions" style="${zone.unlocked ? '' : 'opacity: 0.65;'}">
          
          <!-- Paso 1: Explorar y Practicar Tablas -->
          <div class="zone-actions-group">
            <span class="zone-actions-heading">📖 1. Estudia y Practica:</span>
            <div class="zone-tables-btn-row">
              ${zone.tables.map(t => {
                const isTableDone = completed.includes(t);
                const tProg = tableProgress[t] || { stars: 0 };
                const starStr = isTableDone ? '★★★' : (tProg.stars > 0 ? '★'.repeat(tProg.stars) + '☆'.repeat(3 - tProg.stars) : '☆☆☆');
                if (!zone.unlocked) {
                  return `
                    <button type="button" class="zone-table-btn btn-locked open-tbl-btn" data-tbl="${t}" title="Zona bloqueada: completa ${zone.prevZoneName} primero">
                      <span class="zone-tbl-num">🔒 Tabla del ${t}</span>
                      <span class="zone-tbl-stars" style="color: #94a3b8;">Bloqueada</span>
                    </button>
                  `;
                }
                return `
                  <button type="button" class="zone-table-btn open-tbl-btn ${isTableDone ? 'table-done' : ''}" data-tbl="${t}" title="Aprender y practicar la Tabla del ${t}">
                    <span class="zone-tbl-num">Tabla del ${t}</span>
                    <span class="zone-tbl-stars">${starStr}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Paso 2: Duelo con Jefe y Cofre Secreto -->
          <div class="zone-actions-group">
            <span class="zone-actions-heading">🏆 2. Desafíos y Tesoros:</span>
            <div class="zone-challenges-btn-row">
              <button type="button" class="zone-challenge-btn boss-zone-btn ${zone.unlocked ? '' : 'btn-locked'}" data-zone="${zone.name}" data-zone-id="${zone.id}" data-tables="${zone.tables.join(',')}" title="${zone.unlocked ? 'Derrota al guardián de esta zona' : 'Zona bloqueada'}">
                <span>${zone.unlocked ? '👑' : '🔒'}</span> <span>${zone.unlocked ? 'Duelo con Jefe' : 'Duelo Bloqueado'}</span>
              </button>

              <button type="button" class="zone-challenge-btn chest-zone-btn ${zone.unlocked ? (isChestOpened ? 'chest-opened' : (isZoneDone ? 'chest-ready' : 'chest-locked')) : 'chest-locked'}" data-zone-id="${zone.id}" title="${zone.unlocked ? (isChestOpened ? 'Ya reclamaste este cofre' : (isZoneDone ? '¡Abre tu cofre del tesoro!' : 'Domina las tablas para abrirlo')) : 'Zona bloqueada'}">
                <span>${zone.unlocked ? (isChestOpened ? '🎁 Cofre Abierto ✓' : (isZoneDone ? '🎁 ¡Abrir Cofre (+250 🪙)!' : '🔒 Cofre (+250 🪙)')) : '🔒 Cofre Cerrado'}</span>
              </button>
            </div>
          </div>

          <!-- Paso 3 Especial: Actividades del Castillo (Zona 5) -->
          ${zone.id === 5 ? `
            <div class="zone-actions-group">
              <span class="zone-actions-heading">🌟 3. Pruebas Especiales de Graduación:</span>
              <div class="zone-challenges-btn-row">
                <button type="button" class="zone-special-btn open-simce-btn ${zone.unlocked && this.hasSeenAllTables() ? 'simce-unlocked-btn' : 'simce-locked-btn'}" title="${this.hasSeenAllTables() ? 'Rendir Ensayo SIMCE de 10 preguntas' : 'Revisa todas las tablas del 2 al 10 para desbloquear'}">
                  <span>${zone.unlocked && this.hasSeenAllTables() ? '📝' : '🔒'}</span> 
                  <span>${zone.unlocked && this.hasSeenAllTables() ? 'Gran Ensayo SIMCE' : 'SIMCE Bloqueado (' + this.getViewedTablesCount() + '/9)'}</span>
                </button>
                <button type="button" class="zone-special-btn open-monster-btn" style="background:linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color:#ffffff;" title="Laboratorio de Creación de Monstruos">
                  <span>🎨</span> <span>Crear tu Monstruo</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Eventos de botones dentro de la tarjeta
      card.querySelectorAll('.open-tbl-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.shakeCard(card);
            this.showToast(`🔒 ¡${zone.name} está bloqueada! Completa las tablas de ${zone.prevZoneName} para desbloquearla.`, 'star');
            return;
          }
          this.sound.playClick();
          const t = parseInt(btn.dataset.tbl, 10);
          this.tablesModule.openTableModal(t);
        });
      });

      card.querySelectorAll('.boss-zone-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.shakeCard(card);
            this.showToast(`🔒 ¡${zone.name} está bloqueada! Completa las tablas de ${zone.prevZoneName} para retar al Guardián.`, 'star');
            return;
          }
          this.sound.playClick();
          const tList = btn.dataset.tables.split(',').map(Number);
          const zId = parseInt(btn.dataset.zoneId, 10);
          this.gamesModule.startSpecialMission(tList, btn.dataset.zone, zId);
        });
      });

      card.querySelectorAll('.chest-zone-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.shakeCard(card);
            this.showToast(`🔒 ¡${zone.name} está bloqueada! Completa las zonas anteriores para explorar y abrir cofres.`, 'star');
            return;
          }
          const zId = parseInt(btn.dataset.zoneId, 10);
          if (openedChests.includes(zId)) {
            this.sound.playClick();
            this.showToast('✨ Ya abriste este cofre y reclamaste tus +250 monedas doradas.', 'success');
            return;
          }

          if (isZoneDone) {
            this.sound.playChest();
            this.triggerConfetti();
            openedChests.push(zId);
            this.student.openedChests = openedChests;
            this.addScore(250);
            this.showToast(`🎁 ¡TESORO CONQUISTADO! Abriste el cofre de ${zone.name} y ganaste +250 monedas doradas 🪙`, 'star');
            this.renderAdventureZones();
          } else {
            this.sound.playIncorrect();
            this.showToast(`🔒 Para abrir este cofre mágico, debes dominar las tablas (${zone.tables.join(' y ')}) con sus desafíos de 3 estrellas.`, 'star');
          }
        });
      });

      const openSimceBtn = card.querySelector('.open-simce-btn');
      if (openSimceBtn) {
        openSimceBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!zone.unlocked) {
            this.sound.playIncorrect();
            this.shakeCard(card);
            this.showToast(`🔒 ¡El Castillo Legendario está bloqueado! Completa las zonas anteriores.`, 'star');
            return;
          }
          if (!this.hasSeenAllTables()) {
            this.sound.playIncorrect();
            const count = this.getViewedTablesCount();
            this.showToast(`🔒 ¡El Ensayo SIMCE requiere revisar todas las tablas del 2 al 10! (Llevas ${count} de 9).`, 'star');
            this.switchMainTab('simce');
            return;
          }
          this.sound.playClick();
          this.switchMainTab('simce');
          this.simceModule.startSimceTest();
        });
      }

      const openMonsterBtn = card.querySelector('.open-monster-btn');
      if (openMonsterBtn) {
        openMonsterBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.sound.playClick();
          this.switchMainTab('monster');
        });
      }

      // Clic general en la tarjeta
      card.addEventListener('click', () => {
        if (!zone.unlocked) {
          this.sound.playIncorrect();
          this.shakeCard(card);
          this.showToast(`🔒 ¡${zone.name} está bloqueada! Completa las tablas de ${zone.prevZoneName} para abrir el camino.`, 'star');
          return;
        }
        this.sound.playClick();
        // Abrir la primera tabla no completada o la primera tabla de la zona
        const targetTable = zone.tables.find(t => !completed.includes(t)) || zone.tables[0];
        this.tablesModule.openTableModal(targetTable);
      });

      zonesContainer.appendChild(card);
    });
  }

  /* =========================================================================
     GESTIÓN DE DESBLOQUEO DEL ENSAYO SIMCE AL VER TODAS LAS TABLAS (2 al 10)
     ========================================================================= */
  hasSeenAllTables() {
    const allTables = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const viewed = this.student.viewedTables || [];
    const completed = this.student.completedTables || [];
    return allTables.every(t => viewed.includes(t) || completed.includes(t));
  }

  getViewedTablesCount() {
    const allTables = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const viewed = this.student.viewedTables || [];
    const completed = this.student.completedTables || [];
    const seen = new Set([...viewed, ...completed]);
    return allTables.filter(t => seen.has(t)).length;
  }

  registerTableSeen(tableNum) {
    if (!this.student.viewedTables) this.student.viewedTables = [];
    const wasUnlocked = this.hasSeenAllTables();

    if (!this.student.viewedTables.includes(tableNum)) {
      this.student.viewedTables.push(tableNum);
      this.saveStudent(this.student);
    }

    const isNowUnlocked = this.hasSeenAllTables();
    if (!wasUnlocked && isNowUnlocked) {
      // Momento exacto de desbloqueo al ver todas las tablas
      this.onSimceUnlocked();
    } else {
      this.updateSimceNavState();
    }
  }

  onSimceUnlocked() {
    this.sound.playLevelUp();
    this.triggerConfetti();
    this.updateSimceNavState();
    this.renderAdventureZones();
    if (this.simceModule) this.simceModule.renderSimceState();

    setTimeout(() => {
      this.showSimceUnlockedModal();
    }, 600);
  }

  updateSimceNavState() {
    const navBtn = document.getElementById('navTabSimce');
    if (!navBtn) return;
    const isUnlocked = this.hasSeenAllTables();
    const count = this.getViewedTablesCount();

    if (!isUnlocked) {
      navBtn.classList.add('nav-tab-locked');
      navBtn.classList.remove('nav-tab-unlocked');
      navBtn.innerHTML = `<span>🔒</span> <span>Ensayo SIMCE</span> <span class="nav-lock-pill">${count}/9</span>`;
      navBtn.title = `Bloqueado: Explora todas las tablas del 2 al 10 para desbloquear (${count} de 9 vistas)`;
    } else {
      navBtn.classList.remove('nav-tab-locked');
      navBtn.classList.add('nav-tab-unlocked');
      navBtn.innerHTML = `<span>📝</span> <span>Ensayo SIMCE</span> <span class="nav-unlocked-pill">¡Listo! ⭐</span>`;
      navBtn.title = `¡Desbloqueado! Rinde el Gran Ensayo Oficial SIMCE`;
    }
  }

  setupSimceUnlockModal() {
    const modal = document.getElementById('simceUnlockModalOverlay');
    const btnClose = document.getElementById('btnCloseSimceUnlockModal');
    const btnGo = document.getElementById('btnGoToSimceFromUnlock');

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        this.sound.playClick();
        modal.classList.remove('open');
      });
    }

    if (btnGo && modal) {
      btnGo.addEventListener('click', () => {
        this.sound.playSuccess();
        modal.classList.remove('open');
        this.switchMainTab('simce');
        if (this.simceModule) this.simceModule.startSimceTest();
      });
    }
  }

  showSimceUnlockedModal() {
    const modal = document.getElementById('simceUnlockModalOverlay');
    if (modal) {
      modal.classList.add('open');
    } else {
      this.showToast('🏆 ¡FELICITACIONES! Has explorado todas las tablas. ¡El Ensayo SIMCE está desbloqueado!', 'star');
    }
  }

  /* =========================================================================
     GESTIÓN DE PROGRESIÓN Y DESBLOQUEO DE ZONAS EN EL MAPA
     ========================================================================= */
  checkZoneProgression(notify = true) {
    if (!this.student) return;
    if (!Array.isArray(this.student.unlockedZones) || this.student.unlockedZones.length === 0) {
      this.student.unlockedZones = [1];
    }
    if (!Array.isArray(this.student.completedTables)) this.student.completedTables = [];
    if (!Array.isArray(this.student.defeatedBosses)) this.student.defeatedBosses = [];

    const completed = this.student.completedTables;
    const bosses = this.student.defeatedBosses;
    const newlyUnlocked = [];

    // Zona 2: Se desbloquea si Zona 1 está dominada (tablas 2 y 3 completadas o jefe 1 vencido)
    if (!this.student.unlockedZones.includes(2) && ((completed.includes(2) && completed.includes(3)) || bosses.includes(1))) {
      this.student.unlockedZones.push(2);
      newlyUnlocked.push({ id: 2, name: "Volcán Dorado", icon: "🌋", shortName: "Volcán", subtitle: "Tablas del 4 y 5" });
    }

    // Zona 3: Se desbloquea si Zona 2 está dominada (tablas 4 y 5 completadas o jefe 2 vencido)
    if (!this.student.unlockedZones.includes(3) && ((completed.includes(4) && completed.includes(5)) || bosses.includes(2))) {
      this.student.unlockedZones.push(3);
      newlyUnlocked.push({ id: 3, name: "Océano Cristalino", icon: "🌊", shortName: "Océano", subtitle: "Tablas del 6 y 7" });
    }

    // Zona 4: Se desbloquea si Zona 3 está dominada (tablas 6 y 7 completadas o jefe 3 vencido)
    if (!this.student.unlockedZones.includes(4) && ((completed.includes(6) && completed.includes(7)) || bosses.includes(3))) {
      this.student.unlockedZones.push(4);
      newlyUnlocked.push({ id: 4, name: "Ciudad Eléctrica", icon: "⚡", shortName: "Ciudad", subtitle: "Tablas del 8 y 9" });
    }

    // Zona 5: Se desbloquea si Zona 4 está dominada (tablas 8 y 9 completadas o jefe 4 vencido)
    if (!this.student.unlockedZones.includes(5) && ((completed.includes(8) && completed.includes(9)) || bosses.includes(4))) {
      this.student.unlockedZones.push(5);
      newlyUnlocked.push({ id: 5, name: "Castillo Legendario", icon: "🏰", shortName: "Castillo", subtitle: "Tabla del 10 y SIMCE" });
    }

    if (newlyUnlocked.length > 0) {
      localStorage.setItem('misTablas_student', JSON.stringify(this.student));
      this.renderAdventureZones();

      if (notify) {
        const latestZone = newlyUnlocked[newlyUnlocked.length - 1];
        this.sound.playLevelUp();
        this.triggerConfetti();
        setTimeout(() => {
          this.showZoneUnlockedModal(latestZone);
        }, 500);
      }
    }
  }

  setupZoneUnlockModal() {
    const modal = document.getElementById('zoneUnlockModalOverlay');
    const btnClose = document.getElementById('btnCloseZoneUnlockModal');
    const btnGo = document.getElementById('btnGoToUnlockedZone');

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        this.sound.playClick();
        modal.classList.remove('open');
        this.switchMainTab('adventure');
      });
    }

    if (btnGo && modal) {
      btnGo.addEventListener('click', () => {
        this.sound.playSuccess();
        modal.classList.remove('open');
        this.switchMainTab('adventure');
        const zId = modal.dataset.unlockedZoneId;
        const targetCard = document.getElementById(`zone-card-${zId || 1}`);
        if (targetCard) {
          setTimeout(() => {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.remove('zone-card-highlight');
            void targetCard.offsetWidth;
            targetCard.classList.add('zone-card-highlight');
          }, 250);
        }
      });
    }
  }

  showZoneUnlockedModal(zone) {
    const modal = document.getElementById('zoneUnlockModalOverlay');
    const iconEl = document.getElementById('zoneUnlockIcon');
    const titleEl = document.getElementById('zoneUnlockTitle');
    const descEl = document.getElementById('zoneUnlockDesc');

    if (modal && zone) {
      modal.dataset.unlockedZoneId = zone.id;
      if (iconEl) iconEl.textContent = zone.icon || '🗺️';
      if (titleEl) titleEl.textContent = `¡Has desbloqueado ${zone.name}!`;
      if (descEl) {
        descEl.innerHTML = `
          ¡Felicitaciones! Has demostrado tu dominio matemático en la zona anterior y has abierto el camino hacia 
          <strong>${zone.name}</strong> (${zone.subtitle}). 
          ¡Nuevas criaturas, tablas y tesoros te esperan!
        `;
      }
      modal.classList.add('open');
    } else {
      this.showToast(`🎉 ¡Nueva Zona Desbloqueada: ${zone ? zone.name : 'Región'}!`, 'star');
    }
  }

  shakeCard(element) {
    if (!element) return;
    element.classList.remove('shake-locked-card');
    void element.offsetWidth;
    element.classList.add('shake-locked-card');
  }

  /* Collection Grid (Pokédex Kawaii de Criaturas) */
  renderCollectionGrid() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const completed = this.student.completedTables || [];

    for (let t = 2; t <= 10; t++) {
      const data = TABLES_DATA[t];
      if (!data) continue;
      const isUnlocked = completed.includes(t);

      const card = document.createElement('div');
      card.className = `collection-creature-card ${isUnlocked ? 'unlocked' : 'locked'}`;
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
            <button type="button" class="btn btn-primary btn-sm" style="width:100%; background:${data.color}; border:none;">
              ★ Coleccionada ★
            </button>
          ` : `
            <button type="button" class="btn btn-secondary btn-sm" style="width:100%;">
              🔒 Aprende la Tabla ${t}
            </button>
          `}
        </div>
      `;

      card.addEventListener('click', () => {
        this.sound.playClick();
        this.tablesModule.openTableModal(t);
      });

      grid.appendChild(card);
    }
  }

  /* Configuración de Tarjetas de Juegos de Acción */
  setupActionGameCards() {
    const actionCards = document.querySelectorAll('.game-action-card');
    actionCards.forEach(card => {
      card.addEventListener('click', () => {
        const gameType = card.dataset.game;
        this.sound.playClick();

        switch (gameType) {
          case 'boxfactory':
          case 'factory':
          case 'battle':
            this.gamesModule.startBoxFactoryGame();
            break;
          case 'bubblecascade':
          case 'cascade':
          case 'catch':
            this.gamesModule.startBubbleCascadeGame();
            break;
          case 'race':
            this.gamesModule.startMathRaceGame();
            break;
          case 'path':
            this.gamesModule.startDangerousPathGame();
            break;
          case 'defense':
            this.gamesModule.startCastleDefenseGame();
            break;
          case 'memory':
            this.gamesModule.startMemoryMultiplicationGame();
            break;
          case 'lab':
            this.gamesModule.startCreatureLabGame();
            break;
          case 'treasure':
            this.gamesModule.startLostTreasureGame();
            break;
          case 'combo':
            this.gamesModule.startLightningComboGame();
            break;
          case 'impostor':
            this.gamesModule.startMathImpostorGame();
            break;
          case 'monster':
            this.switchMainTab('monster');
            break;
          default:
            this.gamesModule.startBoxFactoryGame();
            break;
        }
      });
    });
  }

  /* Desafío Diario */
  setupDailyChallenge() {
    const btn = document.getElementById('btnStartDailyChallenge');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.sound.playClick();
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

    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
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
