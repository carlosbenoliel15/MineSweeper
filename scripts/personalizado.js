/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                CONSTANTES */
/* ------------------------------------------------------------------------- */

/** Identificador do formulário para escolher configuraçoes */
const FORMULARIO_DEFINIÇOES = "frmDefiniçoes";

/** Identificador do botão para jogar */
const BOTAO_JOGAR = "btnJogar";

/* ------------------------------------------------------------------------- */

const RISCO = "risco";

const NUMERO_BOMBAS = "nrBombas"

const NUMERO_ALTURA = "nrAltura"

const NUMERO_COMPRIMENTO = "nrComprimento"

const NUMERO_TEMPO_MAX = "nrTempoMax"





/** Item de local storage que guarda o histório de configuaçoes */
const ITEM_DEFINIÇOES = "definiçoes";

/* ------------------------------------------------------------------------- */
/*                  VARIÁVEIS GLOBAIS */
/* ------------------------------------------------------------------------- */

/**
 * Elemento de topo do formulário para criar configuraçoes, para simplificar o
 * acesso aos dados dos seus campos. Esta variável global só pode inicializada
 * quando o documento HTML tiver sido completamente carregado pelo browser.
 */
let formulario = null;

/* ------------------------------------------------------------------------- */

/**
 * Guarda o histórico de configuraçoes. Cada elemento do array deve ser um objeto
 * de tipo Definiçoes.
 */
let definiçoes = [];

/* ------------------------------------------------------------------------- */
/*                                                   CONSTRUTORES DE OBJETOS */
/* ------------------------------------------------------------------------- */




/* ------------------------------------------------------------------------- */

/*
 * @param {Definiçoes} defeniçoes - Objeto com as definiçoes do jogador 
 */
function Definiçoes(nrBombas, nrAltura, nrComprimento, nrTemporizador, risco) {

    this.nrBombas = nrBombas;
    this.nrAltura = nrAltura;
    this.nrComprimento = nrComprimento;
    this.nrTemporizador = nrTemporizador
    this.risco = risco;



}

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser, incluindo o ficheiro CSS.
// Uma vantagem de usar addEventListener() em vez de window.onload é serem
// permitidos vários event handlers (funções invocadas) para um mesmo evento.
window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */

/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
 */
function principal() {

    // Para simplificar o acesso aos elementos do formulário 
    formulario = document.forms[FORMULARIO_DEFINIÇOES];


    // Associar comportamento a elementos na página HTML.
    defineEventHandlersParaElementosHTML();
}

/* ------------------------------------------------------------------------- */
/*                                            REAÇÃO A EVENTOS DO UTILIZADOR */
/* ------------------------------------------------------------------------- */

/**
 * Associa event handlers a elementos no documento HTML, em particular botões.
 * Com esta abordagem, evitam-se atributos onclick ou similares, e faz-se uma
 * melhor separação entre conteúdo, em HTML, e comportamento, em JavaScript.
 */
function defineEventHandlersParaElementosHTML() {

    document.getElementById(BOTAO_JOGAR).
    addEventListener("click", trataDefiniçao);
}

/* ------------------------------------------------------------------------- */

/**
 * Trata os dados  das configuraçoes, provenientes do formulário HTML.
 */
function trataDefiniçao() {

    // Verifica se os valores nos campos do formulário satisfazem as restrições
    // especificadas em HTML, como o campo ter de estar preenchido (required),
    // ou o valor no campo ter de estar entre um mínimo e um máximo (min, max).
    // Se houver restrições não satisfeitas, o utilizador é informado, e a
    // definicao não é processada.
    let definiçaoValida = formulario.reportValidity();

    // Se o formulário estiver bem preenchido, guarda os dados.
    let definiçao = null;

    if (definiçaoValida) {

        definiçao = obtemConfiguraçoes();

        // Grava a definiçoes no histórico de definiçoes e mostra-a.
        gravaDefiniçoesHistorico(definiçao);
        window.location.replace("../templates/jogo_personalizavel.html")
    }
}

/* ------------------------------------------------------------------------- */

/**
 * Apaga o histórico de definiçoes, incluindo no local storage do browser.
 */
function trataApagarHistoricoDefiniçoes() {


    localStorage.clear();

    CarregaHistoricoDefiniçoes();

}

/* ------------------------------------------------------------------------- */
/*                                           OBTENÇÃO DE DADOS DO FORMULÁRIO */
/* ------------------------------------------------------------------------- */




/* ------------------------------------------------------------------------- */

/**
 * Obtém as configuraçoes que constam no formulário 
 * 
 * @returns {number} comtem nr de bombas
 * @returns {number} contem o nr da altura
 * @returns {number} contem o nr do comprimento 
 * @returns {number}   contem o nr do temporizador
 * 
 */
function obtemConfiguraçoes() {
    let nrBombas = formulario.elements[NUMERO_BOMBAS].value;
    let nrAltura = formulario.elements[NUMERO_ALTURA].value;
    let nrComprimento = formulario.elements[NUMERO_COMPRIMENTO].value;
    let nrTemporizador = formulario.elements[NUMERO_TEMPO_MAX].value;
    let risco = formulario.elements[RISCO].value;
    return new Definiçoes(parseInt(nrBombas), parseInt(nrAltura), parseInt(nrComprimento), parseInt(nrTemporizador), risco);

}

/* ------------------------------------------------------------------------- */
/*                                         GESTÃO DO HISTÓRICO DE definiçoes */
/* ------------------------------------------------------------------------- */

/**
 * Carrega o histórico de definiçoes guardado no local storage do browser.
 */
function CarregaHistoricoDefiniçoes() {

    // Converte o histórico de definiçoes guardado em formato JSON (JavaScript
    // Object Notation) no local storage do browser, para um objeto em memória.
    definiçoes = JSON.parse(localStorage.getItem(ITEM_DEFINIÇOES)) || [];

    // A parte "|| []" em cima serve para garantir que o histórico de definiçoes
    // em memória existe (como array), pois pode dar-se o caso de JSON.parse()
    // devolver null se for a primeira vez que executamos a aplicação.
}

/* ------------------------------------------------------------------------- */

/**
 * Grava o histórico de definiçoes no local storage do browser.
 */
function gravaHistoricoDefiniçoes() {

    // Converte o objeto que representa o histórico de definiçoes para texto em
    // formato JSON (JavaScript Object Notation), e guardado-o em local storage
    // do browser.
    localStorage.setItem(ITEM_DEFINIÇOES, JSON.stringify(definiçoes));
}

/* ------------------------------------------------------------------------- */

/** 
 * Grava a definiçao no histórico de configuraçoes.
 * 
 * @param {Definiçoes} definiçao - Objeto com os dados da definiçao.
 */
function gravaDefiniçoesHistorico(definiçao) {

    // Coloca a definiçao no histórico e guarda-o no local storage do browser.
    definiçoes.push(definiçao);
    gravaHistoricoDefiniçoes();
}

/* ------------------------------------------------------------------------- */