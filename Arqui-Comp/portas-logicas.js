
/**
 * portas-logicas.js
 * Módulo de operações de portas lógicas digitais e integração com a UI do jogo.
 */

const PortasLogicas = {

    // Porta AND (E)
    AND(a, b) {
        return Number(Boolean(a) && Boolean(b));
    },

    // Porta OR (OU)
    OR(a, b) {
        return Number(Boolean(a) || Boolean(b));
    },

    // Porta NOT (NÃO)
    NOT(a) {
        return Number(!Boolean(a));
    },

    // Porta NAND (NÃO E)
    NAND(a, b) {
        return Number(!(Boolean(a) && Boolean(b)));
    },

    // Porta NOR (NÃO OU)
    NOR(a, b) {
        return Number(!(Boolean(a) || Boolean(b)));
    },

    // Porta XOR (OU exclusivo)
    XOR(a, b) {
        return Number(Boolean(a) !== Boolean(b));
    },

    // Porta XNOR (OU exclusivo negado)
    XNOR(a, b) {
        return Number(Boolean(a) === Boolean(b));
    },

    // Validação das entradas
    validarEntrada(...entradas) {
        return entradas.every(
            entrada => entrada === 0 || entrada === 1
        );
    },

    // Executar uma porta pelo nome
    executar(porta, ...entradas) {
        const nome = porta.toUpperCase();

        // NOT aceita apenas uma entrada
        if (nome === "NOT") {
            if (!this.validarEntrada(entradas[0])) {
                throw new Error("As entradas devem ser 0 ou 1.");
            }
            return this.NOT(entradas[0]);
        }

        if (!this.validarEntrada(...entradas)) {
            throw new Error(
                "As entradas devem ser 0 ou 1."
            );
        }

        if (typeof this[nome] !== "function" ||
            ["executar", "validarEntrada"].includes(nome)) {
            throw new Error(
                `Porta lógica não encontrada: ${porta}`
            );
        }

        return this[nome](...entradas);
    },

    // Gerar tabela verdade
    tabelaVerdade(porta) {
        const nome = porta.toUpperCase();

        if (nome === "NOT") {
            return [0, 1].map(a => ({
                A: a,
                Saida: this.NOT(a)
            }));
        }

        if (typeof this[nome] !== "function" ||
            ["executar", "validarEntrada"].includes(nome)) {
            throw new Error("Porta lógica inválida.");
        }

        return [0, 1].flatMap(a =>
            [0, 1].map(b => ({
                A: a,
                B: b,
                Saida: this[nome](a, b)
            }))
        );
    }
};

