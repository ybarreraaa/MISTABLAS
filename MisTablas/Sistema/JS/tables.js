/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Módulo de Aprendizaje Interactivo de Tablas del 2 al 10
 * Con Explicación Didáctica Paso a Paso, Tarjetas Mágicas 3D y Práctica Divertida
 */

const TABLES_DATA = {
  2: {
    num: 2,
    title: "Tabla del 2",
    creatureName: "Chispa-Ratón",
    creatureImg: "creature2.svg",
    motto: "¡El poder del doble y los saltos de 2 en 2!",
    color: "#f59e0b",
    bgSoft: "#fefce8",
    borderColor: "#fde047",
    emoji: "⚡",
    objectName: "rayitos",
    objectEmoji: "⚡",
    meaning: "Multiplicar por 2 siempre es calcular el DOBLE. Es como mirar un número en el espejo y sumarlo con sí mismo.",
    pattern: "¡Todos los resultados son números pares (0, 2, 4, 6 u 8)! Siempre terminan en un número par.",
    trick: "💡 Truco de Chispa-Ratón: ¿Cuánto es 2 × 7? Es lo mismo que sumar 7 + 7 = 14.",
    questions: [
      { prompt: "¿Cuánto es 2 × 4?", formula: "2 × 4 = ?", a: 2, b: 4, ans: 8, options: [6, 8, 10, 12], hint: "El doble de 4: 4 + 4 = 8" },
      { prompt: "Completa el número que falta: 2 × ___ = 14", formula: "2 × ? = 14", a: 2, b: 7, ans: 7, options: [5, 6, 7, 8], hint: "¿Qué número sumado consigo mismo da 14?" },
      { prompt: "¿Cuánto es 2 × 9?", formula: "2 × 9 = ?", a: 2, b: 9, ans: 18, options: [16, 18, 19, 20], hint: "9 + 9 = 18" },
      { prompt: "Si tienes 2 cajas con 6 chocolates cada una, ¿cuántos hay?", formula: "2 × 6 = ?", a: 2, b: 6, ans: 12, options: [10, 12, 14, 16], hint: "6 + 6 chocolates" },
      { prompt: "¿Cuánto es 2 × 8?", formula: "2 × 8 = ?", a: 2, b: 8, ans: 16, options: [14, 15, 16, 18], hint: "8 + 8 = 16" }
    ]
  },
  3: {
    num: 3,
    title: "Tabla del 3",
    creatureName: "Fuchy-Zorrito",
    creatureImg: "creature3.svg",
    motto: "¡El triple de saltos y hojas mágicas!",
    color: "#ea580c",
    bgSoft: "#fff7ed",
    borderColor: "#fdba74",
    emoji: "🦊",
    objectName: "hojitas",
    objectEmoji: "🍃",
    meaning: "Multiplicar por 3 es calcular el TRIPLE. Significa sumar un número tres veces seguidas.",
    pattern: "¡Patrón Mágico! Si sumas los dígitos del resultado, siempre obtienes 3, 6 o 9 (Ejemplo: 3 × 8 = 24 -> 2 + 4 = 6).",
    trick: "💡 Truco de Fuchy: Multiplicar por 3 es calcular el doble y sumar el número una vez más.",
    questions: [
      { prompt: "¿Cuánto es 3 × 5?", formula: "3 × 5 = ?", a: 3, b: 5, ans: 15, options: [12, 14, 15, 18], hint: "5 + 5 + 5 = 15" },
      { prompt: "¿Cuánto es 3 × 4?", formula: "3 × 4 = ?", a: 3, b: 4, ans: 12, options: [9, 10, 12, 15], hint: "4 + 4 + 4 = 12" },
      { prompt: "Completa el factor: 3 × ___ = 21", formula: "3 × ? = 21", a: 3, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "Siete veces 3 es 21" },
      { prompt: "¿Cuánto es 3 × 9?", formula: "3 × 9 = ?", a: 3, b: 9, ans: 27, options: [24, 26, 27, 30], hint: "Suma de dígitos: 2 + 7 = 9" },
      { prompt: "¿Cuánto es 3 × 6?", formula: "3 × 6 = ?", a: 3, b: 6, ans: 18, options: [15, 16, 18, 21], hint: "6 + 6 + 6 = 18" }
    ]
  },
  4: {
    num: 4,
    title: "Tabla del 4",
    creatureName: "Pingüi-Frost",
    creatureImg: "creature4.svg",
    motto: "¡El doble del doble en la nieve!",
    color: "#0284c7",
    bgSoft: "#f0f9ff",
    borderColor: "#7dd3fc",
    emoji: "🐧",
    objectName: "copitos",
    objectEmoji: "❄️",
    meaning: "Multiplicar por 4 es 'EL DOBLE DEL DOBLE'. Duplicas el número y luego vuelves a duplicar.",
    pattern: "¡El doble del doble! Para 4 × 6: doble de 6 es 12, y doble de 12 es 24.",
    trick: "💡 Truco de Pingüi: Todos los resultados de la tabla del 4 terminan en 0, 4, 8, 2 o 6.",
    questions: [
      { prompt: "¿Cuánto es 4 × 3?", formula: "4 × 3 = ?", a: 4, b: 3, ans: 12, options: [9, 10, 12, 14], hint: "Doble de 3 es 6, doble de 6 es 12" },
      { prompt: "¿Cuánto es 4 × 6?", formula: "4 × 6 = ?", a: 4, b: 6, ans: 24, options: [20, 22, 24, 28], hint: "Doble de 6 es 12, doble de 12 es 24" },
      { prompt: "Completa la operación: 4 × ___ = 32", formula: "4 × ? = 32", a: 4, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "¿Qué número multiplicado por 4 da 32?" },
      { prompt: "¿Cuánto es 4 × 7?", formula: "4 × 7 = ?", a: 4, b: 7, ans: 28, options: [24, 26, 28, 30], hint: "7 + 7 = 14, y 14 + 14 = 28" },
      { prompt: "¿Cuánto es 4 × 9?", formula: "4 × 9 = ?", a: 4, b: 9, ans: 36, options: [32, 36, 40, 42], hint: "Doble de 9 es 18, doble de 18 es 36" }
    ]
  },
  5: {
    num: 5,
    title: "Tabla del 5",
    creatureName: "Drako-Verde",
    creatureImg: "creature5.svg",
    motto: "¡Monedas y estrellas de 5 en 5!",
    color: "#16a34a",
    bgSoft: "#f0fdf4",
    borderColor: "#86efac",
    emoji: "🐲",
    objectName: "estrellitas",
    objectEmoji: "⭐",
    meaning: "Multiplicar por 5 es contar de 5 en 5, como las monedas de $5 o los dedos de tus manos.",
    pattern: "¡La regla dorada! Todos los resultados terminan en 0 (si multiplicas por par) o en 5 (si multiplicas por impar).",
    trick: "💡 Truco de Drako: Multiplica el número por 10 y luego calcula la mitad (Ej: 5 × 8 = 80 ÷ 2 = 40).",
    questions: [
      { prompt: "¿Cuánto es 5 × 7?", formula: "5 × 7 = ?", a: 5, b: 7, ans: 35, options: [30, 35, 40, 45], hint: "Termina en 5 porque 7 es impar" },
      { prompt: "¿Cuánto es 5 × 6?", formula: "5 × 6 = ?", a: 5, b: 6, ans: 30, options: [25, 30, 35, 40], hint: "Termina en 0 porque 6 es par" },
      { prompt: "¿Cuánto es 5 × 8?", formula: "5 × 8 = ?", a: 5, b: 8, ans: 40, options: [35, 40, 45, 50], hint: "5 × 8 = 40" },
      { prompt: "Completa la ecuación: 5 × ___ = 45", formula: "5 × ? = 45", a: 5, b: 9, ans: 9, options: [7, 8, 9, 10], hint: "Cinco por nueve es 45" },
      { prompt: "¿Cuánto es 5 × 4?", formula: "5 × 4 = ?", a: 5, b: 4, ans: 20, options: [15, 20, 25, 30], hint: "La mitad de 40 es 20" }
    ]
  },
  6: {
    num: 6,
    title: "Tabla del 6",
    creatureName: "Axo-Rosa",
    creatureImg: "creature6.svg",
    motto: "¡El hexágono mágico y las flores rosadas!",
    color: "#db2777",
    bgSoft: "#fdf2f8",
    borderColor: "#fbcfe8",
    emoji: "🌸",
    objectName: "florecitas",
    objectEmoji: "🌸",
    meaning: "Multiplicar por 6 es como multiplicar por 5 y sumarle el número una vez más.",
    pattern: "Si multiplicas 6 por un número par, el resultado termina en ese mismo número (Ej: 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48).",
    trick: "💡 Truco de Axo: Multiplica por 5 y luego suma el número una vez más. (6 × 7 = 35 + 7 = 42).",
    questions: [
      { prompt: "¿Cuánto es 6 × 7?", formula: "6 × 7 = ?", a: 6, b: 7, ans: 42, options: [36, 40, 42, 48], hint: "5 × 7 = 35, y 35 + 7 = 42" },
      { prompt: "¿Cuánto es 6 × 6?", formula: "6 × 6 = ?", a: 6, b: 6, ans: 36, options: [30, 32, 36, 40], hint: "Seis veces seis da 36" },
      { prompt: "¿Cuánto es 6 × 8?", formula: "6 × 8 = ?", a: 6, b: 8, ans: 48, options: [42, 46, 48, 54], hint: "Termina en 8 porque multiplicas por 8" },
      { prompt: "Completa la operación: 6 × ___ = 54", formula: "6 × ? = 54", a: 6, b: 9, ans: 9, options: [7, 8, 9, 10], hint: "6 veces 9 es 54" },
      { prompt: "¿Cuánto es 6 × 4?", formula: "6 × 4 = ?", a: 6, b: 4, ans: 24, options: [20, 22, 24, 28], hint: "Termina en 4: 24" }
    ]
  },
  7: {
    num: 7,
    title: "Tabla del 7",
    creatureName: "Gati-Cósmico",
    creatureImg: "creature7.svg",
    motto: "¡Los 7 días de la semana cósmica!",
    color: "#7c3aed",
    bgSoft: "#faf5ff",
    borderColor: "#d8b4fe",
    emoji: "🐱",
    objectName: "estrellas cósmicas",
    objectEmoji: "🔮",
    meaning: "Multiplicar por 7 es como pensar en semanas completas (cada semana tiene 7 días).",
    pattern: "Descomposición amistosa: 7 × N = (5 × N) + (2 × N). ¡Suma la tabla del 5 con la tabla del 2!",
    trick: "💡 El secreto 5, 6, 7, 8: 56 = 7 × 8. ¡Fácil de recordar!",
    questions: [
      { prompt: "¿Cuánto es 7 × 8?", formula: "7 × 8 = ?", a: 7, b: 8, ans: 56, options: [54, 56, 58, 62], hint: "Acuérdate de 5, 6, 7, 8 -> 56 = 7 × 8" },
      { prompt: "¿Cuánto es 7 × 4?", formula: "7 × 4 = ?", a: 7, b: 4, ans: 28, options: [24, 26, 28, 30], hint: "4 semanas de 7 días: 28 días" },
      { prompt: "Completa el cálculo: 7 × ___ = 49", formula: "7 × ? = 49", a: 7, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "Siete por siete es 49" },
      { prompt: "¿Cuánto es 7 × 9?", formula: "7 × 9 = ?", a: 7, b: 9, ans: 63, options: [56, 61, 63, 70], hint: "7 × 10 = 70. Réstale 7: 63" },
      { prompt: "¿Cuánto es 7 × 6?", formula: "7 × 6 = ?", a: 7, b: 6, ans: 42, options: [38, 40, 42, 46], hint: "Igual que 6 × 7 = 42" }
    ]
  },
  8: {
    num: 8,
    title: "Tabla del 8",
    creatureName: "Panda-Bambú",
    creatureImg: "creature8.svg",
    motto: "¡El triple doble de fuerza matemática!",
    color: "#0f766e",
    bgSoft: "#f0fdfa",
    borderColor: "#99f6e4",
    emoji: "🐼",
    objectName: "tallos de bambú",
    objectEmoji: "🎋",
    meaning: "Multiplicar por 8 es 'EL TRIPLE DOBLE'. Duplicas 3 veces seguidas (ej: 5 -> 10 -> 20 -> 40).",
    pattern: "¡El triple doble! Duplica el número tres veces consecutivas para obtener el resultado de multiplicar por 8.",
    trick: "💡 Todos los resultados de la tabla del 8 son números pares que terminan en 8, 6, 4, 2, 0.",
    questions: [
      { prompt: "¿Cuánto es 8 × 8?", formula: "8 × 8 = ?", a: 8, b: 8, ans: 64, options: [56, 62, 64, 72], hint: "Un tablero de ajedrez tiene 8 × 8 = 64 casillas" },
      { prompt: "¿Cuánto es 8 × 3?", formula: "8 × 3 = ?", a: 8, b: 3, ans: 24, options: [21, 24, 26, 28], hint: "8 + 8 + 8 = 24" },
      { prompt: "Completa la multiplicación: 8 × ___ = 56", formula: "8 × ? = 56", a: 8, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "56 dividido en 8 da 7" },
      { prompt: "¿Cuánto es 8 × 9?", formula: "8 × 9 = ?", a: 8, b: 9, ans: 72, options: [68, 70, 72, 80], hint: "80 menos 8 es 72" },
      { prompt: "¿Cuánto es 8 × 5?", formula: "8 × 5 = ?", a: 8, b: 5, ans: 40, options: [35, 40, 45, 48], hint: "La mitad de 80 es 40" }
    ]
  },
  9: {
    num: 9,
    title: "Tabla del 9",
    creatureName: "Buhito-Sabio",
    creatureImg: "creature9.svg",
    motto: "¡El enigma de la suma de dígitos!",
    color: "#b45309",
    bgSoft: "#fefce8",
    borderColor: "#fde047",
    emoji: "🦉",
    objectName: "pergaminos",
    objectEmoji: "📜",
    meaning: "Multiplicar por 9 es como multiplicar por 10 y quitarle el número una vez.",
    pattern: "¡La suma mágica! En todas las respuestas del 9 al 90, la suma de las dos cifras siempre da 9 (Ej: 18 -> 1+8=9, 27 -> 2+7=9, 36 -> 3+6=9).",
    trick: "💡 Truco de Buhito: Multiplica por 10 y réstale el número (Ej: 9 × 6 = 60 - 6 = 54).",
    questions: [
      { prompt: "¿Cuánto es 9 × 4?", formula: "9 × 4 = ?", a: 9, b: 4, ans: 36, options: [32, 34, 36, 40], hint: "La suma de dígitos es 9: 3 + 6 = 9" },
      { prompt: "¿Cuánto es 9 × 7?", formula: "9 × 7 = ?", a: 9, b: 7, ans: 63, options: [54, 61, 63, 72], hint: "6 + 3 = 9" },
      { prompt: "¿Cuánto es 9 × 9?", formula: "9 × 9 = ?", a: 9, b: 9, ans: 81, options: [72, 79, 81, 90], hint: "90 menos 9 = 81" },
      { prompt: "Completa el factor: 9 × ___ = 72", formula: "9 × ? = 72", a: 9, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "7 + 2 = 9. El factor es 8" },
      { prompt: "¿Cuánto es 9 × 5?", formula: "9 × 5 = ?", a: 9, b: 5, ans: 45, options: [40, 45, 50, 54], hint: "4 + 5 = 9. Termina en 5" }
    ]
  },
  10: {
    num: 10,
    title: "Tabla del 10",
    creatureName: "Estrellín-Solar",
    creatureImg: "creature10.svg",
    motto: "¡El cero mágico y las decenas brillantes!",
    color: "#0891b2",
    bgSoft: "#ecfeff",
    borderColor: "#a5f3fc",
    emoji: "⭐",
    objectName: "monedas mágicas",
    objectEmoji: "🪙",
    meaning: "Multiplicar por 10 es el superpoder de agregar un CERO al final del número.",
    pattern: "¡El Cero Mágico! Para multiplicar cualquier número por 10, solo debes colocar un CERO al final.",
    trick: "💡 Truco de Estrellín: 10 × 4 = 40, 10 × 7 = 70, 10 × 10 = 100. ¡Súper fácil!",
    questions: [
      { prompt: "¿Cuánto es 10 × 6?", formula: "10 × 6 = ?", a: 10, b: 6, ans: 60, options: [50, 60, 70, 80], hint: "Pon un cero después del 6: 60" },
      { prompt: "¿Cuánto es 10 × 9?", formula: "10 × 9 = ?", a: 10, b: 9, ans: 90, options: [80, 89, 90, 100], hint: "Pon un cero después del 9" },
      { prompt: "¿Cuánto es 10 × 10?", formula: "10 × 10 = ?", a: 10, b: 10, ans: 100, options: [90, 99, 100, 110], hint: "Una centena completa: 100" },
      { prompt: "Completa el cálculo: 10 × ___ = 80", formula: "10 × ? = 80", a: 10, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "¿A qué número le agregas un cero para dar 80?" },
      { prompt: "¿Cuánto es 10 × 4?", formula: "10 × 4 = ?", a: 10, b: 4, ans: 40, options: [30, 35, 40, 50], hint: "Cuatro decenas = 40" }
    ]
  }
};

