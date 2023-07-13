/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------- */
/** Identificador do botão para iniciar sessão. */
const BOTAO_INICIAR_SESSAO = "btnIniciarSessao";

/** Identificador do formulário do Login. */
const FORMULARIO_LOGIN = "frmLogin";

/** Campo do formulário com o nome do utilizador. */
const NOME_CLIENTE = "nome";

/** Campo do formulário com a palavra-passe do utilizador. */
const PASSWORD_CLIENTE = "password";

/** Item de local storage que guarda o histório de utilizadores. */
const UTILIZADORES = "utilizadores";

/** Item no local storage que vai guardar o utilizador que se encontra com o login feito. */
const LOGGED = "logged";
const CURRENTUSER = "currentUser";
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
// Variável que guarda o utilizador que se encontra com a sessao iniciada.
let currentUser = null;
/* ------------------------------------------------------------------------- */
/**
 * Construtor que recebe o nome e a palavra-passe do utilizador.
 * @param {String} nome -> nome do utilizador.
 * @param {String} pass -> palavra-passe do utilizador.
 */
function loginCredencials(nome, pass){
    this.nome = nome;
    this.pass = pass;
}
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
    //Para simplificar o acesso aos elementos do formulário de login do utilizador.
    formulario = document.forms[FORMULARIO_LOGIN];

    // Carrega o histórico de utilizadores a partir do local storage do browser.
    carregaHistoricoUtilizadores();

    // Associar comportamento a elementos na página HTML.
    defineEventHandlersParaElementosHTML();
}
/* ------------------------------------------------------------------------- */
/** Função que adiciona um evento click no botão para iniciar sessão. */
function defineEventHandlersParaElementosHTML() {
    document.getElementById(BOTAO_INICIAR_SESSAO).addEventListener("click", login_user);
}
/* ------------------------------------------------------------------------- */
/** Verifica se os valores nos campos do formulário satisfazem as restrições
*   especificadas em HTML, como o campo ter de estar preenchido (required),
*   ou o valor no campo ter de estar entre um mínimo e um máximo (min, max).
*   Se houver restrições não satisfeitas, o utilizador é informado, e o
*   login não é processado.
*/
function login_user(){
    // Verifica se o utilizador é válido ao iniciar sessão.
    let userValido = formulario.reportValidity();

    // Se o formulário estiver bem preenchido, guarda os dados do utilizador.
    let credentials = null;

    if (userValido){
        credentials = obtemDadosLogin();

        // Verifica se existe o utilizador no local Storage do registo.
        let exist = utilizadores.length && 
        JSON.parse(localStorage.getItem(UTILIZADORES)).some(data => 
            data.nome == credentials.nome && credentials.pass == data.password
        );

        // Atualiza a página com o login feito.
        if(exist){
            location.href = "../templates/index.html";
            formulario.reset();
            userLoggedIn(credentials.nome);
        }else{
            alert("Credenciais inválidas. Tente novamente!")

        }    
    }
}
/* ------------------------------------------------------------------------- */
/** Obtem os dados do login do utilizador no forms/formulários HTML. */
function obtemDadosLogin(){
    let nome = formulario.elements[NOME_CLIENTE].value;
    let password = formulario.elements[PASSWORD_CLIENTE].value;
    return new loginCredencials(nome,password);
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
/** Mostra a informação do utilizador no perfil. 
 * 
 * @param {string} nome -> nome do utilizador.
*/
function getUserByNome(nome){
    // Verifica se o resultado do nome é igual ao nome do utilizador logado.
    let result = utilizadores.filter(user=>{
        return user.nome===nome;
    });
    return result[0];
}
/* ------------------------------------------------------------------------- */
/** Atualiza o utilizador como logado no local Storage do browser. 
 * 
 * @param {string} nome -> nome do utilizador.
*/
function userLoggedIn(nome){
    currentUser = getUserByNome(nome);
    localStorage.setItem(LOGGED, true);
    localStorage.setItem(CURRENTUSER,JSON.stringify(currentUser));
}
/* ------------------------------------------------------------------------- */
/** Atualiza o utilizador como logout no local Storage do browser.
 *  Verifica se está com sessão iniciada na conta do jogo. 
 * 
 * @param {string} nome -> nome do utilizador.
*/
function logOutUser(nome){
    let loggedIn = localStorage.getItem(LOGGED);
    currentUser = null;
    if (loggedIn){
        localStorage.setItem(LOGGED,False);
        localStorage.setItem(CURRENTUSER,JSON.stringify(currentUser));
    }else{
        alert("Não existe nenhum utilizador com o login feito...")

        
    }
}
