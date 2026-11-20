
/* ==========================================
   COMPLETE A ARQUITETURA
   ARQUITETURA COMPUTACIONAL
   ========================================== */

// ==========================================
// BANCO DE QUESTÕES
// ==========================================

const questions = [

  {
    id: 1,
    category: "PROCESSADOR",
    before: "A unidade responsável por realizar operações aritméticas e lógicas é a",
    after: ".",
    answer: "ULA",
    explanation: "A Unidade Lógica e Aritmética (ULA) realiza cálculos e operações lógicas no processador."
  },

  {
    id: 2,
    category: "MEMÓRIA",
    before: "A memória de alta velocidade que armazena dados frequentemente utilizados é a",
    after: ".",
    answer: "CACHE",
    explanation: "A memória cache guarda cópias de dados e instruções para acelerar o acesso da CPU."
  },

  {
    id: 3,
    category: "CONTROLE",
    before: "O componente responsável por interpretar instruções e coordenar as operações é a",
    after: ".",
    answer: "UC",
    explanation: "A Unidade de Controle (UC) interpreta códigos de instrução e coordena o funcionamento dos demais blocos."
  },

  {
    id: 4,
    category: "PROCESSADOR",
    before: "Os pequenos espaços de armazenamento internos da CPU são chamados de",
    after: ".",
    answer: "REGISTRADORES",
    explanation: "Registradores são locais de armazenamento rápido dentro da CPU usados para operações imediatas."
  },

  {
    id: 5,
    category: "BARRAMENTOS",
    before: "O barramento responsável por transportar endereços de memória é o",
    after: ".",
    answer: "ADDRESS BUS",
    explanation: "O Address Bus transporta informações sobre endereços de memória entre componentes."
  },

  {
    id: 6,
    category: "MEMÓRIA",
    before: "A memória que mantém informações armazenadas mesmo sem energia elétrica é chamada de memória",
    after: ".",
    answer: "NÃO VOLÁTIL",
    explanation: "Memórias não voláteis mantêm os dados mesmo quando a alimentação é desligada (ex.: flash, EEPROM)."
  },

  {
    id: 7,
    category: "PROCESSADOR",
    before: "O processador que possui quatro núcleos de processamento é chamado de",
    after: ".",
    answer: "QUAD CORE",
    explanation: "Quad Core indica um processador com quatro núcleos independentes para executar tarefas em paralelo."
  },

  {
    id: 8,
    category: "TRANSFERÊNCIA",
    before: "A tecnologia que permite transferir dados entre memória e periféricos sem intervenção contínua da CPU é chamada de",
    after: ".",
    answer: "DMA",
    explanation: "Direct Memory Access (DMA) permite transferências diretas entre memória e periféricos sem sobrecarregar a CPU."
  }

];

// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================

const questionsList = document.getElementById("questions-list");

const answersBank = document.getElementById("answers-bank");

const scoreElement = document.getElementById("score");

const feedbackElement = document.getElementById("feedback");

const progressText = document.getElementById("progress-text");

const progressFill = document.getElementById("progress-fill");

const answersCount = document.getElementById("answers-count");

let dragState = null;

let hasChecked = false;

// ==========================================
// EMBARALHAR RESPOSTAS
// ==========================================

function shuffleArray(array) {

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] =
      [shuffled[j], shuffled[i]];

  }

  return shuffled;
}

// ==========================================
// CRIAR QUADRADO DE RESPOSTA
// ==========================================

function createAnswerCard(answer) {

  const card = document.createElement("div");

  card.className = "answer-card";

  card.textContent = answer;

  card.dataset.answer = answer;

  card.setAttribute("role", "button");

  card.setAttribute("aria-label", `Resposta ${answer}`);

  card.setAttribute("tabindex", "0");

  return card;
}

// ==========================================
// RENDERIZAR QUESTÕES
// ==========================================

