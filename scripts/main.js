/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------- */
/** Navbar/Menu com as opções do site. */
const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

const LOGGEDIN = "logged";
const CURRENT_USER = "currentUser";
const BOTAO_PLAY_PAGE = "playpage";
const BOTAO_PERFIL_PAGE = "perfilpage";
const BOTAO_EXPERIMENTAR = "experimentejá"
    /* ------------------------------------------------------------------------- */
    /** Identificador da sessão iniciada do utilizador no site. */
let sessaoIniciada = localStorage.getItem(LOGGEDIN);

/* ------------------------------------------------------------------------- */
/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.  
 * Ver última linha deste script.
 */

// O jogo está pronto a usar.
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
});


/** Funções responsáveis pelo redirecionamento das páginas quando o 
utilizador iniciou sessão / login ou lougout 
*
* @param {string} url -> url da página 
*/


window.addEventListener("load", defineEventHandlersParaElementosHTML);

function defineEventHandlersParaElementosHTML() {
    let varUrl = window.location.href;

    let play = document.getElementById(BOTAO_PLAY_PAGE)
    play.addEventListener("click", function() { checkLogin('../templates/play.html') });

    let perf = document.getElementById(BOTAO_PERFIL_PAGE)
    perf.addEventListener("click", function() { perfilButton() });
    if (varUrl.includes("index")) {
        let exp = document.getElementById(BOTAO_EXPERIMENTAR)
        exp.addEventListener("click", function() { checkLogin('../templates/play.html') });
    }
}

function checkLogin(url) {
    if (sessaoIniciada === "true") {
        window.location.href = url;
    } else {
        window.location.href = "../templates/login.html";
    }
    loginLogoutIcon();
}
function perfilButton(){
    if (sessaoIniciada === "true") {
        window.location.href = "../templates/perfil.html";
    } else {
        window.location.href = "../templates/scores.html";
    }

}

function logout() {
    localStorage.setItem('logged', "false");
    checkLogin("../index.html");
}

function loginLogoutIcon() {
    if (sessaoIniciada === "true") {
        document.getElementById("login-icon").innerHTML = `<a id ="logoutIcon"  onclick="logout()"><img id="imageLogo" src="../imagens/login.png" alt="logotipo login"></a>`;
    } else {
        document.getElementById("login-icon").innerHTML = `<a id ="loginIcon" onclick="checkLogin()"><img id="imageLogo" src="../imagens/perfil.png" alt="logotipo login"></a>`;
    }
}
loginLogoutIcon();