class TablesModule {
  constructor(app) {
    this.app = app;
    this.currentTable = 2;
    this.currentMultiplier = 1;
    this.practiceIndex = 0;
    this.practiceScore = 0;

    // Estado del simulador didáctico en la Guía Maestra
    this.simPlates = 3;
    this.simItemsPerPlate = 4;
    this.simItemEmoji = '🍓';

    // Estado de las Tarjetas Mágicas 3D
    this.cardFlipped = false;
  }

  init() {
    this.renderTablesGrid();
    this.setupModalEvents();
    this.renderMasterGuide();
  }

  /* =========================================================================
     GUÍA MAESTRA: "¿QUÉ ES MULTIPLICAR Y POR QUÉ 3 × 4 = 12?"
     ========================================================================= */
  renderMasterGuide() {
    const container = document.getElementById('masterGuideContent');
    if (!container) return;

    container.innerHTML = `
      <div class="guide-hero-banner">
        <div style="font-size: 3.5rem; animation: floatKawaii 3s ease-in-out infinite;">💡</div>
        <div>
          <h2 style="font-size: 2.2rem; color: #1e1b4b; margin-bottom: 6px;">
            ¡El Secreto de la Multiplicación!
          </h2>
          <p style="font-size: 1.15rem; color: #475569; font-weight: 600; max-width: 700px;">
            Aprende paso a paso de forma simple y divertida. Multiplicar <strong>NO es difícil</strong>: 
            es un <strong>superpoder para sumar más rápido</strong> grupos que tienen la misma cantidad.
          </p>
        </div>
      </div>

      <!-- Explicación Paso 1: ¿Qué significa multiplicar? -->
      <div class="guide-step-card">
        <div class="guide-step-header">
          <span class="guide-step-badge">Paso 1</span>
          <h3>¿Qué significa realmente multiplicar?</h3>
        </div>
        <p style="font-size: 1.15rem; color: #334155; line-height: 1.6; font-weight: 600;">
          Imagina que tienes que sumar muchas veces el mismo número. Por ejemplo: 
          <span style="background: #fef08a; padding: 2px 8px; border-radius: 6px; font-weight: 800;">4 + 4 + 4</span>.
          En vez de contar uno por uno, la matemática inventó una forma rápida: 
          <strong>"3 veces 4"</strong>, que se escribe <strong>3 × 4</strong>.
        </p>

        <div class="guide-rule-box">
          <div style="font-size: 2rem; animation: starTwinkle 2s infinite;">✨</div>
          <div>
            <h4 style="font-size: 1.25rem; color: #1e1b4b; margin-bottom: 4px;">La Regla de Oro que nunca olvidarás:</h4>
            <div style="font-size: 1.05rem; color: #475569; line-height: 1.5;">
              • El <strong>primer número (3)</strong> te dice <strong>CUÁNTOS GRUPOS</strong> tienes (por ejemplo, 3 platos).<br>
              • El <strong>segundo número (4)</strong> te dice <strong>CUÁNTOS OBJETOS</strong> van en cada grupo (4 frutillas).<br>
              • El <strong>resultado (12)</strong> es el <strong>TOTAL</strong> de objetos reunidos.
            </div>
          </div>
        </div>
      </div>

      <!-- Explicación Paso 2: El gran ejemplo interactivo: ¿Por qué 3 × 4 = 12? -->
      <div class="guide-step-card">
        <div class="guide-step-header">
          <span class="guide-step-badge" style="background:#fbcfe8; color:#9d174d;">Paso 2</span>
          <h3>Mira el ejemplo con tus propios ojos: ¿Por qué 3 × 4 = 12?</h3>
        </div>

        <p style="font-size: 1.1rem; color: #475569; font-weight: 600; margin-bottom: 16px;">
          Toca los botones del simulador para agregar o quitar platos y observa cómo la suma y la multiplicación cambian juntas en tiempo real:
        </p>

        <!-- Controles del Simulador -->
        <div class="sim-controls-bar">
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <span style="font-weight: 800; color: #1e1b4b;">🍽️ Platos (Grupos):</span>
            <button type="button" class="btn btn-secondary btn-sm" id="btnSimMinusPlate">➖ Quitar Plato</button>
            <span id="simPlateCountText" style="font-family:'Fredoka',sans-serif; font-size:1.3rem; font-weight:900; color:#4f46e5; min-width:24px; text-align:center;">3</span>
            <button type="button" class="btn btn-secondary btn-sm" id="btnSimPlusPlate">➕ Agregar Plato</button>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <span style="font-weight: 800; color: #1e1b4b;">🍓 Frutas por Plato:</span>
            <button type="button" class="btn btn-secondary btn-sm" id="btnSimMinusItem">➖ Menos</button>
            <span id="simItemCountText" style="font-family:'Fredoka',sans-serif; font-size:1.3rem; font-weight:900; color:#ea580c; min-width:24px; text-align:center;">4</span>
            <button type="button" class="btn btn-secondary btn-sm" id="btnSimPlusItem">➕ Más</button>
          </div>

          <div style="display: flex; gap: 6px; align-items: center;">
            <span style="font-weight: 800; color: #1e1b4b;">Objeto:</span>
            <button type="button" class="btn btn-sm btn-secondary sim-emoji-btn" data-emoji="🍓">🍓</button>
            <button type="button" class="btn btn-sm btn-secondary sim-emoji-btn" data-emoji="⭐">⭐</button>
            <button type="button" class="btn btn-sm btn-secondary sim-emoji-btn" data-emoji="💎">💎</button>
            <button type="button" class="btn btn-sm btn-secondary sim-emoji-btn" data-emoji="🍪">🍪</button>
          </div>
        </div>

        <!-- Área Visual de Platos -->
        <div class="sim-display-board" id="simDisplayBoard"></div>

        <!-- Fórmulas explicativas en vivo -->
        <div class="sim-formula-summary">
          <div class="sim-big-formula" id="simBigFormula">3 × 4 = 12</div>
          <div class="sim-addition-text" id="simAdditionText">4 + 4 + 4 = 12 (3 veces 4)</div>
          <div class="sim-verbal-text" id="simVerbalText">
            Hay 3 platos y cada plato tiene 4 frutillas. ¡En total hay 12 frutillas!
          </div>
        </div>
      </div>

      <!-- Explicación Paso 3: El Espejo Mágico (Propiedad Conmutativa) -->
      <div class="guide-step-card">
        <div class="guide-step-header">
          <span class="guide-step-badge" style="background:#dcfce7; color:#166534;">Paso 3</span>
          <h3>El Truco del Espejo Mágico: 3 × 4 es lo mismo que 4 × 3</h3>
        </div>

        <p style="font-size: 1.15rem; color: #334155; line-height: 1.6; font-weight: 600;">
          ¿Sabías que cambiar el orden <strong>no cambia el resultado</strong>?<br>
          • <strong>3 platos con 4 galletas</strong> = 12 galletas (4 + 4 + 4 = 12)<br>
          • <strong>4 platos con 3 galletas</strong> = 12 galletas (3 + 3 + 3 + 3 = 12)<br>
          ¡Ambos dan exactamente <strong>12</strong>! Esto significa que si te aprendes <strong>3 × 4</strong>, ¡automáticamente ya te sabes <strong>4 × 3</strong>!
        </p>

        <div style="text-align: center; margin-top: 18px;">
          <button type="button" class="btn btn-primary" id="btnGoToTablesFromGuide" style="font-size: 1.15rem; padding: 14px 28px;">
            <span>🌟 ¡Entendido! Quiero Explorar las Tablas del 2 al 10</span> ➔
          </button>
        </div>
      </div>
    `;

    this.updateSimDisplay();
    this.setupSimEvents();

    const goBtn = document.getElementById('btnGoToTablesFromGuide');
    if (goBtn) {
      goBtn.addEventListener('click', () => {
        this.app.sound.playClick();
        this.app.switchMainTab('tables');
      });
    }
  }

