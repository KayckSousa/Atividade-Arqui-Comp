
// ==========================================
// CRUZADINHA - ARQUITETURA COMPUTACIONAL
// PARTE 1/3 - GERADOR E POSICIONAMENTO
// ==========================================

const puzzle = {
  size: 25,

  words: [
    {
      word: "MEMORIADEMASSA",
      clue: "Armazenamento permanente para dados em grande volume.",
      explanation: "Armazena grandes quantidades de dados de forma persistente."
    },
    {
      word: "ADDRESSBUS",
      clue: "Conjunto de linhas que indica a posição de memória a ser acessada.",
      explanation: "Transporta os endereços das posições de memória."
    },
    {
      word: "EEPROM",
      clue: "Memória não volátil que pode ser regravada eletricamente.",
      explanation: "Mantém os dados sem energia e permite regravação elétrica."
    },
    {
      word: "CACHE",
      clue: "Memória rápida que acelera o acesso aos dados utilizados.",
      explanation: "Armazena cópias de dados frequentemente utilizados."
    },
    {
      word: "REGISTRADORES",
      clue: "Pequenas áreas internas que guardam valores usados imediatamente.",
      explanation: "São áreas de armazenamento interno da CPU."
    },
    {
      word: "UC",
      clue: "Bloco que interpreta comandos e coordena as operações internas.",
      explanation: "Coordena a execução das instruções."
    },
    {
      word: "DATABUS",
      clue: "Caminho por onde circulam os valores lidos ou gravados.",
      explanation: "Transporta os dados lidos ou escritos na memória."
    },
    {
      word: "FLASH",
      clue: "Memória regravável presente em unidades USB e discos sólidos.",
      explanation: "Tecnologia de armazenamento que mantém dados sem energia."
    },
    {
      word: "DUALCORE",
      clue: "Processador que possui duas unidades independentes de execução.",
      explanation: "Possui dois núcleos capazes de executar tarefas."
    },
    {
      word: "ULA",
      clue: "Parte do processador que realiza cálculos e comparações lógicas.",
      explanation: "Realiza operações aritméticas e lógicas."
    },
    {
      word: "DMA",
      clue: "Recurso que transfere dados entre memória e periféricos sem intervenção contínua do processador.",
      explanation: "Permite transferir dados sem a CPU controlar cada operação."
    },
    {
      word: "QUADCORE",
      clue: "Processador que possui quatro núcleos de processamento.",
      explanation: "Possui quatro núcleos que permitem executar tarefas em paralelo."
    }
  ]
};

// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================

let crosswordGrid = [];
let cellNumbers = {};
let placements = [];
let selectedPlacement = null;

const gridElement = document.getElementById("crossword-grid");
const acrossElement = document.getElementById("across-clues");
const downElement = document.getElementById("down-clues");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");

// ==========================================
// VERIFICA LIMITES DO TABULEIRO
// ==========================================

function isInside(r, c, size) {
  return (
    r >= 0 &&
    c >= 0 &&
    r < size &&
    c < size
  );
}

// ==========================================
// VERIFICA SE UMA PALAVRA PODE SER COLOCADA
// ==========================================