function renderQuestions() {

  questionsList.innerHTML = "";

  questions.forEach(question => {

    const card = document.createElement("div");

    card.className = "question-card";

    card.dataset.question = question.id;

    const number = document.createElement("span");

    number.className = "question-number";

    number.textContent =
      `${String(question.id).padStart(2, "0")} — ${question.category}`;

    const text = document.createElement("p");

    text.className = "question-text";

    text.append(
      document.createTextNode(question.before + " ")
    );

    const dropzone = document.createElement("span");

    dropzone.className = "dropzone empty";

    dropzone.dataset.question = question.id;

    dropzone.dataset.answer = question.answer;

    dropzone.setAttribute(
      "aria-label",
      `Espaço para resposta da questão ${question.id}`
    );

    text.appendChild(dropzone);

    text.append(
      document.createTextNode(question.after)
    );

    card.appendChild(number);

    card.appendChild(text);

    questionsList.appendChild(card);

  });

}

// ==========================================
// RENDERIZAR BANCO DE RESPOSTAS
// ==========================================

function renderAnswers() {

  answersBank.innerHTML = "";

  const answers = shuffleArray(
    questions.map(question => question.answer)
  );

  answers.forEach(answer => {

    answersBank.appendChild(
      createAnswerCard(answer)
    );

  });

  updateProgress();

}

// ==========================================
// ATUALIZAR PROGRESSO
// ==========================================

function updateProgress() {

  const filled = document.querySelectorAll(
    ".dropzone .answer-card"
  ).length;

  const total = questions.length;

  const percentage = Math.round(
    (filled / total) * 100
  );

  progressText.textContent = `${percentage}%`;

  progressFill.style.width = `${percentage}%`;

  const available = answersBank.querySelectorAll(
    ".answer-card"
  ).length;

  answersCount.textContent =
    `${available} disponíveis`;

}

// ==========================================
// LIMPAR RESULTADOS ANTERIORES
// ==========================================

function clearResults() {

  hasChecked = false;

  feedbackElement.innerHTML = "";

  document.querySelectorAll(".dropzone").forEach(zone => {

    zone.classList.remove("correct", "wrong");

  });

  document.querySelectorAll(".answer-card").forEach(card => {

    card.classList.remove(
      "correct-answer",
      "wrong-answer"
    );

  });

}

// ==========================================
// INICIAR ARRASTAR E SOLTAR
// ==========================================

function startDrag(event, card) {

  if (event.button !== undefined && event.button !== 0) {
    return;
  }

  event.preventDefault();

  const ghost = card.cloneNode(true);

  ghost.classList.add("drag-ghost");

  ghost.classList.remove("placed", "dragging");

  document.body.appendChild(ghost);

  card.classList.add("dragging");

  dragState = {
    card,
    ghost,
    pointerId: event.pointerId,
    sourceZone: card.closest(".dropzone")
  };

  moveGhost(event.clientX, event.clientY);

}

// ==========================================
// MOVIMENTAR QUADRADO
// ==========================================

function moveGhost(x, y) {

  if (!dragState) return;

  dragState.ghost.style.left = `${x}px`;

  dragState.ghost.style.top = `${y}px`;

}

// ==========================================
// MOVIMENTAÇÃO DO PONTEIRO
// ==========================================

document.addEventListener("pointermove", event => {

  if (!dragState) return;

  if (event.pointerId !== dragState.pointerId) return;

  event.preventDefault();

  moveGhost(event.clientX, event.clientY);

  document.querySelectorAll(".dropzone").forEach(zone => {

    zone.classList.remove("drag-over");

  });

  const target = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const zone = target?.closest(".dropzone");

  if (zone) {

    zone.classList.add("drag-over");

  }

}, { passive: false });

// ==========================================
// FINALIZAR ARRASTAR E SOLTAR
// ==========================================

document.addEventListener("pointerup", event => {

  if (!dragState) return;

  if (event.pointerId !== dragState.pointerId) return;

  const target = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const destination = target?.closest(".dropzone");

  const bankDestination = target?.closest(".answers-bank");

  const card = dragState.card;

  const sourceZone = dragState.sourceZone;

  // Remove o destaque

  document.querySelectorAll(".dropzone").forEach(zone => {

    zone.classList.remove("drag-over");

  });

  card.classList.remove("dragging");

  dragState.ghost.remove();

  // Soltar em outra lacuna

  if (destination && destination !== sourceZone) {

    // Devolve a resposta que já estava na lacuna

    const existingCard = destination.querySelector(
      ".answer-card"
    );

    if (existingCard) {

      answersBank.appendChild(existingCard);

    }

    destination.appendChild(card);

  }

  // Devolver resposta ao banco

  else if (bankDestination && sourceZone) {

    answersBank.appendChild(card);

  }

  // Atualiza o estado visual

  updateZones();

  clearResults();

  updateProgress();

  dragState = null;

});