  setupSimEvents() {
    const btnMinusP = document.getElementById('btnSimMinusPlate');
    const btnPlusP = document.getElementById('btnSimPlusPlate');
    const btnMinusI = document.getElementById('btnSimMinusItem');
    const btnPlusI = document.getElementById('btnSimPlusItem');

    if (btnMinusP) {
      btnMinusP.addEventListener('click', () => {
        if (this.simPlates > 1) {
          this.simPlates--;
          this.app.sound.playClick();
          this.updateSimDisplay();
        }
      });
    }

    if (btnPlusP) {
      btnPlusP.addEventListener('click', () => {
        if (this.simPlates < 6) {
          this.simPlates++;
          this.app.sound.playClick();
          this.updateSimDisplay();
        }
      });
    }

    if (btnMinusI) {
      btnMinusI.addEventListener('click', () => {
        if (this.simItemsPerPlate > 1) {
          this.simItemsPerPlate--;
          this.app.sound.playClick();
          this.updateSimDisplay();
        }
      });
    }

    if (btnPlusI) {
      btnPlusI.addEventListener('click', () => {
        if (this.simItemsPerPlate < 8) {
          this.simItemsPerPlate++;
          this.app.sound.playClick();
          this.updateSimDisplay();
        }
      });
    }

    document.querySelectorAll('.sim-emoji-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.simItemEmoji = btn.dataset.emoji;
        this.app.sound.playClick();
        this.updateSimDisplay();
      });
    });
  }

  updateSimDisplay() {
    const pCountText = document.getElementById('simPlateCountText');
    const iCountText = document.getElementById('simItemCountText');
    const board = document.getElementById('simDisplayBoard');
    const bigFormula = document.getElementById('simBigFormula');
    const addText = document.getElementById('simAdditionText');
    const verbText = document.getElementById('simVerbalText');

    if (pCountText) pCountText.textContent = this.simPlates;
    if (iCountText) iCountText.textContent = this.simItemsPerPlate;

    const total = this.simPlates * this.simItemsPerPlate;

    if (board) {
      board.innerHTML = '';
      for (let p = 1; p <= this.simPlates; p++) {
        const plateEl = document.createElement('div');
        plateEl.className = 'sim-plate-card';
        let itemsHtml = '';
        for (let i = 1; i <= this.simItemsPerPlate; i++) {
          itemsHtml += `<span class="sim-item-icon" style="animation-delay:${i * 0.05}s;">${this.simItemEmoji}</span>`;
        }
        plateEl.innerHTML = `
          <div class="sim-plate-label">Plato ${p}</div>
          <div class="sim-plate-items-wrap">${itemsHtml}</div>
          <div class="sim-plate-badge">${this.simItemsPerPlate} objetos</div>
        `;
        board.appendChild(plateEl);
      }
    }

    if (bigFormula) {
      bigFormula.innerHTML = `<strong>${this.simPlates} × ${this.simItemsPerPlate} = ${total}</strong>`;
    }

    if (addText) {
      const parts = Array(this.simPlates).fill(this.simItemsPerPlate);
      addText.textContent = `${parts.join(' + ')} = ${total} (${this.simPlates} veces ${this.simItemsPerPlate})`;
    }

    if (verbText) {
      verbText.textContent = `Hay ${this.simPlates} platos con ${this.simItemsPerPlate} objetos en cada uno. ¡El total acumulado es ${total}!`;
    }
  }

  /* =========================================================================
     RENDER GRID DE LAS 9 TABLAS (DEL 2 AL 10)
     ========================================================================= */
  renderTablesGrid() {
    const grid = document.getElementById('tablesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const student = this.app.getStudent();
    const completed = student.completedTables || [];
    const tableProgress = student.tableProgress || {};

    for (let t = 2; t <= 10; t++) {
      const data = TABLES_DATA[t];
      const prog = tableProgress[t] || { percent: 0, stars: 0 };
      const isDone = completed.includes(t);

      let starsHtml = '';
      for (let s = 1; s <= 3; s++) {
        const earned = s <= (prog.stars || 0);
        starsHtml += `<span class="table-star-icon ${earned ? 'earned' : ''}">★</span>`;
      }

      const statusBadge = isDone
        ? '<span class="table-card-status status-done">✓ Dominada</span>'
        : (prog.percent > 0 ? '<span class="table-card-status status-active">En Práctica</span>' : '<span class="table-card-status" style="background:#f1f5f9; color:#64748b;">Por Aprender</span>');

      const card = document.createElement('article');
      card.className = 'table-card';
      card.style.borderColor = data.borderColor;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div>
          <div class="table-card-top">
            <div class="table-creature-avatar" style="background: ${data.bgSoft}; border-color: ${data.borderColor};">
              <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}" title="${data.creatureName}">
            </div>
            
            <div class="table-card-badge-box">
              <span class="table-number-tag" style="color: ${data.color};">× ${t}</span>
              ${statusBadge}
            </div>
          </div>

          <h3 class="table-card-title">${data.title}: ${data.creatureName}</h3>
          
          <div class="table-creature-speech">
            <span>💬</span> <span>"${data.motto}"</span>
          </div>

          <div class="table-card-stars" title="${prog.stars || 0} de 3 estrellas obtenidas">
            ${starsHtml}
          </div>
        </div>

        <div class="table-card-footer">
          <span>${data.emoji} ${prog.percent || 0}% de avance</span>
          <button type="button" class="btn btn-primary btn-sm" style="background: ${data.color}; border: none;">
            ¡Aprender! ➔
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        this.app.sound.playClick();
        this.openTableModal(t);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.app.sound.playClick();
          this.openTableModal(t);
        }
      });

      grid.appendChild(card);
    }
  }

  /* =========================================================================
     MODAL DE APRENDIZAJE INTERACTIVO DE LA TABLA
     ========================================================================= */
  setupModalEvents() {
    const closeBtn = document.getElementById('tableModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.app.sound.playClick();
        this.closeTableModal();
      });
    }

    const tabExplore = document.getElementById('tabExplore');
    const tabCards = document.getElementById('tabCards');
    const tabPractice = document.getElementById('tabPractice');

    if (tabExplore) tabExplore.addEventListener('click', () => this.switchTableTab('explore'));
    if (tabCards) tabCards.addEventListener('click', () => this.switchTableTab('cards'));
    if (tabPractice) tabPractice.addEventListener('click', () => this.switchTableTab('practice'));
  }

  switchTableTab(tab) {
    this.app.sound.playClick();
    const tabExplore = document.getElementById('tabExplore');
    const tabCards = document.getElementById('tabCards');
    const tabPractice = document.getElementById('tabPractice');

    const viewExplore = document.getElementById('viewExplore');
    const viewCards = document.getElementById('viewCards');
    const viewPractice = document.getElementById('viewPractice');

    if (tabExplore) tabExplore.classList.toggle('active', tab === 'explore');
    if (tabCards) tabCards.classList.toggle('active', tab === 'cards');
    if (tabPractice) tabPractice.classList.toggle('active', tab === 'practice');

    if (viewExplore) viewExplore.style.display = tab === 'explore' ? 'block' : 'none';
    if (viewCards) viewCards.style.display = tab === 'cards' ? 'block' : 'none';
    if (viewPractice) viewPractice.style.display = tab === 'practice' ? 'block' : 'none';

    if (tab === 'cards') this.initMagicFlashcard();
    if (tab === 'practice') this.loadPracticeQuestion(0);
  }

  openTableModal(tableNum) {
    this.currentTable = tableNum;
    this.currentMultiplier = 1;
    this.app.sound.playWhoosh();

    const data = TABLES_DATA[tableNum];
    const modal = document.getElementById('tableModalOverlay');
    const titleEl = document.getElementById('tableModalTitle');
    const badgeEl = document.getElementById('tableModalBadge');
    const creatureImgEl = document.getElementById('tableModalCreatureImg');

    if (titleEl) titleEl.textContent = `${data.title} con ${data.creatureName}`;
    if (badgeEl) {
      badgeEl.textContent = `TABLA DEL ${tableNum}`;
      badgeEl.style.background = data.color;
    }
    if (creatureImgEl) {
      creatureImgEl.src = `IMAGEN/${data.creatureImg}`;
      creatureImgEl.alt = data.creatureName;
    }

    this.switchTableTab('explore');
    this.renderMultiplierBar();
    this.updateCopisiView(1);
    this.updatePatternBox();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeTableModal() {
    const modal = document.getElementById('tableModalOverlay');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    this.renderTablesGrid();
    this.app.updateHeaderStats();
  }

  /* Barra de Factores del 1 al 10 con Flechas de Paso a Paso */
  renderMultiplierBar() {
    const container = document.getElementById('multiplierBar');
    if (!container) return;
    container.innerHTML = '';

    // Botón Anterior
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'btn btn-secondary btn-sm';
    prevBtn.innerHTML = '⬅ Paso Anterior';
    prevBtn.addEventListener('click', () => {
      if (this.currentMultiplier > 1) {
        this.currentMultiplier--;
        this.app.sound.playClick();
        this.updateStepButtons();
        this.updateCopisiView(this.currentMultiplier);
      }
    });
    container.appendChild(prevBtn);

    // Botones del 1 al 10
    for (let k = 1; k <= 10; k++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `mult-btn mult-btn-${k} ${k === this.currentMultiplier ? 'active' : ''}`;
      btn.textContent = `× ${k}`;
      btn.addEventListener('click', () => {
        this.app.sound.playClick();
        this.currentMultiplier = k;
        this.updateStepButtons();
        this.updateCopisiView(k);
      });
      container.appendChild(btn);
    }

    // Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary btn-sm';
    nextBtn.innerHTML = 'Siguiente Paso ➔';
    nextBtn.addEventListener('click', () => {
      if (this.currentMultiplier < 10) {
        this.currentMultiplier++;
        this.app.sound.playClick();
        this.updateStepButtons();
        this.updateCopisiView(this.currentMultiplier);
      }
    });
    container.appendChild(nextBtn);
  }

  updateStepButtons() {
    document.querySelectorAll('.mult-btn').forEach((b, idx) => {
      b.classList.toggle('active', (idx + 1) === this.currentMultiplier);
    });
  }

  /* Vista COPISI: Concreto, Pictórico y Simbólico */
  updateCopisiView(k) {
    const t = this.currentTable;
    const res = t * k;
    const data = TABLES_DATA[t];

    const formulaEl = document.getElementById('copisiFormula');
    if (formulaEl) {
      formulaEl.innerHTML = `<strong>${t} × ${k} = ${res}</strong>`;
    }

    const addEl = document.getElementById('copisiAddition');
    if (addEl) {
      const parts = Array(k).fill(t);
      addEl.textContent = `${parts.join(' + ')} = ${res} (${k} veces ${t})`;
    }

    const meaningEl = document.getElementById('copisiMeaningText');
    if (meaningEl) {
      meaningEl.textContent = `Significa: tienes ${k} grupos con ${t} ${data.objectName} cada uno. Al juntarlos todos, el total es ${res}.`;
    }

    const groupsContainer = document.getElementById('visualGroups');
    if (groupsContainer) {
      groupsContainer.innerHTML = '';
      for (let g = 1; g <= k; g++) {
        const basket = document.createElement('div');
        basket.className = 'visual-group-basket';
        basket.style.borderColor = data.borderColor;
        basket.title = `Grupo ${g}: ${t} ${data.objectName}. ¡Tócame!`;

        let itemsHtml = '';
        for (let i = 1; i <= t; i++) {
          itemsHtml += `<span class="visual-item-dot" style="animation-delay:${i * 0.04}s;">${data.objectEmoji}</span>`;
        }

        basket.innerHTML = `
          <div style="font-size:0.85rem; font-weight:800; color:${data.color}; width:100%; text-align:center; margin-bottom:4px;">
            Grupo ${g}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">${itemsHtml}</div>
          <div style="font-size:0.75rem; font-weight:800; color:#64748b; margin-top:4px;">${t} ${data.objectName}</div>
        `;

        basket.addEventListener('click', () => {
          this.app.sound.playClick();
          basket.style.transform = 'scale(1.1) rotate(2deg)';
          setTimeout(() => { basket.style.transform = 'none'; }, 200);
        });

        groupsContainer.appendChild(basket);
      }
    }

    this.renderNumberLine(t, k);
  }

  renderNumberLine(t, k) {
    const lineTrack = document.getElementById('numberLineTrack');
    if (!lineTrack) return;
    lineTrack.innerHTML = '';

    for (let step = 0; step <= 10; step++) {
      const stepVal = t * step;
      const stepEl = document.createElement('div');
      stepEl.className = 'nl-step';

      const isPastOrCurrent = step <= k && step > 0;
      stepEl.innerHTML = `
        ${isPastOrCurrent ? `<div class="nl-arc"><span class="nl-arc-badge">+${t}</span></div>` : ''}
        <div class="nl-tick" style="${step <= k ? 'background:#10b981; height: 16px;' : ''}"></div>
        <div class="nl-label" style="${step === k ? 'color: #4f46e5; font-size: 1.2rem; font-weight: 900;' : ''}">${stepVal}</div>
      `;
      lineTrack.appendChild(stepEl);
    }
  }

  updatePatternBox() {
    const data = TABLES_DATA[this.currentTable];
    const patternEl = document.getElementById('patternText');
    const trickEl = document.getElementById('trickText');
    const meaningP = document.getElementById('tableMeaningDesc');

    if (patternEl) patternEl.textContent = data.pattern;
    if (trickEl) trickEl.textContent = data.trick;
    if (meaningP) meaningP.textContent = data.meaning;
  }

  /* =========================================================================
     TARJETA MÁGICA 3D (REEMPLAZO DIRECTO, SIMPLE Y DIVERTIDO)
     Tocas la tarjeta y gira con animación 3D mostrando el secreto y el dibujo listo
     ========================================================================= */
  initMagicFlashcard() {
    const container = document.getElementById('viewCards');
    if (!container) return;

    const t = this.currentTable;
    const data = TABLES_DATA[t];
    const k = this.currentMultiplier;
    const ans = t * k;
    this.cardFlipped = false;

    // Generar dibujo de canastas ya resueltas
    let basketsHtml = '';
    for (let g = 1; g <= k; g++) {
      let dots = '';
      for (let i = 0; i < t; i++) {
        dots += `<span style="font-size:1.4rem;">${data.objectEmoji}</span>`;
      }
      basketsHtml += `
        <div style="background:#ffffff; border:2.5px solid ${data.color}; border-radius:16px; padding:8px 12px; text-align:center; min-width:75px; box-shadow:0 4px 10px rgba(0,0,0,0.06);">
          <div style="font-size:0.75rem; font-weight:800; color:${data.color};">Grupo ${g}</div>
          <div style="display:flex; gap:3px; justify-content:center; flex-wrap:wrap; margin-top:4px;">${dots}</div>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="text-align:center; max-width:620px; margin:0 auto; padding:10px 0;">
        <h4 style="font-size:1.4rem; color:#1e1b4b; margin-bottom:4px;">
          ✨ Tarjeta Mágica Reveladora: ${t} × ${k}
        </h4>
        <p style="font-size:1rem; color:#64748b; font-weight:600; margin-bottom:18px;">
          ¡Toca la tarjeta para hacerla girar en 3D y descubrir el secreto!
        </p>

        <!-- Tarjeta 3D Volteable -->
        <div class="magic-card-perspective-box" id="magicCardTrigger">
          <div class="magic-card-inner" id="magicCardInner">
            
            <!-- Frente de la Tarjeta -->
            <div class="magic-card-face magic-card-front" style="border-color:${data.color};">
              <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}" class="mascot-avatar-bob" style="width:90px; height:90px; margin-bottom:10px;">
              <div style="font-family:'Fredoka',sans-serif; font-size:3.2rem; font-weight:900; color:#1e1b4b;">
                ${t} × ${k} = ?
              </div>
              <div class="cute-ribbon-pill" style="margin-top:14px; font-size:1.05rem; animation:pulseGlow 2s infinite;">
                ✨ ¡Toca aquí para girar! ✨
              </div>
            </div>

            <!-- Reverso de la Tarjeta (Revelación) -->
            <div class="magic-card-face magic-card-back" style="border-color:#10b981; background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);">
              <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:800; color:#059669; text-transform:uppercase;">
                ¡El Secreto Revelado!
              </div>
              <div style="font-family:'Fredoka',sans-serif; font-size:3.5rem; font-weight:900; color:#047857; margin:4px 0;">
                = ${ans}
              </div>
              <div style="font-size:1.15rem; font-weight:800; color:#0f766e; margin-bottom:12px;">
                ${Array(k).fill(t).join(' + ')} = ${ans} (${k} veces ${t})
              </div>
              
              <!-- Dibujo de Grupos ya resuelto -->
              <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; max-width:480px; margin:0 auto 12px;">
                ${basketsHtml}
              </div>

              <div style="font-size:0.95rem; font-weight:700; color:#b45309; background:#fef3c7; border:1.5px dashed #f59e0b; padding:6px 14px; border-radius:9999px;">
                ${data.trick}
              </div>
            </div>

          </div>
        </div>

        <!-- Controles rápidos de tarjeta -->
        <div style="display:flex; justify-content:center; gap:12px; margin-top:20px; flex-wrap:wrap;">
          <button type="button" class="btn btn-secondary" id="btnFlipCardAction">
            🔄 Girar Tarjeta
          </button>
          <button type="button" class="btn btn-primary" id="btnNextMagicCard">
            🎲 Siguiente Número (${k < 10 ? k + 1 : 1}) ➔
          </button>
        </div>
      </div>
    `;

    const cardInner = document.getElementById('magicCardInner');
    const toggleFlip = () => {
      this.cardFlipped = !this.cardFlipped;
      if (this.cardFlipped) {
        this.app.sound.playStar();
      } else {
        this.app.sound.playClick();
      }
      cardInner.classList.toggle('flipped', this.cardFlipped);
    };

    document.getElementById('magicCardTrigger').addEventListener('click', toggleFlip);
    document.getElementById('btnFlipCardAction').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlip();
    });

    document.getElementById('btnNextMagicCard').addEventListener('click', (e) => {
      e.stopPropagation();
      this.app.sound.playClick();
      this.currentMultiplier = this.currentMultiplier < 10 ? this.currentMultiplier + 1 : 1;
      this.updateStepButtons();
      this.initMagicFlashcard();
    });
  }

  /* =========================================================================
     EJERCICIOS INTERACTIVOS (Grandes Botones + Feedback Inmediato)
     ========================================================================= */
  loadPracticeQuestion(index) {
    this.practiceIndex = index;
    const data = TABLES_DATA[this.currentTable];
    const q = data.questions[index];

    if (index === 0) {
      this.practiceScore = 0;
    }

    const container = document.getElementById('practiceContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="practice-header-meta">
        <div class="practice-question-badge">⭐ Ejercicio ${index + 1} de ${data.questions.length}</div>
        <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:800; color:#b45309;">
          Puntos ganados: <span id="currentQuizScore">${this.practiceScore * 100}</span> pts 🪙
        </div>
      </div>

      <h3 class="practice-prompt">${q.prompt}</h3>
      <div class="practice-big-op">${q.formula}</div>

      <div class="practice-choices" id="practiceChoices">
        ${q.options.map(opt => `
          <button type="button" class="choice-chip" data-val="${opt}">${opt}</button>
        `).join('')}
      </div>

      <div class="feedback-card-banner" id="practiceFeedback" style="display: none;"></div>
    `;

    const feedbackEl = document.getElementById('practiceFeedback');
    const choiceBtns = container.querySelectorAll('.choice-chip');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.val, 10);
        choiceBtns.forEach(b => b.disabled = true);
        feedbackEl.style.display = 'flex';

        if (val === q.ans) {
          this.app.sound.playCorrect();
          btn.classList.add('correct');
          feedbackEl.className = 'feedback-card-banner success';
          feedbackEl.innerHTML = `🎉 <strong>¡Correcto!</strong> ¡Excelente trabajo! ${q.formula.replace('?', val)}`;
          this.practiceScore++;
          this.app.addScore(100);
          document.getElementById('currentQuizScore').textContent = this.practiceScore * 100;
        } else {
          this.app.sound.playIncorrect();
          btn.classList.add('wrong');
          feedbackEl.className = 'feedback-card-banner retry';
          feedbackEl.innerHTML = `💪 <strong>¡Inténtalo otra vez!</strong> ${data.creatureName} te recuerda: ${q.hint}`;
          choiceBtns.forEach(b => {
            if (parseInt(b.dataset.val, 10) === q.ans) b.classList.add('correct');
          });
        }

        setTimeout(() => {
          if (this.practiceIndex + 1 < data.questions.length) {
            this.loadPracticeQuestion(this.practiceIndex + 1);
          } else {
            this.finishPractice();
          }
        }, 1600);
      });
    });
  }

  finishPractice() {
    const total = TABLES_DATA[this.currentTable].questions.length;
    const earnedStars = this.practiceScore >= 5 ? 3 : this.practiceScore >= 3 ? 2 : 1;
    const percent = Math.round((this.practiceScore / total) * 100);
    const data = TABLES_DATA[this.currentTable];

    const student = this.app.getStudent();
    if (!student.tableProgress) student.tableProgress = {};
    const prevProg = student.tableProgress[this.currentTable] || { percent: 0, stars: 0 };

    student.tableProgress[this.currentTable] = {
      percent: Math.max(prevProg.percent, percent),
      stars: Math.max(prevProg.stars, earnedStars)
    };

    let unlockedSimceNow = false;
    if (percent >= 80 && !student.completedTables.includes(this.currentTable)) {
      student.completedTables.push(this.currentTable);

      const requiredTables = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      const allDone = requiredTables.every(t => student.completedTables.includes(t));
      if (allDone && !student.simceUnlockCelebrated) {
        student.simceUnlockCelebrated = true;
        unlockedSimceNow = true;
      }

      this.app.sound.playLevelUp();
      this.app.triggerConfetti();
      this.app.showToast(`🏆 ¡Felicitaciones! ¡${data.creatureName} se unió a tu colección!`, 'star');
    } else {
      this.app.sound.playStar();
    }

    this.app.saveStudent(student);
    this.app.updateHeaderStats();

    const container = document.getElementById('practiceContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}" style="width: 110px; height: 110px; margin-bottom: 12px; animation: rubberBand 0.8s;">
        <h3 style="font-size: 2.2rem; color: #1e1b4b; margin-bottom: 8px;">¡Desafío Superado con ${data.creatureName}!</h3>
        <p style="font-size: 1.25rem; color: #475569; font-weight: 700; margin-bottom: 16px;">
          Respondiste correctamente ${this.practiceScore} de ${total} ejercicios (${percent}%).
        </p>
        <div style="font-size: 2.8rem; color: #f59e0b; margin-bottom: 24px;">
          ${'★'.repeat(earnedStars)}${'☆'.repeat(3 - earnedStars)}
        </div>

        ${unlockedSimceNow ? `
          <div class="simce-unlocked-banner" style="margin: 16px auto 24px; max-width: 520px; animation: pulseGlow 2s infinite; padding: 18px 24px;">
            <div style="font-size: 1.8rem; margin-bottom: 4px;">🏆🎉✨</div>
            <strong style="font-size: 1.25rem; display: block; margin-bottom: 6px;">¡GRAN LOGRO SUPREMO!</strong>
            ¡Has dominado las 9 tablas del 2 al 10! Acabas de desbloquear el <strong>Ensayo Matemático oficial tipo SIMCE</strong>.
            <div style="margin-top: 14px;">
              <button type="button" class="btn btn-warning btn-sm" id="btnGoDirectToSimce" style="font-size: 1.05rem; padding: 10px 22px;">
                📝 ¡Rendir el Ensayo SIMCE Ahora! ➔
              </button>
            </div>
          </div>
        ` : ''}

        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" id="btnRetryPractice">🔄 Practicar de Nuevo</button>
          <button type="button" class="btn btn-primary" id="btnBackToExplore">📖 Volver a Ver Grupos y Patrones</button>
        </div>
      </div>
    `;

    const btnGoSimce = document.getElementById('btnGoDirectToSimce');
    if (btnGoSimce) {
      btnGoSimce.addEventListener('click', () => {
        this.closeTableModal();
        this.app.switchMainTab('simce');
      });
    }

    document.getElementById('btnRetryPractice').addEventListener('click', () => {
      this.app.sound.playClick();
      this.loadPracticeQuestion(0);
    });

    document.getElementById('btnBackToExplore').addEventListener('click', () => {
      this.app.sound.playClick();
      this.switchTableTab('explore');
    });
  }
}