function canPlaceWord(word, r, c, dir, grid, size) {

  const dr = dir[0];
  const dc = dir[1];

  const endR = r + dr * (word.length - 1);
  const endC = c + dc * (word.length - 1);

  if (
    !isInside(r, c, size) ||
    !isInside(endR, endC, size)
  ) {
    return {
      valid: false,
      intersections: 0
    };
  }

  // Verifica antes e depois da palavra

  const beforeR = r - dr;
  const beforeC = c - dc;

  const afterR = endR + dr;
  const afterC = endC + dc;

  if (
    isInside(beforeR, beforeC, size) &&
    grid[beforeR][beforeC] !== ""
  ) {
    return { valid: false, intersections: 0 };
  }

  if (
    isInside(afterR, afterC, size) &&
    grid[afterR][afterC] !== ""
  ) {
    return { valid: false, intersections: 0 };
  }

  let intersections = 0;

  for (let i = 0; i < word.length; i++) {

    const rr = r + dr * i;
    const cc = c + dc * i;

    const current = grid[rr][cc];

    if (current !== "" && current !== word[i]) {
      return { valid: false, intersections: 0 };
    }

    if (current === word[i]) {
      intersections++;
      continue;
    }

    // Impede que palavras fiquem encostadas lateralmente

    const sides = dir[0] === 0
      ? [[rr - 1, cc], [rr + 1, cc]]
      : [[rr, cc - 1], [rr, cc + 1]];

    for (const [sr, sc] of sides) {

      if (
        isInside(sr, sc, size) &&
        grid[sr][sc] !== ""
      ) {
        return { valid: false, intersections: 0 };
      }
    }
  }

  return {
    valid: true,
    intersections
  };
}

// ==========================================
// POSICIONA UMA PALAVRA
// ==========================================

function placeWord(entry, r, c, dir, grid, placed) {

  for (let i = 0; i < entry.word.length; i++) {

    const rr = r + dir[0] * i;
    const cc = c + dir[1] * i;

    grid[rr][cc] = entry.word[i];
  }

  placed.push({
    ...entry,
    r,
    c,
    dir
  });
}

// ==========================================
// GERA A CRUZADINHA
// ==========================================

function generateCrossword() {

  const size = puzzle.size;

  const grid = Array.from(
    { length: size },
    () => Array(size).fill("")
  );

  const placed = [];

  // Ordena pelas palavras maiores

  const words = [...puzzle.words].sort(
    (a, b) => b.word.length - a.word.length
  );

  // Primeira palavra no centro

  const first = words.shift();

  const firstRow = Math.floor(size / 2);

  const firstCol = Math.floor(
    (size - first.word.length) / 2
  );

  placeWord(
    first,
    firstRow,
    firstCol,
    [0, 1],
    grid,
    placed
  );

  // Tenta cruzar todas as demais palavras

  for (const entry of words) {

    const candidates = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {

        if (!grid[r][c]) continue;

        for (let i = 0; i < entry.word.length; i++) {

          if (entry.word[i] !== grid[r][c]) continue;

          const directions = [
            [1, 0],
            [0, 1]
          ];

          for (const dir of directions) {

            const startR = r - dir[0] * i;
            const startC = c - dir[1] * i;

            const result = canPlaceWord(
              entry.word,
              startR,
              startC,
              dir,
              grid,
              size
            );

            if (
              result.valid &&
              result.intersections > 0
            ) {
              candidates.push({
                r: startR,
                c: startC,
                dir,
                intersections: result.intersections
              });
            }
          }
        }
      }
    }

    // Prioriza o maior número de cruzamentos

    candidates.sort(
      (a, b) => b.intersections - a.intersections
    );

    if (candidates.length > 0) {

      const chosen = candidates[0];

      placeWord(
        entry,
        chosen.r,
        chosen.c,
        chosen.dir,
        grid,
        placed
      );

    } else {

      console.warn(
        "Palavra sem cruzamento encontrado:",
        entry.word
      );
    }
  }

  return {
    grid,
    placements: placed
  };
}

// ==========================================
// PARTE 2/3 - CRIAÇÃO DO TABULEIRO
// ==========================================

// ==========================================
// INICIALIZAÇÃO DO JOGO
// ==========================================

function initializeGame() {

  const result = generateCrossword();

  crosswordGrid = result.grid;
  placements = result.placements;

  if (placements.length !== puzzle.words.length) {
    console.warn(
      "Nem todas as palavras conseguiram ser posicionadas.",
      placements.length,
      "de",
      puzzle.words.length
    );
  }

  createCrossword();
}

// ==========================================
// NUMERAÇÃO DAS PALAVRAS
// ==========================================