// --- Integração com a interface do jogo ---
(function () {
    if (typeof document === "undefined" || !document.getElementById('input-a')) return; // não executar em Node ou em páginas sem o layout deste jogo

    const GATES = [
        { name: "AND", symbol: "∧", desc: "E" },
        { name: "OR", symbol: "∨", desc: "OU" },
        { name: "NOT", symbol: "¬", desc: "NÃO" },
        { name: "XOR", symbol: "⊕", desc: "XOR" },
        { name: "NAND", symbol: "⊼", desc: "NAND" },
        { name: "NOR", symbol: "⊽", desc: "NOR" },
        { name: "XNOR", symbol: "≡", desc: "XNOR" }
    ];

    const TOTAL_QUESTIONS = 12;

    // Elementos
    const el = id => document.getElementById(id);
    const answerButtons = Array.from(document.querySelectorAll('.answer-button'));
    const nextButton = el('next-button');
    const resetButton = el('reset-button');

    let state = {
        questions: [],
        index: 0,
        score: 0
    };

    function randInt(max) { return Math.floor(Math.random() * max); }

    function gerarQuestao() {
        const gate = GATES[randInt(GATES.length)];
        if (gate.name === 'NOT') {
            const a = randInt(2);
            return { gate: gate.name, symbol: gate.symbol, desc: gate.desc, a, b: null };
        }
        const a = randInt(2);
        const b = randInt(2);
        return { gate: gate.name, symbol: gate.symbol, desc: gate.desc, a, b };
    }

    function gerarPerguntas() {
        const qs = [];
        // Garantir variedade: incluir cada porta ao menos uma vez quando possível
        const sampleOrder = [];
        const gatesPool = GATES.map(g => g.name);
        while (sampleOrder.length < TOTAL_QUESTIONS) {
            // priorizar portas diferentes no início
            if (sampleOrder.length < gatesPool.length) {
                sampleOrder.push(gatesPool[sampleOrder.length]);
            } else {
                sampleOrder.push(gatesPool[randInt(gatesPool.length)]);
            }
        }

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const name = sampleOrder[i];
            const gate = GATES.find(g => g.name === name) || GATES[0];
            if (gate.name === 'NOT') {
                qs.push({ gate: gate.name, symbol: gate.symbol, desc: gate.desc, a: randInt(2), b: null });
            } else {
                qs.push({ gate: gate.name, symbol: gate.symbol, desc: gate.desc, a: randInt(2), b: randInt(2) });
            }
        }
        return qs;
    }

    function atualizarPlacar() {
        el('score').textContent = `${state.score} de ${TOTAL_QUESTIONS}`;
        const percent = Math.round((state.index / TOTAL_QUESTIONS) * 100);
        el('progress-text').textContent = `${percent}%`;
        el('progress-fill').style.width = `${percent}%`;
    }

    function renderQuestion() {
        const q = state.questions[state.index];
        el('question-number').textContent = `QUESTÃO ${String(state.index + 1).padStart(2, '0')} DE ${TOTAL_QUESTIONS}`;
        el('gate-name').textContent = q.gate;
        el('gate-symbol').textContent = q.symbol;
        el('gate-description').textContent = q.desc;
        el('input-a').textContent = q.a;
        el('input-b').textContent = q.b === null ? '-' : q.b;
        el('output-value').textContent = '?';
        el('feedback').textContent = '';

        // habilitar botões de resposta
        answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong');
        });

        nextButton.disabled = true;
        atualizarPlacar();
    }

    function verificarResposta(selecionado) {
        const q = state.questions[state.index];
        const correct = q.b === null
            ? PortasLogicas.executar(q.gate, q.a)
            : PortasLogicas.executar(q.gate, q.a, q.b);

        const chosen = Number(selecionado);

        // marcar botões
        answerButtons.forEach(btn => {
            btn.disabled = true;
            const val = Number(btn.dataset.answer);
            if (val === correct) btn.classList.add('correct');
            if (val === chosen && val !== correct) btn.classList.add('wrong');
        });

        el('output-value').textContent = correct;

        const feedback = document.createElement('div');
        feedback.className = 'feedback-item ' + (chosen === correct ? 'correct' : 'wrong');
        feedback.textContent = chosen === correct ? 'Resposta correta! ✅' : `Resposta incorreta. Saída correta: ${correct}`;
        const feed = el('feedback');
        feed.innerHTML = '';
        feed.appendChild(feedback);

        if (chosen === correct) state.score += 1;

        nextButton.disabled = false;
        atualizarPlacar();
    }

    function proximaQuestao() {
        state.index += 1;
        if (state.index >= TOTAL_QUESTIONS) {
            mostrarResultadoFinal();
            return;
        }
        renderQuestion();
    }

    function mostrarResultadoFinal() {
        el('question-number').textContent = `FINALIZADO`;
        el('question-title').textContent = 'Parabéns — desafio concluído!';
        el('question-description').textContent = `Você acertou ${state.score} de ${TOTAL_QUESTIONS} questões.`;
        el('gate-name').textContent = '';
        el('gate-symbol').textContent = '';
        el('gate-description').textContent = '';
        el('input-a').textContent = '-';
        el('input-b').textContent = '-';
        el('output-value').textContent = state.score;

        answerButtons.forEach(btn => btn.disabled = true);
        nextButton.disabled = true;
        atualizarPlacar();
    }

    function reiniciar() {
        state.questions = gerarPerguntas();
        state.index = 0;
        state.score = 0;
        // restaurar textos padrão
        el('question-title').textContent = 'Qual será a saída desta porta lógica?';
        el('question-description').textContent = 'Analise as entradas e descubra o resultado.';
        renderQuestion();
    }

    // Eventos
    answerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            verificarResposta(btn.dataset.answer);
        });
    });

    nextButton.addEventListener('click', proximaQuestao);
    resetButton.addEventListener('click', reiniciar);

    // iniciar o jogo
    reiniciar();

})();

// Exportação para Node.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = PortasLogicas;
}
