/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------------ */
/** Identificador do formulário para guardar historico dos jogos. */
const FORMULARIO_HISTORICO = "frmHitorico";
/** Identificador da tabela com os registos dos jogos. */
const TABELA_HISTORICO = "tblHistorico";
/** Identificador do botão para iniciar um jogo. */
const BOTAO_INICIA_JOGO = "btnIniciaJogo";
/** Campo do formulário com a dificuldade do jogo. */
const dificuldade_JOGO = "dificuldade"

/** Campo do formulário com o tempo jogado. */
const TEMPO_JOGADO = "tempoJogado";

/** Campo do formulário com a pontuacao do jogo. */
const PONTUACAO = "pontuacao";

/** Campo do formulário com a data do jogo. */
const DATA_JOGO = "dataJogo";
/** Item de local storage que guarda o histório de jogos. */
const ITEM_HISTORICO = "historico";

/** Valor de duração máxima do jogo, em segundos. */
const DURACAO_MAXIMA_OMISSAO = 60; //1min

/** Valor de duração mínima do jogo, em segundos. */
const DURACAO_MINIMA = 10;

/** Identificador do número de bombas. */
const NUMERO_BOMBAS_OMISSAO = 10;

/** Identificador do número correspondente a altura*largura do tabuleiro. */
const TAMANHO_TABULEIRO_OMISSAO = 9;

/** Identificador da div que contém o tabuleiro. */
const tabuleiro = document.querySelector('.tabuleiro');
/** Identificador da div que contém o tabuleiro. */
const tabuleiro1 = document.querySelector('.tabuleiro1');


/* ----------------------------------------------------------------------------- */
/** Identificador do parágrafo que mede o tempo de cada jogo, em segundos. */
const SPAN_TEMPO_JOGO = "spanTempoJogo";

/** Identificador do parágrafo que mede o tempo restante de cada jogo, em segundos. */
const SPAN_TEMPO_RESTANTE = "spanTempoRestante";

/** Identificador do parágrafo que mede o contador de bandeiras e bombas. */
const SPAN_FLAGS = "spanFlags";
/** Identificador do parágrafo que mede o contador de bandeiras e bombas. */
const SPAN_FLAGS1 = "spanFlags1";
/** Identificador do parágrafo que mostra a mensagem do resultado do jogo. */
const SPAN_RESULTADO = "resultado";
const SPAN_RESULTADO1 = "resultado1";

/** Acertou no número aleatório. */
const RESULTADO_ACERTOU = "Acertou!";

/** Valor do resultado após cancelar o jogo em curso. */
const RESULTADO_CANCELOU = "Jogo cancelado!";

/**
 * Guarda o histórico de jogos. Cada elemento do array deve ser um objeto
 * de tipo historico.
 */
let historico = [];
/**
 * Construtor de um objeto de tipo Historico. Cada historico  tem os detalhes
 * do score , dificuldade tempo utilizado 
 *
 * @param {string} dificuldade - modo de jogo
 * @param {string} tempoJogado - tempo utilizado ate chegar ao fim .
 * @param {string} pontuacao - pontuaçao referente ao jogo
 * @param {string} dataJogo - dia do jogo
 * @param {string} user - ultilizador comlogin feito
 
 */


function Historico(user, dataJogo, dificuldade, pontuacao, tempoJogado) {


    this.tempoJogado = tempoJogado;
    this.pontuacao = pontuacao;
    this.dataJogo = dataJogo;
    this.dificuldade = dificuldade;
    this.user = user;


}
/* ------------------------------------------------------------------------- */
/** Configuração do jogo, que pode ser alterada pelo utilizador. */
let configuracao = {
    /** Número de tentativas para adivinhar o número aleatório.
    numeroTentativas: NUMERO_TENTATIVAS_OMISSAO,
  
    /** Valor aleatório mínimo. 
    minimoAleatorio: MINIMO_ALEATORIO_OMISSAO,
  
    /** Valor aleatório máximo. 
    maximoAleatorio: MAXIMO_ALEATORIO_OMISSAO, */

    /** Valor de duração máxima de tempo no jogo. */
    duracaoMaxima: DURACAO_MAXIMA_OMISSAO
};
/* ------------------------------------------------------------------------- */
// Número de linhas do tabuleiro.
let comprimento;
//numero de pontos por jogo.
let pontos = 0

let linhas = new Array();
// Número de colunas do tabuleiro.
let altura;
// Array com todas as linhas do tabuleiro. 
let celulas = new Array();
// Número de bombas do jogo.
let celulas1 = new Array();
// Número de bombas do jogo.
let numeroBombas;

/** Array do tabuleiro de jogo. */
let jogo = [];

/** Indentificador da identidade da célula do tabuleiro. */
let idCelula = 0;

/** Identificador do número de bandeiras no jogo. */
let bandeiras = 0;
/** Identificador do número de bandeiras no jogo. */
let bandeiras1 = 0;
/** Identificador do fim do jogo. */
let fim = false;