function calculateNumbers() {

  cellNumbers = {};

  const starts = new Set();

  placements.forEach(p => {
    starts.add(`${p.r},${p.c}`);
  });

  let number = 1;

  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {

      const key = `${r},${c}`;

      if (starts.has(key)) {
        cellNumbers[key] = number++;
      }
    }
  }
}

// ==========================================
// CRIAÇÃO DO TABULEIRO
// ==========================================

function createCrossword() {

  gridElement.innerHTML = "";

  calculateNumbers();

  gridElement.style.gridTemplateColumns =
    `repeat(${puzzle.size}, 34px)`;

  for (let r = 0; r < puzzle.size; r++) {

    for (let c = 0; c < puzzle.size; c++) {

      const cell = document.createElement("div");

      cell.className = "cell";

      const letter = crosswordGrid[r][c];

      if (letter === "") {

        cell.classList.add("black");

        if ((r + c) % 2 === 0) {
          cell.classList.add("alt");
        }

      } else {

        const input = document.createElement("input");

        input.type = "text";
        input.maxLength = 1;
        input.autocomplete = "off";
        input.spellcheck = false;

        input.setAttribute("inputmode", "text");
        input.setAttribute("aria-label",
          `Linha ${r + 1}, coluna ${c + 1}`
        );

        input.dataset.row = r;
        input.dataset.col = c;

        // Digitação das letras

        input.addEventListener("input", event => {

          const value = event.target.value
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

          event.target.value = value.slice(-1);

          if (event.target.value) {
            moveNext(input);
          }

          clearFeedback();
        });

        // Navegação pelo teclado

        input.addEventListener("keydown", event => {

          const movements = {
            ArrowRight: [0, 1],
            ArrowLeft: [0, -1],
            ArrowDown: [1, 0],
            ArrowUp: [-1, 0]
          };

          if (movements[event.key]) {

            event.preventDefault();

            const [dr, dc] = movements[event.key];

            const next = gridElement.querySelector(
              `input[data-row="${r + dr}"][data-col="${c + dc}"]`
            );

            if (next) next.focus();
          }

          if (event.key === "Backspace" && !input.value) {

            const inputs = [
              ...gridElement.querySelectorAll("input")
            ];

            const index = inputs.indexOf(input);

            if (inputs[index - 1]) {
              event.preventDefault();
              inputs[index - 1].focus();
            }
          }
        });

        cell.appendChild(input);

        // Número da palavra

        const key = `${r},${c}`;

        if (cellNumbers[key]) {

          const numberLabel = document.createElement("span");

          numberLabel.className = "cell-number";
          numberLabel.textContent = cellNumbers[key];

          cell.appendChild(numberLabel);
        }
      }

      gridElement.appendChild(cell);
    }
  }

  renderClues();
  renderDynamicLegend();

  scoreElement.textContent = `0 de ${placements.length}`;
}

// ==========================================
// AVANÇAR PARA O PRÓXIMO QUADRADO
// ==========================================

function moveNext(currentInput) {

  const inputs = [
    ...gridElement.querySelectorAll("input")
  ];

  const index = inputs.indexOf(currentInput);

  if (inputs[index + 1]) {
    inputs[index + 1].focus();
  }
}

// ==========================================
// EXIBIR PISTAS
// ==========================================

