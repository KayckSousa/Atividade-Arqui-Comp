
/**
 * expressoes-logicas.js
 * Jogo educativo de identificação de expressões lógicas.
 */

// Banco de questões
const questoes = [
  {
    porta: "AND",
    simbolo: "∧",
    expressao: "A ∧ B",
    alternativas: ["A ∨ B", "¬A", "A ⊕ B"],
    descricao: "A saída depende das duas entradas serem verdadeiras.",
    explicacao: "A porta AND realiza a operação E. Sua expressão é A ∧ B.",
    a: 1, b: 1
  },
  {
    porta: "OR",
    simbolo: "∨",
    expressao: "A ∨ B",
    alternativas: ["A ∧ B", "¬(A ∧ B)", "A ⊕ B"],
    descricao: "A saída será verdadeira se pelo menos uma entrada for verdadeira.",
    explicacao: "A porta OR realiza a operação OU. Sua expressão é A ∨ B.",
    a: 0, b: 1
  },
  {
    porta: "NOT",
    simbolo: "¬",
    expressao: "¬A",
    alternativas: ["A ∧ B", "A ∨ B", "¬(A ∧ B)"],
    descricao: "Observe que esta porta possui apenas uma entrada.",
    explicacao: "A porta NOT inverte a entrada. Sua expressão é ¬A.",
    a: 1, b: null
  },
  {
    porta: "NAND",
    simbolo: "¬∧",
    expressao: "¬(A ∧ B)",
    alternativas: ["A ∧ B", "A ∨ B", "¬(A ∨ B)"],
    descricao: "Esta porta realiza uma operação AND seguida de uma negação.",
    explicacao: "A porta NAND é a negação da AND. Sua expressão é ¬(A ∧ B).",
    a: 1, b: 1
  },
  {
    porta: "NOR",
    simbolo: "¬∨",
    expressao: "¬(A ∨ B)",
    alternativas: ["A ∨ B", "A ∧ B", "¬(A ∧ B)"],
    descricao: "Esta porta realiza uma operação OR seguida de uma negação.",
    explicacao: "A porta NOR é a negação da OR. Sua expressão é ¬(A ∨ B).",
    a: 0, b: 0
  },
  {
    porta: "XOR",
    simbolo: "⊕",
    expressao: "A ⊕ B",
    alternativas: ["A ∧ B", "A ∨ B", "¬(A ∨ B)"],
    descricao: "A saída será verdadeira quando as entradas forem diferentes.",
    explicacao: "A porta XOR representa o OU exclusivo. Sua expressão é A ⊕ B.",
    a: 1, b: 0
  },
  {
    porta: "XNOR",
    simbolo: "≡",
    expressao: "A ≡ B",
    alternativas: ["A ⊕ B", "A ∧ B", "A ∨ B"],
    descricao: "A saída será verdadeira quando as entradas forem iguais.",
    explicacao: "A porta XNOR é a negação da XOR. Sua expressão é A ≡ B.",
    a: 1, b: 1
  },
  {
    porta: "AND",
    simbolo: "∧",
    expressao: "A ∧ B",
    alternativas: ["A ∨ B", "¬(A ∨ B)", "A ⊕ B"],
    descricao: "Identifique a operação realizada pela porta E.",
    explicacao: "A porta AND exige que as duas entradas sejam verdadeiras.",
    a: 0, b: 0
  },
  {
    porta: "OR",
    simbolo: "∨",
    expressao: "A ∨ B",
    alternativas: ["A ∧ B", "¬A", "A ⊕ B"],
    descricao: "Observe a porta OU e identifique sua representação algébrica.",
    explicacao: "A porta OR retorna verdadeiro quando pelo menos uma entrada é 1.",
    a: 1, b: 1
  },
  {
    porta: "NOT",
    simbolo: "¬",
    expressao: "¬A",
    alternativas: ["A", "A ∧ B", "A ∨ B"],
    descricao: "Identifique a expressão correspondente à inversão lógica.",
    explicacao: "A operação NOT nega a entrada A, representada por ¬A.",
    a: 0, b: null
  },
  {
    porta: "NAND",
    simbolo: "¬∧",
    expressao: "¬(A ∧ B)",
    alternativas: ["A ∧ B", "A ∨ B", "A ⊕ B"],
    descricao: "Qual expressão representa a negação da operação AND?",
    explicacao: "A NAND corresponde à negação da AND: ¬(A ∧ B).",
    a: 0, b: 1
  },
  {
    porta: "XOR",
    simbolo: "⊕",
    expressao: "A ⊕ B",
    alternativas: ["A ∧ B", "A ∨ B", "¬(A ∧ B)"],
    descricao: "Identifique a expressão do OU exclusivo.",
    explicacao: "A XOR retorna 1 quando as entradas são diferentes.",
    a: 1, b: 1
  }
];

