/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------------- */
const BOTAO_INICIANTE = "btnIniciante";
const BOTAO_INTERMEDIO= "btnIntermedio";
const BOTAO_DIFICIL = "btnDificil";

/** Identificador da informção que está no histórico do LS do browser. */
let historico = [];

/** Identificador da info do utilizador que está no histórico do LS do browser. */
let modoJogo;
let modoJogoHistorico;
/* ------------------------------------------------------------------------------- */

// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser.
window.onload = principal;

/* ------------------------------------------------------------------------- */
/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
*/
function principal() {

    historico = JSON.parse(localStorage.getItem("historico")) || [];
    defineEventHandlersParaElementosHTML()
    modoJogoHistorico=getModoJogoHistorico("Fácil")
        mostraHistorico();

}


function defineEventHandlersParaElementosHTML(){
    document.getElementById(BOTAO_INICIANTE).addEventListener("click",() => {
        modoJogo="Fácil"
        modoJogoHistorico=getModoJogoHistorico(modoJogo)
        mostraHistorico();
    });
    document.getElementById(BOTAO_INTERMEDIO).addEventListener("click",() => {
        modoJogo="Intermédio"
        modoJogoHistorico=getModoJogoHistorico(modoJogo)
        mostraHistorico();
    });
    document.getElementById(BOTAO_DIFICIL).addEventListener("click",() => {
        modoJogo="Difícil"
        modoJogoHistorico=getModoJogoHistorico(modoJogo)
        mostraHistorico();
    });
}

/* ------------------------------------------------------------------------- */
/** Verifica se o nome do utilizador coincide com o nome do utilizador
 * logado na conta, buscando essa informação no LS do browser.
 * @param {string} nome -> nome do utilizador
*/
function getModoJogoHistorico(dificuldade){
    console.log(dificuldade === "Fácil");
    console.log(typeof dificuldade);
    console.log(dificuldade);
    console.log(dificuldade == "Fácil");
    let result = historico.filter(jogo=>{
        return jogo.dificuldade === dificuldade;
    });
    result.sort((a,b) =>  b.pontuacao - a.pontuacao);
    return result;
}

/* ------------------------------------------------------------------------- */
/** Mostra as informações e detalhes do utilizador com sessão iniciada
 * numa tabela. 
 * Após um jogo, mostra uma tabela com os dez melhores tempos e resultados
 * do respetivo jogador na página do perfil, devendo essa informação ficar 
 * guardada em local storage do browser.
*/
function mostraHistorico() {

    let tabelaAntiga = document.getElementById("tabelaScores");

    // A nova tabela de histórico dos dados do utilizador tem o mesmo 
    // identificador da antiga, pois irá substituí-la na íntegra.
    let tabelaNova = document.createElement("table");
    tabelaNova.setAttribute("id", "tabelaScores");

    // Linha de cabeçalho da tabela.
    let linhaTabela = document.createElement("tr");
    linhaTabela.innerHTML = "<th>Rank</th>" +
                            "<th>Nome</th>"+
                            "<th>Data</th>"+
                            "<th>Dificuldade</th>" +
                            "<th>Pontos</th>" +
                            "<th>Tempo</th>";
    tabelaNova.appendChild(linhaTabela);

    let numerojogos = 1;
    for (let jogo of modoJogoHistorico) {

        if(numerojogos > 10){
            break;
        }
        // Uma linha de dados por cada informação no histórico.
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + numerojogos + "</td>" +
                                "<td>" + jogo.user + "</td>" +
                                "<td>" + jogo.dataJogo + "</td>" +
                                "<td>" + jogo.dificuldade + "</td>" +
                                "<td>" + jogo.pontuacao + "</td>" +
                                "<td>" + jogo.tempoJogado + "</td>";
        tabelaNova.appendChild(linhaTabela);
        numerojogos++;
    }

    // Substitui a tabela antiga pela nova.
    tabelaAntiga.parentNode.replaceChild(tabelaNova, tabelaAntiga);
}

/*const gameModeOptions = document.getElementsByClassName("game-mode-option");
for (let i = 0; i < gameModeOptions.length; i++) {
    gameModeOptions[i].addEventListener('click', (e) => {
        modoJogo = gameModeOptions.innerText
    })
}
*/