/** Identificador do limite de click --> primeiro click - safe play. */
let limitador = 0;
/* ------------------------------------------------------------------------- */
/** Estado do jogo, que vai sendo preenchido no decorrer do jogo. */
let jogo_status = {
    /** Número aleatório gerado no início do jogo, baseado na configuração. 
    numeroAleatorio: null,*/

    /** Identificadores do temporizador periódico do jogo. */
    temporizadorTempoJogo: null,
    temporizadorTempoRestante: null,
    temporizadorDuracaoMaxima: null,

    /** Inicio do tempo de cada jogo, em segundos. */
    inicio: null,
};
/* ------------------------------------------------------------------------- */

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
    tamanhoTabuleiro();


}
/**
 * Trata os dados do jogo, provenientes do formulário HTML.
 */
function trataGravarJogo() {



    // Se o formulário estiver bem preenchido, guarda os dados do jogo.
    let jogo = null;



    jogo = obtemRegistoJogo();

    // Grava o jogo no histórico de jogos e mostra-a.
    gravaJogoNoHistorico(jogo);
    //mostraHistoricoJogo();



}

/* ------------------------------------------------------------------------- */
function obtemRegistoJogo() {
    let tempoJogado = temporizadorTempoJogo
    let dificuldade = obtemModoJogo()
    let pontuacao = contaPontos();
    let dataJogo = dataAtual()
    let user = JSON.parse(localStorage.getItem("currentUser")).nome



    return new Historico(user, dataJogo, dificuldade, pontuacao, tempoJogado)
}
/**
 * Carrega o histórico de jogos guardado no local storage do browser.
 */
function carregaHistoricoJogos() {

    // Converte o histórico de jogos guardado em formato JSON (JavaScript
    // Object Notation) no local storage do browser, para um objeto em memória.
    historico = JSON.parse(localStorage.getItem(ITEM_HISTORICO)) || [];

    // A parte "|| []" em cima serve para garantir que o histórico de jogos
    // em memória existe (como array), pois pode dar-se o caso de JSON.parse()
    // devolver null se for a primeira vez que executamos a aplicação.
}
/**
 * Grava o histórico de jogos no local storage do browser.
 */
function gravaHistoricoJogos() {

    // Converte o objeto que representa o histórico de jogos para texto em
    // formato JSON (JavaScript Object Notation), e guardado-o em local storage
    // do browser.
    localStorage.setItem(ITEM_HISTORICO, JSON.stringify(historico));
}
/** 
 * Grava a jogo no histórico de jogos.
 * 
 * @param {Jogo} jogo - Objeto com os dados do jogo.
 */
function gravaJogoNoHistorico(jogo) {

    // Coloca o jogo no histórico e guarda-o no local storage do browser.
    historico.push(jogo);
    gravaHistoricoJogos();
}

/** 
 * Função que  o tempo limite do jogo
 
 */
function obtemTempoLimite() {
    let definiçoes = JSON.parse(localStorage.getItem("definiçoes"))
    let tempoLimite = definiçoes[0].nrTemporizador

    return tempoLimite




}
/** 
 * Função que  retorna a data ao dia do jogo 
 
 */
function dataAtual() {
    let date = new Date();
    return String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();



}
/** 
 * Função que  retorna o numero de pontos por jogo, dependendo do nivel e do tempo de 
 * jogo quando menos tempo demorar a jogar mais pontos ira ganhar  
 
 */
function contaPontos() {
    let multiplicador = 0
    let x = 0
    if (x < 2) {
        multiplicador = 5
        x++
    } else {
        if (temporizadorTempoJogo[0] = 0) {
            multiplicador = 5
        }
        if (temporizadorTempoJogo[1] > 1) {
            multiplicador = 4
        }
        if (temporizadorTempoJogo[0] > 2) {
            multiplicador = 3
        }
        if (temporizadorTempoJogo[0] > 4) {
            multiplicador = 2
        }
    }


    let varUrl = window.location.href;
    if (varUrl.includes("facil")) {
        pontos = pontos + 10 * multiplicador
    }
    if (varUrl.includes("intermedio")) {
        pontos += 20 * multiplicador
        console.log("intermedio")
    }
    if (varUrl.includes("dificil")) {
        pontos += 30 * multiplicador
    }


    return pontos
}


/** 
 * Função que  retorna a dificuldade do jogo em funçao do URL
 
 */
