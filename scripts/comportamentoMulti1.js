/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";

/** Identificador da div que contém o tabuleiro. */
const tabuleiro1 = document.querySelector('.tabuleiro1');
let celulas1 = new Array();
// Número de bombas do jogo.
// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser.
window.onload = principal;

/* ------------------------------------------------------------------------- */
/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML. Ver window.onload na
 * última linha deste script.*/
function principal() {
    // Mostra a configuração por omissão do jogo.
    //mostraConfiguracaoJogo();

    // O jogo está pronto a usar.
    iniciaJogo();


}
/* ----------------------------------------------------------------------------------- */
/**
 * Inicializa o estado de um novo jogo, e atualiza a interface com o
 * tabuleiro, impedindo alterações na configuração do jogo.
 * No início de cada jogo, é mostrado um tabuleiro de dimensão variado dependendo do 
 * modo de jogo escolhido, sendo que x casas, escolhidas aleatoriamente, têm uma bomba escondida.
 */
let numeroTabuleiro = 0

function iniciaJogo() {
    //lerUrl serve para retirar infomaçao relativa ao tabuleiro a jogar
    lerUrl();
    numeroBombas = parseInt(numeroBombas);
    altura = parseInt(altura);
    comprimento = parseInt(comprimento);

    // Inicialização do estado do jogo --> cria Tabuleiro!
    let varUrl = window.location.href;

    criarTabuleiro1(comprimento, altura, numeroBombas);


    //MOSTRA BANDEIRAS
    document.getElementById(SPAN_FLAGS).innerHTML = numeroBombas;
}
/* ------------------------------------------------------------------------- */
/** 
 * Função que retira informaçao que esta guardada no url relativa ao 
 * tamanho do tabuleiro e numero de bombas consoante dificuldade/modo de jogo.
 * 
 */
function lerUrl() {
    /** Identificador do url da página atual do modo de jogo. */
    let varUrl = window.location.href;

    if (varUrl.includes("multi")) {
        varUrl = varUrl.split('').reverse().join('');
        console.log(varUrl);
        comprimento = varUrl[12] + varUrl[11];
        altura = varUrl[9] + varUrl[8];
        numeroBombas = varUrl[6] + varUrl[5];
    }

    return parseInt(comprimento), parseInt(altura), numeroBombas;
}
/**
 * Esta função cria e estrutura o tabuleiro com bombas e espaços livres de bombas.
 * A seleção de uma casa do tabuleiro deve poder ser feita com o rato ou com o
 * teclado e têm de ser suportadas duas intenções distintas: explorar ou marcar 
 * a casa selecionada. 
 * De notar que não é possível voltar a selecionar uma casa que já tenha sido explorada.
 * 
 * @param {number} comprimento --> número de linhas
 * @param {number} altura --> número de colunas
 * @param {number} numeroBombas --> número de bombas no tabuleiro
 */
function criarTabuleiro1(comprimento, altura) {
    console.log("tabuleiro1")
        //tamanhoTabuleiro()
        // Atribui as identidades e classes das celula1s1 do tabuleiro. 
    for (let linha = 0; linha < altura; linha++) {
        for (let coluna = 0; coluna < comprimento; coluna++) {
            //let x = coluna.toString()
            let x;
            //let y = linha.toString() 
            let y;
            if (linha < 10) {
                y = "0" + linha.toString();
            } else {
                y = linha.toString();
            }
            if (coluna < 10) {
                x = "0" + coluna.toString();
            } else {
                x = coluna.toString();
            }
            // coordenadas da celula1 do tabuleiro.
            let coordenadas = x + y;
            //a celula1 é atribuida e cria um elemento div.
            const celula1 = document.createElement("div");
            //cria div com id = a coordenadas ordenadas no eixo do x e y.
            celula1.setAttribute("id", coordenadas);
            celula1.setAttribute("class", "celula")

            console.log(celula1)
                //adiciona ao array de linhas cada celula1 div criada. 
            linhas.push(celula1);
            //No final, adiciona a div celula1 ao tabuleiro.

            tabuleiro1.appendChild(celula1);

            //normal click --> Interatividade da celula1 do tabuleiro
            celula1.addEventListener("click", function(evento) {
                // Verifica se é o primeiro click -- SAFE PLAY
                if (limitador === 0 && !celula1.classList.contains('bandeira') && !celula1.classList.contains('ponto')) {
                    colocaBombas1(celula1);
                    contaBombas1();
                    localStorage.key("definiçoes").clear

                    //Inicia tempo do jogo

                    jogo.inicio = Math.floor(Date.now() / 1000);
                    //MOSTRA O TEMPO A DECORRER
                    if (obtemTempoLimite() == 0) {

                        jogo.temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);

                    } else {

                        jogo.temporizadorTempoRestante = setInterval(mostraTempoRestante, 1000);
                    }


                    //jogo.temporizadorDuracaoMaxima = setTimeout(terminaJogo, 1000 * (configuracao.duracaoMaxima + 1));
                }
                // Segundo click  
                if (limitador === 1 && !celula1.classList.contains('bandeira') && !celula1.classList.contains('ponto')) {
                    click(celula1);

                    ganhaJogo();
                }
            });
            //cntrl and left click --> Interatividade da bandeira e do ponto de interrogaçao na celula1 do tabuleiro
            celula1.oncontextmenu = function(evento) {
                evento.preventDefault();
                adicionaBandeiras(celula1);
            }
        }
        //adiciona ao array de linhas --> o array de celula1s1
        celulas1.push(linhas);
        //torna o array que contem "celula1" vazio de forma a adicionar elemetos "celula1" no valor = ao comprimento em cada posiçao do array "celula1s1" 
        linhas = [];
    }
    console.log(celulas1);
}
/*------------------------------------------------------------------------------------- */
/**
 * Esta função coloca as bombas e os espaços sem bombas de forma random. Também inclui 
 * o início sem risco, sendo garantido que a primeira casa a ser explorada nunca
 * tem uma bomba, o que implica que as bombas só sejam distribuídas aleatoriamente
 * pelo tabuleiro depois dessa jogada inicial.
 * 
 * @param {string} celula1 -> variavel celula que guarda o estado (livre ou bomba)
 */
