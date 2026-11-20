
const questions = [

  // QUESTÃO 01 - SISTEMA DECIMAL

  {
    origin: "DECIMAL",
    destination: "IDENTIFICAR POSIÇÃO DO 5",
    value: "594",
    prompt: "Qual é a posição ocupada pelo algarismo 5?",
    options: ["Unidade", "Dezena", "Centena", "Milhar"],
    answer: "Centena",

    explanation:
      "O sistema decimal é de base 10. Cada posição representa uma potência de 10.<br><br>" +

      "5 × 100 + 9 × 10 + 4 × 1<br>" +
      "5 × 10² + 9 × 10¹ + 4 × 10⁰<br><br>" +

      "No número 594:<br>" +
      "5 → Centena (5 × 100)<br>" +
      "9 → Dezena (9 × 10)<br>" +
      "4 → Unidade (4 × 1)<br><br>" +

      "Portanto, o algarismo 5 ocupa a posição das centenas."
  },

  // QUESTÃO 02 - BINÁRIO PARA DECIMAL

  {
    origin: "BINÁRIO",
    destination: "CONVERTER PARA DECIMAL",
    value: "1010",
    prompt: "Qual é o valor decimal do número binário apresentado?",
    options: ["8", "10", "12", "14"],
    answer: "10",

    explanation:
      "O sistema binário é de base 2 e utiliza apenas os algarismos 0 e 1.<br><br>" +

      "Para converter para decimal, multiplicamos cada algarismo pela potência de 2 correspondente à sua posição:<br><br>" +

      "Posições: 2³ | 2² | 2¹ | 2⁰<br>" +
      "Número:    1  |  0  |  1  |  0<br><br>" +

      "1 × 8 + 0 × 4 + 1 × 2 + 0 × 1<br>" +
      "8 + 0 + 2 + 0 = 10<br><br>" +

      "Portanto, 1010₂ = 10₁₀."
  },

  // QUESTÃO 03 - DECIMAL PARA BINÁRIO

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA BINÁRIO",
    value: "5",
    prompt: "Qual é a representação binária do número decimal 5?",
    options: ["101", "100", "111", "110"],
    answer: "101",

    explanation:
      "Para converter decimal em binário, utilizamos divisões sucessivas pela base 2.<br><br>" +

      "5 ÷ 2 = 2, resto 1<br>" +
      "2 ÷ 2 = 1, resto 0<br>" +
      "1 ÷ 2 = 0, resto 1<br><br>" +

      "Agora lemos os restos de baixo para cima:<br>" +
      "1 → 0 → 1<br><br>" +

      "Portanto, 5₁₀ = 101₂."
  },

  // QUESTÃO 04 - DECIMAL PARA BINÁRIO

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA BINÁRIO",
    value: "13",
    prompt: "Qual é a representação binária do número decimal 13?",
    options: ["1101", "1011", "1110", "1001"],
    answer: "1101",

    explanation:
      "Podemos representar o número decimal utilizando as potências de 2.<br><br>" +

      "13 = 8 + 4 + 0 + 1<br><br>" +

      "Potências: 2³ | 2² | 2¹ | 2⁰<br>" +
      "Valores:     8  |  4  |  2  |  1<br>" +
      "Bits:        1  |  1  |  0  |  1<br><br>" +

      "Juntando os bits: 1101.<br><br>" +

      "Portanto, 13₁₀ = 1101₂."
  },

  // QUESTÃO 05 - BINÁRIO PARA DECIMAL

  {
    origin: "BINÁRIO",
    destination: "CONVERTER PARA DECIMAL",
    value: "1101",
    prompt: "Qual é o valor decimal do número binário apresentado?",
    options: ["11", "12", "13", "14"],
    answer: "13",

    explanation:
      "Para converter binário em decimal, utilizamos as potências de 2, começando pela direita com expoente zero.<br><br>" +

      "2³ | 2² | 2¹ | 2⁰<br>" +
      "1  |  1  |  0  |  1<br><br>" +

      "1 × 8 + 1 × 4 + 0 × 2 + 1 × 1<br>" +
      "8 + 4 + 0 + 1 = 13<br><br>" +

      "Portanto, 1101₂ = 13₁₀."
  },

  // QUESTÃO 06 - DECIMAL PARA OCTAL

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA OCTAL",
    value: "144",
    prompt: "Qual é a representação octal do número decimal 144?",
    options: ["220", "211", "200", "254"],
    answer: "220",

    explanation:
      "O sistema octal é de base 8 e utiliza os algarismos de 0 até 7.<br><br>" +

      "Para converter decimal em octal, dividimos sucessivamente por 8:<br><br>" +

      "144 ÷ 8 = 18, resto 0<br>" +
      "18 ÷ 8 = 2, resto 2<br>" +
      "2 ÷ 8 = 0, resto 2<br><br>" +

      "Lemos os restos de baixo para cima:<br>" +
      "2 → 2 → 0<br><br>" +

      "Portanto, 144₁₀ = 220₈."
  },

  // QUESTÃO 07 - OCTAL PARA DECIMAL

  {
    origin: "OCTAL",
    destination: "CONVERTER PARA DECIMAL",
    value: "17",
    prompt: "Qual é o valor decimal do número octal apresentado?",
    options: ["13", "14", "15", "16"],
    answer: "15",

    explanation:
      "O sistema octal é de base 8. Para converter para decimal, multiplicamos cada algarismo pela potência de 8 correspondente.<br><br>" +

      "Número: 17₈<br>" +
      "Posições: 8¹ | 8⁰<br><br>" +

      "1 × 8 + 7 × 1<br>" +
      "8 + 7 = 15<br><br>" +

      "Portanto, 17₈ = 15₁₀."
  },

  // QUESTÃO 08 - OCTAL PARA BINÁRIO

  {
    origin: "OCTAL",
    destination: "CONVERTER PARA BINÁRIO",
    value: "12",
    prompt: "Qual é a representação binária do número octal 12?",
    options: ["1001", "1010", "1011", "1100"],
    answer: "1010",

    explanation:
      "Cada algarismo do sistema octal corresponde a um grupo de 3 bits no sistema binário.<br><br>" +

      "Vamos converter cada algarismo separadamente:<br><br>" +

      "1₈ = 001₂<br>" +
      "2₈ = 010₂<br><br>" +

      "Juntando os grupos:<br>" +
      "001 010<br><br>" +

      "Retirando os zeros à esquerda: 1010.<br><br>" +

      "Portanto, 12₈ = 1010₂."
  },

  // QUESTÃO 09 - DECIMAL PARA HEXADECIMAL

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA HEXADECIMAL",
    value: "255",
    prompt: "Qual é a representação hexadecimal do número decimal 255?",
    options: ["AA", "FF", "F0", "BB"],
    answer: "FF",

    explanation:
      "O sistema hexadecimal é de base 16.<br><br>" +

      "Os valores de 10 até 15 são representados pelas letras A, B, C, D, E e F.<br><br>" +

      "Para converter 255 em hexadecimal, dividimos por 16:<br><br>" +

      "255 ÷ 16 = 15, resto 15<br><br>" +

      "O valor 15 corresponde à letra F.<br>" +
      "O quociente 15 também corresponde à letra F.<br><br>" +

      "Lendo o resultado: FF.<br><br>" +

      "Portanto, 255₁₀ = FF₁₆."
  },

  // QUESTÃO 10 - HEXADECIMAL PARA DECIMAL

  {
    origin: "HEXADECIMAL",
    destination: "CONVERTER PARA DECIMAL",
    value: "1A",
    prompt: "Qual é o valor decimal do número hexadecimal 1A?",
    options: ["24", "25", "26", "28"],
    answer: "26",

    explanation:
      "O sistema hexadecimal é de base 16. A letra A representa o valor decimal 10.<br><br>" +

      "Número: 1A₁₆<br>" +
      "Posições: 16¹ | 16⁰<br><br>" +

      "1 × 16 + A × 1<br>" +
      "1 × 16 + 10 × 1<br>" +
      "16 + 10 = 26<br><br>" +

      "Portanto, 1A₁₆ = 26₁₀."
  },

  // QUESTÃO 11 - BINÁRIO PARA HEXADECIMAL

  {
    origin: "BINÁRIO",
    destination: "CONVERTER PARA HEXADECIMAL",
    value: "11111111",
    prompt: "Qual é a representação hexadecimal do número binário?",
    options: ["EE", "FE", "FF", "AA"],
    answer: "FF",

    explanation:
      "Cada algarismo hexadecimal corresponde a um grupo de 4 bits binários.<br><br>" +

      "Primeiro, separamos o número em grupos de 4 bits, da direita para a esquerda:<br><br>" +

      "1111 | 1111<br><br>" +

      "Agora convertemos cada grupo:<br>" +
      "1111₂ = 15₁₀ = F₁₆<br>" +
      "1111₂ = 15₁₀ = F₁₆<br><br>" +

      "Juntando os resultados: FF.<br><br>" +

      "Portanto, 11111111₂ = FF₁₆."
  },

  // QUESTÃO 12 - HEXADECIMAL PARA BINÁRIO

  {
    origin: "HEXADECIMAL",
    destination: "CONVERTER PARA BINÁRIO",
    value: "A",
    prompt: "Qual é a representação binária da letra A?",
    options: ["1000", "1010", "1100", "1110"],
    answer: "1010",

    explanation:
      "No sistema hexadecimal, cada algarismo corresponde a 4 bits no sistema binário.<br><br>" +

      "A letra A representa o valor decimal 10.<br><br>" +

      "10 em decimal = 8 + 2<br><br>" +

      "Potências: 8 | 4 | 2 | 1<br>" +
      "Bits:      1 | 0 | 1 | 0<br><br>" +

      "Portanto, A₁₆ = 1010₂."
  },

  // QUESTÃO 13 - DECIMAL PARA HEXADECIMAL

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA HEXADECIMAL",
    value: "100",
    prompt: "Qual é a representação hexadecimal do número decimal 100?",
    options: ["50", "60", "64", "70"],
    answer: "64",

    explanation:
      "O sistema hexadecimal utiliza a base 16.<br><br>" +

      "Para converter 100 decimal em hexadecimal, dividimos por 16:<br><br>" +

      "100 ÷ 16 = 6, resto 4<br><br>" +

      "O quociente é 6 e o resto é 4.<br>" +
      "Lendo o resultado: 64.<br><br>" +

      "Conferindo:<br>" +
      "6 × 16 + 4 × 1<br>" +
      "96 + 4 = 100<br><br>" +

      "Portanto, 100₁₀ = 64₁₆."
  },

  // QUESTÃO 14 - BASE HEXADECIMAL

  {
    origin: "SISTEMA",
    destination: "QUAL A BASE?",
    value: "HEXADECIMAL",
    prompt: "Qual é a base do sistema hexadecimal?",
    options: ["8", "10", "16", "2"],
    answer: "16",

    explanation:
      "O sistema hexadecimal possui base 16.<br><br>" +

      "Ele utiliza 16 símbolos diferentes:<br>" +
      "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E e F.<br><br>" +

      "As letras representam os seguintes valores:<br>" +
      "A = 10 | B = 11 | C = 12<br>" +
      "D = 13 | E = 14 | F = 15<br><br>" +

      "Portanto, a base do sistema hexadecimal é 16."
  },

  // QUESTÃO 15 - BASE BINÁRIA

  {
    origin: "SISTEMA",
    destination: "QUAL A BASE?",
    value: "BINÁRIO",
    prompt: "Qual é a base do sistema binário?",
    options: ["2", "8", "10", "16"],
    answer: "2",

    explanation:
      "O sistema binário possui base 2.<br><br>" +

      "Isso significa que utiliza somente dois algarismos:<br>" +
      "0 e 1.<br><br>" +

      "Cada posição representa uma potência de 2:<br>" +
      "2⁰ = 1<br>" +
      "2¹ = 2<br>" +
      "2² = 4<br>" +
      "2³ = 8<br><br>" +

      "Portanto, a base do sistema binário é 2."
  },

  // QUESTÃO 16 - DECIMAL PARA BINÁRIO

  {
    origin: "DECIMAL",
    destination: "CONVERTER PARA BINÁRIO",
    value: "25",
    prompt: "Qual é a representação binária do número decimal 25?",
    options: ["11001", "10101", "11100", "10011"],
    answer: "11001",

    explanation:
      "Podemos converter decimal para binário utilizando as potências de 2.<br><br>" +

      "25 = 16 + 8 + 0 + 0 + 1<br><br>" +

      "Potências: 2⁴ | 2³ | 2² | 2¹ | 2⁰<br>" +
      "Valores:   16  |  8  |  4  |  2  |  1<br>" +
      "Bits:       1  |  1  |  0  |  0  |  1<br><br>" +

      "Juntando os bits: 11001.<br><br>" +

      "Portanto, 25₁₀ = 11001₂."
  }

];