function obtemModoJogo() {
    let varUrl = window.location.href;
    if (varUrl.includes("facil")) {
        return "Fácil"
    }
    if (varUrl.includes("intermedio")) {
        return "Intermédio"
    }
    if (varUrl.includes("dificil")) {
        return "Difícil"

    }
    if (varUrl.includes("personalizavel")) {
        return "Personalizado"

    }

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
    if (varUrl.includes("facil")) {
        varUrl = varUrl.split('').reverse().join('');
        comprimento = varUrl[8];
        altura = varUrl[10];
        numeroBombas = varUrl[6] + varUrl[5];
    }
    if (varUrl.includes("intermedio") || varUrl.includes("dificil")) {
        varUrl = varUrl.split('').reverse().join('');
        console.log(varUrl);
        comprimento = varUrl[12] + varUrl[11];
        altura = varUrl[9] + varUrl[8];
        numeroBombas = varUrl[6] + varUrl[5];
    }
    if (varUrl.includes("personalizavel")) {
        let definiçoes = JSON.parse(localStorage.getItem("definiçoes"))
        console.log(definiçoes[0].nrBombas)
        numeroBombas = definiçoes[0].nrBombas
        altura = definiçoes[0].nrAltura
        comprimento = definiçoes[0].nrComprimento
            //temporizador = definiçoes[0].nrBombas

        //localStorage.key("definiçoes").clear
    }
    if (varUrl.includes("multi")) {
        varUrl = varUrl.split('').reverse().join('');
        console.log(varUrl);
        comprimento = varUrl[12] + varUrl[11];
        altura = varUrl[9] + varUrl[8];
        numeroBombas = varUrl[6] + varUrl[5];
    }

    return parseInt(comprimento), parseInt(altura), numeroBombas;
}
/* ----------------------------------------------------------------------------------------- */
let temporizadorTempoJogo = 0;
let tempo_restante = 0;
/** Esta função é um medidor de tempo de cada jogo, em segundos, invocada de segundo a segundo 
 * enquanto um jogo estiver a decorrer. 
 * O medidor de tempo para quando o jogo chega ao fim. */

function mostraTempoJogo() {

    tempo_restante = Math.floor(Date.now() / 1000) - jogo.inicio;
    //minutos:... : segundos:... 
    temporizadorTempoJogo = `${Math.floor(tempo_restante/60)}:${tempo_restante%60 < 10 ? "0"+tempo_restante%60 : tempo_restante%60}`;
    document.getElementById(SPAN_TEMPO_JOGO).innerHTML = temporizadorTempoJogo;

}

/* ----------------------------------------------------------------------------------- */

let tempoMax = obtemTempoLimite() * 60

/* ----------------------------------------------------------------------------------- */
let temporizadorTempoRestante = 0;
/** Esta função mostra o tempo que falta até ao final do jogo, informando o utilizador 
 * a cada segundo que passa, e, se a duração máxima tiver sido atingida,
 *  cancela automaticamente o jogo. */

function mostraTempoRestante() {

    temporizadorTempoJogo = Math.floor(Date.now() / 1000) - jogo.inicio;
    temporizadorTempoRestante = tempoMax - temporizadorTempoJogo;

    let minutos = Math.floor(temporizadorTempoRestante / 60)
    let segundos = temporizadorTempoRestante % 60

    if (segundos < 10) {
        document.getElementById(SPAN_TEMPO_JOGO).innerHTML = minutos + ":" + "0" + segundos;
    } else {
        document.getElementById(SPAN_TEMPO_JOGO).innerHTML = minutos + ":" + segundos;
    }
    if (minutos === 0 && segundos === 0) {
        terminaJogo()
    }

}

/*------------------------------------------------------------------------------------- */
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
function criarTabuleiro(comprimento, altura) {
    console.log("tabuleiro0")
        //tamanhoTabuleiro()
        // Atribui as identidades e classes das celulas do tabuleiro. 
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
            // coordenadas da celula do tabuleiro.
            let coordenadas = x + y;
            //a celula é atribuida e cria um elemento div.
            const celula = document.createElement("div");
            //cria div com id = a coordenadas ordenadas no eixo do x e y.
            celula.setAttribute("id", coordenadas);
            celula.setAttribute("class", "celula")

            console.log(celula)
                //adiciona ao array de linhas cada celula div criada. 
            linhas.push(celula);
            //No final, adiciona a div celula ao tabuleiro.

            tabuleiro.appendChild(celula);

            //normal click --> Interatividade da celula do tabuleiro
            celula.addEventListener("click", function(evento) {
                // Verifica se é o primeiro click -- SAFE PLAY
                if (limitador === 0 && !celula.classList.contains('bandeira') && !celula.classList.contains('ponto')) {
                    colocaBombas(celula);
                    contaBombas();
                    colocaBombas1(celula);
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
                if (limitador === 1 && !celula.classList.contains('bandeira') && !celula.classList.contains('ponto')) {
                    click(celula);

                    ganhaJogo();
                }
            });
            //cntrl and left click --> Interatividade da bandeira e do ponto de interrogaçao na celula do tabuleiro
            celula.oncontextmenu = function(evento) {
                evento.preventDefault();
                adicionaBandeiras(celula);
            }
        }
        //adiciona ao array de linhas --> o array de celulas
        celulas.push(linhas);
        //torna o array que contem "celula" vazio de forma a adicionar elemetos "celula" no valor = ao comprimento em cada posiçao do array "celulas" 
        linhas = [];
    }
    console.log(celulas);
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
        // Atribui as identidades e classes das celulas do tabuleiro. 
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
            // coordenadas da celula do tabuleiro.
            let coordenadas = x + y + "a";
            //a celula é atribuida e cria um elemento div.
            const celula1 = document.createElement("div");
            //cria div com id = a coordenadas ordenadas no eixo do x e y.
            celula1.setAttribute("id", coordenadas);
            celula1.setAttribute("class", "celula1")

            console.log(celula1)
                //adiciona ao array de linhas cada celula div criada. 
            linhas.push(celula1);
            //No final, adiciona a div celula ao tabuleiro.

            tabuleiro1.appendChild(celula1);

            //normal click --> Interatividade da celula do tabuleiro
            celula1.addEventListener("click", function(evento) {
                // Verifica se é o primeiro click -- SAFE PLAY
                if (limitador === 0 && !celula1.classList.contains('bandeira') && !celula1.classList.contains('ponto')) {
                    colocaBombas(celula1);
                    contaBombas();
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
                    click1(celula1);


                    ganhaJogo1();
                }
            });
            //cntrl and left click --> Interatividade da bandeira e do ponto de interrogaçao na celula do tabuleiro
            celula1.oncontextmenu = function(evento) {
                evento.preventDefault();
                adicionaBandeiras1(celula1);
            }
        }
        //adiciona ao array de linhas --> o array de celulas
        celulas1.push(linhas);
        //torna o array que contem "celula" vazio de forma a adicionar elemetos "celula" no valor = ao comprimento em cada posiçao do array "celulas" 
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
 * @param {string} celula -> variavel celula que guarda o estado (livre ou bomba)
 */