function renderClues() {

  acrossElement.innerHTML = "";
  downElement.innerHTML = "";

  const sorted = [...placements].sort((a, b) => {

    return (
      cellNumbers[`${a.r},${a.c}`] -
      cellNumbers[`${b.r},${b.c}`]
    );

  });

  sorted.forEach(placement => {

    const number = cellNumbers[
      `${placement.r},${placement.c}`
    ];

    const isAcross = placement.dir[0] === 0;

    const item = document.createElement("div");

    item.className = "clue-item";

    const numberLabel = document.createElement("span");

    numberLabel.className = "clue-number";
    numberLabel.textContent = number;

    const description = document.createElement("span");

    description.textContent = placement.clue;

    const arrow = document.createElement("span");

    arrow.className = "clue-arrow";

    arrow.textContent = isAcross ? "→" : "↓";

    item.appendChild(numberLabel);
    item.appendChild(description);
    item.appendChild(arrow);

    // Selecionar uma palavra

    item.addEventListener("click", () => {

      clearSelection();

      selectedPlacement = placement;

      for (let i = 0; i < placement.word.length; i++) {

        const row = placement.r + placement.dir[0] * i;
        const col = placement.c + placement.dir[1] * i;

        const index = row * puzzle.size + col;

        const cell = gridElement.children[index];

        if (cell) {
          cell.classList.add("selected");
        }
      }

      // Mostrar explicação e posição selecionada

      const fixPanel = document.getElementById("fix-panel");

      fixPanel.innerHTML = "";

      const info = document.createElement("p");

      info.textContent =
        `Selecionada: ${number} — ${placement.word}`;

      fixPanel.appendChild(info);

      const explanation = document.createElement("p");

      explanation.textContent = placement.explanation;

      fixPanel.appendChild(explanation);

      // Focar na primeira casa da palavra

      const firstInput = gridElement.querySelector(
        `input[data-row="${placement.r}"][data-col="${placement.c}"]`
      );

      if (firstInput) firstInput.focus();
    });

    if (isAcross) {
      acrossElement.appendChild(item);
    } else {
      downElement.appendChild(item);
    }
  });
}

// ==========================================
// DESTAQUE DA PALAVRA SELECIONADA
// ==========================================

function clearSelection() {

  selectedPlacement = null;

  document.querySelectorAll(".cell.selected")
    .forEach(cell => {
      cell.classList.remove("selected");
    });

  const fixPanel = document.getElementById("fix-panel");

  if (fixPanel) {
    fixPanel.innerHTML = "";
  }
}

// ==========================================
// LEGENDA DINÂMICA
// ==========================================

function renderDynamicLegend() {

  const el = document.getElementById("dynamic-legend");

  if (!el) return;

  const total = placements.length;

  const across = placements.filter(
    p => p.dir[0] === 0
  ).length;

  const down = placements.filter(
    p => p.dir[0] !== 0
  ).length;

  let blackCount = 0;

  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {

      if (crosswordGrid[r][c] === "") {
        blackCount++;
      }
    }
  }

  el.innerHTML = `
    <span><strong>${total}</strong> palavras</span>
    <span>Horizontais: <strong>${across}</strong></span>
    <span>Verticais: <strong>${down}</strong></span>
    <span>Casas bloqueadas: <strong>${blackCount}</strong></span>
  `;
}

// ==========================================
// FIM DA PARTE 2/3
// ==========================================

// ==========================================
// PARTE 3/3 - CONTROLES E FINALIZAÇÃO
// ==========================================

// ==========================================
// LER RESPOSTA DO JOGADOR
// ==========================================

function getPlayerAnswer(placement) {

  let answer = "";

  for (let i = 0; i < placement.word.length; i++) {

    const row = placement.r + placement.dir[0] * i;
    const col = placement.c + placement.dir[1] * i;

    const input = gridElement.querySelector(
      `input[data-row="${row}"][data-col="${col}"]`
    );

    answer += input ? input.value.toUpperCase() : "";
  }

  return answer;
}

// ==========================================
// CONFERIR RESPOSTAS
// ==========================================

