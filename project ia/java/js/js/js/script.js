
import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

// Elementos da tela
const telaEntrada = document.querySelector(".tela-entrada");
const botaoEntrar = document.querySelector(".entrar-btn");

const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoJogarNovamente = document.querySelector(".novamente-btn");

// Variáveis do jogo
let atual = 0;
let historiaFinal = "";

// Primeira tela: entrar na missão
botaoEntrar.addEventListener("click", entraNaMissao);

function entraNaMissao() {
    telaEntrada.style.display = "none";
    telaInicial.style.display = "block";
}

// Segunda tela: iniciar o jogo
botaoIniciar.addEventListener("click", iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";

    telaInicial.style.display = "none";

    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

// Exibe a pergunta atual e cria seus botões
function mostraPergunta() {
    const pergunta = perguntas[atual];

    if (!pergunta) {
        mostraResultado();
        return;
    }

    caixaPerguntas.textContent = pergunta.enunciado;
    caixaPerguntas.classList.add("mostrar");

    caixaAlternativas.innerHTML = "";
    caixaAlternativas.classList.add("mostrar");

    caixaResultado.classList.remove("mostrar");

    for (const alternativa of pergunta.alternativas) {
        const botao = document.createElement("button");

        botao.textContent = alternativa.texto;

        botao.addEventListener("click", function () {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

// Registra a escolha e segue o caminho correspondente
function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacao + " ";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

// Mostra a história construída pelas escolhas
function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;

    caixaAlternativas.innerHTML = "";
    caixaAlternativas.classList.remove("mostrar");

    textoResultado.textContent = historiaFinal;

    caixaPerguntas.classList.add("mostrar");
    caixaResultado.classList.add("mostrar");
}

// Reinicia a partida
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

// Substitui "você" e "vocês" pelo nome sorteado
function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(
            /voc[eê]s?/gi,
            nome
        );
    }
}

// Personaliza os enunciados ao carregar o jogo
substituiNome();