// ==========================================
// CANCELAR ARRASTAMENTO
// ==========================================

document.addEventListener("pointercancel", event => {

  if (!dragState) return;

  if (event.pointerId !== dragState.pointerId) return;

  dragState.card.classList.remove("dragging");

  dragState.ghost.remove();

  dragState = null;

  document.querySelectorAll(".dropzone").forEach(zone => {

    zone.classList.remove("drag-over");

  });

});

// ==========================================
// ATUALIZAR ESTADO DAS LACUNAS
// ==========================================

function updateZones() {

  document.querySelectorAll(".dropzone").forEach(zone => {

    const card = zone.querySelector(".answer-card");

    if (card) {

      zone.classList.remove("empty");

      zone.classList.add("filled");

      card.classList.add("placed");

    } else {

      zone.classList.remove("filled");

      zone.classList.add("empty");

    }

  });

}

// ==========================================
// CONFERIR RESPOSTAS
// ==========================================

function checkAnswers() {

  feedbackElement.innerHTML = "";

  let correct = 0;

  questions.forEach(question => {

    const zone = document.querySelector(
      `.dropzone[data-question="${question.id}"]`
    );

    const card = zone.querySelector(".answer-card");

    const playerAnswer = card
      ? card.dataset.answer
      : "";

    const isCorrect =
      playerAnswer === question.answer;

    if (isCorrect) {

      correct++;

      zone.classList.add("correct");

      zone.classList.remove("wrong");

      card.classList.add("correct-answer");

      card.classList.remove("wrong-answer");

    } else {

      zone.classList.add("wrong");

      zone.classList.remove("correct");

      if (card) {

        card.classList.add("wrong-answer");

        card.classList.remove("correct-answer");

      }

    }

    // Resultado individual

    const result = document.createElement("div");

    result.className = isCorrect
      ? "feedback-item correct"
      : "feedback-item wrong";

    const number = String(question.id).padStart(2, "0");

    if (isCorrect) {

      result.textContent =
        `${number}. Correto! ${question.answer} — ${question.explanation}`;

    } else {

      result.textContent =
        `${number}. Incorreto. Resposta correta: ${question.answer}. ${question.explanation}`;

    }

    feedbackElement.appendChild(result);

  });

  // Atualizar pontuação

  scoreElement.textContent =
    `${correct} de ${questions.length}`;

  // Mensagem final

  const finalMessage = document.createElement("div");

  finalMessage.className = "feedback-item neutral";

  if (correct === questions.length) {

    finalMessage.textContent =
      "🎉 Parabéns! Você completou todas as frases corretamente!";

  } else {

    finalMessage.textContent =
      `Você acertou ${correct} de ${questions.length} questões. Continue tentando!`;

  }

  feedbackElement.prepend(finalMessage);

  hasChecked = true;

}

// ==========================================
// REINICIAR JOGO
// ==========================================

function resetGame() {

  renderQuestions();

  renderAnswers();

  scoreElement.textContent =
    `0 de ${questions.length}`;

  progressText.textContent = "0%";

  progressFill.style.width = "0%";

  feedbackElement.innerHTML = "";

  hasChecked = false;

}

// ==========================================
// EVENTOS DOS QUADRADOS
// ==========================================

answersBank.addEventListener("pointerdown", event => {

  const card = event.target.closest(".answer-card");

  if (!card || dragState) return;

  startDrag(event, card);

});

// ==========================================
// EVENTOS DOS BOTÕES
// ==========================================

const checkButton = document.getElementById("check-button");

const resetButton = document.getElementById("reset-button");

checkButton.addEventListener("click", checkAnswers);

resetButton.addEventListener("click", resetGame);

// ==========================================
// INICIALIZAÇÃO
// ==========================================

function initializeGame() {

  renderQuestions();

  renderAnswers();

  scoreElement.textContent =
    `0 de ${questions.length}`;

}

try {

  initializeGame();

} catch (error) {

  console.error("Erro ao iniciar o jogo:", error);

  feedbackElement.textContent =
    "Não foi possível iniciar o jogo. Atualize a página e tente novamente.";

}

// ==========================================
// FIM DO JOGO
// ==========================================