function colocaBombas1(celula1) {
    /** Contabilizador do array de celulas para atribuir classes no tabuleiro. */
    let count = 0;
    /** Identificador da coluna do tabuleiro. */
    let x;
    /** Identificador da linha do tabuleiro. */
    let y;
    /** Array de celulas que contem bomba. */
    let celulasBomba = [];
    /** Array de celulas que nao contem bomba. */
    let celulasLivres = [];

    // Vai buscar as posições atribuidas às celulas para as respetivas colunas e linhas do tabuleiro.
    if (celula1.id[0] == "0") {
        x = parseInt(celula1.id[1]);
    } else {
        x = parseInt(celula1.id[0] + celula1.id[1]);
    }
    if (celula1.id[2] == "0") {
        y = parseInt(celula1.id[3]);
    } else {
        y = parseInt(celula1.id[2] + celula1.id[3]);
    }

    // Coloca na class uma lista de strings = "bomba" 
    for (let x = 0; x < numeroBombas; x++) {
        celulasBomba.push("bomba");
    }
    // Coloca na class uma lista de strings = "livre"
    for (let z = 0; z < comprimento * altura - numeroBombas; z++) {
        celulasLivres.push("livre");
    }
    //junta os dois arrays de celulas livres e de bombas
    jogo = celulasBomba.concat(celulasLivres);
    //baralha aleatoriamente o array jogo que contem as classes para definir as bombas
    jogo = jogo.sort(() => Math.random() - 0.5);

    // Adiciona o atributo class a cada div de forma a ser atribuido um estado (livre/bomba)
    for (let linha = 0; linha < altura; linha++) {
        for (let coluna = 0; coluna < comprimento; coluna++) {
            celulas1[linha][coluna].classList.add(jogo[count]);
            count++;
        }
    }


}
/*------------------------------------------------------------------------------------- */
/** 
 * Esta função conta e coloca o número de bombas circundantes numa determinada celula.
 * Isto é, a seleção de uma casa do tabuleiro com o intuito de a explorar pode ter 
 * duas consequências: se existir uma bomba nessa casa, é mostrada e detonada; caso
 * contrário, a casa passa a conter um número de zero até oito correspondente ao
 * total de bombas que estão nas casas em seu redor, imediatamente adjacentes.
 */
function contaBombas1() {
    //aumenta o total do número consoante a proximidade das bombas que estao no tabuleiro duma determinada celula clicada
    for (let linha = 0; linha < altura; linha++) {
        let total = 0;
        for (let coluna = 0; coluna < comprimento; coluna++) {
            //compara com o lado oeste
            if (coluna > 0 && celulas1[linha][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado este
            if (coluna < comprimento - 1 && celulas1[linha][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado norte  sem ser a primeira linha
            if (linha > 0 && celulas1[linha - 1][coluna].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sul  se ser a ultima linha
            if (linha < altura - 1 && celulas1[linha + 1][coluna].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado noroeste sem ser a primeira linha
            if (coluna > 0 && linha > 0 && celulas1[linha - 1][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado nordeste sem ser a primeira linha 
            if (coluna < comprimento - 1 && linha > 0 && celulas1[linha - 1][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sudoeste sem ser a primeira linha
            if (coluna > 0 && linha < altura - 1 && celulas1[linha + 1][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sudeste sem ser a primeira linha 
            if (coluna < comprimento - 1 && linha < altura - 1 && celulas1[linha + 1][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            celulas1[linha][coluna].setAttribute("data", total);

            console.log(celulas1[linha][coluna]);
            total = 0;
        }
    }
    limitador = 1;
}