// Fornecer um módulo PortasLogicas local caso não seja carregado externamente
if (typeof window !== 'undefined' && typeof window.PortasLogicas === 'undefined') {
  window.PortasLogicas = {
    AND(a,b){ return Number(Boolean(a) && Boolean(b)); },
    OR(a,b){ return Number(Boolean(a) || Boolean(b)); },
    NOT(a){ return Number(!Boolean(a)); },
    NAND(a,b){ return Number(!(Boolean(a) && Boolean(b))); },
    NOR(a,b){ return Number(!(Boolean(a) || Boolean(b))); },
    XOR(a,b){ return Number(Boolean(a) !== Boolean(b)); },
    XNOR(a,b){ return Number(Boolean(a) === Boolean(b)); },
    validarEntrada(...entradas){ return entradas.every(e => e === 0 || e === 1); },
    executar(porta, ...entradas){
      const nome = String(porta).toUpperCase();
      if (nome === 'NOT') return this.NOT(entradas[0]);
      if (!this.validarEntrada(...entradas)) throw new Error('Entradas devem ser 0 ou 1');
      if (typeof this[nome] !== 'function') throw new Error('Porta não encontrada: ' + porta);
      return this[nome](...entradas);
    }
  };
}

// Elementos da página
const elementos = {
  score: document.getElementById("score"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-fill"),
  questionNumber: document.getElementById("question-number"),
  description: document.getElementById("question-description"),
  gateName: document.getElementById("gate-name"),
  gateIcon: document.getElementById("gate-symbol"),
  inputBLine: document.getElementById("input-b-container"),
  options: document.getElementById("answer-options"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  resetButton: document.getElementById("reset-button")
};

// Estado do jogo
let questaoAtual = 0;
let pontuacao = 0;
let respondida = false;
let alternativasAtuais = [];

// Embaralhar alternativas
function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// Carregar questão
function carregarQuestao() {
  const questao = questoes[questaoAtual];

  respondida = false;

  elementos.questionNumber.textContent =
    `QUESTÃO ${String(questaoAtual + 1).padStart(2, "0")} DE ${questoes.length}`;

  elementos.description.textContent = questao.descricao;

  elementos.gateName.textContent = questao.porta;
  // desenhar a porta dinamicamente como SVG
  elementos.gateIcon.innerHTML = desenharPorta(questao.porta, questao.a, questao.b);

  // NOT possui somente uma entrada
  elementos.inputBLine.style.display =
    questao.porta === "NOT" ? "none" : "flex";

  // Gerar alternativas
  alternativasAtuais = embaralhar([
    questao.expressao,
    ...questao.alternativas
  ]);

  elementos.options.innerHTML = "";

  alternativasAtuais.forEach((alternativa, indice) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "answer-button";
    botao.dataset.answer = indice;
    botao.textContent = alternativa;

    botao.addEventListener("click", () => {
      verificarResposta(indice);
    });

    elementos.options.appendChild(botao);
  });

  elementos.feedback.innerHTML = "";
  elementos.nextButton.disabled = true;
  elementos.nextButton.textContent = "Próxima questão →";

  atualizarProgresso();
}

// Desenha um SVG representando a porta lógica e indicadores das entradas

function desenharPorta(porta, a, b) {
  const colorA = a === 1 ? "#28a745" : "#d9534f";
  const colorB = b === 1 ? "#28a745" : "#d9534f";

  const gid = "gate_" + porta.toLowerCase();

  // Desenhos padronizados das portas lógicas
  const shapes = {

    AND: `
      <path class="gate-path"
        d="M38 25
           H78
           A35 35 0 0 1 78 95
           H38 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>
    `,

    OR: `
      <path class="gate-path"
        d="M38 25
           C68 25 105 42 140 60
           C105 78 68 95 38 95
           C53 75 53 45 38 25 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>
    `,

    NOT: `
      <path class="gate-path"
        d="M38 25
           L125 60
           L38 95 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>

      <circle cx="137" cy="60" r="7"
        fill="white"
        stroke="#144c48"
        stroke-width="2.5"/>
    `,

    NAND: `
      <path class="gate-path"
        d="M38 25
           H78
           A35 35 0 0 1 78 95
           H38 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>

      <circle cx="125" cy="60" r="7"
        fill="white"
        stroke="#144c48"
        stroke-width="2.5"/>
    `,

    NOR: `
      <path class="gate-path"
        d="M38 25
           C68 25 105 42 140 60
           C105 78 68 95 38 95
           C53 75 53 45 38 25 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>

      <circle cx="150" cy="60" r="7"
        fill="white"
        stroke="#144c48"
        stroke-width="2.5"/>
    `,

    XOR: `
      <!-- Curva adicional característica da XOR -->
      <path class="gate-path"
        d="M23 25
           C42 45 42 75 23 95"
        fill="none"
        stroke="#144c48"
        stroke-width="3"/>

      <!-- Corpo principal -->
      <path class="gate-path"
        d="M38 25
           C68 25 105 42 140 60
           C105 78 68 95 38 95
           C53 75 53 45 38 25 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>
    `,

    XNOR: `
      <!-- Curva adicional característica da XOR -->
      <path class="gate-path"
        d="M23 25
           C42 45 42 75 23 95"
        fill="none"
        stroke="#144c48"
        stroke-width="3"/>

      <!-- Corpo principal -->
      <path class="gate-path"
        d="M38 25
           C68 25 105 42 140 60
           C105 78 68 95 38 95
           C53 75 53 45 38 25 Z"
        fill="url(#${gid}_grad)"
        stroke="#144c48"
        stroke-width="3"/>

      <!-- Bolha de inversão -->
      <circle cx="150" cy="60" r="7"
        fill="white"
        stroke="#144c48"
        stroke-width="2.5"/>
    `
  };

  const shape = shapes[porta] || shapes.AND;

  // Indicadores das entradas
  const circleA = `
    <circle class="input-indicator"
      cx="10" cy="34" r="7"
      fill="${colorA}"
      stroke="#144c48"
      stroke-width="2"/>
  `;

  const circleB = b === null ? "" : `
    <circle class="input-indicator"
      cx="10" cy="82" r="7"
      fill="${colorB}"
      stroke="#144c48"
      stroke-width="2"/>
  `;

  // Fios de entrada
  const lineA = `
    <path class="wire-path"
      d="M18 34 H40"
      stroke="#144c48"
      stroke-width="3.5"
      fill="none"/>
  `;

  const lineB = b === null ? "" : `
    <path class="wire-path"
      d="M18 82 H40"
      stroke="#144c48"
      stroke-width="3.5"
      fill="none"/>
  `;

  // Posição da saída conforme a porta
  const outputStart = ["NOR", "XNOR"].includes(porta)
    ? 157
    : porta === "NAND"
      ? 132
      : porta === "NOT"
        ? 145
        : 140;

  const outputLine = `
    <path class="wire-path"
      d="M${outputStart} 60 H175"
      stroke="#144c48"
      stroke-width="3.5"
      fill="none"/>
  `;

  // Identificação da porta
  const label = `
    <text class="svg-gate-label"
      x="90" y="15"
      font-size="11"
      font-weight="800"
      text-anchor="middle">
      ${porta}
    </text>
  `;

  return `
    <svg
      class="gate-illustration"
      viewBox="0 0 185 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Porta lógica ${porta}">

      <defs>
        <linearGradient
          id="${gid}_grad"
          x1="0" y1="0"
          x2="1" y2="1">

          <stop offset="0%"
            stop-color="#f0fbf9"/>

          <stop offset="100%"
            stop-color="#ccebe4"/>

        </linearGradient>
      </defs>

      ${label}

      ${circleA}
      ${circleB}

      ${lineA}
      ${lineB}

      ${shape}

      ${outputLine}

      <text class="svg-value"
        x="5" y="18"
        font-size="9">
        A=${a}
      </text>

      ${b === null ? "" : `
        <text class="svg-value"
          x="5" y="112"
          font-size="9">
          B=${b}
        </text>
      `}

    </svg>
  `;
}


// Verificar resposta
function verificarResposta(indice) {
  if (respondida) return;

  respondida = true;

  const questao = questoes[questaoAtual];

  const respostaSelecionada = alternativasAtuais[indice];

  const correta = respostaSelecionada === questao.expressao;

  // Utiliza o módulo de portas lógicas já existente
  let saida;

  try {
    saida = PortasLogicas.executar(
      questao.porta,
      ...(
        questao.porta === "NOT"
          ? [questao.a]
          : [questao.a, questao.b]
      )
    );
  } catch (erro) {
    elementos.feedback.textContent =
      "Erro ao executar a operação lógica: " + erro.message;
    return;
  }

  const botoes = elementos.options.querySelectorAll("button");

  botoes.forEach((botao, i) => {
    botao.disabled = true;

    if (alternativasAtuais[i] === questao.expressao) {
      botao.classList.add("correct");
    } else if (i === indice && !correta) {
      botao.classList.add("wrong");
    }
  });

  if (correta) {
    pontuacao++;

    elementos.feedback.innerHTML = `
      <div class="feedback-item correct">
        <strong>✓ Muito bem! Resposta correta!</strong><br>
        ${questao.explicacao}
        <br><br>
        Saída do circuito: ${saida}
      </div>
    `;
  } else {
    elementos.feedback.innerHTML = `
      <div class="feedback-item wrong">
        <strong>✗ Resposta incorreta!</strong><br>
        A expressão correta é <strong>${questao.expressao}</strong>.
        <br>
        ${questao.explicacao}
        <br><br>
        Saída do circuito: ${saida}
      </div>
    `;
  }

  atualizarProgresso();

  elementos.nextButton.disabled = false;

  elementos.nextButton.textContent =
    questaoAtual === questoes.length - 1
      ? "Ver resultado →"
      : "Próxima questão →";
}

// Atualizar pontuação e progresso
function atualizarProgresso() {
  const respondidas = questaoAtual + (respondida ? 1 : 0);

  const porcentagem =
    Math.round((respondidas / questoes.length) * 100);

  elementos.score.textContent =
    `${pontuacao} de ${questoes.length}`;

  elementos.progressText.textContent = `${porcentagem}%`;

  elementos.progressFill.style.width = `${porcentagem}%`;
}

// Avançar questão
function proximaQuestao() {
  if (!respondida) return;

  if (questaoAtual < questoes.length - 1) {
    questaoAtual++;
    carregarQuestao();
  } else {
    finalizarJogo();
  }
}

// Finalizar jogo
function finalizarJogo() {
  const porcentagem =
    Math.round((pontuacao / questoes.length) * 100);

  let mensagem;

  if (porcentagem === 100) {
    mensagem = "Excelente! Você domina as expressões lógicas!";
  } else if (porcentagem >= 70) {
    mensagem = "Muito bom! Você tem um ótimo conhecimento!";
  } else if (porcentagem >= 50) {
    mensagem = "Bom trabalho! Continue praticando!";
  } else {
    mensagem = "Continue estudando! Você pode melhorar!";
  }

  elementos.questionNumber.textContent = "DESAFIO CONCLUÍDO";

  elementos.description.textContent =
    "Você terminou todas as questões do desafio.";

  elementos.gateName.textContent = "FIM";
  elementos.gateIcon.textContent = "✓";

  elementos.inputBLine.style.display = "none";

  elementos.options.innerHTML = `
    <div class="feedback-item neutral">
      <strong>Resultado final</strong><br>
      ${mensagem}<br><br>
      Acertos: ${pontuacao} de ${questoes.length}<br>
      Aproveitamento: ${porcentagem}%
    </div>
  `;

  elementos.feedback.innerHTML = `
    <div class="feedback-item correct">
      Parabéns por concluir o Desafio das Expressões Lógicas!
    </div>
  `;

  elementos.nextButton.disabled = true;
  elementos.nextButton.textContent = "Desafio concluído!";
}

// Reiniciar jogo
function reiniciarJogo() {
  questaoAtual = 0;
  pontuacao = 0;
  respondida = false;

  carregarQuestao();
}

// Eventos
elementos.nextButton.addEventListener(
  "click",
  proximaQuestao
);

elementos.resetButton.addEventListener(
  "click",
  reiniciarJogo
);

// Iniciar jogo
carregarQuestao();