// VARIÁVEIS DO JOGO

let currentQuestion = 0;
let score = 0;
let answered = false;

// ELEMENTOS HTML

const scoreElement = document.getElementById("score");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question-title");
const questionDescription = document.getElementById("question-description");

const numberOrigin = document.getElementById("number-origin");
const numberValue = document.getElementById("number-value");
const numberDestination = document.getElementById("number-destination");

const answerOptions = document.getElementById("answer-options");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next-button");
const resetButton = document.getElementById("reset-button");

// EMBARALHAR ALTERNATIVAS

function shuffle(array) {

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

  }

  return shuffled;

}

// ATUALIZAR PROGRESSO

function updateProgress() {

  const progress = (currentQuestion / questions.length) * 100;

  progressText.textContent = `${Math.round(progress)}%`;

  progressFill.style.width = `${progress}%`;

  scoreElement.textContent =
    `${score} de ${questions.length}`;

}

// CARREGAR QUESTÃO

function loadQuestion() {

  answered = false;

  const question = questions[currentQuestion];

  questionNumber.textContent =
    `QUESTÃO ${String(currentQuestion + 1).padStart(2, "0")} DE ${questions.length}`;

  questionTitle.textContent =
    question.prompt || "Qual é o resultado da conversão?";

  questionDescription.textContent =
    "Analise o número apresentado e escolha a resposta correta.";

  numberOrigin.textContent = question.origin;

  numberValue.textContent = question.value;

  numberDestination.textContent = question.destination;

  feedback.className = "feedback";

  feedback.textContent = "";

  nextButton.disabled = true;

  nextButton.textContent = "Próxima questão →";

  answerOptions.innerHTML = "";

  const shuffledOptions = shuffle(question.options);

  shuffledOptions.forEach(option => {

    const button = document.createElement("button");

    button.type = "button";

    button.className = "answer-button";

    button.textContent = option;

    button.addEventListener("click", () => {

      checkAnswer(button, option);

    });

    answerOptions.appendChild(button);

  });

  updateProgress();

}