function colocaBombas(celula) {
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
    if (celula.id[0] == "0") {
        x = parseInt(celula.id[1]);
    } else {
        x = parseInt(celula.id[0] + celula.id[1]);
    }
    if (celula.id[2] == "0") {
        y = parseInt(celula.id[3]);
    } else {
        y = parseInt(celula.id[2] + celula.id[3]);
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
            celulas[linha][coluna].classList.add(jogo[count]);
            count++;
        }
    }


}
/**
 * Esta função coloca as bombas e os espaços sem bombas de forma random. Também inclui 
 * o início sem risco, sendo garantido que a primeira casa a ser explorada nunca
 * tem uma bomba, o que implica que as bombas só sejam distribuídas aleatoriamente
 * pelo tabuleiro depois dessa jogada inicial.
 * 
 * @param {string} celula -> variavel celula que guarda o estado (livre ou bomba)
 */
function colocaBombas1(celula) {
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
    if (celula.id[0] == "0") {
        x = parseInt(celula.id[1]);
    } else {
        x = parseInt(celula.id[0] + celula.id[1]);
    }
    if (celula.id[2] == "0") {
        y = parseInt(celula.id[3]);
    } else {
        y = parseInt(celula.id[2] + celula.id[3]);
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
function contaBombas() {
    //aumenta o total do número consoante a proximidade das bombas que estao no tabuleiro duma determinada celula clicada
    for (let linha = 0; linha < altura; linha++) {
        let total = 0;
        for (let coluna = 0; coluna < comprimento; coluna++) {
            //compara com o lado oeste
            if (coluna > 0 && celulas[linha][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado este
            if (coluna < comprimento - 1 && celulas[linha][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado norte  sem ser a primeira linha
            if (linha > 0 && celulas[linha - 1][coluna].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sul  se ser a ultima linha
            if (linha < altura - 1 && celulas[linha + 1][coluna].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado noroeste sem ser a primeira linha
            if (coluna > 0 && linha > 0 && celulas[linha - 1][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado nordeste sem ser a primeira linha 
            if (coluna < comprimento - 1 && linha > 0 && celulas[linha - 1][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sudoeste sem ser a primeira linha
            if (coluna > 0 && linha < altura - 1 && celulas[linha + 1][coluna - 1].classList.contains("bomba")) {
                total++;
            }
            // compara com o lado sudeste sem ser a primeira linha 
            if (coluna < comprimento - 1 && linha < altura - 1 && celulas[linha + 1][coluna + 1].classList.contains("bomba")) {
                total++;
            }
            celulas[linha][coluna].setAttribute("data", total);

            console.log(celulas[linha][coluna]);
            total = 0;
        }
    }
    limitador = 1;
}
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
/* ----------------------------------------------------------------------------------- */
/**
 * Esta função que verifica os vizinhos ao lado da celula quando faz click numa 
 * determinada celula, onde explora automáticamente as casas adjacentes, ou seja,
 * só no caso de uma casa acabada de explorar pelo jogador ter zero bombas em seu redor. 
 * Assim, cada uma das até oito casas imediatamente adjacentes deve ser explorada 
 * sem ser necessária a intervenção do jogador, e assim sucessivamente até todas 
 * as casas exploradas automaticamente terem um número de bombas em seu redor != zero.
 *  
 * @param {string} celula --> celula do tabuleiro
 * @param {string} idCelula --> id da celula do tabuleiro
 */
function verificaCelula(celula, idCelula) {
    let coluna;
    let linha;
    // Vai buscar as posições atribuidas às celulas para as respetivas colunas e linhas do tabuleiro.
    if (celula.id[0] == "0") {
        coluna = parseInt(celula.id[1]);
    } else { coluna = parseInt(celula.id[0] + celula.id[1]) }
    if (celula.id[2] == "0") {
        linha = parseInt(celula.id[3]);
    } else {
        linha = parseInt(celula.id[2] + celula.id[3]);
    }
    setTimeout(() => {
        if (coluna > 0 && celulas[linha][coluna - 1].classList.contains("livre")) { //compara com o lado oeste
            const novoId = celulas[linha][coluna - 1].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (coluna < comprimento - 1 && celulas[linha][coluna + 1].classList.contains("livre")) { // compara com o lado este
            const novoId = celulas[linha][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (linha > 0 && celulas[linha - 1][coluna].classList.contains("livre")) { // compara com o lado norte  sem ser a primeira linha
            const novoId = celulas[linha - 1][coluna].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (linha < altura - 1 && celulas[linha + 1][coluna].classList.contains("livre")) { // compara com o lado sul  se ser a ultima linha
            const novoId = celulas[linha + 1][coluna].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (coluna > 0 && linha > 0 && celulas[linha - 1][coluna - 1].classList.contains("livre")) { // compara com o lado noroeste sem ser a primeira linha 
            const novoId = celulas[linha - 1][coluna - 1].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (coluna < comprimento - 1 && linha > 0 && celulas[linha - 1][coluna + 1].classList.contains("livre")) { // compara com o lado nordeste sem ser a primeira linha 
            const novoId = celulas[linha - 1][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
        if (coluna > 0 && linha < altura - 1 && celulas[linha + 1][coluna - 1].classList.contains("livre")) { // compara com o lado sudoeste sem ser a primeira linha 
            const novoId = celulas[linha + 1][coluna - 1].id;
            const novaCelula = document.getElementById(novoId)
            click(novaCelula);
        }
        if (coluna < comprimento - 1 && linha < altura - 1 && celulas[linha + 1][coluna + 1].classList.contains("livre")) { // compara com o lado sudeste sem ser a primeira linha 
            const novoId = celulas[linha + 1][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click(novaCelula);
        }
    }, 10);

}
/**
 * Esta função que verifica os vizinhos ao lado da celula quando faz click numa 
 * determinada celula, onde explora automáticamente as casas adjacentes, ou seja,
 * só no caso de uma casa acabada de explorar pelo jogador ter zero bombas em seu redor. 
 * Assim, cada uma das até oito casas imediatamente adjacentes deve ser explorada 
 * sem ser necessária a intervenção do jogador, e assim sucessivamente até todas 
 * as casas exploradas automaticamente terem um número de bombas em seu redor != zero.
 *  
 * @param {string} celula --> celula do tabuleiro
 * @param {string} idCelula --> id da celula do tabuleiro
 */
function verificaCelula1(celula, idCelula) {
    let coluna;
    let linha;
    // Vai buscar as posições atribuidas às celulas para as respetivas colunas e linhas do tabuleiro.
    if (celula.id[0] == "0") {
        coluna = parseInt(celula.id[1]);
    } else { coluna = parseInt(celula.id[0] + celula.id[1]) }
    if (celula.id[2] == "0") {
        linha = parseInt(celula.id[3]);
    } else {
        linha = parseInt(celula.id[2] + celula.id[3]);
    }
    setTimeout(() => {
        if (coluna > 0 && celulas1[linha][coluna - 1].classList.contains("livre")) { //compara com o lado oeste
            const novoId = celulas1[linha][coluna - 1].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (coluna < comprimento - 1 && celulas1[linha][coluna + 1].classList.contains("livre")) { // compara com o lado este
            const novoId = celulas1[linha][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (linha > 0 && celulas1[linha - 1][coluna].classList.contains("livre")) { // compara com o lado norte  sem ser a primeira linha
            const novoId = celulas1[linha - 1][coluna].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (linha < altura - 1 && celulas1[linha + 1][coluna].classList.contains("livre")) { // compara com o lado sul  se ser a ultima linha
            const novoId = celulas1[linha + 1][coluna].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (coluna > 0 && linha > 0 && celulas1[linha - 1][coluna - 1].classList.contains("livre")) { // compara com o lado noroeste sem ser a primeira linha 
            const novoId = celulas1[linha - 1][coluna - 1].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (coluna < comprimento - 1 && linha > 0 && celulas1[linha - 1][coluna + 1].classList.contains("livre")) { // compara com o lado nordeste sem ser a primeira linha 
            const novoId = celulas1[linha - 1][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
        if (coluna > 0 && linha < altura - 1 && celulas1[linha + 1][coluna - 1].classList.contains("livre")) { // compara com o lado sudoeste sem ser a primeira linha 
            const novoId = celulas1[linha + 1][coluna - 1].id;
            const novaCelula = document.getElementById(novoId)
            click1(novaCelula);
        }
        if (coluna < comprimento - 1 && linha < altura - 1 && celulas1[linha + 1][coluna + 1].classList.contains("livre")) { // compara com o lado sudeste sem ser a primeira linha 
            const novoId = celulas1[linha + 1][coluna + 1].id;
            const novaCelula = document.getElementById(novoId);
            click1(novaCelula);
        }
    }, 10);

}

/* ----------------------------------------------------------------------------------- */
/**
 * Função que atualiza o click do mouse de cada celula, caso tiver bomba --> Fim do Jogo
 * caso não tiver bomba --> mostra número (maior número, mais próximo bomba) 
 * ou célula sem número (terreno sem números ou bombas ao pé)
 * também existe a possibilidade de colocar bandeira para identificar uma célula com bomba
 * 
 * @param {string} celula --> celula do tabuleiro
 */
function click(celula) {
    idCelula = celula.id;
    if (fim || celula.classList.contains('verificada') || celula.classList.contains('bandeira')) {
        return
    } else if (celula.classList.contains("bomba")) {
        console.log("Game Over");
        celula.innerHTML = ' 💣 ';
        terminaJogo(celula);
    } else {
        let total = celula.getAttribute("data");
        if (total != 0) {
            celula.classList.add("verificada");
            contaPontos()

            celula.innerHTML = total;
            return
        }
        verificaCelula(celula, idCelula);
    }
    celula.classList.add("verificada");
    contaPontos();
    ganhaJogo();

}
/**
 * Função que atualiza o click do mouse de cada celula, caso tiver bomba --> Fim do Jogo
 * caso não tiver bomba --> mostra número (maior número, mais próximo bomba) 
 * ou célula sem número (terreno sem números ou bombas ao pé)
 * também existe a possibilidade de colocar bandeira para identificar uma célula com bomba
 * 
 * @param {string} celula --> celula do tabuleiro
 */
function click1(celula1) {
    idCelula = celula1.id;
    if (fim || celula1.classList.contains('verificada') || celula1.classList.contains('bandeira')) {
        return
    } else if (celula1.classList.contains("bomba")) {
        console.log("Game Over");
        celula1.innerHTML = ' 💣 ';
        terminaJogo1(celula1);
    } else {
        let total = celula1.getAttribute("data");
        if (total != 0) {
            celula1.classList.add("verificada");
            contaPontos()

            celula1.innerHTML = total;
            return
        }
        verificaCelula1(celula1, idCelula);
    }
    celula1.classList.add("verificada");
    contaPontos();
    ganhaJogo1();

}
/*------------------------------------------------------------------------------------- */
/**
 * Função que adiciona bandeira com click do lado direito do rato 
 * Uma casa do tabuleiro pode ser selecionada com o intuito de a marcar, significando
 * que o jogador acha que aí estará uma bomba, devendo o símbolo da casa
 * mudar para uma bandeira. O contador de bombas por descobrir deve descer uma
 * unidade, podendo eventualmente ficar negativo se forem marcadas mais casas
 * do tabuleiro do que o total de bombas existentes. Uma casa pode ser desmarcada,
 * sendo anulados os efeitos da marcação.
 * 
 * @param {string} celula --> celula do tabuleiro
 * @returns 
 */
function adicionaBandeiras(celula) {
    if (fim) {
        return
    } else {
        if (!celula.classList.contains('verificada')) {
            if (!celula.classList.contains('bandeira')) {
                celula.classList.add('bandeira');
                bandeiras++;
                celula.innerHTML = ' 🚩 ';
                document.getElementById(SPAN_FLAGS).innerHTML = numeroBombas - bandeiras;
            } else {
                celula.oncontextmenu = function(evento) {
                    evento.preventDefault();
                    adicionaDuvida(celula);
                }
                celula.classList.remove('bandeira');
                celula.innerHTML = '';
                bandeiras--;
                document.getElementById(SPAN_FLAGS).innerHTML = numeroBombas - bandeiras;
            }
        }
    }
}
/*------------------------------------------------------------------------------------- */
/**
 * Função que adiciona um ponto de interrogação com duplo click do lado direito do rato 
 * Segundo tipo de marcação de casa, para permitir que um jogador expresse que
 * tem dúvidas sobre se uma casa do tabuleiro terá ou não uma bomba. O símbolo
 * a usar deverá ser uma bandeira com um ponto de interrogação e o contador de
 * número de bombas por descobrir não deve ser alterado.
 * 
 * @param {string} celula --> celula do tabuleiro
 * @returns 
 */
function adicionaDuvida(celula) {
    if (fim) {
        return
    } else {
        if (!celula.classList.contains('ponto')) {
            celula.classList.add('ponto');
            celula.innerHTML = ' ❓ ';
        } else {
            celula.classList.remove('ponto');
            celula.innerHTML = '';
            celula.oncontextmenu = function(evento) {
                evento.preventDefault();
                adicionaBandeiras(celula);
            }
        }
    }
}

function adicionaBandeiras1(celula) {
    if (fim) {
        return
    } else {
        if (!celula.classList.contains('verificada')) {
            if (!celula.classList.contains('bandeira')) {
                celula.classList.add('bandeira');
                bandeiras1++;
                celula.innerHTML = ' 🚩 ';
                document.getElementById(SPAN_FLAGS1).innerHTML = numeroBombas - bandeiras1;
            } else {
                celula.oncontextmenu = function(evento) {
                    evento.preventDefault();
                    adicionaDuvida1(celula);
                }
                celula.classList.remove('bandeira');
                celula.innerHTML = '';
                bandeiras1--;
                document.getElementById(SPAN_FLAGS1).innerHTML = numeroBombas - bandeiras;
            }
        }
    }
}
/*------------------------------------------------------------------------------------- */
/**
 * Função que adiciona um ponto de interrogação com duplo click do lado direito do rato 
 * Segundo tipo de marcação de casa, para permitir que um jogador expresse que
 * tem dúvidas sobre se uma casa do tabuleiro terá ou não uma bomba. O símbolo
 * a usar deverá ser uma bandeira com um ponto de interrogação e o contador de
 * número de bombas por descobrir não deve ser alterado.
 * 
 * @param {string} celula --> celula do tabuleiro
 * @returns 
 */
function adicionaDuvida1(celula) {
    if (fim) {
        return
    } else {
        if (!celula.classList.contains('ponto')) {
            celula.classList.add('ponto');
            celula.innerHTML = ' ❓ ';
        } else {
            celula.classList.remove('ponto');
            celula.innerHTML = '';
            celula.oncontextmenu = function(evento) {
                evento.preventDefault();
                adicionaBandeiras1(celula);
            }
        }
    }
}

/* ----------------------------------------------------------------------------------- */
/**
 * Inicializa o estado de um novo jogo, e atualiza a interface com o
 * tabuleiro, impedindo alterações na configuração do jogo.
 * No início de cada jogo, é mostrado um tabuleiro de dimensão variado dependendo do 
 * modo de jogo escolhido, sendo que x casas, escolhidas aleatoriamente, têm uma bomba escondida.
 */


function iniciaJogo() {
    //lerUrl serve para retirar infomaçao relativa ao tabuleiro a jogar
    lerUrl();
    numeroBombas = parseInt(numeroBombas);
    altura = parseInt(altura);
    comprimento = parseInt(comprimento);

    // Inicialização do estado do jogo --> cria Tabuleiro!
    let varUrl = window.location.href;

    criarTabuleiro(comprimento, altura, numeroBombas);
    criarTabuleiro1(comprimento, altura, numeroBombas);


    //MOSTRA BANDEIRAS
    document.getElementById(SPAN_FLAGS).innerHTML = numeroBombas;
}
/* ------------------------------------------------------------------------- */
/**
 * Termina um jogo, mostrando uma mensagem com o resultado ao utilizador, e
 * atualiza a interface para permitir a configuração de um novo jogo.
 * Um jogo termina quando todas as casas sem bombas do tabuleiro tiverem sido
 * exploradas, ou então se uma mina for detonada. Após um jogo, deve ser mostrada
 * uma tabela com os dez melhores tempos e respetivos jogadores, devendo
 * essa informação ficar guardada em local storage do browser.
 * 
 * @param {string} celula --> celula do tabuleiro -> verifica se acertou ou não na bomba.
 */
function terminaJogo(celula) {
    trataGravarJogo()
        /** Termina os temporizadores periódicos do jogo. */
    clearInterval(jogo.temporizadorTempoJogo);
    clearInterval(jogo.temporizadorTempoRestante)
        //clearInterval(jogo.temporizadorTempoRestante);
        //clearTimeout(jogo.temporizadorDuracaoMaxima);
    for (let linha = 0; linha < altura; linha++) { // ao terminar o jogo mostra todas as bombas
        for (let coluna = 0; coluna < comprimento; coluna++) {
            if (celulas[linha][coluna].classList.contains('bomba')) {
                celulas[linha][coluna].innerHTML = ' 💣 ';
                celulas[linha][coluna].classList.remove('bomba');
                celulas[linha][coluna].classList.add('verificada');
            }
        }
    }

    // Apresenta o resultado ao utilizador.
    document.getElementById(SPAN_RESULTADO).innerHTML = "Boom! " + JSON.parse(localStorage.getItem("currentUser")).nome +
        " Game Over!"

    fim = true;


}

function terminaJogo1(celula) {
    trataGravarJogo()
        /** Termina os temporizadores periódicos do jogo. */
    clearInterval(jogo.temporizadorTempoJogo);
    clearInterval(jogo.temporizadorTempoRestante)
        //clearInterval(jogo.temporizadorTempoRestante);
        //clearTimeout(jogo.temporizadorDuracaoMaxima);
    for (let linha = 0; linha < altura; linha++) { // ao terminar o jogo mostra todas as bombas
        for (let coluna = 0; coluna < comprimento; coluna++) {
            if (celulas[linha][coluna].classList.contains('bomba')) {
                celulas[linha][coluna].innerHTML = ' 💣 ';
                celulas[linha][coluna].classList.remove('bomba');
                celulas[linha][coluna].classList.add('verificada');
            }
        }
    }

    // Apresenta o resultado ao utilizador.
    document.getElementById(SPAN_RESULTADO1).innerHTML = 'Boom! Convidado Game Over!';
    fim = true;


}
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Verifica se ganha um jogo, mostrando uma mensagem com o resultado ao utilizador, e
 * atualiza a interface para permitir a configuração de um novo jogo.
 */
function ganhaJogo() {
    /** Contabilizador de celulas já abertas e verificadas sem bomba. */
    let count = 0;
    for (let linha = 0; linha < altura; linha++) {
        for (let coluna = 0; coluna < comprimento; coluna++) {
            if (celulas[linha][coluna].classList.contains('verificada')) { //celulas[x][y].classList.contains('bandeira') && celulas[i][y].classList.contains('ponto') && celulas[x][y].classList.contains('bomba')
                count++;
            }

        }
    }
    if (count === comprimento * altura - numeroBombas) {
        /** Termina os temporizadores periódicos do jogo. */
        clearInterval(jogo.temporizadorTempoJogo);

        // Apresenta o resultado ao utilizador.
        console.log('GANHASTE!');
        document.getElementById(SPAN_RESULTADO).innerHTML = "PARABÉNS! " + JSON.parse(localStorage.getItem("currentUser")).nome + " VENCESTE!👑";
        fim = true;
        trataGravarJogo()
    }

}

function ganhaJogo1() {
    /** Contabilizador de celulas já abertas e verificadas sem bomba. */
    let count = 0;
    for (let linha = 0; linha < altura; linha++) {
        for (let coluna = 0; coluna < comprimento; coluna++) {
            if (celulas1[linha][coluna].classList.contains('verificada')) { //celulas[x][y].classList.contains('bandeira') && celulas[i][y].classList.contains('ponto') && celulas[x][y].classList.contains('bomba')
                count++;
            }

        }
    }
    if (count === comprimento * altura - numeroBombas) {
        /** Termina os temporizadores periódicos do jogo. */
        clearInterval(jogo.temporizadorTempoJogo);

        // Apresenta o resultado ao utilizador.

        document.getElementById(SPAN_RESULTADO1).innerHTML = 'PARABÉNS CONVIDADO!! VENCESTE! 👑 ';
        fim = true;
        trataGravarJogo()
    }

}

/* ------------------------------------------------------------------------------------------------------ */
/** Cancela um jogo em curso, mostrando uma mensagem com o resultado ao utilizador. */
function cancelaJogo() {
    terminaJogo(RESULTADO_CANCELOU);
}

function tamanhoTabuleiro() {
    let varUrl = window.location.href;
    if (varUrl.includes("personalizavel")) {

        if (comprimento < 12 && altura < 12) {
            console.log("entrou")
            let alt = 40 * altura;
            alt = alt.toString()
            alt = alt + "px"
                //document.querySelector("#tabuleiro") //.style.height = alt;
            const tabuleiroAltura = document.querySelector(".tabuleiro");
            tabuleiroAltura.style.height = alt;


            let comp = 40 * comprimento;
            comp = comp.toString()
            comp = comp + "px";
            const tabuleiroCom = document.querySelector(".tabuleiro")
            tabuleiroCom.style.width = comp;
        }
        if (comprimento > 13 && comprimento < 16 || altura > 13 && altura < 16) {

            console.log("!15")
            let alt = 30 * altura;
            alt = alt.toString()
            alt = alt + "px"
            const tabuleiroAltura = document.querySelector(".tabuleiro");
            tabuleiroAltura.style.height = alt;


            let comp = 30 * comprimento;
            comp = comp.toString()
            comp = comp + "px";
            const tabuleiroCom = document.querySelector(".tabuleiro")
            tabuleiroCom.style.width = comp;

            for (let celula of document.getElementsByClassName("celula")) {
                celula.style.width = "30px"
                celula.style.height = "30px"
            }



        }
        if (comprimento > 17 && comprimento < 23 || altura > 17 && altura < 23) {


            let alt = 22 * altura;
            alt = alt.toString()
            alt = alt + "px"
            const tabuleiroAltura = document.querySelector(".tabuleiro");
            tabuleiroAltura.style.height = alt;


            let comp = 22 * comprimento;
            comp = comp.toString()
            comp = comp + "px";
            const tabuleiroCom = document.querySelector(".tabuleiro")
            tabuleiroCom.style.width = comp;

            for (let celula of document.getElementsByClassName("celula")) {
                celula.style.width = "22px"
                celula.style.height = "22px"
                celula.style.border = "3px inset #3b4047";
            }



        }
    }

}