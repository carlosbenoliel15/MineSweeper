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
const BOTAO_MUDAR_PASS = "btnUpadetePass";

/** Identificador do formulário do Login. */
const FORMULARIO_NEWPASS = "frmNewPass";

/** Campo do formulário com o nome do utilizador. */
const NOME_CLIENTE = "nome";

/** Campo do formulário com a palavra-passe do utilizador. */
const PASSWORD_CLIENTE = "password";

/**Campo do formulário com a confirmaçao da password */
const NEWPASSWORD_CLIENTE = "newPassword";

/** Item de local storage que guarda o histório de utilizadores. */
const UTILIZADORES = "utilizadores";


const CURRENTUSER = "currentUser";
/* ------------------------------------------------------------------------- */
/**
 * Elemento de topo do formulário para criar Utilizador, para simplificar o
 * acesso aos dados dos seus campos. Esta variável global só pode inicializada
 * quando o documento HTML tiver sido completamente carregado pelo browser.
 */
let formularioNewPass = null;
/* ------------------------------------------------------------------------- */
/**
 * Guarda o histórico de utilizadores. Cada elemento do array deve ser um objeto
 * de tipo Utilizador.
 */
let utilizadores = [];
/* ------------------------------------------------------------------------- */
// Variável que guarda o utilizador que se encontra com a sessao iniciada.
let user = null;
/* ------------------------------------------------------------------------- */
/**
 * Construtor que recebe o nome e a palavra-passe do utilizador.
 * @param {String} nome -> nome do utilizador.
 * @param {String} pass -> palavra-passe do utilizador.
 */
function Credencials(nome, pass){
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
    formularioNewPass= document.forms[FORMULARIO_NEWPASS];



    // Carrega o histórico de utilizadores a partir do local storage do browser.
    carregaHistoricoUtilizadores();

    // Associar comportamento a elementos na página HTML.
    defineEventHandlersParaElementosHTML();
}
/* ------------------------------------------------------------------------- */
/** Função que adiciona um evento click no botão para iniciar sessão. */
function defineEventHandlersParaElementosHTML() {
    document.getElementById(BOTAO_MUDAR_PASS).addEventListener("click", updatePassWorduser);
}
/* ------------------------------------------------------------------------- */
/** Verifica se os valores nos campos do formulário satisfazem as restrições
*   especificadas em HTML, como o campo ter de estar preenchido (required),
*   ou o valor no campo ter de estar entre um mínimo e um máximo (min, max).
*   Se houver restrições não satisfeitas, o utilizador é informado, e o
*   login não é processado.
*/
function updatePassWorduser(){
    // Verifica se o utilizador é válido ao iniciar sessão.
    let userValido = formularioNewPass.reportValidity();

    // Se o formulário estiver bem preenchido, guarda os dados do utilizador.
    let credentials = null;

    if (userValido){
        credentials = obtemDadosUser();
        // Verifica se existe o utilizador no local Storage do registo.
        if(typeof credentials!=='string'){

            let exist = utilizadores.length && 
            JSON.parse(localStorage.getItem(UTILIZADORES)).some(data => 
            data.nome == credentials.nome
            );

            // Atualiza a página com o login feito.
            if(exist ){
                location.href = "../templates/login.html";
                formularioNewPass.reset();
                upadateNewPassord(credentials.nome,credentials.pass)
                alert("dados atualizados com sucesso")
            }else{
                alert("Não existe nenhum user com esse nome");
                
            }
            
        }else{alert(credentials);}

    }
}
/* ------------------------------------------------------------------------- */
/** Obtem os dados do login do utilizador no forms/formulários HTML. */
function obtemDadosUser(){
    let nome = formularioNewPass.elements[NOME_CLIENTE].value;
    let password = formularioNewPass.elements[PASSWORD_CLIENTE].value;
    let newPassword = formularioNewPass.elements[NEWPASSWORD_CLIENTE].value;
    if(password == newPassword){
        return new Credencials(nome,password);
    }else{
        return("As passwords não são iguais")
    }
    
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
/** Atualiza o utilizador como logado no local Storage do browser. 
 * 
 * @param {string} nome -> nome do utilizador.
*/
function upadateNewPassord(nome,newPassword){
    const arr1 = utilizadores
    let objIndex=arr1.findIndex((obj=>obj.nome==nome))
    arr1[objIndex].password=newPassword
    localStorage.setItem(UTILIZADORES, JSON.stringify(arr1));
}