function checkAnswers() {

  feedbackElement.innerHTML = "";

  gridElement.querySelectorAll(".cell").forEach(cell => {

    cell.classList.remove(
      "answer-correct",
      "answer-wrong"
    );

  });

  let correct = 0;

  placements.forEach(placement => {

    const answer = getPlayerAnswer(placement);

    const isCorrect = answer === placement.word;

    if (isCorrect) {
      correct++;
    }

    // Colorir as casas

    for (let i = 0; i < placement.word.length; i++) {

      const row = placement.r + placement.dir[0] * i;
      const col = placement.c + placement.dir[1] * i;

      const input = gridElement.querySelector(
        `input[data-row="${row}"][data-col="${col}"]`
      );

      if (input) {

        input.parentElement.classList.add(
          isCorrect ? "answer-correct" : "answer-wrong"
        );
      }
    }

    // Criar resultado individual

    const result = document.createElement("div");

    result.className = isCorrect
      ? "feedback-item correct"
      : "feedback-item wrong";

    const number = cellNumbers[
      `${placement.r},${placement.c}`
    ];

    if (isCorrect) {

      result.textContent =
        `${number}. Correto! ${placement.word} — ${placement.explanation}`;

    } else {

      result.textContent =
        `${number}. Incorreto. Resposta: ${placement.word} — ${placement.explanation}`;
    }

    feedbackElement.appendChild(result);

  });

  // Atualizar pontuação

  scoreElement.textContent =
    `${correct} de ${placements.length}`;

  // Mensagem final

  const finalMessage = document.createElement("div");

  finalMessage.className = "feedback-item neutral";

  if (correct === placements.length) {

    finalMessage.textContent =
      "🎉 Parabéns! Você completou toda a cruzadinha!";

  } else {

    finalMessage.textContent =
      `Você acertou ${correct} de ${placements.length} palavras. Continue tentando!`;
  }

  feedbackElement.prepend(finalMessage);
}

// ==========================================
// LIMPAR FEEDBACK
// ==========================================

function clearFeedback() {

  feedbackElement.innerHTML = "";

  gridElement.querySelectorAll(".cell").forEach(cell => {

    cell.classList.remove(
      "answer-correct",
      "answer-wrong"
    );

  });

}

// ==========================================
// REINICIAR JOGO
// ==========================================

function resetGame() {

  gridElement.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  clearFeedback();

  clearSelection();

  scoreElement.textContent =
    `0 de ${placements.length}`;

}

// ==========================================
// MELHORAR SOLUÇÃO
// ==========================================

function improveSolution() {

  try {

    const result = generateCrossword();

    // Só substitui o tabuleiro se encontrar
    // uma solução com pelo menos tantos termos.

    if (result.placements.length >= placements.length) {

      placements = result.placements;
      crosswordGrid = result.grid;

      createCrossword();

      feedbackElement.innerHTML = "";

      const message = document.createElement("div");

      message.className = "feedback-item neutral";

      message.textContent =
        "✨ Nova organização do tabuleiro gerada!";

      feedbackElement.appendChild(message);

    } else {

      alert(
        "A nova tentativa não encontrou uma solução melhor. O tabuleiro anterior foi mantido."
      );

    }

  } catch (error) {

    console.error(error);

    alert("Não foi possível melhorar a solução.");

  }

}

// ==========================================
// MOSTRAR OU ESCONDER CASAS BLOQUEADAS
// ==========================================

function toggleBlackCells() {

  const checkbox = document.getElementById("toggle-black");

  if (!checkbox) return;

  if (checkbox.checked) {

    gridElement.classList.remove("hide-black");

  } else {

    gridElement.classList.add("hide-black");

  }

}

// ==========================================
// EVENTOS DOS BOTÕES
// ==========================================

const checkBtn = document.getElementById("check-button");
if (checkBtn) checkBtn.addEventListener("click", checkAnswers);

const resetBtn = document.getElementById("reset-button");
if (resetBtn) resetBtn.addEventListener("click", resetGame);

const improveBtn = document.getElementById("improve-button");
if (improveBtn) improveBtn.addEventListener("click", improveSolution);

const toggleBlack = document.getElementById("toggle-black");
if (toggleBlack) toggleBlack.addEventListener("change", toggleBlackCells);

// ==========================================
// INICIALIZAÇÃO DO JOGO
// ==========================================

try {

  initializeGame();

} catch (error) {

  console.error("Erro ao iniciar a cruzadinha:", error);

  feedbackElement.textContent =
    "Erro ao montar o tabuleiro: " + error.message;

}

// ==========================================
// FIM DO SCRIPT.JS
// ==========================================
