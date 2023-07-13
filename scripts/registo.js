/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------- */
/** Identificador do botão para efetuar o registo. */
const BOTAO_REGISTO = "btnRegistar";
  
/** Identificador do formulário para guardar dados do Utilizador. */
const FORMULARIO_UTILIZADOR = "frmUtilizador";

/** Campo do formulário com o nome do Utilizador. */
const NOME_CLIENTE = "nome";

/** Campo do formulário com o e-mail do Utilizador. */
const MAIL_CLIENTE = "email";

/** Campo do formulário com o género do Utilizador. */
const GENERO_CLIENTE = "genero";

/** Campo do formulário com o idade do Utilizador. */
const IDADE_CLIENTE = "idade";

/** Campo do formulário com a palavra-passe do Utilizador. */
const PASSWORD_CLIENTE = "password";

/** Item de local storage que guarda o histório de utilizadores. */
const UTILIZADORES = "utilizadores";

/* ------------------------------------------------------------------------- */
/**
 * Elemento de topo do formulário para criar Utilizador, para simplificar o
 * acesso aos dados dos seus campos. Esta variável global só pode inicializada
 * quando o documento HTML tiver sido completamente carregado pelo browser.
 */
let formulario = null;
/* ------------------------------------------------------------------------- */
/**
 * Guarda o histórico de utilizadores. Cada elemento do array deve ser um objeto
 * de tipo Utilizador.
 */
let utilizadores = [];
/* ------------------------------------------------------------------------- */
/**
 * Construtor de um objeto de tipo Utilizador. Cada Utilizador tem um nome, mail,
 * idade, género e palavra-passe.
 * 
 * @param {string} nome - Nome do Utilizador.
 * @param {string} mail - mail do Utilizador.
 * @param {string} idade - idade  do Utilizador.
 * @param {string} genero -  genero do Utilizador.
 * @param {string} password -  password do Utilizador.
 */
function Utilizador(nome, mail, idade, genero, password) {
    this.nome = nome;
    this.mail = mail;
    this.idade = idade;
    this.genero = genero;
    this.password = password;
}
/* ------------------------------------------------------------------------- */

// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser, incluindo o ficheiro CSS.
// Uma vantagem de usar addEventListener() em vez de window.onload é serem
// permitidos vários event handlers (funções invocadas) para um mesmo evento.
window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */
/** Antes de poder jogar, um jogador tem de se identificar, podendo ser necessário
registar-se (e-mail, senha, faixa etária, e género), caso ainda não o tenha feito.
Os registos de dados devem ficar guardados em local storage do browser. */
function principal() {

    // Para simplificar o acesso aos elementos do formulário de registo de utilizador.
    formulario = document.forms[FORMULARIO_UTILIZADOR];

    // Carrega o histórico de utilizadores a partir do local storage do browser.
    carregaHistoricoUtilizadores();

    // Associar comportamento a elementos na página HTML.
    defineEventHandlersParaElementosHTML();
}
/* ------------------------------------------------------------------------- */
/** Ativa o evento click para registar um novo utilizador. */
function defineEventHandlersParaElementosHTML() {
    document.getElementById(BOTAO_REGISTO).addEventListener("click", registaNovoUser);
}

/* ------------------------------------------------------------------------- */
/** Função que regista um novo utilizador no local Storage do browser. */
function registaNovoUser() {

    // Verifica se os valores nos campos do formulário satisfazem as restrições
    // especificadas em HTML, como o campo ter de estar preenchido (required),
    // ou o valor no campo ter de estar entre um mínimo e um máximo (min, max).
    // Se houver restrições não satisfeitas, o utilizador é informado, e o
    // registo não é processado.
    let userValido = formulario.reportValidity();

    // Se o formulário estiver bem preenchido, guarda os dados do utilizador.
    let user = null;

    // Verifica se o utilizador já existe e se é válido no sistema.
    if (userValido){
        user = obtemDadosUtilizador();
        let exist = utilizadores.length && 
        JSON.parse(localStorage.getItem(UTILIZADORES)).some(data => 
            data.nome == user.nome
        );
        if(!exist){
            gravaUtilizadorNoHistorico(user);
            location.href = "../templates/login.html";
            // Repõe os valores iniciais dos campos do formulário, para permitir um
            // novo registo.
            formulario.reset();       
        }else{
            alert("Este utilizador já existe! Insira um nome diferente...")
          
        }
    }
}
/* ------------------------------------------------------------------------- */
/** 
 * Função que obtem os dados de um novo utilizador no local Storage do browser. 
 * 
*/
function obtemDadosUtilizador() {
    let nome = formulario.elements[NOME_CLIENTE].value;
    let idade = formulario.elements[IDADE_CLIENTE].value;
    let mail = formulario.elements[MAIL_CLIENTE].value;
    let genero = formulario.elements[GENERO_CLIENTE].value;
    let password = formulario.elements[PASSWORD_CLIENTE].value;

    // Os campos dos dados do utilizador são todos de texto. Basta aceder à
    // propriedade value para obter o respetivo valor.
    return new Utilizador(nome, mail, idade, genero, password);
}
/* ------------------------------------------------------------------------- */
/**
 * Carrega o histórico de utilizadores guardado no local storage do browser.
 */
function carregaHistoricoUtilizadores() {

    // Converte o histórico de utilizadores guardado em formato JSON (JavaScript
    // Object Notation) no local storage do browser, para um objeto em memória.
    utilizadores = JSON.parse(localStorage.getItem(UTILIZADORES)) || [];

    // A parte "|| []" em cima serve para garantir que o histórico de utilizadores
    // em memória existe (como array), pois pode dar-se o caso de JSON.parse()
    // devolver null se for a primeira vez que executamos a aplicação.
}
/* ------------------------------------------------------------------------- */
/**
 * Grava o histórico de utilizadores guardado no local storage do browser.
 */
function gravaHistoricoUtilizadores() {
    // Converte o objeto que representa o histórico de utilizadores para texto em
    // formato JSON (JavaScript Object Notation), e guardado-o em local storage
    // do browser.
    localStorage.setItem(UTILIZADORES, JSON.stringify(utilizadores));
}
/* ------------------------------------------------------------------------- */
/** 
 * Grava o utilizador no histórico dos utilizadores.
 * 
 * @param {Utilizador} utilizador - Objeto com os dados do utilizador.
 */
function gravaUtilizadorNoHistorico(utilizador) {
    // Coloca a identificação do utilizador no histórico e guarda-o no local storage do browser.
    utilizadores.push(utilizador);
    gravaHistoricoUtilizadores();
}