// CONFERIR RESPOSTA

function checkAnswer(button, selectedAnswer) {

  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];

  const buttons =
    answerOptions.querySelectorAll(".answer-button");

  buttons.forEach(btn => {

    btn.disabled = true;

    if (btn.textContent === question.answer) {

      btn.classList.add("correct");

    }

  });

  if (selectedAnswer === question.answer) {

    score++;

    feedback.className = "feedback correct";

    feedback.innerHTML =
      `<strong>✓ Muito bem! Você acertou!</strong><br><br>
      ${question.explanation}`;

  } else {

    button.classList.add("wrong");

    feedback.className = "feedback wrong";

    feedback.innerHTML =
      `<strong>✗ Resposta incorreta!</strong><br><br>
      A resposta correta é: <strong>${question.answer}</strong>.<br><br>
      ${question.explanation}`;

  }

  updateProgress();

  nextButton.disabled = false;

  if (currentQuestion === questions.length - 1) {

    nextButton.textContent = "Ver resultado →";

  }

}

// RESULTADO FINAL

function showResult() {

  const percentage =
    Math.round((score / questions.length) * 100);

  questionNumber.textContent = "DESAFIO FINALIZADO";

  questionTitle.textContent =
    "Parabéns por concluir o desafio!";

  questionDescription.textContent =
    "Confira seu desempenho nas conversões numéricas.";

  numberOrigin.textContent = "SUA PONTUAÇÃO";

  numberValue.textContent =
    `${score}/${questions.length}`;

  numberDestination.textContent =
    `${percentage}% DE APROVEITAMENTO`;

  answerOptions.innerHTML = "";

  feedback.className = "feedback result";

  let message = "";

  if (percentage === 100) {

    message = "🏆 Excelente! Você acertou todas as questões!";

  } else if (percentage >= 70) {

    message = "👏 Muito bem! Você demonstrou um ótimo conhecimento!";

  } else if (percentage >= 50) {

    message = "👍 Bom trabalho! Continue praticando!";

  } else {

    message = "📚 Não desista! Revise os conceitos e tente novamente!";

  }

  feedback.innerHTML =
    `<strong>${message}</strong><br><br>
    Você acertou ${score} de ${questions.length} questões.<br>
    Seu aproveitamento foi de ${percentage}%.`;

  nextButton.disabled = true;

  nextButton.textContent = "Desafio concluído!";

  progressText.textContent = "100%";

  progressFill.style.width = "100%";

}

// AVANÇAR QUESTÃO

nextButton.addEventListener("click", () => {

  if (!answered) return;

  if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    loadQuestion();

  } else {

    showResult();

  }

});

// REINICIAR JOGO

resetButton.addEventListener("click", () => {

  currentQuestion = 0;

  score = 0;

  answered = false;

  loadQuestion();

});

// INICIAR JOGO

loadQuestion();
